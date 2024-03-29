import { F, N, A, D, S } from './baseType'

// for delete 2023/02/21
// color => status
// type GraphColor = 'white' | 'grey' | 'black'
type ShortestPathObj<T> = {
  distance: Map<T, N>
  predecessors: Map<T, T>
}
interface Vertex<T> {
  data: T
  inDegree: N
  outDegree: N
  status: A // 实际只用到string.可以考虑改为string
  dTime: N
  fTime: N
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

// 它是基类
interface Graph<T> {
  vertexMap: Map<T, Vertex<T>>
  adjMatrix: Map<T, Map<T, EdgeOrNull<T>>>
  adjTable: Map<T, Set<Vertex<T>>>
  // direction: B
  // adjList: Map<Vertex<T>, T[]>
  createVertex: (v: T) => Vertex<T>
  createEdge: (a: T, b: T) => Edge<T>
  putVertex: (a: T) => void
  // putEdge: (a: T, b: T) => void
  edgeList: () => Edge<T>[]
  removeVertex: (a: T) => Vertex<T> | undefined
  // removeEdge: (a: T, b: T) => Edge<T> | undefined
  bfs: (data: T, cb: F) => void
  dfs: (data: T, cb: F) => void
  shortestPath: (data: T) => ShortestPathObj<T>
  getPath: (from: T, to: T) => T[]
  reset: (p: S) => void
}

// 有向图
interface DirectionGraph<T> extends Graph<T> {
  putEdge: (a: T, b: T) => void
  removeEdge: (a: T, b: T) => Edge<T> | undefined
}

// 无向图
interface UndirectionGraph<T> extends Graph<T> {
  putEdge: (a: T, b: T) => void
  removeEdge: (a: T, b: T) => Edge<T>[]
}

export { Vertex,
  Edge,
  EdgeOrNull,
  Graph, 
  // GraphColor,
  DirectionGraph,
  UndirectionGraph,
 }
