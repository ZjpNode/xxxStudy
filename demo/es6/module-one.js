import say from './module-two.js';
import {s} from './module-two.js'

alert("module-one.js");

document.getElementById('importTwo').addEventListener('click', function () {
  say('123,' + s);
}, false)

