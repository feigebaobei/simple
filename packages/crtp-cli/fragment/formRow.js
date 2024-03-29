let obj = {
    template: [{
        position: "end",
        content: `<ms-form :label-placement="'left'" :label-width="'auto'" :model="formR.model" :rules="forms.rules">
        <ms-row :gutter="24">
        <ms-col :span="8">
            <ms-form-item label="one" path="one">
                <ms-input v-model:value="form.model.one" clearable placeholder="请输入" />
            </ms-form-item>
        </ms-col>
        <ms-col :span="8">
            <ms-form-item label="two">
                <ms-input v-model:value="form.model.two" clearable placeholder="请输入" />
            </ms-form-item>
        </ms-col>
        <ms-col :span="8">
            <ms-form-item label="three">
                <ms-select v-model:value="form.model.three" clearable :options="form.model.greyTagOptions" />
            </ms-form-item>
        </ms-col>
        <ms-col :span="24">
            <ms-space :size="8">
            <ms-button type="primary" @click="searchButtonClickH">查询</ms-button>
            <ms-button @click="resetButtonClickH">重置</ms-button>
            </ms-space>
        </ms-col>
        </ms-row>
        </ms-form>`
    }],
    script: [
        {
            position: "setup.ref",
            content: `let formRef = ref<FormInst | null>(null);
            let formR = reactive({
                model: {
                    one: null,
                    two: null,
                    three: null,
                    oneDefault: null,
                    twoDefault: null,
                    threeDefault: null,
                    greyTagOptions: [
                        { label: 'one', value: 'one' },
                        { label: 'two', value: 'two' },
                        { label: 'three', value: 'three' },
                    ],
                },
                rules: {
                    one: {
                        required: true,
                        message: '请输入',
                        trigger: ['input', 'blur'],
                    }
                },
            })`
        },
        {
            position: 'setup.methods',
            content: `let resetForm = () => {
                formR.model.one = formR.model.oneDefault
                formR.model.two = formR.model.twoDefault
                formR.model.three = formR.model.threeDefault
            }`
        },
        {
            position: "setup.event",
            content: `let searchButtonClickH = () => {
                console.log('searchButtonClickH')
            }
            let resetButtonClickH = () => {
                console.log('resetButtonClickH')
                resetForm()
            }`
        },
        {
            position: "setup.return.ref",
            content: `formRef,
            formR,`
        },
        {
            position: "setup.return.event",
            content: `searchButtonClickH,
            resetButtonClickH,`
        },
    ],
    style: [],
    check: {
        importUtils: {
            vue: ['ref', "reactive"],
        },
        importComponents: {
            'ms-ui': ['MsForm', 'MsRow', 'MsFormItem', 'MsCol', 'MsInput', 'MsSelect', 'MsSpace', 'MsButton', ],
        },
        type: {
            'ms-ui': ['FormInst'],
        },
        components: ['MsForm', 'MsRow', 'MsFormItem', 'MsCol', 'MsInput', 'MsSelect', 'MsSpace', 'MsButton', ],
    }
}
module.exports = obj