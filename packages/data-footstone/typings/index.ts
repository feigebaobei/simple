import {S, N, B, A, F} from './baseType'
import { PSet } from './PSet'
import { PMap } from './PMap'
import { BaseChainElement, BaseChain, SingleChainElement, SingleChain, DoublyChainElement, DoublyChain, SingleCircleChainElement, SingleCircleChain, DoublyCircleChainElement, DoublyCircleChain } from './chain'
import { HashMap, HashMapKind, HashMapHash } from './hashMap'
import { BaseTreeNode, BaseTree, BinarySearchTree, AVLTree, RedBackTree } from './Tree'

// 日后可能会拆为stack/queue/...

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
  PSet,
  PMap,
  HashMap,
  HashMapKind,
  HashMapHash,
  BaseTreeNode,
  BaseTree,
  BinarySearchTree,
  AVLTree,
  RedBackTree,
}
