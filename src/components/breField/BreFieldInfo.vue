<template>
  <div>
    <my-breadcrumb :breadcrumbList="breadcrumbList"></my-breadcrumb>
        <!-- <el-row label-height="40px">
          <el-col align="left">  <div class="grid-content bg-purple" style="font-size: 24px;font-weight:bold;text-align:left;">管理导出字段信息维护</div>
            <div style="height: 40px"></div>
          </el-col>
        </el-row> -->
        <el-form ref="form"  label-width="180px">
        <el-col :span="10" style="width: 400px" >&nbsp;</el-col>
        <el-col :span="8" >
                <el-form-item align="center" label="英文名字：">
                  <el-select clearable filterable  style="width: 260px" v-model="reqFrom.englishName" placeholder="请选择">
                    <el-option
                            v-for="item in this.nameList"
                            :key="item.exportId"
                            :label="item.englishName"
                            :value="item.englishName">
                    </el-option>
                  </el-select>
                </el-form-item>
        </el-col>
      <el-col  :span="8">
                <el-form-item label="中文描述：">
                  <el-select clearable filterable   style="width: 260px" v-model="reqFrom.chineseName" placeholder="请选择">
                    <el-option
                            v-for="item in this.nameList"
                            :key="item.exportId"
                            :label="item.chineseName"
                            :value="item.chineseName">
                    </el-option>
                  </el-select>
                </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" @click="getBreFieldInfoList()">查询</el-button>
          <el-button type="primary" @click="clearData()">重置</el-button>
        </el-col>
      </el-form>


    <el-table :data="tableData" height="520" stripe border style="width: 100%;margin-top:40px" >
      <el-table-column prop="englishName" label="英文描述"  align="center"  style="height: 20px;"> </el-table-column>
      <el-table-column prop="chineseName" label="中文描述" align="center" style="height: 20px;"> </el-table-column>
      <el-table-column  label="显示位置" align="center" style="height: 20px;">
          <template slot-scope="scope">
             <el-input v-if="scope.row.isSelected" v-model="scope.row.fieldPosition" @focus="focusEvent(scope.row)"
                       class="momentum" @blur.native.capture="blurEvent(scope.row)" ></el-input>
              <el-button  v-else @click="clickPosition(scope.row)" type="text" size="small">{{scope.row.fieldPosition}}</el-button>
          </template>
      </el-table-column>
      <el-table-column prop="exportOff" label="选择" align="center" style="height: 20px;">
        <template slot-scope="scope">
            <el-checkbox-group v-model="scope.row.checked">`
                <el-checkbox :key="scope.row.englishName"  @change="addAndDelBreFieldExportInfo(scope.row)" ></el-checkbox>
            </el-checkbox-group>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import MyBreadcrumb from '@/components/common/breadcrumb'

  export default {
    components:{
      MyBreadcrumb,
    },
    data() {
      return {
        breadcrumbList:["导出选择字段","管理导出字段信息维护"],
          options:null,
          exportId:"",
          chineseName:"",
          tableData:null,
          nameList:[],
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
      this.getNameList()
    },
    methods: {
        clearData(){
            this.reqFrom.chineseName="";
            this.reqFrom.englishName="";
        },
        getNameList(){
            this.$axios.getBreFieldInfoList().then(res => {
                if(res.data.status!=403){
                    let data= res.data.data;
                    if(!data){
                        return;
                    }
                    this.nameList=data;
                    console.log(this.nameList);
                }
            }).catch(error => {
                console.log(error);
            })
        },

        clickPosition(row) {
            row.isSelected = !row.isSelected
        },
        blurEvent (row) {
            // 目的是为了让<el-input>标签隐藏
            if (row.fieldPositionOld !== row.fieldPosition) {
                this.addExportFrom.id=row.exportId;
                this.addExportFrom.fieldPosition=row.fieldPosition;
                this.$axios.updateBreFieldExportInfo(this.addExportFrom).then(res => {
                    if(res.data.code==0){
                        this.$message.success("修改成功");
                    }else{
                        this.$message.error("修改失败");
                    }
                    this.getBreFieldInfoList();
                }).catch(error => {
                    this.$message.error("修改失败");
                });
            }

            row.isSelected = !row.isSelected
        },

        focusEvent (row) {
            row.fieldPositionOld = row.fieldPosition
        },
      getBreFieldInfoList(){
        this.$axios.getBreFieldInfoList(this.reqFrom).then(res => {
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
                  item.isSelected=false;
                  dataUser.push(item)
              }
              this.tableData=dataUser;
          }
        }).catch(error => {
          console.log(error);
        })
      },

      async addAndDelBreFieldExportInfo(item) {
          this.addExportFrom={};
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
  .momentum {
      height: 47px;
      border: none;
      outline: none;
      text-align: right;
      color: #1f1f1f;
      font-size: 16px;
      padding: 0;
      margin: 0;
      width: 97%;
  }
</style>
