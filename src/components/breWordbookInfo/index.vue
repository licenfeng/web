<template>
    <div>
        <my-breadcrumb :breadcrumbList="breadcrumbList"></my-breadcrumb>
        <el-form ref="form" label-width="80px">
            <el-row>
                <el-col :span="6">
                    <el-form-item label="分类描述:">
                        <el-select v-model="reqFrom.type" clearable filterable placeholder="请选择">
                            <el-option
                                    v-for="(item,index) in typeList"
                                    :key="index"
                                    :label="item.value"
                                    :value="item.key">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="主健描述:">
                        <el-select v-model="reqFrom.keyType" clearable filterable placeholder="请选择">
                            <el-option
                                    v-for="(item,index) in KeyTypeList"
                                    :key="index"
                                    :label="item.value"
                                    :value="item.key">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <div class="leftclass">
                    <el-button type="primary" @click="getBreWordbookInfo()">查询</el-button>
                    <el-button @click="toAdd" type="primary">新增</el-button>
                </div>
            </el-row>
        </el-form>
        <el-table :data="tableData"   height="450" stripe border style="width: 100%">
            <el-table-column prop="type" label="分类"></el-table-column>
            <el-table-column prop="typeDesc" label="分类描述"></el-table-column>
            <el-table-column prop="keyType" label="主键(key)"></el-table-column>
            <el-table-column prop="valueType" label="显示值"></el-table-column>
            <el-table-column prop="keyDesc" label="主健描述"></el-table-column>
            <el-table-column prop="keyOff" label="操作" align="center" style="height: 20px;">
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.checked"
                            @change='updateBreWordbookInfo(scope.row)'
                    >
                    </el-switch>
                </template>
            </el-table-column>
        </el-table>
        <!-- <el-pagination
                background
                layout="prev, pager, next"
                :total="1000">
        </el-pagination> -->

    </div>
</template>

<script>
import MyBreadcrumb from '@/components/common/breadcrumb.vue'
    export default {
        components:{
            MyBreadcrumb
        },
        data() {
            return {
                breadcrumbList:['业务管理','类型配置'],
                workId: "",
                keyOff: "",
                reqFrom: {
                    type: "",
                    keyType: ""
                },
                tableData: [],
                typeList: [],
                KeyTypeList: [],
            }
        },
        async created() {
            await  this.getBreWordbookInfo(); //获取分页数据
            await  this.getBreWordbookInfoGroupByKeyType();
            await this.getBreWordbookInfoGroupByType();
        },
        methods: {
            getPageNoPaging(val) {
                console.log(val);
                this.pageNo = val;
                this.reqFrom.pageNo = val;
                this.getBreWordbookInfo();
            },

            async getBreWordbookInfoGroupByKeyType() {
            const {data} = await this.$axios.getBreWordbookInfoGroupByKeyType({})
                console.log('1111111111111')
                console.log(data)
                console.log('1111111111111')
                    if (data.code === 0) {
                        let arr = data.data
                        let keyTypeListIs = []
                        let urData = [];
                        for (let i = 0; i < arr.length; i++) {
                            let item = arr[i];
                            let it = {};
                            if (keyTypeListIs.indexOf(item.keyType) < 0) {
                                it.key = item.keyType;
                                it.value = item.keyType + " - " + item.valueType;
                                urData.push(it);
                                keyTypeListIs.push(item.keyType);
                            }
                        }
                        this.KeyTypeList = urData;
                    } else {
                        this.$message.error(data.msg);
                    }
            },

            async getBreWordbookInfoGroupByType() {
                await this.$axios.getBreWordbookInfoGroupByType({}).then(res => {
                    if (res.data.status != 403) {
                        let data = res.data.data;
                        let urData = [];
                        for (let i = 0; i < data.length; i++) {
                            let it = {};
                            let item = data[i];
                            it.key = item.type;
                            it.value = item.type + " - " + item.typeDesc;
                            urData.push(it)
                        }
                        this.typeList = urData;
                    } else {
                        this.$message.info("没有找数据");
                    }
                }).catch(error => {
                    console.log(error);
                })
            },
            async getBreWordbookInfo() {
                await this.$axios.getBreWordbookInfo(this.reqFrom).then(res => {
                    let data = res.data.data;
                    let dataUser = [];
                    if (res.data.status != 403) {
                        for (let i = 0; i < data.length; i++) {
                            let item = data[i];
                            if (item.keyOff === 'Y') {
                                item.checked = true;
                            } else {
                                item.checked = false;
                            }
                            dataUser.push(item)
                        }
                    }
                    this.tableData = dataUser;
                    // console.log(this.tableData);
                }).catch(error => {
                    console.log(error);
                })
            },
            updateBreWordbookInfo(item) {
                if (item.keyOff === 'Y') {
                    item.keyOff = 'N';
                } else {
                    item.keyOff = 'Y';
                }

                this.$axios.updateBreWordbookInfo(item).then(res => {
                    console.log(res.data);
                    this.getBreWordbookInfo();
                })
            },
            toAdd() {
                this.$router.push('/breWordBookInfoAdd');
            }
        }
    }
</script>

<style lang='less' scoped>
/deep/.el-form-item__label{
    margin-left: 10px;
}
/deep/.leftclass{
    margin-right: 450px;
}
</style>
