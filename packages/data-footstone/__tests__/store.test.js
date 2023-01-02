import {
    Cache,
    Lru,
    Lfu,
  } from '../src/store'
  
  describe('Cache', () => {
    it('Cache', () => {
      let cache = new Cache({
        size: 4,
      })
      expect(cache.expirationTime).toBe(50000)
      expect(cache.size).toBe(4)
      cache.put('a', 1, new Date() + 500)
      cache.put('b', 2)
      cache.put('c', 3)
      cache.put('d', 4)
      expect(cache.get('a')).toBe(1)
      expect(cache.get('b')).toBe(2)
      expect(cache.get('c')).toBe(3)
      expect(cache.get('d')).toBe(4)
    })
  })
  
  describe('Lru', () => {
    it.only('Lru', () => {
      let l = new Lru(4)
    l.put('a', 1)
    l.put('b', 2)
    l.put('c', 3)
    l.put('d', 4)
    l.put('e', 5)
    expect(l.chain.length).toBe(4)
    expect(Array.from(l.map.keys())).toEqual(['b', 'c', 'd', 'e'])
    expect(l.chain.toArray().map(e => e.value)).toEqual([2,3,4,5])
    // expect(l.get('b')).toBe(2)
    expect(l.get('c')).toBe(3)
    expect(l.get('f')).toBeUndefined()
    expect(l.chain.toArray().map(e => e.value)).toEqual([2,4,5,3])
    expect(l.remove('d'))
    expect(l.remove('f'))
    expect(l.chain.toArray().map(e => e.value)).toEqual([2,5,3])
    })
  })
  