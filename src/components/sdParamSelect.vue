<template>
    <el-select v-model="currentValue" :type="typeCode" :has-all="hasAll" :placeholder="placeholderText" :key-name="keyName" :label-name="labelName" :disable-name="disableName" :with-disabled="withDisabled" :disabled="disabled" :clearable="clearable" :multiple="multiple" :filterable="filterable" :filter-size="filterSize" :remote="remotable" :remote-method="remoteMethod">
        <el-option v-if="hasAll" value="" label="全部"></el-option>
        <el-option v-for="option in options" :loading="isLoading" :key="option[keyName]" :label="option[labelName]" :value="option[keyName]" :disabled="option[disableName]"></el-option>
    </el-select>
</template>
<script>
    import component from '../axios/component';

    export default {
        name: 'sdParamSelect',
        props: {
            value: {
                required: false
            },
            typeCode: {
                type: String,
                required: true,
            },
            hasAll: {
                type: String,
                required: false,
                default: false
            },
            placeholderText: {
                type: String,
                required: false,
                default: ''
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
                default: 'disabled'
            },
            withDisabled: {
                type: Boolean,
                required: false,
                default: true
            },
            disabled: {
                type: Boolean,
                required: false,
                default: false
            },
            clearable: {
                type: Boolean,
                required: false,
                default: true
            },
            multiple: {
                type: Boolean,
                required: false,
                default: false
            },
            filterable: {
                type: Boolean,
                required: false,
                default: true
            },
            filterSize : {
                type: Number,
                required: false,
                default: 0
            },
            remotable: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        data() {
            return {
                labelName: 'paramDetailName',
                isLoading: false,
                options: null
            }
        },
        model: {
            prop: 'value',
            event: 'change'
        },
        methods: {
            fetchOptions(input) {
                console.group("-----sdParamSelect.fetchOptions-------");
                console.debug("remotable: " + this.remotable);
                console.debug("input: " + input);
                console.debug("this.value: " + this.value);
                console.groupEnd();
                console.log(this.hasAll);
                let url;
                if (this.hasAll) {
                    if(this.hasAll=='company'){
                        url = "v1.0.0/company/queryCompany";
                    }else if(this.hasAll=='dept'){
                        url = "v1.0.0/dept/queryDept";
                    }
                } else {
                    url = "v1.0.0/paramsDetail/queryDetails?code=" + this.typeCode;
                }
                component.fetchOptions(url, input, this);
            },
            remoteMethod(input) {
                console.group("-----sdParamSelect.remoteMethod-------");
                console.debug("input: " + input);
                console.groupEnd();
                component.remoteMethod(input, this);
            }
        },
        mounted() {
            if(this.remotable === false || this.filterSize === 0) {
                this.fetchOptions(null);
            }
        },
        computed: {
            currentValue: {
                get() {
                    console.debug("get - this.value = " + this.value + ", this.keyName = " + this.keyName + ", this.labelName = " + this.labelName);
                    return this.value;
                },
                set(val) {
                    this.$emit('change', val, this.options);
                }
            }
        },
        watch: {
            /*locale(){

            }*/
        }
    }
</script>
<style scoped="">
</style>
