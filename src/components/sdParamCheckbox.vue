<template>
    <div>
        <el-checkbox style="float: left; margin-right: 10px;" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" border>全选</el-checkbox>
        <el-checkbox-group style="float: left;" v-model="currentValue" :type="typeCode"  @change="handleCheckedChange" :disabled="disabled">
            <el-checkbox v-for="option in options" :key="option[keyName]" :label="option[keyName]" :disabled="option[disableName]" border>{{option[labelName]}}</el-checkbox>
        </el-checkbox-group>
    </div>
</template>
<script>
    import component from '../axios/component';

    export default {
        name: 'sdParamCheckbox',
        props: {
            value: {
                required: false,
                default: ''
            },
            typeCode: {
                type: String,
                required: true,
            },

            keyName: {
                type: String,
                required: false,
                default: 'paramDetailCode'
            },
            // labelName: {
            //     type: String,
            //     required: false,
            //     default: 'cname'
            // },
            disableName: {
                type: String,
                required: false,
                default: 'disable'
            },
            disabled: {
                type: Boolean,
                required: false,
                default: false
            },
            withDisabled: {
                type: Boolean,
                required: false,
                default: true
            },
        },
        data() {
            return {
                labelName: 'paramDetailName',
                options: '',
                optionAll: [],
                checkAll: false,
                currentValue: [],
                isIndeterminate: false,
            }
        },
        model: {
            prop: 'value',
            event: 'change'
        },
        methods: {
            fetchOptions(input) {
                // console.group("-----sdParamCheckbox.fetchOptions-------");
                // console.debug("input: " + input);
                // console.debug("this.value: " + this.value);
                // console.groupEnd();

                let url = "v1.0.0/paramsDetail/queryDetails?code=" + this.typeCode;
                let self = this;
                component.fetchOptions(url, input, this, function () {
                    self.options.forEach(item => {
                        self.optionAll.push(item.paramDetailCode);
                    })
                });
            },

            //选择
            handleCheckedChange(val) {
                 console.log("handleCheckedChange")
                 console.log(val)
                let checkedCount = val.length;
                this.checkAll = checkedCount === this.options.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.options.length;
                this.$emit('change', val, this.options);
            },

            //全选 选项
            handleCheckAllChange(val) {
                // console.log("handleCheckAllChange");
                // console.log(val);
                this.currentValue = val ? this.optionAll: [];
                this.isIndeterminate = false;
                this.$emit('change', this.currentValue, this.options);
            },

            // 父组件调用，清空选中状态
            clearCheck(){
                this.handleCheckAllChange();
                this.handleCheckedChange([]);
            }
        },
        mounted() {
            this.fetchOptions(null);
        },
        watch: {
            locale(){
                // console.log("i18n.locale:" + this.locale);
                /*if(this.locale === 'en'){
                    this.labelName = "ename"
                }else {
                    this.labelName = "cname"
                }*/
            }
        }
    }
</script>
<style scoped="">
</style>
