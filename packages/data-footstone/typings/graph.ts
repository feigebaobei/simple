import { F, N, A, D, B } from './baseType'
import { Queue } from './queue'

type GraphColor = 'white' | 'grey' | 'black'
type ShortestPathObj<T> = {
  distance: Map<T, N>
  predecessors: Map<T, T>
}
interface Vertex<T> {
  data: T
  inDegree: N
  outDegree: N
  status: A
  dTime: D // 考虑使用ms
  fTime: D
  // parent: VertexOrNull<T>
}
type VertexOrNull<T> = Vertex<T> | null
interface Edge<T> {
  data: A // 可能这里需要修改
  start: Vertex<T>
  end: Vertex<T>
  weight: N
  status: A
}
type EdgeOrNull<T> = Edge<T> | null
interface Graph<T> {
  vertexMap: Map<T, Vertex<T>>
  // edgeMap: Map<T, Edge<T>>
  adjMatrix: Map<T, Map<T, EdgeOrNull<T>>>
  _adjTable: Map<T, Set<T>>
  direction: B
  // adjList: Map<Vertex<T>, T[]>
  createVertex: (v: T) => Vertex<T>
  createEdge: (a: T, b: T) => Edge<T>
  // adjMatrix: T[][]
  putVertex: (a: T) => void
  putEdge: (a: T, b: T) => void
  edgeList: () => Edge<T>[]
  // removeVertex: (a: T) => Vertex<T> | undefined
  // removeEdga: (a: T, b: T) => Edge<T> | undefined
  _initColor: () => Map<T, GraphColor>
  bfs: (data: T, cb: F) => void
  dfs: (data: T, cb: F) => void
  shortestPath: (data: T) => ShortestPathObj<T>
  getPath: (from: T, to: T) => T[]
}

export { Vertex,
  Edge,
  EdgeOrNull,
  Graph, GraphColor }
