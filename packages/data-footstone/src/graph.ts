import {
  Vertex as V,
  Edge as E,
   Graph as G,
   Queue as Q, 
  GraphColor as GC,
   F, N, B 
} from '../typings'
import { Queue } from './queue'
import { af } from './helper'

class Graph<T> implements G<T> {
  vertexMap: G<T>['vertexMap']
  adjMatrix: G<T>['adjMatrix']
  _adjTable: G<T>['_adjTable']
  direction: G<T>['direction']
  constructor (direction: B = true) {
    this.vertexMap = new Map()
    // this.edgeMap = new Map()
    this.adjMatrix = new Map() // 保存边的信息
    this._adjTable = new Map()
    // this.direction = direction // 是否有方向
    // 不可改变
    Object.defineProperty(this, 'direction', {
      value: direction,
      writable: false
    })
  }
  createVertex(v: T) {
    return {
      data: v,
      inDegree: 0,
      outDegree: 0,
      status: '',
      dTime: new Date(),
      fTime: new Date(),
    }
  }
  createEdge(a: T, b: T) {
    return {
      data: '',
      start: this.vertexMap.get(a),
      end: this.vertexMap.get(b),
      weight: 0,
      status: ''
    }
  }
  get adjTable () {
    return af(this._adjTable.entries()).reduce((r, [k, v]) => {
      r.set(k, af(v.keys()).reduce((r, c) => {
        this.vertexMap.get(c)
        return r
      }, new Map()))
      return r
    }, new Map)
  }
  putVertex(v: T) {
    this.vertexMap.set(v, this.createVertex(v))
    for (let a of this.adjMatrix.values()) {
      a.set(v, null)
    }
    this.adjMatrix.set(v, new Map(Array.from(this.vertexMap.keys()).map((v) => [v, null])))
    this._adjTable.set(v, new Set())
  }
  putEdge(a: T, b: T) {
    if (this.direction) { // 有方向，需要添加1个边
      this.adjMatrix.get(a).set(b, this.createEdge(a, b))
      this._adjTable.get(a).add(b)
    } else { // 无方向，需要添加2个边。
      this.adjMatrix.get(a).set(b, this.createEdge(a, b)) // 添加 a->b
      this.adjMatrix.get(b).set(a, this.createEdge(b, a)) // 添加 b->a
      this._adjTable.get(a).add(b)
      this._adjTable.get(b).add(a)
    }
  }
  edgeList() {
    return Array.from(this.adjMatrix.values()).reduce((r: E<T>[], c: Map<T, E<T>>) => {
      r.push(...Array.from(c.values()))
      return r
    }, []).filter(Boolean, this)
  }
  removeVertex(a: T) {
    let res = this.vertexMap.get(a)
    if (res) {
      this.vertexMap.delete(a) // 删除点
      this.adjMatrix.delete(a)
      af(this.adjMatrix.values()).forEach(map => map.delete(a))
      this._adjTable.delete(a)
      af(this._adjTable.values()).forEach(set => set.delete(a))
    }
    return res
  }
  removeEdge(a: T, b: T) {
    let res = []
    if (this.direction) { // 有方向，应该删除1个边
      let t = this.adjMatrix.get(a)
      res.push(t.get(b))
      t.delete(b)
      this._adjTable.get(a).delete(b)
    } else { // 无方向，应该删除2个边
      let t = this.adjMatrix.get(a)
      res.push(t.get(b))
      t.delete(b)
      t = this.adjMatrix.get(b)
      res.push(t.get(a))
      t.delete(a)
      this._adjTable.get(a).delete(b)
      this._adjTable.get(b).delete(a)
    }
    return res
  }
  _initColor() {
    let color: Map<T, GC> = new Map()
    af(this.vertexMap.keys()).forEach((item: T) => {
      color.set(item, 'white')
    })
    return color
  }
  // 只能遍历连通的顶点
  bfs(data: T, cb: F) {
    let vertex: V<T> = this.vertexMap.get(data)
    if (vertex) {
      let color = this._initColor()
      let vertexQueue = new Queue<V<T>>()
      vertexQueue.enqueue(vertex)
      color.set(vertex.data, 'grey')
      while (!vertexQueue.isEmpty()) {
        let uVertex = vertexQueue.dequeue()
        let arr = [...(this._adjTable.get(uVertex.data))] // T[]
        arr.map(data => this.vertexMap.get(data)) // V<T>[]
        .forEach((neiborVertex: V<T>) => {
          if (color.get(neiborVertex.data) === 'white') {
            vertexQueue.enqueue(neiborVertex)
            color.set(neiborVertex.data, 'grey')
          }
        })
        cb(uVertex)
        color.set(uVertex.data, 'black')
      }
    }
  }
  _dfs(vertex: V<T>, cb: F, color: Map<T, GC>) {
    // color.set(vertex.data, 'grey')
    cb(vertex)
    color.set(vertex.data, 'black')
    let arr = [...this._adjTable.get(vertex.data)] // T[]
    arr.map(data => this.vertexMap.get(data))
      .forEach((neiborVertex: V<T>) => {
        if (color.get(neiborVertex.data) === 'white') {
          color.set(neiborVertex.data, 'grey')
          this._dfs(neiborVertex, cb, color)
        }
      })
  }
  dfs(data: T, cb: F) {
    let vertex = this.vertexMap.get(data)
    if (vertex) {
      let color = this._initColor()
      color.set(vertex.data, 'grey')
      this._dfs(vertex, cb, color)
    }
  }

  // shortestPath(index = 0) {
  //   let distance = new Map()
  //   let predecessors = new Map()
  //   let v = this.vertices[index]
  //   if (v) {
  //     let color = this.initColor()
  //     let queue: Q<T> = new Queue()
  //     queue.enqueue(v)
  //     color.set(v, 'grey')
  //     // init
  //     this.vertices.forEach((item) => {
  //       distance.set(item, 0)
  //       predecessors.set(item, null)
  //     })
  //     while (!queue.size()) {
  //       let u = queue.dequeue()
  //       let neibors = this.adjList.get(u)
  //       neibors.forEach((item) => {
  //         if (color.get(item) === 'white') {
  //           queue.enqueue(item)
  //           color.set(item, 'grey')
  //           distance.set(item, distance.get(u) + 1)
  //           predecessors.set(item, u)
  //         }
  //       })
  //       color.set(u, 'black')
  //     }
  //   }
  //   return {
  //     distance,
  //     predecessors,
  //   }
  // }
  // getPath(fromIndex: N, toIndex: N) {
  //   let queue: Q<T> = new Queue()
  //   let to = this.vertices[toIndex]
  //   let from = this.vertices[fromIndex]
  //   if (to && from) {
  //     let { predecessors } = this.shortestPath(fromIndex)
  //     let cur = to
  //     while (cur) {
  //       queue.enqueue(cur)
  //       cur = predecessors.get(cur)
  //     }
  //   }
  //   queue.reverse()
  //   return queue
  // }
  // neighborsMatrix() {
  // }
  // neighborsTable() {
  //   return this.adjList
  // }
}

export { Graph }
