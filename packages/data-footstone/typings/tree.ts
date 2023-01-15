import {
  S,
  N,
  B,
  //  A,
  F,
} from './baseType'

// interface BaseTreeNode<T> {
//   value: T
//   left: BaseTreeNode<T> | null
//   right: BaseTreeNode<T> | null
// }
// interface BaseTree<NodeType> {
// //   // root: BaseTreeNode<T> | null
// //   // createNode: (v: T) => BaseTreeNode<T>
//   // _preOrderTraverse: (cb: F, node: NodeType | null) => void
//   // _inOrderTraverse: (cb: F, node: NodeType | null) => void
//   // _postOrderTraverse: (cb: F, node: NodeType | null) => void
// //   // _remove: (node: BaseTreeNode<T> | null, v: T) => BaseTreeNode<T> | null
// //   _findMinNode: (node: BaseTreeNode<T> | null) => BaseTreeNode<T> | null
// //   heightNode: (node: BaseTreeNode<T> | null) => N
// //   shortPathNodeLength: (node: BaseTreeNode<T> | null, deep: N) => N
// }

interface BinaryTreeNode<T> {
  value: T,
  left: BinaryTreeNodeOrNull<T>
  right: BinaryTreeNodeOrNull<T>
  parent: BinaryTreeNodeOrNull<T>
  // _height: (n: BinaryTreeNodeOrNull<T>, h: N) => N,
  // height: () => N,
  // _size: (n: BinaryTreeNodeOrNull<T>, size: N) => N,
  // size: () => N,
}

type BinaryTreeNodeOrNull<T> = (BinaryTreeNode<T> | null)
interface BinaryTree<T> {
  root: BinaryTreeNodeOrNull<T>
  createNode: (v: T) => BinaryTreeNode<T>
  // insertAsLeft: (parent: BinaryTreeNode<T>, current: T) => void
  // insertAsRight: (parent: BinaryTreeNode<T>, current: T) => void
  _preOrderTraverse: (cb: F, node: BinaryTreeNodeOrNull<T>) => void
  _inOrderTraverse: (cb: F, node: BinaryTreeNodeOrNull<T>) => void
  _postOrderTraverse: (cb: F, node: BinaryTreeNodeOrNull<T>) => void
  _size: (node: BinaryTreeNodeOrNull<T>, size: N) => N
  size: () => N
  isEmpty: () => B
}

type BinarySearchTreeOrder = 'preOrder' | 'inOrder' | 'postOrder'
type BinarySearchTreeNode<T> = {
  value: T
  left: BinarySearchTreeNodeOrNull<T>
  right: BinarySearchTreeNodeOrNull<T>
  // 可能需要指向父节点的指针
}
type BinarySearchTreeNodeOrNull<T> = BinarySearchTreeNode<T> | null
interface BinarySearchTree<T> {
  root: BinarySearchTreeNodeOrNull<T>
  createNode: (v: T) => BinarySearchTreeNode<T>
  insert: (v: T) => void
  _insertNode: (
    n0: BinarySearchTreeNode<T>,
    n1: BinarySearchTreeNode<T>
  ) => void
  search: (v: T) => B
  _preOrderTraverse: (cb: F, node: BinarySearchTreeNodeOrNull<T>) => void
  _inOrderTraverse: (cb: F, node: BinarySearchTreeNodeOrNull<T>) => void
  _postOrderTraverse: (cb: F, node: BinarySearchTreeNodeOrNull<T>) => void
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
    v: T
  ) => BinarySearchTreeNodeOrNull<T>
  remove: (v: T) => void
  // static 
  _height: (node: BinarySearchTreeNode<T>, h: N) => N
  height: (node: BinarySearchTreeNode<T>) => N
}
// Adelson-Velskii-Landi tree
type AVLTreeNode<T> = BinarySearchTreeNode<T>
interface AVLTree<T> extends BinarySearchTree<T> {
  insert: (v: T) => void
  _insertNode: (n0: AVLTreeNode<T>, n1: AVLTreeNode<T>) => void
  _rotationRR: (node: AVLTreeNode<T>) => void
  _rotationLL: (node: AVLTreeNode<T>) => void
  _rotationLR: (node: AVLTreeNode<T>) => void
  _rotationRL: (node: AVLTreeNode<T>) => void
}

type RedBackTreeNode<T> = BinarySearchTreeNode<T>
interface RedBackTree<T> extends BinarySearchTree<T> {
  insert: (v: T) => void
  _insertNode: (n0: RedBackTreeNode<T>, n1: RedBackTreeNode<T>) => void
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
  AVLTree,
  RedBackTree,
}
