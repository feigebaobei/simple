import { S, N, B, A, F } from './baseType'
import { SingleChain } from './chain'

interface CacheNode<K, V> {
  flushTime: N
  key: K
  value: V
}
// type
interface CacheOption {
  size: N
  policy: 'lru' | 'fifo'
  expiration: N
  period: N
}
interface Cache<K, V> {
  // policy: 'lru' | 'fifo'
  get: (k: K) => V | undefined
  put: (k: K, v: V) => void
  _createNode: (k: K, v: V, f: N) => CacheNode<K, V>
  _flush: () => void
  _setIntervalFlush: () => void
  //   _createNode: () => void
}

interface FifoNode<K, V> {
  key: K
  value: V
}
interface Fifo<K, V> {
  capacity: N
  chain: SingleChain<FifoNode<K, V>>
  _createNode: (k: K, v: V) => FifoNode<K, V>
  get: (k: K) => V | undefined
  put: (k: K, v: V) => N
  size: () => N
  keys: () => K[]
  values: () => V[]
}

export { Cache, CacheOption, CacheNode, FifoNode, Fifo }
