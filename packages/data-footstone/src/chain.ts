import {
  BaseChainElement as BCE,
  BaseChain as BC,
  SingleChain as SC,
  SingleChainElement as SCE,
  DoublyChain as DC,
  DoublyChainElement as DCE,
  SingleCircleChain as SCC,
  SingleCircleChainElement as SCCE,
  DoublyCircleChainElement as DCCE,
  DoublyCircleChain as DCC,
  N,
  B,
} from '../typings'

class BaseChain<T> implements BC<T> {
  head: BCE<T>
  length: N
  constructor() {
    this.head = null
    this.length = 0
  }
  toArray() {
    let cur = this.head
    let arr = []
    while (cur) {
      arr.push(cur.value)
      cur = cur.next
    }
    return arr
  }
  // 默认至少有一个节点
  isValidRange(p: N) {
    return 0 <= p && p < this.length
  }
  // 返回匹配元素的下标
  indexOf(v: T, all = false) {
    if (this.length) {
      let index = 0
      let cur = this.head
      let res: N[] | N // = []
      if (all) {
        res = []
        while (cur) {
          if (cur.value === v) {
            res.push(index)
          }
          cur = cur.next
          index++
        }
      } else {
        res = -1
        while (cur) {
          if (cur.value === v) {
            res = index
            break
          }
          cur = cur.next
          index++
        }
      }
      return res
    } else {
      return -1
    }
  }
  getEleByIndex(i: N) {
    if (this.isValidRange(i)) {
      let index = 0
      let cur = this.head
      let res: T | undefined
      while (cur) {
        if (index === i) {
          res = cur.value
        }
        cur = cur.next
        index++
      }
      return res
    } else {
      return undefined
    }
  }
}

class SingleChain<T> extends BaseChain<T> implements SC<T> {
  head: SCE<T>
  length: N
  constructor(...p: T[]) {
    super()
    if (p.length) {
      this.head = p.reduceRight((r: SCE<T>, c: T, index: N) => {
        return {
          value: c,
          next: r,
          position: index,
        }
      }, null)
      this.length = p.length
    }
  }
  createNode(v: T, p: N) {
    return {
      value: v,
      next: null,
      position: p,
    }
  }
  // 对外不暴露数据结构。所心不提供appendNode方法。
  append(p: T) {
    let node = this.createNode(p, this.length)
    if (!this.head) {
      this.head = node
    } else {
      let cur = this.head
      while (cur.next) {
        cur = cur.next
      }
      cur.next = node
    }
    this.length++
    return this.length
  }
  // 不允许插入到最后一个
  insert(v: T, p: N) {
    if (this.isValidRange(p)) {
      let res: B
      let node = this.createNode(v, p)
      if (p === 0) {
        node.next = this.head
        this.head = node
      } else {
        let index = 0
        let cur = this.head
        let pre = null
        while (index < p) {
          pre = cur
          cur = cur.next
          index++
        }
        pre.next = node
        node.next = cur
      }
      this.setPosition(p)
      this.length++
      return res
    } else {
      return false
    }
  }
  // 返回被删除的元素或undefined
  removeAt(p: N) {
    if (this.isValidRange(p)) {
      let res: T
      if (p === 0) {
        res = this.head.value
        this.head = this.head.next
      } else {
        let index = 0
        let cur = this.head
        let pre = null
        while (index < p) {
          pre = cur
          cur = cur.next
          index++
        }
        pre.next = cur.next
        res = cur.value
      }
      this.setPosition(p)
      this.length--
      return res
    } else {
      return undefined
    }
  }
  // 删除此方法
  // removeElement(v: T, all = false) {
  //   let res: B = false
  //   if (this.length) {
  //     if (this.head.value === v) {
  //       this.head = this.head.next
  //       this.length--
  //       res = true
  //     } else {
  //       let cur = this.head.next
  //       let pre = this.head
  //       while (cur) {
  //         if (cur.value === v) {
  //           pre.next = cur.next
  //           this.length--
  //           res = true
  //           if (!all) {
  //             break
  //           }
  //         }
  //         pre = cur
  //         cur = cur.next
  //       }
  //     }
  //     let cur = this.head
  //     let index = 0
  //     while (cur) {
  //       cur.position = index
  //       index++
  //       cur = cur.next
  //     }
  //   } else {
  //     res = false
  //   }
  //   return res
  // }
  // includes() {}
  reverseSelf() {
    let fn = (p: SCE<T> | null, q = null) => {
      if (p) {
        return fn(p.next, { value: p.value, next: q })
      } else {
        return q
      }
    }
    this.head = fn(this.head)
    this.setPosition()
    return this
  }
  reverse() {
    return this.toArray().reduceRight((r, c) => {
      r.append(c)
      return r
    }, new SingleChain())
  }
  clear() {
    this.head = null
    this.length = 0
  }
  setPosition(from: N = 0) {
    let cur = this.head
    let index = 0
    while (cur) {
      if (index >= from) {
        cur.position = index
      }
      index++
      cur = cur.next
    }
  }
}

