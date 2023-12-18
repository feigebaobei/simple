<template>
    <div>MsBaseComp list&drawer的组件模板</div>
</template>

<script lang="ts">
    // 工具方法
    import {
        defineComponent,
        ref,
        // onMounted,
    } from 'vue'
    // 组件
    // import { MsButton } from 'ms-ui'
    // 验证
    // 配置项
    // 指令
    // 数据
    // hooks
    // import { useRouter } from 'vue-router'
    // type/interface

    export default defineComponent({
        name: 'MsBaseComp',
        // components: {
        //     MsButton,
        // },
        // directives
        // inheritAttrs: false,
        props: {
            // fieldKey: {
            //     type: String,
            //     default: '',
            // },
        },
        emits: ['blur'],
        setup() // props, ctx
        {
            // inject
            // hooks
            // variable
            // let clog = console.log
            // ref
            let elementRef = ref()
            // computed
            // provide
            // methods
            let init = () => {
                
            }
            // event fn
            // watch
            // lifeCircle
            // onMounted(() => {
            //     init()
            // })
            // exec
            return {
                // variable
                // ref
                elementRef,
                // computed
                // methods
                // event fn
            }
        }
    })
</script>

<style lang="less" scoped>
</style>