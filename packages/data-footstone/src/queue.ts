// 队列
import {
  BaseQueue as BQ,
  Queue as Q,
  PriorityQueue as PQ,
  PriorityQueueNode as PQE,
  A,
  N,
  B,
} from '../typings'

// 可以抽象出BaseQueue
class BaseQueue implements BQ {
  items: A[]
  readonly capacity: N
  constructor(capacity: N = Number.POSITIVE_INFINITY) {
    this.items = []
    // this.capacity = capacity
    // Object.defineProperty('')
    Object.defineProperty(this, 'capacity', {
      value: capacity,
      writable: false
    })
  }
  getHead() {
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
  isFull() {
    return this.size() === this.capacity
  }
  clear() {
    this.items = []
  }
}

class Queue<T> extends BaseQueue implements Q<T> {
  items: T[]
  // constructor(...p: T[]) {
  //   super()
  //   this.enqueue(...p)
  // }
  constructor(capacity: N) {
    super(capacity)
  }
  // enqueue(...p: T[]) {
  //   this.items.push(...p)
  //   return this.size()
  // }
  enqueue(p: T) {
    if (this.isFull()) {
      return new Error('has full')
    } else {
      this.items.push(p)
      return this.size()
    }
  }
  dequeue() {
    return this.items.shift()
  }
  toArray() {
    return this.items
  }
  reverse() {
    this.items.reverse()
    return this
  }
  peek() {
    return this.items[0]
  }
}

// 优先队列
class PriorityQueue<T> extends BaseQueue implements PQ<T> {
  items: PQE<T>[]
  defaultPriority: N
  constructor(capacity: N = Number.POSITIVE_INFINITY, defaultPriority: N = 0) {
    super(capacity)
    Object.defineProperty(this, 'defaultPriority', {
      value: defaultPriority,
      writable: false
    })
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
  protected createNode(v: T, p: N = this.defaultPriority, position: N = -1) {
    return {
      value: v,
      position: position,
      priority: p,
    }
  }
  // 使一个元素入队列
  // 优先级高在前面
  // positionFlag 是否放在同优先级的后面
  // 考虑把参数处理为options
  enqueue(
    element: T,
    priority: N = this.defaultPriority,
    positionFlag: B = true,
    needSetPosition: B = true
  ) {
    if (this.isFull()) {
      return new Error('has full')
    }
    let len = this.size()
    let node = this.createNode(element, priority)
    if (!len) {
      this.items.push(node)
      needSetPosition && this.setPosition()
    } else {
      let positionPriority = positionFlag ? node.priority : node.priority + 1
      if (this._getHead().priority < positionPriority) {
        this.items.unshift(node)
        needSetPosition && this.setPosition()
      } else if (this._getTail().priority >= positionPriority) {
        this.items.push(node)
        needSetPosition && this.setPosition(this.size() - 1)
      } else {
        let index = 0
        while (index < len - 1) {
          if (
            this.items[index].priority >= positionPriority &&
            this.items[index + 1].priority < positionPriority
          ) {
            this.items.splice(index + 1, 0, node)
            break
          } else {
            index++
          }
        }
        needSetPosition && this.setPosition(index + 1)
      }
    }
    return this.size()
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
  clear() {
    this.items = []
  }
  setPosition(from: N = 0) {
    let index = 0
    let size = this.size()
    while (index < size) {
      if (index >= from) {
        this.items[index].position = index
      }
      index++
    }
  }
  isValidRange(p: N) {
    return 0 <= p && p < this.items.length
  }
  updatePriorityAt(p: N, priority: N, positionFlag: B = false) {
    let res = false
    if (this.isValidRange(p)) {
      let [node] = this.items.splice(p, 1)
      this.enqueue(node.value, node.priority + priority, positionFlag, false)
      this.setPosition()
      res = true
    }
    return res
  }
  updateDimension(v: N) {
    this.items.forEach((item) => {
      item.priority += v
    })
  }
  // 优先队列不能反转
  peek() {
    let t = this.items[0]
    return t ? t.value : undefined
  }
}
// 不写循环队列。它应该写在循环链表。

export { BaseQueue, Queue, PriorityQueue }
