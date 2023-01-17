import { Queue } from './queue'
import { Stack } from './stack'
import {
  // BaseTreeNode as BTN,
  // BaseTree as BT,

  BinaryTreeNode,
  //  as BTN,
  BinaryTreeNodeOrNull,
  BinaryTree as BT,
  BinarySearchTreeNode,
  BinarySearchTreeNodeOrNull,
  BinarySearchTree as BST,
  AVLTree as AVLT,
  RedBackTree as RBT,
  B,
  F,
  N,
} from '../typings'

class BinaryTree<T> implements BT<T> {
  // root: BinaryTreeNodeOrNull<T>
  root: BT<T>['root']
  constructor() {
    this.root = null
  }
  createNode(v: T) {
    return {
      value: v,
      left: null,
      right: null,
      parent: null,
    }
  }
  // 还缺少设置根节点的方法
  insertAsLeft(parent: BinaryTreeNode<T>, current: T) {
    let cur = this.createNode(current)
    let oldLeft = parent.left
    if (oldLeft) {
      oldLeft.parent = cur
      cur.left = oldLeft
      cur.parent = parent
      parent.left = cur
    } else {
      parent.left = cur
      cur.parent = parent
    }
  }
  insertAsRight(parent: BinaryTreeNode<T>, current: T) {
    let cur = this.createNode(current)
    let oldRight = parent.right
    if (oldRight) {
      oldRight.parent = cur
      cur.right = oldRight
      cur.parent = parent
      parent.right = cur
    } else {
      parent.right = cur
      cur.parent = parent
    }
  }
  _preOrderTraverse(cb: F, node: BinaryTreeNodeOrNull<T>) {
    if (node) {
      let stack = new Stack<BinaryTreeNode<T>>()
      stack.push(node)
      while (stack.size()) {
        let n = stack.pop()
        cb(n)
        n.right && stack.push(n.right)
        n.left && stack.push(n.left)
      }
    }
  }
  _inOrderTraverse(cb: F, node: BinaryTreeNodeOrNull<T>) {
    if (node) {
      this._inOrderTraverse(cb, node.left)
      cb(node)
      this._inOrderTraverse(cb, node.right)
    }
  }
  _postOrderTraverse(cb: F, node: BinaryTreeNodeOrNull<T>) {
    if (node) {
      this._postOrderTraverse(cb, node.left)
      this._postOrderTraverse(cb, node.right)
      cb(node)
    }
  }
  _levelTraverse(cb: F, node: BinaryTreeNodeOrNull<T>) {
    if (node) {
      let queue = new Queue<BinaryTreeNodeOrNull<T>>()
      queue.enqueue(node)
      while (!queue.isEmpty()) {
        let n = queue.dequeue()
        cb(n)
        n.left && queue.enqueue(n.left)
        n.right && queue.enqueue(n.right)
      }
    }
  }
  isEmpty() {
    return !this.root
  }
  _height(node: BinaryTreeNodeOrNull<T>, h: N = 0) {
    let res: N
    if (!node) {
      res = h
    } else if (node.left && node.right) {
      res = Math.max(this._height(node.left, h + 1), this._height(node.right, h + 1))
    } else if (node.left) {
      res = this._height(node.left, ++h)
    } else if (node.right) {
      res = this._height(node.right, ++h)
    } else {
      res = h + 1
    }
    return res
  }
  // 得到指定根节点的二叉树的高度。
  // 从1开始数
  height(node: BinaryTreeNodeOrNull<T> = this.root) {
    return this._height(node)
  }
  // 得到指定子树的深度
  deep(node: BinaryTreeNodeOrNull<T> = this.root) {
    let d = -1
    if (node) {
      let cur = node
      while (cur) {
        d++
        cur = cur.parent
      }
    }
    return d
  }
  // 得到最小深度
  // 认为深度与层数 值相等。
  minDeep() {
    if (this.root) {
      let queue = new Queue<BinaryTreeNodeOrNull<T>>()
      queue.enqueue(this.root)
      let len = queue.size()
      let deep = 0 // 认为根节点的深度是0
      while (len) {
        for (let i = 0; i < len; i++) {
          let n = queue.dequeue()
          if (!n.left && !n.right) {
            return deep
          }
          n.left && queue.enqueue(n.left)
          n.right && queue.enqueue(n.right)
        }
        len = queue.size()
        deep++
      }
    } else {
      return -1
    }
  }
  // 得到最大深度 就是 根节点的深度
  // 得到指定层数的节点
  // 层数从0开始数
  // -1表示最后一层。-x表示最后第x层。
  getLevelNode(p: N) {
    if (!this.root) {
      return []
    }
    let maxHeight = this.height(this.root)
    if (0 <= p && p <= maxHeight) {
      let level = 0
      let queue = new Queue<BinaryTreeNode<T>>()
      queue.enqueue(this.root)
      while (level < p) {
        let len = queue.size()
        for (let i = 0; i < len; i++) {
          let n = queue.dequeue()
          n.left && queue.enqueue(n.left)
          n.right && queue.enqueue(n.right)
        }
        level++
      }
      return queue.toArray()
    } else {
      p = maxHeight + p
      if (0 <= p && p <= maxHeight) {
        return this.getLevelNode(p)
      } else {
        return []
      }
    }
  }
  // 是否是真二叉树
  // 每个节点的出度是 0 或 2.  
  // to test
  isProper() {
    if (!this.root) {
      return true
    }
    let stack = new Stack<BinaryTreeNodeOrNull<T>>()
    stack.push(this.root)
    let res = true
    while (!stack.isEmpty()) {
      let n = stack.pop()
      if ((n.left && n.right) || (!n.left && !n.right)) {
        n.left && stack.push(n.left)
        n.right && stack.push(n.right)
      } else {
        res = false
        break
      }
    }
    return res
  }
  // 树中节点总数
  vertexCount() {
    let res: N = 0
    this._preOrderTraverse(() => {
      res++
    }, this.root)
    return res
  }
  // 是否是满二叉树
  // 叶子节点在最后一层上的真二叉树。
  // to test
  isFull() {
    let p = this.height()
    return this.vertexCount() === (Math.pow(2, p) - 1)
  }
  // 是否是完全二叉树
  // 非最后一层为满二叉树，最后一层从左到右分布。
  // to test
  isComplete() {
    let h = this.height()
    let fullCount = Math.pow(2, h) -1
    let treeCount = this.vertexCount()
    if (treeCount === fullCount) {
      return true
    } else {
      let lastLevelCount = this.getLevelNode(-1).length
      let lastLevelFullCount = Math.pow(2, h - 1)
      if (lastLevelFullCount - lastLevelCount != fullCount - treeCount) {
        return false
      } else {
        let lastSecondLevelNodeList = this.getLevelNode(-2)
        let i = 0
        let flag = 0
        // 找到第一个不是2度的节点
        while (i < lastSecondLevelNodeList.length) {
          if (lastSecondLevelNodeList[i].left && lastSecondLevelNodeList[i].right) {
            flag++
            i++
          } else {
            break
          }
        }
        // 该节点只有左节点或无节点
        if (lastSecondLevelNodeList[i].right) {
          return false
        }
        i++
        // 剩下的节点都是0度
        while (i < lastSecondLevelNodeList.length) {
          if (lastSecondLevelNodeList[i].left || lastSecondLevelNodeList[i].right) {
            return false
          }
          i++
        }
        return true        
      }
    }
  }
}
class BinarySearchTree<T> extends BinaryTree<T> implements BST<T> {
  constructor() {
    super()
  }
  _insertNode(node: BinarySearchTreeNode<T>, newNode: BinarySearchTreeNode<T>) {
    if (newNode.value < node.value) {
      // node.left ? this._insertNode(node.left, newNode) : (node.left = newNode)
      // let oldLeft = node.left
      if (node.left) {
        this._insertNode(node.left, newNode)
      } else {
        node.left = newNode
        newNode.parent = node
      }
    } else {
      // node.right
      //   ? this._insertNode(node.right, newNode)
      //   : (node.right = newNode)
      if (node.right) {
        this._insertNode(node.right, newNode)
      } else {
        node.right = newNode
        newNode.parent = node
      }
    }
  }
  insert(v: T) {
    let node = this.createNode(v)
    if (this.root) {
      this._insertNode(this.root, node)
    } else {
      this.root = node
    }
  }
  // 可能后期会删除此方法
  // 是否存在
  search(v: T) {
    let res: B = false
    let cur = this.root
    while (cur) {
      if (cur.value === v) {
        res = true
        break
      }
      if (v < cur.value) {
        cur = cur.left
      } else {
        cur = cur.right
      }
    }
    return res
  }
  // for del 2023/02/15
  // T<n> = O(1) +  T(a) + T(n-a-1) = O(n)
  // _preOrderTraverse(cb: F, node: BinarySearchTreeNodeOrNull<T>) {
  //   if (node) {
  //     cb(node.value)
  //     this._preOrderTraverse(cb, node.left)
  //     this._preOrderTraverse(cb, node.right)
  //   }
  // }
  // 递归 =》 迭代
  // _preOrderTraverse(cb: F, node: BinarySearchTreeNodeOrNull<T>) {
  //   if (node) {
  //     let stack = new Stack<BinarySearchTreeNode<T>>()
  //     stack.push(node)
  //     while (!stack.isEmpty()) {
  //       let n = stack.pop()
  //       cb(n.value)
  //       n.right && stack.push(n.right)
  //       n.left && stack.push(n.left)
  //     }
  //   }
  // }
  // _inOrderTraverse(cb: F, node: BinarySearchTreeNodeOrNull<T>) {
  //   if (node) {
  //     this._inOrderTraverse(cb, node.left)
  //     cb(node.value)
  //     this._inOrderTraverse(cb, node.right)
  //   }
  // }
  // _postOrderTraverse(cb: F, node: BinarySearchTreeNodeOrNull<T>) {
  //   if (node) {
  //     this._postOrderTraverse(cb, node.left)
  //     this._postOrderTraverse(cb, node.right)
  //     cb(node.value)
  //   }
  // }
  traverse(cb: F, order = 'inOrder') {
    switch (order) {
      case 'preOrder':
        // this._preOrderTraverse(cb, this.root)
        this._preOrderTraverse((node: BinarySearchTreeNode<T>) => {
          cb(node.value)
        }, this.root)
        break
      case 'inOrder':
        // this._inOrderTraverse(cb, this.root)
        this._inOrderTraverse((node: BinarySearchTreeNode<T>) => {
          cb(node.value)
        }, this.root)
        break
        case 'postOrder':
          // this._postOrderTraverse(cb, this.root)
          this._postOrderTraverse((node: BinarySearchTreeNode<T>) => {
            cb(node.value)
          }, this.root)
          break
        case 'level':
          // this._levelTraverse(cb, this.root)
          this._levelTraverse((node: BinarySearchTreeNode<T>) => {
            cb(node.value)
          }, this.root)
          break
    }
  }
  min() {
    let cur = this.root
    if (!cur) {
      return undefined
    }
    while (cur.left) {
      cur = cur.left
    }
    return cur.value
  }
  max() {
    let cur = this.root
    if (!cur) {
      return undefined
    }
    while (cur.right) {
      cur = cur.right
    }
    return cur.value
  }
  findMinNode(node: BinarySearchTreeNodeOrNull<T>) {
    if (!node) {
      return null
    }
    let cur = node
    while (cur.left) {
      cur = cur.left
    }
    return cur
  }
  findMaxNode(node: BinarySearchTreeNodeOrNull<T>) {
    if (!node) {
      return null
    }
    let cur = node
    while (cur.right) {
      cur = cur.right
    }
    return cur
  }
  _remove(node: BinarySearchTreeNodeOrNull<T>, value: T) {
    if (!node) {
      return null
    }
    if (value < node.value) {
      node.left = this._remove(node.left, value)
      return node
    } else if (value > node.value) {
      node.right = this._remove(node.right, value)
      return node
    } else {
      // 有0个节点
      if (!node.left && !node.right) {
        node = null
        return node
      }
      // 有1个节点
      if (!node.left) {
        node = node.right
        return node
      } else if (!node.right) {
        node = node.left
        return node
      }
      // 有2个节点
      let t = this.findMinNode(node.right)
      node.value = t.value
      node.right = this._remove(node.right, t.value)
      return node
    }
  }
  remove(v: T) {
    this.root = this._remove(this.root, v)
  }
  // static height(node: )
  // 待测试
  // 请使用原型上的方法
  // _height(node: BinarySearchTreeNodeOrNull<T>, h: N = 0) {
  //   if (node.left && node.right) {
  //     return Math.max(this._height(node.left, h + 1), this._height(node.right, h + 1))
  //   } else if (node.left) {
  //     return this._height(node.left, h++)
  //   } else if (node.right) {
  //     return this._height(node.right, h++)
  //   } else {
  //     return h
  //   }
  // }
  // height(node: BinarySearchTreeNode<T>) {
  //   return this._height(node, 0)
  // }

}
// class AVLTree<T> extends BinarySearchTree<T> implements AVLT<T> {
//   constructor() {
//     super()
//   }
//   insert(v: T): void {
//     this._insertNode(this.root, this.createNode(v))
//   }
//   _insertNode(node: BTN<T>, newNode: BTN<T>): BTN<T> {
//     if (!node) {
//       node = newNode
//     } else if (newNode.value < node.value) {
//       node.left = this._insertNode(node.left, newNode)
//       if (node.left) {
//         // 是否需要平衡
//         if (this.heightNode(node.left) - this.heightNode(node.right) > 1) {
//           if (newNode.value < node.left.value) {
//             node = this._rotationLL(node)
//           } else {
//             node = this._rotationLR(node)
//           }
//         }
//       }
//     } else if (newNode.value > node.value) {
//       node.right = this._insertNode(node.right, newNode)
//       if (node.right) {
//         // 是否需要平衡
//         if (this.heightNode(node.right) - this.heightNode(node.left) > 1) {
//           if (newNode.value > node.right.value) {
//             node = this._rotationRR(node)
//           } else {
//             node = this._rotationRL(node)
//           }
//         }
//       }
//     }
//     return node
//   }
//   // 向左的单旋转
//   _rotationRR(node: BTN<T>) {
//     let t = node.right
//     node.right = t.left
//     t.left = node
//     return t
//   }
//   // 向右的单旋转
//   _rotationLL(node: BTN<T>) {
//     let t = node.left
//     node.left = t.right
//     t.right = node
//     return t
//   }
//   // 向右的双旋转
//   _rotationLR(node: BTN<T>) {
//     node.left = this._rotationRR(node.left)
//     return this._rotationLL(node)
//   }
//   // 向左的双旋转
//   _rotationRL(node: BTN<T>) {
//     node.right = this._rotationLL(node.right)
//     return this._rotationRR(node)
//   }
// }

// class RedBackTree<T> extends BinarySearchTree<T> implements RBT<T> {
//   constructor() {
//     super()
//   }
// }

export {
  // BaseTree,
  // BinaryTreeNode,
  BinaryTree,
  BinarySearchTree,
  // AVLTree,
  // RedBackTree,
}
