import {
    Graph,
  } from '../src/graph'
import { af, mapToObj } from '../src/helper'
import { Queue } from '../src/queue'

let afGetValue = (iterator, key) => {
    return af(iterator).map(item => item[key])
}

describe('Graph', () => {
    it('Graph basic 有向图 添加点、边', () => {
        let g = new Graph()
        expect(g.direction).toBeTruthy()
        expect(g.createVertex('a').data).toBe('a')
        g.putVertex('a')
        g.putVertex('b')
        g.putVertex('c')
        g.putEdge('a', 'b')
        g.putEdge('a', 'c')
        expect(afGetValue(g.vertexMap.values(), 'data')).toEqual(['a', 'b', 'c'])
        expect(g.edgeList().length).toBe(2)
        expect(g.edgeList().map(edge => {
        return {
            start: edge.start.data,
            end: edge.end.data,
        }
        })).toEqual([{
        start: 'a',
        end: 'b',
        }, {
        start: 'a',
        end: 'c',
        }])
    })
    test('Graph basic 有向图 移除点0', () => {
        let g = new Graph()
        expect(g.direction).toBeTruthy()
        expect(g.createVertex('a').data).toBe('a')
        g.putVertex('a')
        g.putVertex('b')
        g.putVertex('c')
        g.putVertex('d')
        g.putEdge('a', 'b')
        g.putEdge('a', 'c')
        g.putEdge('b', 'd')
        g.removeVertex('b') // 移除一个起点+终点
        expect(afGetValue(g.vertexMap.values(), 'data')).toEqual(['a', 'c', 'd'])
        expect(g.edgeList().length).toBe(1)
        expect(g.edgeList().map(edge => {
            return {
                start: edge.start.data,
                end: edge.end.data,
            }
        })).toEqual([{
            start: 'a',
            end: 'c',
            },
        ])
    })
    test('Graph basic 有向图 移除点1', () => {
        let g = new Graph()
        expect(g.direction).toBeTruthy()
        expect(g.createVertex('a').data).toBe('a')
        g.putVertex('a')
        g.putVertex('b')
        g.putVertex('c')
        g.putVertex('d')
        g.putEdge('a', 'b')
        g.putEdge('a', 'c')
        g.putEdge('b', 'd')
        g.removeVertex('a') // 移除一个起点
        expect(afGetValue(g.vertexMap.values(), 'data')).toEqual(['b', 'c', 'd'])
        expect(g.edgeList().length).toBe(1)
        expect(g.edgeList().map(edge => {
            return {
                start: edge.start.data,
                end: edge.end.data,
            }
        })).toEqual([{
            start: 'b',
            end: 'd',
        },
    ])
    })
    test('Graph basic 有向图 移除点2', () => {
        let g = new Graph()
        expect(g.direction).toBeTruthy()
        expect(g.createVertex('a').data).toBe('a')
        g.putVertex('a')
        g.putVertex('b')
        g.putVertex('c')
        g.putVertex('d')
        g.putEdge('a', 'b')
        g.putEdge('a', 'c')
        g.putEdge('b', 'd')
        g.removeVertex('c') // 移除一个终点
        expect(afGetValue(g.vertexMap.values(), 'data')).toEqual(['a', 'b', 'd'])
        expect(g.edgeList().length).toBe(2)
        expect(g.edgeList().map(edge => {
            return {
                start: edge.start.data,
                end: edge.end.data,
            }
        })).toEqual([
            {
                start: 'a',
                end: 'b',
            },
            {
                start: 'b',
                end: 'd',
            },
        ])
    })
    test('Graph basic 有向图 移除点3', () => {
        let g = new Graph()
        expect(g.direction).toBeTruthy()
        expect(g.createVertex('a').data).toBe('a')
        g.putVertex('a')
        g.putVertex('b')
        g.putVertex('c')
        g.putVertex('d')
        g.putVertex('e')
        g.putEdge('a', 'b')
        g.putEdge('a', 'c')
        g.putEdge('b', 'd')
        expect(afGetValue(g.vertexMap.values(), 'data')).toEqual(['a', 'b', 'c', 'd', 'e'])
        g.removeVertex('e') // 移除一个无边的点
        expect(afGetValue(g.vertexMap.values(), 'data')).toEqual(['a', 'b', 'c', 'd'])
        expect(g.edgeList().length).toBe(3)
        expect(g.edgeList().map(edge => {
            return {
                start: edge.start.data,
                end: edge.end.data,
            }
        })).toEqual([
            {
                start: 'a',
                end: 'b',
            },
            {
                start: 'a',
                end: 'c',
            },
            {
                start: 'b',
                end: 'd',
            },
        ])
    })
    test('Graph basic 有向图 移除边', () => {
        let g = new Graph()
        expect(g.direction).toBeTruthy()
        expect(g.createVertex('a').data).toBe('a')
        g.putVertex('a')
        g.putVertex('b')
        g.putVertex('c')
        g.putVertex('d')
        g.putVertex('e')
        g.putEdge('a', 'b')
        g.putEdge('a', 'c')
        g.putEdge('b', 'd')
        expect(afGetValue(g.vertexMap.values(), 'data')).toEqual(['a', 'b', 'c', 'd', 'e'])
        g.removeEdge('a', 'b')
        g.removeEdge('a', 'c')
        // expect(afGetValue(g.vertexMap.values(), 'data')).toEqual(['a', 'b', 'c', 'd'])
        expect(g.edgeList().length).toBe(1)
        expect(g.edgeList().map(edge => {
            return {
                start: edge.start.data,
                end: edge.end.data,
            }
        })).toEqual([
            {
                start: 'b',
                end: 'd',
            },
        ])
    })
})
describe('Graph 无向图', () => {
    it('Graph basic 无向图 添加点、边', () => {
        let g = new Graph(false)
        expect(g.direction).toBeFalsy()
        g.putVertex('a')
        g.putVertex('b')
        g.putVertex('c')
        g.putVertex('d')
        g.putVertex('e')
        g.putEdge('a', 'b')
        g.putEdge('a', 'c')
        g.putEdge('b', 'd')
        expect(g.edgeList().length).toBe(6)
        expect(g.edgeList().map(edge => {
            return {
                start: edge.start.data,
                end: edge.end.data,
            }
        })).toEqual([
            {
                start: 'a',
                end: 'b',
            },
            {
                start: 'a',
                end: 'c',
            },
            {
                start: 'b',
                end: 'a',
            },
            {
                start: 'b',
                end: 'd',
            },
            {
                start: 'c',
                end: 'a',
            },
            {
                start: 'd',
                end: 'b',
            },
        ])
    })
    test('Graph basic 无向图 移除点 起点', () => {
        let g = new Graph(false)
        expect(g.direction).toBeFalsy()
        g.putVertex('a')
        g.putVertex('b')
        g.putVertex('c')
        g.putVertex('d')
        g.putVertex('e')
        g.putEdge('a', 'b')
        g.putEdge('a', 'c')
        g.putEdge('b', 'd')
        expect(g.removeVertex('a').data).toBe('a')
        expect(afGetValue(g.vertexMap.values(), 'data')).toEqual(['b', 'c', 'd', 'e'])
        expect(g.edgeList().length).toBe(2)
        expect(g.edgeList().map(edge => {
            return {
                start: edge.start.data,
                end: edge.end.data,
            }
        })).toEqual([
            { start: 'b', end: 'd'},
            { start: 'd', end: 'b'},
        ])
    })
    test('Graph basic 无向图 移除点 终点', () => {
        let g = new Graph(false)
        expect(g.direction).toBeFalsy()
        g.putVertex('a')
        g.putVertex('b')
        g.putVertex('c')
        g.putVertex('d')
        g.putVertex('e')
        g.putEdge('a', 'b')
        g.putEdge('a', 'c')
        g.putEdge('b', 'd')
        expect(g.removeVertex('c').data).toBe('c')
        expect(afGetValue(g.vertexMap.values(), 'data')).toEqual(['a', 'b', 'd', 'e'])
        expect(g.edgeList().length).toBe(4)
        expect(g.edgeList().map(edge => {
            return {
                start: edge.start.data,
                end: edge.end.data,
            }
        })).toEqual([
            { start: 'a', end: 'b'},
            { start: 'b', end: 'a'},
            { start: 'b', end: 'd'},
            { start: 'd', end: 'b'},
        ])
    })
    test('Graph basic 无向图 移除点 起点+终点', () => {
        let g = new Graph(false)
        expect(g.direction).toBeFalsy()
        g.putVertex('a')
        g.putVertex('b')
        g.putVertex('c')
        g.putVertex('d')
        g.putVertex('e')
        g.putEdge('a', 'b')
        g.putEdge('a', 'c')
        g.putEdge('b', 'd')
        expect(g.removeVertex('b').data).toBe('b')
        expect(afGetValue(g.vertexMap.values(), 'data')).toEqual(['a', 'c', 'd', 'e'])
        expect(g.edgeList().length).toBe(2)
        expect(g.edgeList().map(edge => {
            return {
                start: edge.start.data,
                end: edge.end.data,
            }
        })).toEqual([
            { start: 'a', end: 'c'},
            { start: 'c', end: 'a'},
        ])
    })
    test('Graph basic 无向图 移除点 无关联点', () => {
        let g = new Graph(false)
        expect(g.direction).toBeFalsy()
        g.putVertex('a')
        g.putVertex('b')
        g.putVertex('c')
        g.putVertex('d')
        g.putVertex('e')
        g.putEdge('a', 'b')
        g.putEdge('a', 'c')
        g.putEdge('b', 'd')
        expect(g.removeVertex('e').data).toBe('e')
        expect(afGetValue(g.vertexMap.values(), 'data')).toEqual(['a','b', 'c', 'd'])
        expect(g.edgeList().length).toBe(6)
        expect(g.edgeList().map(edge => {
            return {
                start: edge.start.data,
                end: edge.end.data,
            }
        })).toEqual([
            { start: 'a', end: 'b', },
            { start: 'a', end: 'c', },
            { start: 'b', end: 'a', },
            { start: 'b', end: 'd', },
            { start: 'c', end: 'a', },
            { start: 'd', end: 'b', },
        ])
    })
})

