var jade = require("jade");
var marked = require("marked");
var pygmentize = require("pygmentize-bundled");
var Q = require("q");
var path = require("path");
var attester = {};

marked.setOptions({
	highlight: function (code, lang, callback) {
		pygmentize({
			lang: lang,
			format: "html"
		}, code, function (err, result) {
			callback(err, result ? result.toString() : undefined);
		});
	}
});


module.exports = function (grunt) {
	grunt.registerTask("generate", "Generate documentation articles", function () {
		var done = this.async();

		grunt.log.debug("Create public folder");
		grunt.file.mkdir("public");

		var tasks = [getAttesterVersion, generateMarkdown, copyStatic];

		tasks.reduce(Q.when, Q(grunt)).then(function () {
			grunt.log.write("All tasks done ");
			grunt.log.ok();
			done();
		}).fail(function (error) {
			grunt.log.error(error.message);
			done(false);
		});
	});
};

function getAttesterVersion (grunt) {
	grunt.log.writeln("Get attester version...");

	var exec = require("child_process").exec;

	var attesterPromise = Q.defer();
	var info = exec("npm info attester version", function (error, stdout) {
		if (error) {
			attesterPromise.reject(error);
		} else {
			attester.version = stdout.toString();
			grunt.log.debug("Attester version " + attester.version);
			grunt.log.ok();
			attesterPromise.resolve(grunt);
		}
	});
	return attesterPromise.promise;
}

function generateMarkdown (grunt) {
	grunt.log.writeln("Generating markdown articles...");

	var layout = grunt.file.read("lib/jade/index.jade");

	var markdownPromise = Q(layout);
	grunt.file.recurse("doc", function (abspath, rootdir, subdir, filename) {
		markdownPromise = markdownPromise.then(processMarkdown.bind(grunt, layout, abspath, rootdir, subdir, filename));
	});

	return markdownPromise.then(function () {
		grunt.log.ok();
		return grunt;
	});
}

function processMarkdown (layout, abspath, rootdir, subdir, filename) {
	var grunt = this;
	grunt.log.debug("Reading " + abspath);
	var markdown = grunt.file.read(abspath);
	subdir = subdir || "";

	var deferred = Q.defer();

	var toc = [];
	var title = "";
	// for the API
	var methods = [];
	var inMethods = false;
	var events = [];
	var inEvents = false;
	var listLevel = 0;
	marked(markdown, {
		on: {
			heading : function (token, callback) {
				if (token.depth <= 3) {
					var link = token.text.toLowerCase().replace(/[ ]+/g, "_");
					toc.push({
						depth: token.depth,
						title: token.text,
						link: link
					});
					if (token.depth === 1 && !title) {
						title = token.text;
					}
					if (isAPI(subdir, filename) && token.text.toLowerCase() === "methods") {
						inMethods = true;
						inEvents = false;
					} else if (isAPI(subdir, filename) && token.text.toLowerCase() === "events") {
						inMethods = false;
						inEvents = true;
					} else {
						inMethods = false;
						inEvents = false;
					}
					callback(null, "<a name='" + link + "'></a>" + token.text);
				} else {
					callback(null, token.text);
				}
			},
			list_item_start : function (token, callback) {
				listLevel += 1;
				callback(null, token.text);
			},
			loose_item_start : function (token, callback) {
				listLevel += 1;
				callback(null, token.text);
			},
			list_item_end : function (token, callback) {
				listLevel -= 1;
				callback(null, token.text);
			},
			text : function (token, callback) {
				if (isAPI(subdir, filename)) {
					if (listLevel === 1 && (inMethods || inEvents)) {
						// The method or event name is the first one inside the code block
						var match = token.text.match(/^`([a-z\.]+)\s?(\(.*\))?`/i);
						if (match && inMethods) {
							methods.push(match[1].split(".").pop());
						} else if (match && inEvents) {
							events.push(match[1]);
						}
					}
				}
				callback(null, token.text);
			}
		},
		tables: true,
		gfm: true
	}, function (err, content) {
		if (err) {
			grunt.log.debug("Error processing markdown for " + abspath);
			deferred.reject(new Error(err));
		} else {
			var destpath = path.join("public", subdir, filename.replace(/\.md$/i, ".html"));
			grunt.log.debug("Writing " + destpath);
			grunt.file.write(destpath, renderMarkDown(subdir, filename, layout, {
				content: content,
				toc: toc,
				title: title,
				methods: methods,
				events: events
			}));

			deferred.resolve(grunt);
		}
	});
	return deferred.promise;
}

function renderMarkDown (subdir, filename, layout, article) {
	return jade.compile(layout, {
		filename: filename,
		compileDebug: true,
		pretty: true
	})({
		index: isIndex(subdir, filename, article),
		documentation: isDocumentation(subdir, filename, article),
		api: isAPI(subdir, filename, article),
		article: article,
		attester: attester
	});
}

function copyStatic (grunt) {
	grunt.log.writeln("Copy static files...");

	grunt.file.recurse("static", function (abspath, rootdir, subdir, filename) {
		var destpath = path.join("public", subdir || "", filename);
		grunt.log.debug("Copying file " + destpath);
		grunt.file.copy(abspath, destpath);
	});

	grunt.log.ok();
}

function isIndex (subdir, filename, article) {
	return !subdir;
}
function isDocumentation (subdir, filename, article) {
	return subdir && subdir.indexOf("usage") === 0;
}
function isAPI (subdir, filename, article) {
	return subdir && subdir.indexOf("api") === 0;
}
