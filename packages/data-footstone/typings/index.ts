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

interface Queue {
  getArray: () => {}
  push: (...p: A) => void
  pop: () => void
  peek: () => void
  isEmpty: () => void
  clear: () => {}
  size: () => void
}

export {
  S,
  N,
  B,
  A,
  Stack,
  Queue,
}
