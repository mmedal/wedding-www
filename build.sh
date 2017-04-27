#!/usr/bin/env bash

# all commands must exit 0
set -e

# clean build folder
rm -rf build/
mkdir build/

# minimize html
html-minifier -o build/index.html --remove-tag-whitespace --remove-comments --collapse-whitespace --collapse-inline-tag-whitespace index.html

# minimize css
cleancss -02 -o build/app.css css/bootstrap.css css/bootstrap-grid.css css/animate.css css/wedding.css css/icon.css

# copy other files
cp CNAME build/
# cp img/favicon-196x196.png build/
cp img/* build/
