// 可能使用seriesPlugin代替
import BasicPlugin from "./basicPlugin";
// import Hooks from "./hooks";
class SyncPlugin extends BasicPlugin{
    constructor() {
        super()
    }
    // 执行钩子上的所有方法
    call(hookName, ...p) {
        let hook = this._getHook(hookName)
        if (hook) {
            hook.getRegistrant() // [fn, ...]
                .forEach(fn => {
                    fn(...p)
                })
        }
    }
}
export default SyncPlugin