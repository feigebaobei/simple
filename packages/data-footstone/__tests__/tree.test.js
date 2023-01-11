import {
    // BaseTree, 
    BinarySearchTree, AVLTree, RedBackTree 
  } from '../src/tree'
  
  describe('BinarySearchTree', () => {
    it('BinarySearchTree', () => {
      let t = new BinarySearchTree()
      expect(t.createNode(5)).toEqual({value: 5, left: null, right: null})
      t.insert(5)
      t.insert(3)
      t.insert(4)
      t.insert(2)
      expect(t.root).toEqual({value: 5, left: {
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
          }
        }, right: null})
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
            right: null
        },
        right: {
            value: 6,
            left: null,
            right: null,
        }
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
        }
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
        }
      })
      t.remove(7) // 有0个节点
      expect(t.root).toEqual({
        value: 5,
        left: {
            value: 2,
            left: null,
            right: null,
        },
        right: null
      })
    })
  })
  