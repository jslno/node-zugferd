#!/bin/bash

set -e

# exit if dev directory does not exist
if [ ! -d "dev" ]; then
    echo "❌ Dev directory does not exist"
    exit 1
fi

rm -rf dev

echo "✓ Reset complete"
exit 0