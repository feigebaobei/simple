import {
  SingleChain,
  DoublyChain,
  SingleCircleChain,
  DoublyCircleChain,
} from '../src/chain'

describe('SingleChain', () => {
  it('SingleChain', () => {
    let chain = new SingleChain(1, 2, 3, 4)
    expect(chain.toArray()).toEqual([1, 2, 3, 4])
    chain.insert(5, 2)
    // 1,2,5,3,4
    expect(chain.head.next.next.next.next.value).toBe(4)
    expect(chain.head.next.next.next.next.position).toBe(4)
    expect(chain.toArray()).toEqual([1, 2, 5, 3, 4])
    expect(chain.removeAt(1)).toBe(2)
    expect(chain.removeAt(3)).toBe(4)
    expect(chain.toArray()).toEqual([1, 5, 3])
    expect(chain.reverse().toArray()).toEqual([3, 5, 1])
    expect(chain.toArray()).toEqual([1, 5, 3])
    expect(chain.reverseSelf().toArray()).toEqual([3, 5, 1])
    chain.clear()
    expect(chain.toArray()).toEqual([])
  })
})

describe('DoublyChain', () => {
  it('DoublyChain', () => {
    let chain = new DoublyChain(1, 2, 3, 4)
    expect(chain.toArray()).toEqual([1, 2, 3, 4])
    chain.append(5)
    expect(chain.toArray()).toEqual([1, 2, 3, 4, 5])
    chain.append(6)
    expect(chain.toArray()).toEqual([1, 2, 3, 4, 5, 6])
    chain.insert(7, 1)
    expect(chain.toArray()).toEqual([1, 7, 2, 3, 4, 5, 6])
    chain.insert(9, 4)
    expect(chain.toArray()).toEqual([1, 7, 2, 3, 9, 4, 5, 6])
    expect(chain.removeAt(3)).toBe(3)
    expect(chain.removeAt(1)).toBe(7)
    expect(chain.removeAt(4)).toBe(5)
    //   [1,2,9,4,6]
    expect(chain.head.next.next.next.next.value).toBe(6)
    expect(chain.head.next.next.next.next.position).toBe(4)
    chain.clear()
    expect(chain.toArray()).toEqual([])
  })
})

describe('SingleCircleChain', () => {
  it('SingleCircleChain', () => {
    let chain = new SingleCircleChain(1, 2, 3, 4)
    expect(chain.head.next.next.next.value).toBe(4)
    expect(chain.head.next.next.next.position).toBe(3)
    expect(chain.toArray()).toEqual([1, 2, 3, 4])
    chain.insert(5, 2)
    chain.insert(6, 2)
    expect(chain.toArray()).toEqual([1, 2, 6, 5, 3, 4])
    expect(chain.head.next.next.next.next.next.value).toBe(4)
    expect(chain.head.next.next.next.next.next.position).toBe(5)
    chain.removeAt(1)
    //   [1,5,3,4]
    expect(chain.toArray()).toEqual([1, 6, 5, 3, 4])
    expect(chain.head.next.next.next.value).toBe(3)
    expect(chain.head.next.next.next.position).toBe(3)
  })
})

describe('DoublyCircleChain', () => {
  it('DoublyCircleChain', () => {
    let chain = new DoublyCircleChain(1, 2, 3, 4)
    expect(chain.toArray()).toEqual([1, 2, 3, 4])
    expect(chain.head.next.next.next.value).toBe(4)
    expect(chain.head.next.next.next.position).toBe(3)
    chain.insert(5, 2)
    chain.insert(6, 2)
    expect(chain.toArray()).toEqual([1, 2, 6, 5, 3, 4])
    expect(chain.head.next.next.next.next.next.value).toBe(4)
    expect(chain.head.next.next.next.next.next.position).toBe(5)
    chain.removeAt(1)
    chain.removeAt(3)
    //   [1,6,5,4]
    expect(chain.toArray()).toEqual([1, 6, 5, 4])
    expect(chain.head.next.next.next.value).toBe(4)
    expect(chain.head.next.next.next.position).toBe(3)
  })
})
