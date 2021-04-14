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
      <el-button type="primary" @click="onSubmit">立即添加</el-button>
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
          nonPropLayer:""
        }
      }
    },
    created(){
       this.form.breSlipNumber = this.$route.query.id
    },
    methods: {
     async onSubmit() {
      
        const {data} = await this.$axios.addBreTreatyNonPropInfo(this.form)
        if(data.code == 0){
          this.$message.success("添加成功")
          this.$router.push(`/editContract?id=${this.form.breSlipNumber}`)
        }else{
          this.$message.error("添加失败")
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