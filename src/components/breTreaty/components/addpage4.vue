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
<!--      <el-select v-model="form.lineOfBusiness" placeholder="请选择">-->
<!--        <el-option v-for="item in info" :key="item.id" :value="item.keyType">{{item.valueType}}</el-option>-->
<!--      </el-select>-->
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
        info:{ //这是

        },
        form: {
        sectionName:"",
        lineOfBusiness:"",
        grossRetention:"",
        cessionForQuotaShare:"",
        lineSurplus:"",
        commissionForQuotaShare:"",
        fixedOrProvisionalCommissionforQuota:"",
        commissionForSurplus:"",
        fixedOrProvisionalCommissionForSurplus:"",
        epiForQuotaShare:"",
        epiForSurplus:"",
        eventLimit:"",
        breSlipNumber:""
        }
      }
    },
    created(){
      this.getOptions()
    },
    methods: {
      async getOptions(){
        this.form.breSlipNumber = this.$route.query.id
        //这个接口封装的是seclect的下拉选项
        // console.log(this.$route.query.id);
        const {data} = await this.$axios.getBreWordbookInfo({})
        this.info = data.data 
      },
    onSubmit() {
        this.$axios.addBreTreatyPropInfo(this.form).then(res=>{
          console.log(res);
        this.$router.push(`/Page4?id=${this.$route.query.id}`)
        })
      },
      concealButton(){
        this.$router.replace(`/Page4?id=${this.$route.query.id}`)
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