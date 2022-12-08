// import order from './order'

type S = string
type N = number
type B = boolean
type A = any

interface Stack {
    getArray: () => {}
    push: () => {}
    pop: () => {}
    peek: () => {}
    isEmpty: () => {}
    clear: () => {}
    size: () => {}
}

interface Queue {
    getArray: () => {}
    push: () => {}
    pop: () => {}
    peek: () => {}
    isEmpty: () => {}
    clear: () => {}
    size: () => {}
}

export {
    S,
    N,
    B,
    A,
    Stack,
    Queue
    // order,
    // stack,
    // queue,
}