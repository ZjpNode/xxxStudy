/*
 * @Author: jiapeng.Zheng
 * @Date: 2019-11-11 11:26:31
 * @LastEditors: jiapeng.Zheng
 * @LastEditTime: 2019-11-15 14:31:12
 * @Description: 归并排序
 * 时间复杂度：O(N log2 N)
 * 辅助空间：O(n)
 * 稳定性：稳定
 *
 * 采用了分治和递归的思想，递归&分治-排序整个数列如同排序两个有序数列，
 * 依次执行这个过程直至排序末端的两个元素，再依次向上层输送排序好的两个子列进行排序直至整个数列有序（类比二叉树的思想，from down to up）。
 *
 * 归并排序需要一个与原数组相同长度的数组做辅助来排序
 */
let mergeSortInOrder = arr => {
  arr = (arr || []).slice(0)
  let len = arr.length
  let midIndex = parseInt(len / 2)
  let left = arr.slice(0, midIndex)
  let right = arr.slice(midIndex, len)
  if (left.length > 1) {
    left = mergeSortInOrder(left)
  }
  if (right.length > 1) {
    right = mergeSortInOrder(right)
  }
  let lLn = left.length
  let rLn = right.length
  let index = 0
  let i = 0
  let j = 0
  let tmp = []
  while ((index < lLn + rLn) & (i < lLn) & (j < rLn)) {
    tmp[index++] = left[i] < right[j] ? left[i++] : right[j++]
  }
  tmp = tmp.concat(left.slice(i, lLn), right.slice(j, rLn))

  return tmp
}
module.exports = mergeSortInOrder
