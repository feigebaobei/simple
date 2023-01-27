import { Queue } from './queue'
import { Stack } from './stack'
import {
  // BaseTreeNode as BTN,
  // BaseTree as BT,

  BinaryTreeNode as BTN,
  //  as BTN,
  BinaryTreeNodeOrNull as BTNON,
  BinaryTree as BT,
  BinarySearchTreeNode as BSTN,
  BinarySearchTreeNodeOrNull,
  BinarySearchTree as BST,
  AVLTreeNode as AVLTN,
  AVLTreeNodeOrNull as AVLTNOR,
  AVLTree as AVLT,
  RedBackTree as RBT,
  B,
  F,
  N,
} from '../typings'



class BinaryTree<T> implements BT<T> {
  root: BT<T>['root']
  // createNode: BT<T>['createNode']
  constructor() {
    this.root = null
  }
  createBTNode(v: T) {
    return {
      value: v,
      left: null,
      right: null,
      parent: null,
    }
  }
  // 还缺少设置根节点的方法
  insertAsLeft(parent: BTN<T>, current: T) {
    let cur = this.createBTNode(current)
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
  insertAsRight(parent: BTN<T>, current: T) {
    let cur = this.createBTNode(current)
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
  _preOrderTraverse(cb: F, node: BTNON<T>) {
    if (node) {
      let stack = new Stack<BTN<T>>()
      stack.push(node)
      while (stack.size()) {
        let n = stack.pop()
        cb(n)
        n.right && stack.push(n.right)
        n.left && stack.push(n.left)
      }
    }
  }
  _inOrderTraverse(cb: F, node: BTNON<T>) {
    if (node) {
      this._inOrderTraverse(cb, node.left)
      cb(node)
      this._inOrderTraverse(cb, node.right)
    }
  }
  _postOrderTraverse(cb: F, node: BTNON<T>) {
    if (node) {
      this._postOrderTraverse(cb, node.left)
      this._postOrderTraverse(cb, node.right)
      cb(node)
    }
  }
  _levelTraverse(cb: F, node: BTNON<T>) {
    if (node) {
      let queue = new Queue<BTNON<T>>()
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
  _height(node: BTNON<T>, h: N = 0) {
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
  // 得到指定节点的高度。
  // 从1开始数
  height(node: BTNON<T> = this.root) {
    return this._height(node)
  }
  // 得到指定子树的深度
  deep(node: BTNON<T> = this.root) {
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
      let queue = new Queue<BTNON<T>>()
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
      let queue = new Queue<BTN<T>>()
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
    let stack = new Stack<BTNON<T>>()
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
class BinarySearchTreeNode<T> implements BSTN<T> {
  key: N
  value: T
  left: BSTN<T>['left']
  right: BSTN<T>['right']
  parent: BSTN<T>['parent']
  constructor(key: N, value: T) {
    this.key = key
    this.value = value
    this.left = null
    this.right = null
    this.parent = null
  }
  clone () {
    return new BinarySearchTreeNode<T>(this.key, this.value)
  }
  'operator<'(otherNode: BinarySearchTreeNode<T>) {
    return this.key < otherNode.key
  }
  'operator>'(otherNode: BinarySearchTreeNode<T>) {
    return this.key > otherNode.key
  }
  'operator==='(otherNode: BinarySearchTreeNode<T>) {
    return this.key === otherNode.key
  }
  'operator!=='(otherNode: BinarySearchTreeNode<T>) {
    return this.key !== otherNode.key
  }
}
// to test
class BinarySearchTree<T> extends BinaryTree<T> implements BST<T> {
  root: BST<T>['root']
  // createNode: (k: N, v: T) => BSTN<T>
  constructor() {
    super()
    this.root = null
    // this.createNode = (k: N, v: T) => {
    //   return new BinarySearchTreeNode(k, v)
    // }
  }
  createBSTNode(k: N, v: T) {
    return new BinarySearchTreeNode(k, v)
  }
  // createNode(k: N, v: T) {
  //   return new BinarySearchTreeNode(k, v)
  // }
  insertAsLeft() {
    return new Error('不能插入左节点')
  }
  insertAsRight() {
    return new Error('不能插入右节点')
  }
  _insertNode(node: BinarySearchTreeNode<T>, newNode: BinarySearchTreeNode<T>) {
    if (newNode.key < node.key) {
      if (node.left) {
        this._insertNode(node.left, newNode)
      } else {
        node.left = newNode
        newNode.parent = node
      }
    } else {
      if (node.right) {
        this._insertNode(node.right, newNode)
      } else {
        node.right = newNode
        newNode.parent = node
      }
    }
  }
  // insert(v: T) {
  //   let node = this.createNode(v)
  //   if (this.root) {
  //     this._insertNode(this.root, node)
  //   } else {
  //     this.root = node
  //   }
  // }
  // insert(k: N, v: T) {
  //   // 若已经存在则禁止插入
  //   // 返回插入的节点
  //   if (this.search()) {}
  // }
  insert(k: N, v: T) {
    let node = this.search(k)
    if (node) {
      return new Error('has exist')
    } else {
      if (this.root) {
        this._insertNode(this.root, this.createBSTNode(k, v))
      } else {
        this.root = this.createBSTNode(k, v)
      }
    }
  }
  // 若存在则返回节点，否则返回null
  search(k: N, node: BinarySearchTreeNodeOrNull<T> = this.root) {
    if (!node || node.key === k) {
      return node
    } else if (node.key < k) {
      return this.search(k, node.right)
    } else {
      return this.search(k, node.left)
    }
  }
  traverse(cb: F, order = 'inOrder') {
    switch (order) {
      case 'preOrder':
        // this._preOrderTraverse((node: BinarySearchTreeNode<T>) => {
        //   cb(node.value)
        // }, this.root)
        this._preOrderTraverse(cb, this.root)
        break
      case 'inOrder':
        // this._inOrderTraverse((node: BinarySearchTreeNode<T>) => {
        //   cb(node.value)
        // }, this.root)
        this._inOrderTraverse(cb, this.root)
        break
        case 'postOrder':
          // this._postOrderTraverse((node: BinarySearchTreeNode<T>) => {
          //   cb(node.value)
          // }, this.root)
          this._postOrderTraverse(cb, this.root)
          break
        case 'level':
          // this._levelTraverse((node: BinarySearchTreeNode<T>) => {
          //   cb(node.value)
          // }, this.root)
          this._levelTraverse(cb, this.root)
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
  _remove(node: BinarySearchTreeNodeOrNull<T>, k: N) {
    if (!node) {
      return null
    }
    if (k < node.key) {
      node.left = this._remove(node.left, k)
      return node
    } else if (k > node.key) {
      node.right = this._remove(node.right, k)
      return node
    } else { // 相等
      // 有0个子节点
      if (!node.left && !node.right) {
        node = null
        return node
      }
      // 有1个子节点
      if (!node.left) {
        node = node.right
        return node
      } else if (!node.right) {
        node = node.left
        return node
      }
      // 有2个子节点
      let t = this.findMinNode(node.right)
      node.value = t.value
      node.right = this._remove(node.right, t.key)
      return node
    }
  }
  // 不返回东西
  remove(k: N) {
    this.root = this._remove(this.root, k)
  }
  // // 判断左右关系
  // 此api好像用不上
  // isLeft(parent: BinarySearchTreeNode<T>, node: BinarySearchTreeNode<T>) {
  //   return node['operator!=='](parent.left)
  // }
  // isRight(parent: BinarySearchTreeNode<T>, node: BinarySearchTreeNode<T>) {
  //   return node['operator!=='](parent.right)
  // }
}
  
// class AVLTree<T> extends BinarySearchTree<T> implements AVLT<T> {
//   constructor() {
//     super()
//   }
//   // 平衡因子
//   isBalance(n: AVLTN<T>) {
//     return this.height(n.left) - this.height(n.right)
//   }
//   // _rotationRR: (node: BSTN<T>) => void
//   // _rotationLL: (node: BSTN<T>) => void
//   // _rotationLR: (node: BSTN<T>) => void
//   // _rotationRL: (node: BSTN<T>) => void
//   insert(k: N, v: T) {
//     let node = this.search(k)
//     if (node) {
//       return new Error('has exist')
//     } else {
//       if (this.root) {
//         this._insertNode(this.root, this.createBSTNode(k, v))
//       } else {
//         this.root = this.createBSTNode(k, v)
//       }
//     }
//   }
//   // insert(v: T): void {
//   //   this._insertNode(this.root, this.createNode(v))
//   // }
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
  // BTN,
  BinaryTree,
  BinarySearchTree,
  BinarySearchTreeNode,
  AVLTree,
  // RedBackTree,
}
