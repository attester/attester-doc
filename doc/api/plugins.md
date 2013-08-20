# Plugins module

This module handles plugins and their configuration.

## Methods

<aside class="note">See also [how to write plugins](/usage/write_plugins.html)</aside>

- `attester.plugins.config(name, config)` Store the configuration of a plugin.
- `attester.plugins.require(name, config)` Require a plugin. The name must be either a `path` or a module name that is required through node's `require`. The second parameter, optional, is the plugin's configuration. It is especially useful when loading plugins from files.
   ````js
   attester.plugins.require("./my-plugin.js", {
       verbose: true
   });
   // The file my-plugin.js is loaded and used by attester

   attester.plugins.require("attester-contrib-requirejs");
   // `attester-contrib-requirejs` must be installed as a node dependency
   ````
