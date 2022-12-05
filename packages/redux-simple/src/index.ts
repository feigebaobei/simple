import {Store as S, State, Action, Fn} from '../typings/interface'

class Store implements S {
    _state: State
    subscribeMap: Map<any, any>
    reducerFn: Fn
    constructor (reducerFn) {
        this._state = null
        this.subscribeMap = new Map()
        this.reducerFn = reducerFn
    }
    subscribe(fn: Fn) {
        this.subscribeMap.set(fn, Symbol())
        return () => {
            this.subscribeMap.delete(fn)
        }
    }
    dispatch(action: Action) {
        this.reducerFn(action)
        Array.from(this.subscribeMap.keys()).forEach(fn => {
            fn()
        })
    }
    getState() {
        return this._state
    }
}

export {Store}