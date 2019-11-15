/*
 * @Author: jiapeng.Zheng
 * @Date: 2019-11-11 11:26:31
 * @LastEditors: jiapeng.Zheng
 * @LastEditTime: 2019-11-14 17:42:14
 * @Description: 桶排序，时间复杂度：O(x*N)，稳定性：稳定
 * 桶排序(Bucket sort)是一种基于计数的排序算法，
 * 工作的原理是将数据分到有限数量的桶子里，然后每个桶再分别排序（有可能再使用别的排序算法或是以递回方式继续使用桶排序进行排序）。
 * 当要被排序的数据内的数值是均匀分配的时候，桶排序时间复杂度为Θ(n)。
 * 桶排序不同于快速排序，并不是比较排序，不受到时间复杂度 O(nlogn) 下限的影响。
 * 桶排序，主要适用于小范围整数数据，且独立均匀分布，可以计算的数据量很大，而且符合线性期望时间
 */
/**
 * 桶排序
 * @param {Array<number>} arr   源数组
 * @param {number} count        桶的个数
 */
let bucketSort = (arr, count = 10) => {
  arr = (arr || []).slice(0)
  let len = arr.length
  let buckets = [] // 初始化桶
  let max = Math.max(...arr)
  let min = Math.min(...arr)
  let range = (max - min + 1) / count // 桶的范围
  for (let i = 0; i < len; i++) {
    let index = Math.floor((arr[i] - min) / range) // 桶索引
    if (buckets[index]) {
      let bucket = buckets[index]
      let bLen = bucket.length
      let insertPoint
      if (bucket[0] > arr[i]) {
        insertPoint = 0
      } else if (bucket[bLen - 1] < arr[i]) {
        insertPoint = bLen
      } else {
        for (let j = 0; j < bLen; j++) {
          if (bucket[j] >= arr[i]) {
            insertPoint = j
            break
          }
        }
      }
      buckets[index].splice(insertPoint, 0, arr[i])
    } else {
      buckets[index] = []
      buckets[index].push(arr[i])
    }
  }
  return buckets.reduce((acc, val) => acc.concat(val), [])
}
module.exports = bucketSort
