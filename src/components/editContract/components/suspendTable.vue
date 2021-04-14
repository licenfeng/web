<template>
  <div>
    
      <el-button type="primary" @click="concealButton">
          返回
      </el-button>
  
    
 <el-table :data="tableData" border>
    <el-table-column  prop="arrangeLayer" label="layer">
       <!-- <template slot-scope="scope">
        <span v-if="!isDisplay">{{ scope.row.Section }}</span>
        <span v-else>
          <el-input v-model="scope.row.Section"></el-input>
        </span>
       </template> -->
    </el-table-column>
    
    <el-table-column  prop="nonPropLimitNumber" label="Old Limit Number">
    </el-table-column>
    <el-table-column  prop="arrangeLimitNumber" label="New Limit Number">
      <template slot-scope="scope">
        <span v-if="!scope.row.isDisplay">{{ scope.row.arrangeLimitNumber }}</span>
        <el-input v-if="scope.row.isDisplay" v-model="scope.row.arrangeLimitNumber"></el-input>
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
        sectionId:""
      }
    },
    created(){
      this.getSectionId()
    },
    methods: {
      //获取ID
     async getSectionId(){
       const {data} = await this.$axios.getBreTreatyNonPropArrangeInfoList({reinsurerId:this.$route.params.id,breSlipNumber:this.$route.params.number})
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
        // console.log('this.tableData---', this.tableData)
      },
     async handleSuccess (index,val) {
         console.log(index,val);
        this.tableData[index].isDisplay = false
        const res = await this.$axios.updateBreTreatyNonPropArrangeInfoInfo(val)
        // console.log(res);
        if(res){
          this.$message.success("修改成功")
            // this.getSectionId()
        }else{
          this.$message.error("修改失败")
        }
      },
     concealButton(){
          this.$router.replace(`/editContract?id=${this.$route.params.number}`)
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