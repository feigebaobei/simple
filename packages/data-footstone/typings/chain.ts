import { S, N, B, A, F } from './baseType'

interface BaseChainElement<T> {
  value: T
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
interface SingleChainElement<T> {
  value: T
  position: N // 标记出位置会方便一些
  next: SingleChainElement<T> | null
}
// 单向链表
// 可以使用extends Pick<objT, key...>
interface SingleChain<T> extends BaseChain<T> {
  head: SingleChainElement<T> | null
  length: N
  createNode: (v: T, p: N) => SingleChainElement<T>
  append: (p: T) => void
  insert: (p: T, position: N) => B
  removeAt: (position: N) => T | undefined
  // removeElement: (element: T, all: B) => B
  getEleByIndex: (index: N) => T | undefined
  reverseSelf: () => void
  reverse: () => SingleChain<T>
  clear: () => void
  setPosition: (from: N) => void
}

interface DoublyChainElement<T> {
  value: T
  position: N // 标记出位置会方便一些
  next: DoublyChainElement<T> | null
  prev: DoublyChainElement<T> | null
}
// 双向链表
interface DoublyChain<T> {
  createNode: (v: T, p: N) => DoublyChainElement<T>
  append: (p: T) => void
  insert: (v: T, p: N) => B
  removeAt: (p: N) => T | undefined
  toArray: () => T[]
  // getHead: () => {}
  // getTail: () => {}
  // moveToHeadByElement: () => {}
  // moveToHeadByPosition: () => {}
  // isEmpty: () => {}
  clear: () => void
  setPosition: (from: N) => void
}
// 单向循环链表

interface SingleCircleChainElement<T> {
  value: T
  position: N // 标记出位置会方便一些
  next: SingleCircleChainElement<T> | null
  // prev: SingleCircleChainElement<T> | null
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
interface SingleCircleChain<T>
  extends Pick<
    SingleChain<T>,
    // 'head' // |
    'length' | 'createNode' | 'append' | 'insert' | 'removeAt'
    // | 'removeElement'
    // | 'indexOf'
    // | 'getEleByIndex'
    // | 'toArray'
    // | 'reverseSelf'
    // | 'reverse'
  > {
  head: SingleCircleChainElement<T> | null
  tail: SingleCircleChainElement<T> | null
  // isValidRange: (p: N) => B
}
// 双向循环链表
interface DoublyCircleChainElement<T> {
  value: T
  position: N // 标记出位置会方便一些
  next: DoublyCircleChainElement<T> | null
  prev: DoublyCircleChainElement<T> | null
}
interface DoublyCircleChain<T> {
  createNode: (v: T, p: N) => DoublyCircleChainElement<T>
  append: (v: T) => void
  insert: (v: T, p: N) => B
  removeAt: (p: N) => T | undefined
}

export {
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
}
