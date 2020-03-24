/*
 * @Author       : jiapeng.Zheng
 * @Date         : 2018-05-17 09:03:16
 * @LastEditors  : jiapeng.Zheng
 * @LastEditTime : 2020-03-24 12:19:29
 * @Description  : 
 */
export const s = 1;
console.log("module-four.js", this); // this === undefined
export default (msg) => {
  console.log('sayBymoduleFour', this) // this === undefined
}