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




  // vertices: G<T>['vertices']
  // adjList: G<T>['adjList']
  // // adjMatrix: G<T>['adjMatrix']
  // // static vertices: any
  // constructor() {
  //   this.vertices = []
  //   this.adjList = new Map()
  //   // this.adjMatrix = []
  // }
  // putVertex(v: T) {
  //   this.vertices.push(v)
  //   this.adjList.set(v, [])
  // }
  // putEdge(v: T, w: T) {
  //   this.adjList.get(v).push(w)
  //   this.adjList.get(w).push(v)
  // }
  // initColor() {
  //   let color: Map<T, GC> = new Map()
  //   this.vertices.forEach((item) => {
  //     color.set(item, 'white')
  //   })
  //   return color
  // }
  // bfs(index = 0, cb: F) {
  //   let v = this.vertices[index]
  //   if (v !== undefined) {
  //     let color = this.initColor()
  //     let queue: Q<T> = new Queue()
  //     queue.enqueue(v)
  //     color.set(v, 'grey')
  //     while (queue.size()) {
  //       let u = queue.dequeue()
  //       let neibors = this.adjList.get(u)
  //       neibors.forEach((item) => {
  //         if (color.get(item) === 'white') {
  //           queue.enqueue(item)
  //           color.set(item, 'grey')
  //         }
  //       })
  //       cb && cb(u)
  //       color.set(u, 'black')
  //     }
  //   }
  // }
  // _dfs(v: T, color: Map<T, GC>, cb: F) {
  //   cb && cb(v)
  //   color.set(v, 'grey')
  //   let neibors = this.adjList.get(v)
  //   for (let i = 0; i < neibors.length; i++) {
  //     let w = neibors[i]
  //     if (color.get(w) === 'white') {
  //       this._dfs(w, color, cb)
  //     }
  //   }
  //   color.set(v, 'black')
  // }
  // dfs(index = 0, cb: F) {
  //   let v = this.vertices[index]
  //   if (v !== undefined) {
  //     let color = this.initColor()
  //     this._dfs(v, color, cb)
  //   }
  // }
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
