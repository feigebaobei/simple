// 并行执行
// 待测试
import BasicPlugin from "./basicPlugin";
// import Hooks from "./hooks";
import {isPromise} from './util'

class ParallelAllSettledPlugin extends BasicPlugin{
    constructor() {
        super()
    }
    // 执行钩子上的所有方法
    call(hookName, ...p) {
        let hook = this._getHook(hookName)
        if (hook) {
            let ps = hook.getRegistrant() // [registrant, ...]
                .map(registrant => {
                    if (isPromise(registrant)) {
                        return registrant
                    } else if (typeof registrant === 'function') {
                        return registrant(...p) // 应该返回一个promise
                    }
                })
            return Promise.allSettled(ps)
        }
    }
}
export default ParallelAllSettledPlugin