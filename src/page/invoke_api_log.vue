<template>
    <div class="app-container">
        <!--工具条-->
        <el-row>
            <el-col :span="24" class="toolbar" style="padding-bottom: 0;">
                <el-form :inline="true" :model="filters">
                    <el-form-item>
                        <el-input v-model="filters.requestMethod" placeholder="请求方法"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="filters.requestParams" placeholder="请求参数"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" v-on:click="loadPagination">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handleAdd">新增</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-table :data="pagination.content" :height="heightNum" highlight-current-row v-loading="isLoading" @sort-change="handleSort"
                   border fixed style="width: 100%">
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
            <el-table-column prop="id" label="id" sortable width="150">
            </el-table-column>
            <el-table-column prop="appId" label="appId" sortable width="150">
            </el-table-column>
            <el-table-column show-overflow-tooltip label="请求地址" width="400">
                <template slot-scope="scope">
                    {{scope.row.apiUrl}}
                </template>
            </el-table-column>
            <el-table-column prop="requestMethod" label="请求方法" width="150">
            </el-table-column>
            <el-table-column prop="spentTime" label="所花时间" width="150">
            </el-table-column>
            <el-table-column label="请求时间" width="300">
                <template slot-scope="scope">
                    {{scope.row.createTime | datetime}}
                </template>
            </el-table-column>
            <el-table-column inline-template fixed="right" width="300" label="操作">
                <span class="wrapper">
                    <el-button @click="handleView($index, row)" type="info" size="small"><i class="el-icon-information el-icon--left"></i>查看</el-button>
                    <el-button @click="handleEdit($index, row)" icon="edit" size="small">编辑</el-button>
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
                    <el-form-item label="appId">
                        <el-input-number v-model="formObj.formModel.appId" :min="0" :max="200" :disabled="formObj.title === '查看'"></el-input-number>
                    </el-form-item>
                    <el-form-item label="请求方法">
                        <el-select v-model="formObj.formModel.requestMethod" placeholder="请选择请求方法" :disabled="formObj.title === '查看'">
                            <el-option value="GET" label="GET"></el-option>
                            <el-option value="POST" label="POST"></el-option>
                            <el-option value="PUT" label="PUT"></el-option>
                            <el-option value="DELETE" label="DELETE"></el-option>
                            <el-option value="HEAD" label="HEAD"></el-option>
                            <el-option value="OPTIONS" label="OPTIONS"></el-option>
                            <el-option value="TRACE" label="TRACE"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="请求地址">
                        <el-input v-model="formObj.formModel.apiUrl" auto-complete="off" :disabled="formObj.title === '查看'"></el-input>
                    </el-form-item>
                    <el-form-item label="请求时间">
                        <el-date-picker type="datetime" placeholder="选择时间" v-model="formObj.formModel.createTime"
                                        format="yyyy-MM-dd HH:mm:ss" :disabled="formObj.title === '查看'"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="请求参数">
                        <el-input type="textarea" v-model="formObj.formModel.requestParams" :disabled="formObj.title === '查看'"></el-input>
                    </el-form-item>
                    <el-form-item label="返回状态码">
                        <el-input type="textarea" v-model="formObj.formModel.responseStatus" :disabled="formObj.title === '查看'"></el-input>
                    </el-form-item>
                    <el-form-item label="返回体">
                        <el-input type="textarea" v-model="formObj.formModel.responseBody" :disabled="formObj.title === '查看'"></el-input>
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
                heightNum: 0,
                filters: {
                    requestMethod: null,
                    requestParams: null
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
                    title: null,
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
                if (this.filters.requestMethod) {//状态
                    params['search_eq_requestMethod'] = this.filters.requestMethod;
                }
                if (this.filters.requestParams) {
                    params['search_like_requestParams'] = this.filters.requestParams;
                }
                this.isLoading = true;
                http.get("api/invoke_api_log", {params: params}).then(response => {
                    this.isLoading = false;
                    let page = this.pagination.page;
                    this.pagination = response;
                    this.pagination.page = page;
                });
            },
            handleCurrentChange(val) {
                window.console.log('this.pagination.number:' + val);
                this.pagination.number = val;
                window.console.log('排序动作:' + this.sort);
                this.loadPagination();
            },
            //显示新增界面
            handleAdd: function () {
                this.formObj = {
                    title: '新增',
                    formVisible: true,
                    formModel: {
                        appId: null,
                        requestMethod: null,
                        apiUrl: null,
                        createTime: null,
                        requestParams: null,
                        responseBody:null
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
                http.post("api/invoke_api_log", this.formObj.formModel).then(response => {
                    this.isLoading = false;
                    this.formObj.formVisible = false;
                    this.loadPagination();
                });
            },
            handleDelete: function (index, row) {
                this.$confirm(`this operation will delete it, sure?`, 'confirm', {
                    type: 'warning'
                }).then(() => {
                    http.delete("api/invoke_api_log/" + row.id).then(response => {
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
