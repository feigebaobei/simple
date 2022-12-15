import { PSet as PS } from '../typings'

class PSet<T> implements PS<T> {
    box: Set<T>
    constructor () {
        this.box = new Set()
        // this[Symbol.iterator]: a[Symbol.iterator].bind(a),
        // this[Symbol.iterator] = this.values()
    }
    add(v: T) {
        this.box.add(v)
    }
    delete(v: T) {
        return this.box.delete(v)
    }
    has(v: T) {
        return this.box.has(v)
    }
    clear() {
        return this.box = new Set()
    }
    size() {
        return this.box.size
    }
    values() {
        return Array.from(this.box.values())
    }
    getSet() {
        return this.box
    }
    // // 并集
    concat(...v: PS<T>[]) {
        v.forEach(item => {
            item.values().forEach(subItem => {
                this.add(subItem)
            })
        })
        return this
    }
    // // 交集
    intersect(...v: PSet<T>[]) {
        v.forEach(item => {
            item.values().forEach(subItem => {
                if (!this.has(subItem)) {
                    this.delete(subItem)
                }
            })
        })
        return this
    }
    // // 差集
    diffSet(...v: PSet<T>[]) {
        v.forEach(item => {
            item.values().forEach(subItem => {
                if (this.has(subItem)) {
                    this.delete(subItem)
                }
            })
        })
        return this
    }
    // // 子集
    subSetOf(v: PS<T>) {
        return v.values().every(item => {
            return this.has(item)
        })
    }

}

export {PSet}