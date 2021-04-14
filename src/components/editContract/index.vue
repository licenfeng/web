<template>
  <div>
  	<div>
      <my-breadcrumb :breadcrumbList="breadcrumbList"></my-breadcrumb>
        <div class="floatright">
          <el-button type="primary" @click="dialogFormVisible = true">增加备注项</el-button>
          <el-button type="primary">导出</el-button>
          <el-button type="danger" @click="copyInfo">Renew</el-button>
          <!-- <el-button type="primary">保存</el-button> -->
          <el-button type="primary">返回</el-button>
        </div>
  	</div>
     <!-- 弹窗按钮 -->
      <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
        <el-form :model="threeForm">
          <el-form-item label="RemarksONE" :label-width="formLabelWidth">
            <el-input v-model="threeForm.RemarksONE" autocomplete="off"></el-input>
          </el-form-item>
         <el-form-item label="RemarksTWO" :label-width="formLabelWidth">
            <el-input v-model="threeForm.RemarksTWO" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="RemarksTHREE" :label-width="formLabelWidth">
            <el-input v-model="threeForm.RemarksTHREE" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    <!-- 下方是查询条件form表单框 -->
    <el-form ref="form" :model="form" label-width="200px" class="searchQuery">
      <el-form-item  label="BRE Slip Number" prop="breSlipNumber" ref="breSlipNumber">
        <el-input v-model="form.breSlipNumber" class="fieldInput"></el-input>
      </el-form-item>
      <el-form-item  label="BRE Bound No" prop="breBoundNo" ref="breBoundNo" >
        <el-input v-model="form.breBoundNo"></el-input>
      </el-form-item>
      <el-form-item label="Status">
        <el-select v-model="form.status" placeholder="请选择">
         <el-option 
          :label="item.valueType"
           :value="item.valueType" 
           v-for="item in options" 
           :key="item.keyType">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="queryInput" @click="queryInput">查询</el-button>
      </el-form-item>
    </el-form>
    <br>
    <!-- 这里是基础信息 -->
    <div class="tableOne">
    <strong>Business Information/基础信息</strong>
    <el-button type="primary" icon="el-icon-plus" circle class="marginButton" v-if="concealButton" @click="addBusiness"></el-button>
     <el-table :data="formData" stripe border style="width: 100%" class="tableContract">
      <el-table-column prop="cedingCompany" label="Ceding Company" > </el-table-column>
      <el-table-column prop="treatyName" label="treaty Name"> </el-table-column>
      <el-table-column prop="underwritingYear" label="underwriting Year"> </el-table-column>
      <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="text" @click="editBusiness(scope.$index,scope.row)">编辑</el-button>
      </template>
    </el-table-column>
    </el-table>
    </div>
    <br>
    <!-- 这里是非比例合约信息项的数据 -->
    <div class="addTable">
      <strong>Business Information/合约信息</strong>
      <el-button type="primary" icon="el-icon-plus" circle @click="addForm" class="marginButton"></el-button>
      <el-table :data="tableInfo"  border stripe class="tableContract">
      <el-table-column prop="nonPropLayer" label="Layer"></el-table-column>
      <el-table-column prop="nonPropLimit" label="Limit"> </el-table-column>
      <el-table-column prop="nonPropGnpi" label="GNPI"> </el-table-column>
      <el-table-column prop="nonPropAdjustableRate" label="Adjustable Rate" > </el-table-column>
      <el-table-column prop="nonPropDepositPremium" label="Deposit Premium"> </el-table-column>
      <el-table-column prop="nonPropDpPercent" label="DP%" > </el-table-column>
      <el-table-column prop="nonPropMinimumPremium" label="Minimum Premium"> </el-table-column>
      <el-table-column prop="nonPropMpPercent" label="MP%" > </el-table-column>
      <el-table-column prop="nonPropRateOnLine" label="Rate on Line"> </el-table-column>
      <el-table-column prop="nonPropReinstatement" label="Reinstatement" > </el-table-column>
      <el-table-column prop="nonPropCoverage" label="Coverage"> </el-table-column>
      <el-table-column label="操作"> PropLayer
      <template slot-scope="scope">
        <el-button type="text" @click="editContract(scope.$index,scope.row)">编辑</el-button>
      </template>
    </el-table-column>
    </el-table>
    </div>
    <br>

   <div class="editTable-small">
      <strong>Reinsurer Information/排分信息</strong>
      <el-button type="primary" icon="el-icon-plus" circle class="marginButton" @click="rowPoints"></el-button>
      <el-table :data="arrangeTable" style="width: auto" border stripe class="tableContract">
          <el-table-column prop="reinsurer" label="Reinsurer"> </el-table-column>
          <el-table-column prop="breBrokerage" label="Brokerage"> </el-table-column>
          <el-table-column prop="writtenLine" label="Written Line" > </el-table-column>
          <el-table-column prop="signedLine" label="Signed Line"> </el-table-column>
          <el-table-column prop="statusReinsurer" label="Status Reinsurer"> </el-table-column>
          <el-table-column prop="signingDate" label="Signing Date"> </el-table-column>
          <el-table-column label="Others">
          
          <template slot-scope="scope">
            <el-popover 
            trigger="hover"
            placement="top"
            width="800"
            >
            <el-table :data="formSection">
            <el-table-column  property="arrangeLayer" label="layer"></el-table-column>
            <el-table-column  property="nonPropLimitNumber" label="Old Limit Number"></el-table-column>
            <el-table-column  property="arrangeLimitNumber" label="New Limit Number"></el-table-column>
            </el-table>
            <div slot="reference" style="display:inline-block"> 
                <el-button type="text" @click="editLayer">修改</el-button>
            </div>
            </el-popover>
            <el-button type="text" @click="editReinsurer(scope.$index,scope.row)" style="display:inline-block; margin-left:20px;">编辑</el-button>
          </template>
        </el-table-column>
    </el-table>
   </div>
   <!-- 下面是操作数据信息 -->
   <br>
   <strong>操作数据信息</strong>
   <div class="dataInfo">
     <el-table
    :data="tableSix"
    style="width: 100%"
    :border="true"
    >
    <el-table-column label="创建日期" prop="creatorId"></el-table-column>
    <el-table-column label="修改日期" prop="editId"></el-table-column>
    <el-table-column label="复核日期" prop="checkId"></el-table-column>
    <!-- <el-table-column label="Business State">
       <template slot-scope="scope">
         <el-button
          size="mini"
          type="danger"
         >Renew</el-button>
      </template>
    </el-table-column>
    <el-table-column
      align="right">
      <template slot="header" slot-scope="scope">
         <el-select v-model="newValue" placeholder="请选择" size="medium" class="sizeSeclect">
          <el-option
            v-for="item in newOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </template>
    </el-table-column> -->
  </el-table>
   </div>
  </div>
