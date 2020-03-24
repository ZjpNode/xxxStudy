/*
 * @Author       : jiapeng.Zheng
 * @Date         : 2018-05-17 09:03:16
 * @LastEditors  : jiapeng.Zheng
 * @LastEditTime : 2020-03-24 14:12:26
 * @Description  : 
 */
export const s = 1;
export default {
  sayBymoduleTwo: function (msg) {
    console.log('say.sayBymoduleTwo', this) // this !== undefined
  },
  sayBymoduleTwo2: msg => {
    console.log('say.sayBymoduleTwo2', this) // this === undefined
  }
}
export function sayBymoduleTwo(msg) {
  console.log('sayBymoduleTwo', this) // this === undefined
}
export let sayBymoduleTwo2 = msg => {
  console.log('sayBymoduleTwo2', this) // this === undefined
}