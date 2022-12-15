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
    heightNode: (node: BaseTreeNode<T> | null) => N
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
interface AVLTree<T> extends BinarySearchTree<T> {
    insert: (v: T) => void
    _insertNode: (n0: BaseTreeNode<T>, n1: BaseTreeNode<T>) => void
    _rotationRR: (node: BaseTreeNode<T>) => void
    _rotationLL: (node: BaseTreeNode<T>) => void
    _rotationLR: (node: BaseTreeNode<T>) => void
    _rotationRL: (node: BaseTreeNode<T>) => void
}
interface RedBackTree<T> extends BinarySearchTree<T> {
    insert: (v: T) => void
    _insertNode: (n0: BaseTreeNode<T>, n1: BaseTreeNode<T>) => void
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
    BaseTreeNode,
    BaseTree,
    BinarySearchTree,
    AVLTree,
    RedBackTree,
  }
  