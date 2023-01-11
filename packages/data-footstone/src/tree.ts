import { Queue } from './queue'
import {
  // BaseTreeNode as BTN,
  // BaseTree as BT,
  BinarySearchTreeNode,
  BinarySearchTreeNodeOrNull,
  BinarySearchTree as BST,
  AVLTree as AVLT,
  RedBackTree as RBT,
  B,
  F,
  N,
} from '../typings'

// class BaseTree<T> implements BT<T> {
//   // root: BTN<T> | null
//   // constructor() {
//   //   this.root = null
//   // }
//   // createNode(v: T) {
//   //   return {
//   //     value: v,
//   //     left: null,
//   //     right: null,
//   //   }
//   // }
//   // 先父节点，再左节点，再右节点
//   _preOrderTraverse(cb: F, node: BTN<T> | null) {
//     if (node) {
//       cb(node.value)
//       this._preOrderTraverse(cb, node.left)
//       this._preOrderTraverse(cb, node.right)
//     }
//   }
//   // 整体从左到右依次操作
//   _inOrderTraverse(cb: F, node: BTN<T> | null) {
//     if (node) {
//       this._inOrderTraverse(cb, node.left)
//       cb(node.value)
//       this._inOrderTraverse(cb, node.right)
//     }
//   }
//   // 先左节点，再右节点，再父节点
//   _postOrderTraverse(cb: F, node: BTN<T> | null) {
//     if (node) {
//       this._postOrderTraverse(cb, node.left)
//       this._postOrderTraverse(cb, node.right)
//       cb(node.value)
//     }
//   }
//   // _findMinNode(node: BTN<T> | null) {
//   //   let cur = node
//   //   while (cur && cur.left) {
//   //     cur = cur.left
//   //   }
//   //   return cur
//   // }
//   // 不应该在这里搞这样的逻辑
//   _remove(node: BTN<T>, value: T) {
//     if (!node) {
//       return null
//     }
//     if (value < node.value) {
//       node.left = this._remove(node.left, value)
//       return node
//     } else if (value > node.value) {
//       node.right = this._remove(node.right, value)
//       return node
//     } else {
//       // 有0个节点
//       if (!node.left && !node.right) {
//         node = null
//         return node
//       }
//       // 有1个节点
//       if (!node.left) {
//         node = node.right
//         return node
//       } else if (!node.right) {
//         node = node.left
//         return node
//       }
//       // 有2个节点
//       let t = this._findMinNode(node.right)
//       node.value = t.value
//       node.right = this._remove(node.right, t.value)
//       return node
//     }
//   }
//   返回节点的高度。
//   heightNode(node: BTN<T>): N {
//     return node
//       ? Math.max(this.heightNode(node.left), this.heightNode(node.right)) + 1
//       : -1
//   }
//   // 待测试
//   shortPathNodeLength(node = null, deep = 0) {
//     if (!node) {
//       return deep
//     } else {
//       let queue = new Queue<BTN<T>>()
//       queue.enqueue(node)
//       let len = queue.size()
//       while (len) {
//         let i = 0
//         while (i < len) {
//           let n = queue.dequeue()
//           if (!n.left && !n.right) {
//             return deep
//           } else {
//             n.left && queue.enqueue(n.left)
//             n.right && queue.enqueue(n.right)
//           }
//           i++
//         }
//         deep++
//         len = queue.size()
//       }
//     }
//   }
// }
class BinarySearchTree<T> implements BST<T> {
  root: BinarySearchTreeNodeOrNull<T>
  constructor() {
    this.root = null
  }
  createNode(v: T) {
    return {
      value: v,
      left: null,
      right: null,
    }
  }
  _insertNode(node: BinarySearchTreeNode<T>, newNode: BinarySearchTreeNode<T>) {
    if (newNode.value < node.value) {
      // if (!node.left) {
      //   node.left = newNode
      // } else {
      //   this._insertNode(node.left, newNode)
      // }
      node.left ? this._insertNode(node.left, newNode) : (node.left = newNode)
    } else {
      node.right
        ? this._insertNode(node.right, newNode)
        : (node.right = newNode)
      // if (!node.right) {
      //   node.right = newNode
      // } else {
      //   this._insertNode(node.right, newNode)
      // }
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
  _preOrderTraverse(cb: F, node: BinarySearchTreeNodeOrNull<T>) {
    if (node) {
      cb(node.value)
      this._preOrderTraverse(cb, node.left)
      this._preOrderTraverse(cb, node.right)
    }
  }
  _inOrderTraverse(cb: F, node: BinarySearchTreeNodeOrNull<T>) {
    if (node) {
      this._inOrderTraverse(cb, node.left)
      cb(node.value)
      this._inOrderTraverse(cb, node.right)
    }
  }
  _postOrderTraverse(cb: F, node: BinarySearchTreeNodeOrNull<T>) {
    if (node) {
      this._postOrderTraverse(cb, node.left)
      this._postOrderTraverse(cb, node.right)
      cb(node.value)
    }
  }
  traverse(cb: F, order = 'inOrder') {
    switch (order) {
      case 'preOrder':
        this._preOrderTraverse(cb, this.root)
        break
      case 'inOrder':
        this._inOrderTraverse(cb, this.root)
        break
      case 'postOrder':
        this._postOrderTraverse(cb, this.root)
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
}
class AVLTree<T> extends BinarySearchTree<T> implements AVLT<T> {
  constructor() {
    super()
  }
  insert(v: T): void {
    this._insertNode(this.root, this.createNode(v))
  }
  _insertNode(node: BTN<T>, newNode: BTN<T>): BTN<T> {
    if (!node) {
      node = newNode
    } else if (newNode.value < node.value) {
      node.left = this._insertNode(node.left, newNode)
      if (node.left) {
        // 是否需要平衡
        if (this.heightNode(node.left) - this.heightNode(node.right) > 1) {
          if (newNode.value < node.left.value) {
            node = this._rotationLL(node)
          } else {
            node = this._rotationLR(node)
          }
        }
      }
    } else if (newNode.value > node.value) {
      node.right = this._insertNode(node.right, newNode)
      if (node.right) {
        // 是否需要平衡
        if (this.heightNode(node.right) - this.heightNode(node.left) > 1) {
          if (newNode.value > node.right.value) {
            node = this._rotationRR(node)
          } else {
            node = this._rotationRL(node)
          }
        }
      }
    }
    return node
  }
  // 向左的单旋转
  _rotationRR(node: BTN<T>) {
    let t = node.right
    node.right = t.left
    t.left = node
    return t
  }
  // 向右的单旋转
  _rotationLL(node: BTN<T>) {
    let t = node.left
    node.left = t.right
    t.right = node
    return t
  }
  // 向右的双旋转
  _rotationLR(node: BTN<T>) {
    node.left = this._rotationRR(node.left)
    return this._rotationLL(node)
  }
  // 向左的双旋转
  _rotationRL(node: BTN<T>) {
    node.right = this._rotationLL(node.right)
    return this._rotationRR(node)
  }
}

class RedBackTree<T> extends BinarySearchTree<T> implements RBT<T> {
  constructor() {
    super()
  }
}

export {
  // BaseTree,
  BinarySearchTree,
  AVLTree,
  RedBackTree,
}
