#! /bin/bash

for dir in packages/*; do
  if [ "$dir" != "packages/core" ]; then
    cd "$dir"
    $@
    cd ../..
  fi
done
