import { N, A } from './baseType'
import { SingleChain } from './chain'

type HashMapKind = 'separate' | 'line'
type HashMapHash = 'djb2' | 'loselose'
interface HashMapBoxItem<G> {
  key: A
  value: G
}
type HashMapBox<G> = HashMapBoxItem<G>[]

type HashFn = (p: A) => N

interface HashMap<G> {
  box: SingleChain<G> | HashMapBox<G>
  _size: N
  kind: HashMapKind
  hash: HashMapHash
  createNode: (k: A, v: G) => HashMapBoxItem<G>
  _put: (k: A, v: G) => N
  _hashFn: (k: A) => N
  _remove: (k: A) => G
  _get: (k: A) => HashMapBoxItem<G> | undefined
  put: (k: A, v: G) => N
  remove: (k: A) => G
  get: (k: A) => G | undefined
  hashFn: (k: A) => N
  size: () => N
}

export { HashMapKind, HashMapHash, HashMap, HashFn }
