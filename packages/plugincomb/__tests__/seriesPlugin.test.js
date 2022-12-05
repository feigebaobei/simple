'use strict';

const {
    parallelPlugin,
    ParallelPlugin,
    seriesPlugin,
    SeriesPlugin
} = require('../dist_cjs/index.js')

let clog = console.log

let fn0 = jest.fn((a) => {
    clog('fn0', a)
})
let fn1 = jest.fn((a) => {
    clog('fn1', a)
})
let fn2 = jest.fn((a) => {
    clog('fn2', a)
})
let fn3 = jest.fn((a) => {
    clog('fn3', a)
})
let fn4 = jest.fn((a) => {
    clog('fn4', a)
})
let fn5 = jest.fn((a) => {
    clog('fn4', a)
})

// let mockCb = jest.fn((x) => 2 + x)
// forEach([0, 1].mockCb)
// test('str', () => {
//   expect(mockCb.mock.calls.length).toBe(2) // 调用次数
//   expect(mockCb.mock.calls[0][0]).toBe(0)
//   expect(mockCb.mock.calls[1][0]).toBe(1)
//   expect(mockCb.mock.results[0].value).toBe(42)
//   // mockCb.bind(o) // 绑定this
// })



// clog(obj)
test('基本结构', () => {
    expect(seriesPlugin).toEqual({
        _hookMap: new Map(),
        method: 'waterFall'
    })
    expect(seriesPlugin._getHook('fh')).toBeFalsy()
})

test('注册方法', () => {
    seriesPlugin.register('fh', fn0)
    seriesPlugin.register('fh', fn1)
    seriesPlugin.register('fh', fn2)
    seriesPlugin.register('fh', fn3)
    seriesPlugin.register('fh', fn4)
    seriesPlugin.register('fh', fn5)
    expect(seriesPlugin._getHook('fh')).toBeTruthy()
    expect(seriesPlugin.getAllHookName().length).toBe(1)
    expect(seriesPlugin.getAllHookName()).toContain('fh')
    expect(seriesPlugin.hasRegistedHook('fh')).toBeTruthy()
    expect(seriesPlugin.hasRegistedHook('fh1')).toBeFalsy()
})

test('运行方法', () => {
    seriesPlugin.call('fh', 'a', 'b', 'c')
    expect(fn5.mock.calls.length).toBe(1) // 调用次数
    expect(fn5.mock.calls[0][0]).toBe('a')
    expect(fn5.mock.calls[0][1]).toBe('b')
    expect(fn5.mock.calls[0][2]).toBe('c')
    expect(fn5.mock.calls[0].length).toBe(3)
})
test('注销方法', () => {
    seriesPlugin.logout('fh', fn1)
    seriesPlugin.logout('fh', fn2)
    expect(seriesPlugin.getRegistrant('fh')).not.toContain(fn1)
    expect(seriesPlugin.getRegistrant('fh')).toContain(fn3)
    seriesPlugin.call('fh', 'a', 'b')
    expect(fn1.mock.calls.length).toBe(1)
    expect(fn3.mock.calls.length).toBe(2)
    expect(fn4.mock.calls[1].length).toBe(2)
    seriesPlugin.clear()
    expect(seriesPlugin.getAllHookName().length).toBe(0)
})

test('运行方法2', () => {
    expect(fn5.mock.calls.length).toBe(2)
    expect(fn5.mock.calls[0][0]).toBe('a')
    expect(fn5.mock.calls[0][1]).toBe('b')
    expect(fn5.mock.calls[0][2]).toBe('c')
    expect(fn5.mock.calls[0].length).toBe(3)
})

