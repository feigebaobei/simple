// 队列
import {
  Queue as Q,
  PriorityQueue as PQ,
  PriorityQueueElement as PQE,
  N,
} from '../typings'

class Queue<T> implements Q<T> {
  items: T[]
  constructor(...p: T[]) {
    this.items = p
  }
  enqueue(...p) {
    this.items.push(...p)
  }
  dequeue() {
    return this.items.shift()
  }
  toArray() {
    return this.items
  }
  getHead() {
    // 有可能是undefined
    return this.items[0]
  }
  getTail() {
    return this.items[this.size() - 1]
  }
  size() {
    return this.items.length
  }
  isEmpty() {
    return this.size() === 0
  }
  clear() {
    this.items = []
  }
  reverse() {
    return this.items.reverse()
  }
}

// 优先队列
class PriorityQueue<T> implements PQ<T> {
  items: PQE<T>[]
  defaultPriority: N
  constructor(defaultPriority: N = 0) {
    this.items = []
    this.defaultPriority = defaultPriority
  }
  highestPriority() {
    let temp = this._getHead()
    let res: N | undefined
    if (temp) {
      res = temp.priority
    } else {
      res = undefined
    }
    return res
  }
  lowestPriority() {
    let temp = this._getTail()
    let res: N | undefined
    if (temp) {
      res = temp.priority
    } else {
      res = undefined
    }
    return res
  }
  protected createElement(p: T, t: N) {
    return {
      value: p,
      priority: t ?? this.lowestPriority(),
    }
  }
  // 使一个元素入队列
  enqueue(element, priority: N = this.defaultPriority) {
    let len = this.size()
    let node = this.createElement(element, priority)
    if (!len) {
      this.items.push(node)
      return
    }
    if (this._getHead().priority < node.priority) {
      this.items.unshift(node)
    } else if (this._getTail().priority >= node.priority) {
      this.items.push(node)
    } else {
      let index = 0
      while (index < len - 1) {
        if (
          this.items[index].priority >= node.priority &&
          this.items[index + 1].priority < node.priority
        ) {
          this.items.splice(index + 1, 0, node)
          break
        } else {
          index++
        }
      }
    }
  }
  dequeue() {
    return this.items.shift()?.value
  }
  toArray() {
    return this.items.map((ele) => ele.value)
  }
  protected _getHead() {
    return this.items[0]
  }
  protected _getTail() {
    return this.items[this.size() - 1]
  }
  getHead() {
    return this._getHead()?.value
  }
  getTail() {
    return this._getTail()?.value
  }
  size() {
    return this.items.length
  }
  isEmpty() {
    return this.size() === 0
  }
  clear() {
    this.items = []
  }
  // 优先队列不能反转
  // reverse() {}
}
// 不写循环队列。它应该写在循环链表。

export { Queue, PriorityQueue }
