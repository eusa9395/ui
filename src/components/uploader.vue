<template>
    <el-upload style="display:inline-block"
               class="tras-upload"
               :action="uploadUrl"
               :on-success="uploadSuccess"
               :on-error="uploadFail"
               :show-file-list="false"
               :before-upload="beforeUpload"
               :on-change="handleChange">
        <el-button size="mini" :loading="uploading" type="primary">{{btnText}}</el-button>
    </el-upload>
</template>
<script>
    export default {
        name: 'uploader',
        props: {
            propertyId: {
                type: String,
                required: true
            },
            businessId: {
                type: String,
                required: true
            },
            btnText: {
                type: String,
                required: true
            }
        },
        data () {
            return {
                uploading: false
            }
        },
        methods: {
            uploadSuccess: function() {
                this.uploading = false;
                this.$message('上传成功');
                this.$emit('uploadSuccess');
            },
            uploadFail: function() {
                this.uploading = false;
                this.$message('上传失败');
            },
            handleChange: function() {
            },
            beforeUpload: function() {
                this.uploading = true;
            }
        },
        computed: {
            uploadUrl: function () {
                return 'api/attachment?propertyId=' + this.propertyId + '&businessId=' + this.businessId;
            }
        }
    }
</script>
<style scoped="">
</style>
