#!/bin/bash

# remove old app files
echo "Removing old app files..."
rm -rf assets blog docs img markdown-page
rm -f .nojekyll 404.html index.html sitemap.xml

# build the new app
cd app
npm run build
cd ..

# check if the app build directory exists
if [ -d "app/build" ]; then
    echo "Moving new app build files..."
    mv app/build/* ./
    echo "New app files have been moved successfully."
    rmdir app/build
else
    echo "Error: app/build directory does not exist."
    exit 1
fi
