import {
  // BaseTree,
  BinaryTree,
  // BinaryTreeNode,
  BinarySearchTree,
  BinarySearchTreeNode,
  AVLTree,
  RedBackTree,
} from '../src/tree'
import { loseloseHashFn } from '../src/hashMap'
import { af } from '../src/helper'



describe('BinaryTree', () => {
  test('BinaryTree 结构', () => {
    //     2
    //  1     3
    let tree = new BinaryTree()
    tree.root = tree.createBTNode(2)
    tree.insertAsLeft(tree.root, 1)
    tree.insertAsRight(tree.root, 3)
    expect(tree.root.value).toBe(2)
    expect(tree.root.left.value).toBe(1)
    expect(tree.root.right.value).toBe(3)
    expect(tree.root.left.parent.value).toBe(2)
    expect(tree.root.right.parent.value).toBe(2)
    //         2
    //     1     3
    //   4
    //  9
    tree.insertAsLeft(tree.root.left, 9)
    tree.insertAsLeft(tree.root.left, 4)
    expect(tree.root.left.value).toBe(1)
    expect(tree.root.left.left.value).toBe(4)
    expect(tree.root.left.left.left.value).toBe(9)
    //         2
    //     1     3
    //   4        7
    //  9           10
    tree.insertAsRight(tree.root.right, 10)
    tree.insertAsRight(tree.root.right, 7)
    expect(tree.root.right.value).toBe(3)
    expect(tree.root.right.right.value).toBe(7)
    expect(tree.root.right.right.right.value).toBe(10)
  })
  test('BinaryTree 遍历', () => {
    //     2
    //  1     3
    // 4 5   6 7 
    let tree = new BinaryTree()
    tree.root = tree.createBTNode(2)
    tree.insertAsLeft(tree.root, 1)
    tree.insertAsRight(tree.root, 3)
    tree.insertAsLeft(tree.root.left, 4)
    tree.insertAsRight(tree.root.left, 5)
    tree.insertAsLeft(tree.root.right, 6)
    tree.insertAsRight(tree.root.right, 7)
    let arr = []
    tree._preOrderTraverse((item) => {arr.push(item.value)}, tree.root)
    expect(arr).toEqual([2,1,4,5,3,6,7])
    arr = []
    tree._inOrderTraverse((item) => {arr.push(item.value)}, tree.root)
    expect(arr).toEqual([4,1,5,2,6,3,7])
    arr = []
    tree._postOrderTraverse((item) => {arr.push(item.value)}, tree.root)
    expect(arr).toEqual([4,5,1,6,7,3,2])
    arr = []
    tree._levelTraverse(item => {arr.push(item.value)}, tree.root)
    expect(arr).toEqual([2,1,3,4,5,6,7])
  })
  test('BinaryTree deep', () => {
    //     2
    //  1     3
    // 4 5
    let tree = new BinaryTree()
    tree.root = tree.createBTNode(2)
    tree.insertAsLeft(tree.root, 1)
    tree.insertAsRight(tree.root, 3)
    tree.insertAsLeft(tree.root.left, 4)
    tree.insertAsRight(tree.root.left, 5)
    expect(tree.deep()).toBe(0)
    expect(tree.deep(tree.root)).toBe(0)
    expect(tree.deep(tree.root.left)).toBe(1)
    expect(tree.deep(tree.root.right)).toBe(1)
    expect(tree.deep(tree.root.left.left)).toBe(2)
    expect(tree.deep(tree.root.left.right)).toBe(2)
    expect(tree.deep(tree.root.left.left.left)).toBe(-1)
    expect(tree.minDeep()).toBe(1)
    tree = new BinaryTree()
    expect(tree.minDeep()).toBe(-1)
    tree.root = tree.createBTNode(2)
    expect(tree.minDeep()).toBe(0)
  })
  test('BinaryTree height', () => {
    //     2
    //  1     3
    // 4 5
    let tree = new BinaryTree()
    tree.root = tree.createBTNode(2)
    tree.insertAsLeft(tree.root, 1)
    tree.insertAsRight(tree.root, 3)
    tree.insertAsLeft(tree.root.left, 4)
    tree.insertAsRight(tree.root.left, 5)
    expect(tree.height()).toBe(3)
    expect(tree.height(tree.root)).toBe(3)
    tree.insertAsLeft(tree.root.right, 6)
    expect(tree.height(tree.root)).toBe(3)
    tree.insertAsRight(tree.root.right, 7)
    expect(tree.height(tree.root)).toBe(3)
    expect(tree.height(tree.root.left)).toBe(2)
    expect(tree.height(tree.root.right)).toBe(2)
    expect(tree.height(tree.root.left.left)).toBe(1)
    expect(tree.height(tree.root.left.right)).toBe(1)
  })
  test('BinaryTree 得到指定层数的节点', () => {
    let tree = new BinaryTree()
    tree.root = tree.createBTNode(2)
    expect(tree.getLevelNode(0).map(item => (item.value))).toEqual([2])
    expect(tree.getLevelNode(1).map(item => (item.value))).toEqual([])
    expect(tree.getLevelNode(10).map(item => (item.value))).toEqual([])
    tree.insertAsLeft(tree.root, 1)
    tree.insertAsRight(tree.root, 3)
    tree.insertAsLeft(tree.root.left, 4)
    tree.insertAsRight(tree.root.left, 5)
    expect(tree.getLevelNode(1).map(item => (item.value))).toEqual([1,3])
    expect(tree.getLevelNode(2).map(item => (item.value))).toEqual([4,5])
    expect(tree.getLevelNode(-1).map(item => (item.value))).toEqual([4,5])
    expect(tree.getLevelNode(-2).map(item => (item.value))).toEqual([1,3])
    expect(tree.getLevelNode(-20).map(item => (item.value))).toEqual([])
  })
  test('BinaryTree proper', () => {
    //     2
    //  1     3
    // 4 5   6 7
    let tree = new BinaryTree()
    expect(tree.isProper()).toBeTruthy()
    tree.root = tree.createBTNode(2)
    expect(tree.isProper()).toBeTruthy()
    tree.insertAsLeft(tree.root, 1)
    expect(tree.isProper()).toBeFalsy()
    tree.insertAsRight(tree.root, 3)
    expect(tree.isProper()).toBeTruthy()
    tree.insertAsLeft(tree.root.left, 4)
    expect(tree.isProper()).toBeFalsy()
    tree.insertAsRight(tree.root.left, 5)
    expect(tree.isProper()).toBeTruthy()
    tree.insertAsLeft(tree.root.right, 6)
    tree.insertAsRight(tree.root.right, 7)
    expect(tree.isProper()).toBeTruthy()
  })
  test('BinaryTree pull', () => {
    //     2
    //  1     3
    // 4 5   6 7
    let tree = new BinaryTree()
    expect(tree.isFull()).toBeTruthy()
    tree.root = tree.createBTNode(2)
    expect(tree.isFull()).toBeTruthy()
    tree.insertAsLeft(tree.root, 1)
    expect(tree.isFull()).toBeFalsy()
    tree.insertAsRight(tree.root, 3)
    expect(tree.isFull()).toBeTruthy()
    tree.insertAsLeft(tree.root.left, 4)
    expect(tree.isFull()).toBeFalsy()
    tree.insertAsRight(tree.root.left, 5)
    expect(tree.isFull()).toBeFalsy()
    tree.insertAsLeft(tree.root.right, 6)
    tree.insertAsRight(tree.root.right, 7)
    expect(tree.isFull()).toBeTruthy()
  })
  test('BinaryTree complete 0', () => {
    //     2
    //  1     3
    // 4 5   6 7
    let tree = new BinaryTree()
    expect(tree.isComplete()).toBeTruthy()
    tree.root = tree.createBTNode(2)
    expect(tree.isComplete()).toBeTruthy()
    tree.insertAsLeft(tree.root, 1)
    // expect(tree.height()).toBe(2)
    expect(tree.isComplete()).toBeTruthy()
    tree.insertAsRight(tree.root, 3)
    expect(tree.isComplete()).toBeTruthy()
  })
  test('BinaryTree complete 2', () => {
    //     2
    //  1     3
    // 4 5
    let tree = new BinaryTree()
    tree.root = tree.createBTNode(2)
    tree.insertAsLeft(tree.root, 1)
    tree.insertAsRight(tree.root, 3)
    tree.insertAsLeft(tree.root.left, 4)
    expect(tree.isComplete()).toBeTruthy()
    tree.insertAsRight(tree.root.left, 5)
    expect(tree.isComplete()).toBeTruthy()
  })
  test('BinaryTree complete 3', () => {
    //     2
    //  1     3
    // 4     6
    let tree = new BinaryTree()
    tree.root = tree.createBTNode(2)
    tree.insertAsLeft(tree.root, 1)
    tree.insertAsRight(tree.root, 3)
    tree.insertAsLeft(tree.root.left, 4)
    tree.insertAsLeft(tree.root.right, 6)
    expect(tree.isComplete()).toBeFalsy()
    tree.insertAsRight(tree.root.right, 7)
    expect(tree.isComplete()).toBeFalsy()
  })
  test('BinaryTree complete 4', () => {
    //     2
    //  1     3
    //       6 7
    let tree = new BinaryTree()
    tree.root = tree.createBTNode(2)
    tree.insertAsLeft(tree.root, 1)
    tree.insertAsRight(tree.root, 3)
    // tree.insertAsLeft(tree.root.left, 4)
    tree.insertAsLeft(tree.root.right, 6)
    expect(tree.isComplete()).toBeFalsy()
    tree.insertAsRight(tree.root.right, 7)
    expect(tree.isComplete()).toBeFalsy()
  })
  test('BinaryTree complete 5', () => {
    //       2
    //   1     3
    //  4     6 7
    // 5 6
    let tree = new BinaryTree()
    tree.root = tree.createBTNode(2)
    tree.insertAsLeft(tree.root, 1)
    tree.insertAsRight(tree.root, 3)
    tree.insertAsLeft(tree.root.left, 4)
    tree.insertAsLeft(tree.root.left.left, 5)
    tree.insertAsRight(tree.root.left.left, 6)
    tree.insertAsLeft(tree.root.right, 6)
    tree.insertAsRight(tree.root.right, 7)
    expect(tree.isComplete()).toBeFalsy()
  })
})
let obj = {
  15: {
    key: loseloseHashFn(15), // 28
    value: 15
  },
  17: {
    key: loseloseHashFn(17), // 30
    value: 17
  },
  21: {
    key: loseloseHashFn(21), // 25
    value: 21
  },
  8: {
    key: loseloseHashFn(8), // 19
    value: 8
  },
  9: {
    key: loseloseHashFn(9), // 20
    value: 9
  },
  1: {
    key: loseloseHashFn(1), // 12
    value: 1
  },
  5: {
    key: loseloseHashFn(5), // 16
    value: 5
  },
  13: {
    key: loseloseHashFn(13), // 26
    value: 13
  },
}
describe('BinarySearchTreeNode', () => {
  test('', () => {
    let node = new BinarySearchTreeNode(obj[15].key, obj[15].value)
    expect(node).toEqual({
      key: obj[15].key,
      value: obj[15].value,
      left: null,
      right: null,
      parent: null,
    })
    let node1 = new BinarySearchTreeNode(obj[8].key, obj[8].value)
    expect(node['operator<'](node1)).toBeFalsy()
    expect(node['operator>'](node1)).toBeTruthy()
    expect(node['operator==='](node1)).toBeFalsy()
    expect(node['operator!=='](node1)).toBeTruthy()
  })
})
describe('BinarySearchTree', () => {
  it('insert & search', () => {
    let tree = new BinarySearchTree()
    tree.insert(obj[15].key, obj[15].value)
    expect(tree.search(obj[15].key)).toEqual(new BinarySearchTreeNode(obj[15].key, obj[15].value))
    tree.insert(obj[8].key, obj[8].value)
    let temp = []
    tree.traverse((node) => {
      temp.push({key: node.key, value: node.value})
    })
    expect(temp).toEqual([
      { key: 19, value: 8 },
      { key: 28, value: 15 },
    ])
    expect(tree.insert(obj[8].key, obj[8].value)).toEqual(new Error('has exist'))
  })
  it('remove', () => {
    let tree = new BinarySearchTree()
    af(Object.values(obj)).forEach(({key: k, value: v}) => {
      tree.insert(k, v)
    })
    tree.remove(20)
    let temp = []
    tree.traverse((node) => {
      temp.push({key: node.key, value: node.value})
    })
    expect(temp).toEqual([
      { key: 12, value: 1 },
      { key: 16, value: 5 },
      { key: 19, value: 8 },
      // { key: 20, value: 9 },
      { key: 25, value: 21 },
      { key: 26, value: 13 },
      { key: 28, value: 15 },
      { key: 30, value: 17 },
    ])
  })
  test.only('tallerChild', () => {
    let tree = new BinarySearchTree()
    tree.insert(15, 15)
    tree.insert(10, 10)
    tree.insert(6, 6)
    tree.insert(4, 4)
    tree.insert(28, 28)
    tree.insert(30, 30)
    tree.insert(32, 32)
    tree.insert(34, 34)
    expect(tree.tallerChild(tree.root).value).toBe(28)
    tree = new BinarySearchTree()
    tree.insert(15, 15)
    tree.insert(10, 10)
    tree.insert(6, 6)
    tree.insert(4, 4)
    tree.insert(4, 4)
    tree.insert(28, 28)
    expect(tree.tallerChild(tree.root).value).toBe(10)
  })
})
describe('AVLTree', () => {
  test('AVLTree ll', () => { 
    let tree = new AVLTree()
    expect(tree.root).toBeNull()
    expect(tree.isBalance(tree.root)).toBeTruthy()
    tree.insert(obj[15].key, obj[15].value)
    tree.insert(obj[8].key, obj[8].value)
    tree.insert(obj[5].key, obj[5].value)
    tree.insert(obj[1].key, obj[1].value)
    // console.log(tree.root)
    //   8
    //  5 15
    // 1
    let temp = []
    tree.traverse((node) => {
      temp.push({key: node.key, value: node.value})
    })
    expect(temp).toEqual([
      { key: 12, value: 1 },
      { key: 16, value: 5 },
      { key: 19, value: 8 },
      { key: 28, value: 15 },
    ])
  })
  test('AVLTree rr', () => {
    let tree = new AVLTree()
    tree.insert(obj[1].key, obj[1].value)
    tree.insert(obj[5].key, obj[5].value)
    tree.insert(obj[8].key, obj[8].value)
    tree.insert(obj[15].key, obj[15].value)
    // console.log(tree.root)
    //  5
    // 1 8
    //    15
    let temp = []
    tree.traverse((node) => {
      temp.push({key: node.key, value: node.value})
    }, 'preOrder')
    expect(temp).toEqual([
      { key: 16, value: 5 },
      { key: 12, value: 1 },
      { key: 19, value: 8 },
      { key: 28, value: 15 },
    ])
  })
  // 没找到测试双旋转的用例
  // test('AVLTree rl', () => {
  // })
  // test('AVLTree lr', () => {
  // })
  test('AVLTree remove', () => {
    let tree = new AVLTree()
    tree.insert(8, 8)
    tree.insert(4, 4)
    tree.insert(12, 12)
    tree.insert(2, 2)
    tree.insert(6, 6)
    // tree.insert(10, 10)
    tree.insert(14, 14)
    tree.insert(1, 1)
    // tree.insert(3, 3)
    // tree.insert(5, 5)
    // tree.insert(7, 7)
    console.log(tree.root)
    // let temp = []
    // tree.traverse((node) => {
    //   temp.push({key: node.key, value: node.value})
    // }, 'preOrder')
    // expect(temp).toEqual([
    //   { key: 16, value: 5 },
    // ])
    // tree.traverse(() => {})
  })
})
