import {
    // S,
    N,
    B,
    //  A, F
  } from './baseType'
  
// interface BaseQueue<T> {
//   items: T[]
//   // enqueue: (...p: T[]) => void
//   dequeue: () => T
//   toArray: () => T[]
//   getHead: () => T
//   getTail: () => T
//   size: () => N
//   isEmpty: () => B
//   clear: () => void
//   reverse: () => void
// }
// interface Queue<T> extends BaseQueue<T> {
    interface Queue<T> {
        items: T[]
        enqueue: (...p: T[]) => void
        dequeue: () => T
        toArray: () => T[]
        getHead: () => T
        getTail: () => T
        size: () => N
        isEmpty: () => B
        clear: () => void
        reverse: () => void
      }
      // interface PriorityQueue<T extends {priority: N}> extends BaseQueue<T> {
      //   highestPriority: () => N | undefined
      //   enqueue: (element: T, priority: N) => void
      // }
      interface PriorityQueueElement<T> {
        value: T
        priority: N
      }
      
      interface PriorityQueue<T> {
        items: PriorityQueueElement<T>[]
        defaultPriority: N
        enqueue: (element: T, priority: N) => void
        dequeue: () => T
        highestPriority: () => N | undefined
        toArray: () => T[]
        getHead: () => T
        getTail: () => T
        size: () => N
        isEmpty: () => B
        clear: () => void
        // reverse: () => void
      }
      
export {
    Queue,
PriorityQueueElement,
PriorityQueue,
}