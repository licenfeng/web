<template>
    <el-form :model="form"  :inline="true" status-icon :rules="rules" ref="form" label-width="auto">
     <el-col align="left">  <div class="grid-content bg-purple" style="font-size: 24px;font-weight:bold;text-align:left;">新增配置</div>
        <div style="height: 40px"></div>
     </el-col>
        <el-col :span="8">
            <el-form-item label="分类 :" prop="type">
                <el-select
                    clearable
                   @change="selectType"
                    v-model="form.type"
                    filterable
                    allow-create
                    default-first-option
                    placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.type"
                    :value="item.type">
                    </el-option>
                </el-select>
            </el-form-item>
            </el-col>
              <el-col :span="8">
            <el-form-item  label="分类描述 :" prop="typeDesc" >
                <el-input v-model="form.typeDesc" placeholder="请输入内容" :disabled="form.type ? true : false" ></el-input>
            </el-form-item>
        </el-col>

            <el-col :span="8">
        <el-form-item label="主键(key):" prop="keyType">
            <el-input v-model="form.keyType" placeholder="请输入内容" ></el-input>
           
        </el-form-item>
        </el-col>
            <el-col :span="8">
            <el-form-item label="显示值:" prop="valueType">
                <el-input v-model="form.valueType" placeholder="请输入内容" ></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="8">
            <el-form-item label="主健描述:" prop="keyDesc">
                <el-input v-model="form.keyDesc" placeholder="请输入内容" ></el-input>
            </el-form-item>
            </el-col>

            <el-col :span="24" style="margin-top:30px">
            <el-button type="primary" @click="addBreWordbookInfo()">提交</el-button>
            <el-button @click="resetForm('form')">重置</el-button> 
            <el-button type="primary" @click="returnPage()">返回</el-button>
            </el-col>
    </el-form>

</template>

<script>
export default {
    data(){
        return {
            rules:{
                type:[{ required: true, message: '请输入type', trigger: 'blur' }],
                typeDesc:[{required: true, message: '请输入typeDesc', trigger: 'blur' }],
                keyType:[{required: true, message: '请输入keyType', trigger: 'blur' }],
                valueType:[{required: true, message: '请输入valueType', trigger: 'blur' }],
                keyDesc:[{required: true, message: '请输入valueType', trigger: 'blur' }]
            },
            form:{
                keyDesc:"",
                keyOff:"",
                keyType:"",
                type:"",
                typeDesc:"",
                valueType:"",
                keyOff:"Y"
            },
            options:[]
        }
    },
    created() {
        this.getTableInfo()
    },
    mounted() {

    },

    methods: {
        //获取下拉数据
       async getTableInfo(){
        const {data} = await this.$axios.getBreWordbookInfoGroupByType({})
            if(data.code == 0){
                this.options = data.data
                console.log(this.options);
            }
        },
        addBreWordbookInfo(){
            console.log(this.form)
            this.$refs.form.validate( async valid=>{
                if(valid){
                this.$axios.addBreWordbookInfo(this.form).then(res => {
                 if(res.data.code=='0'){
                  this.$message.success('添加成功！');
                    this.$router.push('/breWordbookInfoIndex');
                   }
                  });
                }else{
                    this.$message.error("请填写完整输入框")
                }
            })
        },

        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        returnPage(){
            this.$router.push('/breWordbookInfoIndex');
        },
        selectType(){
            let flag = false;
            this.options.forEach(item=>{
                 if(flag){
                   return;
                }
                for(let key in item){
                    if(this.form.type === item.type){
                        this.form.typeDesc = item.typeDesc;
                        flag=true;
                        return;
                    }else{
                         this.form.typeDesc="";
                    }
                }
               
            })
        }

    }


}
</script>

<style>



</style>