describe('Graph bfs', () => {
    test('Graph bfs', () => {
        let g = new Graph()
        // expect(g.direction).toBeFalsy()
        g.putVertex('a')
        g.putVertex('b')
        g.putVertex('c')
        g.putVertex('d')
        g.putVertex('e')
        g.putEdge('a', 'b')
        g.putEdge('a', 'c')
        g.putEdge('b', 'd')
        let arr = []
        let cb = (vertex) => {
            arr.push(vertex.data)
        }
        g.bfs('a', cb)
        expect(arr).toEqual(['a', 'b', 'c', 'd', 'e'])
    })
})
describe('Graph dfs', () => {
    test('Graph dfs', () => {
        let g = new Graph()
        // expect(g.direction).toBeFalsy()
        g.putVertex('a')
        g.putVertex('b')
        g.putVertex('c')
        g.putVertex('d')
        g.putVertex('e')
        g.putEdge('a', 'b')
        g.putEdge('a', 'c')
        g.putEdge('b', 'd')
        let arr = []
        let cb = (vertex) => {
            arr.push(vertex.data)
        }
        g.dfs('a', cb)
        expect(arr).toEqual(['a', 'b', 'd', 'c', 'e'])
    })
})

describe('Graph path', () => {
    test('Graph path', () => {
        let g = new Graph()
        // expect(g.direction).toBeFalsy()
        g.putVertex('a')
        g.putVertex('b')
        g.putVertex('c')
        g.putVertex('d')
        g.putVertex('e')
        g.putEdge('a', 'b')
        g.putEdge('a', 'c')
        g.putEdge('b', 'd')
        let {distance, predecessors} = g.shortestPath()
        expect(af(distance.keys())).toEqual([])
        expect(af(predecessors.keys())).toEqual([])
        let res = g.shortestPath('a')
        // 也可以使用map对象测试。
        // eg:
        // let m = new Map
        // m.set(k, v)
        // expect(obj).toEqual(m)
        expect(mapToObj(res.distance)).toEqual({
            'a': 0,
            'b': 1,
            'c': 1,
            'd': 2,
            'e': Infinity,
        })
        expect(mapToObj(res.predecessors)).toEqual({
            'a': null,
            'b': 'a',
            'c': 'a',
            'd': 'b',
            'e': null,
        })
    })
    test('graph path', () => {
        let g = new Graph()
        // expect(g.direction).toBeFalsy()
        g.putVertex('a')
        g.putVertex('b')
        g.putVertex('c')
        g.putVertex('d')
        g.putVertex('e')
        g.putEdge('a', 'b')
        g.putEdge('a', 'c')
        g.putEdge('b', 'd')
        // let q = new Queue()
        // q.enqueue('a')
        // q.enqueue('b')
        // q.enqueue('d')
        expect(g.getPath('a', 'd')).toEqual(['a','b','d'])
        // q = new Queue()
        expect(g.getPath('a', 'e')).toEqual([])
    })
})

