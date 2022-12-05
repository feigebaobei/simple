# plugincomb

## overview
> 只有两种插件。  
> 每种插件支持：  
    > 注册钩子及对应的方法  
    > 调用钩子对应的方法  
    > 注销钩子上所有的方法或指定的方法  
> 它与tapable是竞品关系  

### feature
- feature0
- feature1
- feature2

## install
`npm i plugincomb`

## usage
本包提供了2种插件：
- 顺序执行的 SeriesPlugin  
- 平行执行的 ParallelPlugin  
SeriesPlugin接收的参数是`{method: 'waterFall' | 'bail'}`
当参数是`{method: 'waterFall'}`时  
此插件上的第一个方法的参数是`.call()`方法传入的参数。之后方法的的第一个参数是前一个方法的该返回值。若前一方法返回undefined，则第一个参数是`.call()`方法传入的第一个参数。返回最后一个方法的返回值。  
当参数是`{method: 'bail'}`时
所有插件的参数是`.call()`方法传入的参数。按注册顺序执行方法。若其中一个方法返回undefined，则停止执行之后的方法。返回已经执行的最后一个方法的返回值。  

ParallelPlugin接收的参数是`{method: 'all' | 'allSettled'}`  
当参数是`{method: 'all'}`时  
平行执行所有方法。每个方法的参数是`.call()`方法传入的参数。返回值是所有方法都执行完后由返回值组成的数组。  
当参数是`{method: 'allSettled'}`时  
平行执行所有方法。每个方法的参数是`.call()`方法传入的参数。返回值是由`Promise.allSettled()`包裹的所有方法的返回值组成的返回值。  

```js
import {
  parallelPlugin, // 是 ParallelPlugin 的实例。
  ParallelPlugin,
  seriesPlugin, // 是 SeriesPlugin 的实例。
  SeriesPlugin
} from 'plugincomb'

// 定义方法
let fn1 = (...p) => {
    console.log('fn1 params', ...p)
}
let fn2 = (...p) => {
    console.log('fn2 params', ...p)
}
// 使用顺序插件
seriesPlugin.register('hookName', fn1)
seriesPlugin.register('hookName', fn2)
seriesPlugin.call('callHook', 'a', 'b')
seriesPlugin.logout('hookName', fn1) // 注销hookName钩子上的fn1方法。这是非等幂操作。
seriesPlugin.call('callHook', 'a', 'b') // 应该只执行fn2
seriesPlugin.logout('hookName') // 注销hookName钩子上的所有方法

// 定义方法
let fn3 = (...p) => {
    setTimeout(() => {
        fn1(...p)
    }, 2000)
}
let fn4 = (...p) => {
    setTimeout(() => {
        fn1(...p)
    }, 1000)
}
// 使用平行插件
parallelPlugin.register('hookName', fn3)
parallelPlugin.register('hookName', fn4)
parallelPlugin.call('callHook', 'a', 'b')
parallelPlugin.logout('hookName', fn3) // 注销hookName钩子上的fn1方法。这是非等幂操作。
parallelPlugin.call('callHook', 'a', 'b') // 应该只执行fn4
parallelPlugin.logout('hookName') // 注销hookName钩子上的所有方法
```

||插件种类|参数|说明||||
|-|-|-|-||||
|SeriesPlugin|顺序插件|{method: 'waterFall'}||默认值|||
|||{method: 'bail'}|||||
|ParallelPlugin|平行插件|{method: 'all'}||默认值|||
|||{method: 'allSettled'}|||||

## api
<!-- prettier-ignore-start -->
|方法|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|
|`register(hookName: string, fn: Function) => void`|给当前插件注册方法|||||||
|`logout: (hookName: string, fn?: Function) => void`|给当前插件注销指定的方法或所有方法|||||||
|`call(hookName: string, ...p: any[]) => Promise<any>`|执行当前插件上的所有方法，参数是...p|||||||
|`getAllHookName: () => string[]`|返回当前插件上的钩子的名字组成的数组|||||||
|`getRegistrant: (hookName: string) => Function[] | undefined`|返回当前插件上的指定钩子上的方法|||||||
<!-- prettier-ignore-end -->
顺序插件与平行插件的api相同，执行方法的顺序、参数不同。  

## principle
hook包  
缓存hookName对应的方法  
register(fn)  
call(...p)  
logout(fn?)  

SeriesPlugin/ParallelPlugin是基于BasicPlugin的
分别实现call方法  
在BasicPlugin上实例化一个Hooks类。在该实例上缓存方法。  
_hookMap属性上设置hookName对应的Hooks实例。  
register(hookName, fn)  
call(hookName, ...p)  
logout(hookName, fn?)  

index.js  
输出SeriesPlugin/ParallelPlugin及它们的实例。

### uml
```
          hook -------------> plugin ---------> index.js
        缓存钩子对应的方法     (SeriesPlugin)       统一输出
                            (ParallelPlugin)
```

## 本地运行
1. git clone xxxx  
2. 安装依赖。需要全局安装rollup  
3. 打包 npm run r  
4. 测试 npm run t  

## 灵活 & 危险
method属性是放在原型对象上的。  
不提供改变此属性的方法，也不冻结此属性。  
不冻结会有危险的极端情况。由使用者解决该极端情况。  
该包提供了一个工作方法`basicPlugin.freeseMethod()`可以冻结。需要手动调用。  

## todo
> 引入jest,并测试。使用bdd+tdd。  
> 一库多包会更好。准备引入lerna  
> 
