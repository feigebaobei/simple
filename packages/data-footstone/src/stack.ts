// 与栈相关的工具方法
/*
栈
*/
import { Stack as StackI, N } from './typings'

class Stack<T> implements StackI<T> {
  items: T[]
  readonly capacity: N
  constructor(capacity: N = Number.POSITIVE_INFINITY) {
    this.items = []
    // 不可改变
    Object.defineProperty(this, 'capacity', {
      value: capacity,
      writable: false
    })
  }
  toArray() {
    return this.items
  }
  push(p: T) {
    if (this.isFull()) {
      return new Error('has full')
    } else {
      this.items.push(p)
      return this.size()
    }
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
  isFull() {
    return this.size() === this.capacity
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
