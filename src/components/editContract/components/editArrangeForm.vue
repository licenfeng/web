<template>
  <div>
    <el-form :model="form" label-width="auto" :inline="true" ref="ruleForm">
   
          <el-col :span="8">
            <el-form-item label="Reinsurer" prop="reinsurer" required>
              <el-select v-model="form.reinsurer" filterable placeholder="" @change="selectIndex">
                <el-option
                        v-for="item in cedingCompanyList"
                        :key="item.id"
                        :label="item.englishName"
                        :value="item.englishName">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8"> 
            <el-form-item label="Country of Reinsurer" >
              <el-input v-model="form.countryOfReinsurer" disabled></el-input>
            </el-form-item>
             </el-col>
          <el-col :span="8">
            <el-form-item label="Settlement Currency" >
              <el-input v-model="form.settlementCurrency" disabled></el-input>
            </el-form-item>
             </el-col>
          <el-col :span="8">
            <el-form-item label="Placement Broker" >
              <el-select v-model="form.placementBroker" filterable placeholder="" @change="selectAttr">
                <el-option
                        v-for="item in cedingCompanyList"
                        :key="item.id"
                        :label="item.englishName"
                        :value="item.englishName">
                </el-option>
              </el-select>
            </el-form-item>
             </el-col>
          <el-col :span="8">
            <el-form-item label="Country of Placement Broker" >
              <el-input v-model="form.countryOfPlacementBroker" disabled></el-input>
            </el-form-item>
            </el-col>
          <el-col :span="8">
            <el-form-item label="BRE Brokerage" >
              <el-input v-model="form.breBrokerage" ></el-input>
            </el-form-item>
            </el-col>
          <el-col :span="8">
            <el-form-item label="other fee/charge">
              <el-input v-model="form.otherFeeOrCharge" ></el-input>
            </el-form-item>
            </el-col>
          <el-col :span="8">
            <el-form-item label="Written Line" >
              <el-input v-model="form.writtenLine" ></el-input>
            </el-form-item>
            </el-col>
          <el-col :span="8">
            <el-form-item label="Signed Line" >
              <el-input v-model="form.signedLine" ></el-input>
            </el-form-item>
            </el-col>
          <el-col :span="8">
            <el-form-item label="States">
             
              <el-select v-model="form.statusReinsurer" placeholder="">
                <el-option
                        v-for="item in options"
                        :key="item.keyType"
                        :label="item.valueType"
                        :value="item.valueType">
                </el-option>
              </el-select>
            </el-form-item>
            </el-col>
          <el-col :span="8">
            <el-form-item label="Signing Date" >
               <el-date-picker
                v-model="form.signingDate"
                type="datetime"
                format="yyyy-MM-dd" value-format="yyyy-MM-dd HH:mm:ss"
                >
              </el-date-picker>
            </el-form-item>
            </el-col>
          <el-col :span="8">
            <el-form-item label="Condition Reinsurer" >
              <el-input v-model="form.conditionReinsurer" ></el-input>
            </el-form-item>
            </el-col>
          <el-col :span="8">
            <el-form-item label="Reinsurer Remarks" >
              <el-input v-model="form.reinsurerRemarks" ></el-input>
            </el-form-item>
            </el-col>
   <!--          <el-col :span="8">
            <el-form-item label="Settlement Currency Broker">
                <el-input v-model="form.settlementCurrencyBroker" ></el-input>
            </el-form-item>
            </el-col>
            -->
            <el-col :span="8">
             <el-form-item label="BRE Brokerage Percent" >
              <el-input v-model="form.breBrokeragePercent"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="8">
            <el-form-item label="incl./Excl. Brokerage VAT" >
                <el-select v-model="form.includingExcludingBrokerageVat" placeholder="">
                <el-option
                        label="Incl.Brokerage VAT"
                        value="Incl.Brokerage VAT">
                </el-option>
                 <el-option
                        label="Excl. Brokerage VAT"
                        value="Excl. Brokerage VAT">
                </el-option>
              </el-select>
            </el-form-item>
            </el-col>
          <el-col :span="24">
            <el-form-item class="item-formButton">
                <el-button type="primary" @click="onSubmit">立即修改</el-button>
                <el-button @click="concealButton">取消</el-button>
            </el-form-item>
            </el-col>
          </el-form>
  </div>
</template>

<script>
export default {
  data() {
      return {
        form: {
        reinsurer: '',
        countryOfReinsurer: '',
        settlementCurrency: '',
        placementBroker: '',
        countryOfPlacementBroker: "",
        settlementCurrencyBroker: "",
        breBrokeragePercent:"",
        breBrokerage: '',
        includingExcludingBrokerageVat: '', 
        otherFeeOrCharge:"",
        writtenLine:"",
        signedLine:"",
        statusReinsurer:"",
        signingDate:"",
        conditionReinsurer:"",
        reinsurerRemarks:"",
        isNonProp:'Y'
      },
        slipNumber:"",
        id:"",
      options:[],
      cedingCompanyList:[] //机构信息
      }
    },
   async created(){
      this.id = this.$route.params.id
      this.slipNumber = this.$route.params.slipNumber
      await this.getArrange()
      await this.getBreWordbookType("States") //获取状态
      await this.getBreCustomerCompanyInfoList()
    },
    methods: {
      selectIndex(){
        this.cedingCompanyList.forEach(item =>{
        for(let key in item){
         if(item.englishName === this.form.reinsurer){
           this.form.countryOfReinsurer = item.countriesAndRegions
           if(!this.form.placementBroker){
             this.form.settlementCurrency = item.settlementPrinciple
           }
         }
        }
      })
      },
       //联动
      selectAttr(){
      this.cedingCompanyList.forEach(item =>{
        for(let key in item){
         if(item.englishName === this.form.placementBroker){
           this.form.countryOfPlacementBroker = item.countriesAndRegions
           this.form.settlementCurrency = item.settlementPrinciple
         }
        }
      })
      },
          //获取状态的信息
        async getBreWordbookType(val){
            await this.$axios.getBreWordbookType(val).then(res=>{
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
        //获取机构信息
          async  getBreCustomerCompanyInfoList(){
          const {data} = await  this.$axios.getBreCustomerCompanyInfoList({})
            this.cedingCompanyList =  data.data
        },
        async getBreWordbookType(val){
            await this.$axios.getBreWordbookType(val).then(res=>{
                let data = res.data;
                if (data.code == 0) {
                    this.options = data.data
                } else {
                    this.$message.info("没有找数据");
                }
            }).catch(error => {
                console.log(error);
            })
        },
    async onSubmit() {
      this.form.breSlipNumber = this.$route.query.id
      const {data} = await this.$axios.updateBreTreatyReinsurerInfo(this.form)
      console.log(data);
        if(data.code == 0 ){
          this.$message.success('添加成功')
          this.$router.push(`/editContract?id=${this.slipNumber}`)
        }else{
          this.$message.error('添加失败')
        }
      },
    async getArrange(){
         const {data} = await this.$axios.getBreTreatyReinsurerInfoList({id:this.id,breSlipNumber:this.slipNumber})
          console.log(data);
           this.form = data.data[0]
      },
      concealButton(){
          this.$router.replace(`/editContract?id=${this.slipNumber}`)
        }
    }
}
</script>

<style lang="less" scoped>
  .item-formButton{
      margin-top: 20px;
      display: block;
  }
  /deep/.el-date-editor--datetime{
  width: 199.34px;
}

/deep/ .el-input{
  width: 170px;
}
</style>
