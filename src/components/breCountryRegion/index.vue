<template>
    <div>
        <my-breadcrumb :breadcrumbList="breadcrumbList"></my-breadcrumb>
        <el-form ref="form" label-width="80px">
            <el-row>
                <el-col :span="6">
                    <el-form-item label="英文简称:">
                        <el-select v-model="reqFrom.englishAbbreviation" clearable filterable placeholder="请选择">
                            <el-option
                                    v-for="englishAbbreviation in this.englishList"
                                    :key="englishAbbreviation"
                                    :label="englishAbbreviation"
                                    :value="englishAbbreviation">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="中文简称:">
                        <el-select v-model="reqFrom.chineseAbbreviation" clearable filterable placeholder="请选择">
                            <el-option
                                    v-for="chineseAbbreviation in this.chineseList"
                                    :key="chineseAbbreviation"
                                    :label="chineseAbbreviation"
                                    :value="chineseAbbreviation">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                    <div style="margin-right:400px">
                    <el-button type="primary" @click="getBreCountryRegionInfoList">查询</el-button>
                    <el-button type="primary" @click="jumpUpload">导入</el-button>
                    </div>
            </el-row>
        </el-form>
        <el-row>
            <el-col :span="20">
                <div style="height: 30px"></div>
            </el-col>
        </el-row>
        <el-table :data="tableData" height="460" stripe border style="width: 100%">
            <el-table-column prop="number" label="序号"></el-table-column>
            <el-table-column prop="englishAbbreviation" label="英文简称"></el-table-column>
            <el-table-column prop="chineseAbbreviation" label="中文简称"></el-table-column>
            <el-table-column prop="englishName" label="英文全称"></el-table-column>
            <el-table-column prop="threeCode" label="三字母代码"></el-table-column>
            <el-table-column prop="numberCode" label="数字代码"></el-table-column>
            <el-table-column prop="操作" label="操作">
                <template slot-scope="scope">
                    <el-button  type="text" @click="jumpUpdate(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
                :visible.sync="this.dialogVisible"
                width="50%"
                height="100%"
                :before-close="dialogVisibleClose">
            <div class="dialogDiv">
                <index-upload :father-method-update="fatherMethodUpdate"></index-upload>
            </div>
        </el-dialog>
        <el-dialog
                :visible.sync="this.dialogVisibleUpdate"
                width="60%"
                height="40%"
                :before-close="dialogVisibleClose">
            <div class="dialogDivUpdate">
                <index-update :father-method-update="fatherMethodUpdate" :id="id"></index-update>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import indexUpload from './indexUpload'
    import indexUpdate from './indexUpdate'
    import MyBreadcrumb from "@/components/common/breadcrumb/"

    export default {
        components: {
            indexUpload,
            indexUpdate,
            MyBreadcrumb
        },
        data() {
            return {
                breadcrumbList:['业务管理',"国家信息"],
                id:"",
                dialogVisibleUpdate:false,
                isTheRefresh: true,
                dialogVisible: false,
                englishAbbreviation: "",
                chineseAbbreviation: "",
                reqFrom: {
                    englishAbbreviation: "",
                    chineseAbbreviation: ""
                },
                tableData: [],
                englishList:[],
                chineseList:[],
            }
        },
        created() {
            this.getBreCountryRegionInfoList();
        },
        mounted() {

        },
        methods: {
            fatherMethodUpdate() {
                this.dialogVisible = false;
                this.dialogVisibleUpdate=false;
                this.getBreCountryRegionInfoList();
            },
            jumpUpload() {
                this.dialogVisible = true;
            },
            jumpUpdate(item){
                this.id=item.id
                this.dialogVisibleUpdate = true;
            },
            dialogVisibleClose() {
                this.dialogVisible = false;
                this.dialogVisibleUpdate=false;
            },

            async getBreCountryRegionInfoList() {
                await this.$axios.getBreCountryRegionInfoList(this.reqFrom).then(res => {
                    if (res.data.status != 403) {
                        let data = res.data.data;
                        this.tableData = data;
                        if(this.isTheRefresh){
                            let englishList=[];
                            let chineseList=[];
                            for (let i = 0; i < data.length; i++) {
                                let item = data[i];
                                if(englishList.indexOf(item.englishAbbreviation)<0){
                                    englishList.push(item.englishAbbreviation);
                                }
                                if(chineseList.indexOf(item.chineseAbbreviation)<0){
                                    chineseList.push(item.chineseAbbreviation);
                                }
                            }
                            this.englishList=englishList;
                            this.chineseList=chineseList;
                            this.isTheRefresh=false;
                        }
                    } else {
                        this.$message.info("没有找数据");
                    }

                }).catch(error => {
                    console.log(error);
                })

            },


        }
    }
</script>

<style lang="less" scoped>
    .dialogDiv {
        height: 260px;
        overflow: auto;
    }
    .dialogDivUpdate {
        height: 480px;
        overflow: auto;
    }
    /deep/.el-form-item__label{
        margin-left: 10px;
    }
</style>
