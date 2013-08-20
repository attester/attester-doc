# How to write a plugin

<aside class="note">As an example you can have a look at `attester-contrib` plugins from [attester](https://github.com/attester/) organization website.</aside>

Plugins give you the ability to extend and customize attester behavior by reacting to events or modifying the test page sent to the slave browsers.

For a list of events raised by attester you can have a look at the [API documentation](/api) of all internal modules.

Plugin can only be used when attester runs as a [module](/usage/module.html).

## Structure

A plugin must be a node module exposing a function that gets called when the user requires that plugin. It receives an instance of attester and the plugin specific configuration object.

The user does

````js
attester.plugins.require("myPlugin", {
	verbose: true
});
````

The plugin looks like this

````js
module.exports = function (attester, config) {
	if (config.verbose) {
		console.log("Hello from the plugin!");
	}

	// Tell the server to serve a file from the client folder
	attester.server.use("/myPlugin", attester.middlewares.staticFile.bind({
		page: "extraScript.js",
		path: __dirname + "/client/extraScript.js"
	}));

	// Include this file in all test pages
	attester.testPage.include({
		head: {
			tagName: "script",
			src: "/myPlugin/extraScript"
		}
	});
}
````

## Life-cycle

When running, attester goes through some steps, both on the server side (attester module itself) and the client side (test page served to the slave browser).

### Server side

Among all the events raised by attester, these are the most interesting for a plugin developer and they are sorted in the same order they'll be raised in a standard configuration:

<aside class="note">For a more comprehensive list of events you can check the [API documentation](/api/index.html)</aside>

- `attester.config.available` The global configuration is available. This is useful for plugins the needs access to the global attester configuration.
- `attester.start` Attester is starting.
- `attester.campaign.initialized`. When a new campaign is created at initialized. At this stage the campaign contains the list of tasks to be executed by slaves.
- `launcher.connect` Emitted when the server is expecting browser slaves to connect and execute tasks.
- `attester.result` Whenever a campaign emits a test result (test passed, test fail, error ...).
- `reports.stats` When a campaign ends, it describes the outcome of the tests.
- `attester.campaign.finished` or `attester.campaign.failed` When a campaign completes, either without or with error.
- `attester.core.idle` or `attester.core.fail` When all campaigns complete, either without or with error.

### Client side

On the client side (`slave`) the life-cycle is the following

- The browser connects to the slave page.
- It receives a `task-emit` event meaning that a test task has been dispatched by the server.
- The test task is a page, build by [testPage](/api/testPage.html) module, containing a single test and scripts that calls `attester.currentTask.start()`.

Normally, `test types` can load scripts calling `attester.currentTask.includeTests(scripts, callback)`.

Plugin developers can modify this behavior in two ways

- changing `attester.currentTask.includeTests()` that by defaults injects a `script` tag in the page head.
- pushing actions into `attester.currentTask.actions`. This is an array of actions that must be performed on any test page before calling `attester.currentTask.start()`.
    Actions must be function and can be either synchronous or asynchronous, Asynchronous actions take a `callback` parameter.

For instance the following code can be inserted by a plugin and it'll run in the test page

````js
attester.currentTask.actions.push(function () {
	// No argument, this method is synchronous
	myPlugin.config = {
		rootPath : "/"
	};
});

attester.currentTask.actions.push(function (callback) {
	// One argument, this method is asynchronous
	ajaxRequest("/at_this_url", function (response) {
		myPlugin.config = response;
		callback();
	})
});

attester.currentTask.includeTests = function (scripts, callback) {
	// Use require JS to load files, provided that require was loaded
	require(scripts, callback);
};
````
