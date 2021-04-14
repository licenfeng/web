<template>
  <div>
    <el-form ref="form" :model="form" label-width="auto" :inline="true">
    <el-col :span="8">
    <el-form-item label="section Name">
      <el-input v-model="form.sectionName"></el-input>
    </el-form-item>
    </el-col>
    <el-col :span="8">
    <el-form-item label="Line of Business">
      <el-input v-model="form.lineOfBusiness"></el-input>
    </el-form-item>
    </el-col>
    <el-col :span="8">
    <el-form-item label="Gross Retention">
      <el-input v-model="form.grossRetention"></el-input>
    </el-form-item>
    </el-col>
    <el-col :span="8">
    <el-form-item label="Cession for QUO">
        <div class="form_content"><el-input v-model="form.cessionForQuotaShare"></el-input><span>%</span></div>
    </el-form-item>
    </el-col>
    <el-col :span="8">
    <!-- <el-form-item label="Fixed/Provisional Comm. for QUO"> -->
    <el-form-item label="Fixed/Prov. Comm. for QUO">
        <el-select
                v-model="form.fixedOrProvisionalCommissionforQuota"
                filterable
                placeholder="请选择"
        >
            <el-option label="Fixed Comm. for QUO" value="Fixed Comm. for QUO"></el-option>
            <el-option label="Prov Comm. for QUO" value="Prov Comm. for QUO"></el-option>
        </el-select>
    </el-form-item>
    </el-col>
    <el-col :span="8">
    <el-form-item label="line SPL">
      <el-input v-model="form.lineSurplus"></el-input>
    </el-form-item>
    </el-col>
    <el-col :span="8">
    <el-form-item label="R/I Comm. for QUO">
      <div class="form_content"><el-input v-model="form.commissionForQuotaShare"></el-input><span>%</span></div>
    </el-form-item>
    </el-col>
    <el-col :span="8">
    <el-form-item label="R/I Comm. for SPL">
      <div class="form_content"><el-input v-model="form.commissionForSurplus"></el-input><span>%</span></div>
    </el-form-item>
    </el-col>
    <el-col :span="8">
    <!-- <el-form-item label="Fixed/Provisional Comm. for SPL"> -->
    <el-form-item label="Fixed/Prov. Comm. for SPL">
        <el-select
                v-model="form.fixedOrProvisionalCommissionForSurplus"
                filterable
                placeholder="请选择">
            <el-option label="Fixed Comm. for SPL" value="Fixed Comm. for SPL"></el-option>
            <el-option label="Prov Comm. for SPL" value="Prov Comm. for SPL"></el-option>
        </el-select>
    </el-form-item>
    </el-col>
    <el-col :span="8">
    <el-form-item label="EPI for QUO">
      <el-input v-model="form.epiForQuotaShare"></el-input>
    </el-form-item>
    </el-col>
    <el-col :span="8">
    <el-form-item label="EPI for SPL">
      <el-input v-model="form.epiForSurplus"></el-input>
    </el-form-item>
  </el-col>
    <el-col :span="8">
    <el-form-item label="Event Limit">
      <el-input v-model="form.eventLimit"></el-input>
    </el-form-item>
   </el-col>
    <el-col :span="24">
    <el-form-item style="display:block; margin-top:20px;">
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
        sectionName:"",
        LineOfBusiness:"",
        grossRetention:"",
        cessionForQuotaShare:"",
        lineSurplus:"",
        commissionForQuotaShare:"",
        fixedOrProvisionalCommission:"",
        commissionForSurplus:"",
        fixedOrProvisionalCommission:"",
        epiForQuotaShare:"",
        epiForSurplus:"",
        eventLimit:""
        },
        id:"",
        value:""
      }
    },
    created(){
      this.getParamsId()
      this.id = this.$route.params.id //这是 这是propId
      this.value = this.$route.params.breSlipNumber //这是breSlipNumber
    },
    methods: {
    async onSubmit() {
       const res = await this.$axios.updateBreTreatyPropInfo(this.form)
        try{
          if(res){
            this.$message({
            message: '修改成功',
            type: 'success'
          });
          }
           this.$router.push(`/Page4?id=${this.value}`)
        }catch{
          this.$message.error('修改失败')
        }
      },
   async getParamsId(){
     console.log(this.id,this.value);
      const {data} = await this.$axios.selectBreTreatyPropInfo({id:this.id,breSlipNumber:this.value})
      const number = data.data
      number.forEach(item=>{
        for(let key in item){
          if(item.propId === this.id){
            this.form = item
          }
        }
      })
      // this.form = data.data[0]
      // console.log(this.form);
      },
      concealButton(){
        this.$router.replace(`/Page4?id=${this.value}`)
      }
    }
}
</script>

<style lang="less" scoped>
   .form_content{
    display: flex;
    >span{
      margin-left: 5px;
    }
  }
</style>