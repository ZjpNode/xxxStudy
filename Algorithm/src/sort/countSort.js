/*
 * @Author: jiapeng.Zheng
 * @Date: 2019-11-11 11:26:31
 * @LastEditors: jiapeng.Zheng
 * @LastEditTime: 2019-11-14 17:42:24
 * @Description: 计数排序，时间复杂度：O(n+k)，稳定性：稳定
 * 计数排序是一种非基于比较的排序算法，其空间复杂度和时间复杂度均为O(n+k)，其中k是整数的范围。基于比较的排序算法时间复杂度最小是O(nlogn)的
 */
let countSort = arr => {
  arr = (arr || []).slice(0)
  let len = arr.length
  let countArr = []
  let max = Math.max(...arr)
  let min = Math.min(...arr)
  let range = max - min + 1
  countArr = Array(range).fill(0)
  for (let i = 0; i < len; i++) {
    countArr[arr[i] - min] += 1
  }
  let arrIndex = 0
  for (let j = 0; j < range; j++) {
    if (countArr[j] > 0) {
      while (countArr[j]) {
        arr[arrIndex] = j + min
        arrIndex++
        countArr[j] -= 1
      }
    }
  }

  return arr
}
module.exports = countSort
