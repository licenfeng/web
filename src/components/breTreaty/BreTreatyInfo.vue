<template>
    <div>
        <insuranceBreadcrumb :breadcrumbList="breadcrumbList"></insuranceBreadcrumb>

        <el-dialog title="选择导出字段"
                   :visible.sync="this.dialogVisible"
                   width="60%"
                   height="80%"
                   :before-close="handleClose">
            <bre-field-export-info></bre-field-export-info>
        </el-dialog>


        <el-form ref="loginFormRef" v-model="reqFrom" label-width="200px">
            <el-col :span="8">
                <el-form-item label="BerSlipNumber: " prop="currency" ref="name">
                    <el-input v-model="reqFrom.breSlipNumber"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="Treaty Type: " prop="treatyType" ref="treatyType">
                    <!-- <el-input v-model="reqFrom.treatyType"></el-input> -->
                    <el-select v-model="reqFrom.treatyType" placeholder="">
                        <el-option
                            v-for="(item,index) in options"
                            :key="index"
                            :label="item.valueType"
                            :value="item.keyType">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="Type of Business: " prop="typeOfBusiness" ref="typeOfBusiness">
                    <!-- <el-input v-model="reqFrom.typeOfBusiness"></el-input> -->
                    <el-select v-model="reqFrom.typeOfBusiness" placeholder="">
                        <el-option
                            v-for="item in typeOfBusinessList"
                            :key="item.id"
                            :label="item.valueType"
                            :value="item.keyType">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="BRE Bound No: " prop="breBoundNo" ref="breBoundNo">
                    <el-input v-model="reqFrom.breBoundNo"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="BRE Dept : " prop="breDept" ref="breDept">
                    <!-- <el-input v-model="reqFrom.breDept"></el-input> -->
                    <el-select v-model="reqFrom.breDept" placeholder="">
                        <el-option
                            v-for="item in BREDeptList"
                            :key="item.id"
                            :label="item.valueType"
                            :value="item.keyType">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>

            <el-col :span="8">
                <el-form-item label="Ceding Company: " prop="cedingCompany" ref="cedingCompany">

                    <el-select v-model="reqFrom.cedingCompany" clearable filterable style="width: 210px"
                               placeholder="请选择">
                         <el-option
                                v-for="item in organList"
                                :key="item.id"
                                :label="item.englishName"
                                :value="item.englishName">
                        </el-option>
                    </el-select>

                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="Country of Ceding Company: " prop="countryOfCedingCompany" ref="countryOfCedingCompany">
                    <el-select v-model="reqFrom.countryOfCedingCompany" clearable filterable style="width: 210px"
                               placeholder="请选择">
                        <el-option
                               v-for="item in stateInfo"
                                :key="item.id"
                                :label="item.englishAbbreviation"
                                :value="item.englishAbbreviation">
                        </el-option>
                    </el-select>

                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="Producing Broker: " prop="producingBroker" ref="producingBroker">
                    <el-select v-model="reqFrom.producingBroker" clearable filterable style="width: 210px"
                               placeholder="请选择">
                        <el-option
                               v-for="item in organList"
                                :key="item.id"
                                :label="item.englishName"
                                :value="item.englishName">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>

            <el-col :span="8">
                <el-form-item label="Country of Producing Broker: " prop="countryOfProducingBroker" ref="countryOfProducingBroker">
                    <el-select v-model="reqFrom.countryOfProducingBroker" clearable filterable style="width: 210px"
                               placeholder="请选择">
                        <el-option
                                v-for="(item,index) in stateInfo"
                                :key="index"
                                :label="item.englishAbbreviation"
                                :value="item.englishAbbreviation">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>

            <el-col :span="8">
                <el-form-item label="Treaty Name: " prop="treatyName" ref="treatyName">
                    <!-- <el-input v-model="reqFrom.treatyName"></el-input> -->
                    <el-select v-model="reqFrom.treatyName" filterable placeholder="">
                        <el-option
                            v-for="item in treatyNameList"
                            :key="item.id"
                            :label="item.valueType"
                            :value="item.keyType">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="Currency: " prop="currency" ref="currency">
                    <!-- <el-input v-model="reqFrom.currency"></el-input> -->
                    <el-select v-model="reqFrom.currency" filterable placeholder="">
                        <el-option
                            v-for="item in currencyList"
                            :key="item.id"
                            :label="item.alphabeticCode"
                            :value="item.alphabeticCode">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="Leading Reinsurer: " prop="leadingReinsurer" ref="leadingReinsurer">
                    <el-select v-model="reqFrom.leadingReinsurer" clearable filterable style="width: 210px"
                               placeholder="请选择">
                        <el-option
                                v-for="item in organList"
                                :key="item.id"
                                :label="item.englishName"
                                :value="item.englishName">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="Leading Broker: " prop="leadingBroker" ref="leadingBroker">
                    <el-select v-model="reqFrom.leadingBroker" clearable filterable style="width: 210px"
                               placeholder="请选择">
                        <el-option
                               v-for="item in organList"
                                :key="item.id"
                                :label="item.englishName"
                                :value="item.englishName">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>

            <el-col :span="8">
                <el-form-item label="Underwriting Year: " prop="underwritingYear" ref="underwritingYear">
                    <el-date-picker style="width: 200px"
                                    v-model="reqFrom.underwritingYear"
                                    type="year"
                                    format="yyyy" value-format="yyyy"
                                    placeholder="选择年">
                    </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="Inception Date: " prop="inceptionDateList" ref="inceptionDateList">
                    <div class="block">
                        <el-date-picker
                                v-model="reqFrom.inceptionDateList"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                @change="getInceptionDateTime"
                                format="yyyy-MM-dd" value-format="yyyy-MM-dd hh:mm:ss"
                                style="width: 250px"
                        >
                        </el-date-picker>
                    </div>
                </el-form-item>
            </el-col>

            <el-col :span="8">
                <el-form-item label="Expiry Date: " prop="expiryDateList" ref="expiryDateList">
                    <div class="block">
                        <el-date-picker
                                v-model="reqFrom.expiryDateList"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                @change="getInceptionDateTime"
                                format="yyyy-MM-dd" value-format="yyyy-MM-dd hh:mm:ss"
                                style="width: 250px"
                        >
                        </el-date-picker>
                    </div>
                </el-form-item>
            </el-col>


            <el-col :span="16">
                <div class="operate">
                    <el-col :span="2">
                        <el-button type="primary" @click="getBreTreatyBasisInfoList">查询</el-button>
                    </el-col>
                    <el-col :span="2">
                        <el-button type="primary" @click="resetForm">重置</el-button>
                    </el-col>
                    <el-col :span="2">
                        <el-button type="primary" @click="exportFile()">导出</el-button>
                    </el-col>
                    <el-col :span="3">
                        <el-button type="text" @click="returnFiled()">编辑导出字段</el-button>
                    </el-col>
                </div>
            </el-col>
        </el-form>
        
        <el-table :data="tableData" stripe border style="width: 100%">
            <el-table-column prop="breSlipNumber" label="BRE Slip Number" width="180">
                <template slot-scope="scope">
                    <span @click="getInfo(scope.row)" style="color: #3a8ee6">{{scope.row.breSlipNumber}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="breBoundNo" label="BRE Bound No" width="150"></el-table-column>
            <el-table-column prop="breDept" label="BRE Dept"></el-table-column>
            <el-table-column prop="treatyType" label="Treaty Type" width="120"></el-table-column>
            <el-table-column prop="originalCedant" label="Original Cedant" width="140"></el-table-column>
            <el-table-column prop="countryOfOriginalCedant" label="Country of Original Cedant"
                             width="200"></el-table-column>
            <el-table-column prop="producingBroker" label="Producing Broker"></el-table-column>
            <el-table-column prop="countryOfProducingBroker" label="Country of Producing Broker"></el-table-column>
        </el-table>
        <el-pagination
                background
                @current-change="getPageNoPaging"
                :current-page="reqFrom.pageNo"
                :page-size="pageNum"
                :page-count="pageCount"
                :pager-count="7"
                layout="prev, pager, next"
        >
        </el-pagination>
    </div>

</template>
<script>
    import breFieldExportInfo from '../breField/BreFieldExportInfo.vue'
    import insuranceBreadcrumb from '@/components/common/breadcrumb.vue'
    export default {
        components: {
            breFieldExportInfo,
            insuranceBreadcrumb,
        },
        data() {
            return {
                breadcrumbList:["合约业务","Treaty基本信息","合约信息查询"],
                pageCount: 10,
                pageNum: 10,
                pageNo: 1,
                workId: "",
                options: [],
                expiryDateList:[],
                typeOfBusinessList:[],
                BREDeptList:[],
                treatyNameList:[],
                currencyList:[],
                dialogVisible: false,
                reqFrom: {
                    pageSize: 10,
                    pageNo: 1,
                    treatyName: "",
                    cedingCompany: "",
                    expiryDate: "",
                    inceptionDate: "",
                    inceptionDateList: [],
                    underwritingYear: "",
                    leadingReinsurer: "",
                    leadingBroker: "",
                    countryOfCedingCompany: "",
                    breDept: "",
                    treatyType: "",
                    breSlipNumber: "",
                    breBoundNo: "",
                    typeOfBusiness: "",
                    originalCedant: "",
                    countryOfOriginalCedant: "",
                    producingBroker: "",
                    countryOfProducingBroker: ""
                },
                tableData: [],
                englishList: [],
                chineseList: [],
                stateInfo:[], //国家信息
                organList:[] //机构信息
            }
        },
       async created() {
           this.$notify.closeAll();
            this.reqFrom = {};
          await this.getBreTreatyBasisInfoList();
          await this.getBreCountryRegionInfoList();
          await this.getBreWordbookType("Treaty Type")
          await this.getBreWordbookType("Type of Business")
          await this.getBreWordbookType("BRE Dept")
       // await this.getBreWordbookType("treatyName")  查询后端录入得数据
        // await this.getBreWordbookType("currency")  //币种
            await this.getBreCurrencyInfoList()  //币种
            await this.queryName() //国家
            await this.getBreCustomerCompanyInfoList() //机构
           //    await this.getBreWordbookType("Leading Reinsurer ")  Producing Broker:  Ceding Company  机构信息详情

           //    await this.getBreWordbookType("Leading Broker")  机构信息详情 --公司

           //  Country of Ceding Company await this.getBreWordbookType("Leading Broker")
        // Country of Producing Broker  Country of Ceding Company  国家
        },
        methods: {
            //获取币种信息
            async getBreCurrencyInfoList() {
                await this.$axios.getBreCurrencyInfoList({}).then(res => {
                    if (res.data.status != 403) {
                        let data = res.data.data;
                        this.currencyList = data
                    } else {
                        this.$message.error("没有找到数据");
                    }

                }).catch(error => {
                    console.log(error);
                })
            },
            //获取国家信息
            //查询主接口
            async queryName(){
                    const {data} = await this.$axios.getBreCountryRegionInfoList({})
                    if(data.code == 0){
                        this.stateInfo = data.data
                    }else{
                        this.$message.error("查询失败")
                    }
                },
                //获取机构信息
           async getBreCustomerCompanyInfoList(){
           const {data} = await this.$axios.getBreCustomerCompanyInfoList({})
            console.log(data);
            if(data.code == 0 ){
                this.organList = data.data
            }else{
                 this.$message.error("查询失败")
                 }
           },
            //获取breSlipNumber
            getInfo(value) {
                this.$router.push({path: '/page4', query: {id: value.breSlipNumber}});
            },
            //利用change事件监听表单内容变化，并将选中的值赋值给所需要的两个字段
            getInceptionDateTime(val) {
                this.reqFrom.inceptionDate=val[0]+">"+val[1]

                console.log(this.reqFrom.inceptionDate)

                if (this.inceptionDate) {
                    console.log(this.inceptionDate)
                }
            },
            getPageNoPaging(val) {
                this.pageNo = val;
                this.reqFrom.pageNo = val;
                this.getBreTreatyBasisInfoList();
            },
            async getBreWordbookType(val){
                await this.$axios.getBreWordbookType(val).then(res=>{
                     if(val == 'Treaty Type' ){
                    let data = res.data;
                    // console.log(data);
                    if (data.code == '0') {
                        this.options = data.data
                    } else {
                        this.$message.info("没有找到数据");
                    }
                    }else if(val == 'Type of Business' ){
                        let data = res.data;
                        if (data.code == '0') {
                            this.typeOfBusinessList = data.data
                        } else {
                            this.$message.info("没有找到数据");
                        }
                    }
                    else if(val == 'BRE Dept'){
                         let data = res.data;
                        if (data.code == '0') {
                            this.BREDeptList = data.data
                        } else {
                            this.$message.info("没有找到数据");
                        }
                    }else if(val == 'treatyName'){ 
                          let data = res.data;
                        if (data.code == '0') {
                            this.treatyNameList = data.data
                        } else {
                            this.$message.info("没有找到数据");
                        }
                    }
                 
                   
                })
                },
            async getBreCountryRegionInfoList() {
                await this.$axios.getBreCountryRegionInfoList().then(res => {
                    if (res.data.status != 403) {
                        let data = res.data.data;
                        let englishList = [];
                        let chineseList = [];
                        for (let i = 0; i < data.length; i++) {
                            let item = data[i];
                            if (englishList.indexOf(item.englishAbbreviation) < 0) {
                                englishList.push(item.englishAbbreviation);
                            }
                            if (chineseList.indexOf(item.chineseAbbreviation) < 0) {
                                chineseList.push(item.chineseAbbreviation);
                            }
                        }
                        this.englishList = englishList;
                        this.chineseList = chineseList;
                    } else {
                        this.$message.info("没有找到数据");
                    }
                }).catch(error => {
                    console.log(error);
                })
            },
          async  getBreTreatyBasisInfoList() {
               await this.$axios.getBreTreatyBasisInfoList(this.reqFrom).then(res => {
                    let data = res.data;
                    if (data.code == '0') {
                        let obj = data.data;
                        this.tableData = obj.list;
                        this.pageCount = obj.pages;
                        this.pageNum = obj.pageNum;
                        this.total = obj.total;
                    } else {
                        this.$message.error(data.msg);
                    }
                })
            }
            ,
            returnFiled() {
                this.dialogVisible = true;
            }
            ,
            handleClose(done) {
                this.dialogVisible = false;
                done();
            }
            ,

            exportFile() {
                this.$axios.exportBreTreatAllExcl(this.form).then(res => {
                    let data = res.data;
                    let fileName = "TreatInfo.xls"
                    this.$fileDownload(data, fileName);
                });
            }
            ,

            resetForm() {
                this.reqFrom = {
                    treatyName: "",
                    cedingCompany: "",
                    expiryDate: "",
                    inceptionDate: "",
                    underwritingYear: "",
                    leadingReinsurer: "",
                    leadingBroker: "",
                    countryOfCedingCompany: "",
                    breDept: "",
                    treatyType: "",
                    breSlipNumber: "",
                    breBoundNo: "",
                    typeOfBusiness: "",
                    originalCedant: "",
                    countryOfOriginalCedant: "",
                    producingBroker: "",
                    countryOfProducingBroker: ""
                };
            }
            ,
        }
    }
</script>

<style scoped lang="less">
    .operate{
        display: flex;
        justify-content: flex-end;
        .el-col{
            margin-right: 20px;
        }
    }
</style>
