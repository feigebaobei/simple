let obj = {
    template: [{
        position: "end",
        content: `<ms-form
            ref="formRef"
            :label-placement="'left'"
            :label-width="'auto'"
            :model="formR.model"
            :rules="formR.rules"
        >
            <ms-grid :cols="4" :x-gap="24">
                <ms-form-item-gi label="年龄">
                    <ms-input v-model:value="formR.model.age" />
                </ms-form-item-gi>
                <ms-form-item-gi label="姓名">
                    <ms-input v-model:value="formR.model.name" />
                </ms-form-item-gi>
                <ms-form-item-gi label="特长">
                    <ms-select
                        v-model:value="formR.model.strongPoint"
                        :options="formR.model.strongPointList"
                    />
                </ms-form-item-gi>
                <ms-grid-item>
                    <ms-space justify="start" :size="8">
                        <ms-button type="primary" @click="sqlButtonClickHandler">查询</ms-button>
                        <ms-button @click="resetButtonClickHandler">重置</ms-button>
                    </ms-space>
                </ms-grid-item>
            </ms-grid>
        </ms-form>`
    }],
    script: [
        {
            position: "setup.ref",
            content: `let formRef = ref<FormInst | null>(null);
            let formR = reactive({
                model: {
                    age: null,
                    name: null,
                    strongPoint: null,
                    strongPointList: [
                        { label: '抒情诗', value: 1 },
                        { label: '辩论', value: 11 },
                        { label: '好吃', value: 21 },
                    ],
                },
                rules: {},
            })`
        },
        {
            position: "setup.eventFn",
            content: `let sqlButtonClickHandler = () => {
                console.log('sqlButtonClickHandler', formR)
                // reqData()
            }
            let resetButtonClickHandler = () => {
                console.log('resetButtonClickHandler')
            }
`
        },
        {
            position: "setup.return.ref",
            content: `formRef,
            formR,`
        },
        {
            position: "setup.return.eventFn",
            content: `sqlButtonClickHandler,
            resetButtonClickHandler,`
        },
    ],
    style: [],
    check: {
        importUtils: {
            vue: ['ref', "reactive"],
        },
        importComponents: {
            'ms-ui': ['MsForm', 'MsGrid', 'MsFormItemGi', 'MsInput', 'MsSelect', 'MsGridItem', 'MsSpace', 'MsButton', ],
        },
        type: {
            'ms-ui': ['FormInst'],
        },
        components: ['MsForm', 'MsGrid', 'MsFormItemGi', 'MsInput', 'MsSelect', 'MsGridItem', 'MsSpace', 'MsButton', ],
    }
}
module.exports = obj