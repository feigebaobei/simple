let obj = {
    template: [{
        position: "end",
        content: `<ms-button @click="xxxButtonClickHandler">xxxButton</ms-button>`
    }],
    script: [
        {
            position: "setup.event",
            content: `let xxxButtonClickHandler = () => {
                console.log('xxxButtonClickHandler')
            }
`
        },
        // {
        //     position: "setup.return.event",
        //     content: `xxxButtonClickHandler,`
        // },
        // {
        //     position: "expose",
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