// 与栈相关的工具方法
/*
栈
*/



import {Stack as StackI} from '../typings'



// let Stack = (function () {
//     let items = new WeakMap()
//     class Stack {
//       constructor () {
//         // this.items = []
//         // this.length = this.items.length
//         items.set(this, [])
//       }
//       // 得到数组
//       getArray () {
//         return items.get(this)
//       }
//       // 添加一个或多个元素
//       push (...args) {
//         // this.items.push(...args)
//         // items.get(this).push(...args)
//         this.getArray().push(...args)
//       }
//       // 弹出一个元素
//       pop () {
//         // return this.items.pop()
//         return this.getArray().pop()
//       }
//       // 返回栈顶的元素
//       peek () {
//         return this.getArray()[this.size() - 1]
//       }
//       isEmpty () {
//         return this.size() === 0
//       }
//       clear () {
//         items.set(this, [])
//       }
//       size () {
//         return items.get(this).length
//       }
//     }
//     return Stack
//   })()
class Stack implements StackI {
  constructor() {
    private items: A
    this.items = []
  }
  getArray() {
    return this.items
  }
  push(...p) {
    this.items.push(...p)
  }
  pop() {
    this.items.pop()
  }
  peek() {
    return this.items[this.size() - 1]
  }
  isEmpty() {
    return this.size() === 0
  }
  clear() {
    this.items = []
  }
  size() { // set/ map 都是size返回容量
    return this.items.length
  }
}
export Stack
  // export default {
  //   Stack
  // }

// export {
//     bubbleSort,
//     selectSort,
//     insertSort,
//     quickSort,
//     quickSortSelf,
//     binarySearch,
// }