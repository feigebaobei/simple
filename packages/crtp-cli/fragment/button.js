let obj = {
    template: [{
        position: "end",
        content: `<ms-button @click="xxxButtonClickHandler">xxxButton</ms-button>
`
    }],
    script: [
        {
            position: "setup.eventFn",
            content: `let xxxButtonClickHandler = () => {
                console.log('xxxButtonClickHandler')
            }
`
        },
        {
            position: "setup.return.eventFn",
            content: `xxxButtonClickHandler,`
        },
        // {
        //     position: "expose", // 当前不支持
        //     content: `xxxButtonClickHandler,`
        // },
    ],
    style: [],
    check: {
        // 暂时开放2个
        importComponents: {
            'ms-ui': ["MsButton"],
        },
        components: ["MsButton"],
    }
}
module.exports = obj