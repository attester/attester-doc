# Campaign module

This module is used to create campaigns from a configuration object.

## Methods

<aside class="note">Working with `YAML` files it's possible to read the content of a file and convert it to `JSON` using [`attester.config.readFile()`](/api/config.html)</aside>

- `attester.campaign.create(campaign, override)` Create a campaign from the configuration object.
  - `campaign` is a `JSON` object that describe the campaign, the format is described in the article about [confguration file](/usage/configuration.html).
  - `override` is another `JSON` object, optional, that can be used to override values from the previous object.

## Events

- `campaign.create` When `attester.campaign.create()` gets called
