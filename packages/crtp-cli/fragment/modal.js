let obj = {
    // 暂时只支持position: "end".content的值可以是任意值。
    template: [{
        position: "end",
        content: `<ms-drawer v-model:show="drawerR.visible" :width="502">
    <ms-drawer-content class="drawerContent" :body-style="{backgroundColor: '#F7F5FA'}">
        <p class="creatServiceTitle">{{ drawerR.title }}</p>
        <ms-card :bordered="false" class="createServiceCard">
            <p>placeholder</p>
        </ms-card>
    </ms-drawer-content>
    <template #footer>
        <ms-space justify="end" :size="8">
            <ms-button @click="drawerCancelButtonClickH">关闭</ms-button>
            <ms-button type="primary" @click="drawerOkButtonClickH">确定</ms-button>
        </ms-space>
    </template>
    </ms-drawer>`
    }],
    script: [
        // position的值只有几种。是枚举的。
        {
            position: "setup.ref",
            content: `let drawerR = reactive({
                visible: false,
                title: 'title',
            })
`
        },
        {
            position: "setup.return.ref",
            content: `drawerR,`
        },
        {
            position: "setup.eventFn",
            content: `let drawerCancelButtonClickH = () => {}
            let drawerOkButtonClickH = () => {}
`
        },
        {
            position: "setup.return.eventFn",
            content: `drawerCancelButtonClickH,
                drawerOkButtonClickH,`
        },
    ],
    style: [{
        position: 'end',
        content: `\t.creatServiceTitle {
        color: red;
    }`,
    }],
    check: {
        importUtils: {
            vue: ["reactive"],
        },
        importComponents: {
            'ms-ui': ["MsDrawer", "MsDrawerContent", "MsCard", "MsSpace", "MsButton"],
        },
        components: ["MsDrawer", "MsDrawerContent", "MsCard", "MsSpace", "MsButton"],
    }
}
module.exports = obj