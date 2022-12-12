import { FortifiedSet as FS } from '../typings'

class FortifiedSet<T> implements FS<T> {
    box: Set<T>
    constructor () {
        this.box = new Set()
        // this[Symbol.iterator]: a[Symbol.iterator].bind(a),
        this[Symbol.iterator] = this.values()
    }
    // box: Set<T>
    // add: (v: T) => {}
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
        return this.box.values()
    }
    getSet() {
        return this.box
    }
    // // 并集
    concat(...v: PSet<T>[]) {
        v.forEach(item => {
            item.forEach(subItem => {
                this.add(subItem)
            })
        })
        return this
    }
    // // 交集
    intersect(...v: PSet<T>[]) {
        v.forEach(item => {
            item.forEach(subItem => {
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
            item.forEach(subItem => {
                if (this.has(subItem)) {
                    this.delete(subItem)
                }
            })
        })
    }
    // // 子集
    subSetOf(v: PSet<T>) {
        return v.every(item => {
            return this.has(item)
        })
    }

}

export {FortifiedSet}