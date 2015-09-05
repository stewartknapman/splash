# Splash

A rapid web prototyping tool based on the liquid templating language.

## Soo... what?

We want to take a json file, a liquid template and then mash them together into a static file.

If data.json file is prefixed with .liquid it will be run through the liquid compiler first.
You will not be able to use any objects within it i.e. `product.title` but you will be able to use includes, filters, variables and loops.
This is good if you want to create repeating or nested data.

(Note to self: collection.json needs to match to collection.liquid so that {{ title }} inside collection comes from collection.title)

## Commands

`splash`: run a static build of your site once.

`splash watch`: watch files in your site and re-build when they change.

`splash serve`: run a local server to host the files. Will not output the static files to the build folder. Will watch for changes and reload the page.

## Options

`-d || --data [path]`: Directory or file containing data (.json || .json.liquid). Default is ./data

`-t || --templates [path]`: Directory containing liquid templates. Default is ./templates

`-i || --includes [path]`: Directory containing liquid includes. Default is ./includes

`-o || --output [path]`: Output directory. Default is ./build