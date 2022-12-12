import {
    // S, 
    N, B,
    //  A, F
} from './baseType'

interface PSet<T> {
    box: Set<T>
    add: (v: T) => {}
    delete: (v: T) => B
    has: (v: T) => B
    clear: () => void
    size: () => N
    values: () => T[]
    // 并集
    concat: (...v: PSet<T>[]) => PSet<T>
    // 交集
    intersect: (...v: PSet<T>[]) => PSet<T>
    // 差集
    diffSet: (...v: PSet<T>[]) => PSet<T>
    // 子集
    subSetOf: (v: PSet<T>) => B
}

export {
    PSet,
  }
  