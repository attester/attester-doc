# Module

<aside class="note">For a better understanding you can also have a look at [this repository](https://github.com/attester/example-module)</aside>

attester can work in two ways:

- from the command line. This is the simplest way to run a single test campaign inside a build and validate its result
- as a module. This gives the highest degree of configuration and extensibility

_Please note that attester can be used as a module only starting from version `1.2.2`_

Using attester as a module means installing it alongside with your project instead of globally

````
npm install attester --save-dev
````

_This will install attester and save a `devDependency` in your `package.json`_


Once installed you'll have to create your own script using attester to start campaigns.

The base skeleton for such a script is

````js
var attester = require("attester");

// Called when the campaign completes successfully
attester.event.once("attester.core.idle", function () {
	console.log("Test OK");
	process.exit(0);
});

// Called when the campaign fails
attester.event.once("attester.core.fail", function () {
	console.log("Some tests fails, please check the logs");
	process.exit(1);
});

// Create a campaign with a given configuration
attester.campaign.create({
	resources: {
		"/" : ["src"]
	},
	tests: {
		mocha: {
			files: {
				includes: ["test/**/*.js"]
			}
		}
	}
});

attester.start();
````

## Overview

attester works on top of the standard node module system, so it can be required with

````
var attester = require("attester");
````

This object is then made of smaller submodules that communicate through messages.

Core modules are

<aside class="note">If you're a plugin developer of want to have more information, you can refer to the API documentation of these module by clicking on their name.</aside>

* [`campaign`](/api/campaign.html) Create and manage test campaigns.
* [`config`](/api/config.html) Handle global configuration
* [`core`](/api/core.html) Main module, coordinates all the others
* [`event`](/api/event.html) Event communication bus
* [`launcher`](/api/launcher.html) Launch and drive browsers
* [`logger`](/api/logger.html) Provide a logging interface
* [`reports`](/api/reports.html) Write test reports
* [`server`](/api/server.html) Start and control the test server

For a generic usage, the most interesting events are

* `launcher.connect` Raised when the test server is ready and the campaign was initialized. After these event it's possible to connect browser, either local or remote.
* `attester.core.idle` Raised when the all campaigns end successfully.
* `attester.core.fail` Raised when all campaigns end, and at least one is in error.

While the most common methods are

* `attester.event.on()` and `attester.event.once()` To register to events.
* `attester.config.set()` To set configuration options.
* `attester.config.readFile()` To read a configuration file from disk.
* `attester.campaign.create()` To create a new test campaign.
* `attester.start()` alias of `attester.core.start()` To start executing campaigns.
