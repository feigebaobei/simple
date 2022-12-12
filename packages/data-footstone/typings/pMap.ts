import {
    // S, 
    N, B,
    //  A, F
} from './baseType'

interface PMap<T, G> {
    box: Map<T, G>
    set: (k: T, v: G) => {}
    delete: (k: T) => B
    has: (k: T) => B
    get: (k: T) => G
    clear: () => void
    size: () => N
    keys: () => T[]
    values: () => G[]
}

export {
    PMap,
  }
  