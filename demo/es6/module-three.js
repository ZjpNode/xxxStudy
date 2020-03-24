/*
 * @Author       : jiapeng.Zheng
 * @Date         : 2018-05-17 09:03:16
 * @LastEditors  : jiapeng.Zheng
 * @LastEditTime : 2020-03-24 12:19:36
 * @Description  : 
 */
export const s = 1;
export default function sayBymoduleThree (msg) {
  console.log('sayBymoduleThree', this) // this === undefined
}