# attester in your package.json

The file `package.json` specifies the list of dependencies for you module.

since you'll need attester only to run your tests it's recommended to put attester in your `devDependencies` like in this example

````json
{
	"name": "myProject",
	"description": "A package using attester for testing",
	"devDependencies": {
		"attester": "~1.2.0"
	}
}
````

## Run attester

The simplest configuration is to specify attester in your scripts under the name `test`.

````json
{
	"name": "myProject",
	"description": "A package using attester for testing",
	"devDependencies": {
		"attester": "~1.2.0"
	},
	"scripts": {
		"test": "attester myCampaign.yaml"
	}
}
````

Doing so we can run attester with

````
npm test
````


Another option is to create a separate script for attester, so that you can use `npm test` to run multiple scripts or have different campaign for attester.

````json
{
	"name": "myProject",
	"description": "A package using attester for testing",
	"devDependencies": {
		"attester": "~1.2.0"
	},
	"scripts": {
		"attester": "attester myCampaign.yaml",
		"test": "npm run-script attester"
	}
}
````

Doing so we can run attester with

````
npm run-script attester
````

## NPM Environment variable

attester tries to read some variables from the npm environment.

- `phantomjsInstances` the number of instances of phantomJS to run at the same time. The default value is `0` and it can be overridden by the [configuration option](/usage/command_line.html#usual_options) `--phantomjs-instances`.

An example is

````json
{
	"name": "myProject",
	"description": "A package using attester for testing",
	"config": {
		"phantomjsInstances": 2
	},
	"devDependencies": {
		"attester": "~1.2.0"
	},
	"scripts": {
		"test": "attester myCampaign.yaml"
	}
}
````

This is equivalent to running

````
attester --phantomjs-instances 2 myCampaign.yaml
````