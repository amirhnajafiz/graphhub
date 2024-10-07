#!/bin/bash

# check if the app build directory exists
if [ -d "app/build" ]; then
    echo "Moving new app build files..."
    mv app/build/ public/
    echo "New app files have been moved successfully."
else
    echo "Error: app/build directory does not exist."
    exit 1
fi
