import {
  S,
  N,
  B,
  //  A,
  F,
} from './baseType'

// 二叉树的节点
interface BinaryTreeNode<T> {
  value: T,
  left: BinaryTreeNodeOrNull<T>
  right: BinaryTreeNodeOrNull<T>
  parent: BinaryTreeNodeOrNull<T>
  // 有可能需要一个指向树的指针
}
// 还有一种长子-兄弟表示法。
type BinaryTreeNodeOrNull<T> = (BinaryTreeNode<T> | null)
// 二叉树
interface BinaryTree<T> {
  root: BinaryTreeNodeOrNull<T>
  // 有此方法，在要编辑器中有警告。所以先注释。
  // createNode: (v: T) => BinaryTreeNode<T>
  createBTNode: (v: T) => BinaryTreeNode<T>
  insertAsLeft: (parent: BinaryTreeNode<T>, current: T) => void
  insertAsRight: (parent: BinaryTreeNode<T>, current: T) => void
  _preOrderTraverse: (cb: F, node: BinaryTreeNodeOrNull<T>) => void
  _inOrderTraverse: (cb: F, node: BinaryTreeNodeOrNull<T>) => void
  _postOrderTraverse: (cb: F, node: BinaryTreeNodeOrNull<T>) => void
  _levelTraverse: (cb: F, node: BinaryTreeNodeOrNull<T>) => void
  isEmpty: () => B
  _height: (node: BinaryTreeNodeOrNull<T>, h: N) => N
  height: (node: BinaryTreeNodeOrNull<T>) => N
  deep: (node: BinaryTreeNodeOrNull<T>) => N
  minDeep: () => N
  getLevelNode: (p: N) => BinaryTreeNode<T>[]
  isProper: () => B
  vertexCount: () => N
  isFull: () => B
  isComplete: () => B
}
// 二叉搜索树的节点
type BinarySearchTreeOrder = 'preOrder' | 'inOrder' | 'postOrder' | 'level'
interface BinarySearchTreeNode<T> {
  key: N
  value: T | null
  left: BinarySearchTreeNodeOrNull<T>
  right: BinarySearchTreeNodeOrNull<T>
  parent: BinarySearchTreeNode<T>
  clone: () => BinarySearchTreeNode<T>
  'operator<': (otherNode: BinarySearchTreeNode<T>) => B
  'operator>': (otherNode: BinarySearchTreeNode<T>) => B
  'operator===': (otherNode: BinarySearchTreeNode<T>) => B
  'operator!==': (otherNode: BinarySearchTreeNode<T>) => B
  isLeft: () => B
  isRight: () => B
}
type BinarySearchTreeNodeOrNull<T> = BinarySearchTreeNode<T> | null

// 二叉搜索树
interface BinarySearchTree<T> extends Pick<BinaryTree<T>, '_preOrderTraverse' | '_inOrderTraverse' | '_postOrderTraverse'> {
  root: BinarySearchTreeNodeOrNull<T>
  createBSTNode: (k: N, v: T) => BinarySearchTreeNode<T>
  insertAsLeft: () => Error
  insertAsRight: () => Error
  insert: (k: N, v: T) => Error | undefined
  _insertNode: (
    n0: BinarySearchTreeNode<T>,
    n1: BinarySearchTreeNode<T>
  ) => void
  search: (k: N) => BinarySearchTreeNodeOrNull<T>
  traverse: (fn: F, order: BinarySearchTreeOrder) => void
  min: () => T | undefined
  max: () => T | undefined
  findMinNode: (
    node: BinarySearchTreeNodeOrNull<T>
  ) => BinarySearchTreeNodeOrNull<T>
  findMaxNode: (
    node: BinarySearchTreeNodeOrNull<T>
  ) => BinarySearchTreeNodeOrNull<T>
  _remove: (
    node: BinarySearchTreeNodeOrNull<T>,
    k: N
  ) => BinarySearchTreeNodeOrNull<T>
  remove: (k: N) => void
}
// avl树节点
type AVLTreeNode<T> = BinarySearchTreeNode<T>
type AVLTreeNodeOrNull<T> = BinarySearchTreeNodeOrNull<T>
// avl树
// Adelson-Velskii-Landi tree
interface AVLTree<T> extends BinarySearchTree<T> {
  // insert: (v: T) => void
  // insert: (k: N, v: T) => void
  _insertNode: (n0: AVLTreeNode<T>, n1: AVLTreeNode<T>) => void
  _rotationRR: (node: AVLTreeNode<T>) => void
  _rotationLL: (node: AVLTreeNode<T>) => void
  _rotationLR: (node: AVLTreeNode<T>) => void
  _rotationRL: (node: AVLTreeNode<T>) => void
  remove: (k: N) => void
}

type RedBackTreeNode<T> = BinarySearchTreeNode<T>
interface RedBackTree<T> extends BinarySearchTree<T> {
  // insert: (v: T) => void
  // _insertNode: (n0: RedBackTreeNode<T>, n1: RedBackTreeNode<T>) => void
}

// B+
// 平衡二叉树
// avl树
// 红黑树
// 霍夫曼树
// 有序树
// 无序树
// 字典树
// 后缀树
// 广义后缀树

export {
  // BaseTreeNode, BaseTree,
  BinaryTreeNode,
  BinaryTreeNodeOrNull,
  BinaryTree,
  BinarySearchTreeNode,
  BinarySearchTreeNodeOrNull,
  BinarySearchTree,
  AVLTreeNode,
  AVLTreeNodeOrNull,
  AVLTree,
  RedBackTree,
}
