#!/bin/bash

# remove old app files
echo "Removing old app files..."
rm -rf assets blog docs img markdown-page
rm -f .nojekyll 404.html index.html sitemap.xml
rm -rf public
rm -rf app/build
