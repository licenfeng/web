<template>
  <div class="  ">
    <el-form ref="formData" :model="formData" label-width="200px" :inline="true">
          <el-col :span="8">
        <el-form-item  label="Treaty Name"
         prop="treatyName" 
         ref="name"
        :rules="[
        { required: true, message: '请输入TreatyName', trigger: 'blur' },]"
         >
          <el-input v-model="formData.treatyName" ></el-input>
        </el-form-item>
    </el-col>
      <el-col :span="8">
      <el-form-item  label="Treaty Type (Prop.) " prop="treatyType" ref="name">
        <!-- <el-input v-model="formData.treatyType"></el-input> -->
        <el-select v-model="formData.treatyType" placeholder="">
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
    <el-form-item label="CedingCompany" prop="cedingCompany" ref="name">
      <!-- <el-input v-model="formData.cedingCompany"></el-input> -->
      <el-select v-model="formData.cedingCompany" filterable placeholder="" @change="selectAttr">
            <el-option
              v-for="(item,index) in cedingCompanyList"
              :key="index"
              :label="item.englishName"
              :value="item.englishName">
            </el-option>
        </el-select>
    </el-form-item>
    </el-col>
      <el-col :span="8">
        <el-form-item  label="ProducingBroker" prop="producingBroker" ref="name">
          <!-- <el-input v-model="formData.producingBroker" ></el-input> -->
          <el-select v-model="formData.producingBroker" filterable placeholder="请选择" @change="selectIndex">
            <el-option
              v-for="(item,index) in cedingCompanyList"
              :key="index"
              :label="item.englishName"
              :value="item.englishName">
            </el-option>
        </el-select>
        </el-form-item>
        </el-col>

      <el-col :span="8">
    <el-form-item  prop="inceptionDate" ref="name" label="Inception Date">
      <el-date-picker
      v-model="formData.inceptionDate"
      type="datetime"
      format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
      >
    </el-date-picker>
    </el-form-item>
    </el-col>
      <el-col :span="8">
    <el-form-item  label="Currency" prop="currency" ref="name"> 
      <!-- <el-input v-model="formData.currency"></el-input> -->
      <el-select v-model="formData.currency" filterable placeholder="">
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
    <el-form-item  label="LeadingReinsurer" prop="leadingReinsurer" ref="name" >
      <!-- <el-input v-model="formData.leadingReinsurer"></el-input> -->
      <el-select v-model="formData.leadingReinsurer" filterable placeholder="">
          <el-option
          v-for="(item,index) in cedingCompanyList"
              :key="index"
            :label="item.englishName"
            :value="item.englishName">
          </el-option>
      </el-select>
    </el-form-item>
    </el-col>
      <el-col :span="8">
    <el-form-item   prop="expiryDate" ref="expiryDate" label="Expiry Date">
     <el-date-picker
      v-model="formData.expiryDate"
      type="datetime"
      @change="selectTime"
      format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
      >
    </el-date-picker>
    </el-form-item>
    </el-col>
      <el-col :span="8">
    <el-form-item  label="country of Ceding Company" prop="countryofCedingCompany" ref="countryofCedingCompany" >
      <el-input v-model="formData.countryOfCedingCompany" disabled></el-input>
    </el-form-item>
    </el-col>
      <el-col :span="8">
    <el-form-item  label="CountryofProducingBroker" prop="countryofProducingBroker" ref="countryofProducingBroker">
      <el-input v-model="formData.countryOfProducingBroker" disabled></el-input>
    </el-form-item>
    </el-col>
      <el-col :span="8">
    <el-form-item   prop="underwritingYear" ref="underwritingYear"  label="Underwriting Year">
     <el-date-picker
      v-model="formData.underwritingYear"
      type="year"
      format="yyyy" value-format="yyyy"
      @change="selectYear"
      placeholder="选择年">
    </el-date-picker>
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
data(){
   return{
    formData:{
        // treatyType:"",  
        // cedingCompany:"", //展示项
        // producingBroker:"", 
        // treatyName:"", //展示项
        // inceptionDate:"",
        // currency:"",
        // leadingReinsurer:"",
        // expiryDate:"",  
        // countryofCedingCompany:"",
        // countryofProducingBroker:"",
        // underwritingYear:"", //展示项
      },
        options:[],
        cedingCompanyList:[],
        currencyList:[],
        }
    },
   async created(){
    await this.getTableInfo()
      // this.getBreWordbookType("treatyType");
      // this.getBreWordbookType("cedingCompany");
      // this.getBreWordbookType("producingBroker");
      // this.getBreWordbookType("currency");
      // this.getBreWordbookType("leadingReinsurer");
      await this.getBreCustomerCompanyInfoList()
      await this.getBreCurrencyInfoList()
      await this.getBreWordbookType("Treaty Type (Prop.)");
    },
    methods:{
      //选择结束时间的时候
      selectTime(){
        if(this.formData.inceptionDate > this.formData.expiryDate){
          alert("开始时间必须小于结束时间")
          return false
        }
      },
      selectYear(){
        if(this.formData.expiryDate.substring(0,4) != this.formData.underwritingYear){
          alert("结束年份不等于选择年份 是否确认选择")
          return false
        }
      },
        async onSubmit(){
          const {data} = await this.$axios.updateBreTreatyBasisInfo(this.formData)
          console.log(data);
             if(data.code == 0){
            this.$message({
                message: '修改成功',
                type: 'success'
                });
                this.$router.push(`/Page4?id=${this.$route.query.id}`)
             }else{
               this.$message.error('错了哦，这是一条错误消息');
             }
        },
        //获取select选项数据
        //  async getBreWordbookType(val){
        //     await this.$axios.getBreWordbookType(val).then(res=>{
        //         let data = res.data;
        //         if (data.code == '0') {
        //             this.options = data.data
        //         } else {
        //             this.$message.info("没有找到数据");
        //         }
        //     }).catch(error => {
        //         console.log(error);
        //     })
        // },
       async getTableInfo(){
            const {data} = await this.$axios.getBreTreatyBasisInfo({breSlipNumber:this.$route.query.id})
            this.formData = data.data[0]
        },
        concealButton(){
          this.$router.replace(`/Page4?id=${this.$route.query.id}`)
        },
        async  getBreCustomerCompanyInfoList(){
        const {data} = await  this.$axios.getBreCustomerCompanyInfoList({})
        this.cedingCompanyList =  data.data
       },
       async getBreWordbookType(val){
            await this.$axios.getBreWordbookType(val).then(res=>{
                  if(val == 'Treaty Type (Prop.)'){
                    let data = res.data;
                    if (data.code == '0') {
                        this.options = data.data
                    } else {
                        this.$message.info("没有找到数据");
                    }
                    }
            })
        },
        //币种
      async getBreCurrencyInfoList(){
        await this.$axios.getBreCurrencyInfoList(this.reqFrom).then(res => {
            if (res.data.status != 403) {
                let data = res.data.data;
                this.currencyList = data;
            } else {
                this.$message.info("没有找数据");
            }
        }).catch(error => {
            console.log(error);
        })
      },
      //联动
      selectAttr(){
      this.cedingCompanyList.forEach(item =>{
        for(let key in item){
         if(item.englishName === this.formData.cedingCompany){
           this.formData.countryOfCedingCompany = item.countriesAndRegions
         }
        }
      })
      },
      //联动
      selectIndex(){
        this.cedingCompanyList.forEach(item =>{
        for(let key in item){
         if(item.englishName === this.formData.producingBroker){
           this.formData.countryOfProducingBroker = item.countriesAndRegions
         }
        }
      })
      },
      //选择结束时间的时候
      selectTime(){
        if(this.formData.inceptionDate > this.formData.expiryDate){
          alert("开始时间必须小于结束时间")
          return false
        }
      },
      selectYear(){
        if(this.formData.expiryDate.substring(0,4) != this.formData.underwritingYear){
          alert("结束年份不等于选择年份 是否确认选择")
          return false
        }
      },
    }
}
</script>

<style lang="less" scoped>
/deep/.rightfloat{
  .el-input__inner{
    width: 70%;
  }
}
/deep/.el-date-editor.el-input,
.el-date-editor.el-input__inner,
.el-select {
  width: 199.43px;
}
</style>