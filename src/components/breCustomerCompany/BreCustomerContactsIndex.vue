<template>
  <div>
      <el-row>
          <el-col :span="20">
              <div class="grid-content bg-purple" style="font-size: 24px;font-weight:bold;text-align:left;">交易对手联系人信息</div>
          </el-col>
          <el-col :span="6">
          </el-col>
      </el-row>
      <el-row>
      <el-col :span="20">
          <div style="height: 40px"></div>
      </el-col>
  </el-row>

    <el-table :data="customerData" stripe border style="width: 100%">
        <el-table-column prop="contactsName" label="姓名"></el-table-column>
        <el-table-column prop="contactInformation" label="联系方式"> </el-table-column>
        <el-table-column prop="mailbox" label="邮箱" > </el-table-column>
        <el-table-column prop="duty" label="职责" > </el-table-column>
        <el-table-column prop="entryDate" label="入职日期" > </el-table-column>
        <el-table-column prop="departureDate" label="离职日期"></el-table-column>
        <el-table-column prop="enable" label="是否启用" style="height: 20px;">
            <template slot-scope="scope">
                <el-switch
                    v-model="scope.row.checked"
                    @change="updateBreCustomerContactsInfo(scope.row)"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                </el-switch>
            </template>
        </el-table-column>
        <el-table-column prop="enable" label="操作" style="height: 20px;">
            <template slot-scope="scope">
                <el-button type="text" @click="updateContactsInfo(scope.row.id)">编辑</el-button>
            </template>
        </el-table-column>
    </el-table>
      <el-dialog
              :visible.sync="this.dialogVisibleAdd"
              width="50%"
              height="100%"
              :before-close="dialogVisibleAddClose">
          <div class="dialogDiv">
              <bre-customer-contacts-add :customer-id="id"></bre-customer-contacts-add>
          </div>

      </el-dialog>

  </div>
</template>

<script>
    import breCustomerContactsAdd from './BreCustomerContactsAdd.vue'
export default {
    components: {
        breCustomerContactsAdd,
    },
    props:{
        customerId:{
            type:String
        },
        customerData:{
            type:Array,
            default(){
                return [0,1,2,3]
            }
        },
        fatherMethodUpdate: {
            type: Function,
            default: null
        }
    },
    data() {
        return {
            id:"",
            dialogVisible:false,
            dialogVisibleAdd:false,
            workId:"",
            options:[],
            reqFrom:{
                customerId:"",
                type:"",
                enable:"",
            },
        }
  },
    created() {
    },
    mounted() {
    },

    methods: {
        updateContactsInfo(id){
            this.$router.push({path:'/breCustomerContactsAdd',query:{id:id}});

        },
        dialogVisibleAddClose(done){
            this.dialogVisibleAdd=false;
            done();
        },




        handleClose(done) {
            this.dialogVisible=false;
            done();
        },
        toAdd(){
            this.$router.push('/breCustomerCompanyAdd');
        },
        updateBreCustomerContactsInfo(item){
            console.log(item);
            this.reqFrom={};
            this.reqFrom.id = item.id;
            if(item.departureFlag == 'Y'){
                this.reqFrom.departureFlag='N';
            }else{
                this.reqFrom.departureFlag='Y';
            }

            this.$axios.updateBreCustomerContactsInfo(this.reqFrom).then(res => {
                console.log(res);
            }).catch(error => {
                console.log(error);
            })
        },
        addBreCustomerContacts(){
            this.dialogVisible=false;
            this.id=this.customerId;
            this.dialogVisibleAdd=true;

        }
    }
}
</script>

<style>
    .dialogDiv {
        height: 500px;
        overflow: auto;
    }
</style>
