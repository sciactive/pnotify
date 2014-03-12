#!/bin/sh

DIR=$(dirname $0)

echo Setting up directory structure.
mkdir "${DIR}/pnotify"
mkdir "${DIR}/pnotify/use for picon"
echo Importing files.
cp "${DIR}/../jquery.pnotify.default.icons.css" "${DIR}/pnotify/use for picon/"
cp "${DIR}/../jquery.pnotify.default.css" "${DIR}/pnotify/"
cp "${DIR}/../jquery.pnotify.js" "${DIR}/pnotify/"

echo Compressing JavaScript with Google Closure Compiler.
head -n 11 "${DIR}/pnotify/jquery.pnotify.js" > "${DIR}/pnotify/jquery.pnotify.min.js"
java -jar "${DIR}/compiler.jar" --js="${DIR}/pnotify/jquery.pnotify.js" >> "${DIR}/pnotify/jquery.pnotify.min.js"

CURDIR=$(pwd)
cd "${DIR}/"

echo Zipping the whole directory.
zip -r pnotify.zip pnotify

echo Cleaning up.
rm -r pnotify/

cd "${CURDIR}/"

echo Done.