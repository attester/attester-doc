# Test page module

This module defines what needs to be loaded by slave in the test page.

It is exposed as a module to allow plugins to include any element in the page.

## Methods

- `attester.testPage.include(content)` Include the content in the test page. This content is merged with whatever is added by `test types`.
- `attester.getAll()` Retrieve the content included so far by all plugins

### Page content

The content of a test page can be specified as

1. a string, in this case it'll be added to the body
2. an object with `head` and `body` that in turn could be
    - a string added to the respective section
    - an array of strings and `tag` elements where `tagName` specifies the name
    - a single `tag` element

A `tag` element is an object where `tagName` is the `tag` name and all the other properties are the tag's attribute

````js
// This markup is added to the body
attester.testPage.include("<p>Hello!</p>");

attester.testPage.include({
    head: [
        // Meta tag using the string verions
        "<meta name='author' content='Test Writer'>",
        // Include a script in the page giving the `src`
        {
            tagName: "script",
            src: "http://myserver.com/testScript.js"
        }
    body: [
        // Include a script defining it's content
        {
            tagName: "script",
            content: "jQuery(function () { doSomeStuff() });"
        }
    ]
});
````
