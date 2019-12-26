<template>
    <div class="app-container">
        <!--工具条-->
        <el-row>
            <el-col :span="24" class="toolbar">
                <el-form :inline="true" :model="filters">

                    <el-form-item label="公司名称">
                        <el-input v-model="filters.companyName" placeholder="提示"></el-input>
                    </el-form-item>
                    <el-form-item style="margin-left: 20px;">
                        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                        <el-button type="success" icon="el-icon-plus" @click="handleAdd" :disabled="isLoading">添加</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <!--工具条结束-->

        <!--列表开始-->
        <el-table :data="pagination.content" :height="heightNum" v-loading="isLoading" highlight-current-row border stripe>
            <el-table-column type="index" label="NO" width="80" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip prop="companyName" label="公司名称" min-width="200"></el-table-column>
            <el-table-column label="更新时间" width="200">
                <template slot-scope="scope">
                    {{ scope.row.updateTime | china2Local}}
                </template>
            </el-table-column>
            <el-table-column label="添加时间" width="200">
                <template slot-scope="scope">
                    {{ scope.row.createTime | china2Local}}
                </template>
            </el-table-column>
            <el-table-column label="" width="200" fixed="right">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleExit(scope.row)">编辑</el-button>
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


        <!--添加或者编辑-->
        <section>
            <el-dialog custom-class="col1-dialog" :title="formObj.title" width="30%"  :visible.sync="formObj.formVisible" :close-on-click-modal="true">
                <el-form :model="formObj.formModel" label-width='80px' ref="companyAdd" :rules="companyRules">
                    <el-input v-model="formObj.formModel.id" v-show="false"></el-input>
                    <el-form-item label="公司名称" prop="companyName">
                        <el-input v-model="formObj.formModel.companyName" @blur="checkName(formObj.formModel.companyName, true)" placeholder="请输入公司名称"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="handleClose('companyAdd')">取消</el-button>
                    <el-button type="primary" @click="handleSubmit('companyAdd')">确认</el-button>
                </div>
            </el-dialog>
        </section>


    </div>
</template>
<script>
    import http from '../../axios/http';

    export default {
        name: 'companyManage',
        data() {
            return {
                heightNum: 0,
                filters: {
                    companyName:''
                },
                pagination: {
                    totalElements: 0,
                    page: 1,
                    content: []
                },
                size: 20,
                isLoading: false,

                formObj: {
                    title: '',
                    formModel: {
                        id:'',
                        companyName:'',
                    },
                    formVisible: false,//编辑界面是否显示
                },

                companyRules:{
                    companyName: [
                        { required: true, message: "公司名称不能为空", trigger: 'blur' },
                        { max:50, message: "", trigger:'blur'}
                    ]
                }
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
                if(this.filters.companyName){
                    params['companyName']=this.filters.companyName;
                }
                this.isLoading = true;
                // console.log(params);
                http.post("v1.0.0/company/companyPage", params).then(response => {
                    if(response.code==200){
                        this.isLoading = false;
                        this.pagination = response.data;
                    }
                });
            },

            //打开新增界面
            handleAdd() {
                this.formObj = {
                    title: "添加操作",
                    formVisible: true,
                    formModel: {
                        id:'',
                        companyName:''
                    }
                }
            },

            //打开编辑界面
            handleExit(row){
                this.formObj = {
                    isBarCodeDisabled: true,
                    title: "编辑操作",
                    formVisible: true,
                    formModel: Object.assign({}, row)
                };
            },

            //执行添加 / 修改
            handleSubmit(ref){
                const self = this;
                this.$refs[ref].validate((valid) => {
                    if(valid){
                        let method = "post";
                        let url = "v1.0.0/company/addCompany";
                        if(this.formObj.formModel.id){
                            method = "put";
                            url = "v1.0.0/company/modifyCompany";
                        }
                        http.postOrPut(url, method, self.formObj.formModel).then(response => {
                            console.log(response);
                            if(response.code == 200) {
                                self.isLoading = false;
                                self.formObj.formVisible=false;
                                self.$message.success(response.msg);
                                self.loadPagination();
                            }
                        }).catch(function (error) {
                            self.isLoading = true;
                            console.log(JSON.stringify(error));
                            self.$message.error(error['data']);
                        });
                    }
                })
            },

            //取消按钮
            handleClose(ref){
                this.$refs[ref].resetFields();
                this.formObj.formVisible=false;
            },
            checkName(name,callback){
                if (!name) {
                    return false;
                }

                let params = {
                    companyName: name
                };

                http.get("v1.0.0/company/checkName", {params: params}).then(response => {
                    if(response == false){
                        this.formObj.formModel.companyName = '';
                        this.$message.error('公司名称重复！');
                    }
                });
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
                        http.get("v1.0.0/company/deleteCompany", {params: params}).then(response => {
                            if(response.code == 200){
                                this.$message.success(response.msg);
                                this.loadPagination();
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
