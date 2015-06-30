#!/bin/sh

DIR=$(dirname $0)

echo Compressing JavaScript with Google Closure Compiler and CSS with cssminifier.com.
head -n 5 "${DIR}/../src/pnotify.core.js" > "${DIR}/../src/pnotify.core.min.js"
java -jar "${DIR}/compiler.jar" --js="${DIR}/../src/pnotify.core.js" >> "${DIR}/../src/pnotify.core.min.js"
curl --data-urlencode input@"${DIR}/../src/pnotify.core.css" http://cssminifier.com/raw > "${DIR}/../src/pnotify.core.min.css"

java -jar "${DIR}/compiler.jar" --js="${DIR}/../src/pnotify.buttons.js" > "${DIR}/../src/pnotify.buttons.min.js"
curl --data-urlencode input@"${DIR}/../src/pnotify.buttons.css" http://cssminifier.com/raw > "${DIR}/../src/pnotify.buttons.min.css"
java -jar "${DIR}/compiler.jar" --js="${DIR}/../src/pnotify.callbacks.js" > "${DIR}/../src/pnotify.callbacks.min.js"
java -jar "${DIR}/compiler.jar" --js="${DIR}/../src/pnotify.confirm.js" > "${DIR}/../src/pnotify.confirm.min.js"
java -jar "${DIR}/compiler.jar" --js="${DIR}/../src/pnotify.desktop.js" > "${DIR}/../src/pnotify.desktop.min.js"
java -jar "${DIR}/compiler.jar" --js="${DIR}/../src/pnotify.history.js" > "${DIR}/../src/pnotify.history.min.js"
curl --data-urlencode input@"${DIR}/../src/pnotify.history.css" http://cssminifier.com/raw > "${DIR}/../src/pnotify.history.min.css"
java -jar "${DIR}/compiler.jar" --js="${DIR}/../src/pnotify.nonblock.js" > "${DIR}/../src/pnotify.nonblock.min.js"
java -jar "${DIR}/compiler.jar" --js="${DIR}/../src/pnotify.reference.js" > "${DIR}/../src/pnotify.reference.min.js"
java -jar "${DIR}/compiler.jar" --js="${DIR}/../src/pnotify.tooltip.js" > "${DIR}/../src/pnotify.tooltip.min.js"
java -jar "${DIR}/compiler.jar" --js="${DIR}/../src/pnotify.mobile.js" > "${DIR}/../src/pnotify.mobile.min.js"

curl --data-urlencode input@"${DIR}/../src/pnotify.picon.css" http://cssminifier.com/raw > "${DIR}/../src/pnotify.picon.min.css"

echo Done.