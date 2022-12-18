import {
  N,
  S,
  A,
} from '../typings'

// n^2
let bubbleSort = (arr: A[], order = 'asc') => {
  let len = arr.length
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len-i-1; j++) {
      switch (order) {
        case 'asc':
          if (arr[j] > arr[j+1]) {
            [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
          }
          break
        case 'des':
          if (arr[j] > arr[j+1]) {
            [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
          }
          break
      }
    }
  }
}
let selectSort = (arr: A[]) => {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i
    for (let j = i+1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
    }
  }
}

let merge = (leftArr, rightArr) => {
  let tempArr = []
  while (leftArr.length && rightArr.length) {
    if (leftArr[0] < rightArr[0]) {
      tempArr.push(leftArr.shift())
    } else {
      tempArr.push(rightArr.shift())
    }
  }
  return [...tempArr, ...leftArr, ...rightArr]
}

// nlogn
let mergeSort = (arr: A[]) => {
  if (arr.length < 2) {
    return arr
  }
  let m = arr.length >> 1
  let left = arr.slice(0, m)
  let right = arr.slice(m)
  return merge(mergeSort(left), mergeSort(right))
}

// n^2
let insertSort = (arr: A[]) => {
  for (let i = 1; i < arr.length; i++) {
    let cur = arr[i]
    let lastIndex = i - 1
    while (lastIndex >= 0 && arr[lastIndex] > cur) {
      arr[lastIndex + 1] = arr[lastIndex]
      lastIndex--
    }
    arr[lastIndex+1] = cur
    return arr
  }
}
// nlogn
let quickSort = (arr: A[]) => {
  if (arr.length < 1) {
    return arr
  }
  let p: A = arr[arr.length >> 1]
  let left: A[]
  let right: A[]
  arr.forEach(item => {
    if (item > p) {
      right.push(item)
    } else {
      left.push(item)
    }
  })
  return [...(quickSort(left)), ...(quickSort(right))]
}
let heapSort = () => {}
let binarySearch = () => {}

export {
  bubbleSort,
  selectSort,
  insertSort,
  quickSort,
  heapSort,
  binarySearch,
}
