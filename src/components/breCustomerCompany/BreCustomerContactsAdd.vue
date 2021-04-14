<template>
  <div>
      <my-breadcrumb :breadcrumbList="breadcrumbList"></my-breadcrumb>
      <el-form label-width="auto">
      <el-col :span="12">
          <el-form-item label="姓名:">
              <el-input v-model="form.contactsName"  placeholder="请输入内容"  ></el-input>
          </el-form-item>
      </el-col>
          <el-col :span="12">
          <el-form-item  label="联系方式:">
              <el-input v-model="form.contactInformation" placeholder="请输入内容"  ></el-input>
          </el-form-item>
          </el-col>
      <el-col :span="12">
          <el-form-item label="个人邮箱:">
              <el-input v-model="form.mailbox"  placeholder="请输入内容"  ></el-input>
          </el-form-item>
      </el-col>
      <el-col :span="12">
          <el-form-item label="公司邮箱:">
              <el-input v-model="form.companyEmail"  placeholder="请输入邮箱"  ></el-input>
          </el-form-item>
      </el-col>
          <el-col :span="12">
          <el-form-item  label="职责:">
              <el-input v-model="form.duty" placeholder="请输入内容"  ></el-input>
          </el-form-item>
      </el-col>
      <el-col :span="12">
          <el-form-item  label="入职日期:">
              <el-date-picker
                v-model="form.entryDate"
                type="date"
                format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                @change="choose"
                placeholder="选择日期">
              </el-date-picker>
          </el-form-item>
      </el-col>
          <el-col :span="12">
          <el-form-item  label="离职日期:">
              <el-date-picker
                      v-model="form.departureDate"
                      type="date"
                      format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                      @change="choose"
                      placeholder="选择日期时间">
              </el-date-picker>
          </el-form-item>
      </el-col>
      </el-form>
          <el-col :span="24" style="margin-top:30px">
              <el-button type="primary" @click="addBreCustomerContactsInfo()">保存</el-button>
              <el-button type="primary" @click="resizeTo()">重置</el-button>
              <el-button v-if="!isAdd" type="primary" @click="returnPage">返回</el-button>
          </el-col>
  </div>
</template>
<script>
import MyBreadcrumb from '@/components/common/breadcrumb.vue'
export default {
    components:{
        MyBreadcrumb
    },
    props:{
        isAdd:{
            type:String,
        },
        customerId:{
            type:String,
        },
        fatherMethod: {
            type: Function,
            default: null
        }
    },
    data() {
        return {
            breadcrumbList:['交易对手信息',"新增"],
            form:{
                id:"",
                contactsName:"",
                customerId:"",
                contactInformation:"",
                mailbox:"",
                companyEmail:'',
                duty:"",
                entryDate:"",
                departureDate:"",
                enable:"Y",
                // companyMailbox:""
            },
            updateFrom:{
                id:""
            }
        }
  },
    created() {
          this.getCustomerInfo();
    },
   
    methods:{
        //对时间做判断
        choose(){
            if(this.form.entryDate > this.form.departureDate){
                alert("离职时间必须大于等于入职时间")
            }
        },
        getCustomerInfo(){
            if(!this.isAdd){
                this.updateFrom.id= this.$route.query.id;
                this.$axios.getBreCustomerContactsInfo(this.updateFrom).then(res => {
                    if(res.data.code == '0' ){
                        let data = res.data.data;
                        this.form = data[0];
                    }
                }).catch(error => {
                    console.log(error);
                })
            }
        },
        addBreCustomerContactsInfo(){ 
            if(this.isAdd){
                this.form.customerId= this.customerId;
                this.$axios.addBreCustomerContactsInfo(this.form).then(res => {
                    if(this.form.entryDate > this.form.departureDate){
                        alert("请重新填写入职和离职时间")
                        }else{
                        this.$message.success('添加成功！');
                         this.form = {}
                        this.fatherMethod();
                    }
                }).catch(error => {
                    console.log(error);
                })
            }else{
                this.$axios.updateBreCustomerContactsInfo(this.form).then(res => {
                    if(res.data.code == 0){
                        this.$message.success('保存成功！');
                        this.form = {}
                        this.$router.go(-1);
                    }

                }).catch(error => {
                    console.log(error);
                })
            }

        },
        returnPage(){
            this.$router.go(-1);
        },
        resizeTo(){
            this.form={};
        }
    }
}
</script>

<style lang="less" scoped>
/deep/.el-input__inner{
    width: 220px;
}
</style>
