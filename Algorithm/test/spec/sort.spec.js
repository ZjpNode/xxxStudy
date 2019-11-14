/*
 * @Author: jiapeng.Zheng
 * @Date: 2019-11-11 11:30:10
 * @LastEditors: jiapeng.Zheng
 * @LastEditTime: 2019-11-14 17:29:20
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
    let afterSortArr = bubbleSort.v1(arr)
    expect(afterSortArr)
      .to.have.ordered.members(sortArr)
      .but.not.have.ordered.members(arr)
  })
  it('bubble sort v2 test', function() {
    let afterSortArr = bubbleSort.v2(arr)
    expect(afterSortArr)
      .to.have.ordered.members(sortArr)
      .but.not.have.ordered.members(arr)
  })
  it('bubble sort v3 test', function() {
    let afterSortArr = bubbleSort.v3(arr)
    expect(afterSortArr)
      .to.have.ordered.members(sortArr)
      .but.not.have.ordered.members(arr)
  })
  it('select sort v1 test', function() {
    let afterSortArr = selectSort.v1(arr)
    expect(afterSortArr)
      .to.have.ordered.members(sortArr)
      .but.not.have.ordered.members(arr)
  })
  it('select sort v2 test', function() {
    let afterSortArr = selectSort.v2(arr)
    expect(afterSortArr)
      .to.have.ordered.members(sortArr)
      .but.not.have.ordered.members(arr)
  })
  // [ 145, 200, 100, 23, 999, 2, 100, 35, 100, 5, 1, 3, 100 ]
  it('select sort v2 test at [ -10,-9,145, 200, 100, 23, 999, 2, 100, 35, 100, 5, 1, 3, 100 ]', function() {
    let arr = [-10, -9, 145, 200, 100, 23, 999, 2, 100, 35, 100, 5, 1, 3, 100]
    let afterSortArr = selectSort.v2(arr)
    expect(afterSortArr)
      .to.have.ordered.members(sortArr)
      .but.not.have.ordered.members(arr)
  })
  it('quickSort sort v1 test', function() {
    let afterSortArr = quickSort.v1(arr)
    expect(afterSortArr)
      .to.have.ordered.members(sortArr)
      .but.not.have.ordered.members(arr)
  })
  it('quickSort sort v2 test', function() {
    let afterSortArr = quickSort.v2(arr)
    expect(afterSortArr)
      .to.have.ordered.members(sortArr)
      .but.not.have.ordered.members(arr)
  })
  it('insertSort sort v1 test', function() {
    let afterSortArr = insertSort.v1(arr)
    expect(afterSortArr)
      .to.have.ordered.members(sortArr)
      .but.not.have.ordered.members(arr)
  })
  it('insertSort sort v2 test', function() {
    let afterSortArr = insertSort.v2(arr)
    expect(afterSortArr)
      .to.have.ordered.members(sortArr)
      .but.not.have.ordered.members(arr)
  })
  it('insertSort sort v3 test', function() {
    let afterSortArr = insertSort.v3(arr)
    expect(afterSortArr)
      .to.have.ordered.members(sortArr)
      .but.not.have.ordered.members(arr)
  })
  it('shellSort sort test', function() {
    let afterSortArr = shellSort(arr)
    expect(afterSortArr)
      .to.have.ordered.members(sortArr)
      .but.not.have.ordered.members(arr)
  })
  it('countSort sort test', function() {
    let afterSortArr = countSort(arr)
    expect(afterSortArr)
      .to.have.ordered.members(sortArr)
      .but.not.have.ordered.members(arr)
  })
  it('bucketSort sort test', function() {
    let afterSortArr = bucketSort(arr)
    expect(afterSortArr)
      .to.have.ordered.members(sortArr)
      .but.not.have.ordered.members(arr)
  })

  it('radixSort sort test', function() {
    let afterSortArr = radixSort(arr)
    expect(afterSortArr)
      .to.have.ordered.members(sortArr)
      .but.not.have.ordered.members(arr)
  })

  it('mergeSortInOrder sort test', function() {
    let afterSortArr = mergeSortInOrder(arr)
    expect(afterSortArr)
      .to.have.ordered.members(sortArr)
      .but.not.have.ordered.members(arr)
  })

  it('downToMaxHeap sort test', function() {
    let afterSortArr = downToMaxHeap(arr)
    expect(afterSortArr)
      .to.have.ordered.members(sortArr)
      .but.not.have.ordered.members(arr)
  })
})
