import { FortifiedMap as FM, } from '../typings'

class FortifiedMap<T, G> implements FM<T, G> {
    box: Map<T, G>
    constructor () {
        this.box = new Map()
    }
    set(k: T, v: G) {
        this.box.set(k, v)
    }
    delete(k: T) {
        return this.box.delete(k)
    }
    has(k: T) {
        return this.box.has(k)
    }
    get(k: T) {
        return this.box.get(k)
    }
    clear() {
        return this.box = new Map()
    }
    size() {
        return this.box.size
    }
    keys() {
        return this.box.keys()
    }
    values() {
        return this.box.values()
    }
    getMap() {
        return this.box
    }
}

export {FortifiedMap}