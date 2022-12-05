const clog = console.log
// const j = (o) => {
// clog(JSON.parse(JSON.stringify(o)))
// }
let isRunning = false
let cancelCurrentStack = () => {}
const EMPTYVALUE = Symbol.for('empty')

// 改为从datastone中引入
class Queue {
  constructor() {
    this._box = []
    // this.head = null
  }
  getHead() {
    return this._box[0]
  }
}
class PriorityQueue extends Queue {
  constructor() {
    super()
    this.priorityList = new Map() // {priority: lastIndex}
  }
}
class StackPriorityQueue extends PriorityQueue {
  constructor() {
    super()
    // this.priorityList = []
  }
  // 放入队列并返回下标
  entryQueue(stack) {
    if (!this._box.length) {
      this._box.push(stack)
    } else if (this._box[0].priority < stack.priority) {
      this._box.unshift(stack)
    } else if (this._box[this._box.length - 1].priority >= stack.priority) {
      this._box.push(stack)
    } else {
      // 二分查找会更好
      // let index = this._box.length >> 1
      // while (this._box[index] =)
      let index = 0
      while (index < this._box.length - 1) {
        if (
          this._box[index].priority >= stack.priority &&
          stack.priority > this._box[index + 1].priority
        ) {
          this._box.splice(index + 1, 0, stack)
          break
        } else {
          index++
        }
      }
    }
  }
  // 出队列
  outQueue() {
    this._box.shift()
  }
  // 运行队列中的任务
  // runQueue() {
  //     // clog(j(stackList))
  //     clog('runQueue', isRunning)
  //     if (!isRunning) {
  //         runStackList()
  //     }
  // }
}
// let f = () => {}

class Dogleg {
  constructor(opStack) {
    this.opStack = opStack
    this.stackList = new StackPriorityQueue()
    this.interrupt = () => {}
    // this.cancelCurrentStack =
    this.isRunning = false // 后续设置为不可修改的值
  }
  runQueue() {
    if (!this.isRunning) {
      this.runStackList()
    }
  }
  runStackList() {
    let stack = this.stackList.getHead()
    // clog('stack', stack)
    if (stack) {
      this.isRunning = true // 开始执行任务
      let { promiseRace, cancelCurrentStack: cp } = this.runStack(stack)
      this.interrupt = this.createCancel(cp)
      promiseRace.then((v) => {
        // console.log('v', v)
        if (v !== EMPTYVALUE) {
          this.stackList.outQueue()
          this.runStackList()
        }
      })
    } else {
      this.isRunning = false
    }
  }
  runStack(stack) {
    let p1 = new Promise((s, j) => {
      let r = this.opStack(stack)
      s(r)
    })
    let waitF = () => {}
    let cancelCurrentStack = () => {
      waitF(EMPTYVALUE)
    }
    let p2 = new Promise((s) => {
      waitF = s
    })
    let promiseRace = Promise.race([p1, p2])
    return { promiseRace, cancelCurrentStack }
  }
  createCancel = (cp) => {
    return () => {
      this.isRunning = false
      cp()
    }
  }
}

export default Dogleg
// module.exports = Dogleg
