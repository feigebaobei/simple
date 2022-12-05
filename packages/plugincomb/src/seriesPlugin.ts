import {SeriesPlugin as S, SeriesMethod} from '../typings/interface'
import BasicPlugin from './basicPlugin'

class SeriesPlugin extends BasicPlugin implements S {
    method: SeriesMethod
    constructor(options: {method: SeriesMethod} = { method: 'waterFall' } ) {
        super()
        this.method = options.method
    }
    call(hookName: string, ...p: any[]) {
        let hook = this._getHook(hookName)
        if (hook) {
            switch (this.method) {
                case 'bail':
                    let fnList = hook.getRegistrant()
                    let r
                    for (let i = 0; i < fnList.length; i++) {
                        r = fnList[i](...p)
                        if (r === undefined) {
                            break
                        }
                    }
                    return r
                case 'waterFall':
                    let [firstFn, ...restFnList] = hook.getRegistrant()
                    // 测试一个fn时
                    return restFnList.reduce((r, fn) => {
                        return r === undefined ? fn(...p) : fn(r, p.slice(1))
                    }, firstFn(...p))
                    
            }
        } else {
            return undefined
        }
    }
}

let seriesPlugin = new SeriesPlugin()

export {
    SeriesPlugin,
    seriesPlugin,
}