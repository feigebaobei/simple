import { S, N, B, A, F } from './baseType'
import {Queue,
  PriorityQueueElement,
  PriorityQueue} from './queue'
import { PSet } from './pSet'
import { PMap } from './pMap'
import {
  BaseChainElement,
  BaseChain,
  SingleChainElement,
  SingleChain,
  DoublyChainElement,
  DoublyChain,
  SingleCircleChainElement,
  SingleCircleChain,
  DoublyCircleChainElement,
  DoublyCircleChain,
} from './chain'
import { HashMap, HashMapKind, HashMapHash } from './hashMap'
import {
  BaseTreeNode,
  BaseTree,
  BinarySearchTree,
  AVLTree,
  RedBackTree,
} from './Tree'
import {Graph, GraphColor} from './graph'

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
  Graph,
  GraphColor
}
