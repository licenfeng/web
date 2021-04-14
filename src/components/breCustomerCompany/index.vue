<template>
    <div>
        <div>
            <my-breadcrumb :breadcrumbList="breadcrumbList"></my-breadcrumb>
        </div>
        <el-form ref="form"  label-width="auto">
            <el-row>
                <el-col :span="6">
                    <div><span class="toLeft">中文名称:</span>
                        <el-select v-model="form.chineseName" clearable filterable placeholder="请选择">
                            <el-option
                                    v-for="item in tableData"
                                    :key="item.id"
                                    :label="item.chineseName"
                                    :value="item.chineseName">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div><span class="toLeft">英文名称:</span>
                        <el-select v-model="form.englishName" clearable filterable placeholder="请选择">
                            <el-option
                                    v-for="item in tableData"
                                    :key="item.id"
                                    :label="item.englishName"
                                    :value="item.englishName">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div style="width: 500PX"><span class="toLeft">联系人姓名:</span>
                        <el-select v-model="form.contactsName" clearable filterable placeholder="请选择">
                            <el-option
                                    v-for="item in contactList"
                                    :key="item.id"
                                    :label="item.contactsName"
                                    :value="item.customerId">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" @click="getBreCustomerCompanyInfoList">查询</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="20">
                    <div style="height: 10px"></div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <div><span class="toLeft">中文简称:</span>
                        <el-select v-model="form.chineseAbbreviation" clearable filterable placeholder="请选择">
                            <el-option
                                    v-for="item in tableData"
                                    :key="item.id"
                                    :label="item.chineseAbbreviation"
                                    :value="item.chineseAbbreviation">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div><span class="toLeft">英文简称:</span>
                        <el-select v-model="form.englishAbbreviation" clearable filterable placeholder="请选择">
                            <el-option
                                    v-for="item in tableData"
                                    :key="item.id"
                                    :label="item.englishAbbreviation"
                                    :value="item.englishAbbreviation">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div style="width: 515PX"><span class="toLeft">联系邮箱:</span>
                        <el-select v-model="form.mailbox" clearable filterable placeholder="请选择">
                            <el-option
                                    v-for="item in contactList"
                                    :key="item.id"
                                    :label="item.mailbox"
                                    :value="item.customerId">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" @click="toAdd" >新增</el-button>
                </el-col>
            </el-row>
        </el-form>
        <el-row>
            <el-col :span="20">
                <div style="height: 30px"></div>
            </el-col>
        </el-row>


        <el-table :data="tableData" stripe border style="width: 100%">
            <el-table-column prop="chineseName" label="中文名称">  </el-table-column>
            <el-table-column prop="chineseAbbreviation" label="中文简称"> </el-table-column>
            <el-table-column prop="englishName" label="英文名称" > </el-table-column>
            <el-table-column prop="englishAbbreviation" label="英文简称" > </el-table-column>
            <el-table-column prop="countriesAndRegions" label="国家地区" > </el-table-column>
            <!-- <el-table-column prop="domesticAndForeign" label="境内外"></el-table-column>
            <el-table-column prop="organizationType" label="组织机构类型"> </el-table-column>
            <el-table-column prop="contractBillingRequirements" label="合约账单要求"> </el-table-column>
            <el-table-column prop="billingPrinciple" label="开票原则"> </el-table-column>
            <el-table-column prop="faultToleranceOfBilling" label="开票容错度"> </el-table-column>
            <el-table-column prop="settlementPrinciple" label="结算原则"> </el-table-column>
            <el-table-column prop="settlementCurrency" label="Settlement Currency"> </el-table-column> -->
            <el-table-column  label="联系人">
                <template slot-scope="scope">
                    <el-button  type="text" @click="returnInfo(scope.row)">详情</el-button>
                    <el-button type="text" @click="returnAddInfo(scope.row)">新增</el-button>
                </template>

            </el-table-column>
            <el-table-column  label="操作">
                <template slot-scope="scope">
                    <el-button  type="text" @click="copyData(scope.row)">复制</el-button>
                    <el-button  type="text" @click="toUpdate(scope.row)">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--      <el-pagination-->
        <!--              background-->
        <!--              @current-change="getPageNoPaging"-->
        <!--              :current-page="reqFrom.pageNo"-->
        <!--              :page-size="pageNum"-->
        <!--              :page-count="pageCount"-->
        <!--              :pager-count="7"-->
        <!--              layout="prev, pager, next"-->
        <!--      >-->
        <!--      </el-pagination>-->

        <el-dialog
                :visible.sync="dialogVisible"
                width="60%"
                height="100%"
                :before-close="handleClose">
            <bre-customer-contacts-index :customer-id="id" :customer-data="customerData" :father-method-update="fatherMethodUpdate"></bre-customer-contacts-index>
        </el-dialog>

        <el-dialog
                :visible.sync="dialogVisibleAdd"
                width="50%"
                height="100%"
                :before-close="dialogVisibleAddClose">
            <div class="dialogDiv">
                <bre-customer-contacts-add :customer-id="id" is-add="true" :fatherMethod="fatherMethod" ></bre-customer-contacts-add>
            </div>

        </el-dialog>
        <el-dialog
                :visible.sync="dialogVisibleCompanyAdd"
                width="70%"
                height="100%"
                :before-close="dialogVisibleCompanyClose">
            <div class="dialogCompanyDiv">
                <bre-customer-company-add :form="customerInfo" :flag="flag"  :companyAddMethod="companyAddMethod"></bre-customer-company-add>
            </div>

        </el-dialog>

    </div>
