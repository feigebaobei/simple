// 与栈相关的工具方法
/*
栈
*/
import { Stack as StackI } from '../typings'

class Stack<T> implements StackI<T> {
  items: T[]
  constructor() {
    this.items = []
  }
  toArray() {
    return this.items
  }
  push(...p: T[]) {
    this.items.push(...p)
    return this.size()
  }
  pop() {
    return this.items.pop()
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
  size() {
    // set/ map 都是size返回容量
    return this.items.length
  }
}

export { Stack }
