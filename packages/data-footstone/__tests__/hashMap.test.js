import { HashMap, djb2HashFn, loseloseHashFn } from '../src/hashMap'

describe('HashMap', () => {
  it('HashMap', () => {
    let hm = new HashMap()
    expect(hm.kind).toBe('separate')
    expect(hm.hash).toBe('djb2')
    hm.put('a', 1)
    expect(hm.get('a')).toBe(1)
    hm.put('b', 2)
    expect(hm.get('b')).toBe(2)
    expect(hm.remove('a')).toBe(1)
    expect(hm.get('a')).toBeUndefined()
    expect(hm.createNode('a', 1)).toEqual({ key: 'a', value: 1 })
    expect(hm.size()).toBe(1)
    expect(hm.get('c')).toBeUndefined()
    expect(hm.remove('c')).toBeUndefined()
  })
  test('HashMap put', () => {
    // 测试插入相同的key.
    let hm = new HashMap()
    expect(hm.put('a', 'str')).toBe(1)
    expect(hm.get('a')).toBe('str')
    expect(hm.put('a', 'string')).toBe(1)
    expect(hm.get('a')).toBe('string')
    hm = new HashMap('line')
    expect(hm.put('a', 'str')).toBe(1)
    expect(hm.get('a')).toBe('str')
    expect(hm.put('a', 'string')).toBe(1)
    expect(hm.get('a')).toBe('string')
  })
  test('HashMap separate conflict', () => {
    let hm = new HashMap('separate', 'loselose')
    expect(hm.hashFn('Ana')).toBe(13)
    expect(hm.hashFn('Donnie')).toBe(13)
    hm.put('Ana', 1)
    hm.put('Donnie', 2)
    expect(hm.get('Ana')).toBe(1)
    expect(hm.get('Donnie')).toBe(2)
    expect(hm.size()).toBe(2)
    expect(hm.remove('Ana')).toBe(1)
    expect(hm.size()).toBe(1)
    // hashFn
  })
  test('HashMap line conflict', () => {
    let hm = new HashMap('line', 'loselose')
    expect(hm.hashFn('Ana')).toBe(13)
    expect(hm.hashFn('Donnie')).toBe(13)
    hm.put('Ana', 1)
    hm.put('Donnie', 2)
    expect(hm.get('Ana')).toBe(1)
    expect(hm.get('Donnie')).toBe(2)
    expect(hm.size()).toBe(2)
    expect(hm.remove('Donnie')).toBe(2)
    expect(hm.size()).toBe(1)
    // hashFn
  })
})

describe('djb2HashFn', () => {
  test('djb2HashFn', () => {
    expect(djb2HashFn('a')).toMatchSnapshot()
    expect(djb2HashFn('b')).toMatchSnapshot()
  })
  test('djb2HashFn conflict', () => {
    // 记录几个有冲突的值，在测试时使用。
    expect(djb2HashFn('Donnie')).toMatchSnapshot() // 278
    expect(djb2HashFn('Ana')).toMatchSnapshot() // 925
    expect(djb2HashFn('Tyrion')).toMatchSnapshot() // 624
    expect(djb2HashFn('Aaron')).toMatchSnapshot() // 215
  })
})
describe('loseloseHashFn', () => {
  test('loseloseHashFn', () => {
    expect(loseloseHashFn('a')).toMatchSnapshot()
    expect(loseloseHashFn('b')).toMatchSnapshot()
  })
  test('loseloseHashFn conflict', () => {
    // 记录几个有冲突的值，在测试时使用。
    expect(loseloseHashFn('Donnie')).toMatchSnapshot() // 13
    expect(loseloseHashFn('Ana')).toMatchSnapshot() // 13
    expect(loseloseHashFn('Tyrion')).toMatchSnapshot() // 16
    expect(loseloseHashFn('Aaron')).toMatchSnapshot() // 16
  })
})
