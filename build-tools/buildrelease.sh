#!/bin/sh

echo Setting up directory structure.
mkdir "jquery.pnotify"
mkdir "jquery.pnotify/use for pines style icons"
echo Importing files.
cp "../jquery.pnotify.default.icons.css" "jquery.pnotify/use for picon/"
cp "../jquery.pnotify.default.css" "jquery.pnotify/"
cp "../jquery.pnotify.js" "jquery.pnotify/"

echo Compressing JavaScript with Google Closure Compiler.
head -n 11 jquery.pnotify/jquery.pnotify.js > jquery.pnotify/jquery.pnotify.min.js
java -jar compiler.jar --js=jquery.pnotify/jquery.pnotify.js >> jquery.pnotify/jquery.pnotify.min.js

echo Zipping the whole directory.
cd jquery.pnotify/
zip -r pnotify.zip .
cd ..
mv jquery.pnotify/pnotify.zip .

echo Cleaning up.
rm -r jquery.pnotify/

echo Done.