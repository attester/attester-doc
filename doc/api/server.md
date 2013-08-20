# Server module

The server module is responsible of starting a test server which is then serving files to connected slaves and gathering results.


## Methods

- `attester.server.create(callback)` Create a test server. This method gets called by the core module when attester starts.
- `attester.server.addCampaign(campaing)` Notify the test server that a new campaign should be run.
- `attester.server.use(path, middleware)` Add a given middleware to the one already served. This should normally be called by plugins that want to include global middlewares to be served on any campaign. The syntax is the same an [`connect` module](http://www.senchalabs.org/connect/).

## Events

- `server.error` When the server encounters an error. This is usually something bad!
- `server.listening` When the server is started and listening on the specified port. The server port can be configured with the configuration option `port`.
