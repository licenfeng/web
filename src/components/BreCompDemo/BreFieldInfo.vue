<template>
  <div>
    <div>
      <el-form ref="form"  label-width="100px">
        <el-col :span="10" style="width: 400px" >&nbsp;</el-col>
        <el-col :span="8" >
                <el-form-item label="英文名字：">
                  <el-select v-model="reqFrom.englishName" placeholder="请选择">
                    <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.workDesc"
                            :value="item.workDesc">
                    </el-option>
                  </el-select>
                </el-form-item>
        </el-col>
      <el-col :span="8" >
                <el-form-item label="中文名字撒：">
                  <el-select v-model="reqFrom.chineseName" placeholder="请选择">
                    <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.workDesc"
                            :value="item.workDesc">
                    </el-option>
                  </el-select>
                </el-form-item>
        </el-col>
       
          <div>
            <el-button type="primary">查询</el-button>
            <el-button type="primary">返回</el-button>
          </div>
       
      </el-form>
    </div>
 <div style="height: 40px"></div>

    <el-table :data="tableData" stripe border style="width: 100%;text-align:center">
      <el-table-column prop="englishName" label="英文描述"  align="center"  style="height: 20px;"> </el-table-column>
      <el-table-column prop="chineseName" label="中文描述" align="center" style="height: 20px;"> </el-table-column>
      <el-table-column prop="fieldPosition" label="显示位置" align="center" style="height: 20px;"> </el-table-column>
      <el-table-column prop="exportOff" label="选择" align="center" style="height: 20px;">
        <template scope="scope">
            <el-checkbox-group v-model="scope.row.checked">
                <el-checkbox :key="scope.row.englishName"  @change="addAndDelBreFieldExportInfo(scope.row)" ></el-checkbox>
            </el-checkbox-group>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {

      return {
        options:null,
        tableData:null,
          obj:{
            englishName:"",
              chineseName:"",
              fieldPosition:"",
              exportOff:"",
              checked:false
          },
        reqFrom: {
          englishName:"",
          chineseName:""
        },
          addExportFrom:{
              fieldId:"",
              fieldDesc:"",
              workId:"",
              workDesc:"",
              fieldPosition:"",
              exportOff:"",
              id:""
          },

      }
    },
    created() {
      this.getBreFieldInfoList();
    },
    mounted() {

    },
    methods: {
      getBreFieldInfoList(){
        this.$axios.getBreFieldInfoList(this.reqFrom).then(res => {
          // console.log("------getBreFieldInfoList-------")
          // console.log(res)
          if(res.data.status!=403){
              let dataUser=[];
              let data= res.data.data;
              if(!data){
                  return;
              }
              for(let i=0;i<data.length;i++){
                  let item=data[i];
                  if(item.exportOff!=null){
                      item.checked=true;
                  }else{
                      item.checked=false;
                  }
                  dataUser.push(item)
              }
              this.tableData=dataUser;
          }
        }).catch(error => {
          console.log(error);
        })
      },
      async addAndDelBreFieldExportInfo(item) {
          if (item.exportOff == null) {
              this.addExportFrom.fieldId = item.englishName;
              this.addExportFrom.fieldDesc = item.chineseName;
              this.addExportFrom.workId = "1";
              this.addExportFrom.workDesc = "Treaty";
              this.addExportFrom.fieldPosition = item.fieldPosition;
              this.addExportFrom.exportOff = "N";
              await this.$axios.addBreFieldExportInfo(this.addExportFrom).then(res => {
                  let data = res.data.data;
                  console.log(data);
              });

          }else{
              this.addExportFrom.fieldId = item.englishName;
              await this.$axios.deleteBreFieldExportInfo(this.addExportFrom).then(
                  res => {
                      let data = res.data.data;
                      console.log(data);
                  }
              );
          }
          this.getBreFieldInfoList();

      },
      getFiledWorkIdList(){
        this.$axios.getFiledWorkIdList().then(res => {
          if(res.data.status!=403){
            this.options=res.data.data;
            console.log(this.options);
          }
        }).catch(error => {
          console.log(error);
        })
      }

    }
  }
</script>

<style lang="less" scoped>
  .el-card {
    height: 100%;
    overflow: scroll;
  }

</style>
