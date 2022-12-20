import {Queue, PriorityQueue} from '../src/queue'

describe('queue', () => {
    it('queue', () => {
        let q = new Queue()
        q.enqueue(1)
        expect(q.toArray()).toContain(1)
        q.dequeue(1)
        expect(q.toArray().length).toBe(0)
        expect(q.getHead()).toBeUndefined()
        expect(q.getTail()).toBeUndefined()
        q.enqueue(2)
        expect(q.size()).toBe(1)
        expect(q.isEmpty()).toBeFalsy()
        q.clear()
        expect(q.size()).toBe(0)
        q.enqueue(1)
        q.enqueue(2)
        expect(q.reverse()).toEqual([2, 1])
    })
})

describe('PriorityQueue', () => {
    it('PriorityQueue', () => {
        let q = new PriorityQueue(3)
        expect(q.highestPriority()).toBeUndefined()
        expect(q.lowestPriority()).toBeUndefined()
        q.enqueue('a')
        q.enqueue('b', 8)
        q.enqueue('c')
        expect(q.highestPriority()).toBe(8)
        expect(q.lowestPriority()).toBe(3)
        expect(q.toArray()).toEqual(['b', 'a', 'c'])
        expect(q.getHead()).toBe('b')
        expect(q.getTail()).toBe('c')
        expect(q.size()).toBe(3)
        expect(q.isEmpty()).toBeFalsy()
        q.clear()
        expect(q.isEmpty()).toBeTruthy()
    })
})


