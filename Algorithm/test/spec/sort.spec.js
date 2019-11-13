/*
 * @Author: jiapeng.Zheng
 * @Date: 2019-11-11 11:30:10
 * @LastEditors: jiapeng.Zheng
 * @LastEditTime: 2019-11-13 11:25:31
 * @Description:
 */

const { expect } = require('chai')
const {
  bubbleSort,
  selectSort,
  quickSort,
  insertSort,
  shellSort,
  bucketSort,
  countSort,
  mergeSortInOrder,
  downToMaxHeap
} = require('../../src/sort')

let sortArr = [1, 2, 3, 5, 23, 35, 100, 100, 100, 100, 145, 200, 999]
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

  it('insertSort sort test', function() {
    let afterSortArr = insertSort(arr)
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

  it('bucketSort sort test', function() {
    let afterSortArr = bucketSort(arr)
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
