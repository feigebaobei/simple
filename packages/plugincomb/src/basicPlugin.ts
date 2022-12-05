import Hooks from "./hooks";
import {BasicPlugin as B} from '../typings/interface'

// interface B {
//     _hookMap: Map<string, Hooks>
//     // private 
//     _getHook: (hookName: string, fn: Function) => void
//     register: (hookName: string, fn: Function) => void
//     hasRegistedHook: (HookName: string) => boolean
//     logout: (hookName: string, fn?: Function) => void
//     clear: () => void
//     getAllHookName: () => string[]
//     getRegistrant: (hookName: string) => Function[] | undefined
// }

// class BasicPlugin {
class BasicPlugin implements B {
    _hookMap: Map<string, Hooks>;
    constructor() {
        this._hookMap = new Map()
    }
    // 得到所有已经注册的hook | undefined
    _getHook(hookName: string) {
        return this._hookMap.get(hookName)
    }
    register(hookName: string, fn: Function) {
        // 是否存在指定hookName的钩子
        // 若存在则在该钩子上注册方法。
        // 否则创建新的钩子。为其添加方法
        let hook = this._getHook(hookName)
        if (hook) {
            hook.register(fn)
        } else {
            hook = new Hooks()
            hook.register(fn)
            this._hookMap.set(hookName, hook)
        }
    }
    // 是否存在指定hookName的钩子
    hasRegistedHook(hookName: string) {
        return this._hookMap.has(hookName)
    }
    // 注销钩子或钩子上的指定方法
    logout(hookName: string, fn?: Function) {
        let hook = this._getHook(hookName)
        if (hook) {
            if (fn) {
                hook.logout(fn)
                if (!this._getHook(hookName)?.size()) {
                    this._hookMap.delete(hookName) // 注销指定钩子
                }
            } else {
                this._hookMap.delete(hookName) // 注销指定钩子
            }
        }
    }
    // 清除所有钩子
    clear() {
        this._hookMap = new Map()
    }
    // 得到所有钩子的名称
    getAllHookName() {
        return Array.from(this._hookMap.keys())
    }
    getRegistrant(hookName: string) {
        let hook = this._getHook(hookName)
        if (hook) {
            return hook.getRegistrant()
        } else {
            return undefined
        }
    }
    freeseMethod() {
        Object.freeze(this._hookMap)
    }
}
export default BasicPlugin