import {Hooks as H} from '../typings/interface'

class Hooks implements H {
    _box: Map<Function, symbol>

    constructor() {
        this._box = new Map()
    }

    register(fn: Function) {
        this._box.set(fn, Symbol())
    }
    getRegistrant() {
        return Array.from(this._box.keys())
    }
    logout(fn: Function) {
        if (fn) {
            this._box.delete(fn)
        } else {
            this.clear()
        }
    }
    clear() {
        this._box = new Map()
    }
    size() {
        return this._box.size
    }
}

export default Hooks