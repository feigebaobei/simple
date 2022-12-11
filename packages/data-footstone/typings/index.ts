import {S, N, B, A, F} from './baseType'

// 日后可能会拆为stack/queue/chain/...

interface Stack {
  toArray: () => A[]
  push: () => void
  pop: () => void
  peek: () => void
  isEmpty: () => void
  clear: () => void
  size: () => void
}

// interface BaseQueue<T> {
//   items: T[]
//   // enqueue: (...p: T[]) => void
//   dequeue: () => T
//   toArray: () => T[]
//   getHead: () => T
//   getTail: () => T
//   size: () => N
//   isEmpty: () => B
//   clear: () => void
//   reverse: () => void
// }
// interface Queue<T> extends BaseQueue<T> {
interface Queue<T> {
  items: T[]
  enqueue: (...p: T[]) => void
  dequeue: () => T
  toArray: () => T[]
  getHead: () => T
  getTail: () => T
  size: () => N
  isEmpty: () => B
  clear: () => void
  reverse: () => void
}
// interface PriorityQueue<T extends {priority: N}> extends BaseQueue<T> {
//   highestPriority: () => N | undefined
//   enqueue: (element: T, priority: N) => void
// }
interface PriorityQueueElement<T> {
  value: T
  priority: N
}

interface PriorityQueue<T> {
  items: PriorityQueueElement<T>[]
  defaultPriority: N
  enqueue: (element: T, priority: N) => void
  dequeue: () => T
  highestPriority: () => N | undefined
  toArray: () => T[]
  getHead: () => T
  getTail: () => T
  size: () => N
  isEmpty: () => B
  clear: () => void
  // reverse: () => void
}


// interface Chain<T> {
//   // append: ((p: T) => void) | (((a: S, b: B) => N))
// }
interface BaseChainElement<T> {
  value: T,
  next: BaseChainElement<T> | null
}
// 链表基类
interface BaseChain<T> {
  // join: () => T[]
  head: BaseChainElement<T> | null
  toArray: () => T[]
  isValidRange: (p: N) => B
  indexOf: (v: T, all: B) => N[] | N
  getEleByIndex: (i: N) => T | undefined
}
interface SingleChainElement<T>{
  value: T
  next: SingleChainElement<T> | null
}
// 单向链表
// 可以使用extends Pick<objT, key...>
interface SingleChain<T> extends BaseChain<T> {
  head: SingleChainElement<T> | null
  length: N
  createNode: (p: T) => SingleChainElement<T>
  append: (p: T) => void
  insert: (p: T, position: N) => B
  removeAt: (position: N) => T | undefined
  removeElement: (element: T, all: B) => B
  getEleByIndex: (index: N) => T | undefined
  reverseSelf: () => void
  reverse: () => SingleChain<T>
  clear: () => void
}

interface DoublyChainElement<T>{
  value: T
  next: DoublyChainElement<T> | null
  prev: DoublyChainElement<T> | null
}
// 双向链表
interface DoublyChain<T> {
  append: (p: T) => void
  // getElementByPostion: () => {}
  // getPositionByElement: () => {}
  // existElement: () => {}
  insert: (v: T, p: N) => B
  removeAt: (p: N) => T | undefined
  // removeAtRight: () => {}
  // removeTail: () => {}
  // removeHead: () => {}
  // removeElement: () => {}
  // join: () => {}
  // slice: () => {}
  // splice: () => {}
  toArray: () => T[]
  // getHead: () => {}
  // getTail: () => {}
  // moveToHeadByElement: () => {}
  // moveToHeadByPosition: () => {}
  // isEmpty: () => {}
  clear: () => void
}
// 单向循环链表

interface SingleCircleChainElement<T> {
  value: T
  next: SingleCircleChainElement<T> | null
  prev: SingleCircleChainElement<T> | null
}

// interface SingleCircleChain<T> extends SingleChain<T> {
// interface SingleCircleChain<T> {
//   append: (p: T) => void
//   insert: () => {}
//   removeAt: () => {}
//   removeElement: () => {}
//   slice: () => {}
//   getEleByIndex: () => {}
//   getTail: () => {}
// }
// interface SingleCircleChain<T> extends SingleChain<T> {
//   // append: (a: S, b: B) => N
//   // append: SingleChain<T>['append'] | ((a: S, b: B) => N)
// } 
interface SingleCircleChain<T> extends Pick<SingleChain<T>, 
// 'head' |
'length' |
'createNode' |
'append' |
'insert' |
'removeAt' |
'removeElement' |
'indexOf' |
'getEleByIndex' |
'toArray' |
'reverseSelf' |
'reverse'
> {
  head: SingleCircleChainElement<T> | null
  isValidRange: (p: N) => B
}
// 双向循环链表
interface DoublyCircleChainElement<T> extends DoublyChainElement<T> {

}
interface DoublyCircleChain<T> {
}

export {
  S,
  N,
  B,
  A,
  F,
  Stack,
  // BaseQueue,
  Queue,
  PriorityQueue,
  PriorityQueueElement,
  BaseChainElement,
  BaseChain,
  SingleChainElement,
  SingleChain,
  DoublyChainElement,
  DoublyChain,
  SingleCircleChain,
  SingleCircleChainElement,
  DoublyCircleChain,
  DoublyCircleChainElement,
}
