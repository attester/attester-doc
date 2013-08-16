# __attester__ allows you to run _any_ JavaScript tests in _any_ web browsers.

When it comes to testing JavaScript there is a large set of testing frameworks. attester allows you to leverage any one of them to run your tests on any browser and use the result in your build or Continuous Integration environmet.

## Features

<div class="row">

	<section class="reason left">
		<hgroup>
			<h1>Frameworks</h1>
			<h2>Unit testing framework independent</h2>
		</hgroup>
		<article class="explaination">
			<p>Supports the following unit testing frameworks.</p>
			<ul>
				<li>[Mocha](http://visionmedia.github.io/mocha/) with [Chai](http://chaijs.com/), [Expect.js](https://github.com/LearnBoost/expect.js/) or any other assertion library.</li>
				<li>[Aria Templates JSUnit](https://github.com/ariatemplates/ariatemplates).</li>
			</ul>
			<p>Adding support for other test frameworks is as simple as adding an [adapter](/api/framework_apadter.html) for that test framework.</p>
		</article>
	</section>

	<section class="reason right">
		<hgroup>
			<h1>Coverage</h1>
			<h2>Instrument files for <em>code coverage</em></h2>
		</hgroup>
		<article class="explaination">
			<p>Includes instrumentation for __code coverage__ with [node-coverage](https://github.com/piuccio/node-coverage).</p>
			<p>Code coverage (aggregating all browsers) output formats:</p>
			<ul>
				<li>[node-coverage](https://github.com/piuccio/node-coverage) JSON file</li>
				<li>[lcov](http://ltp.sourceforge.net/coverage/lcov/geninfo.1.php) file, accepted by [Sonar](http://www.sonarqube.org/) <em>(currently only for line coverage)</em></li>
			</ul>
		</article>
	</section>

</div>

<div class="row">

	<section class="reason left">
		<hgroup>
			<h1>Browsers</h1>
			<h2>Multiple browser instances <em>in parallel</em></h2>
		</hgroup>
		<article class="explaination">
			<p>Supports multiple browser instances to run <strong>tests in parallel</strong>.</p>
			<p>Supports [PhantomJS](http://phantomjs.org/) for fully __headless tests__</p>
			<p>Compatible with most other web browsers and operating systems, including mobile devices</p>
			<ul>
				<li>Windows</li>
				<li>Linux</li>
				<li>OS X</li>
				<li>Android</li>
				<li>iOS</li>
				<li>[more](/usage/browsers.html)</li>
			</ul>
		</article>
	</section>

	<section class="reason right">
		<hgroup>
			<h1>Build</h1>
			<h2>Build and <em>Continuous Integration</em> tools</h2>
		</hgroup>
		<article class="explaination">
			<p>Test results __output formats__.</p>
			<ul>
				<li>JSON file</li>
				<li><strong>JUnit</strong>-style single XML file</li>
				<li>JUnit-style set of files, format accepted by <strong>Sonar</strong></li>
			</ul>
			<p>Integrates with</p>
			<ul>
				<li>[Maven](/usage/ci/maven.html)</li>
				<li>[Jenkins](/usage/ci/jenkins.html)</li>
				<li>[Travis](/usage/ci/travis.html)</li>
			</ul>
		</article>
	</section>

</div>

____________________

## Why use attester?

Compared to other tools like [Karma](http://karma-runner.github.io/) and [Testem](https://github.com/airportyh/testem) attester adds the following

* Every test runs in isolation instead of adding all tests in the same page. This makes sure that a test doesn't have side effects on other tests.
* Better parallel testing. Since every test is a single `test task`, tests can be dispatched to multiple browsers in parallel. Try running your test suite with [4 instances of PhantomJS](/usage/command_line.html#usual_options) to enjoy testing.


## How does it look like?



## How do I get started?

Read the [getting started](/usage/index.html) page for an introduction or check out more advanced articles on [configuration file](/usage/configuration.html) or using attester as a [module](/usage/module.html).