// 并行执行
// 待测试
import BasicPlugin from "./basicPlugin";
// import Hooks from "./hooks";
class BailPlugin extends BasicPlugin{
    constructor() {
        super()
    }
    // 执行钩子上的所有方法
    call(hookName, ...p) {
        let hook = this._getHook(hookName)
        if (hook) {
            hook.getRegistrant() // [fn, ...]
                
            // let ps = hook.getRegistrant() // [fn, ...]
            //     .map(fn => {
            //         return new Promise((s, j) => {
            //             s(fn(...p))
            //         })
            //     })
            // return Promise.all(ps)
        }
    }
}
export default BailPlugin