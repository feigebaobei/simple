import {SingleChain} from './chain'
import {
    HashMap as HM,
    HashMapKind as HMK,
    HashMapHash as HMH,
    S,
} from '../typings'

class HashMap<S, G> implements HM<S, G> {
    box: G[]
    _size: N
    kind: HMK
    hash: HMH
    constructor (kind = 'separate', hash = 'djb2') {
        this.box = []
        this._size = 0
        this.kind = kind
        this.hash = ''
        this._put = () => {}
        this._hashFn = () => ''
        switch (kind) {
            case 'separate':
            default:
                this._put = (k, v) => {
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
                    this.box[p] = ths.createNode(k, v)
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
                this._hashFn = (k) => {
                    let h = 5381
                    let t = k
                    if (typeof k === 'string') {} else {
                        t = k.toString()
                    }
                    h = t.reduce((r, c) => {
                        r = r * 33 + c.charCodeAt(0)
                        return r
                    }, h)
                    return h % 1013
                }
                break;
            case 'loselose':
                this._hashFn = (k) => {
                    let h = 0
                    let t = k
                    if (typeof k === 'string') {} else {
                        t = k.toString()
                    }
                    h = t.reduce((r, c) => {
                        return r += c.charCodeAt(0)
                    }, h)
                    return h % 37
                }
                break;
        }
    }
    createNode(k, v) {
        return {
            key: k,
            value: v
        }
    }
    put(k: S, v: G) {
        this._put(k, v)
    }
    get(k: S, v: G) {
        this._get(k, v)
    }
    remove(k: S, v: G) {
        this._remove(k, v)
    }
    size() {
        return this._size
    }
    hashFn(v: G) {
        return this._hashFn(v)
    }
}

// 也可以做成：
// 在基类中定义_hashFn等方法
// 在扩展类中使用基类的方法

export {HashMap}