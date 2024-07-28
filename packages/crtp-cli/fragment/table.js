let obj = {
    template: [{
        position: "end",
        content: `<ms-data-table
        :columns="tableR.columns"
        :data="tableR.dataSource"
        :single-line="false"
        striped
        :scroll-x="1000"
        />
        <div class="footer-pagination" v-if="tableR.dataSource.length">
            <ms-pagination
                v-model:page="tableR.pagination.page"
                :page-count="tableR.pagination.page"
                v-model:page-size="tableR.pagination.pageSize"
                size="medium"
                show-quick-jumper
                show-size-picker
                :page-sizes="tableR.pagination.pageSizes"
                :on-update:page="(page) => servePageChangeHandler(page)"
                :on-update:page-size="(pageSize) => servePageSizeChangeHandler(pageSize)"
            />
        </div>`
    }],
    script: [
        {
            position: "setup.ref",
            content: `let tableR = reactive<{
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
                        key: 'operator',
                        render(row, index) {
                            return h(MsSpace, null, {
                                default: () => [
                                    h(MsButton, {
                                        text: true,
                                        type: 'primary',
                                        onClick: () => {
                                            tableEditButtonClickHandler(row)
                                        }
                                    }, {
                                        default: () => '编辑'
                                    }),
                                    h(MsPopconfirm, {
                                        showIcon: false,
                                        show: showR[index],
                                        onNegativeClick: () => {
                                            showR[index] = false;
                                        },
                                        onPositiveClick: () => {
                                            showR[index] = false;
                                            confirmOkButtonClickHandler(row)
                                        }
                                    }, {
                                        default: () => h('span', '确定要删除吗？'),
                                        trigger: () => h(MsButton, {
                                            text: true,
                                            type: 'primary',
                                            onClick: () => {
                                                onlyOpenPopconfirm(index)
                                            }
                                        }, {
                                            default: () => '删除',
                                        })
                                    })
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
                    onChange: (page: number) => {
                        tableR.pagination.page = page;
                    },
                    onUpdatePageSize: (pageSize: number) => {
                        tableR.pagination.page = 1;
                        tableR.pagination.pageSize = pageSize;
                    },
                },
            })
            const showR = reactive({})`
        },
        {
            position: 'setup.method',
            content: `
            const reqData = () => {
                // 调用接口
                tableR.dataSource.forEach((_item, index) => {
                    showR[index] = false;
                })
            }
            const onlyOpenPopconfirm = (index) => {
                Object.keys(showR).forEach((k, i) => {
                    if (i === index) {
                        showR[k] = true;
                    } else {
                        showR[k] = false;
                    }
                })
            };
`
        },
        {
            position: "setup.eventFn",
            content: `
            const servePageChangeHandler = (curPage: number) => {
                tableR.pagination.page = curPage;
                reqData();
            };
            const servePageSizeChangeHandler = (curPageSize: number) => {
                tableR.pagination.page = 1;
                tableR.pagination.pageSize = curPageSize;
                reqData()
            }
            const tableEditButtonClickHandler = (row: TableItem) => {
                console.log('row', row);
                // drawerR.visible = true;
            }
            const confirmOkButtonClickHandler = (row: TableItem) => {
                console.log('row', row);
                // drawerR.visible = false;
            }
`
        },
        {
            position: "setup.return.ref",
            content: `tableR,`
        },
        {
            position: "setup.return.eventFn",
            content: `servePageChangeHandler,
                servePageSizeChangeHandler,`
        },
        {
            position: 'custom',
            content: `const PAGESIZES = [10, 20, 50, 100];
            interface TableItem {
                age: number;
                name: string;
                strongPoint: string;
            }
            interface Pagination {
                page: number;
                pageDefault: number;
                pageSize: number;
                pageSizeDefault?: number;
                showSizePicker?: boolean;
                pageSizes?: number[];
                pageCount?: number;
                total?: number;
                onChange?: (page: number) => void;
                onUpdatePageSize?: (page: number) => void;
            }
            `
        }
    ],
    style: [{
        position: 'end',
        content: `.footer-pagination {
            padding: 8px;
            display: flex;
            justify-content: flex-end;
        }`
    }],
    check: {
        importUtils: {
            vue: ["reactive", 'h'],
        },
        importComponents: {
            'ms-ui': ["MsDataTable", "MsPagination", "MsSpace", "MsButton", "MsPopconfirm"],
        },
        type: {
            'ms-ui': ['DataTableColumn'],
        },
        components: ["MsDataTable", "MsPagination"],
    },
    tips: [
        {
            message: '请在init()中执行reqData()',
            level: 'warning',
        }
    ]
}
module.exports = obj