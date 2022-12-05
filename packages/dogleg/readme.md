# dogleg

## overview

> 可打断的批处理任务工具

### feature

- 创建任务队列
- 依次执行任务队列中的任务
- 可打断执行
- 可插入任务

## install

`npm i dogleg`

## usage

```js
const Dogleg = require('dogleg')

const clog = console.log

let f = (stack) => {
  // stack: {
  //   value: number,
  //   priority: number
  // }
  let r = new Promise((s, j) => {
    setTimeout(() => {
      s(stack.value)
    }, 1000)
  })
  clog(`单个任务的结果：${r}`)
  return r
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
  dogleg.stackList.entryQueue(createStack(8, 3))
  dogleg.stackList.entryQueue(createStack(9, 1))
  dogleg.runQueue()
}, 2500)
```

## stack

任务对象的数据结构  
priority 属性值越大越优先

```js
{
  priority: number,
  [string]?: any
}
```

## api

```js
dogleg: {
  // 实例属性
  opStack() // 操作任务的方法
  stackList // 任务队列。它是优先队列。
  entryQueue() // 使任务入队列
  interrupt() // 打断执行任务的方法的方法
  isRunning // 是否正在执行任务
  // 原型属性
  runQueue() // 执行队列中的任务
  runStackList() // 执行队列中的任务
  runStack() // 执行单个任务的方法
  createCancel() // 创建打断任务的方法
}
```

## principle

任务队列是优先队列。队首就是最优先的任务。  
从队首开始执行，执行完一个任务，删除一个任务。当无任务时执行结束。

### uml

```
todo
```

## 边界

每个任务和都是独立的。无法联系起来。

## todo

> 基于 datastone  
> opStack 中添加前一个任务的结果、额外参数  
> 接入 worker
