/*
 * @Author: jiapeng.Zheng
 * @Date: 2019-11-11 14:34:37
 * @LastEditors: jiapeng.Zheng
 * @LastEditTime: 2019-11-11 14:40:29
 * @Description: 交换数组中的两个数
 */
/**
 * 交换数组中的两个数
 * @param {Array} arr   数组
 * @param {number} i    数组中要交换的数的下标1
 * @param {number} j    数组中要交换的数的下标2
 */
module.exports = (arr, i, j) => {
  let tmp = arr[i]
  arr[i] = arr[j]
  arr[j] = tmp
}
