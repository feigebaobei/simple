<template>
    <div>MsBaseComp</div>
</template>

<script lang="ts">
    // utils
    import {
        defineComponent,
        ref,
        onMounted,
    } from 'vue'
    // components
    // import { MsButton } from 'ms-ui'
    // check
    // config
    // directives
    // data
    // hooks
    // import { useRouter } from 'vue-router'
    // type/interface
    // custom

    export default defineComponent({
        name: 'MsBaseComp',
        // components: {
        //     MsButton,
        // },
        // inheritAttrs: false,
        // directives
        props: {
            // fieldKey: {
            //     type: String,
            //     default: '',
            // },
        },
        // emits: ['blur'],
        setup() // props, ctx
        {
            // inject
            // hooks
            // variable
            // let clog = console.log
            // ref
            let elementRef = ref()
            // computed
            // method
            let init = () => {
                
            }
            // provide
            // eventFn
            // watch
            // lifeCircle
            onMounted(() => {
                init()
            })
            // exec
            return {
                // variable
                // ref
                elementRef,
                // computed
                // method
                // eventFn
            }
        }
    })
</script>

<style lang="less" scoped>
</style>