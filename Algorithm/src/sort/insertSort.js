/*
 * @Author: jiapeng.Zheng
 * @Date: 2019-11-11 11:26:31
 * @LastEditors: jiapeng.Zheng
 * @LastEditTime: 2019-11-15 14:30:43
 * @Description: 插入排序
 * 时间复杂度：O(N²)
 * 辅助空间：O(1)
 * 稳定性：稳定
 */
/**
 * 直接插入
 * @param {Array<number>} arr 源数组
 */
let insertSortV1 = arr => {
  arr = (arr || []).slice(0)
  let len = arr.length
  if (!len) return []
  // let insertArr = [arr[0]]
  for (let i = 1; i < len; i++) {
    let temp = arr[i] // 存储待排序的元素值
    let insertPoint = i - 1 // 与待排序元素值作比較的元素的下标
    while (insertPoint >= 0 && arr[insertPoint] > temp) {
      // 当前元素比待排序元素大
      arr[insertPoint + 1] = arr[insertPoint] // 当前元素后移一位
      insertPoint--
    }
    arr[insertPoint + 1] = temp // 找到了插入位置，插入待排序元素

    // for (let j = 0; j < insertArr.length; j++) {
    //   if (arr[i] <= insertArr[j]) {
    //     insertIndex = j
    //     break
    //   }
    // }

    // insertArr = insertArr.splice(0, insertIndex).concat(arr[i], insertArr)
  }
  return arr
}
/**
 * 二分查找法
 * @param {Array} array         要查找的段
 * @param {number} lowerBound   查找段的最小下标
 * @param {number} upperBound   查找段的最大下标
 * @param {number} target       目标元素
 * @return 目标元素应该插入位置的下标
 */
let binarySearch = (array, lowerBound, upperBound, target) => {
  let curIndex
  while (lowerBound < upperBound) {
    curIndex = Math.round((lowerBound + upperBound) / 2)
    if (array[curIndex] > target) {
      upperBound = curIndex - 1
    } else {
      lowerBound = curIndex + 1
    }
  }
  if (array[lowerBound] < target) {
    lowerBound++
  }
  return lowerBound
}
/**
 * 二分插入
 * @param {Array<number>} arr 源数组
 */
let insertSortV2 = arr => {
  arr = (arr || []).slice(0)
  let len = arr.length
  if (!len) return []
  // let insertArr = [arr[0]]
  for (let i = 1; i < len; i++) {
    let temp = arr[i] // 存储待排序的元素值
    if (arr[i - 1] > temp) {
      // 比有序数组的最后一个元素要小
      let insertIndex = binarySearch(arr, 0, i - 1, temp)
      for (let j = i; j > insertIndex; j--) {
        // 将有序数组中，插入点之后的元素后移一位
        arr[j] = arr[j - 1]
      }

      arr[insertIndex] = temp // 插入待排序元素到正确的位置
    }
  }
  return arr
}
/**
 * 2-路插入
 * @param {Array<number>} arr 源数组
 * @deprecated 在二分插入排序的基础上进一步改进的排序。其目的是降低排序过程中移动记录的次数，但为此须要n个记录的辅助空间
 */
let insertSortV3 = arr => {
  arr = (arr || []).slice(0)
  let len = arr.length
  if (!len) return []
  let insertArr = [arr[0]]
  for (let i = 1; i < len; i++) {
    let insertIndex
    if (arr[i] < insertArr[0]) {
      // 比有序数组的第一个元素要小
      insertIndex = 0
    } else if (arr[i] > insertArr[insertArr.length - 1]) {
      // 比有序数组的最后一个元素要大
      insertIndex = insertArr.length
    } else {
      insertIndex = binarySearch(insertArr, 0, insertArr.length - 1, arr[i])
    }
    // insertArr = insertArr.splice(0, insertIndex).concat(arr[i], insertArr)
    insertArr.splice(insertIndex, 0, arr[i])
  }
  return insertArr
}

module.exports = {
  v1: insertSortV1,
  v2: insertSortV2,
  v3: insertSortV3
}
