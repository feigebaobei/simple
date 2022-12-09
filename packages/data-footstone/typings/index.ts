// import order from './order'

type S = string
type N = number
type B = boolean
type A = any

interface Stack {
  getArray: () => A[]
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
//   getArray: () => T[]
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
  getArray: () => T[]
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
  getArray: () => T[]
  getHead: () => T
  getTail: () => T
  size: () => N
  isEmpty: () => B
  clear: () => void
  // reverse: () => void
}
export {
  S,
  N,
  B,
  A,
  Stack,
  // BaseQueue,
  Queue,
  PriorityQueue,
  PriorityQueueElement,
}
