# Aria Templates configuration

[Aria Templates](http://ariatemplates.com/) comes with it's own package of classes for unit testing in JavaScript. This package gives the power to create unit tests, integration test and simulate the user behavior on the tested page.

Documentation on `aria.jsunit.*` package and related classes needed for testing is available at [this URL](http://ariatemplates.github.io/Test-Driven-Development/).

The `aria-templates` `test type` accepts the configuration below.

````yaml
tests:
  aria-templates:
    # Common file configuration
    files:
      # Base directory of all other included files
      rootDirectory: 'test'

      includes:
        - '**/*.js'
      excludes:
        - '**/*.conf.js'

    # Classpath of test files
    classpaths:
      includes:
        - MainTestSuite
      excludes:
        - test.sample.MyUnfinishedTest

    # Path of Aria Templates framework
    bootstrap : '/aria/bootstrap.js'

    # Value of Aria.rootFolderPath
    rootFolderPath : '/'

    # Enable Aria Templates debug mode, Aria.deubug
    debug : true

    # Enable memory check mode, Aria.memCheckMode
    memCheckMode : true.
````

## Files

Standard configuration object to include / exclude files for testing. It is common to all test types and described in more details [here](/usage/configuration.html#tests).

## Classpath

Aria Templates is a [class based framework](http://ariatemplates.com/usermanual/latest/javascript_classes), this means that classes can be resolved not only by their file path, but also from the combination of [`rootFolderPath`](#rootfolderpath) and their classpath.

The included and excluded classpaths are resolved starting from Aria.rootFolderPath and will follow the same rules defined by Aria Templates framework for the resolution of minified and [packaged classes](http://ariatemplates.com/usermanual/latest/url_handling).

## Bootstrap

Path to the bootstrap file of Aria Templates. The default value is `/aria/bootstrap.js`

This path should be served as a [resource](/usage/configuration.html#resources) from the test server.

## RootFolderPath

Root folder for all classpaths, the value of `Aria.rootFolderPath`

## Debug

Enables or disables Aria Templates debug mode, the value of `Aria.debug`.

Defaults to `true`.

## MemCheckMode

Enables or disables memory check mode, the value of `Aria.memCheckMode`

Defaults to `true`.