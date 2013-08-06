# Browsers

attester works by starting a web server and driving connected browser dispatching test tasks.

Browsers can be

* headless, like [PhantomJS](/usage/phantom.html).
* real browser, either local on the same machine or remotely.

## Campaign configuration

When creating a campaign it's possible to specify which browsers should be tested. A detail description is available on the [campaign configuration](/usage/configuration.html) article.

## Running browsers

attester won't automatically start the browsers specified in the campaign configuration, because some of them might not be available on the local machine.

However there are two solutions for a better automation:

* it is possible to execute scripts when launching attester from the [command line](/usage/command_line.html). This is achieved with the parameter `--browser`. More information in [this paragraph](/usage/command_line.html#usual_options).

````
attester campaign.yaml --browser "C:\Program Files (x86)\Mozilla Firefox\firefox.exe"
````

The command above will start FireFox and connect it as slave to attester

* using attester as a [module](/usage/module.html) gives much more freedom and extensibility. Not only it's possible to start local browsers, but also execute any behavior, like starting remote browsers or connecting to services like [SauceLabs](https://saucelabs.com/) or [BrowserStack](http://www.browserstack.com/).
