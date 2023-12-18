<template>
    <ms-card :bordered="false" class="proCard">
        <ms-form
            ref=formRef
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
        </ms-form>
        <ms-data-table
            :columns=tableR.columns
            :data=tableR.dataSource
            :single-line="false"
            striped
            :scroll-x="1000"
        >
        </ms-data-table>
        <div class="footer-pagination" v-if="tableR.dataSource.length">
            <ms-pagination
                v-model:page="tableR.pagination.page"
                :page-count="tableR.pagination.pageCount"
                v-model:page-size="tableR.pagination.pageSize"
                size="medium"
                show-quick-jumper
                show-size-picker
                :page-sizes="tableR.pagination.pageSizes"
                :on-update:page="(page) => servePageChangeHandler(page)"
                :on-update:page-size="(pageSize) => servePageSizeChangeHandler(pageSize)"
            >
            </ms-pagination>
        </div>
    </ms-card>
</template>

<script lang="ts">
    // 工具方法
    import {
        defineComponent,
        ref,
        reactive,
        onMounted,
        h,
        watchEffect,
    } from 'vue'
    // 组件
    import { 
        MsCard,
        MsForm,
        MsInput,
        MsSelect,
        MsDataTable,
        MsPagination,
        MsPopconfirm,
        MsGrid,
        MsFormItemGi,
        MsGridItem,
        MsButton,
        MsSpace,
    } from 'ms-ui'
    // 验证
    // 配置项
    // 指令
    // 数据
    // hooks
    // import { useRouter } from 'vue-router'
    // type/interface
    import type { DataTableColumn, FormInst } from 'ms-ui'

    type N = number;
    type S = string;
    type B = boolean;
    interface TableItem {
        age: N;
        name: S;
        strongPoint: S;
    }
    interface Pagination {
        page: N;
        pageDefault: N;
        pageSize: N;
        pageSizeDefault?: N;
        showSizePicker?: B;
        pageSizes?: N[];
        pageCount?: N;
        total?: N;
        onChange?: (page: N) => void;
        onUpdatePageSize?: (pageSize: N) => void;
    }

    const PAGESIZES = [10, 20, 50, 100];

    export default defineComponent({
        name: 'MsSqlList',
        components: {
            MsCard,
            MsForm,
            MsInput,
            MsSelect,
            MsDataTable,
            MsPagination,
            MsGrid,
            MsFormItemGi,
            MsGridItem,
            MsButton,
            MsSpace,
        },
        // directives
        // inheritAttrs: false,
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
            let clog = console.log
            // ref
            let formRef = ref<FormInst | null>(null)
            let formR = reactive({
                model: {
                    age: null,
                    name: null,
                    strongPoint: null,
                    strongPointList: [
                        {label: '抒情诗', value: 1},
                        {label: '辩论', value: 11},
                        {label: '好吃', value: 21},
                    ],
                },
                rules: {},
            })
            let tableR = reactive<{
                columns: DataTableColumn[];
                dataSource: TableItem[];
                pagination: Pagination;
            }>({
                columns: [
                    {
                        title: '年龄',
                        key: 'age',
                    },
                    {
                        title: '姓名',
                        key: 'name',
                        fixed: 'left',
                    },
                    {
                        title: '特长',
                        key: 'strongPoint',
                    },
                    {
                        title: '操作',
                        width: 140,
                        fixed: 'right',
                        key: 'operate',
                        render(row, index) {
                            return h(MsSpace, null, {
                                default: () => [
                                    h(
                                        MsButton,
                                        {
                                            text: true,
                                            type: 'primary',
                                            onClick: () => {
                                                tableEditButtonClickHandler(row)
                                            },
                                        },
                                        {
                                            default: () => '编辑',
                                        }
                                    ),
                                    h(
                                        MsPopconfirm,
                                        {
                                            showIcon: false,
                                            show: showR[index],
                                            onNegativeClick: () => {
                                                showR[index] = false;
                                            },
                                            onPositionClick: () => {
                                                show[index] = false;
                                                confirmOkButtonClickHandler(row)
                                            }
                                        },
                                        {
                                            default: () => h('span', '确定要删除吗？'),
                                            trigger: () => 
                                                h(
                                                    MsButton,
                                                    {
                                                        text: true,
                                                        type: 'primary',
                                                        onClick: () => {
                                                            onlyOpenPopConfirm(index);
                                                        },
                                                    },
                                                    {
                                                        default: () => '删除',
                                                    }
                                                )
                                        }
                                    )
                                ]
                            })
                        }
                    },
                ],
                dataSource: [
                    { age: 13, name: '婉儿', strongPoint: '抒情诗' },
                    { age: 12, name: '甘罗', strongPoint: '辩论' },
                    { age: 21, name: '苏轼', strongPoint: '好吃' },
                ],
                pagination: {
                    page: 1,
                    pageDefault: 1,
                    pageSize: 10,
                    pageSizeDefault: 10,
                    showSizePicker: true,
                    pageSizes: PAGESIZES,
                    pageCount: 1,
                    total: 1,
                    // onChange: (page: N) => {
                    //     tableR.pagination.page = page;
                    // },
                    // onUpdatePageSize: (pageSize: N) => {
                    //     tableR.pagination.page = 1;
                    //     tableR.pagination.pageSize = pageSize;
                    // },
                }
            })
            let showR = reactive({})
            // computed
            // provide
            // methods
            let init = () => {
                reqData()
            }
            let reqData = () => {
                // 调用接口
            }
            // event fn
            let onlyOpenPopConfirm = (index: N) => {
                Object.keys(showR).forEach((k, i) => {
                    if (i === index) {
                        showR[k] = true;
                    } else {
                        showR[k] = false;
                    }
                })
            }
            let sqlButtonClickHandler = () => {
                clog('sqlButtonClickHandler')
                reqData()
            }
            let resetButtonClickHandler = () => {
                clog('resetButtonClickHandler')
            }
            let servePageChangeHandler = (curPage: N) => {
                clog('servePageChangeHandler')
                tableR.pagination.page = curPage
                reqData()
            }
            let servePageSizeChangeHandler = (curPageSize: N) => {
                clog('servePageSizeChangeHandler')
                tableR.pagination.page = 1;
                tableR.pagination.pageSize = curPageSize;
                reqData()
            }
            let confirmOkButtonClickHandler = (row: TableItem) => {
                clog('confirmOkButtonClickHandler', row)
            }
            let tableEditButtonClickHandler = (row: TableItem) => {
                clog('tableEditButtonClickHandler', row)
            }
            // watch
            watchEffect(() => {
                let n = tableR.pagination.pageSize;
                for (let i = 0; i < n; i++) {
                    showR[i] = false;
                }
            })
            watchEffect(() => {
                let n = tableR.pagination.page;
                for (let i = 0; i < n; i++) {
                    showR[i] = false;
                }
            })
            // lifeCircle
            onMounted(() => {
                init()
            })
            // exec
            return {
                // variable
                // ref
                formRef,
                formR,
                tableR,
                // computed
                // methods
                // event fn
                sqlButtonClickHandler,
                resetButtonClickHandler,
                servePageChangeHandler,
                servePageSizeChangeHandler,
            }
        }
    })
</script>

<style lang="less" scoped>
    .proCard {
        // 
    }
    .footer-pagination {
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;
    }
</style>