class DoublyChain<T> extends BaseChain<T> implements DC<T> {
  head: DCE<T> | null
  tail: DCE<T> | null
  length: N
  constructor(...p: T[]) {
    super()
    this.tail = null
    p.forEach(this.append, this)
  }
  createNode(v: T, p: N) {
    return {
      value: v,
      position: p,
      prev: null,
      next: null,
    }
  }
  append(v: T) {
    let node = this.createNode(v, this.length)
    if (this.length) {
      node.prev = this.tail
      this.tail.next = node
      this.tail = node
    } else {
      this.head = node
      this.tail = node
    }
    this.length++
    return this.length
  }
  insert(v: T, p: N) {
    let res = false
    if (this.isValidRange(p)) {
      let node = this.createNode(v, p)
      if (p === 0) {
        node.next = this.head
        this.head.prev = node
        this.head = node
      } else {
        let cur = this.head
        let index = 0
        while (index < p) {
          cur = cur.next
          index++
        }
        cur.prev.next = node
        node.prev = cur.prev
        node.next = cur
        cur.prev = node
      }
      this.setPosition(p)
      this.length++
      res = true
    } else {
      res = false
    }
    return res
  }
  // 返回被删除的元素
  removeAt(p: N) {
    if (this.isValidRange(p)) {
      let res: T
      if (p === 0) {
        res = this.head.value
        if (this.length === 1) {
          this.head = null
          this.tail = null
        } else {
          this.head = this.head.next
          this.head.prev = null
        }
      } else if (p === this.length - 1) {
        res = this.tail.value
        this.tail = this.tail.prev
        this.tail.next = null
      } else {
        let cur = this.head
        let index = 0
        while (index < p) {
          cur = cur.next
          index++
        }
        res = cur.value
        cur.prev.next = cur.next
        cur.next.prev = cur.prev
      }
      this.setPosition(p)
      this.length--
      return res
    } else {
      return undefined
    }
  }
  // removeElement(v: T, all = false) {
  //   let res: B = false
  //   let cur = this.head
  //   let index = 0
  //   while (index < this.length) {
  //     if (cur.value === v) {
  //       if (index === 0) {
  //         // op this.head
  //         this.head = this.head.next
  //         this.head.prev = null
  //       } else if (index === this.length) {
  //         // op this.tail
  //         this.tail = this.tail.prev
  //         this.tail.next = null
  //       } else {
  //         // op middle
  //         cur.prev.next = cur.next
  //         cur.next.prev = cur.prev
  //       }
  //       res = true
  //       this.length--
  //       if (!all) {
  //         break
  //       }
  //     } else {
  //       index++
  //     }
  //     cur = cur.next
  //   }
  //   return res
  // }
  clear() {
    this.head = null
    this.tail = null
    this.length = 0
  }
  setPosition(from: N = 0) {
    let cur = this.head
    let index = 0
    while (cur) {
      if (index >= from) {
        cur.position = index
      }
      index++
      cur = cur.next
    }
  }
}

