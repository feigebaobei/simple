// 存储
import { SingleChain, DoublyChain } from './chain'
import {
  Cache as C,
  CacheNode as CN,
  CacheOption as CO,
  DoublyChainElement as DCE,
  N,
} from '../typings'

// 未测试完
class Cache<K, V> implements C<K, V> {
  size: N
  policy: 'lru' | 'fifo'
  expiration: N
  period: N
  expirationTime: N
  box: Map<K, CN<K, V>>
  constructor({ size, policy = 'lru', expiration = 5, period = 10000 }: CO) {
    this.box = new Map()
    this.size = size
    this.policy = policy
    this.expiration = expiration
    this.period = period
    this.expirationTime = this.expiration * this.period
    this._setIntervalFlush()
  }
  get(k: K) {
    let res = this.box.get(k)
    return res !== undefined ? res.value : undefined
  }
  put(k: K, v: V, flushTime = new Date().getTime() + this.expirationTime) {
    this.box.set(k, this._createNode(k, v, flushTime))
  }
  _createNode(
    k: K,
    v: V,
    flushTime = new Date().getTime() + this.expirationTime
  ) {
    return {
      flushTime,
      key: k,
      value: v,
    }
  }
  _flush() {
    let now = new Date().getTime()
    Array.from(this.box.entries()).forEach(([k, v], i) => {
      if (v.flushTime < now) {
        this.box.delete(k)
      }
    })
  }
  _setIntervalFlush() {
    this._flush()
    let self = this
    setInterval(() => {
      self._flush()
    }, this.expirationTime)
  }
}

// fifo 不开发，请使用队列。
// 日后可再扩展

// 最近最少使用算法
// 如果数据最近被访问过，那么将来被访问的几率也更高
class Lru<K, V> {
  capacity: N
  chain: DoublyChain<{ key: K; value: V }>
  map: Map<K, DCE<{ key: K; value: V }>>
  constructor(capacity: N) {
    this.capacity = capacity
    this.chain = new DoublyChain<{ key: K; value: V }>()
    this.map = new Map()
  }
  _createNode(k: K, v: V) {
    return {
      key: k,
      value: v,
    }
  }
  get(k: K) {
    let node = this.map.get(k)
    let res: V | undefined
    if (node) {
      res = node.value.value
      this.chain.removeAt(node.position)
      this.chain.append(this._createNode(node.value.key, node.value.value))
    } else {
      res = undefined
    }
    return res
  }
  put(k: K, v: V) {
    let node = this.map.get(k)
    if (node) {
      this.chain.removeAt(node.position)
      this.chain.append(this._createNode(k, v))
    } else {
      this.chain.append(this._createNode(k, v))
      this.map.set(k, this.chain.tail)
      while (this.map.size > this.capacity) {
        this.map.delete(this.chain.head.value.key)
        this.chain.removeAt(0)
      }
    }
  }
  remove(k: K) {
    let node = this.map.get(k)
    if (node) {
      this.chain.removeAt(node.position)
      this.map.delete(node.value.key)
    }
  }
}
// 待测试
// 如果数据过去被访问多次，那么将来被访问的频率也更高
class Lfu {
  constructor() {}
}
export {
  // Cache,
  Lru,
  //  Lfu
}
