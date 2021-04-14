<template>
  <div>
    
      <el-button type="primary" @click="concealButton">
          返回
      </el-button>
    
 <el-table :data="tableData" border>
    <el-table-column  prop="arrangeSection" label="Section">
    </el-table-column>
    <el-table-column  prop="lineOfBusiness" label="line of Business">
      <template slot-scope="scope">
        <span v-if="!scope.row.isDisplay">{{ scope.row.lineOfBusiness }}</span>
        <el-input v-if="scope.row.isDisplay" v-model="scope.row.lineOfBusiness"></el-input>
       </template>
    </el-table-column>
    <el-table-column  prop="arrangeCommissionForQuotaShare" label="R/I Comm. for QUO">
    <template slot-scope="scope">
        <span v-if="!scope.row.isDisplay">{{ scope.row.arrangeCommissionForQuotaShare }}</span>
        <el-input v-if="scope.row.isDisplay" v-model="scope.row.arrangeCommissionForQuotaShare"></el-input>
       </template>
    </el-table-column>
    <el-table-column  prop="arrangeCommissionForSurplus" label="R/I Comm. for SPL">
    <template slot-scope="scope">
        <span v-if="!scope.row.isDisplay">{{ scope.row.arrangeCommissionForSurplus }}</span>
        <el-input v-if="scope.row.isDisplay" v-model="scope.row.arrangeCommissionForSurplus"></el-input>
       </template>
    </el-table-column>
    <el-table-column  label="操作">
      <template slot-scope="scope">
            <el-button type="text" v-if="!scope.row.isDisplay" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
            <el-button type="text" v-else @click="handleSuccess(scope.$index,scope.row)">保存</el-button>
      </template>
    </el-table-column>
  </el-table>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        edit:"编辑",
        tableData: [],
        sectionId:"",
        breSlipNumber:''
      }
    },
    created(){
      this.getSectionId()
      this.breSlipNumber = this.$route.params.number
      
    },
    methods: {
      //获取ID
     async getSectionId(){
       const {data} = await this.$axios.getBreTreatyArrangeInfoList({reinsurerId:this.$route.params.id,breSlipNumber:this.$route.params.number})
       console.log(data);
        data.data.map((item) => {
         this.tableData.push(Object.assign({},item,{isDisplay: false}))
        })
      },
      handleEdit(index,res) {
        this.tableData.forEach((_item, _index) => {
          if (_index == index) {
            _item.isDisplay = true
          } else {
            _item.isDisplay = false
          }
        })
      },
     async handleSuccess (index,val) {
        this.tableData[index].isDisplay = false
        const res = await this.$axios.updateBreTreatyArrangeInfo(val)
        if(res){
          this.$message.success("修改成功")
           
        }else{
          this.$message.error("修改失败")
        }
      },
      concealButton(){
          this.$router.replace(`/Page4?id=${this.breSlipNumber}`)
        }
    }
  }
</script>
<style lang="less" scoped>
/deep/.el-button--primary{
    display: flex;
    justify-items: flex-start;
    margin-left: 20px;
    margin-bottom: 10px;
}
</style>