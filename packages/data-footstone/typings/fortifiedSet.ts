import {
    // S, 
    N, B,
    //  A, F
} from './baseType'

interface ForifiedSet<T> {
    box: Set<T>
    add: (v: T) => {}
    delete: (v: T) => B
    has: (v: T) => B
    clear: () => void
    size: () => N
    values: () => T[]
    // 并集
    concat: (...v: ForifiedSet<T>[]) => ForifiedSet<T>
    // 交集
    intersect: (...v: ForifiedSet<T>[]) => ForifiedSet<T>
    // 差集
    diffSet: (...v: ForifiedSet<T>[]) => ForifiedSet<T>
    // 子集
    subSetOf: (v: ForifiedSet<T>) => B
}

export {
    ForifiedSet,
  }
  