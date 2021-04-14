<template>
    <div>
        <div>
            <insuranceBreadcrumb :breadcrumbList="breadcrumbList"></insuranceBreadcrumb>
            <div class="floatright">
                <!--                <el-badge :value="numberFloor" class="item">   </el-badge>-->
                <el-button type="primary" @click="dialogFormVisible = true">增加备注项</el-button>

                <el-button type="primary">导出</el-button>
                <el-button type="danger">Renew</el-button>
                <el-button type="primary">保存</el-button>
                <el-button type="primary">返回</el-button>
            </div>
        </div>
        <!-- 下方是查询条件form表单框 -->
        <el-form ref="form" :model="form" label-width="200px" class="searchQuery">
            <el-form-item label="BRE Slip Number" prop="breSlipNumber" ref="breSlipNumber">
                <el-input v-model="form.breSlipNumber" class="fieldInput"></el-input>
            </el-form-item>
            <el-form-item label="BRE Bound No" prop="breBoundNo" ref="breBoundNo">
                <el-input v-model="form.breBoundNo"></el-input>
            </el-form-item>
            <el-form-item label="Status">
                <el-select v-model="form.status" placeholder="请选择国家">
                    <el-option
                            :label="item.valueType"
                            :value="item.valueType"
                            v-for="item in options"
                            :key="item.keyType">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="queryInput" @click="queryInput">查询</el-button>
            </el-form-item>
        </el-form>
        <!-- 弹窗按钮 -->
        <el-dialog title="备注信息" :visible.sync="dialogFormVisible">
            <el-form :model="threeForm">
                <el-form-item label="RemarksONE" :label-width="formLabelWidth">
                    <el-input v-model="threeForm.remarks1" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="RemarksTWO" :label-width="formLabelWidth">
                    <el-input v-model="threeForm.remarks2" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="RemarksTHREE" :label-width="formLabelWidth">
                    <el-input v-model="threeForm.remarks3" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" plain @click="updateBreTreatyBasisInfo()">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 这里是第一个配置项 -->
        <div class="tableOne">
            <strong>Business Information/基础信息</strong>
            <el-button type="primary" icon="el-icon-plus" circle @click="addOperation" v-if="concealButton"
                       class="marginButton"></el-button>
            <el-table :data="formData" stripe border style="width: 100%" class="tableContract">
                <el-table-column prop="cedingCompany" label="Ceding Company"></el-table-column>
                <el-table-column prop="treatyName" label="treaty Name"></el-table-column>
                <el-table-column prop="underwritingYear" label="underwriting Year"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="operation(scope.$index, scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 下方是合约信息 -->
        <br>
        <div class="addTable">
            <strong>Business Information/合约信息</strong>
            <el-button type="primary" icon="el-icon-plus" circle @click="addForm" v-if="concealPropButton"
                       class="marginButton"></el-button>
            <el-table :data="tableInfo" border stripe class="tableContract">
                <el-table-column prop="sectionName" label="section Name"></el-table-column>
                <el-table-column prop="lineOfBusiness" label="Line of Business"></el-table-column>
                <el-table-column prop="grossRetention" label="Gross Retention"></el-table-column>
                <el-table-column prop="cessionForQuotaShare" label="% Cession for QUO"></el-table-column>
                <el-table-column prop="lineSurplus" label="Lines SPL"></el-table-column>
                <el-table-column prop="commissionForQuotaShare" label="R/I Comm. for QUO"></el-table-column>
                <el-table-column prop="commissionForSurplus" label="R/I Comm. for SPL"></el-table-column>
                <el-table-column prop="epiForQuotaShare" label="EPI for QUO"></el-table-column>
                <el-table-column prop="epiForSurplus" label="EPI for SPL"></el-table-column>
                <el-table-column prop="eventLimit" label="Event Limit"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-form ref="form" :model="totalForm" label-width="200px" class="searchQuery">
                <el-form-item label="EPI for QUO合计" prop="totalEpiForQuotaShare" ref="totalEpiForQuotaShare">
                    <el-input v-model="totalForm.totalEpiForQuotaShare" class="fieldInput"></el-input>
                </el-form-item>
                <el-form-item label="EPI for SPL合计" prop="totalEpiForSurplus" ref="totalEpiForSurplus">
                    <el-input v-model="totalForm.totalEpiForSurplus"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <br>
        <!-- 下方排分信息项 -->
        <br>
        <div class="editTable-small">
            <strong>Reinsurer Information/排分信息</strong>
            <el-button type="primary" icon="el-icon-plus" circle class="marginButton" v-if="concealReinsurerButton"
                       @click="rowPoints"></el-button>
            <el-table :data="tableFive" style="width: auto" border stripe class="tableContract">
                <el-table-column prop="reinsurer" label="Reinsurer"></el-table-column>
                <el-table-column prop="breBrokerage" label="Brokerage"></el-table-column>
                <el-table-column prop="writtenLine" label="Written Line"></el-table-column>
                <el-table-column prop="signedLine" label="Signed Line"></el-table-column>
                <el-table-column prop="expiryDateOfExtension" label="Expiry Date of Extension"></el-table-column>
                <el-table-column prop="underwritingPeriod" label="Underwriting Period"></el-table-column>
                <el-table-column prop="statusReinsurer" label="Status Reinsurer"></el-table-column>
                <el-table-column prop="signingDate" label="Signing Date"></el-table-column>
                <el-table-column label="Others">
                    <template slot-scope="scope">
                        <el-popover
                                trigger="hover"
                                placement="top"
                                width="800"
                        >
                            <el-table :data="formSection">
                                <el-table-column property="arrangeSection" label="Section Name"></el-table-column>
                                <el-table-column property="lineOfBusiness" label="line of Business"></el-table-column>
                                <el-table-column property="arrangeCommissionForQuotaShare" label="R/I Comm. for QUO"
                                                 ref="className">
                                    <!-- <template slot-scope="{row, $index}">
                                      <span :style="{color: row.isRed ? 'red' : 'unset'}">{{ getRedRender(row, $index) }}</span>
                                    </template> -->
                                </el-table-column>
                                <el-table-column property="arrangeCommissionForSurplus"
                                                 label="R/I Comm. for SPL"></el-table-column>
                            </el-table>
                            <div slot="reference" style="display:inline-block">
                                <!-- <el-button type="text" @click="edit">修改</el-button> -->
                                <el-button type="text">修改</el-button>
                            </div>
                        </el-popover>
                        <el-button type="text" @click="editReinsurer(scope.$index,scope.row)"
                                   style="display:inline-block; margin-left:20px;">编辑
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 下面是操作数据信息 -->
        <br>
        <strong>操作数据信息</strong>
        <div class="dataInfo">
            <el-table
                    :data="logInfo"
                    style="width: 100%"
                    :border="true">
                <el-table-column label="操作日期" prop="createdDate"></el-table-column>

                <el-table-column label="操作类型" >
                    <template slot-scope="scope">
                        <span v-if="scope.row.flagType=='1'">创建人</span>
                        <span v-else-if="scope.row.flagType=='2'">修改人</span>
                        <span v-else-if="scope.row.flagType=='3'">复核人</span>
                        <span v-else>{{scope.row.flagType}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作人" prop="createdBy"></el-table-column>
                <el-table-column label="备注" prop="remarks"></el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
    import insuranceBreadcrumb from '@/components/common/breadcrumb.vue';
    import {highPrecisionAdd} from '@/utils/validate';


    export default {
        components: {
            insuranceBreadcrumb,
        },
        data() {
            const item5 = {
                creatorId: "创建ID:",
                editId: "修改ID:",
                checkId: "复核ID:"
            }
            return {
                concealButton: true,
                concealPropButton: false,
                concealReinsurerButton: false,
                breadcrumbList: ['Treaty基本信息', "新增比例合约"],
                dialogFormVisible: false,
                formLabelWidth: '120px',//备注信息的表格宽度
                timer: null,
                numberFloor: "", //这个是备注项里的浮点数
                threeForm: {
                    breSlipNumber: "",
                    remarks1: "", //输入框数据
                    remarks2: "",
                    remarks3: "",
                },
                logInfo:[], //操作日志
                tableInfo: [], //这个是合约信息的table数据项
                tableFive: [], //这个是排分信息的table数据项
                formData: [], //这是新增合约信息中的基础信息table数据项
                formSection: [], //这是section项中的table数据
                form: {  //这个是页面的remarks form表单项
                    breSlipNumber: "", //这里地址栏的id值
                    breBoundNo: "",
                    status: ""
                },
                totalForm: {
                    totalEpiForQuotaShare: "",
                    totalEpiForSurplus: ""
                },
                value: '',
                search: "",
                newValue: "",
                options: []
            }
        },
        created() {
            this.$notify.closeAll();
            //  this.formSection.forEach(item => {
            //    item.isRed = false
            //  })
            //状态
            this.getBreWordbookType("States");
            this.form.breSlipNumber = this.$route.query.id || this.$route.params.value
            // console.log(this.form.breSlipNumber);
            if (this.form.breSlipNumber) {
                this.getBreNumber()
            } else {
                return
            }
            this.getLogInfo();
            //  this.classRed ()
        },
        methods: {
            // 判断是否改变颜色
            // getRedRender (item, index) { //arrangeCommissionForSurplus
            //   if (this.tableInfo[index].commissionForQuotaShare == item.arrangeCommissionForSurplus) {
            //     this.formSection[index].isRed = true // 等下，我先研究一下这个怎么用的 你先搞其他的
            //   } else {
            //     this.formSection[index].isRed = false
            //   }
            //   console.log('----', this.formSection)
            //   return item.arrangeCommissionForQuotaShare
            // },
            async updateBreTreatyBasisInfo() {
                this.threeForm.breSlipNumber = this.form.breSlipNumber;
                const res = await this.$axios.updateBreTreatyBasisInfo(this.threeForm);
                this.dialogFormVisible = false;
                let data = res.data;

                if (data.code == '0') {
                    const a = this.threeForm.remarks1;
                    const b = this.threeForm.remarks2;
                    const c = this.threeForm.remarks3;
                    this.getRemarks(a, b, c,this.threeForm.breSlipNumber);
                }
            },

            getRemarks(a, b, c,breSlipNumber) {
                try {
                    this.$notify.closeAll();
                    this.$notify({
                        title: ' 备注记录',
                        dangerouslyUseHTMLString: true,
                        message:
                            '<span>BRE Slip Number:' + '\xa0\xa0' + breSlipNumber + '</span><br/>' +
                            '<span>RemarksONE:' + '\xa0\xa0' + a + '</span><br/>' +
                            '</span>RemarksTWO: <span>' + '\xa0\xa0' + b + '</span><br/>' +
                            '<span>RemarksTHREE: </span>' + '\xa0\xa0' + c + ' ',
                        duration: 0
                    })
                } catch {
                    this.$notify.error('保存失败!')
                }
            },
            //这是基础信息的数据渲染在基础信息表格上的
            async getBreNumber() {
                const {data} = await this.$axios.getBreTreatyBasisPropAllList({breSlipNumber: this.form.breSlipNumber})
                this.formData = data.data.basisList;

                let basisData = this.formData[0];
                if (basisData.treatyName) {
                    this.concealButton = false
                    this.concealPropButton = true;
                    this.concealReinsurerButton = true;
                }
                //备注
                if (basisData.remarks1) {
                    let a = basisData.remarks1;
                    let b = basisData.remarks2;
                    let c = basisData.remarks3;
                    this.threeForm.remarks1 = a
                    this.threeForm.remarks2 = b;
                    this.threeForm.remarks3 = c;
                    this.getRemarks(a, b, c,basisData.breSlipNumber);
                }

                let obj= data.data;
                if(obj.propList){
                    this.tableInfo = obj.propList
                }
                if(obj.reinsureList){
                    this.tableFive = obj.reinsureList
                }
                if(obj.reinsureList){
                    if(obj.reinsureList[0]){
                        this.formSection = obj.reinsureList[0].list;
                    }
                }


                // EPI合计
                if (this.tableInfo.length > 0) {
                    this.totalForm.totalEpiForQuotaShare = 0;
                    this.totalForm.totalEpiForSurplus = 0;
                    this.tableInfo.forEach(item => {
                        this.totalForm.totalEpiForQuotaShare = highPrecisionAdd(this.totalForm.totalEpiForQuotaShare, item.epiForQuotaShare)
                        this.totalForm.totalEpiForSurplus = highPrecisionAdd(this.totalForm.totalEpiForSurplus, item.epiForSurplus)
                    })
                }


            },
            //操作日志
            async getLogInfo(){
                const res= await this.$axios.getLogInfo(this.form.breSlipNumber);
                console.log("-------2222222222222-------")
                if(res.data.code=='0'){
                    console.log("--------")
                    console.log(res.data)
                    console.log("--------")
                    this.logInfo=res.data.data;
                }else{
                    console.log(res);
                }
            },
            //添加基础信息
            addOperation() {
                this.$router.push({path: "/basicsInfo"})
            },
            //编辑基础信息
            operation(val, res) {
                // this.breSlipNumber = res.breSlipNumber
                this.$router.push({path: "/editBasicsInfo", query: {id: res.breSlipNumber}})
            },
            addForm() {
                this.$router.push({path: "/addpage4", query: {id: this.form.breSlipNumber}})
            },
            //排分信息的增加按钮
            rowPoints() {
                this.$router.push({path: "/addformpage4", query: {id: this.form.breSlipNumber}})
            },
            //查询合约信息项
            async queryInput() {
                await this.getBreNumber();
            },
            //这里是编辑ID
            handleEdit(val, res) {
                this.$router.push({name: "editpage4", params: {id: res.propId, breSlipNumber: res.breSlipNumber}})
            },
            edit() {
                this.$router.push({
                    name: "editformpage4",
                    params: {id: this.formSection[0].reinsurerId, number: this.formSection[0].breSlipNumber}
                })
            },
            editReinsurer(index, row) {
                this.$router.push({name: "editformpage4two", params: {slipNumber: row.breSlipNumber, id: row.id}})
            },
            //获取状态信息
            async getBreWordbookType(val) {
                await this.$axios.getBreWordbookType(val).then(res => {
                    let data = res.data;
                    if (data.code == '0') {
                        this.options = data.data
                    } else {
                        this.$message.info("没有找数据");
                    }
                }).catch(error => {
                    console.log(error);
                })
            },
            // 封装一个class类
            //  classRed (){
            //    if(!this.formSection.length == null){
            //      this.addTable.forEach(item=>{
            //        this.formSection.forEach(v=>{
            //          for(let key in item){
            //            for(let index in v){
            //               if(item.sectionName === v.arrangeSection && item.arrangeCommissionForQuotaShare !== v.commissionForQuotaShare){
            //                 this.$refs.className.style.color = "#990033"
            //               }
            //            }
            //          }
            //        })
            //      })
            //    }
            //  }
        }
    }
</script>

<style lang="less" scoped>
    .floatLeft {
        float: left;
        margin-left: 20px;
    }

    .floatright {
        float: right;
        margin-right: 20px;
    }

    /deep/ .marginButton {
        margin-left: 20px;
    }

    /deep/ .tableContract {
        margin-top: 20px;
    }

    /deep/ .el-collapse-item__header {
        font-size: 20px;
        font-weight: 700;
        margin-left: 50px;
    }

    /deep/ .el-table--enable-row-transition {
        margin-top: 20px;
    }

    /deep/ .searchQuery {
        display: inline-flex;
    }

    /deep/ .editTable-small {
        .el-table th.is-leaf {
            border-bottom: 0.5px solid #EBEEF5
        }
    }

    /deep/ .addTable {
        .el-table th.is-leaf {
            border-bottom: 0.5px solid #EBEEF5
        }
    }

    /deep/ .tableOne {
        .el-table th.is-leaf {
            border-bottom: 0.5px solid #EBEEF5
        }
    }

    /deep/ .el-dialog-footer {
        text-align: center;
    }
</style>
