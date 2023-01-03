import { S, N, B, A, F } from './baseType'
import { SingleChain, DoublyChain } from './chain'
import { DoublyChainElement } from './chain'

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

// 还需要添加Lru
// type LfuNode<K, V> = FifoNode<K, V>
interface LfuNode<K, V> {
  key: K
  value: V
  count: N
}
interface Lfu<K, V> {
  capacity: N
  chain: DoublyChain<LfuNode<K, V>>
  _createNode: (k: K, v: V, c: N) => LfuNode<K, V>
  _get: (k: K) => DoublyChainElement<LfuNode<K, V>> | undefined
  get: (k: K) => V | undefined
  put: (k: K, v: V) => N
  size: () => N
  keys: () => K[]
  values: () => V[]
}
export { Cache, CacheOption, CacheNode, FifoNode, Fifo, LfuNode, Lfu }
