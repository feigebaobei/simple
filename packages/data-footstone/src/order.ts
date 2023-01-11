import { N, S, A, OrderType } from '../typings'
// let clog = console.log

// 冒泡
// n^2
let bubbleSort = (arr: A[], order: OrderType = 'asc') => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      switch (order) {
        case 'asc':
          if (arr[j] > arr[j + 1]) {
            ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
          }
          break
        case 'des':
          if (arr[j] < arr[j + 1]) {
            ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
          }
          break
      }
    }
  }
  return arr
}
// 选择
let selectSort = (arr: A[], order: OrderType = 'asc') => {
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
  return arr
}
// 归并
let merge = (leftArr: A[], rightArr: A[], order: OrderType = 'asc') => {
  let res = []
  while (leftArr.length && rightArr.length) {
    switch (order) {
      case 'asc':
        if (leftArr[0] < rightArr[0]) {
          res.push(leftArr.shift())
        } else {
          res.push(rightArr.shift())
        }
        break
      case 'des':
        if (leftArr[0] < rightArr[0]) {
          res.push(rightArr.shift())
        } else {
          res.push(leftArr.shift())
        }
        break
    }
  }
  res = [ ...res, ...leftArr, ...rightArr]
  return res
}
// nlogn
let mergeSort = (arr: A[], order: OrderType = 'asc') => {
  if (arr.length < 2) {
    return arr
  }
  let m = arr.length >> 1
  let left = arr.slice(0, m)
  let right = arr.slice(m)
  return merge(mergeSort(left, order), mergeSort(right, order), order)
}

// 插入
// // n^2
let insertSort = (arr: A[], order = 'asc') => {
  if (arr.length <= 1) {
    return arr
  }
  for (let i = 1; i < arr.length; i++) {
    let cur = arr[i]
    let lastIndex = i - 1
    switch (order) {
      case 'asc':
        while (lastIndex > 0 && arr[lastIndex] > cur) {
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
  }
  return arr
}
// 快速
// nlogn
let quickSort = (arr: A[], order = 'asc') => {
  if (arr.length < 1) {
    return arr
  }
  let m = arr.length >> 1
  let p: A = arr[m]
  let left: A[] = []
  let right: A[] = []
  arr.forEach((item, index) => {
    if (index !== m) {
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
    }
  })
  return [...quickSort(left, order), p, ...quickSort(right, order)]
}
// 堆
// let heapSort = () => {

// }
// 计数（分布式排序）
// 桶（分布式排序）
// 基数（分布式排序）
// let binarySearch = (arr: A[], item: A) => {
//   let res = -1
//   let left = 0
//   let right = arr.length
//   let mid: A
//   while (left <= right) {
//     mid = (left + right) >> 1
//     if (arr[mid] === item) {
//       res = mid
//       break
//     } else if (arr[mid] < item) {
//       left = mid + 1
//     } else if (arr[mid] > item) {
//       right = mid - 1
//     }
//   }
//   return res
// }
// 版本号排序
let versionOrder = (arr: S[]) => {
  return arr.sort((a: S, b: S) => {
    let aarr = a.split('.').map(Number)
    let barr = b.split('.').map(Number)
    let len = aarr.length
    let i = 0
    while (i < len) {
      if (aarr[i] > barr[i]) {
        return 1
      } else if (aarr[i] === barr[i]) {
        i++
        continue
      } else {
        return -1
      }
    }
    return 0
  })
}


export {
  bubbleSort,
  selectSort,
  mergeSort,
  insertSort,
  quickSort,
  // heapSort,
  // binarySearch
  versionOrder,
}
