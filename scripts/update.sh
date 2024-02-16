#! /bin/bash

set -e

curl https://raw.githubusercontent.com/osmlab/editor-layer-index/gh-pages/imagery.json | jq > ./static/imagery.json
