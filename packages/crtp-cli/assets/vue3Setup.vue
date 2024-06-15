<template>
    <div>MsBaseComp</div>
</template>

<script setup lang="ts">
    // utils
    import {
        ref,
        reactive,
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
    let clog = console.log

    defineOptions({
        // name: '',
        inheritAttrs: false,
    })
    // directives
    let props = defineProps({
        // fieldKey: {
        //     type: String,
        //     default: ''
        // },
    })
    // let emit = defineEmits(['eventName'])
    // inject
    // variable
    // ref
    let elementRef = ref()
    let boxR = reactive({})
    // computed
    // method
    let init = () => {
        clog('init')
    }
    // provide
    // event
    // watch
    // lifeCircle
    onMounted(() => {
        init()
    })
    // expose
    // defineExpose({elementRef})
</script>

<style lang="less" scoped>
</style>