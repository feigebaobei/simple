import {
  bubbleSort,
  selectSort,
  mergeSort,
  insertSort,
  quickSort,
  versionOrder,
} from '../src/order'

let arr = []

let OrderedArr = [1, 1, 2, 3, 3, 5, 6, 6, 6, 6, 9, 90]
let OrderedDesArr = [90, 9, 6, 6, 6, 6, 5, 3, 3, 2, 1, 1]

describe('Order', () => {
  beforeEach(() => {
    arr = [1, 5, 3, 6, 90, 6, 3, 6, 9, 6, 2, 1]
  })
  it('bubbleSort', () => {
    expect(bubbleSort(arr)).toEqual(OrderedArr)
    expect(bubbleSort(arr, 'des')).toEqual(OrderedDesArr)
  })
  test('selectSort', () => {
    expect(selectSort(arr)).toEqual(OrderedArr)
    expect(selectSort(arr, 'des')).toEqual(OrderedDesArr)
  })
  test('mergeSort', () => {
    expect(mergeSort(arr)).toEqual(OrderedArr)
    expect(mergeSort(arr, 'des')).toEqual(OrderedDesArr)
  })
  test('insertSort', () => {
    expect(insertSort(arr)).toEqual(OrderedArr)
    expect(insertSort(arr, 'des')).toEqual(OrderedDesArr)
  })
  test('quickSort', () => {
    expect(quickSort(arr)).toEqual(OrderedArr)
    expect(quickSort(arr)).toEqual(OrderedArr)
    expect(quickSort(arr, 'des')).toEqual(OrderedDesArr)
    expect(quickSort(arr, 'des')).toEqual(OrderedDesArr)
  })
})

describe('versionOrder', () => {
  beforeEach(() => {
    arr = [
      '5.3.5',
      '5.13.5',
      '5.5.5',
      '5.3.25',
      '5.3.15',
      '2.3.5',
      '3.3.5',
      '2.3.15',
      '6.23.5',
      '5.33.5',
    ]
  })
  test('versionOrder', () => {
    expect(versionOrder(arr)).toEqual([
      '2.3.5',
      '2.3.15',
      '3.3.5',
      '5.3.5',
      '5.3.15',
      '5.3.25',
      '5.5.5',
      '5.13.5',
      '5.33.5',
      '6.23.5',
    ])
  })
})
