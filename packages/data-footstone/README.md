# data-footstone

## overview

> 使用 ts 编写基本的数据结构。  
> 0.1.x-版本中 api 变动较大，使用时请锁定版本号。

### feature

- stack
- queue
  - PriorityQueue
- chain
  - SingleChain
  - DoublyChain
  - SingleCircleChain
  - DoublyCircleChain
- hashMap
  - hash 方法
- tree
  - BinaryTree
  - BinarySearchTree
  - AVLTree
- graph
  - DirectionGraph
  - UndirectionGraph
- sort
- cache
  - fifo
  - lru
  - lfu

## install

`npm i data-footstone`

## usage

```js
import { Stack } from 'data-footstone'
let s = new Stack()
s.push(1) // 压入栈
s.push(2)
s.push(3)
s.push(4)
s.toArray() // [1,2,3,4]
s.pop() // 4 弹出栈顶元素
s.pop() // 3
s.peek() // 2 返回栈顶元素
s.isEmpty() // false 是否空栈
s.clear() // 清空栈
```

## api

详见[官网](https://lixiaodan.netlify.app/jspackages/data-footstone)
