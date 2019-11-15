/*
 * @Author: jiapeng.Zheng
 * @Date: 2019-11-11 11:26:31
 * @LastEditors: jiapeng.Zheng
 * @LastEditTime: 2019-11-14 17:42:01
 * @Description: 冒泡排序,时间复杂度：O(N²), 稳定性：稳定
 */
let swap = require('../../lib/swap')
/**
 *
 * @param {Array} arr 源数组
 */
let bubbleSortV1 = arr => {
  arr = (arr || []).slice(0)
  let len = arr.length
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1)
      }
    }
  }
  return arr
}
/**
 *
 * @param {Array} arr 源数组
 */
let bubbleSortV2 = arr => {
  arr = (arr || []).slice(0)
  let len = arr.length
  let isLoop = true
  for (let i = 0; i < len - 1 && isLoop; i++) {
    isLoop = false
    for (let j = 0; j < len - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1)
        isLoop = true
      }
    }
  }
  return arr
}
/**
 *
 * @param {Array} arr 源数组
 */
let bubbleSortV3 = arr => {
  arr = (arr || []).slice(0)
  let len = arr.length
  let lastExchangeIndex = 0
  let sortBorder = len - 1
  let isLoop = true
  for (let i = 0; i < len - 1 && isLoop; i++) {
    isLoop = false
    for (let j = 0; j < sortBorder; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1)
        isLoop = true
        lastExchangeIndex = j
      }
    }
    sortBorder = lastExchangeIndex
  }
  return arr
}
module.exports = {
  v1: bubbleSortV1,
  v2: bubbleSortV2,
  v3: bubbleSortV3
}
