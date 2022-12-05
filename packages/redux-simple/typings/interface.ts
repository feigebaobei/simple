// 这里写接口可统一管理。也方便uml.
type State = any
type Fn = Function
interface Action {
    type: string
    payload: any
}
interface Store {
    _state: State
    subscribeMap: Map<Fn, Symbol>
    reducerFn: Fn
    subscribe: (fn: Function) => Function
    dispatch: (action: Action) => void
    getState: () => State
}

export {
    State,
    Fn,
    Action,
    Store,
}
