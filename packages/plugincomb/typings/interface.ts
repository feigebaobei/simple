// 这里写接口可统一管理。也方便uml.

type SeriesMethod = 'bail' | 'waterFall'
type ParallelMethod = 'all' | 'allSettled'
interface Hooks {
    _box: Map<Function, symbol>
    register: (fn: Function) => void
    getRegistrant: () => Function[]
    logout: (fn: Function) => void
    clear: () => void
    size: () => number
}
interface BasicPlugin {
    _hookMap: Map<string, Hooks>
    _getHook: (hookName: string, fn: Function) => void
    register: (hookName: string, fn: Function) => void
    hasRegistedHook: (HookName: string) => boolean
    logout: (hookName: string, fn?: Function) => void
    clear: () => void
    getAllHookName: () => string[]
    getRegistrant: (hookName: string) => Function[] | undefined
    freeseMethod: () => void
}
interface SeriesPlugin extends BasicPlugin {
    // call: (hookName: string, ...p: any[]) => void
    method: SeriesMethod
    call: Function
}
interface ParallelPlugin extends BasicPlugin {
    call: (hookName: string, ...p: any[]) => Promise<any>
    // call: Function
}

export {
    SeriesMethod,
    ParallelMethod,
    Hooks,
    BasicPlugin,
    SeriesPlugin,
    ParallelPlugin,
}
