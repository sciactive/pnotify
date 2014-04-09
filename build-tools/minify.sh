#!/bin/sh

DIR=$(dirname $0)

echo Compressing JavaScript with Google Closure Compiler.
head -n 9 "${DIR}/../pnotify.core.js" > "${DIR}/../pnotify.core.min.js"
java -jar "${DIR}/compiler.jar" --js="${DIR}/../pnotify.core.js" >> "${DIR}/../pnotify.core.min.js"

java -jar "${DIR}/compiler.jar" --js="${DIR}/../pnotify.buttons.js" > "${DIR}/../pnotify.buttons.min.js"
java -jar "${DIR}/compiler.jar" --js="${DIR}/../pnotify.callbacks.js" > "${DIR}/../pnotify.callbacks.min.js"
java -jar "${DIR}/compiler.jar" --js="${DIR}/../pnotify.confirm.js" > "${DIR}/../pnotify.confirm.min.js"
java -jar "${DIR}/compiler.jar" --js="${DIR}/../pnotify.desktop.js" > "${DIR}/../pnotify.desktop.min.js"
java -jar "${DIR}/compiler.jar" --js="${DIR}/../pnotify.history.js" > "${DIR}/../pnotify.history.min.js"
java -jar "${DIR}/compiler.jar" --js="${DIR}/../pnotify.nonblock.js" > "${DIR}/../pnotify.nonblock.min.js"
java -jar "${DIR}/compiler.jar" --js="${DIR}/../pnotify.tooltip.js" > "${DIR}/../pnotify.tooltip.min.js"

echo Done.