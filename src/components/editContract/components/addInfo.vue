<template>
  <div>
    <el-form :model="formDrawer" label-width="auto" :inline="true">
            <el-form-item label="Reinsurer" >
              <el-input v-model="formDrawer.Reinsurer" ></el-input>
            </el-form-item>
            <el-form-item label="Country of Reinsurer" >
              <el-input v-model="formDrawer.CountryOfReinsurer" ></el-input>
            </el-form-item>
            <el-form-item label="Settlement Currency" >
              <el-input v-model="formDrawer.SettlementCurrency" ></el-input>
            </el-form-item>
            <el-form-item label="Placement Broker" >
              <el-input v-model="formDrawer.PlacementBroker" ></el-input>
            </el-form-item>
            <el-form-item label="Country of Placement Broker" >
              <el-input v-model="formDrawer.CountryOfPlacementBroker" ></el-input>
            </el-form-item>
            <el-form-item label="Settlement Currency" >
              <el-input v-model="formDrawer.SettlementCurrency" ></el-input>
            </el-form-item>
            <el-form-item label="Brokerage" >
              <el-input v-model="formDrawer.Brokerage" ></el-input>
            </el-form-item>
            <el-form-item label="Including/Excluding Brokerage VAT" >
              <el-input v-model="formDrawer.IncludingExcludingBrokerageVAT" ></el-input>
            </el-form-item>
            <el-form-item label="other fee/charge" >
              <el-input v-model="formDrawer.otherFeecharge" ></el-input>
            </el-form-item>
            <el-form-item label="Written Line" >
              <el-input v-model="formDrawer.WrittenLine" ></el-input>
            </el-form-item>
            <el-form-item label="Signed Line" >
              <el-input v-model="formDrawer.SignedLine" ></el-input>
            </el-form-item>
            <el-form-item label="Status">
              <el-select v-model="formDrawer.Status" placeholder="请选择国家">
                <el-option label="区域一" value="shanghai"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Signing Date" >
              <el-input v-model="formDrawer.SigningDate" ></el-input>
            </el-form-item>
            <el-form-item label="Expiry Date of Extension " >
              <el-input v-model="formDrawer.ExpiryDateOfExtension" ></el-input>
            </el-form-item>
            <el-form-item label="Underwriting Period" >
              <el-input v-model="formDrawer.UnderwritingPeriod" ></el-input>
            </el-form-item>
            <el-form-item label="R/I Condition" >
              <el-input v-model="formDrawer.RICondition" ></el-input>
            </el-form-item>
            <el-form-item label="Remarks" >
              <el-input v-model="formDrawer.Remarks" ></el-input>
            </el-form-item>
            <el-form-item label="Business State" >
              <el-input v-model="formDrawer.BusinessState" ></el-input>
            </el-form-item>
            <el-form-item label="Class of Business">
                <el-input v-model="formDrawer.ClassOfBusiness" ></el-input>
            </el-form-item>
            <el-form-item label="R/I Commission for Quota Share">
                <el-input v-model="formDrawer.RICommissionForQuotaShare" ></el-input>
            </el-form-item>
            <el-form-item label="R/I Commission for Surplus">
                <el-input v-model="formDrawer.RICommissionForSurplus" ></el-input>
            </el-form-item>
            <el-form-item class="item-formButton">
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
          </el-form>
  </div>
</template>

<script>
export default {
  data() {
      return {
        formDrawer: {
        Reinsurer: '',
        CountryOfReinsurer: '',
        SettlementCurrency: '',
        PlacementBroker: '',
        CountryOfPlacementBroker: "",
        SettlementCurrency: "",
        Brokerage: '',
        IncludingExcludingBrokerageVAT: '',
        otherFeecharge:"",
        WrittenLine:"",
        SignedLine:"",
        Status:"",
        SigningDate:"",
        ExpiryDateOfExtension :"",
        UnderwritingPeriod:"",
        RICondition:"",
        Remarks:"",
        BusinessState:"",
        ClassOfBusiness:"666", //这几项是表格的数据项
        RICommissionForQuotaShare:"777",
        RICommissionForSurplus:"888"
      },
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
}
</script>

<style lang="less" scoped>
  // .el-form{
  //    display: flex;
  //       flex-wrap: wrap;
  //       justify-content: space-around;
  // }
  .item-formButton{
      margin-top: 40px;
      display: block;
  }
</style>
