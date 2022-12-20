import { Store as S, State, Action, ReducerFn, Fn } from "../typings/interface";

let state = undefined;

class Store implements S {
  subscribeMap: Map<any, any>;
  reducerFn: ReducerFn;
  constructor(reducerFn) {
    this.subscribeMap = new Map();
    this.reducerFn = reducerFn;
  }
  subscribe(fn: Fn) {
    this.subscribeMap.set(fn, Symbol());
    return () => {
      this.subscribeMap.delete(fn);
    };
  }
  dispatch(prevState: State, action: Action) {
    state = this.reducerFn(prevState, action);
    Array.from(this.subscribeMap.keys()).forEach((fn) => {
      fn();
    });
  }
  getState() {
    return state;
  }
}

export { Store };
