// 这里写接口可统一管理。也方便uml.
type State = any
type Fn = Function
type ReducerFn  = (prevState: State, action: Action) => State

interface Action {
    type: string
    payload: any
}
interface Store {
    subscribeMap: Map<Fn, Symbol>
    reducerFn: ReducerFn
    subscribe: (fn: Function) => Function
    dispatch: (prevState: State, action: Action) => void
    getState: () => State
}

export {
    State,
    Fn,
    ReducerFn,
    Action,
    Store,
}