</template>

<script>
import MyBreadcrumb from "@/components/common/breadcrumb"
export default {
  components:{
    MyBreadcrumb
  },
	data() {
    const item5 = {
      creatorId:"创建ID:",
      editId:"修改ID:",
      checkId:"复核ID:"
    }
    return {
      concealButton:true,
      breadcrumbList:['Treaty基本信息',"新增非比例合约"],
      formData:[],//这是新增非比例合约信息中的基础信息table数据项
      dialogFormVisible: false,
      formLabelWidth: '120px',//备注信息的表格宽度
      form:{  //这个是页面的remarks form表单项
        breSlipNumber:"", //这里地址栏的id值
        breBoundNo:"",
        status:""
      },
      threeForm:{
        RemarksONE:"", //输入框数据
        RemarksTWO:"",
        RemarksTHREE:"",
      },
      tableInfo:[],  //这个是合约信息的数据,
      arrangeTable:[], //这是排分信息的table数据
      formSection:[],  //这是hover的table数据
      tableSix:Array(1).fill(item5),
      newValue:"",
      options:[]
    }
  },
  async created(){
   await this.getBreWordbookType("States")
    this.form.breSlipNumber = this.$route.query.id
    if(this.form.breSlipNumber){
     await this.getBreNumber()
    }
    
  },
  methods:{
    async getBreNumber(){
      const {data} = await this.$axios.getBreTreatyBasisNonPropAllList({breSlipNumber:this.form.breSlipNumber})
        this.formData = data.data.basisList
         if(this.formData[0].treatyName){
          this.concealButton = false
        }
        this.tableInfo = data.data.nonPropList
        this.arrangeTable = data.data.reinsureList
        this.formSection = data.data.reinsureList[0].list || []
    },
      //这里是基础信息的编辑按钮
      editBusiness(index,value){
        this.$router.push({path:"/editNoBasicsInfo",query:{id:value.breSlipNumber}})
      },
      //这是基础信息的增加按钮
      addBusiness(){
        this.$router.push({path:"/addNoBasicsInfo"})
      },
      //添加合约信息
      addForm(){
       this.$router.push({path:"/addContractForm",query:{id:this.form.breSlipNumber}})
      },
      //编辑合约信息
      editContract(index,res){
        // console.log(index,res.nonPropId,res.breSlipNumber);
        this.$router.push({name:"editContractForm",params:{id:res.nonPropId,number:res.breSlipNumber}})
      },
      //添加排分信息
      rowPoints(){
        this.$router.push({path:"/addArrangeForm",query:{id:this.form.breSlipNumber}})
      },
      //修改layer
      editLayer(){
        this.$router.push({name:"suspendTable",params:{id:this.formSection[0].reinsurerId,number:this.formSection[0].breSlipNumber}})
      },
      //修改排分信息
      editReinsurer(index,res){
        // console.log(res);
        this.$router.push({name:"editArrangeForm",params:{slipNumber:res.breSlipNumber,id:res.id}})
      },
     async queryInput(){
      await  this.getBreNumber()
      },
      //获取状态信息
   async getBreWordbookType(val){
            await this.$axios.getBreWordbookType(val).then(res=>{
                let data = res.data;
                if (data.code == '0') {
                    this.options = data.data
                    console.log(this.options);
                } else {
                    this.$message.info("没有找数据");
                }
            }).catch(error => {
                console.log(error);
            })
        },
    //REnew一份数据
      async copyInfo(){
         const {data} = await this.$axios.copyNewBreTreatyBasisNonPropAllListByBreSlipNumber(this.form)
          this.form.breSlipNumber = data.data.basisList[0].breSlipNumber
          this.$router.push(`/Page4?id=${this.form.breSlipNumber}`)
          // console.log(data);
          // console.log(data.data.basisList[0].breSlipNumber);
       }
  
  }
}
</script>