</template>

<script>
    import breCustomerContactsAdd from './BreCustomerContactsAdd.vue'
    import breCustomerContactsIndex from './BreCustomerContactsIndex.vue'
    import breCustomerCompanyAdd from './BreCustomerCompanyAdd.vue'
    import MyBreadcrumb from '@/components/common/breadcrumb.vue'
    export default {
        components: {
            breCustomerContactsIndex,
            breCustomerContactsAdd,
            breCustomerCompanyAdd,
            MyBreadcrumb
        },
        data() {
            return {
                breadcrumbList:["机构信息详情"],
                pageCount:10,
                pageNum:10,
                pageNo:1,
                id:"",
                dialogVisible:false,
                dialogVisibleAdd:false,
                dialogVisibleCompanyAdd:false,
                // workId:"",
                options:[],
                reqFrom:{
                    type:""
                },
                tableData: [],
                customerData:[],
                form:{
                    id:"",
                    mailbox:"",
                    chineseName:"",
                    englishName:"",
                    contactsName:"",
                    chineseAbbreviation:"",
                    englishAbbreviation:""
                },
                flag:"",
                customerInfo:{},
                contactList:[],
            }
        },
        async created() {
            await this.getBreCustomerCompanyInfoList();
            await this.getBreCustomerContactsInfo('S');
        },
        mounted() {

        },
        methods: {
            getPageNoPaging(val){

            },
            returnAddInfo(item){
                this.id=item.id;
                this.dialogVisibleAdd=true;
                this.reqFrom.customerId=item.id;
            },
            returnInfo(item){
                this.id=item.id;
                this.dialogVisible=true;
                this.reqFrom.customerId=item.id;
                this.getBreCustomerContactsInfo()
            },
            handleClose(done) {
                this.dialogVisible=false;
                done();
            },
            dialogVisibleAddClose(done){
                this.dialogVisibleAdd=false;
                done();
            },
            dialogVisibleCompanyClose(){
                this.dialogVisibleCompanyAdd=false;
            },
            fatherMethod(){
                this.dialogVisibleAdd=false;
            },

            //打开修改机构信息页面
            toUpdate(item){
                this.flag='Y';
                this.dialogVisibleCompanyAdd=true;
                this.form.id=item.id;
                this.queryName();
            },

            //添加成功后回调函数
            companyAddMethod(){
                this.dialogVisibleCompanyAdd=false;
                this.getBreCustomerCompanyInfoList();
            },
            //关闭页面
            fatherMethodUpdate(){
                this.dialogVisible=false;
            },
            //获取联系人信息
            async  getBreCustomerContactsInfo(flag){
                await  this.$axios.getBreCustomerContactsInfo(this.reqFrom).then(res => {
                    if(res.data.status != 403){
                        let data = res.data.data;
                        data.forEach(item=>{
                            if(item.departureFlag == 'Y'){
                                item.flag = true;
                            }else{
                                item.flag=false;
                            }
                        })
                        if(flag==='S'){
                            this.contactList=data;
                        }else{
                            this.customerData = data
                        }
                    }

                })
            },
            //获取机构信息的详情列表
            getBreCustomerCompanyInfoList(){
                if(this.form.contactsName){
                    this.form.id= this.form.contactsName;
                }else if(this.form.mailbox){
                    this.form.id= this.form.mailbox;
                }
                this.$axios.getBreCustomerCompanyInfoList(this.form).then(res => {
                    this.tableData=res.data.data;
                }).catch(error => {
                    console.log(error);
                })
            },
            //打开新增机构信息页面
            toAdd(){
                this.flag='N';
                this.dialogVisibleCompanyAdd=true;
            },

            //复制机构信息
            async copyData(val){
                //需要接口
                // this.tableData.push(val)
                const res = await this.$axios.addBreCustomerCompanyInfo(val)
                if(res.data.code === 0){
                    this.$message.success("复制成功")
                    this.getBreCustomerCompanyInfoList()
                }else{
                    this.$message.error('复制失败')
                }
            },
            //  //查询主接口
            async queryName(){
                const {data} = await this.$axios.getBreCustomerCompanyInfoList(this.form)
                if(data.code == 0){
                    this.customerInfo = data.data[0];
                }else{
                    this.$message.error("查询失败")
                }
            }
        }}

</script>

<style lang="less" scoped>
    .dialogDiv {
        height: 400px;
        overflow: auto;
    }
    .dialogCompanyDiv{
        overflow: auto;
    }
    /deep/.toLeft{
        margin-right: 8px;
        font-size: 14px;
    }
</style>
