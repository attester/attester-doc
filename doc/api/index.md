# API

This section of the documentation describes the internal of attester.

This is most useful when writing plugins or when using attester as a [module](/usage/module.html).

## Architecture

attester is made of modules communicating through an event bus. External developers and plugin can listen to events and perform additional tasks or change the attester behavior.

Internal modules are

* [`campaign`](/api/campaign.html) Create and manage test campaigns.
* [`config`](/api/config.html) Handle global configuration.
* [`core`](/api/core.html) Main module, coordinates all the others.
* [`event`](/api/event.html) Event communication bus.
* [`launcher`](/api/launcher.html) Launch and drive browsers.
* [`logger`](/api/logger.html) Provide a logging interface.
* [`middlewares`](/api/middlewares.html) Generic middlewares.
* [`plugins`](/api/plugins.html) Extend and customize attester behavior.
* [`reports`](/api/reports.html) Write test reports.
* [`server`](/api/server.html) Start and control the test server.
* [`testPage`](/api/testPage.html) Define what's loaded in browsers.

## Further Reading

* [Use as a Module](/usage/module.html) if you are trying to use attester as a module.
* [Write a Plugin](/usage/write_plugins.html) if you want to write a plugin for attester.
