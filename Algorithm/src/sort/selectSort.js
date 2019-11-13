/*
 * @Author: jiapeng.Zheng
 * @Date: 2019-11-11 11:26:31
 * @LastEditors: jiapeng.Zheng
 * @LastEditTime: 2019-11-13 10:20:01
 * @Description: 选择排序,时间复杂度：O(N2), 稳定性：不稳定
 */
let swap = require('../../lib/swap')
/**
 *
 * @param {Array} arr 源数组
 */
let selectSortV1 = arr => {
  arr = (arr || []).slice(0)
  let _time = 0
  let len = arr.length
  for (let i = 0; i < len; i++) {
    let minIndex = i
    for (let j = i + 1; j < len; j++) {
      if (arr[minIndex] > arr[j]) {
        minIndex = j
      }
      _time++
    }
    if (minIndex !== i) {
      swap(arr, i, minIndex)
    }
  }
  console.log('time: ', _time)
  return arr
}
/**
 *
 * @param {Array} arr 源数组
 */
let selectSortV2 = arr => {
  arr = (arr || []).slice(0)
  let _time = 0
  let len = arr.length
  for (let i = 0; i < len / 2; i++) {
    let minIndex = i
    let maxIndex = len - i - 1
    for (let j = i + 1; j <= len - i - 1; j++) {
      if (arr[j] > arr[maxIndex]) {
        maxIndex = j
      }
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
      _time++
    }

    swap(arr, i, minIndex)
    swap(arr, len - i - 1, maxIndex)
  }
  console.log('time: ', _time)
  return arr
}
module.exports = {
  v1: selectSortV1,
  v2: selectSortV2
}
