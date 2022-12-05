'use strict';

const {
    parallelPlugin,
    ParallelPlugin,
    seriesPlugin,
    SeriesPlugin
} = require('../dist_cjs/index.js')

let clog = console.log

let fn0 = jest.fn((a) => {
    return new Promise((s) => {
        setTimeout(() => {
            s(`fn0, ${a}`)
            // clog('fn0', a)
        }, 2000)
    })
})
let fn1 = jest.fn((a) => {
    return new Promise((s) => {
        setTimeout(() => {
            s(`fn1, ${a}`)
            // clog('fn0', a)
        }, 1000)
    })
})
let fn2 = jest.fn((a) => {
    setTimeout(() => {
        clog('fn2', a)
    }, 3000)
})

parallelPlugin.register('fh', fn0)
parallelPlugin.register('fh', fn1)
// parallelPlugin.register('fh', fn2)
parallelPlugin.call('fh', 'a', 'b', 'c')
test('注册方法', () => {
    // parallelPlugin.register('fh', fn3)
    // parallelPlugin.register('fh', fn4)
    // parallelPlugin.register('fh', fn5)
    expect(parallelPlugin._getHook('fh')).toBeTruthy()
    expect(parallelPlugin.getAllHookName().length).toBe(1)
    expect(parallelPlugin.getAllHookName()).toContain('fh')
    expect(parallelPlugin.hasRegistedHook('fh')).toBeTruthy()
    expect(parallelPlugin.hasRegistedHook('fh1')).toBeFalsy()
})


test('运行方法', async () => {
    let a = await parallelPlugin.call('fh', 'a', 'b', 'c')
    expect(a).toEqual(["fn0, a", "fn1, a"])
    expect(fn1.mock.calls.length).toBe(2) // 调用次数
    expect(fn1.mock.calls[0][0]).toBe('a')
    expect(fn1.mock.calls[0][1]).toBeUndefined
    
})


