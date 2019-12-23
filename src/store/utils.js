/**
 * Created by lixianzhang on 2017/7/17.
 */

const utils = {
    install(Vue) {
        Vue.prototype.utils = {
            /* 公共方法 */
            // 计算表格高度
            calcTableHeight() {
                // console.log("calcTableHeight");
                // 窗口 高度
                let clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
                // console.log("clientHeight:" + clientHeight);

                // toolbar 高度
                let toolBarHeight = 0;
                let toolbarNum = document.getElementsByClassName("toolbar").length;
                if (toolbarNum && toolbarNum > 0) {
                    for (let i = 0; i < toolbarNum; i++) {
                        toolBarHeight += document.getElementsByClassName("toolbar")[i].offsetHeight;
                    }
                }
                // console.log("toolBarHeight:" + toolBarHeight);

                // 可用于显示表格的高度
                // 表格可用高度 = 浏览器窗口可视高度 - 顶部levelbar高度40 - 头部toolbar高度 - 底部页码栏40 - 空余高度20
                let tableHeight = clientHeight - 40 - toolBarHeight - 40 - 20;

                // 表格每一行高度,默认40
                let tableCellHeight = 40;
                if (document.getElementsByClassName("el-table__row")[0]){
                    tableCellHeight = document.getElementsByClassName("el-table__row")[0].offsetHeight;
                }
                // console.log("tableCellHeight:" + tableCellHeight);

                // 处理表格高度为单元格高度整数倍
                if (tableHeight % tableCellHeight !== 0) {
                    tableHeight = tableHeight - tableHeight % tableCellHeight;
                }
                // console.log("tableHeight:" + tableHeight);

                return tableHeight;
            },
        }
    }
};

export default utils;
