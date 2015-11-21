#!/bin/sh

DIR=$(dirname $0)

# Core
echo Compressing JavaScript with Google Closure Compiler and CSS with cssminifier.com.
head -n 5 "${DIR}/../src/pnotify.js" > "${DIR}/../dist/pnotify.js"
java -jar "${DIR}/compiler.jar" --js="${DIR}/../src/pnotify.js" >> "${DIR}/../dist/pnotify.js"
curl --data-urlencode input@"${DIR}/../src/pnotify.css" http://cssminifier.com/raw > "${DIR}/../dist/pnotify.css"

# Buttons
java -jar "${DIR}/compiler.jar" --js="${DIR}/../src/pnotify.buttons.js" > "${DIR}/../dist/pnotify.buttons.js"
curl --data-urlencode input@"${DIR}/../src/pnotify.buttons.css" http://cssminifier.com/raw > "${DIR}/../dist/pnotify.buttons.css"

# Callbacks
java -jar "${DIR}/compiler.jar" --js="${DIR}/../src/pnotify.callbacks.js" > "${DIR}/../dist/pnotify.callbacks.js"

# Confirm
java -jar "${DIR}/compiler.jar" --js="${DIR}/../src/pnotify.confirm.js" > "${DIR}/../dist/pnotify.confirm.js"

# Desktop
java -jar "${DIR}/compiler.jar" --js="${DIR}/../src/pnotify.desktop.js" > "${DIR}/../dist/pnotify.desktop.js"

# History
java -jar "${DIR}/compiler.jar" --js="${DIR}/../src/pnotify.history.js" > "${DIR}/../dist/pnotify.history.js"
curl --data-urlencode input@"${DIR}/../src/pnotify.history.css" http://cssminifier.com/raw > "${DIR}/../dist/pnotify.history.css"

# Non-block
java -jar "${DIR}/compiler.jar" --js="${DIR}/../src/pnotify.nonblock.js" > "${DIR}/../dist/pnotify.nonblock.js"

# Reference
#java -jar "${DIR}/compiler.jar" --js="${DIR}/../src/pnotify.reference.js" > "${DIR}/../dist/pnotify.reference.js"

# Tooltop
#java -jar "${DIR}/compiler.jar" --js="${DIR}/../src/pnotify.tooltip.js" > "${DIR}/../dist/pnotify.tooltip.js"

# Mobile
java -jar "${DIR}/compiler.jar" --js="${DIR}/../src/pnotify.mobile.js" > "${DIR}/../dist/pnotify.mobile.js"
curl --data-urlencode input@"${DIR}/../src/pnotify.mobile.css" http://cssminifier.com/raw > "${DIR}/../dist/pnotify.mobile.css"

# Bright Theme
curl --data-urlencode input@"${DIR}/../src/pnotify.brighttheme.css" http://cssminifier.com/raw > "${DIR}/../dist/pnotify.brighttheme.css"

# Animate
java -jar "${DIR}/compiler.jar" --js="${DIR}/../src/pnotify.animate.js" > "${DIR}/../dist/pnotify.animate.js"

echo Done.