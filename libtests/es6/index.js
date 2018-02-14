import PNotify from "../../lib/es/PNotify.js";
import PNotifyReference from "../../lib/es/PNotifyReference.js";

document.getElementById("button1").addEventListener("click", function(){
  PNotify.notice({
    title: "Yay!",
    text: "It works!"
  });
});
document.getElementById("button2").addEventListener("click", function(){
  PNotify.notice({
    title: "Yay!",
    text: "It works!",
    modules: {
      Reference: {
        putThing: true
      }
    }
  });
});
