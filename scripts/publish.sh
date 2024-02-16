#! /bin/bash

set -e

./scripts/update.sh
npm publish --access public
