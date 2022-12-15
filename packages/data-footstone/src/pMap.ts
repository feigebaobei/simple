import { PMap as FM } from '../typings'

class PMap<T, G> implements FM<T, G> {
  box: Map<T, G>
  constructor() {
    this.box = new Map()
  }
  set(k: T, v: G) {
    this.box.set(k, v)
  }
  delete(k: T) {
    return this.box.delete(k)
  }
  has(k: T) {
    return this.box.has(k)
  }
  get(k: T) {
    return this.box.get(k)
  }
  clear() {
    return (this.box = new Map())
  }
  size() {
    return this.box.size
  }
  keys() {
    return Array.from(this.box.keys())
  }
  values() {
    return Array.from(this.box.values())
  }
  getMap() {
    return this.box
  }
}

export { PMap }
