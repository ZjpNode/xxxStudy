/*
 * @Author: jiapeng.Zheng
 * @Date: 2019-11-11 11:26:31
 * @LastEditors: jiapeng.Zheng
 * @LastEditTime: 2019-11-14 17:43:46
 * @Description: 选择排序,时间复杂度：O(N2), 稳定性：不稳定
 */
let swap = require('../../lib/swap')
/**
 *
 * @param {Array} arr 源数组
 */
let selectSortV1 = arr => {
  arr = (arr || []).slice(0)
  let len = arr.length
  for (let i = 0; i < len; i++) {
    let minIndex = i
    for (let j = i + 1; j < len; j++) {
      if (arr[minIndex] > arr[j]) {
        minIndex = j
      }
    }
    if (minIndex !== i) {
      swap(arr, i, minIndex)
    }
  }
  return arr
}
/**
 *
 * @param {Array} arr 源数组
 */
let selectSortV2 = arr => {
  arr = (arr || []).slice(0)
  let len = arr.length
  for (let i = 0; i < len / 2; i++) {
    let minIndex = i
    let maxIndex = i // len - i - 1
    for (let j = i + 1; j <= len - i - 1; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
        continue
      }
      if (arr[j] > arr[maxIndex]) {
        maxIndex = j
      }
    }
    if (i !== minIndex) {
      swap(arr, i, minIndex)
      // 原来的第一个元素已经与下标为minPoint的元素交换了位置
      // 如果之前maxPoint指向的是第一个元素，那么需要将maxPoint重新指向array[minPoint]
      // 因为现在array[minPoint]存放的才是之前第一个元素中的数据
      if (maxIndex === i) {
        maxIndex = minIndex
      }
    }
    if (len - i - 1 !== maxIndex) {
      swap(arr, len - i - 1, maxIndex)
    }
  }
  return arr
}
module.exports = {
  v1: selectSortV1,
  v2: selectSortV2
}
