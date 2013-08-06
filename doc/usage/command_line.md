# Using the command line

attester can be used from the command line to execute test campaigns.

It runs your tests on all the required browsers and reports the result in the command line. This can be easily integrated in any build system or continuous integration environment.

````bash
attester [<options>] [<configuration file>]
````

## Configuration file

The configuration file describes the campaign to execute. A very detailed description is available at [this page](/usage/configuration.html)

## Options

The whole list of options, with a short description, is available with

````
attester --help
````

### Usual options

* `--phantomjs-path <path>` Path to the [PhantomJS](http://phantomjs.org/) executable (default: `phantomjs`). You can follow [this guide](/usage/phantom.html) to install and configure PhantomJS

* `--phantomjs-instances <number>` Number of instances of PhantomJS to start (default: `0`). Additionally, a string auto can be passed to let the program use the optimal number of instances for best performance (max. 1 per CPU thread).

* `--browser <path>` Path to any browser executable to execute the tests. Can be repeated multiple times to start multiple browsers or multiple instances of the same browser. Each browser is started with one parameter: the URL to open to start tests. At the end of the tests, all started processes are killed.

* `--env <path>` Path to a `yaml` or `json` file containing environment options. See the section about [environment variables](#environment_variables).

* `--ignore-errors` When enabled, test errors (not including failures) will not cause this process to return a non-zero value.

* `--ignore-failures` When enabled, test failures (anticipated errors) will not cause this process to return a non-zero value.

* `--port <number>` Port used for the internal web server. By default it tries to use port `7777` and will choose an available port automatically if the one specified is not available.

* `--server-only` Only starts the web server, and configure it for the test campaign but do not start the campaign. This is useful to run tests manually or display coverage reports of old campaigns.

* `--log-level <number>` Level of logging: integer from 0 (no logging) to 4 (debug).

* `--colors` Uses colors (disable with `--no-colors`).

* `--help` Displays a help message and exits.

* `--version` Displays the version number and exits.

### Advanced options

* `--json-console` When enabled, JSON objects will be sent to `stdout` to provide information about tests. This is used by the [junit bridge](https://github.com/attester/attester-junit).

* `--heartbeats` Delay (in ms) for heartbeats messages sent when `--json-console` is enabled. Use `0` to disable them.

* `--task-timeout` Maximum duration (in ms) for a test task, defaults to 5 minutes.

### Configuration file options

Any option configurable through the configuration file can also be specified from the command line with the `--config` prefix. For example, to configure resources, it is possible to use:

````
attester --config.resources./ path1/root1 --config.resources./ path2/root2 --config.resources./aria path/to/aria
````

which is equivalent to run attester with the following configuration file

````json
{
	"resources": {
		"/": ["path1/root1", "path2/root2"],
		"aria": ["path/to/aria"]
	}
}
````

## Environment Variables

It is possible to build a special portion of the configuration object from an external file using `--env` option.

````
attester --env package.json
````

This puts the content of `package.json` inside the `env` section of attester configuration. It is then possible to reference such values with simple templates.

`<%= prop.subprop %>` Expands to the value of `prop.subprop` in the config. Such templates can only be used inside string values, either in arrays or objects

````json
{
  "resources": {
    "/": "src"
  },
  "tests": {
    "mocha": {
      "files": {
        "includes": ["spec/**/*"]
      }
    }
  },
  "coverage": {
    "files": {
      "rootDirectory": "src",
      "includes": ["**/*.js"]
    }
  },
  "coverage-reports": {
    "json-file": "/reports/coverage-<%= env.version %>.json"
  }
}
````

The configuration above generates a coverage report file called `coverage-x.y.z.json` where `x.y.z` is the value taken from `package.json` or any other file passed referenced by `--env`.

Template options can be used both in `yaml` and `json` file and the environment file can be of any of the two format.