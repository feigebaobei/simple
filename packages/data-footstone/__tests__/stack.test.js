import { Stack } from '../src/stack'

describe('stack', () => {
  it('stack', () => {
    let s = new Stack()
    s.push(1, 2, 3, 4)
    expect(s.toArray()).toEqual([1, 2, 3, 4])
    expect(s.pop()).toBe(4)
    expect(s.pop()).toBe(3)
    expect(s.peek()).toBe(2)
    expect(s.isEmpty()).toBeFalsy()
    s.clear()
    expect(s.size()).toBe(0)
  })
})
