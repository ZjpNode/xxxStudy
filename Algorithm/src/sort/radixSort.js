/*
 * @Author: jiapeng.Zheng
 * @Date: 2019-11-11 11:26:31
 * @LastEditors: jiapeng.Zheng
 * @LastEditTime: 2019-11-14 17:37:00
 * @Description: 基数排序，时间复杂度：O(x*N)，稳定性：稳定
 * 桶排序的改进版，桶的大小固定为10，减少了内存空间的开销。
 * 首先，找出待排序列中得最大元素max，并依次按max的低位到高位对所有元素排序；
 * 桶元素10个元素的大小即为待排序数列元素对应数值为相等元素的个数，即每次遍历待排序数列，
 * 桶将其按对应数值位大小分为了10个层级，桶内元素值得和为待排序数列元素个数。
 *
 * 基数排序的方式可以采用最低位优先LSD（Least sgnificant digital）法或最高位优先MSD（Most sgnificant digital）法，
 * LSD的排序方式由键值的最右边开始，而MSD则相反，由键值的最左边开始。
 * LSD的基数排序适用于位数小的数列，如果位数多的话，使用MSD的效率会比较好，MSD的方式恰与LSD相反，是由高位数为基底开始进行分配，
 * 其他的演算方式则都相同
 */

let _getTime = num => {
  let count = 1
  let temp = parseInt(num / 10)
  while (temp !== 0) {
    count++
    temp = parseInt(temp / 10)
  }

  return count
}

let radixSort = arr => {
  arr = (arr || []).slice(0)
  let _time = 0
  let len = arr.length
  let count = 10
  let buckets = Array(count).fill()
  let negativeBuckets = Array(count).fill() // 负数桶
  for (let i = 0; i < count; i++) {
    buckets[i] = []
    negativeBuckets[i] = []
  }
  let max = Math.max(...arr)
  let time = _getTime(max)
  for (let j = 0; j < time; j++) {
    for (let i = 0; i < len; i++) {
      if (arr[i] < 0) {
        let index = Math.abs(parseInt((arr[i] / Math.pow(10, j)) % 10))
        negativeBuckets[index].push(arr[i])
      } else {
        let index = parseInt((arr[i] / Math.pow(10, j)) % 10)
        buckets[index].push(arr[i])
      }
    }
    if (j === time - 1) {
      arr = negativeBuckets
        .reduce((acc, val) => acc.concat(val), [])
        .reverse()
        .concat(buckets.reduce((acc, val) => acc.concat(val), []))
    } else {
      arr = negativeBuckets
        .reduce((acc, val) => acc.concat(val), [])
        // .reverse()
        .concat(buckets.reduce((acc, val) => acc.concat(val), []))
    }
    for (let i = 0; i < count; i++) {
      buckets[i] = []
      negativeBuckets[i] = []
    }
  }

  console.log('time: ', _time)
  return arr
}
module.exports = radixSort