describe('Graph path matrix&table', () => {
    test('Graph path matrix', () => {
        let g = new Graph()
        // expect(g.direction).toBeFalsy()
        g.putVertex('a')
        g.putVertex('b')
        g.putVertex('c')
        g.putVertex('d')
        g.putVertex('e')
        g.putEdge('a', 'b')
        g.putEdge('a', 'c')
        g.putEdge('b', 'd')
        let res = g.shortestPath('a')
        let d = new Map()
        d.set('a', 0)
        d.set('b', 1)
        d.set('c', 1)
        d.set('d', 2)
        d.set('e', Infinity)
        expect(res.distance).toEqual(d)
        let p = new Map()
        p.set('a', null)
        p.set('b', 'a')
        p.set('c', 'a')
        p.set('d', 'b')
        p.set('e', null)
        expect(res.predecessors).toEqual(p)
    })
    test('graph path table', () => {
        let g = new Graph()
        // expect(g.direction).toBeFalsy()
        g.putVertex('a')
        g.putVertex('b')
        g.putVertex('c')
        g.putVertex('d')
        g.putVertex('e')
        g.putEdge('a', 'b')
        g.putEdge('a', 'c')
        g.putEdge('b', 'd')
        // expect(g.getPath('a', 'd')).toEqual(['a','b','d'])
        // // q = new Queue()
        // expect(g.getPath('a', 'e')).toEqual([])
        let m = new Map()
        m.set('a', (new Set()).add('b').add('c'))
        m.set('b', (new Set()).add('d'))
        m.set('c', (new Set()))
        m.set('d', (new Set()))
        m.set('e', (new Set()))
        expect(g._adjTable).toEqual(m)
    })
})