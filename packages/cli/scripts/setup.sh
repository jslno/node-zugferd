#!/bin/bash

set -e

# exit if dev directory already exists
if [ -d "dev" ]; then
    exit 0
fi

mkdir -p dev

touch dev/package.json

printf '{
    "name": "@node-zugferd/cli-dev",
    "version": "0.0.0",
    "private": true,
    "type": "module"
}' > dev/package.json

echo "✓ Setup complete"
exit 0
