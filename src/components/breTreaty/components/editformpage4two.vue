<template>
  <div>
    <el-form :model="formDrawer" :rules="rules" ref="ruleForm" label-width="auto" :inline="true">
          <el-col :span="8">
            <el-form-item label="Reinsurer" prop="reinsurer">
              <el-select v-model="formDrawer.reinsurer" filterable placeholder="" @change="selectIndex">
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
              <el-input v-model="formDrawer.countryOfReinsurer" disabled></el-input>
            </el-form-item>
             </el-col>
          <el-col :span="8">
            <el-form-item label="Settlement Currency" >
              <el-input v-model="formDrawer.settlementCurrency" disabled></el-input>
            </el-form-item>
             </el-col>
          <el-col :span="8">
            <el-form-item label="Placement Broker" >
              <el-select v-model="formDrawer.placementBroker" filterable placeholder="" @change="selectAttr">
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
              <el-input v-model="formDrawer.countryOfPlacementBroker" disabled ></el-input>
            </el-form-item>
             </el-col>
          
          <el-col :span="8">
            <el-form-item label="other fee/charge">
              <el-input v-model="formDrawer.otherFeeOrCharge" ></el-input>
            </el-form-item>
            </el-col>
          <el-col :span="8">
            <el-form-item label="Written Line" >
              <!-- <el-input v-model="formDrawer.writtenLine" ></el-input> -->
              <div class="form_content"><el-input v-model="formDrawer.writtenLine"></el-input><span>%</span></div>
            </el-form-item>
            </el-col>
          <el-col :span="8">
            <el-form-item label="Signed Line" >
              <div class="form_content"><el-input v-model="formDrawer.signedLine"></el-input><span>%</span></div>
            </el-form-item>
            </el-col>
          <el-col :span="8">
            <el-form-item label="States">
              <el-select v-model="formDrawer.statusReinsurer" placeholder="">
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
                v-model="formDrawer.signingDate"
                type="date"
                format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                >
              </el-date-picker>
            </el-form-item>
            </el-col>
          <el-col :span="8">
            <el-form-item label="Condition Reinsurer" >
              <el-input v-model="formDrawer.conditionReinsurer" ></el-input>
            </el-form-item>
            </el-col>
          <el-col :span="8">
            <el-form-item label="Reinsurer Remarks" >
              <el-input v-model="formDrawer.reinsurerRemarks" ></el-input>
            </el-form-item>
            </el-col>
          <el-col :span="8">
            <el-form-item label="R/I Comm. for QUO">
                <div class="form_content"><el-input v-model="formDrawer.arrangeCommissionForQuotaShare"></el-input><span>%</span></div>
            </el-form-item>
            </el-col>
          <el-col :span="8">
            <el-form-item label="R/I Comm. for SPL">
                <div class="form_content"><el-input v-model="formDrawer.arrangeCommissionForSurplus"></el-input><span>%</span></div>
            </el-form-item>
            </el-col>
              <el-col :span="8">
            <el-form-item label="BRE Brokerage" >
              <div class="form_content"><el-input v-model="formDrawer.breBrokerage" ></el-input><span>%</span></div>
            </el-form-item>
            </el-col>
             <el-col :span="8">
            <el-form-item label="Incl./Excl. Brokerage VAT" >
              <el-select v-model="formDrawer.includingExcludingBrokerageVat" placeholder="">
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
             <el-col :span="8">
            <el-form-item label="BRE Brokerage Percent" >
              <el-input v-model="formDrawer.breBrokeragePercent"></el-input>
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
    data(){
        return{
           formDrawer: {
        reinsurer: '',
        countryOfReinsurer: '',
        settlementCurrency: '',
        placementBroker: '',
        countryOfPlacementBroker: "",
        breBrokeragePercent:"",
        breBrokerage: '',
        includingExcludingBrokerageVat: '', //
        otherFeeOrCharge:"",
        writtenLine:"",
        signedLine:"",
        statusReinsurer:"",
        signingDate:"",
        conditionReinsurer:"",
        reinsurerRemarks:"",
        arrangeCommissionForQuotaShare:"",
        arrangeCommissionForSurplus:"",
        breSlipNumber:""
        },
           id:"",
           slipNumber:"",
           options:[],
        rules:{
        reinsurer:[
          { required: true, message: '请输入Reinsurer', trigger: 'blur' },
        ]
      },
      cedingCompanyList:[] //机构信息
        }
    },
    async created(){
        await this.getReinsurerInfo()
       await this.getBreWordbookType("States") //获取状态
       await this.getBreCustomerCompanyInfoList() //获取机构
    },
    methods:{
         //联动
      selectIndex(){
        this.cedingCompanyList.forEach(item =>{
        for(let key in item){
         if(item.englishName === this.formDrawer.reinsurer){
           this.formDrawer.countryOfReinsurer = item.countriesAndRegions
           if(!this.formDrawer.placementBroker){
             this.formDrawer.settlementCurrency = item.settlementPrinciple
           }
         }
        }
      })
      },
       //联动
      selectAttr(){
      this.cedingCompanyList.forEach(item =>{
        for(let key in item){
         if(item.englishName === this.formDrawer.placementBroker){
           this.formDrawer.countryOfPlacementBroker = item.countriesAndRegions
           this.formDrawer.settlementCurrency = item.settlementPrinciple
         }
        }
      })
      },
       async getReinsurerInfo(){
           this.id = this.$route.params.id
            this.slipNumber = this.$route.params.slipNumber
           const {data} = await this.$axios.getBreTreatyReinsurerInfoList({id:this.id,breSlipNumber:this.slipNumber})
           this.formDrawer = data.data[0]
        },
       async onSubmit(){
            const {data} = await this.$axios.updateBreTreatyReinsurerInfo(this.formDrawer)       
            console.log(data);
            if(data.code === 0 ){
                this.$message.success('修改成功')
                this.$router.push(`/Page4?id=${this.slipNumber}`)
            }else{
                this.$message.error("修改失败")
            }
        },
        concealButton(){
          this.$router.replace(`/Page4?id=${this.slipNumber}`)
        },
        //获取状态的信息
        async getBreWordbookType(val){
            await this.$axios.getBreWordbookType(val).then(res=>{
                let data = res.data;
                if (data.code == '0') {
                    this.options = data.data
                    console.log(this.options);
                } else {
                    this.$message.info("没有找数据");
                }
            }).catch(error => {
                console.log(error);
            })
        },
       async  getBreCustomerCompanyInfoList(){
       const {data} = await  this.$axios.getBreCustomerCompanyInfoList({})
        this.cedingCompanyList =  data.data;
    }
    }
}
</script>

<style lang="less" scoped>
  .item-formButton{
      margin-top: 20px;
      display: block;
  }
  /deep/ .el-input{
    width: 170px;
  }
.form_content{
    display: flex;
    >span{
      margin-left: 5px;
    }
  }
</style>