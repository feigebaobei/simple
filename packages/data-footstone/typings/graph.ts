import { F, N } from './baseType'
import { Queue } from './queue'

type GraphColor = 'white' | 'grey' | 'black'
type ShortestPathObj<T> = {
  distance: Map<T, N>
  predecessors: Map<T, T>
}

interface Graph<T> {
  vertices: T[]
  adjList: Map<T, T[]>
  addVertex: (a: T) => void
  addEdge: (a: T, b: T) => void
  initColor: () => Map<T, GraphColor>
  bfs: (index: N, cb: F) => void
  dfs: (index: N, cb: F) => void
  shortestPath: (index: N) => ShortestPathObj<T>
  getPath: (fromIndex: N, toIndex: N) => Queue<T>
}

export { Graph, GraphColor }
