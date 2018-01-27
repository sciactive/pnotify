// Not working? Did you `npm install` `npm run build` first?

var PNotify = require("pnotify/lib/umd/PNotify.js").default;

document.getElementById("button1").addEventListener("click", function(){
    PNotify.notice({
        title: "Yay!",
        text: "It works!"
    });
});

document.getElementById("button2").addEventListener("click", function(){
    require("pnotify/lib/umd/PNotifyReference.js");

    PNotify.notice({
        title: "Yay!",
        text: "It works!",
        modules: {
          Reference: {
              put_thing: true
          }
        }
    });
});
