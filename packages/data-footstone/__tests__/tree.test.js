import {
  // BaseTree,
  BinaryTree,
  // BinaryTreeNode,
  BinarySearchTree,
  AVLTree,
  RedBackTree,
} from '../src/tree'

// let arr = []


describe('BinarySearchTree', () => {
  it('BinarySearchTree', () => {
    let t = new BinarySearchTree()
    expect(t.createNode(5)).toEqual({ value: 5, left: null, right: null })
    t.insert(5)
    t.insert(3)
    t.insert(4)
    t.insert(2)
    expect(t.root).toEqual({
      value: 5,
      left: {
        value: 3,
        left: {
          value: 2,
          left: null,
          right: null,
        },
        right: {
          value: 4,
          left: null,
          right: null,
        },
      },
      right: null,
    })
    expect(t.search(3)).toBeTruthy()
    expect(t.search(4)).toBeTruthy()
    expect(t.search(6)).toBeFalsy()
    let temp = []
    t.traverse((v) => {
      temp.push(v)
    })
    expect(temp).toEqual([2, 3, 4, 5])
    temp = []
    t.traverse((v) => {
      temp.push(v)
    }, 'preOrder')
    expect(temp).toEqual([5, 3, 2, 4])
    temp = []
    t.traverse((v) => {
      temp.push(v)
    }, 'postOrder')
    expect(temp).toEqual([2, 4, 3, 5])
    expect(t.min()).toBe(2)
    t.insert(6)
    expect(t.max()).toBe(6)
    expect(t.findMinNode(t.root)).toEqual({
      value: 2,
      left: null,
      right: null,
    })
    expect(t.findMaxNode(t.root)).toEqual({
      value: 6,
      left: null,
      right: null,
    })
    t.remove(3) // 有2个节点
    expect(t.root).toEqual({
      value: 5,
      left: {
        value: 4,
        left: {
          value: 2,
          left: null,
          right: null,
        },
        right: null,
      },
      right: {
        value: 6,
        left: null,
        right: null,
      },
    })
    t.remove(4) // 有1个左节点
    expect(t.root).toEqual({
      value: 5,
      left: {
        value: 2,
        left: null,
        right: null,
      },
      right: {
        value: 6,
        left: null,
        right: null,
      },
    })
    t.insert(7) // 有1个右节点
    t.remove(6) // 有1个右节点
    expect(t.root).toEqual({
      value: 5,
      left: {
        value: 2,
        left: null,
        right: null,
      },
      right: {
        value: 7,
        left: null,
        right: null,
      },
    })
    t.remove(7) // 有0个节点
    expect(t.root).toEqual({
      value: 5,
      left: {
        value: 2,
        left: null,
        right: null,
      },
      right: null,
    })
  })
})

// 不再使用该类了。
// describe('BinaryTreeNode', () => {
//   test.only('BinaryTreeNode', () => {
//     let treeNode = new BinaryTreeNode(3)
//     // treeNode
//     expect(treeNode.value).toBe(3)
//     expect(treeNode.left).toBeNull()
//     expect(treeNode.right).toBeNull()
//     expect(treeNode.parent).toBeNull()
//     expect(treeNode.height()).toBe(1)
//     expect(treeNode.size()).toBe(1)
//   })
// })

describe('BinaryTree', () => {
  test('BinaryTree 结构', () => {
    //     2
    //  1     3
    let tree = new BinaryTree()
    tree.root = tree.createNode(2)
    tree.insertAsLeft(tree.root, 1)
    tree.insertAsRight(tree.root, 3)
    expect(tree.root.value).toBe(2)
    expect(tree.root.left.value).toBe(1)
    expect(tree.root.right.value).toBe(3)
    expect(tree.root.left.parent.value).toBe(2)
    expect(tree.root.right.parent.value).toBe(2)
  })
  // beforeEach(() => {
  //   arr = []
  // })
  test('BinaryTree 遍历', () => {
    //     2
    //  1     3
    // 4 5   6 7 
    let tree = new BinaryTree()
    tree.root = tree.createNode(2)
    tree.insertAsLeft(tree.root, 1)
    tree.insertAsRight(tree.root, 3)
    tree.insertAsLeft(tree.root.left, 4)
    tree.insertAsRight(tree.root.left, 5)
    tree.insertAsLeft(tree.root.right, 6)
    tree.insertAsRight(tree.root.right, 7)
    let arr = []
    tree._preOrderTraverse((item) => {arr.push(item)}, tree.root)
    expect(arr).toEqual([2,1,4,5,3,6,7])
    arr = []
    tree._inOrderTraverse((item) => {arr.push(item)}, tree.root)
    expect(arr).toEqual([4,1,5,2,6,3,7])
    arr = []
    tree._postOrderTraverse((item) => {arr.push(item)}, tree.root)
    expect(arr).toEqual([4,5,1,6,7,3,2])
  })
})

// describe('BinaryTree', () => {
//   test('BinaryTree', () => {
//     let tree = new BinaryTree()
//     tree.root = tree.createNode(2)
//     tree.insertAsLeft(tree.root, 1)
//     tree.insertAsRight(tree.root, 3)
//     expect(tree.root.value).toBe(2)
//     expect(tree.root.left.value).toBe(1)
//     expect(tree.root.right.value).toBe(3)
//     expect(tree.root.left.parent.value).toBe(2)
//     expect(tree.root.right.parent.value).toBe(2)
//   })
// })
