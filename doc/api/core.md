# Core module

This module acts as a coordinator of all other modules. It listen to events raised by other modules to control them.

## Methods

This module exposes the methods

- `attester.core.start()` aliased by `attester.start()` Create the server, initialize any campaign already created and start dispatching tests.

## Events

- `attester.campaign.created` When a new campaign object is created. Listeners receive the campaign instance.
- `attester.campaign.failed` When a campaign completes with at least one error. Listeners receive the campaign instance.
- `attester.campaign.finished` When a campaign completes with no error. Listeners receive the campaign instance.
- `attester.campaign.initialized` When a campaign is initialized, this is raised after `attester.campaign.created`. Listeners receive the campaign instance.
- `attester.core.fail` Either when all campaigns complete, and at least one of them contains an error or when any other module raises an error.
- `attester.core.idle` When all campaigns complete, no of them with error.
- `attester.result` Whenever any campaign is submitting a test update (`result` event). Listeners receive the `event` that was raised by the campaign itself.
- `attester.server.started` After the test server has been created.
- `attester.start` The first time `attester.core.start()` gets called.
