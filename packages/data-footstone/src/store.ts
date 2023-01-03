// 存储
import { SingleChain, DoublyChain } from './chain'
import {
  Cache as C,
  CacheNode as CN,
  CacheOption as CO,
  DoublyChainElement as DCE,
  N,
  FifoNode as FFN,
  Fifo as FF,
  SingleChain as SC,
  DoublyChain as DC,
  LfuNode as LN,
  Lfu as L,
  // DoublyChainElement,
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

// fifo
// 先进先出
// 这个写法可以证明链与队列是一样的。
class Fifo<K, V> implements FF<K, V> {
  capacity: N
  chain: SC<FFN<K, V>>
  // 参数可以考虑兼容 number / {capacity: number}
  constructor(capacity: N) {
    this.capacity = capacity
    this.chain = new SingleChain<FFN<K, V>>()
  }
  _createNode(k: K, v: V) {
    return {
      key: k,
      value: v,
    }
  }
  get(k: K) {
    let cur = this.chain.head
    let res = undefined
    while (cur) {
      if (cur.value.key === k) {
        res = cur.value.value
        break
      }
      cur = cur.next
    }
    return res
  }
  put(k: K, v: V) {
    this.chain.append(this._createNode(k, v))
    while (this.chain.length > this.capacity) {
      this.chain.removeAt(0)
    }
    return this.chain.length
  }
  size() {
    return this.chain.length
  }
  keys() {
    let res = []
    let cur = this.chain.head
    while (cur) {
      res.push(cur.value.key)
      cur = cur.next
    }
    return res
  }
  values() {
    let res = []
    let cur = this.chain.head
    while (cur) {
      res.push(cur.value.value)
      cur = cur.next
    }
    return res
  }
}

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
// 最近多频使用
// 如果数据过去被访问多次，那么将来被访问的频率也更高
class Lfu<K, V> implements L<K, V> {
  capacity: N
  chain: DC<LN<K, V>>
  constructor(capacity: N) {
    this.capacity = capacity
    this.chain = new DoublyChain<LN<K, V>>()
  }
  _createNode(k: K, v: V, count: N = 0): LN<K, V> {
    return {
      key: k,
      value: v,
      count,
    }
  }
  _get(k: K): DCE<LN<K,V>> {
    let res = undefined
    let cur = this.chain.head
    if (cur) {
      while (cur) {
        if (cur.value.key === k) {
          break
        }
        cur = cur.next
      }
      res = cur
    }
    return res
  }
  get(k: K) {
    let node = this._get(k)
    let res = undefined
    if (node) {
      res = node.value.value
      // 整理结构
      this.chain.removeAt(node.position)
      let newCount = node.value.count + 1
      let newNode = this._createNode(node.value.key, node.value.value, newCount)
      if (this.chain.length) {
        if (this.chain.tail.value.count > newCount) {
          this.chain.append(newNode)
        } else {
          this._insert(newNode)
        }
      } else {
        this.chain.append(newNode)
      }
    }
    return res
  }
  _insert(node: LN<K, V>) {
    let cur = this.chain.head
    while (cur) {
      if (cur.value.count <= node.count) {
        break
      }
      cur = cur.next
    }
    this.chain.insert(node, cur.position)
  }
  put(k: K, v: V) {
    let node = this._get(k)
    if (node) {
      // 有
      this.chain.removeAt(node.position)
      node.value.count++
      node.value.value = v
      this._insert(node.value)
    } else {
      // 没有
      while (this.chain.length >= this.capacity) {
        this.chain.removeAt(this.chain.length - 1)
      }
      let newNode = this._createNode(k, v, 1)
      if (this.chain.head) {
        this._insert(newNode)
      } else {
        this.chain.append(newNode)
      }
    }
    return this.size()
  }
  size() {
    return this.chain.length
  }
  keys() {
    let cur = this.chain.head
    let res = []
    while (cur) {
      res.push(cur.value.key)
      cur = cur.next
    }
    return res
  }
  values() {
    let cur = this.chain.head
    let res = []
    while (cur) {
      res.push(cur.value.value)
      cur = cur.next
    }
    return res
  }
}
export {
  // Cache,
  Fifo,
  Lru,
  Lfu,
}
