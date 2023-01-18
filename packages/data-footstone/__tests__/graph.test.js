import {
    Graph,
  } from '../src/graph'
import { af } from '../src/helper'

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


describe.only('Graph 无向图', () => {
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
