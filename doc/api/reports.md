# Reports module

This module handles the reports creation and communication with attester.

There are two types of reports

- global, these are the one reporting any activity on attester
- campaign, reports specific to a certain campaign

The module listen to events raised by attester to initialize reports and listen to the results

## Methods

- `attester.reports.writeReports(campaign, callback)` Write the reports for the given campaign. This generates all the files specified in the campaign configuration so it is asynchronous. The callback is called with a success boolean, true if there where no remarkable errors or failures

## Events

- `reports.stats` After the report has been written this event is raised. Listeners receive an object containing information on the test result, including the number of test run, failures, errors and other.
- `reports.error` Emitted when there's an error writing reports.
