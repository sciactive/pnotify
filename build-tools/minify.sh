#!/bin/sh

DIR=$(dirname $0)

echo Compressing JavaScript with Google Closure Compiler and CSS with cssminifier.com.
head -n 5 "${DIR}/../pnotify.core.js" > "${DIR}/../pnotify.core.min.js"
java -jar "${DIR}/compiler.jar" --js="${DIR}/../pnotify.core.js" >> "${DIR}/../pnotify.core.min.js"
curl --data-urlencode input@"${DIR}/../pnotify.core.css" http://cssminifier.com/raw > "${DIR}/../pnotify.core.min.css"

java -jar "${DIR}/compiler.jar" --js="${DIR}/../pnotify.buttons.js" > "${DIR}/../pnotify.buttons.min.js"
curl --data-urlencode input@"${DIR}/../pnotify.buttons.css" http://cssminifier.com/raw > "${DIR}/../pnotify.buttons.min.css"
java -jar "${DIR}/compiler.jar" --js="${DIR}/../pnotify.callbacks.js" > "${DIR}/../pnotify.callbacks.min.js"
java -jar "${DIR}/compiler.jar" --js="${DIR}/../pnotify.confirm.js" > "${DIR}/../pnotify.confirm.min.js"
java -jar "${DIR}/compiler.jar" --js="${DIR}/../pnotify.desktop.js" > "${DIR}/../pnotify.desktop.min.js"
java -jar "${DIR}/compiler.jar" --js="${DIR}/../pnotify.history.js" > "${DIR}/../pnotify.history.min.js"
curl --data-urlencode input@"${DIR}/../pnotify.history.css" http://cssminifier.com/raw > "${DIR}/../pnotify.history.min.css"
java -jar "${DIR}/compiler.jar" --js="${DIR}/../pnotify.nonblock.js" > "${DIR}/../pnotify.nonblock.min.js"
java -jar "${DIR}/compiler.jar" --js="${DIR}/../pnotify.reference.js" > "${DIR}/../pnotify.reference.min.js"
java -jar "${DIR}/compiler.jar" --js="${DIR}/../pnotify.tooltip.js" > "${DIR}/../pnotify.tooltip.min.js"

curl --data-urlencode input@"${DIR}/../pnotify.picon.css" http://cssminifier.com/raw > "${DIR}/../pnotify.picon.min.css"

echo Done.