# Server module

The server module is responsible of starting a test server which is then serving files to connected slaves and gathering results.


## Methods

- `attester.server.create(callback)` Create a test server. This method gets called by the core module when attester starts.

## Events

- `server.error` When the server encounters an error. This is usually something bad!
- `server.listening` When the server is started and listening on the specified port. The server port can be configured with the configuration option `port`.
