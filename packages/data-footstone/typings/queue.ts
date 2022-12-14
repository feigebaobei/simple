import {
  // S,
  N,
  B,
  A, //  F
} from './baseType'

interface BaseQueue {
  items: A[]
  // enqueue: (...p: T[]) => void
  // dequeue: () => T
  // toArray: () => A[]
  getHead: () => A
  getTail: () => A
  size: () => N
  isEmpty: () => B
  clear: () => void
  // reverse: () => void
}
// interface Queue<T> extends BaseQueue<T> {
interface Queue<T> {
  items: T[]
  enqueue: (...p: T[]) => N
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
interface PriorityQueueNode<T> {
  value: T
  position: N
  priority: N
}

interface PriorityQueue<T> {
  items: PriorityQueueNode<T>[]
  defaultPriority: N
  // protected createNode: (v: T, priority?: N, position?: N) => PriorityQueueNode<T>
  enqueue: (
    element: T,
    priority?: N,
    positionFlag?: B,
    needSetPosition?: B
  ) => N
  dequeue: () => T
  highestPriority: () => N | undefined
  toArray: () => T[]
  getHead: () => T
  getTail: () => T
  size: () => N
  isEmpty: () => B
  clear: () => void
  // jump: (p: N) => T
  updatePriorityAt: (p: N, v: N, positionFlag?: B) => B
  updateDimension: (v: N) => void
}

export { BaseQueue, Queue, PriorityQueueNode, PriorityQueue }
