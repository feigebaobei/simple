import { Queue } from './queue'
import { Stack } from './stack'
import {
  BinaryTreeNode as BTN,
  BinaryTreeNodeOrNull as BTNON,
  BinaryTree as BT,
  BinarySearchTreeNode as BSTN,
  BinarySearchTreeNodeOrNull,
  BinarySearchTree as BST,
  // AVLTreeNode as BSTN,
  // AVLTreeNodeOrNull as BinarySearchTreeNodeOrNull,
  AVLTree as AVLT,
  SplayTree as ST,
  RedBackTree as RBT,
  B,
  F,
  N,
} from '../typings'

class BinaryTreeNode<T> implements BTN<T> {
  value: T
  left: BTNON<T>
  right: BTNON<T>
  parent: BTNON<T>
  constructor(v: T) {
    this.value = v
    this.left = null
    this.right = null
    this.parent = null
  }
  isRoot() {
    return !this.parent
  }
  hasParent() {
    return !!this.parent
  }
  hasLeft() {
    return !!this.left
  }
  hasRight() {
    return !!this.right
  }
  hasChild() {
    return this.hasLeft() || this.hasRight()
  }
  hasBothChild() {
    return this.hasLeft() && this.hasRight()
  }
  isLeaf() {
    return !this.hasChild()
  }
}
class BinaryTree<T> implements BT<T> {
  root: BT<T>['root']
  constructor() {
    this.root = null
  }
  createBTNode(v: T) {
    return new BinaryTreeNode(v)
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
  attachAsLeft(parent: BTN<T>, node: BTN<T>) {
    parent.left = node
    node && (node.parent = parent)
  }
  attachAsRight(parent: BTN<T>, node: BTN<T>) {
    parent.right = node
    node && (node.parent = parent)
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
  isFull() {
    let p = this.height()
    return this.vertexCount() === (Math.pow(2, p) - 1)
  }
  // 是否是完全二叉树
  // 非最后一层为满二叉树，最后一层从左到右分布。
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
class BinarySearchTreeNode<T> extends BinaryTreeNode<T> implements BSTN<T> {
  key: N
  value: T
  left: BSTN<T>['left']
  right: BSTN<T>['right']
  parent: BSTN<T>['parent']
  constructor(key: N, value: T) {
    super(value)
    this.key = key
    this.value = value
    this.left = null
    this.right = null
    this.parent = null
  }
  clone () {
    let res = new BinarySearchTreeNode<T>(this.key, this.value)
    res.left = this.left
    res.right = this.right
    res.parent = this.parent
    return res
  }
  'operator<'(otherNode: BinarySearchTreeNodeOrNull<T>) {
    if (otherNode) {
      return this.key < otherNode.key
    } else {
      return false
    }
  }
  'operator>'(otherNode: BinarySearchTreeNodeOrNull<T>) {
    if (otherNode) {
      return this.key > otherNode.key
    } else {
      return false
    }
  }
  'operator==='(otherNode: BinarySearchTreeNodeOrNull<T>) {
    if (otherNode) {
      return this.key === otherNode.key
    } else {
      return false
    }
  }
  'operator!=='(otherNode: BinarySearchTreeNodeOrNull<T>) {
    if (otherNode) {
      return this.key !== otherNode.key
    } else {
      return false
    }
  }
  // 是否是左节点
  isLeft() {
    let p = this.parent
    if (!p) {
      return false
    } else {
      return this.key < p.key
    }
  }
  // 是否是右节点
  isRight() {
    let p = this.parent
    if (!p) {
      return false
    } else {
      return this.key >= p.key
    }
  }
  // 需要测试
  sibling() {
    if (this.isRoot()) {
      return null
    } else {
      return this.isLeft() ? this.parent.right : this.parent.left
    }
  }
  uncle() {
    if (this.isRoot() || !this.parent || !this.parent.parent) {
      return null
    } else {
      let p = this.parent
      let g = p.parent
      return p.isLeft() ? g.right : g.left
    }
  }
}
class BinarySearchTree<T> extends BinaryTree<T> implements BST<T> {
  root: BST<T>['root']
  constructor() {
    super()
    this.root = null
    // this._hot = null // 记忆热点
  }
  createBSTNode(k: N, v: T) {
    return new BinarySearchTreeNode(k, v)
  }
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
  insert(k: N, v: T) {
    let node = this.search(k)
    if (node) {
      return new Error('has exist')
    } else {
      let newNode = this.createBSTNode(k, v)
      if (this.root) {
        this._insertNode(this.root, newNode)
      } else {
        this.root = newNode
      }
      return newNode // 考虑是否返回插入的节点
    }
  }
  // searchIn(k: N, node: BinarySearchTreeNodeOrNull<T>) {
  //   if (!node || k === node.key) {
  //     return node
  //   }
  //   this._hot = node
  //   return this.searchIn(k, k < node.key ? node.left : node.right)
  // }
  // 若存在则返回节点，否则返回null
  search(k: N, node: BinarySearchTreeNodeOrNull<T> = this.root) {
    // return this.searchIn(k, node)
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
        this._preOrderTraverse(cb, this.root)
        break
      case 'inOrder':
        this._inOrderTraverse(cb, this.root)
        break
        case 'postOrder':
          this._postOrderTraverse(cb, this.root)
          break
        case 'level':
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
  // 返回较高的子节点
  tallerChild(n: BinarySearchTreeNodeOrNull<T>) {
    let leftHeight = this.height(n.left)
    let rightHeight = this.height(n.right)
    if (leftHeight > rightHeight) {
      return n.left
    } else if (rightHeight > leftHeight) {
      return n.right
    } else {
      return n.isLeft() ? n.left : n.right
    }
  }
}

class AVLTree<T> extends BinarySearchTree<T> implements AVLT<T> {
  constructor() {
    super()
  }
  // 理想平衡
  balanced(n: BinarySearchTreeNodeOrNull<T>) {
    if (!n) {
      return true
    } else {
      return this.height(n.left) === this.height(n.right)
    }
  }
  // 平衡因子
  balanceFac(n: BinarySearchTreeNodeOrNull<T>) {
    if (!n) {
      return 0
    } else {
      return this.height(n.left) - this.height(n.right)
    }
  }
  // 是否avl平衡
  avlBalanced(n: BinarySearchTreeNodeOrNull<T>) {
    if (!n) {
      return true
    } else {
      return Math.abs(this.height(n.left) - this.height(n.right)) <= 1
    }
  }
  // 插入时使用旋转
  insert(k: N, v: T) {
    let node = this.search(k)
    if (node) {
      return new Error('has exist')
    } else {
      let newNode = this.createBSTNode(k, v)
      if (this.root) {
        this._insertNode(this.root, newNode)
      } else {
        this.root = newNode
      }
      let p = newNode.parent
      while (p) {
        if (!this.avlBalanced(p)) {
          if (p.parent) { // 非根节点
            this.rotateAt(this.tallerChild(this.tallerChild(p)))
          } else { // 根节点
            this.root = this.rotateAt(this.tallerChild(this.tallerChild(p)))
            this.root.parent = null
          }
          break
        }
        p = p.parent
      }
      return newNode // 考虑是否返回插入的节点
    }
  }
  // _insertNode(node: BSTN<T>, newNode: BSTN<T>): BSTN<T> {
  //   if (!node) {
  //     node = newNode
  //   } else if (newNode.key < node.key) {
  //     node.left = this._insertNode(node.left, newNode)
  //     if (node.left) {
  //       // 是否需要平衡
  //       if (this.height(node.left) - this.height(node.right) > 1) {
  //         if (newNode.key < node.left.key) {
  //           node = this._rotationLL(node)
  //         } else {
  //           node = this._rotationLR(node)
  //         }
  //       }
  //     }
  //   } else if (newNode.key > node.key) {
  //     node.right = this._insertNode(node.right, newNode)
  //     if (node.right) {
  //       // 是否需要平衡
  //       if (this.height(node.left) - this.height(node.right) < -1) {
  //         if (newNode.key > node.right.key) {
  //           node = this._rotationRR(node)
  //         } else {
  //           node = this._rotationRL(node)
  //         }
  //       }
  //     }
  //   }
  //   return node
  // }
  // 向左的单旋转
  _rotationRR(node: BSTN<T>) {
    let t = node.right
    node.right = t.left
    t.left = node
    return t
  }
  // 向右的单旋转
  _rotationLL(node: BSTN<T>) {
    let t = node.left
    node.left = t.right
    t.right = node
    return t
  }
  // 向右的双旋转
  _rotationLR(node: BSTN<T>) {
    node.left = this._rotationRR(node.left)
    return this._rotationLL(node)
  }
  // 向左的双旋转
  _rotationRL(node: BSTN<T>) {
    node.right = this._rotationLL(node.right)
    return this._rotationRR(node)
  }
  _connect34(a: BSTN<T>, b: BSTN<T>, c: BSTN<T>, t0: BinarySearchTreeNodeOrNull<T>, t1: BinarySearchTreeNodeOrNull<T>, t2: BinarySearchTreeNodeOrNull<T>, t3: BinarySearchTreeNodeOrNull<T>) {
    a.left = t0
    if (t0) {
      t0.parent = a
    }
    a.right = t1
    if (t1) {
      t1.parent = a
    }
    c.left = t2
    if (t2) {
      t2.parent = c
    }
    c.right = t3
    if (t3) {
      t3.parent = c
    }
    b.left = a
    a.parent = b
    b.right = c
    c.parent = b
    return b // 返回该子树的根节点
  }
  rotateAt(v: BSTN<T>) {
    // v是孙辈的节点，不平衡。
    // 至少有3层，才会出现不平衡，所以一定会有父节点、祖节点。
    let p = v.parent
    let g = p.parent
    if (p['operator==='](g.left)) {
      if (v['operator==='](p.left)) {
        // v p g
        return this._connect34(v, p, g, v.left, v.right, p.right, g.right)
      } else  {
        // p v g
        return this._connect34(p, v, g, p.left, v.left, v.right, g.right)
      }
    } else {
      if (v['operator==='](p.left)) {
        // g v p
        return this._connect34(g, v, p, g.left, v.left, v.right, p.right)
      } else  {
        // g p v
        return this._connect34(g, p, v, g.left, p.left, v.left, v.right)
      }
    }
  }
  // 删除时使用3+4重构
  // O(1)
  // 是否删除成功
  remove(k: N) {
    // 查检是否存在。
    // 若存在，则删除。否则，返回false
    let node = this.search(k)
    if (node) {
      let p = node.parent
      super.remove(k)
      while (p) {
        if (!this.avlBalanced(p)) {
          if (p.parent) { // 非根节点
            this.rotateAt(this.tallerChild(this.tallerChild(p)))
          } else { // 根节点
            this.root = this.rotateAt(this.tallerChild(this.tallerChild(p)))
            this.root.parent = null
          }
        }
        p = p.parent
      }
      return true
    } else {
      return false
    }
  }
}

class SplayTree<T> extends BinarySearchTree<T> implements ST<T> {
  constructor() {
    super()
  }
  splay(v: BinarySearchTreeNodeOrNull<T>) {
    if (!v) {return null}
    let p = v.parent
    if (!p) {return v} // 已经是根节点就不用再伸展了。
    let g = p.parent
    while(p && g) {
      let gg = g.parent // 未旋转时v的曾祖父。是旋转后v的父。
      if (v.isLeft()) {
        if (p.isLeft()) {
          // 当前结构
          //     g
          //   p
          // v
          // zig-zig
          this.attachAsLeft(g, p.right)
          this.attachAsRight(p, g)
          this.attachAsLeft(p, v.right)
          this.attachAsRight(v, p)
        } else {
          // 当前结构
          // g
          //      p
          //    v
          // zig-zag
          this.attachAsRight(g, v.left)
          this.attachAsLeft(v, g)
          this.attachAsRight(v, p)
          this.attachAsLeft(p, v.right)
        }
      } else {
        if (p.isRight()) {
          // zag-zag
          this.attachAsRight(g, p.left)
          this.attachAsLeft(p, g)
          this.attachAsRight(p, v.left)
          this.attachAsLeft(v, p)
        } else {
          // zag-zig
          this.attachAsLeft(g, v.right)
          this.attachAsRight(v, g)
          this.attachAsRight(p, v.left)
          this.attachAsLeft(v, p)
        }
      }
      if (!gg) {
        // 可删除
        v.parent = null // 根节点parent=null
      } else {
        if (gg.left['operator=='](g)) {
          this.attachAsLeft(gg, v)
        } else {
          this.attachAsRight(gg, v)
        }
      }
      p = v.parent
      if (p) {
        g = p.parent
      } else {
        g = null
      }
    }
    if (p && p['operator==='](v.parent)) { // 最后一次可能是单旋转
      if (v.isLeft()) {
        this.attachAsLeft(p, v.right)
        this.attachAsRight(v, p)
      } else {
        this.attachAsRight(p, v.left)
        this.attachAsLeft(v, p)
      }
    }
    v.parent = null // 到达树根后，设置parent=null
    this.root = v
    return v
  }
  searchSplayTreeNode(k: N) {
    let node = this.search(k)
    return this.splay(node)
  }
  insertSplayTreeNode(k: N, v: T) {
    let node = this.insert(k, v)
    // 若不是节点类型，则不执行伸展。
    if (node instanceof BinarySearchTreeNode) {
      return this.splay(node)
    } else {
      return node
    }
  }
  // removeSplayTreeNode(k: N) {
  // }
}


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
  SplayTree,
  // RedBackTree,
}
