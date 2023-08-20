import {
  // S,
  N,
  B,
  //  A,
  //   F
} from './baseType'

interface Stack<T> {
  readonly capacity: N
  toArray: () => T[]
  push: (p: T) => Error | N
  pop: () => T
  peek: () => T
  isEmpty: () => B
  clear: () => void
  size: () => N
}
export { Stack }
