import {
  Vertex as V,
  Edge as E,
   Graph as G,
   Queue as Q, 
  GraphColor as GC,
   F, N, B 
} from '../typings'
import { Queue } from './queue'
import { af, NPF } from './helper'

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
      status: 'cover',
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
  reset() {
    for (let vertex of this.vertexMap.values()) {
      vertex.status = 'discovery'
    }
  }
  // 只能遍历连通的顶点
  _bfs(vertex: V<T>, cb: F) {
      let vertexQueue = new Queue<V<T>>()
      vertexQueue.enqueue(vertex)
      vertex.status = 'discovery'
      // color.set(vertex.data, 'grey')
      while (!vertexQueue.isEmpty()) {
        let uVertex = vertexQueue.dequeue()
        let arr = [...(this._adjTable.get(uVertex.data))] // T[]
        arr.map(data => this.vertexMap.get(data)) // V<T>[]
        .forEach((neiborVertex: V<T>) => {
          if (neiborVertex.status === 'cover') {
            vertexQueue.enqueue(neiborVertex)
            neiborVertex.status = 'discovery'
          }
        })
        cb(uVertex)
        uVertex.status = 'visited'
      }
  }
  bfs(data: T, cb: F) {
    let vertex = this.vertexMap.get(data)
    if (vertex) {
      do {
        if (vertex.status === 'cover') {
          this._bfs(vertex, cb)
        }
      } while (vertex = af(this.vertexMap.values()).find(vertex => vertex.status === 'cover')) // 这里可优化
      this.reset()
    }
  }
  // to do 这里要变color
  _dfs(vertex: V<T>, cb: F) {
    cb(vertex)
    vertex.status = 'visited'
    let arr = [...this._adjTable.get(vertex.data)] // T[]
    arr.map(data => this.vertexMap.get(data))
      .forEach((neiborVertex: V<T>) => {
        if (neiborVertex.status === 'cover') {
          neiborVertex.status = 'discovery'
          this._dfs(neiborVertex, cb)
        }
      })
  }
  dfs(data: T, cb: F) {
    let vertex = this.vertexMap.get(data)
    if (vertex) {
      do {
        if (vertex.status === 'cover') {
          vertex.status = 'discovery'
          this._dfs(vertex, cb)
        }
      } while (vertex = af(this.vertexMap.values()).find(vertex => vertex.status === 'cover'))
      this.reset()
    }
  }
  shortestPath(data: T) {
    let distance = new Map()
    let predecessors = new Map()
    let vertex = this.vertexMap.get(data)
    // calc
    if (vertex) {
      // init
      af(this.vertexMap.keys()).forEach(data => {
        distance.set(data, NPF) // 所有距离设置为正无穷大
        predecessors.set(data, null) // 所有前置节点设置为null
      })
      // let color = this._initColor()
      let dataQueue = new Queue<T>()
      distance.set(data, 0)
      dataQueue.enqueue(data)
      // color.set(data, 'grey')
      vertex.status = 'discovery'
      while (!dataQueue.isEmpty()) {
        let curData = dataQueue.dequeue()
        let arr = [...this._adjTable.get(curData)] // T[]
          .map(data => this.vertexMap.get(data)) // V<T>[]
        arr.forEach(vt => {
          if (vt.status === 'cover') {
            distance.set(vt.data, distance.get(curData) + 1)
            predecessors.set(vt.data, curData)
            dataQueue.enqueue(vt.data)
            // color.set(data, 'grey')
            vt.status = 'discovery'
          }
        })
        // color.set(curData, 'black')
        this.vertexMap.get(curData).status = 'visited'
      }
    }
    return {distance, predecessors}
  }
  getPath(from: T, to: T) {
    let arr: T[] = []
    let cur = to
    let {predecessors} = this.shortestPath(from)
    while (cur) {
      arr.unshift(cur)
      cur = predecessors.get(cur)
    }
    // 检查
    if (arr[0] === from && arr[arr.length - 1] === to) {
      return arr
    } else {
      return []
    }
  }
}

export { Graph }
