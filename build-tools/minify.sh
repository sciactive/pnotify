#!/bin/sh

DIR=$(dirname $0)

echo Compressing JavaScript with Google Closure Compiler.
head -n 11 "${DIR}/../jquery.pnotify.js" > "${DIR}/../jquery.pnotify.min.js"
java -jar "${DIR}/compiler.jar" --js="${DIR}/../jquery.pnotify.js" >> "${DIR}/../jquery.pnotify.min.js"

echo Done.