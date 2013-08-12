# Event module

This module is a simple publish / subscriber bus for events. It allow to decouple modules that don't have to register listeners on other modules but can simply listen to this module.


## Methods

This module is an instance of [`EventEmitter2`](https://github.com/hij1nx/EventEmitter2), so it provides the same API.

The module supports `wildcards` as it's created with

````js
new EventEmitter2({
    wildcard: true
});
````

On top of `EventEmitter2` API it also provides the method

- `attester.event.forward` It allows to forward a given event
    ````js
    myEventEmitter.on("myEvent", attester.event.forward("attester.forwarded"));
    // Any time the object `myEventEmitter` emits the event `myEvent`
    // the event `attester.forwarded` is emitted as well
    ````