<style lang="less" scoped>
.floatLeft{
  float: left;
  margin-left: 20px;
}
.floatright{
  float: right;
  margin-right: 20px;
}
/deep/.marginButton{
  margin-left: 20px;
}
/deep/.el-collapse-item__header{
  font-size: 20px;
  font-weight: 700;
  margin-left: 50px;
}
/deep/.el-table--enable-row-transition{
  margin-top: 20px;
}
/deep/ .searchQuery{
 display: inline-flex;
}
/deep/.editTable-small{
  .el-table th.is-leaf{
    border-bottom: 0.5px solid #EBEEF5
  }
}
/deep/.addTable{
  .el-table th.is-leaf{
    border-bottom: 0.5px solid #EBEEF5
  }
}
/deep/.tableOne{
    .el-table th.is-leaf{
    border-bottom: 0.5px solid #EBEEF5
  }
}

/deep/ .el-dialog-footer{
  text-align: center;
}
/deep/.tableContract{
  margin-top: 20px;
}
/deep/.editTable-small{
  .el-table th.is-leaf{
    border-bottom: 0.5px solid #EBEEF5
  }
}

// .floatLeft{
//   float: left;
//   margin-left: 20px;
// }
// .floatright{
//   float: right;
//   margin-right: 20px;
// }
// /deep/.infor{
//   position: relative;
//     top: 144px;
//     left: -603px;
// }
//  /deep/ .remarksForm {
//    .formItem {
//     position: relative;
//      .formInput {
//       position: absolute;
//       left:-566px;
//     }
//   }
// }
// /deep/.el-input__inner{
//   width: 15%;
// }

// /deep/.marginButton{
//   margin-left: 20px;
// }
// /deep/.rightfloat{
//   .el-input__inner{
//     width: 70%;
//   }
// }
// /deep/.el-collapse-item__header{
//   font-size: 20px;
//   font-weight: 700;
//   margin-left: 50px;
// }
// /deep/.el-table--enable-row-transition{
//   margin-top: 20px;
// }
// /deep/ .searchQuery{
//   padding: 56px 0 0 1032px;
//  .fieldInput{
//     width: 100%;
//     .el-input__inner{
//       width: 100%;
//     }
//   }
// }
// /deep/.editTable-small{
//   .el-table th.is-leaf{
//     border-bottom: 0.5px solid #EBEEF5
//   }
// }
// /deep/.addTable{
//   .el-table th.is-leaf{
//     border-bottom: 0.5px solid #EBEEF5
//   }
// }
</style>
