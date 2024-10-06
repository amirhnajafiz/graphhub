#!/bin/bash

# remove old app files
echo "Removing old app files..."
rm -rf assets blog docs img markdown-page
rm -f .nojeykll 404.html index.html sitemap.xml

# check if the app build directory exists
if [ -d "app/build" ]; then
    echo "Moving new app build files..."
    mv app/build/* ./
    # Handle hidden files (e.g., .htaccess)
    shopt -s dotglob
    mv app/build/.* ./
    shopt -u dotglob
    echo "New app files have been moved successfully."
else
    echo "Error: app/build directory does not exist."
    exit 1
fi
