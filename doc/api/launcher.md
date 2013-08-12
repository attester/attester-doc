# Launcher module

This module is used to coordinate the start of browsers if needed for a given campaign.

Browsers might not be installed locally, for this reason this module emits events that could be listened to by external plugins to drive remote machines.

## Events

- `launcher.connect` This event is raised when the server is ready and there are tasks pending to be executed. This means that browsers should now connect as slave. Listeners receive the `slave URL`.
