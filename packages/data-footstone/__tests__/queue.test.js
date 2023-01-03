import { Queue, PriorityQueue } from '../src/queue'

describe('Queue', () => {
  it('Queue', () => {
    let queue = new Queue(1, 2, 3, 4)
    expect(queue.dequeue()).toBe(1)
    expect(queue.dequeue()).toBe(2)
    expect(queue.toArray()).toEqual([3, 4])
    expect(queue.getHead()).toBe(3)
    expect(queue.getTail()).toBe(4)
    expect(queue.size()).toBe(2)
    expect(queue.isEmpty()).toBeFalsy()
    queue.clear()
    expect(queue.toArray()).toEqual([])
    expect(queue.isEmpty()).toBeTruthy()
  })
})

describe('PriorityQueue', () => {
  it('PriorityQueue', () => {
    let queue = new PriorityQueue(3)
    expect(queue.highestPriority()).toBeUndefined()
    expect(queue.lowestPriority()).toBeUndefined()
    expect(queue.enqueue(1)).toBe(1)
    expect(queue.enqueue(2)).toBe(2)
    expect(queue.toArray()).toEqual([1, 2])
    expect(queue.enqueue(3, 4)).toBe(3)
    expect(queue.toArray()).toEqual([3, 1, 2])
    expect(queue.enqueue(4, 3, false)).toBe(4)
    expect(queue.toArray()).toEqual([3, 4, 1, 2])
    expect(queue.items.map((item) => item.position)).toEqual([0, 1, 2, 3])
    expect(queue.items.map((item) => item.priority)).toEqual([4, 3, 3, 3])
    expect(queue.updatePriorityAt(1, -2)).toBeTruthy()
    expect(queue.toArray()).toEqual([3, 1, 2, 4])
    expect(queue.items.map((item) => item.priority)).toEqual([4, 3, 3, 1])
    expect(queue.items.map((item) => item.position)).toEqual([0, 1, 2, 3])
    expect(queue.dequeue()).toBe(3)
    expect(queue.dequeue()).toBe(1)
    expect(queue.getHead()).toBe(2)
    expect(queue.getTail()).toBe(4)
    expect(queue.size()).toBe(2)
    expect(queue.isEmpty()).toBeFalsy()
    expect(queue.enqueue(4, 4)).toBe(3)
    queue.clear()
    expect(queue.size()).toBe(0)
    expect(queue.isEmpty()).toBeTruthy()
    expect(queue.toArray()).toEqual([])
  })
})