class SingleCircleChain<T> extends SingleChain<T> implements SCC<T> {
  head: SCCE<T> | null
  length: N
  tail: SCCE<T> | null
  constructor(...p: T[]) {
    super()
    this.head = null
    this.tail = null
    this.length = 0
    p.forEach(this.append, this)
  }
  toArray() {
    let res = []
    let index = 0
    let cur = this.head
    while (index < this.length) {
      res.push(cur.value)
      cur = cur.next
      index++
    }
    return res
  }
  createNode(v: T, p: N): SCCE<T> {
    return {
      value: v,
      position: p,
      next: null,
    }
  }
  append(v: T) {
    let node = this.createNode(v, this.length)
    if (this.length) {
      this.tail.next = node
      node.next = this.head
      this.tail = node
    } else {
      this.head = node
      this.tail = node
      node.next = node
    }
    this.length++
    return this.length
  }
  // 允许的范围  [0, length)
  insert(v: T, p: N) {
    if (this.isValidRange(p)) {
      let node = this.createNode(v, p)
      if (p === 0) {
        this.tail.next = node
        node.next = this.head
        this.head = node
      } else {
        let index = 0
        let cur = this.head
        let pre = null
        while (index < p) {
          pre = cur
          cur = cur.next
          index++
        }
        pre.next = node
        node.next = cur
      }
      this.length++
      this.setPosition(p)
      return true
    } else {
      return false
    }
  }
  // 删除指定位置的节点，返回被删除的元素或undefined
  removeAt(p: N) {
    if (this.isValidRange(p)) {
      let res: T
      if (p === 0) {
        res = this.head.value
        this.head = this.head.next
        this.tail.next = this.head
      } else {
        let index = 0
        let cur = this.head
        let pre = null
        while (index < p) {
          pre = cur
          cur = cur.next
          index++
        }
        pre.next = cur.next
      }
      this.length--
      this.setPosition(p)
      return res
    } else {
      return undefined
    }
  }
  setPosition(from: N = 0) {
    let index = 0
    let cur = this.head
    while (index < this.length) {
      if (index >= from) {
        cur.position = index
      }
      index++
      cur = cur.next
    }
  }
  // 返回 boolean 表示是否删除
  // removeElement(v: T, all = false) {
  //   let res: B = false
  //   if (this.length) {
  //     if ((this.head.value = v)) {
  //       this.head.next.prev = this.head.prev
  //       this.head.prev.next = this.head.next
  //       this.length--
  //       res = true
  //     } else {
  //       let cur = this.head.next
  //       while (cur) {
  //         if (cur.value === v) {
  //           cur.prev.next = cur.next
  //           cur.next.prev = cur.prev
  //           this.length--
  //           res = true
  //           if (!all) {
  //             break
  //           }
  //         }
  //         cur = cur.next
  //       }
  //     }
  //   } else {
  //     res = false
  //   }
  //   return res
  // }
}

class DoublyCircleChain<T> extends DoublyChain<T> implements DCC<T> {
  constructor(...p: T[]) {
    super()
    p.forEach(this.append, this)
  }
  createNode(v: T, p: number) {
    return {
      value: v,
      position: p,
      next: null,
      prev: null,
    }
  }
  append(p: T) {
    let node = this.createNode(p, this.length)
    if (this.length) {
      node.next = this.head
      this.head.prev = node
      this.tail.next = node
      node.prev = this.tail
      this.tail = node
    } else {
      node.prev = node
      node.next = node
      this.head = node
      this.tail = node
    }
    this.length++
    return this.length
  }
  insert(v: T, p: N) {
    let res = false
    if (this.isValidRange(p)) {
      let node = this.createNode(v, p)
      if (p === 0) {
        node.prev = node
        node.next = node
        this.head = node
        this.tail = node
      } else {
        let cur = this.head
        let index = 0
        while (index < p) {
          cur = cur.next
          index++
        }
        cur.prev.next = node
        node.prev = cur.prev
        node.next = cur
        cur.prev = node
      }
      this.length++
      this.setPosition(p)
      res = true
    } else {
      res = false
    }
    return res
  }
  removeAt(p: N) {
    if (this.isValidRange(p)) {
      let res: T
      if (p === 0) {
        res = this.head.value
        if (this.length === 1) {
          this.head = null
          this.tail = null
        } else {
          this.head = this.head.next
          this.tail.next = this.head
          this.head.prev = this.tail
        }
      } else if (p === this.length - 1) {
        res = this.tail.value
        this.tail = this.tail.prev
        this.tail.next = this.head
      } else {
        let cur = this.head
        let index = 0
        while (index < p) {
          cur = cur.next
          index++
        }
        res = cur.value
        cur.prev.next = cur.next
        cur.next.prev = cur.prev
      }
      this.setPosition(p)
      this.length--
      return res
    } else {
      return undefined
    }
  }
  // removeElement(v: T, all = false) {
  //   let res: B = false
  //   let cur = this.head
  //   let index = 0
  //   while (index < this.length) {
  //     if (cur.value === v) {
  //       if (index === 0) {
  //         this.head = this.head.next
  //         this.head.prev = this.tail
  //         this.tail.next = this.head
  //       } else if (index === this.length) {
  //         this.tail = this.tail.prev
  //         this.tail.next = this.head
  //         this.head.prev = this.tail
  //       } else {
  //         cur.prev.next = cur.next
  //         cur.next.prev = cur.prev
  //       }
  //       res = true
  //       this.length--
  //       if (!all) {
  //         break
  //       }
  //     } else {
  //       index++
  //     }
  //     cur = cur.next
  //   }
  //   return res
  // }
  toArray() {
    let res = []
    let index = 0
    let cur = this.head
    while (index < this.length) {
      res.push(cur.value)
      index++
      cur = cur.next
    }
    return res
  }
  setPosition(from: N = 0) {
    let index = 0
    let cur = this.head
    while (index < this.length) {
      if (index >= from) {
        cur.position = index
      }
      index++
      cur = cur.next
    }
  }
}

export { SingleChain, DoublyChain, SingleCircleChain, DoublyCircleChain }
