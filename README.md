# Attester Documentation

I appreciate that you take the time to read the documentation of a documentation generator. Thanks

## Architecture

It's very simple, articles are written in markdown and CSS in SASS, but to avoid any server side processing, everything is exported into static HTML pages.

The project structure is as follows

* `doc` Markdown articles, organized by folders respecting the site navigation
* `lib` Anything needed to generate the static pages, like Jade templates, SCSS files and node tools
* `static` Any other file that is simply static, it just wants to be copied on the server

## Publish

To generate the site structure you can simply run

````bash
grunt
````

It'll generate the site inside `public` folder, this is not on GIT.

## Development

If you want to write an article and see it live in your browser you can run

````bash
grunt dev
````

And target

````
http://localhost:8090
````

The server uses LiveReload to automatically refresh your browser when a file changes

### Markdown

The markdown in the article is the GitHub Flavored Markdown with the addition of some styling.

* The Table of Contents `TOC` is generated automatically from heading 1~3. It's recommended to have only one heading of level 1 as it's considered as the article's title and it's not an anchor in the TOC.

* Side notes (floating right with green border) are created adding the following markup

````html
<aside class="note">I'm a note</aside>
````