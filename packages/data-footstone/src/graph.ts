import {
  Vertex as V,
  Edge as E,
   Graph as G,
   Queue as Q, 
  // GraphColor as GC,
  DirectionGraph as DG,
  UndirectionGraph as UG,
   F, N, B, S
} from './typings'
import { Queue } from './queue'
import { af, NPF } from './helper'

class Graph<T> implements G<T> {
  vertexMap: G<T>['vertexMap']
  adjMatrix: G<T>['adjMatrix']
  adjTable: G<T>['adjTable']
  // direction: G<T>['direction']
  constructor () {
    this.vertexMap = new Map()
    this.adjMatrix = new Map() // 保存边的信息
    this.adjTable = new Map() // 保存点的信息
    // 不可改变
    // Object.defineProperty(this, 'direction', {
    //   value: direction,
    //   writable: false
    // })
  }
  createVertex(v: T) {
    return {
      data: v,
      inDegree: 0,
      outDegree: 0,
      status: 'cover', // 使用状态机+链表处理状态。
      dTime: 0,
      fTime: 0,
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
  putVertex(v: T) {
    this.vertexMap.set(v, this.createVertex(v))
    for (let a of this.adjMatrix.values()) {
      a.set(v, null)
    }
    this.adjMatrix.set(v, new Map(Array.from(this.vertexMap.keys()).map((v) => [v, null])))
    this.adjTable.set(v, new Set())
  }
  // putEdge(a: T, b: T) {
  //   if (this.direction) { // 有方向，需要添加1个边
  //     this.adjMatrix.get(a).set(b, this.createEdge(a, b))
  //     this.adjTable.get(a).add(this.vertexMap.get(b))
  //   } else { // 无方向，需要添加2个边。
  //     this.adjMatrix.get(a).set(b, this.createEdge(a, b)) // 添加 a->b
  //     this.adjMatrix.get(b).set(a, this.createEdge(b, a)) // 添加 b->a
  //     this.adjTable.get(a).add(this.vertexMap.get(b))
  //     this.adjTable.get(b).add(this.vertexMap.get(a))
  //   }
  // }
  edgeList() {
    return Array.from(this.adjMatrix.values()).reduce((r: E<T>[], c: Map<T, E<T>>) => {
      for (let edge of c.values()) {
        edge && r.push(edge)
      }
      return r
    }, [])
  }
  removeVertex(p: T) {
    let vertex = this.vertexMap.get(p)
    if (vertex) {
      this.vertexMap.delete(vertex.data) // 删除map中的点
      this.adjMatrix.delete(vertex.data) // 删除矩阵中的点
      af(this.adjMatrix.values()).forEach(map => map.delete(vertex.data))
      this.adjTable.delete(vertex.data)
      af(this.adjTable.values()).forEach(set => set.delete(vertex))
    }
    return vertex
  }
  // removeEdge(a: T, b: T) {
  //   let res = []
  //   if (this.direction) { // 有方向，应该删除1个边
  //     let t = this.adjMatrix.get(a)
  //     res.push(t.get(b))
  //     t.delete(b)
  //     this.adjTable.get(a).delete(this.vertexMap.get(b))
  //   } else { // 无方向，应该删除2个边
  //     let t = this.adjMatrix.get(a)
  //     res.push(t.get(b))
  //     t.delete(b)
  //     t = this.adjMatrix.get(b)
  //     res.push(t.get(a))
  //     t.delete(a)
  //     this.adjTable.get(a).delete(this.vertexMap.get(b))
  //     this.adjTable.get(b).delete(this.vertexMap.get(a))
  //   }
  //   return res
  // }
  // 只重置了点
  reset(p: S = 'status,dTime,fTime') {
    let s = p.includes('status')
    let d = p.includes('dTime')
    let f = p.includes('fTime')
    for (let vertex of this.vertexMap.values()) {
      s && (vertex.status = 'discovery')
      d && (vertex.dTime = 0)
      f && (vertex.fTime = 0)
    }
    
  }
  // 只能遍历连通的顶点
  _bfs(vertex: V<T>, cb: F) {
      let vertexQueue = new Queue<V<T>>()
      vertexQueue.enqueue(vertex)
      vertex.status = 'discovery'
      while (!vertexQueue.isEmpty()) {
        let uVertex = vertexQueue.dequeue()
        let arr = this.adjTable.get(uVertex.data)
        arr.forEach((neiborVertex: V<T>) => {
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
      } while (vertex = af(this.vertexMap.values()).find(vertex => vertex.status === 'cover'))
      this.reset()
    }
  }
  _dfs(vertex: V<T>, cb: F) {
    cb(vertex)
    vertex.status = 'visited'
    // 可以使用dTime&fTime代替status处理。
    let arr = this.adjTable.get(vertex.data)
    arr.forEach((neiborVertex: V<T>) => {
        if (neiborVertex.status === 'cover') {
          neiborVertex.status = 'discovery'
          this._dfs(neiborVertex, cb)
        }
      })
  }
  // 未处理dTime/fTime
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
      let dataQueue = new Queue<T>()
      distance.set(data, 0)
      dataQueue.enqueue(data)
      vertex.status = 'discovery'
      while (!dataQueue.isEmpty()) {
        let curData = dataQueue.dequeue()
        let arr = this.adjTable.get(curData)
        arr.forEach(vt => {
          if (vt.status === 'cover') {
            distance.set(vt.data, distance.get(curData) + 1)
            predecessors.set(vt.data, curData)
            dataQueue.enqueue(vt.data)
            vt.status = 'discovery'
          }
        })
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

class DirectionGraph<T>  extends Graph<T> implements DG<T>{
  constructor() {
    super()
    // this.direction = true
  }
  putEdge(a: T, b: T) {
    this.adjMatrix.get(a).set(b, this.createEdge(a, b))
    this.adjTable.get(a).add(this.vertexMap.get(b))
  }
  removeEdge(a: T, b: T) {
    let temp = this.adjMatrix.get(a)
    let edge = temp.get(b)
    temp.delete(b)
    this.adjTable.get(a).delete(this.vertexMap.get(b))
    return edge
  }
}
class UndirectionGraph<T>  extends Graph<T> implements UG<T> {
  constructor() {
    super()
  }
  putEdge(a: T, b: T) {
    this.adjMatrix.get(a).set(b, this.createEdge(a, b))
    this.adjMatrix.get(b).set(a, this.createEdge(b, a))
    this.adjTable.get(a).add(this.vertexMap.get(b))
    this.adjTable.get(b).add(this.vertexMap.get(a))
  }
  removeEdge(a: T, b: T) {
    let edge = []
    let temp = this.adjMatrix.get(a)
    edge.push(temp.get(b))
    temp.delete(b)
    temp = this.adjMatrix.get(b)
    edge.push(temp.get(a))
    temp.delete(a)
    this.adjTable.get(a).delete(this.vertexMap.get(b))
    this.adjTable.get(b).delete(this.vertexMap.get(a))
    return edge
  }
}

export {
  // Graph
  DirectionGraph,
  UndirectionGraph,
}
