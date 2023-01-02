import { S, N, B, A, F } from './baseType'

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
// 链表基类

export { Cache, CacheOption, CacheNode }
