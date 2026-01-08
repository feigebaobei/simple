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
  IDoublyChain as DC,
  LfuNode as LN,
  Lfu as L,
  F,
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
    this.policy = policy         // 缓存策略
    this.expiration = expiration
    this.period = period
    this.expirationTime = this.expiration * this.period // 过期时长
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
// least recently used
// 淘汰最近最少使用的数据
// 它维护一个缓存的访问顺序链表，当有新的数据被访问时，
// 如果数据已经在缓存中，则将其移到链表头部；
// 如果数据不在缓存中，则将其添加到链表头部。
// 当需要淘汰数据时，选择链表尾部的数据进行淘汰，因为尾部的数据是最近最少被访问的数据。
class Lru<K, V> {
  capacity: N
  reqFn: F
  chain: DoublyChain<{ key: K; value: V }>
  map: Map<K, DCE<{ key: K; value: V }>>
  constructor(capacity: N = 100, reqFn: F) {
    this.capacity = capacity
    this.reqFn = reqFn
    // this.chain = new DoublyChain<{ key: K; value: V }>()
    // this.map = new Map()
    this.chain = new DoublyChain(capacity) // 单向链表也行
  }
  req(k: K) {
    // this.reqFn(k)
    let v = 'x'
    return Promise.resolve(v)
  }
  get(k: K): V | undefined {
    let cur = this.chain.head
    let node
    while (cur) {
      if (cur.value.key === k) {
        node = cur
        break;
      }
      cur = cur.next
    }
    if (node) {
      this.chain.removeAt(node.position)
      this.chain.insert(this._createNode(node.value.key, node.value.value), 0)
      return node.value.value
    } else {
      // 去别的地方拿来数据v，再执行 this.push(k, v)
      // return this.req(k).then((v) => {
      //    this.push(v)
            // return v
      // })
      return undefined
    }
  }
  put(k: K, v: V) {
    // this.chain.append(this._createNode(k, v))
    this.chain.isFull
    if (this.chain.isFull()) {
      this.chain.removeAt(this.chain.length - 1)
    }
    this.chain.insert(this._createNode(k, v), 0)
  }
  size() {
    return this.chain.length
  }
  _createNode(k: K, v: V) {
    return {
      key: k,
      value: v,
    }
  }
}
// 最近多频使用
// 如果数据过去被访问多次，那么将来被访问的频率也更高
// least frequently used
// 它维护一个缓存对象的访问频次，
// 对于每个访问到的对象，增加其访问频次。
// 当需要淘汰数据时，选择访问频次最低的数据进行淘汰。
class Lfu<K, V> implements L<K, V> {
  reqFn: F
  capacity: N
  // chain: DC<LN<K, V>>
  chain: DoublyChain<LN<K, V>>
  // chain: DoublyChain<{key: K, value: V, count: N}>
  constructor(capacity: N = 100, reqFn: F) {
    this.reqFn = reqFn
    this.capacity = capacity
    this.chain = new DoublyChain<LN<K, V>>(capacity) // 单向链表也行
  }
  req(k: K) {
    return this.reqFn(k)
  }
  _createNode(k: K, v: V, count: N = 0): LN<K, V> {
    return {
      key: k,
      value: v,
      count, // 使用频次
    }
  }
  _get(k: K): DCE<LN<K, V>> {
    let res = undefined
    let cur = this.chain.head
    while (cur) {
      if (cur.value.key === k) {
        res = cur
        break
      }
      cur = cur.next
    }
    return res
  }
  get(k: K) {
    let node = this._get(k) // 链表的节点
    let res = undefined
    if (node) {
      res = node.value.value
      // 整理结构
      this.chain.removeAt(node.position)
      let newNode = this._createNode(node.value.key, node.value.value, node.value.count + 1)
      // chain中一定有元素
      this._insert(newNode)
    } else {
      return this.req(k).then(v => {
        this.put(k, v)
        return v
      })
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
    let node = this._get(k) // 链表上的节点
    if (node) {
      // 有
      node.value.value = v
      node.value.count++
      this.chain.removeAt(node.position)
      this._insert(node.value)
    } else {
      // 没有
      while (this.chain.isFull()) {
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
  Fifo, // first in first out
  Lru,
  Lfu,
  // Rand, // random replacement
  // Arc, // adaptive replacement
  // Mru, // most recently used

}
