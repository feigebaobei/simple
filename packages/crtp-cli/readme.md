# `crtp-cli`

## overview
> 管理模板文件/目录的工具。  
> 目标：根据模板快速创建文件。  

### feature
- 初始化项目
- 初始化文件
    + 添加自定义模板文件（或目录）
    + 列出自定义模板文件（或目录）
    + 查询自定义模板文件（或目录）
    + 删除自定义模板文件（或目录）
- 内置默认配置项

## install
`npm i crtp-cli -g`

## usage
```shell
# 在指定目录创建一个指定的模板文件
crtp initFile readme.md --file ./first/readme.md
# 添加自定义的模板文件
crtp addFile first.json --file ./first/projName/package.json
# 为指定文件插入碎片
crtp insert button --file ./first/first.vue
# 添加自定义碎片
crtp addFragment mb --file ./first.cjs
```

## configuration
暂时不需要它
默认配置文件：`<root>/crtp.config.js`

## api
`<>`为必填项  
`[]`为选填项  

|command|options|value|说明|demo||version|
|-|-|-|-|-|-|-|
||-v, --Version||列出当前版本||||
|init|||生成配置文件。本质是执行`crtp initFile crtp.config.js`|||0.0.14-beta.9+|
|initFile |||以指定模板文件为模板创建文件。||||
||`<fileType>`||模板文件名||||
||--file [file...]||目标文件路径||||
||-st, --[macroSubstitution] [macroSubstitution...]||用于宏替换。用空格分开源与目标，多对替换之间用空格分割。若源与目标不成对，则忽略。|crtp initFile a.md --macroSubstitution a b c d e --   表示：把a替换为b，把c替换为d，忽略e。||v0.0.6|
||--registry [registry]|npm(default), yarn, tencent, cnpm, taobao, npmMirror, guazi|.npmrc的注册器|`crtp initFile .npmrc --registry cnpm`||0.0.9|
|addFile|||把指定文件设置为模板文件||||
||`<filename>`||模板文件名||||
||`--[file] <file>`||要成为模板文件的路径||||
|addFragment|||按指定碎片目录生成碎片文件。todo||||
|initDir|||按指定模板目录生成目录||||
||`<dirName>`||模板目录名||||
||`--dir [dir...]`||目标目录名||||
|addDir|||把指定目录设置为模板目录||||
||`<dirName>`||模板目录名||||
||`--dir <dir>`||要成为模板目录的路径||||
|list / ls|||列出所有模板文件+碎片文件||||
|isExistFile|||查询指定模板文件是否存在||||
||`<filename>`||模板文件名||||
|delFile|||删除指定模板文件。尽量不要删除内置的模板文件。||||
||`<filename>`||模板文件名||||
|delDir|||删除指定模板目录|||待开发|
|initProj||||||待完善|
||`<projName>`||||||
||--path|||||||
||--packageName|||||||
||--packageVersion|||||||
||--packageMain|||||||
||--lernaInit|||||||
||--readme|||||||
||--no|||||||
||--gitignore|||||||
||--no|||||||
|ip|||在当前目录中执行若干工程化命令|||||
||--npmrc|boolean 默认为true|是否生成 .npmrc 文件|||||
||--prettier|boolean 默认为true|是否生成.prettierignore .prettierrc.json|||||
||--readme|boolean 默认为true|是否生成 readme.md|||||
|initProject|||创建express&ts的应用||||0.0.15版本删除此功能|
||--dir|默念 ./|指定应用所在的目录|||||
||--projectName|默认 project-name|应用的名称|||||
||--start|默认 false|在创建成功后是否启动项目|||||
|insert|||在指定的文件中插入代码片段（亦称“碎片”）||||0.0.14-beta.2+ 非gamma版本有效。|
||`<fragment>`|||指定碎片||||
||--file|||指定文件||||
|addFragment|||添加自定义碎片||||0.0.14-beta.10+ 非gamma版本有效。|
||`<fragment>`|||碎片的名称||||
||--file|||指定文件。只支持`*.cjs`格式||||
|archiver|||压缩指定文件|||||
||--format||压缩文件的格式|||||
||--level|默认为9|压缩级别|||||
||--input|文件组成的数组|压缩文件的格式|||||
||--output||压缩文件名|||||

## 模板文件（或目录）
用于初始化文件。
已内置的模板文件：
- readme.md
- demo.md
- .gitignore
- vue3.vue         不使用setup语法糖的*.vue模板
- vue3Setup.vue      使用setup语法糖的*.vue模板

## 界碑说明
在内置的`vue3Setup.vue`文件中有若干注释，用于标记特定位置。在下文中称为界碑。
界碑是不能删除的。

