import {SingleChain} from './chain'
import {
    HashMap as HM,
    HashMapKind as HMK,
    HashMapHash as HMH,
    N,
    S,
    A,
} from '../typings'

class HashMap<G> implements HM<G> {
    box: HM<G>['box'] // 日后都改为这种写法
    _size: N
    kind: HMK
    hash: HMH
    _put: (k: A, v: G) => void
    _hashFn: (k: A) => N
    _get: (k: A) => G
    _remove: (k: A) => G
    constructor (kind: HMK = 'separate', hash: HMH = 'djb2') {
        this.box = []
        this._size = 0
        this.kind = kind
        this.hash = hash
        // this._put = () => {}
        // this._hashFn = () => ''
        // this._get = () => {}
        // this._remove = () => {}
        switch (kind) {
            case 'separate':
            default:
                this._put = (k: A, v: G) => {
                    let p = this.hashFn(k)
                    if (this.box[p] === undefined) {
                        this.box[p] = new SingleChain()
                    }
                    this._size++
                    return this.box[p].append(this.createNode(k, v))
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
                                res = cur.value.value
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
                break;
            case 'line':
                this._put = (k: S, v: G) => {
                    let p = this.hashFn(k)
                    while (this.box[p] !== undefined) {
                        p++
                    }
                    this.box[p] = this.createNode(k, v)
                }
                this._get = (k) => {
                    let p = this.hashFn(k)
                    let res = undefined
                    while (this.box[p] !== undefined) {
                        if (this.box[p].key === k) {
                            res = this.box[p].value
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
                    return res
                }
                break;
        }
        switch (hash) {
            case 'djb2':
            default:
                this._hashFn = (k: A) => {
                    let h = 5381
                    let t = String(k)
                    for (let i = 0; i < t.length; i++) {
                        h = h * 33 + t.charCodeAt(i)
                    }
                    return h % 1013
                }
                break;
            case 'loselose':
                this._hashFn = (k: A) => {
                    let h = 0
                    let t = String(k)
                    for (let i = 0; i < t.length; i++) {
                        h = h + t.charCodeAt(i)
                    }
                    return h % 37
                }
                break;
        }
    }
    createNode(k: A, v: G) {
        return {
            key: k,
            value: v
        }
    }
    put(k: A, v: G) {
        this._put(k, v)
    }
    get(k: A) {
        return this._get(k)
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

export {HashMap}