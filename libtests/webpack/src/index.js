// Not working? Did you `npm install` `npm run build` first?
import simpleNotice from './simple-notice';
import moduleNotice from './module-notice';

document.getElementById("button1").addEventListener("click", function(){
  simpleNotice();
});

document.getElementById("button2").addEventListener("click", function(){
  moduleNotice();
});
