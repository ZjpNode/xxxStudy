/*
 * @Author: jiapeng.Zheng
 * @Date: 2019-11-11 11:26:31
 * @LastEditors: jiapeng.Zheng
 * @LastEditTime: 2019-11-14 11:22:20
 * @Description: 希尔排序，时间复杂度：通常认为是O(N3/2)，稳定性：不稳定
 */
/**
 * 希尔排序
 * @param {Array<number>} arr 源数组
 * @description
 * 希尔排序(Shell's Sort)是插入排序的一种又称“缩小增量排序”(Diminishing Increment Sort),
 * 是直接插入排序算法的一种更高效的改进版本。
 * 希尔排序是非稳定排序算法。
 */
let shellSort = arr => {
  arr = (arr || []).slice(0)
  let len = arr.length
  let dk = parseInt(len / 2) // 增量
  // let increament = len / 2 // 增量
  while (dk >= 1) {
    for (let i = dk; i < len; i++) {
      let temp = arr[i]
      let insertIndex = i - dk
      while (insertIndex >= 0 && arr[insertIndex] > temp) {
        arr[insertIndex + dk] = arr[insertIndex] // 当前元素后移一位
        insertIndex = insertIndex - dk
      }
      arr[insertIndex + dk] = temp // 找到了插入位置，插入待排序元素
    }
    dk = parseInt(dk / 2)
  }

  return arr
}
module.exports = shellSort
