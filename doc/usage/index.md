# Getting started

Attester is a tool written in JavaScript, to be run with [Node.js](http://nodejs.org/) and can be installed via [npm](https://npmjs.org/).

It allows to run JavaScript tests written in any testing framework and execute them in any web browser, [PhantomJS](http://phantomjs.org/) included.

_Attester 1.x.x can only work with Node.js `<= 0.8.0`_

## Installation

To start testing your code you'll have to install attester in your project

````
npm install attester --save-dev
````

<aside class="note">For help you can follow this guide to [install PhanthomJS](/usage/phantom.html) on your machine</aside>

This will also modify your `package.json` to include attester as a [devDependency](https://npmjs.org/doc/json.html#devDependencies).

If you want to make use of PhantomJS headless testing, you'll additionally need to [download PhantomJS](http://phantomjs.org/download.html) and make sure it's in your `PATH`.


## Usage

attester has a command line utility that can be used in your build to execute your tests in a campaign.

### Setup your project

<aside class="note">
	<p>A simple configuration file is available [below](#configuration_file).</p>
	<p>It is also possible to use a [separate script](/usage/package_json.html) for attester instead of `test`, this gives you the flexibility to run more scripts from `npm test`.</p>
</aside>

Attester requires a configuration file that describes the list of tests and the available resources (source code to be tested).

Once you've [created such configuration file](/usage/configuration.html) you can modify your `package.json` and create a script to run attester.

The preferred script is `test`.

````json
{
	"scripts": {
		"test": "attester test/attester.json"
	}
}
````

### Run attester

Once you setup your project you can run your campaign with

````
npm test
````

## How attester works

Attester create a test server that awaits for incoming connections from different browsers. Every connected browser is a _slave_.

The test server dispatches pending tests to available slaves and gather the results in a common report. This allows to run JavaScript tests in as many browser as wanted.

In order to work, attester should be configured to know which tests to run, on which browsers, against which source code.

## Configuration file

The configuration file describes the test campaign to execute. It can be either in the [YAML](http://en.wikipedia.org/wiki/YAML) (with a `.yml` or `.yaml` extension) or in the [JSON](http://en.wikipedia.org/wiki/Json) format (with a `.json` extension).

There's no naming convention for the configuration file, so you can put it anywhere you like, preferably next to your tests.

The configuration file is comprised of the following parts:

<aside class="note">For more information on the campaign configuration file and the complete list of properties please refer to [this article](/usage/configuration.html)</aside>

* [The list of resources](/usage/configuration.html#resources)
* [The list of tests](/usage/configuration.html#tests)
* [Browsers information](/usage/configuration.html#browsers)
* [Logging and reporting](/usage/configuration.html#reports)

A very simple configuration file in `.yml` is

````yaml
# Specifies which files will be accessible through the web server:
resources:
	'/':
		- 'lib'
		- 'src'

# Describes test configuration for each type of test
tests:
	mocha:
		files:
			includes:
				- 'test/**/*.js'
		assertion: 'expect'

# On which browser the campaign should run
browsers:
	- browserName: 'Chrome'
	- browserName: 'Safari'
	  os: 'Mac OS X'
	- browserName: 'IE'
      majorVersion: 10
````

## Further Reading

* [Campaign configuration](/usage/configuration.html) with detailed information on how to describe your test campaign
* [CLI options](/usage/command_line.html) with a description of all the options that can be used to configure attester behavior.
* [Attester as a module](/usage/module.html) explains how to use attester as a module instead of a command line utility. This is the most advanced usage.
* [Developer documentation](/api/index.html) for the internals. It is useful to write custom plugins or to understand how attester works.
