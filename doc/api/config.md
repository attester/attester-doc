# Config module

This module handles the general configuration of attester. It handles all the options defined in the [command line](/usage/command_line.html), but allows you to configure any setting that might be later needed by plugins.

## Methods

- `attester.config.readFile(configFile)` Read a `JSON`or `YAML` configuration file and return it as a `JSON`.
- `attester.config.set([path,] config)` Set the global configuration of attester. When setting the configuration, values are accessible directly from `attester.config`.
   If used with one parameter it sets the global configuration of attester.
   When used with two parameters, the first one is a sub-path inside the global configuration where the configuration has to be stored

   ````js
   attester.config.set({
       one: 1,
       two: 2
   });
   attester.config.one; // This is `1`

   attester.config.set("env", {
       one: 1
   });
   attester.config.env.one; // This is also `1`
   ````
- `attester.config.parse(config)` Parse a configuration object replacing templates with their actual values. The optional configuration is merged together with the global configuration merged so far.
- `attester.config.getParsed(property)` Get a value from the internal configuration, but make sure that it has been parsed. This is equivalent to doing `attester.config.property`


## Events

- `attester.config.available` Whenever `attester.config.set` get called.
