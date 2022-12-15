// 与栈相关的工具方法
/*
栈
*/
import { Stack as StackI, A } from '../typings'

class Stack implements StackI {
  private items: A // 即使这样写，也不会转换为js中私有的属性。
  constructor() {
    this.items = []
  }
  toArray() {
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
  size() {
    // set/ map 都是size返回容量
    return this.items.length
  }
}

// export default Stack
export { Stack }
