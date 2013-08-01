# Test Page

It's important to understand exactly what is served by attester to a connected browser.

A slave browser receives a page with a single test and the files necessary to run it.
The test page has access to anything that is listed in `resources`.

From the configuration file

* `tests` is used to build a list of tests for each testing framework
* `resources` simply defines what is accessible by the page, none of these files is automatically added to the page

Inside `test` there are two parameters that deal with files

* `files` used to generate the list of test files
* `extraScripts` resources to be included in the test page

It's worth noticing that `extraScripts` must be an absolute path from the server root (what is configured in the resources) or a full URL.

Let's see one example

````json
{
  "resources" : {
    "/" : ["src"],
    "/test" : ["spec"]
  }
}
````

The block above configures attester to serve any file inside `src` folder from the server root, and files from `spec` from `/test`.

````json
{
  "resources" : {
    "/" : ["src"],
    "/test" : ["spec"]
  },
  "tests" : {
    "mocha" : {
      "files" : {
        "includes" : ["spec/**/*.js"]
      }
    }
  }
}
````

This block tells attester that each JavaScript file in the spec folder is a `mocha` test. When dispatching them to connected browsers, each will receive a page containing

* mocha
* an attester adapter to mocha tests
* a single test file

Including source files it's up to the test that can use script loaders like [requirejs](http://requirejs.org/), [noder](https://github.com/ariatemplates/noder), [curl](https://github.com/cujojs/curl), [head.js](http://headjs.com/) or similar.
Using a script loader allows to include in the tested page only what's strictly necessary for the test.

It's also possible to configure attester to include other scripts then the test through `extraScripts`.

````json
{
  "resources": {
    "/": ["src"],
    "/test": ["spec"]
  },
  "tests": {
    "mocha": {
      "files": {
        "includes": ["spec/**/*.js"]
      },
      "extraScripts": ["/sourceCode.js", "/utilities.js"]
    }
  }
}
````

The paths specified in `extraScripts` are resources URL. In the example above `sourceCode.js` must be physically located inside `src` folder.

The files specified in `extraScripts` are included in each and every test.
