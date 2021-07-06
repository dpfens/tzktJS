#!/bin/bash

echo "Building compiled version"
tsc --project tsconfig.json
echo "Building modules"
tsc --project tsconfig.modules.json

echo "Building Documentation"
npm install typedoc && npx typedoc --name "tzKT.JS" --gaID "UA-56708312-3"
