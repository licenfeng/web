<template>
  <div>
    <el-col :span="24">
      <div style="font-size: 24px;font-weight:bold;text-align:left;">
        新增机构信息
      </div>
    </el-col>

    <el-form label-width="auto">
      <el-col :span="10">
        <el-form-item label="中文名称 :">
          <el-input
                  v-model="form.chineseName"
                  placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="中文简称 :">
          <el-input
                  v-model="form.chineseAbbreviation"
                  placeholder="请输入内容"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="英文名称 :">
          <el-input
                  v-model="form.englishName"
                  placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="英文简称:">
          <el-input
                  v-model="form.englishAbbreviation"
                  placeholder="请输入内容"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="国家地区:">
          <el-select
                  v-model="form.countriesAndRegions"
                  filterable
                  placeholder="请选择"
          >
            <el-option
                    v-for="item in regionData"
                    :key="item.englishAbbreviation"
                    :label="item.englishAbbreviation+'-'+item.chineseAbbreviation"
                    :value="item.englishAbbreviation"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="境内外:">
          <el-select
                  v-model="form.domesticAndForeign"
                  filterable
                  placeholder="请选择"
          >
            <el-option label="境内" value="N"></el-option>
            <el-option label="境外" value="Y"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="组织机构类型:">
          <el-select
                  v-model="form.organizationType"
                  filterable
                  placeholder="请选择"
          >
            <el-option
                    v-for="item in organizationList"
                    :key="item.keyType"
                    :label="item.valueType"
                    :value="item.valueType"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="合约账单要求:">
          <el-select
                  v-model="form.contractBillingRequirements"
                  filterable
                  placeholder="请选择"
          >
            <el-option
                    v-for="item in contractAsk"
                    :key="item.keyType"
                    :label="item.valueType"
                    :value="item.valueType"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="10">
        <el-form-item label="开票原则:">
          <el-select
                  v-model="form.billingPrinciple"
                  filterable
                  placeholder="请选择"
          >
            <el-option
                    v-for="item in billingTenet"
                    :key="item.keyType"
                    :label="item.valueType"
                    :value="item.valueType"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开票容错度:">
          <el-select
                  v-model="form.faultToleranceOfBilling"
                  filterable
                  placeholder="请选择"
          >
            <el-option
                    v-for="item in optingList"
                    :key="item.keyType"
                    :label="item.valueType"
                    :value="item.valueType"
            >
            </el-option>
          </el-select>

        </el-form-item>
        <el-form-item label="公司邮箱后缀:">
          <el-input
                  v-model="form.emailSuffix"
                  placeholder="请输入内容"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="结算原则:">
          <el-select
                  v-model="form.settlementPrinciple"
                  filterable
                  placeholder="请选择"
          >
            <el-option
                    v-for="item in settlement"
                    :key="item.keyType"
                    :label="item.valueType"
                    :value="item.valueType"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Settlement Currency:">
          <el-select
                  v-model="form.settlementCurrency"
                  filterable
                  placeholder="请选择"
          >
            <el-option
                    v-for="item in currencyList"
                    :key="item.keyType"
                    :label="item.valueType"
                    :value="item.valueType"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="地址:">
          <el-input
                  v-model="form.address"
                  placeholder="请输入内容"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-button type="primary" @click="addBreCustomerCompanyInfo()"
        >提交</el-button
        >
        <el-button type="primary" @click="resetForm()">重置</el-button>
        <el-button type="primary" @click="returnPage()">返回</el-button>
      </el-col>
    </el-form>
  </div>
</template>

<script>
  export default {
    props: {
      companyAddMethod: {
        type: Function,
        default: null,
      },
      form:{
        type:Object,
        default: {emailSuffix:"", //公司邮箱后缀
          chineseAbbreviation: "",
          englishName: "",
          chineseName:"",
          englishAbbreviation: "",
          countriesAndRegions: "",
          domesticAndForeign: "",
          organizationType: "",
          contractBillingRequirements: "",
          billingPrinciple: "",
          faultToleranceOfBilling: "",
          settlementPrinciple: "",
          settlementCurrency: "",
          address:"",},
      },
      flag:{
        type:String,
      },
    },
    data() {
      return {

        organizationList: [], //组织机构类型
        contractAsk: [], //合约账单要求
        billingTenet:[], //开票原则
        settlement:[],//结算原则
        currencyList:[], //结算货币
        optingList:[],  //开票容错度
        regionData:[],//国家地区

      };
    },
    async created() {
      await this.getBreWordbookType("组织机构类型")
      await this.getBreWordbookType("合约账单要求")
      await this.getBreWordbookType("结算原则")
      await this.getBreWordbookType("Settlement Currency")
      await this.getBreWordbookType("开票原则")
      await this.getBreWordbookType("开票容错度")
      await this.getBreCountryRegionInfoList();
      // await this.getBreCustomerCompanyInfoList();
      // this.form=this.customerInfo;
    },
    mounted() {},

    methods: {
      //添加数据
      addBreCustomerCompanyInfo() {
        console.log(this.flag)
        if(this.flag==='Y'){
          console.log(this.form)
          this.$axios.updateBreCustomerCompanyInfo(this.form).then((res) => {
            if (res.data.code == "0") {
              this.$message.success("修改成功！");
              this.companyAddMethod();
              this.form = {};
            }
          });
        }else{
          console.log(this.form)
          this.$axios.addBreCustomerCompanyInfo(this.form).then((res) => {
            if (res.data.code == "0") {
              this.$message.success("添加成功！");
              this.companyAddMethod();
              this.form = {};
            }
          });
        }
      },

      //获取 国家地区的下拉框
      async getBreCountryRegionInfoList() {
        await this.$axios.getBreCountryRegionInfoList({}).then(res => {
          if (res.data.status != 403) {
            let data = res.data.data;
            this.regionData = data;
          }
        }).catch(error => {
          console.log(error);
        })
      },
      //获取select的选项
      async getBreWordbookType(val){

        await this.$axios.getBreWordbookType(val).then(res => {
          if (val == '组织机构类型') {
            let data = res.data;
            if (data.code == '0') {
              this.organizationList = data.data
            } else {
              this.$message.info("没有找到数据");
            }
          } else if (val == '合约账单要求') {
            let data = res.data;
            if (data.code == '0') {
              this.contractAsk = data.data
            } else {
              this.$message.info("没有找到数据");
            }
          }else if (val == '结算原则') {
            let data = res.data;
            if (data.code == '0') {
              this.settlement = data.data
            } else {
              this.$message.info("没有找到数据");
            }
          }else if (val == 'Settlement Currency') {
            let data = res.data;
            if (data.code == '0') {
              this.currencyList = data.data
            } else {
              this.$message.info("没有找到数据");
            }
          }
          else if (val == '开票原则') {
            let data = res.data;
            if (data.code == '0') {
              this.billingTenet = data.data
            } else {
              this.$message.info("没有找到数据");
            }
          }
          else if (val == '开票容错度') {
            let data = res.data;
            if (data.code == '0') {
              this.optingList = data.data
            } else {
              this.$message.info("没有找到数据");
            }
          }
        })
      },
      resetForm() {
        this.form = {};
      },

      returnPage() {
        this.$router.push("/breCustomerCompanyIndex");
      },
    },
  };
</script>

<style lang="less" scoped>
  /deep/.el-input__inner{
    width: 200px;
  }
</style>
