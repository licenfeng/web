<template>

    <div>
            <el-col :span="20">
                <div style="font-size: 24px;font-weight:bold;text-align:left;">编辑国家信息</div>
            </el-col>
            <el-col :span="6">
            </el-col>
            <el-col :span="20">
                <div style="height: 60px"></div>
            </el-col>


        <el-form label-width="auto">

                <el-col :span="12">
                    <el-form-item label="序号 :">
                        <el-input v-model="form.number" disabled placeholder="请输入内容" style="width: 300px"></el-input>
                    </el-form-item>

                </el-col>
                <el-col :span="12">
                    <el-form-item label="英文简称 :">
                        <el-input v-model="form.englishAbbreviation" placeholder="请输入内容"
                                  style="width: 300px"></el-input>
                    </el-form-item>
                </el-col>
           
                <el-col :span="12">
                    <el-form-item label="中文简称:">
                        <el-input v-model="form.chineseAbbreviation" placeholder="请输入内容"
                                  style="width: 300px"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="12">
                    <el-form-item label="英文全称:">
                        <el-input v-model="form.englishName" placeholder="请输入内容" style="width: 300px"></el-input>
                    </el-form-item>
                </el-col>
            
                <el-col :span="12">
                    <el-form-item label="三字母代码:">
                        <el-input v-model="form.threeCode" placeholder="请输入内容" style="width: 300px"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="数字代码:">
                        <el-input v-model="form.numberCode" placeholder="请输入内容" style="width: 300px"></el-input>
                    </el-form-item>
                </el-col>

            <el-col :span="20">
                <div style="height: 40px"></div>
            </el-col>

            <el-col :span="24" style="float: contour">
                <el-button type="primary" @click="updateBreCountryRegionInfo()">保存</el-button>
                <el-button type="primary" @click="resetForm()">重置</el-button>
                <el-button type="primary" @click="returnPage()">返回</el-button>
            </el-col>
        </el-form>
    </div>
</template>

<script>
    export default {
        props: {
            fatherMethodUpdate: {
                type: Function,
                default: null
            },
            id: {
                type: String,
                default: ""
            }
        },
        data() {
            return {

                form: {
                    number: "",
                    englishAbbreviation: "",
                    chineseAbbreviation: "",
                    englishName: "",
                    threeCode: "",
                    numberCode: ""
                },
                reqFrom: {
                    id: ""
                }
            }
        },
        created() {
            this.getBreCountryRegionInfoList();
        },
        mounted() {

        },

        methods: {
            async getBreCountryRegionInfoList() {
                this.reqFrom.id = this.id;
                await this.$axios.getBreCountryRegionInfoList(this.reqFrom).then(res => {
                    if (res.data.status != 403) {
                        let data = res.data.data;
                        this.form = data[0];
                    } else {
                        this.$message.info("没有找数据");
                    }

                }).catch(error => {
                    console.log(error);
                })
            },
            updateBreCountryRegionInfo() {
                this.$axios.updateBreCountryRegionInfo(this.form).then(res => {
                    console.log(res.data.code);
                    if (res.data.code == '0') {
                        this.$message.success('保存成功！');
                        this.fatherMethodUpdate();
                    }
                });
            },

            resetForm() {
                this.form = {number:this.form.number};
            }
            ,

            returnPage() {
                this.$router.push('/breCustomerCompanyIndex');
            }

        }


    }
</script>

<style>


</style>
