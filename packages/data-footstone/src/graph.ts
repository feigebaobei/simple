import {
    Graph as G,
    Queue as Q,
    GraphColor as GC,
    F,
    N,
  } from '../typings'
import { Queue } from './queue'
  
  class Graph<T> implements G<T> {
    vertices: G<T>['vertices']
    adjList: G<T>['adjList']
    // static vertices: any
    constructor () {
        this.vertices = []
        this.adjList = new Map()
    }
    addVertex(v: T) {
      this.vertices.push(v)
      this.adjList.set(v, [])
    }
    addEdge(v: T, w: T) {
      this.adjList.get(v).push(w)
      this.adjList.get(w).push(v)
    }
    initColor () {
      let color: Map<T, GC>  = new Map()
      this.vertices.forEach((item) => {
        color.set(item, 'white')
      })
      return color
    }
    bfs(index = 0, cb: F) {
      let v = this.vertices[index]
      if (v !== undefined) {
        let color = this.initColor()
        let queue: Q<T> = new Queue()
        queue.enqueue(v)
        color.set(v, 'grey')
        while (queue.size()) {
          let u = queue.dequeue()
          let neibors = this.adjList.get(u)
          neibors.forEach(item => {
            if (color.get(item) === 'white') {
              queue.enqueue(item)
              color.set(item, 'grey')
            }
          })
          cb && cb(u)
          color.set(u, 'black')
        }
      }
    }
    _dfs(v: T, color: Map<T, GC>, cb: F) {
      cb && cb(v)
      color.set(v, 'grey')
      let neibors = this.adjList.get(v)
      for (let i = 0; i < neibors.length; i++) {
        let w = neibors[i]
        if (color.get(w) === 'white') {
          this._dfs(w, color, cb)
        }
      }
      color.set(v, 'black')
    }
    dfs(index = 0, cb: F) {
      let v = this.vertices[index]
      if (v !== undefined) {
        let color = this.initColor()
        this._dfs(v, color, cb)
      }
    }
    shortestPath(index = 0) {
      let distance = new Map()
      let predecessors = new Map()
      let v = this.vertices[index]
      if (v) {
        let color = this.initColor()
        let queue: Q<T> = new Queue()
        queue.enqueue(v)
        color.set(v, 'grey')
        // init
        this.vertices.forEach(item => {
          distance.set(item, 0)
          predecessors.set(item, null)
        })
        while (!queue.size()) {
          let u = queue.dequeue()
          let neibors = this.adjList.get(u)
          neibors.forEach(item => {
            if (color.get(item) === 'white') {
              queue.enqueue(item)
              color.set(item, 'grey')
              distance.set(item, distance.get(u) + 1)
              predecessors.set(item, u)
            }
          })
          color.set(u, 'black')
        }
      }
      return {
        distance,
        predecessors
      }
    }
    getPath(fromIndex: N, toIndex: N) {
      let queue: Q<T> = new Queue()
      let to = this.vertices[toIndex]
      let from = this.vertices[fromIndex]
      if (to && from) {
        let {predecessors} = this.shortestPath(fromIndex)
        let cur = to
        while (cur) {
          queue.enqueue(cur)
          cur = predecessors.get(cur)
        }
      }
      queue.reverse()
      return queue
    }
    // neighborsMatrix() {
    // }
    // neighborsTable() {
    //   return this.adjList
    // }
  }
  
  export { Graph }
  