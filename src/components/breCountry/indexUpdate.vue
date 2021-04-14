<template>

    <div>
        <el-row>
            <el-col :span="20">
                <div style="font-size: 24px;font-weight:bold;text-align:left;">编辑币种信息</div>
            </el-col>
            <el-col :span="6">
            </el-col>
        </el-row>
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
                    <el-form-item label="ENTITY :">
                        <el-input v-model="form.entity" placeholder="请输入内容"
                                  style="width: 300px"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Currency:">
                        <el-input v-model="form.currency" placeholder="请输入内容"
                                  style="width: 300px"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="12">
                    <el-form-item label="Alphabetic Code:">
                        <el-input v-model="form.alphabeticCode" placeholder="请输入内容" style="width: 300px"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Numeric Code:">
                        <el-input v-model="form.numericCode" placeholder="请输入内容" style="width: 300px"></el-input>
                    </el-form-item>
                </el-col>
            
                <!-- <div class="edittable"> -->
                    <el-col :span="24">
                    <el-button type="primary" @click="updateBreCurrencyInfo()">保存</el-button>
                    <el-button type="primary" @click="resetForm()">重置</el-button>
                      </el-col>
                <!-- </div>  -->

                
            
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
                    entity: "",
                    currency: "",
                    alphabeticCode: "",
                    numericCode: ""
                },
                reqFrom: {
                    id: ""
                }
            }
        },
        created() {
            this.getBreCurrencyInfoList();
        },
        mounted() {

        },

        methods: {
            async getBreCurrencyInfoList() {
                this.reqFrom.id = this.id;
                await this.$axios.getBreCurrencyInfoList(this.reqFrom).then(res => {
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
            updateBreCurrencyInfo() {
                this.$axios.updateBreCurrencyInfo(this.form).then(res => {
                    console.log(res.data.code);
                    if (res.data.code == '0') {
                        this.$message.success('保存成功！');
                        this.fatherMethodUpdate();
                    }
                });
            }
            ,

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

<style lang="less" scoped>
    /deep/.edittable{
        margin-right: 85px;
    }


</style>
