/*
 * @Author: jiapeng.Zheng
 * @Date: 2019-11-11 11:26:31
 * @LastEditors: jiapeng.Zheng
 * @LastEditTime: 2019-11-15 14:28:01
 * @Description: 堆排序 时间复杂度：O(NlogN)，稳定性：不稳定
 *  堆排序的思想借助于二叉堆中的最大堆得以实现。
 * 首先，将待排序数列抽象为完全二叉树（完全二叉树有个特性：左边子节点位置 = 当前父节点的两倍 + 1，右边子节点位置 = 当前父节点的两倍 + 2），
 * 并构造出最大堆（最大堆要求节点的元素都要不小于其孩子，最小堆要求节点元素都不大于其左右孩子）；
 * 然后，依次将最大元素（即根节点元素）与待排序数列的最后一个元素交换（即二叉树最深层最右边的叶子结点元素）；
 * 每次遍历，刷新最后一个元素的位置（自减1），直至其与首元素相交，即完成排序。
 */

let swap = require('../../lib/swap')

let _heapSort = (arr, currentIndex, len) => {
  let parentIndex = currentIndex
  let leftChildIndex = 2 * parentIndex + 1
  let rightChildIndex = 2 * parentIndex + 2
  if (leftChildIndex < len && arr[parentIndex] < arr[leftChildIndex]) {
    parentIndex = leftChildIndex
  }
  if (rightChildIndex < len && arr[parentIndex] < arr[rightChildIndex]) {
    parentIndex = rightChildIndex
  }
  if (parentIndex !== currentIndex) {
    swap(arr, parentIndex, currentIndex)
    _heapSort(arr, currentIndex, len)
  }
}

let downToMaxHeap = arr => {
  arr = (arr || []).slice(0)
  let len = arr.length
  for (let j = 0; j < len; j++) {
    // 构造出最大堆
    for (let i = len - j - 1; i >= 0; i--) {
      _heapSort(arr, i, len - j)
    }
    // 首尾交换
    swap(arr, 0, len - 1 - j)
  }

  return arr
}
module.exports = downToMaxHeap
