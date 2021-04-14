<template>
  <div>
    <el-form ref="form" :model="form" label-width="auto" :inline="true">
      
    <el-col :span="8">
    <el-form-item label="Layer">
      <el-input v-model="form.nonPropLayer"></el-input>
    </el-form-item>
    </el-col>
    <el-col :span="8">
    <el-form-item label="Limit Percentage">
      <el-input v-model="form.nonPropLimitPercentage"></el-input>
    </el-form-item>
    </el-col>
    <el-col :span="8">
    <el-form-item label="Limit Number">
      <el-input v-model="form.nonPropLimitNumber"></el-input>
    </el-form-item>
    </el-col>
    <el-col :span="8">
    <el-form-item label="GNPI">
      <el-input v-model="form.nonPropGnpi"></el-input>
    </el-form-item>
    </el-col>
    <el-col :span="8">
    <el-form-item label="Adjustable Rate">
      <el-input v-model="form.nonPropAdjustableRate"></el-input>
    </el-form-item>
    </el-col>
    <el-col :span="8">
    <el-form-item label="Deposit Premium">
      <el-input v-model="form.nonPropDepositPremium"></el-input>
    </el-form-item>
    </el-col>
    <el-col :span="8">
    <el-form-item label="DP%">
      <el-input v-model="form.nonPropDpPercent"></el-input>
    </el-form-item>
    </el-col>
    <!-- <el-col :span="8">
    <el-form-item label="Fixed/Provisional Comm.">
      <el-input v-model="form.ProvisionalCommission"></el-input>
    </el-form-item>
    </el-col> -->
    <el-col :span="8">
    </el-col>
    <el-col :span="8">
    <el-form-item label="Minimum Premium">
      <el-input v-model="form.nonPropMinimumPremium"></el-input>
    </el-form-item>
    </el-col>
    <el-col :span="8">
    <el-form-item label="MP%">
      <el-input v-model="form.nonPropMpPercent"></el-input>
    </el-form-item>
    </el-col>
    <el-col :span="8">
    <el-form-item label="Rate on Line">
      <el-input v-model="form.nonPropRateOnLine"></el-input>
    </el-form-item>
    </el-col>
    <el-col :span="8">
    <el-form-item label="Reinstatement">
      <el-input v-model="form.nonPropReinstatement"></el-input>
    </el-form-item>
    </el-col>
       <el-col :span="8">
    <el-form-item label="Coverage">
      <el-input v-model="form.nonPropCoverage"></el-input>
    </el-form-item>
    </el-col>
    <el-col :span="24">
    <el-form-item style="display:block">
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
          nonPropLimitNumber:"",
          nonPropLimitPercentage:"",
          nonPropGnpi:"",
          nonPropAdjustableRate:"",
          nonPropDepositPremium:"", //这个是重复项
          nonPropDpPercent:"",
          nonPropMpPercent:"", //这个是重复项
          nonPropRateOnLine:"",
          nonPropReinstatement:"",
          nonPropCoverage:"",
          breSlipNumber:"",
          nonPropLayer:"",
          nonPropId:""
        }
      }
    },
    created(){
      this.form.breSlipNumber = this.$route.params.number
      this.form.nonPropId = this.$route.params.id
      this.getContract()
    },
    methods: {
     async getContract(){
     const {data} = await this.$axios.getBreTreatyNonPropInfoList({nonPropId:this.form.nonPropId,breSlipNumber:this.form.breSlipNumber})
      if(data.code == 0 ){
        this.form = data.data[0]
      }
      },
     async onSubmit() {
       const {data} = await this.$axios.updateBreTreatyNonPropInfo(this.form)
       if(data.code == 0){
         this.$message.success("修改成功")
        this.$router.push(`/editContract?id=${this.form.breSlipNumber}`)
       }else{
         this.$message.error("修改失败请重试")
         this.$router.push(`/editContract?id=${this.form.breSlipNumber}`)
       }
      },
       concealButton(){
          this.$router.replace(`/editContract?id=${this.form.breSlipNumber}`)
        }
    }
}
</script>

<style lang="less" scoped>
</style>