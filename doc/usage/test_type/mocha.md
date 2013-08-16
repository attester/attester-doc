# Mocha configuration

[Mocha](http://visionmedia.github.io/mocha/) is a feature-rich JavaScript test framework running on node and the browser with an amazing support for asynchronous testing.

Examples of different attester configuration are available at this [repository](https://github.com/attester/example-mocha).

The `mocha` `test type` accepts the configuration below.

````yaml
tests:
  mocha:
    files:
      # Base directory of all other included files
      rootDirectory: 'test'

      includes:
        - '**/*.js'
      excludes:
        - '**/*.conf.js'

    # User-interface (bdd|tdd|exports). Defaults to bdd
    ui: 'bdd'

    # Ignore global variable leaks, defaults to true
    ignoreLeaks: false

    # When ignoreLeaks is false this contains the list of global [names] that are allowed
    globals:
      - 'myGlobal'
      - 'coverageObject'

    # Assertion library to be included. It could be either expect or chai or any external url
    assertion: 'expect'
````

## Files

Standard configuration object to include / exclude files for testing. It is common to all test types and described in more details [here](/usage/configuration.html#tests).

## UI

Mocha `interface` system allows developers to choose their style of writing tests, BDD, TDD, and exports interfaces.

<aside class="note">attester supports all interfaces described [here](http://visionmedia.github.io/mocha/#interfaces) even if not specified.</aside>

Possible values are

* `bdd`, the interface provides `describe()`, `it()`, `before()`, `after()`, `beforeEach()` and `afterEach()`
* `tdd`, the interface provides `suite()`, `test()`, `setup()`, `teardown()`
* `exports`, where object values are suites, function values are test-cases and the keys `before`, `after`, `beforeEach`, and `afterEach` are special-cased.
* `qunit` [Qunit](http://qunitjs.com/)-inspired interface matches the "flat" look of QUnit where the test suite title is simply defined before the test-cases.

## IgnoreLeaks

By default Mocha will not check for global variables leaked while running tests, to enable this set `ignoreLeaks` to `false` and specify globals that are acceptable using `globals`.

## Globals

The list of accepted global variable names when `ignoreLeaks` is `false`. For example `jQuery`.

## Assertion

Mocha allows you to use any assertion library you want as long as it throws an error.

Possible values are

* `expect` [expect.js](https://github.com/LearnBoost/expect.js) `expect()` style assertion
* `chai` [chai](http://chaijs.com/) `expect()`, `assert() and `should` style assertion.
* `http://any.other.url/assert.js` to include any external URL as assertion library.
