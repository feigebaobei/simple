import { N, S, A } from '../typings'

// n^2
let bubbleSort = (arr: A[], order = 'asc') => {
  let len = arr.length
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      switch (order) {
        case 'asc':
          if (arr[j] > arr[j + 1]) {
            ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
          }
          break
        case 'des':
          if (arr[j] > arr[j + 1]) {
            ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
          }
          break
      }
    }
  }
}
let selectSort = (arr: A[], order = 'asc') => {
  for (let i = 0; i < arr.length - 1; i++) {
    let index = i
    for (let j = i + 1; j < arr.length; j++) {
      switch (order) {
        case 'asc':
          if (arr[j] < arr[index]) {
            index = j
          }
          break
        case 'des':
          if (arr[j] > arr[index]) {
            index = j
          }
          break
      }
    }
    if (index !== i) {
      ;[arr[i], arr[index]] = [arr[index], arr[i]]
    }
  }
}

let merge = (leftArr: A[], rightArr: A[], order: 'asc' | 'des') => {
  let tempArr = []
  let res = []
  while (leftArr.length && rightArr.length) {
    switch (order) {
      case 'asc':
        if (leftArr[0] < rightArr[0]) {
          tempArr.push(leftArr.shift())
        } else {
          tempArr.push(rightArr.shift())
        }
        break
      case 'des':
        if (leftArr[0] < rightArr[0]) {
          tempArr.push(rightArr.shift())
        } else {
          tempArr.push(leftArr.shift())
        }
        break
    }
  }
  return res
}
// nlogn
let mergeSort = (arr: A[], order: 'asc' | 'des' = 'asc') => {
  if (arr.length < 2) {
    return arr
  }
  let m = arr.length >> 1
  let left = arr.slice(0, m)
  let right = arr.slice(m)
  return merge(mergeSort(left), mergeSort(right), order)
}

// n^2
let insertSort = (arr: A[], order = 'asc') => {
  for (let i = 1; i < arr.length; i++) {
    let cur = arr[i]
    let lastIndex = i - 1
    switch (order) {
      case 'asc':
        while (lastIndex >= 0 && arr[lastIndex] > cur) {
          arr[lastIndex + 1] = arr[lastIndex]
          lastIndex--
        }
        arr[lastIndex + 1] = cur
        break
      case 'des':
        while (lastIndex >= 0 && arr[lastIndex] < cur) {
          arr[lastIndex + 1] = arr[lastIndex]
          lastIndex--
        }
        arr[lastIndex + 1] = cur
        break
    }
    return arr
  }
}
// nlogn
let quickSort = (arr: A[], order = 'asc') => {
  if (arr.length < 1) {
    return arr
  }
  let p: A = arr[arr.length >> 1]
  let left: A[]
  let right: A[]
  arr.forEach((item) => {
    switch (order) {
      case 'asc':
        if (item > p) {
          right.push(item)
        } else {
          left.push(item)
        }
        break
      case 'des':
        if (item < p) {
          right.push(item)
        } else {
          left.push(item)
        }
        break
    }
  })
  return [...quickSort(left, order), ...quickSort(right, order)]
}
let heapSort = () => {}
let binarySearch = () => {}

export { bubbleSort, selectSort, insertSort, quickSort, heapSort, binarySearch }
