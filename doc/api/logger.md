# Logger module

This is the default logger for attester.

It provides some methods for logging and the verbosity can be controlled by the attester configuration value `log-level`.

## Methods

- `attester.logger.logError(message)` Logs a message. `log-level 1`
- `attester.logger.logWarn(message)` Logs a message. `log-level 2`
- `attester.logger.logInfo(message)` Logs a message. `log-level 3`
- `attester.logger.logDebug(message)` Logs a message. `log-level 4`

- `attester.logger.addChild(childLogger)` Register a child logger. `attester.logger` will listen to the `log` event raised by the child logger and call `attester.logger.onChildLog(event)`.
- `attester.logger.onChildLog(event)` Called when a child log emits the event `log`.
