<template>
    <div class="app-container">
        <!--工具条-->
        <el-row>
            <el-col :span="24" class="toolbar">
                <el-form :inline="true" :model="filters">
                    <el-form-item label="支出类型">
                        <sd-param-select v-model="filters.exType" query-url="" type-code="exType"></sd-param-select>
                    </el-form-item>
                    <el-form-item style="margin-left: 20px;">
                        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <!--工具条结束-->

        <!--列表开始-->
        <el-table :data="pagination.content" :height="heightNum" v-loading="isLoading" highlight-current-row border stripe>
            <el-table-column type="index" label="NO" width="80" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip label="支出类型" min-width="200">
                <template slot-scope="scope">
                    {{scope.row.exType | paramCode2ParamCname("exType")}}
                </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="homeownerContractId" label="房源合同号" min-width="200"></el-table-column>
            <el-table-column show-overflow-tooltip prop="price" label="金额" min-width="100"></el-table-column>
            <el-table-column show-overflow-tooltip label="结算方式" min-width="100">
                <template slot-scope="scope">
                    {{scope.row.settleMethod | paramCode2ParamCname("settleMethod")}}
                </template>
            </el-table-column>
            <el-table-column label="支出时间" width="200">
                <template slot-scope="scope">
                    {{ scope.row.createTime | china2Local}}
                </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="isConfirm" label="是否确认" min-width="100">
                <template slot-scope="scope">
                    {{ scope.row.isConfirm | paramCode2ParamCname("yesOrNo")}}
                </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="description" label="备注" min-width="300"></el-table-column>

            <el-table-column label="" width="200" fixed="right">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleExit(scope.row)">确认支出</el-button>
                    <el-button type="danger" size="mini" icon="el-icon-delete" plain @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--列表结束-->

        <!--分页开始-->
        <div class="pagination" v-if='pagination.totalElements > 0'>
            <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
                           @current-change="handleCurrentChange" :current-page.sync="pagination.page"
                           :page-size="size" :page-sizes="[10, 20, 50, 100]"
                           :total="pagination.totalElements" :disabled="isLoading">
            </el-pagination>
        </div>
        <!--分页结束-->

    </div>
</template>
<script>
    import http from '../../axios/http';

    export default {
        name: 'expenditure',
        data() {
            return {
                heightNum: 0,
                filters: {
                    exType:''
                },
                pagination: {
                    totalElements: 0,
                    page: 1,
                    content: []
                },
                size: 20,
                isLoading: false
            }
        },
        methods: {
            // 执行搜索
            handleSearch() {
                this.handleCurrentChange(1);
            },
            // 切换每页条数
            handleSizeChange(val) {
                this.size = val;
                this.loadPagination();
            },
            // 切换页码
            handleCurrentChange(val) {
                console.log('this.pagination.page:' + val);
                this.pagination.page = val;
                this.loadPagination();
            },
            // 加载数据
            loadPagination() {
                let params = {
                    page: this.pagination.page === 0 ? 1 : this.pagination.page,
                    size: this.size === 0 ? 20 : this.size
                };
                if(this.filters.exType){
                    params['exType']=this.filters.exType;
                }
                this.isLoading = true;
                // console.log(params);
                http.post("v1.0.0/expen/expenPage", params).then(response => {
                    if(response.code==200){
                        this.isLoading = false;
                        this.pagination = response.data;
                    }else{
                        this.$message.error(response.msg);
                    }
                });
            },

            //确认支出
            handleExit(row){
                if(row.id){
                    this.$confirm('是否确认这项支出？', '提示', {
                        type: 'warning'
                    }).then(() => {
                        let params ={
                            id:row.id
                        }
                        http.get("v1.0.0/expen/isConfrim", {params: params}).then(response => {
                            if(response.code == 200){
                                this.$message.success(response.msg);
                                this.loadPagination();
                            }else{
                                this.$message.error(response.msg);
                            }
                        });
                    })
                }



            },

            //执行删除
            handleDelete(row){
                if(row.id){
                    this.$confirm('确认删除？', '提示', {
                        type: 'warning'
                    }).then(() => {
                        let params ={
                            id:row.id
                        }
                        http.get("v1.0.0/expen/deleteExpen", {params: params}).then(response => {
                            if(response.code == 200){
                                this.$message.success(response.msg);
                                this.loadPagination();
                            }else{
                                this.$message.error(response.msg);
                            }
                        });
                    })
                }
            },

            // 计算表格高度
            initData(){
                let self = this;
                // 2.0版本特殊处理
                setTimeout(function () {
                    self.heightNum = self.utils.calcTableHeight();
                },10);
                // 响应窗口大小改变
                window.onresize = function () {
                    self.heightNum = self.utils.calcTableHeight();
                };
            }
        },
        mounted() {
            this.initData();
            this.loadPagination();
        }
    }
</script>
<style>
</style>
