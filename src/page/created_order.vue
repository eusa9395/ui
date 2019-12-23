<template>
    <div class="app-container">
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.requestMethod" placeholder="请求地址"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="loadPagination">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-table :data="pagination.content" highlight-current-row v-loading="isLoading" @sort-change="handleSort"
                  height="400" border fixed style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        {{props.row.requestParams}}
                    </el-form>
                    <el-form label-position="left" inline class="demo-table-expand">
                        {{props.row.responseBody}}
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="orderNumber" label="orderNumber" sortable width="200">
            </el-table-column>
            <el-table-column prop="trackNumber" label="trackNumber" sortable width="200">
            </el-table-column>
            <el-table-column prop="createLogId" label="createLogId" width="150">
            </el-table-column>
            <el-table-column prop="cancelLogId" label="cancelLogId" width="150">
            </el-table-column>
            <el-table-column prop="success" label="success" width="150">
            </el-table-column>
            <el-table-column prop="cancelled" label="cancelled" width="150">
            </el-table-column>
            <el-table-column prop="result" label="result" width="300">
            </el-table-column>
            <el-table-column prop="cancelResult" label="cancelResult" width="300">
            </el-table-column>
            <el-table-column inline-template fixed="right" width="300" label="操作">
                <span class="wrapper">
                    <el-button @click="handleView($index, row)" type="info" size="small"><i class="el-icon-information el-icon--left"></i>查看</el-button>
                    <el-button @click="handleDelete($index, row)" type="danger" icon="delete" size="small">删除</el-button>
                </span>
            </el-table-column>
        </el-table>
        <div class="pagination" v-if='pagination.totalElements > 0'>
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pagination.size"
                           :total="pagination.totalElements" style="float:right;">
            </el-pagination>
        </div>
        <section>
            <!--新增界面-->
            <el-dialog :title="formObj.title" v-model="formObj.formVisible" :close-on-click-modal="false">
                <el-form :model="formObj.formModel" label-width="80" :rules="formObj.rules" ref="formObj">
                    <el-form-item label="orderNumber">
                        {{formObj.formModel.orderNumber}}
                    </el-form-item>
                    <el-form-item label="trackNumber">
                        {{formObj.formModel.trackNumber}}
                    </el-form-item>
                    <el-form-item label="createLogId">
                        {{formObj.formModel.createLogId}}
                    </el-form-item>
                    <el-form-item label="cancelLogId">
                        {{formObj.formModel.cancelLogId}}
                    </el-form-item>
                    <el-form-item label="success">
                        {{formObj.formModel.success}}
                    </el-form-item>
                    <el-form-item label="cancelled">
                        {{formObj.formModel.cancelled}}
                    </el-form-item>
                    <el-form-item label="result">
                        {{formObj.formModel.result}}
                    </el-form-item>
                    <el-form-item label="cancelResult">
                        {{formObj.formModel.cancelResult}}
                    </el-form-item>
                    <el-form-item label="请求时间">
                        <el-date-picker type="datetime" placeholder="选择时间" v-model="formObj.formModel.createTime"
                                        format="yyyy-MM-dd HH:mm:ss" :disabled="formObj.title === '查看'"></el-date-picker>
                    </el-form-item>
                </el-form>
                <div v-if="formObj.title !== '查看'" slot="footer" class="dialog-footer">
                    <el-button @click.native="formObj.formVisible = false">取消</el-button>
                    <el-button type="primary" @click.native="handleSubmit" :loading="formObj.isLoading">提交</el-button>
                </div>
            </el-dialog>
        </section>
    </div>

</template>


<script>
    import moment from "moment";
    import http from '../axios/http';
    export default {
        data() {
            return {
                filters: {
                    requestMethod: ''
                },
                pagination: {
                    totalElements: 0,
                    number: 1,
                    content: []
                },
                size: 20,
                sort: '',
                isLoading: false,
                selecteds: [],//列表选中列
                formObj: {
                    title: '',
                    isLoading: false,
                    formModel: {},
                    formVisible: false,//编辑界面是否显示
                    rules: {
                        name: [
                            {required: true, message: '请选择请求方法', trigger: 'blur'}
                        ]
                    },
                }
            }
        },
        methods: {
            handleSort: function (sort) {
                if (!sort || !sort.column || !sort.column.sortable) {
                    return;
                }
                window.console.log('sort.prop:' + sort.prop + ', sort.order:' + sort.order);
                this.sort = sort.prop + (sort.order === 'descending' ? ',desc' : '');
                window.console.log('排序动作:' + this.sort);
                this.loadPagination();
            },
            loadPagination() {
                window.console.log("this.pagination.number:" + this.pagination.number);
                let params = {
                    page: this.pagination.number === 0 ? 1 : this.pagination.number
                };
                if (this.sort) {
                    params.sort = this.sort;
                }
                this.isLoading = true;
                http.get("api/created_order", {params: params}).then(response => {
                    this.isLoading = false;
                    this.pagination = response;
                });

            },
            handleCurrentChange(val) {
                window.console.log('this.pagination.number:' + val);
                this.pagination.number = val;
                this.loadPagination();
            },
            //显示新增界面
            handleAdd: function () {
                this.formObj = {
                    title: '新增',
                    formVisible: true,
                    formModel: {
                        appId: '',
                        requestMethod: '',
                        apiUrl: '',
                        createTime: '',
                        requestParams: '',
                        responseBody:''
                    }
                };
            },
            //显示编辑界面
            handleEdit: function (index, row) {
                this.formObj = {
                    title: '编辑',
                    formVisible: true,
                    formModel: row
                };
            },
            //显示查看界面
            handleView: function (index, row) {
                this.formObj = {
                    title: '查看',
                    formVisible: true,
                    formModel: row
                };
            },
            handleSubmit: function () {
                if (this.formObj.formModel.createTime) {
                    this.formObj.formModel.createTime = moment(this.formObj.formModel.createTime).format("YYYY-MM-DD HH:mm:ss");
                }
                http.post("api/created_order", this.formObj.formModel).then(response => {
                    this.isLoading = false;
                    this.formObj.formVisible = false;
                    this.loadPagination();
                });
            },
            handleDelete: function (index, row) {
                this.$confirm(`this operation will delete it, sure?`, 'confirm', {
                    type: 'warning'
                }).then(() => {
                    http.delete("api/created_order/" + row.orderNumber).then(response => {
                        this.isLoading = false;
                        this.loadPagination();
                    });
                }).catch(() => {})

            }
        },
        mounted() {
            this.loadPagination();
        }
    }
</script>
