class Hooks {
    constructor() {
        this._box = new Map()
        // {
        //     fn: Symbol
        // }
    }
    register(fn) {
        this._box.set(fn, Symbol())
    }
    // call(...params) {
    //     Array.from(this._box.keys()).forEach(fn => {
    //         fn(...params)
    //     })
    // }
    // 不应该在这里执行。这里只保存方法。
    getRegistrant() {
        return Array.from(this._box.keys())
    }
    logout(fn) {
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