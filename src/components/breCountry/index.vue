<template>
    <div>
        <my-breadcrumb :breadcrumbList="breadcrumbList"></my-breadcrumb>
        <el-form ref="form" label-width="140px">
            <el-row>
                <el-col :span="6">
                    <el-form-item label="ENTITY:">
                        <el-select v-model="reqFrom.entity" clearable filterable placeholder="请选择">
                            <el-option
                                    v-for="entity in this.entityList"
                                    :key="entity"
                                    :label="entity"
                                    :value="entity">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="Alphabetic Code:" >
                        <el-select v-model="reqFrom.alphabeticCode" clearable filterable placeholder="请选择">
                            <el-option
                                    v-for="alphabeticCode in this.alphabeticCodeList"
                                    :key="alphabeticCode"
                                    :label="alphabeticCode"
                                    :value="alphabeticCode">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                    <div style="margin-right:400px">
                    <el-button type="primary" @click="getBreCurrencyInfoList">查询</el-button>
                    <el-button type="primary" @click="jumpUpload">导入</el-button>
                    </div>
            </el-row>
        </el-form>
        <el-row>
            <el-col :span="20">
                <div style="height: 30px"></div>
            </el-col>
        </el-row>

        <el-table :data="tableData"  height="460" stripe border style="width: 100%">
            <el-table-column prop="number" label="序号"></el-table-column>
            <el-table-column prop="entity" label="ENTITY"></el-table-column>
            <el-table-column prop="currency" label="Currency"></el-table-column>
            <el-table-column prop="alphabeticCode" label="Alphabetic Code"></el-table-column>
            <el-table-column prop="numericCode" label="Numeric Code"></el-table-column>
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
    import MyBreadcrumb from '@/components/common/breadcrumb'
    export default {
        components: {
            indexUpload,
            indexUpdate,
            MyBreadcrumb
        },
        data() {

            return {
                breadcrumbList:['业务管理',"币种信息"],
                id:"",
                dialogVisibleUpdate:false,
                dialogVisible: false,
                isTheRefresh: true,
                reqFrom: {
                    alphabeticCode: "",
                    entity: ""
                },
                tableData: [],
                alphabeticCodeList: [],
                entityList: []
            }
        },
        created() {
            this.getBreCurrencyInfoList();
        },
        mounted() {

        },
        methods: {
            jumpUpdate(item){
                this.id=item.id
                this.dialogVisibleUpdate = true;
            },
            fatherMethodUpdate() {
                this.dialogVisibleUpdate = false;
                this.dialogVisible = false;
                this.isTheRefresh = true;
                this.getBreCurrencyInfoList();
            },
            jumpUpload() {
                this.dialogVisible = true;
            },
            dialogVisibleClose(done) {
                this.dialogVisible = false;
                this.dialogVisibleUpdate=false
                //  done();
            },

            async getBreCurrencyInfoList() {
                await this.$axios.getBreCurrencyInfoList(this.reqFrom).then(res => {
                    if (res.data.status != 403) {
                        let data = res.data.data;
                        this.tableData = data;
                        if (this.isTheRefresh) {
                            let it = {};
                            let alphabeticCodeList = [];
                            let entityList = [];
                            for (let i = 0; i < data.length; i++) {
                                let item = data[i];
                                if (alphabeticCodeList.indexOf(item.alphabeticCode) < 0) {
                                    alphabeticCodeList.push(item.alphabeticCode);
                                }
                                if (entityList.indexOf(item.entity) < 0) {

                                    entityList.push(item.entity);
                                }
                            }
                            this.entityList = entityList;
                            this.alphabeticCodeList = alphabeticCodeList;
                            this.isTheRefresh = false;
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
  
</style>
