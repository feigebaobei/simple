# data-footstone

## overview

> 使用 ts 编写基本的数据结构。  
> 0.1.x-版本中 api 变动较大，使用时请锁定版本号。

### feature

- stack
- queue
- hashMap
- tree
- ……
- graph 简单

## install

`npm i data-footstone`

## usage

```js
import { Stack } from 'data-footstone'
let s = new Stack()
s.push(1, 2, 3, 4)
s.toArray() // [1,2,3,4]
s.pop() // 4
s.pop() // 3
s.peek() // 2
s.isEmpty() // false
s.clear() // 清空栈
```

## api

详见[官网](https://lixiaodan.netlify.app/jspackages/data-footstone)
