import { 
    // N, S, 
    A } from '../typings'

    // 顺序查找
// let findIndex = (arr: A[], item: A) => {
//     // let res = false

//     // return res
// }
// 二分查找
let binarySearch = (arr: A[], item: A) => {
    let res = -1
    let left = 0
    let right = arr.length
    let mid: A
    while (left <= right) {
      mid = (left + right) >> 1
      if (arr[mid] === item) {
        res = mid
        break
      } else if (arr[mid] < item) {
        left = mid + 1
      } else if (arr[mid] > item) {
        right = mid - 1
      }
    }
    return res
  }

export {
    binarySearch   
}