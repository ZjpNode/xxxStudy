/*
 * @Author: jiapeng.Zheng
 * @Date: 2019-11-11 11:26:31
 * @LastEditors: jiapeng.Zheng
 * @LastEditTime: 2019-11-13 15:51:28
 * @Description: 插入排序,时间复杂度：O(N²), 稳定性：稳定
 */
let insertSort = arr => {
  arr = (arr || []).slice(0)
  let _time = 0
  let len = arr.length
  if (!len) return []
  let insertArr = [arr[0]]
  for (let i = 1; i < len; i++) {
    let insertIndex = insertArr.length
    for (let j = 0; j < insertArr.length; j++) {
      if (arr[i] <= insertArr[j]) {
        insertIndex = j
        break
      }
      _time++
    }
    insertArr = insertArr.splice(0, insertIndex).concat(arr[i], insertArr)
  }
  console.log('time: ', _time)
  return insertArr
}
module.exports = insertSort
