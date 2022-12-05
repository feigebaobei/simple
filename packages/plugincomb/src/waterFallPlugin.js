// 并行执行
// 待测试
import BasicPlugin from "./basicPlugin";
import {isUndefined} from './util'
// import Hooks from "./hooks";
class WaterFallPlugin extends BasicPlugin{
    constructor() {
        super()
    }
    // 执行钩子上的所有方法
    call(hookName, ...p) {
        let hook = this._getHook(hookName)
        if (hook) {
            let [first, ...rest] = hook.getRegistrant() // [fn, ...]
            return rest.reduce((r, c) => {
                if (isUndefined(r)) {
                    r = c(...p)
                } else {
                    r = c(r, p.slice(1))
                }
                return r
            }, first(...p))
        }
    }
}
export default WaterFallPlugin