### vue3Setup.vue
```js
<template>
    <div>MsBaseComp</div>
</template>

<script setup lang="ts">
    // utils                                        引入工具类方法
    import {
        ref,
        reactive,
        onMounted,
    } from 'vue'
    // components                                   引入组件
    // import { MsButton } from 'ms-ui'
    // check                                        引入校验方法
    // config                                       引入配置项
    // directives                                   引入指令
    // data                                         引入数据
    // hooks                                        引入钩子
    // import { useRouter } from 'vue-router'
    // type/interface                               引入类型
    // custom                                       本vue文件级的数据、方法等。
    let clog = console.log

    // defineOptions
    defineOptions({
        // name: '',                         组件名
        // inheritAttrs: false,
    })
    // directives                                   声明指令
    let props = defineProps({
        // fieldKey: {
        //     type: String,
        //     default: ''
        // },
    })
    // let emit = defineEmits(['eventName'])
    // inject                                       定义注入者
    // hooks                                        使用钩子
    // variable                                     定义变量
    // ref                                          定义响应式对象。ref/reactive
    let elementRef = ref()
    let boxR = reactive({})
    // computed                                     定义计算类对象
    // method                                       定义方法
    let init = () => {
        clog('init')
    }
    // provide                                      定义提供者
    // eventFn                                      定义事件的回调方法
    // watch                                        定义监听器。watch/watchEffect
    // lifeCircle                                   定义生命周期方法
    // exec
    onMounted(() => {
        init()
    })
    // expose
    // defineExpose({elementRef})                   暴露变量、响应式对象、计算类对象、方法、事件回调方法
</script>

<style lang="less" scoped>                          定义样式
</style>
```

### vue3.vue
```
<template>                                          使用组件
    <div>MsBaseComp</div>
</template>

<script lang="ts">
    // utils                                        引入工具类方法
    import {
        defineComponent,
        ref,
        onMounted,
    } from 'vue'
    // components                                   引入组件
    // import { MsButton } from 'ms-ui'
    // check                                        引入校验方法
    // config                                       引入配置项
    // directives                                   引入指令
    // data                                         引入数据
    // hooks                                        引入钩子
    // import { useRouter } from 'vue-router'
    // type/interface                               引入类型
    // custom                                       本vue文件级的数据、方法等。

    export default defineComponent({
        name: 'MsBaseComp',                         组件名
        // components: {                            声明组件
        //     MsButton,
        // },
        // inheritAttrs: false,
        // directives                               声明指令
        props: {
            // fieldKey: {
            //     type: String,
            //     default: '',
            // },
        },
        // emits: ['blur'],
        setup() // props, ctx                       setup方法
        {
            // inject                               定义注入者
            // hooks                                使用钩子
            // variable                             定义变量
            // let clog = console.log
            // ref                                  定义响应式对象。ref/reactive
            let elementRef = ref()
            // computed                             定义计算类对象
            // method                               定义方法
            let init = () => {
                
            }
            // provide                              定义提供者
            // eventFn                             定义事件的回调方法
            // watch                                定义监听器。watch/watchEffect
            // lifeCircle                           定义生命周期方法
            onMounted(() => {
                init()
            })
            // exec                                 在setup中执行的方法
            return {
                // variable                         输出变量
                // ref                              输出响应式对象
                elementRef,
                // computed                         输出计算类对象
                // methods                          输出方法
                // eventFn                          输出事件回调方法
            }
        }
    })
</script>

<style lang="less" scoped>                          定义样式
</style>
```

## 碎片文件

### 适用范围
目标文件中有相关界碑。

### 字段说明

```ts
interface template {
    position: 'end' // 在template内的最后插入。当前只支持'end'.
    content: string // 插入的内容
}[]
interface script {
    position: 'setup.ref' // 在setup方法内的ref界碑处追加
     | 'setup.eventFn' // 在setup方法内的eventFn界碑处追加
     | 'setup.return.ref' // 在setup方法的return内的ref界碑处追加。只在非setup语法糖时有效。
     | 'setup.return.event' // 在setup方法的return内的eventFn界碑处追加。只在非setup语法糖时有效。
    //  | 'expose' // 在setup语法糖时使用defineExpose暴露相关属性。暂时不开放。
     | 'custom' // 在custom界碑处追加。一般不要在这里写代码。
    content: string
}[]
interface style {
    position: 'end' // 在style内追加。当前只支持'end'
    content: string
}[]
interface check {
    importUtils?: {
        [k: string]: string[]
    }
    importComponents?: {
        [k: string]: string[]
    }
    type?: {
        [k: string]: string[]
    }
    components?: string[]
}
```
## 配置文件
crtp.config.cjs
当前只运行一种格式
```
module.exports = {
    assets: "./assets",                        // 模板文件的目录
    fragment: "./fragment",   // todo 未使用它  // 碎片文件的目录
    npmClient: "npm",                          // 包管理器
    grammerSugar: "setup", // setup | 非setup  // 语法糖
}
```

## [principle](https://github.com/feigebaobei/simple/blob/master/principle.md)

### 初始化项目
使用`child_process`调用`npm init -y`。现修改package.json。

### 操作模板文件
在此包的`<root>/assets/`中保存着模板文件。初始化时从此读取再写入指定位置。添加时从指定位置读取再写入此目录。

### uml
```
暂无
```

## todo
> crtp-cli中的配置从配置文件中得到后与用户设置的配置合并后再使用。
> 使用loadFile引入文件（包括配置文件）。它是generator方法。
> 配置文件  
    > 在配置文件中为指定的模板文件设置插件列表。  
    > 为指定的基本设置插件。pluginFn(content) -> contentOther  
    > 使用配置文件中指定的包管理工具  
> 可开发插件。
> 接入测试工具  
> 本项目中基于各开发类框架开发。为它们提供配置文件。或在一个目录中统一管理配置文件，或……
> 开发模块的顺序
> 支持 cli / js
> 验证配置文件是否正确  

