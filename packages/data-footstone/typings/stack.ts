import { 
    // S, 
    N,
     B,
    //  A,
    //   F 
} from './baseType'

interface Stack<T> {
    toArray: () => T[]
    push: () => N
    pop: () => T
    peek: () => T
    isEmpty: () => B
    clear: () => void
    size: () => N
  }
export {
    Stack
}