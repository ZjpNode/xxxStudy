/*
 * @Author: jiapeng.Zheng
 * @Date: 2019-11-11 11:26:31
 * @LastEditors: jiapeng.Zheng
 * @LastEditTime: 2019-11-15 14:32:00
 * @Description: 快速排序
 * 时间复杂度：O(N log2 N)
 * 辅助空间：O(n)
 * 稳定性：不稳定
 */
let quickSortV1 = (arr, _logName = '') => {
  arr = (arr || []).slice(0)
  let len = arr.length
  if (!len) return []
  let pivot = arr[0]
  let leftArr = []
  // let midArr = [pivot]
  let rightArr = []
  for (let i = 1; i < len; i++) {
    if (arr[i] >= pivot) {
      rightArr.push(arr[i])
    }
    if (arr[i] < pivot) {
      leftArr.push(arr[i])
    }
  }
  return quickSortV1(leftArr, 'left').concat(pivot, quickSortV1(rightArr, 'right'))
}

/**
 * 查找3个数中间数
 * @param {number} a 值1
 * @param {number} b 值2
 * @param {number} c 值3
 */
let _getMidVal = (a, b, c) => {
  if ((b - a) * (a - c) >= 0) {
    return a
  } else if ((a - b) * (b - c) >= 0) {
    return b
  } else {
    return c
  }
}

let quickSortV2 = (arr, _logName = '') => {
  arr = (arr || []).slice(0)
  let len = arr.length
  if (!len) return []
  let pivot = _getMidVal(arr[0], arr[len / 2], arr[len - 1]) // 随机取出来3个数，取中间大小的为基准值
  let leftArr = []
  let midArr = []
  let rightArr = []
  for (let i = 0; i < len; i++) {
    if (arr[i] > pivot) {
      rightArr.push(arr[i])
    }
    if (arr[i] === pivot) {
      midArr.push(arr[i])
    }
    if (arr[i] < pivot) {
      leftArr.push(arr[i])
    }
  }
  return quickSortV2(leftArr, 'left').concat(midArr, quickSortV2(rightArr, 'right'))
}
module.exports = {
  v1: quickSortV1,
  v2: quickSortV2
}
