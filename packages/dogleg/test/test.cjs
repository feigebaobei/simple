const Dogleg = require('../dist_cjs/index.cjs')

const clog = console.log

let f = (stack) => {
  // stack: {
  //   value: number,
  //   priority: number
  // }
  let r = fib(stack.value)
  // let r = new Promise((s, j) => {
  //   setTimeout(() => {
  //     s(stack.value)
  //   }, 1000)
  // })
  clog(`第${stack.value}个的值：${r}`)
  return r
}
let fib = (n) => {
  if (n < 2) {
    // 0, 1
    return 1
  } else {
    return fib(n - 1) + fib(n - 2)
  }
}
let createStack = (value, priority) => {
  return {
    value,
    priority,
  }
}

let dogleg = new Dogleg(f)
dogleg.stackList.entryQueue(createStack(3, 2))
dogleg.stackList.entryQueue(createStack(4, 2))
dogleg.stackList.entryQueue(createStack(6, 1))
dogleg.stackList.entryQueue(createStack(7, 3))
dogleg.stackList.entryQueue(createStack(5, 2))
dogleg.runQueue()
setTimeout(() => {
  clog('取消')
  dogleg.interrupt()
  // isRunning = false
  dogleg.stackList.entryQueue(createStack(8, 3))
  dogleg.stackList.entryQueue(createStack(9, 1))
  dogleg.runQueue()
  // clog(j(stackList))
}, 2500)
