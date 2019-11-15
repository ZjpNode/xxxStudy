/*
 * @Author: jiapeng.Zheng
 * @Date: 2019-11-11 11:30:10
 * @LastEditors: jiapeng.Zheng
 * @LastEditTime: 2019-11-15 09:08:53
 * @Description:
 */

const { expect } = require('chai')
const {
  bubbleSort,
  selectSort,
  quickSort,
  insertSort,
  shellSort,
  countSort,
  bucketSort,
  radixSort,
  mergeSortInOrder,
  downToMaxHeap
} = require('../../src/sort')

let sortArr = [-10, -9, 1, 2, 3, 5, 23, 35, 100, 100, 100, 100, 145, 200, 999]
let arr = sortArr.slice(0).sort(() => Math.random() - 0.5)
console.log(arr)

describe('sort test', function() {
  it('bubble sort v1 test', function() {
    console.time('bubble sort v1')
    let afterSortArr = bubbleSort.v1(arr)
    console.timeEnd('bubble sort v1')
    expect(afterSortArr)
      .to.have.ordered.members(sortArr)
      .but.not.have.ordered.members(arr)
  })
  it('bubble sort v2 test', function() {
    console.time('bubble sort v2')
    let afterSortArr = bubbleSort.v2(arr)
    console.timeEnd('bubble sort v2')
    expect(afterSortArr)
      .to.have.ordered.members(sortArr)
      .but.not.have.ordered.members(arr)
  })
  it('bubble sort v3 test', function() {
    console.time('bubble sort v3')
    let afterSortArr = bubbleSort.v3(arr)
    console.timeEnd('bubble sort v3')
    expect(afterSortArr)
      .to.have.ordered.members(sortArr)
      .but.not.have.ordered.members(arr)
  })
  it('select sort v1 test', function() {
    console.time('select sort v1')
    let afterSortArr = selectSort.v1(arr)
    console.timeEnd('select sort v1')
    expect(afterSortArr)
      .to.have.ordered.members(sortArr)
      .but.not.have.ordered.members(arr)
  })
  it('select sort v2 test', function() {
    console.time('select sort v2')
    let afterSortArr = selectSort.v2(arr)
    console.timeEnd('select sort v2')
    expect(afterSortArr)
      .to.have.ordered.members(sortArr)
      .but.not.have.ordered.members(arr)
  })
  // [ 145, 200, 100, 23, 999, 2, 100, 35, 100, 5, 1, 3, 100 ]
  it('select sort v2 test at [ -10,-9,145, 200, 100, 23, 999, 2, 100, 35, 100, 5, 1, 3, 100 ]', function() {
    let arr = [-10, -9, 145, 200, 100, 23, 999, 2, 100, 35, 100, 5, 1, 3, 100]
    console.time('select sort v2 by')
    let afterSortArr = selectSort.v2(arr)
    console.timeEnd('select sort v2 by')
    expect(afterSortArr)
      .to.have.ordered.members(sortArr)
      .but.not.have.ordered.members(arr)
  })
  it('quickSort sort v1 test', function() {
    console.time('quickSort sort v1')
    let afterSortArr = quickSort.v1(arr)
    console.timeEnd('quickSort sort v1')
    expect(afterSortArr)
      .to.have.ordered.members(sortArr)
      .but.not.have.ordered.members(arr)
  })
  it('quickSort sort v2 test', function() {
    console.time('quickSort sort v2')
    let afterSortArr = quickSort.v2(arr)
    console.timeEnd('quickSort sort v2')
    expect(afterSortArr)
      .to.have.ordered.members(sortArr)
      .but.not.have.ordered.members(arr)
  })
  it('insertSort sort v1 test', function() {
    console.time('insertSort sort v1')
    let afterSortArr = insertSort.v1(arr)
    console.timeEnd('insertSort sort v1')
    expect(afterSortArr)
      .to.have.ordered.members(sortArr)
      .but.not.have.ordered.members(arr)
  })
  it('insertSort sort v2 test', function() {
    console.time('insertSort sort v2')
    let afterSortArr = insertSort.v2(arr)
    console.timeEnd('insertSort sort v2')
    expect(afterSortArr)
      .to.have.ordered.members(sortArr)
      .but.not.have.ordered.members(arr)
  })
  it('insertSort sort v3 test', function() {
    console.time('insertSort sort v3')
    let afterSortArr = insertSort.v3(arr)
    console.timeEnd('insertSort sort v3')
    expect(afterSortArr)
      .to.have.ordered.members(sortArr)
      .but.not.have.ordered.members(arr)
  })
  it('shellSort sort test', function() {
    console.timeEnd('shellSort sort')
    let afterSortArr = shellSort(arr)
    console.timeEnd('shellSort sort')
    expect(afterSortArr)
      .to.have.ordered.members(sortArr)
      .but.not.have.ordered.members(arr)
  })
  it('countSort sort test', function() {
    console.time('countSort sort')
    let afterSortArr = countSort(arr)
    console.timeEnd('countSort sort')
    expect(afterSortArr)
      .to.have.ordered.members(sortArr)
      .but.not.have.ordered.members(arr)
  })
  it('bucketSort sort test', function() {
    console.time('bucketSort sort')
    let afterSortArr = bucketSort(arr)
    console.timeEnd('bucketSort sort')
    expect(afterSortArr)
      .to.have.ordered.members(sortArr)
      .but.not.have.ordered.members(arr)
  })

  it('radixSort sort test', function() {
    console.time('radixSort sort')
    let afterSortArr = radixSort(arr)
    console.timeEnd('radixSort sort')
    expect(afterSortArr)
      .to.have.ordered.members(sortArr)
      .but.not.have.ordered.members(arr)
  })

  it('mergeSortInOrder sort test', function() {
    console.time('mergeSortInOrder sort')
    let afterSortArr = mergeSortInOrder(arr)
    console.timeEnd('mergeSortInOrder sort')
    expect(afterSortArr)
      .to.have.ordered.members(sortArr)
      .but.not.have.ordered.members(arr)
  })

  it('downToMaxHeap sort test', function() {
    console.time('downToMaxHeap sort')
    let afterSortArr = downToMaxHeap(arr)
    console.timeEnd('downToMaxHeap sort')
    expect(afterSortArr)
      .to.have.ordered.members(sortArr)
      .but.not.have.ordered.members(arr)
  })
})
