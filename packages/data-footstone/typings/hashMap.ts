import {
    S, 
    N, B,
    //  A, F
} from './baseType'

type HashMapKind = 'separate' | 'line'
type HashMapHash = 'djb2' | 'loselose'

interface HashMap<S, G> {
    box: G[]
    _size: N
    kind: HashMapKind
    hash: HashMapHash
    _hashFn: (G) => S
    _put: (k: S, v: G) => void
    _remove: (k: S) => G
    _get: (k: S) => G
    put: (k: S, v: G) => void
    remove: (k: S) => G
    get: (k: S) => G
    hashFn: (k: S) => G
}

export {
    HashMapKind,
    HashMap,
    HashMapHash,
  }
  