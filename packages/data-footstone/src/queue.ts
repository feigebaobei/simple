

// 与队列相关的工具方法
// 队列
class Queue {
    constructor () {
        this.items = []
    }
    enqueue (...args) {
        this.items.push(...args)
    }
    dequeue () {
        return this.items.shift()
    }
    getAll () {
        return this.items
    }
    head () {
        return this.items[0]
    }
    tail () {
        return this.items[this.size() - 1]
    }
    size () {
        return this.items.length
    }
    isEmpty () {
        return this.size() === 0
    }
    clear () {
        return this.items = []
    }
    reverse () {
        return this.items.reverse()
    }
}

// 优先队列
class PriorityQueue extends Queue {
    constructor () {
        super()
    }
    highestPriority () {
        let ele = super.tail()
        return ele ? ele.priority : 0
    }
    enqueue (element, priority = 0) {
        let i = 0, len = super.size()
        // while (i < len -)
        // 0 add
        // 1 比大小 add
        // 2 二分查找 add
        // 3 二分查找 add

        // while add
        // 0
        if (!len) {
            this.items.push({
                element,
                priority
            })
        } else {
        // 1
            if (len === 1) {
                let oe = this.items[0]
                if (oe.priority <= priority) {
                    this.items.push({
                        element,
                        priority
                    })
                } else {
                    this.items.shift({
                        element,
                        priority
                    })
                }
            } else {
        // 2
                if (this.highestPriority() <= priority) {
                    this.items.push({
                        element,
                        priority
                    })
                } else {
                    let i = 0
                    while (i < len - 1) {
                        let arr = super.getAll(),
                            left = arr[i],
                            right = arr[i + 1]
                        if (left.priority <= priority && right.priority > priority) {
                            this.items.splice(i + 1, 0, {element, priority})
                        }
                        i++
                    }
                }
            }
        }
    }
}

export default {
  Queue,
  PriorityQueue,
}
