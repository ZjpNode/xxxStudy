import say from './module-two.js'
import { s, sayBymoduleTwo2, sayBymoduleTwo } from './module-two.js'
import sayBymoduleThree from './module-three.js'
import sayBymoduleFour from './module-four.js'

document.getElementById('importTwo').addEventListener('click', function () {
  say.sayBymoduleTwo()
  say.sayBymoduleTwo2()
  sayBymoduleTwo()
  sayBymoduleTwo2()
  sayBymoduleThree()
  sayBymoduleFour()
}, false)

