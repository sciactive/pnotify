#!/bin/sh

echo Compressing JavaScript with Google Closure Compiler.
head -n 11 "../jquery.pnotify.js" > "../jquery.pnotify.min.js"
java -jar compiler.jar --js="../jquery.pnotify.js" >> "../jquery.pnotify.min.js"

echo Done.