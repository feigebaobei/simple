import { SingleChain } from './chain'
import {
  HashMap as HM,
  HashMapKind as HMK,
  HashMapHash as HMH,
  HashFn,
  N,
  S,
  A,
} from '../typings'

let djb2HashFn: HashFn = (k: A) => {
  let h = 5381
  let t = String(k)
  for (let i = 0; i < t.length; i++) {
    h = h * 33 + t.charCodeAt(i)
  }
  return h % 1013
}
let loseloseHashFn: HashFn = (k: A) => {
  let h = 0
  let t = String(k)
  for (let i = 0; i < t.length; i++) {
    h = h + t.charCodeAt(i)
  }
  return h % 37
}

class HashMap<G> implements HM<G> {
  box: HM<G>['box'] // 日后都改为这种写法
  _size: N
  kind: HMK
  hash: HMH
  _put: HM<G>['_put']
  _hashFn: (k: A) => N
  // _get: (k: A) => N
  _get: HM<G>['_get']
  _remove: (k: A) => G
  constructor(kind: HMK = 'separate', hash: HMH = 'djb2') {
    this.box = []
    this._size = 0
    this.kind = kind
    this.hash = hash
    switch (kind) {
      case 'separate':
      default:
        this._put = (k: A, v: G) => {
          let node = this._get(k)
          if (node) {
            node.value = v
          } else {
            let p = this.hashFn(k)
            if (this.box[p] === undefined) {
              this.box[p] = new SingleChain()
            }
            this.box[p].append(this.createNode(k, v))
            this._size++
          }
          return this._size
        }
        this._get = (k) => {
          let p = this.hashFn(k)
          if (this.box[p] === undefined) {
            return undefined
          } else {
            let cur = this.box[p].head
            let res = undefined
            while (cur) {
              if (cur.value.key === k) {
                // res = cur.value.value
                // 改为返回节点
                res = cur.value
                break
              }
              cur = cur.next
            }
            return res
          }
        }
        this._remove = (k) => {
          let p = this.hashFn(k)
          let res = undefined
          if (this.box[p] === undefined) {
            res = undefined
          } else {
            let cur = this.box[p].head
            let index = 0
            while (cur) {
              if (cur.value.key === k) {
                res = cur.value.value
                this.box[p].removeAt(index)
                break
              }
              index++
            }
          }
          this._size--
          return res
        }
        break
      case 'line':
        this._put = (k: S, v: G) => {
          let node = this._get(k)
          if (node) {
            node.value = v
          } else {
            let p = this.hashFn(k)
            while (this.box[p] !== undefined) {
              p++
            }
            this.box[p] = this.createNode(k, v)
            this._size++
          }
          return this._size
        }
        this._get = (k) => {
          let p = this.hashFn(k)
          let res = undefined
          while (this.box[p] !== undefined) {
            if (this.box[p].key === k) {
              // res = this.box[p].value
              // 改为返回节点
              res = this.box[p]
              break
            }
            p++
          }
          return res
        }
        this._remove = (k) => {
          let p = this.hashFn(k)
          let res = undefined
          while (this.box[p] !== undefined) {
            if (this.box[p].key === k) {
              res = this.box[p].value
              this.box[p] = undefined
              break
            }
            p++
          }
          this._size--
          return res
        }
        break
    }
    switch (hash) {
      case 'djb2':
      default:
        this._hashFn = djb2HashFn
        break
      case 'loselose':
        this._hashFn = loseloseHashFn
        break
    }
  }
  createNode(k: A, v: G) {
    return {
      key: k,
      value: v,
    }
  }
  put(k: A, v: G) {
    return this._put(k, v)
  }
  get(k: A) {
    let res = this._get(k)
    return res ? res.value : undefined
  }
  remove(k: A) {
    return this._remove(k)
  }
  size() {
    return this._size
  }
  hashFn(k: A) {
    return this._hashFn(k)
  }
}

// 也可以做成：
// 在基类中定义_hashFn等方法
// 在扩展类中使用基类的方法

export { HashMap, djb2HashFn, loseloseHashFn }
