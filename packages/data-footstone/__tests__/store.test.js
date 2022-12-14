import {
  // Cache,
  Fifo,
  Lru,
  Lfu,
} from '../src/store'

// describe('Cache', () => {
//   it('Cache', () => {
//     let cache = new Cache({
//       size: 4,
//     })
//     expect(cache.expirationTime).toBe(50000)
//     expect(cache.size).toBe(4)
//     cache.put('a', 1, new Date() + 500)
//     cache.put('b', 2)
//     cache.put('c', 3)
//     cache.put('d', 4)
//     expect(cache.get('a')).toBe(1)
//     expect(cache.get('b')).toBe(2)
//     expect(cache.get('c')).toBe(3)
//     expect(cache.get('d')).toBe(4)
//   })
// })

describe('Fifo', () => {
  it('Fifo', () => {
    let f = new Fifo(4)
    expect(f.put('a', 1)).toBe(1)
    expect(f.put('b', 2)).toBe(2)
    expect(f.put('c', 3)).toBe(3)
    expect(f.put('d', 4)).toBe(4)
    expect(f.put('e', 5)).toBe(4)
    expect(f.put('f', 6)).toBe(4)
    expect(f.keys()).toEqual(['c', 'd', 'e', 'f'])
    expect(f.values()).toEqual([3, 4, 5, 6])
    expect(f.size()).toBe(4)
    expect(f.get('a')).toBeUndefined()
    expect(f.get('d')).toBe(4)
  })
})

describe('Lru', () => {
  it('Lru', () => {
    let l = new Lru(4)
    l.put('a', 1)
    l.put('b', 2)
    l.put('c', 3)
    l.put('d', 4)
    l.put('e', 5)
    l.put('e', 6)
    expect(l.chain.length).toBe(4)
    expect(Array.from(l.map.keys())).toEqual(['b', 'c', 'd', 'e'])
    expect(l.chain.toArray().map((e) => e.value)).toEqual([2, 3, 4, 6])
    expect(l.get('c')).toBe(3)
    expect(l.get('f')).toBeUndefined()
    expect(l.chain.toArray().map((e) => e.value)).toEqual([2, 4, 6, 3])
    expect(l.remove('d'))
    expect(l.remove('f'))
    expect(l.chain.toArray().map((e) => e.value)).toEqual([2, 6, 3])
  })
})
describe('Lfu', () => {
  it('Lfu', () => {
    let l = new Lfu(4)
    l.put('a', 1)
    l.put('b', 2)
    l.put('c', 3)
    l.put('d', 4)
    l.put('e', 5)
    l.put('f', 6)
    l.put('f', 7)
    expect(l.size()).toBe(4)
    expect(l.keys()).toEqual(['f', 'e', 'd', 'c'])
    expect(l.values()).toEqual([7, 5, 4, 3])
    expect(l.get('c')).toBe(3)
    expect(l.chain.toArray()).toEqual([
      { key: 'c', value: 3, count: 2 },
      { key: 'f', value: 7, count: 2 },
      { key: 'e', value: 5, count: 1 },
      { key: 'd', value: 4, count: 1 },
    ])
    expect(l.get('b')).toBeUndefined()
    expect(l.get('e')).toBe(5)
    expect(l.chain.toArray()).toEqual([
      { key: 'e', value: 5, count: 2 },
      { key: 'c', value: 3, count: 2 },
      { key: 'f', value: 7, count: 2 },
      { key: 'd', value: 4, count: 1 },
    ])
    expect(l.get('f')).toBe(7)
    expect(l.chain.toArray()).toEqual([
      { key: 'f', value: 7, count: 3 },
      { key: 'e', value: 5, count: 2 },
      { key: 'c', value: 3, count: 2 },
      { key: 'd', value: 4, count: 1 },
    ])
    expect(l.get('f')).toBe(7)
    expect(l.get('f')).toBe(7)
    expect(l.get('f')).toBe(7)
    expect(l.chain.toArray()).toEqual([
      { key: 'f', value: 7, count: 6 },
      { key: 'e', value: 5, count: 2 },
      { key: 'c', value: 3, count: 2 },
      { key: 'd', value: 4, count: 1 },
    ])
    expect(l.get('c')).toBe(3)
    expect(l.chain.toArray()).toEqual([
      { key: 'f', value: 7, count: 6 },
      { key: 'c', value: 3, count: 3 },
      { key: 'e', value: 5, count: 2 },
      { key: 'd', value: 4, count: 1 },
    ])
  })
})
