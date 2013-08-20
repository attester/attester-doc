# Middlewares module

This module is a convenience module to provide middlewares to serve file or folders.

## Methods

<aside class="note">See also [how to write plugins](/usage/write_plugins.html)</aside>

- `attester.middlewares.staticFile()` Serve a single file. The method must be bound to an object containing:
    - `page` The name of the file as served by the server.
    - `path` The file path on the disk.
- `attester.middlewares.staticFolder(path)` Serve a static folder from the disk. This is an alias to `connect.static`
- `attester.middlewares.template()` Serve a page using `lodash` [template engine](http://lodash.com/docs#template). The method must be bound to an object containing:
    - `page` The name of the file as served by the server.
    - `template` The template text or in alternative `path` The template file path on the disk.
    - `data` The data object used to populate the text inside the template.

    From the template it's possible to access to

    - `data` The data object bound to the `template` middleware.
    - `url` The parsed `URL` of the request.
    - `query` The parsed query string.
