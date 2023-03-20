<template>
  <div>CaBaseCars</div>
</template>

<script lang="ts">
// 工具方法
import { defineComponent, onMounted, computed, ref } from "vue";
// 组件
// import CaInputNumber from '../../InputNumber/src/index.vue';
// import CaIcon from '@/packages/Icon/src/index.vue';
// 验证
// type/interface
import type { PropType } from 'vue'
// 配置项
// 指令
// 数据
let clog = console.log

export default defineComponent({
  name: "CaBaseCars",
  // components: {
  //   CaIcon
  //   CaInputNumber,
  // },
  // directives
  // inheritAttrs: false,
  props: {
    k: {
      type: String,
      default: "",
    },
  },
  // emits: ['blur'],
  setup(props, ctx) {
    // inject
    // variable
    // ref
    let elementRef = ref();
    // computed
    // provide
    // methods
    // evnet fn
    // watch
    // lifeCircle
    // onMounted(() => {
    //   console.log("mounted");
    // });
    // exec
    return {
      // variable
      // ref
      elementRef,
      // computed
      // methods
      // evnet fn
    };
  },
});
</script>

<style lang="scss" scoped>

</style>