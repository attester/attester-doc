# Configuration file

The configuration file for a campaign can be either a JSON (`.json`) or a YAML (`.yml` or `.yaml`) file and it's divided into parts describing the source files to be tested, the list of tests and the reporting and running information.

Options that are not specific to a test campaign must be passed to the [command line](/usage/command_line.html) or the [attester module](/usage/module.html)

## Resources

This section specifies which resource files should be tested.

The simplest example is 

````yaml
resources:
  /:
    - ../src
````

on in JSON

````json
{
	"resources": {
		"/": ["../src"]
	}
}
````

This means that the server will be able to serve any file in the `../src` folder from its root. The folder path is relative to the current working directory.

The `resources` object only describes what files can be served by the test server, not the files that are inserted in the test page.

The closes equivalent is `Karma` which allows to serve files without including them in the page. The difference is that with attester it's possible to map these files to a different path.
````js
{pattern: '../src', included: false, served: true}
````

<aside class="note">For an example with dependencies you can check [this example project](https://github.com/attester/example-include-resources)</aside>

The `resources` object is particular important for project with dependencies.

Consider a project depending on `npm packages` or `bower components`, once installed, the dependencies are fetched in different folders. Configuring `resources` allows you to write more readable tests

Given this folder structure

````bash
/
  src/               # Source files
  node_modules/      # NPM packages
  bower_components/  # Bower dependencies
  tests/             # My test files
  campaign.yaml
````

````yaml
resources:
  # Map the root folder to my source files
  /:
    - src

  # Map lib to both node_modules and bower_components
  /lib:
    - node_modules
    - bower_components
````

With the above configuration the test server is able to serve both `node_modules` and `bower_components` under the same `lib` path.


## Tests

This section describes the list of tests that make a campaign and should be run by attester.

<aside class="note">If your testing framework of choice is not officially supported you can easily create your own test type following [this guide](/api/test_type.html)</aside>

attester clearly separates the list of tests from the list of resources in order to better distribute tests among slaves. By doing this it's possible to split the testing also between multiple instances of the same browser.

Tests are grouped by `test type` (or _unit testing framework_). Not only you can use any testing framework, but you can also use more than once to run your campaign.

A typical configuration is

````yaml
tests:
  mocha:
    files:
      includes:
        - tests/**/*.js

    extraScripts:
      - /source.js
````

<aside class="note">For a better understanding of `extraScripts` refer to [this article](/usage/test_page.html)</aside>

This means that all `.js` files in the folder `tests` should be included by the `mocha test-type`.

`extraScripts` means that in the test page we also expect the listed scripts to be included. This is generally the source files under test.

The full configuration for `files` is

````yaml
files:
  includes:
    - a list of included files
    - multiple paths are allowed

  excludes:
    - a list of files that shouldn't be tested

  # All paths inside includes and excludes are relative to this path
  rootDirectory: /base/path
````

Any other configuration specific to the `test-type` is specified next to `files`. Take for instance the configuration of a `mocha` campaign below:

````yaml
tests:
  mocha:
    files:
      includes:
        - tests/**/*.js

    # User-interface (bdd|tdd|exports). Defaults to bdd
    ui: 'tdd'
    # Assertion library to be included.
    assertion: 'expect'
````

For a list of all available options and their meaning, refer to:

* [Mocha](/usage/test_type/mocha.html)
* [Aria Templates](/usage/test_type/aria_templates.html)

## Browsers

<aside class="note">attester won't start automatically any browser, but simply wait for them to connect. For automatic ways to launch browsers please refer to the [browser article](/usage/browsers.html)</aside>

This section is optional and describes the list of browsers that are expected to connect as slave.

If the browsers section is not present, attester will not make any difference between browsers and run each test only once, in whatever browser is connected.

However, if the browsers section is present, each test will be run __once in each browser__ listed here. Browsers not listed here won't receive any task to run.

````yaml
browsers:
  - browserName: 'Chrome'

  - browserName: 'IE'
    majorVersion: 10

  - browserName: 'Firefox'
    os: 'Desktop Linux'
````

Attester uses [ua-parser](https://github.com/tobie/ua-parser/) for detecting browser version and operating system.

<aside class="note">For a bigger (though not complete) list of options, you can have a look at the [test resources](https://github.com/tobie/ua-parser/tree/master/test_resources) in ua-parser.</aside>

Most common __names__ (`browserName`) are (not limited to):

* `IE`
* `Firefox`
* `Chrome`
* `Safari`
* `Opera`
* `PhantomJS`

Most common __operating systems__ (`os`) are

* `Windows XP`
* `Windows Vista`
* `Windows 7`
* `Windows 8`
* `Mac OS X`
* `Ubuntu`
* `Debian`
* `Fedora`
* `Chrome OS`
* `iOS`
* `Android`
* `Windows Phone`
* `Firefox OS`
* `BlackBerry OS`

For convenience, two additional values are accepted by attester:

* `Desktop Linux` (Linux, but not Android or webOS)
* `Desktop Windows` (Windows, but not Windows Phone)

The __version__ can be expressed with

* `majorVersion`
* `minorVersion`
* `revision`


## Reports

Some sections in the configuration file control where and what types of reports are written for each campaign.

### Coverage

To have code coverage it's necessary to specify for which files you want to measure the coverage and where to save the report.

````yaml
# Specifies which files will be instrumented for code coverage
coverage:
  files:
    rootDirectory: 'lib'
    includes:
      - '**/*.js'

# Path for each coverage test report type
coverage-reports:
  json-file: 'coverage.json'
  lcov-file: 'coverage.lcov'
````

Code coverage is obtained through [node-coverage](https://github.com/piuccio/node-coverage/) and the report can be written in

* JSON, the internal format of `node-coverage`
* LCOV, the format accepted by [Sonar](/usage/ci/sonar.html)

### Test Reports

This is an optional section to describe where the campaign reports should be written.

If missing, attester will simply write in the command line the result of each test task.

The configuration section for writing test reports on the disk is the following:

````yaml
test-reports:
  json-file: 'report.json'
  xml-file: 'report.xml'
  xml-directory: 'reports'
````
The properties are

* `json-file` JSON file with detailed information on each test run
* `xml-file` JUnit-style XML file with the result of the test campaign
* `xml-folder` Path of the folder in which attester generates a file for each test, this is the format accepted by [Sonar](/usage/ci/sonar.html).



## Templating

The configuration files allows to use a simple templating engine to refer to other options specified in the configuration file or in the [environment variables](/usage/command_line.html#environment_variables).

This syntax is `<%= prop.subprop %>`, for more information refer to the section on [environment variables](/usage/command_line.html#environment_variables).
