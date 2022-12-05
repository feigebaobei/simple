import {ParallelPlugin as P} from '../typings/interface'
import BasicPlugin from './basicPlugin'

class ParallelPlugin extends BasicPlugin implements P {
    method: string
    constructor(options = { method: 'all' } ) {
        super()
        this.method = options.method
    }
    call(hookName: string, ...p: any[]) {
        let hook = this._getHook(hookName)
        if (hook) {
            let ps = hook.getRegistrant()
                        .map((fn: Function) => {
                            return Promise.resolve(fn(...p))
                        })
            switch (this.method) {
                case 'all':
                default:
                    return Promise.all(ps)
                case 'allSettled':
                    return Promise.allSettled(ps)
            }
        } else {
            return Promise.all([])
        }
    }
}

let parallelPlugin = new ParallelPlugin()

export {
    ParallelPlugin,
    parallelPlugin,
}