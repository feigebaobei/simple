import {
    S, 
    N, B,
    //  A, 
    F
} from './baseType'

interface BaseTreeNode<T> {
    value: T,
    left: BaseTreeNode<T> | null,
    right: BaseTreeNode<T> | null,
}
interface BaseTree<T> {
    root: BaseTreeNode<T> | null
    createNode: (v: T) => BaseTreeNode<T>
    _preOrderTraverse: (cb: F, node: BaseTreeNode<T> | null) => void
    _inOrderTraverse: (cb: F, node: BaseTreeNode<T> | null) => void
    _postOrderTraverse: (cb: F, node: BaseTreeNode<T> | null) => void
    _remove: (node: BaseTreeNode<T> | null, v: T) => BaseTreeNode<T> | null
    _findMinNode: (node: BaseTreeNode<T> | null) => BaseTreeNode<T> | null
}

type BinarySearchTreeOrder = 'preOrder' | 'inOrder' | 'postOrder'

interface BinarySearchTree<T> extends BaseTree<T> {
    insert: (v: T) => void
    _insertNode: (n0: BaseTreeNode<T>, n1: BaseTreeNode<T>) => void
    search: (v: T) => B
    traverse: (fn: F, order: BinarySearchTreeOrder) => void
    min: () => T
    max: () => T
    remove: (v: T) => void
}
// Adelson-Velskii-Landi tree
interface AVLTree<T> extends BaseTree<T> {}


export {
    BaseTreeNode,
    BaseTree,
    BinarySearchTree,
    AVLTree,
  }
  