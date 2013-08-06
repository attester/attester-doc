module.exports = function(grunt) {
    grunt.initConfig({
        watch: {
            files: ["**/*", "!public/**/*"],
            tasks: ["generate", "sass"],
            options: {
                livereload: true
            }
        },
        connect: {
            server: {
                options: {
                    port: 8090,
                    base: "public"
                }
            }
        },
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: "lib/sass",
                    src: ["style.scss"],
                    dest: "public/css",
                    ext: ".css"
                }]
            }
        },
        cssmin: {
            minify: {
                expand: true,
                cwd: "public/css/",
                src: ["*.css"],
                dest: "public/css/",
                ext: ".css"
            }
        }
    });

    grunt.loadTasks("lib/grunt");

    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask("default", ["generate", "sass", "cssmin"]);
    grunt.registerTask("dev", ["default", "connect", "watch"]);
};
