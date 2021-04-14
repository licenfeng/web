<template>
  <div>
  	<div>
		<h2 class="floatLeft">比例合约详情信息</h2>
        <div class="floatright">
          <el-button type="primary">导出</el-button>
          <el-button type="primary">编辑</el-button>
          <el-button type="primary" @click="saveInfo">保存</el-button>
          <el-button type="primary">返回</el-button>
        </div>
  	</div>
    <!-- 下方是查询条件form表单框 -->
    <el-form ref="form" :model="form" label-width="auto" class="searchQuery" :inline="true">
      <el-form-item  label="BRE Slip Number" prop="name" ref="name">
        <el-input v-model="form.name" class="fieldInput"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="queryInput">查询</el-button>
      </el-form-item>
    </el-form>
  <!-- form表单项 -->
  <el-collapse v-model="activeNames" @change="handleChange">
  <el-collapse-item title="Basis Information/基础信息" name="1">
    <div class="rightfloat">
      <el-form ref="formData" :model="formData"  label-width="auto" disabled>
    <el-col :span="8">
      <el-form-item  label="treatyType" prop="treatyType" ref="name">
        <el-input v-model="formData.treatyType"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="8">
    <el-form-item  label="Original_Cedant" prop="Original_Cedant" ref="name" >
      <el-input v-model="formData.Original_Cedant"></el-input>
    </el-form-item>
     </el-col>
      <el-col :span="8">
    <el-form-item  label="ProducingBroker" prop="ProducingBroker" ref="name" >
      <el-input v-model="formData.ProducingBroker" ></el-input>
    </el-form-item>
     </el-col>
      <el-col :span="8">
    <el-form-item  label="TreatyName" prop="TreatyName" ref="name">
      <el-input v-model="formData.TreatyName" ></el-input>
    </el-form-item>
     </el-col>
     <el-col :span="8">
    <el-form-item  prop="InceptionDate" ref="name"  label="Inception Date">
      <el-date-picker
      v-model="formData.InceptionDate"
      type="datetime"
      @change="dateChangebirthday" 
      format="yyyy-MM-dd" value-format="yyyy-MM-dd HH:mm:ss"
      >
    </el-date-picker>
    </el-form-item> 
    </el-col>
    <el-col :span="8">
    <el-form-item  label="Currency" prop="Currency" ref="name"> 
      <el-input v-model="formData.Currency"></el-input>
    </el-form-item>
     </el-col>
      <el-col :span="8">
    <el-form-item  label="LeadingReinsurer" prop="LeadingReinsurer" ref="name" >
      <el-input v-model="formData.LeadingReinsurer"></el-input>
    </el-form-item>
     </el-col>
     <el-col :span="8">
    <el-form-item  label="Category" prop="Category" ref="name" >
      <el-input v-model="formData.Category"></el-input>
    </el-form-item>
     </el-col>
     <el-col :span="8">
    <el-form-item   prop="ExpiryDate" ref="name" label="Expiry Date">
     <el-date-picker
      v-model="formData.ExpiryDate"
      type="datetime"
      @change="dateChangebirthday"
      format="yyyy-MM-dd" value-format="yyyy-MM-dd HH:mm:ss"
      >
    </el-date-picker>
    </el-form-item>
     </el-col>
     <el-col :span="8">
    <el-form-item  label="BRESlipNumber" prop="BRESlipNumber" ref="name" >
      <el-input v-model="formData.BRESlipNumber"></el-input>
    </el-form-item>
     </el-col>
     <el-col :span="8">
    <el-form-item  label="CountryofOriginalCedant" prop="CountryofOriginalCedant" ref="name" >
      <el-input v-model="formData.CountryOfOriginalCedant"></el-input>
    </el-form-item>
     </el-col>
      <el-col :span="8">
    <el-form-item  label="CountryofProducingBroker" prop="CountryofProducingBroker" ref="name" >
      <el-input v-model="formData.CountryOfProducingBroker"></el-input>
    </el-form-item>
     </el-col>
      <el-col :span="8">
    <el-form-item   prop="UnderwritingYear" ref="name"  label="Underwriting Year">
      <el-date-picker
      v-model="formData.UnderwritingYear"
      type="datetime"
      @change="dateChangebirthday"
      format="yyyy-MM-dd" value-format="yyyy-MM-dd HH:mm:ss"
      >
    </el-date-picker>
    </el-form-item>
    </el-col>
    <el-col :span="8">
    <el-form-item  label="breBoundNo" prop="breBoundNo" ref="name" >
      <el-input v-model="formData.breBoundNo"></el-input>
    </el-form-item>
    </el-col>
    </el-form>
    </div>
    </el-collapse-item>
    </el-collapse>
      <!-- 这里是第一个配置项 -->
     <!-- <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop="en" label="type" width="180"> </el-table-column>
      <el-table-column prop="cn" label="Category" width="180"> </el-table-column>
      <el-table-column prop="check" label="BRE Slip Number：主健"> </el-table-column>
    </el-table> -->
    <!-- 下方是合约信息 -->
    <br>  
    <div class="addTable">
      <strong>Business Information/合约信息</strong>
      <el-button type="primary" icon="el-icon-plus" circle @click="addForm" class="marginButton"></el-button>
      <el-table :data="tableInfo"  border stripe>
      <el-table-column prop="Limit" label="Limit"></el-table-column>
      <el-table-column prop="GNPI" label="GNPI"> </el-table-column>
      <el-table-column prop="AdjustableRate" label="Adjustable Rate" > </el-table-column>
      <el-table-column prop="DepositPremium" label="Deposit Premium"> </el-table-column>
      <el-table-column prop="DP" label="DP%" > </el-table-column>
      <el-table-column prop="MinimumPremium" label="Minimum Premium"> </el-table-column>
      <el-table-column prop="MP" label="MP%" > </el-table-column>
      <el-table-column prop="RateOnLine" label="Rate on Line"> </el-table-column>
      <el-table-column prop="Reinstatement" label="Reinstatement" > </el-table-column>
      <el-table-column prop="Coverage" label="Coverage"> </el-table-column>
      <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
		<el-button type="text" @click="handleRemove(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    </div>
    <br>
    <!-- 这里是备注输入框 -->
    <div class="remarksForm">
      <el-form ref="threeForm" :model="threeForm" label-width="auto">
      <el-form-item label="RemarksONE :" class="formItem">
        <el-input v-model="threeForm.RemarksONE" class="formInput"></el-input>
      </el-form-item>
      <el-form-item label="RemarksTWO :" class="formItem">
        <el-input v-model="threeForm.RemarksTWO" class="formInput"></el-input>
      </el-form-item>
      <el-form-item label="RemarksTHREE :" class="formItem">
        <el-input v-model="threeForm.RemarksTHREE" class="formInput"></el-input>
      </el-form-item>
      </el-form>
    </div>
    <br>
<!-- 第二个折叠面板 -->
  <el-collapse v-model="activeNames" @change="handleChange">
  <el-collapse-item title="Reinsurer Information/合约信息" name="2">
    <div class="rightfloat">
      <el-form ref="formContract" :model="formContract"  label-width="auto">
    <el-col :span="8">
      <el-form-item  label="Reinsurer" prop="Reinsurer" ref="name">
        <el-input v-model="formContract.Reinsurer"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="8">
    <el-form-item  label="Country of Reinsurer" prop="CountryOfReinsurer" ref="name" >
      <el-input v-model="formContract.CountryOfReinsurer"></el-input>
    </el-form-item>
     </el-col>
      <el-col :span="8">
    <el-form-item  label="Settlement Currency" prop="SettlementCurrency" ref="name" >
      <el-input v-model="formContract.SettlementCurrency" ></el-input>
    </el-form-item>
     </el-col>
      <el-col :span="8">
    <el-form-item  label="PlacementBroker" prop="PlacementBroker" ref="name">
      <el-input v-model="formContract.PlacementBroker" ></el-input>
    </el-form-item>
     </el-col>
    <el-col :span="8">
    <el-form-item  label="Country of Placement Broker" prop="CountryOfPlacementBroker" ref="name"> 
      <el-input v-model="formContract.CountryOfPlacementBroker"></el-input>
    </el-form-item>
     </el-col>
      <el-col :span="8">
    <el-form-item  label="SettlementCurrency" prop="Settlementcurrency" ref="name" >
      <el-input v-model="formContract.Settlementcurrency"></el-input>
    </el-form-item>
     </el-col>
     <el-col :span="8">
    <el-form-item  label="Brokerage" prop="Brokerage" ref="name" >
      <el-input v-model="formContract.Brokerage"></el-input>
    </el-form-item>
     </el-col>
     <el-col :span="8">
    <el-form-item  label="Including/Excluding Brokerage VAT" prop="IncludingExcludingBrokerageVAT" ref="name" >
      <el-input v-model="formContract.IncludingExcludingBrokerageVAT"></el-input>
    </el-form-item>
     </el-col>
     <el-col :span="8">
    <el-form-item  label="other fee/charge" prop="otherFeeCharge" ref="name" >
      <el-input v-model="formContract.otherFeeCharge"></el-input>
    </el-form-item>
     </el-col>
      <el-col :span="8">
    <el-form-item  label="Written Lines" prop="WrittenLines" ref="name" >
      <el-input v-model="formContract.WrittenLines"></el-input>
    </el-form-item>
     </el-col>
    <el-col :span="8">
    <el-form-item  label="Signed Lines" prop="SignedLines" ref="name" >
      <el-input v-model="formContract.SignedLines"></el-input>
    </el-form-item>
    </el-col>
     <el-col :span="8">
    <el-form-item  label="States" prop="States" ref="name" >
      <el-input v-model="formContract.States"></el-input>
    </el-form-item>
    </el-col>
     <el-col :span="8">
    <el-form-item  label="Expiy Date of Extension" prop="ExpiyDateOfExtension" ref="name" >
      <el-input v-model="formContract.ExpiyDateOfExtension"></el-input>
    </el-form-item>
    </el-col>
     <el-col :span="8">
    <el-form-item  label="Underwriting Peiod" prop="UnderwritingPeiod" ref="name" >
      <el-input v-model="formContract.UnderwritingPeiod"></el-input>
    </el-form-item>
    </el-col>
     <el-col :span="8">
    <el-form-item  label="signingDate" prop="signingDate" ref="name" >
      <el-date-picker
      v-model="formContract.signingDate"
      type="datetime"
      @change="dateChangebirthday"
      format="yyyy-MM-dd" value-format="yyyy-MM-dd HH:mm:ss"
      >
      </el-date-picker>
    </el-form-item>
    </el-col>
     <el-col :span="8">
    <el-form-item  label="R/I Condition" prop="RICondition" ref="name" >
      <el-input v-model="formContract.RICondition"></el-input>
    </el-form-item>
    </el-col>
    <el-col :span="8">
     <el-form-item  label="Remarks" prop="Remarks" ref="name" >
      <el-input v-model="formContract.Remarks"></el-input>
    </el-form-item>
    </el-col>
    </el-form>
    </div>
    </el-collapse-item>
    </el-collapse>
  
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
    <el-table-column label="Business State">
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
    </el-table-column>
  </el-table>
   </div>
  </div>
</template>

<script>
export default {
	data() {
    const item5 = {
      creatorId:"创建ID:",
      editId:"修改ID:",
      checkId:"复核ID:"
    }
    return {
      activeNames: ['1','2'],//折叠面板
      // dialog: false,//抽屉的样式
      // loading: false, //打开关闭样式
      formDrawer: {
        Reinsurer: '',
        CountryOfReinsurer: '',
        SettlementCurrency: '',
        PlacementBroker: '',
        CountryOfPlacementBroker: "",
        SettlementCurrency: "",
        Brokerage: '',
        IncludingExcludingBrokerageVAT: '',
        otherFeecharge:"",
        WrittenLine:"",
        SignedLine:"",
        Status:"",
        SigningDate:"",
        ExpiryDateOfExtension :"",
        UnderwritingPeriod:"",
        RICondition:"",
        Remarks:"",
        BusinessState:""
      },
      timer: null,
    
      threeForm:{
        RemarksONE:"", //输入框数据
        RemarksTWO:"",
        RemarksTHREE:"",
      },
      
      // tableInfo:Array(11).fill(item1),
      tableInfo:[{  //这个是合约信息的数据
      Limit:"11",
      GNPI:"22",
      AdjustableRate:"33",
      DepositPremium:"44",
      DP:"55",
      MinimumPremium:"66",
      MP:"77",
      RateOnLine:"88",
      Reinstatement:"99",
      Coverage:"100",
      }],
      tableSix:Array(1).fill(item5),
      form:{ //这是搜索框的参数
        name:""
      },
      //这里是form折叠项数据
      formData:{
        treatyType:"",  
        Original_Cedant:"",
        ProducingBroker:"", 
        TreatyName:"",
        InceptionDate:"",
        Currency:"",
        LeadingReinsurer:"",
        Category:"",
        ExpiryDate:"",  
        BRESlipNumber:"",
        CountryOfOriginalCedant:"",
        CountryOfProducingBroker:"",
        UnderwritingYear:"",
        breBoundNo:""
      },
      //这里是第二个折叠数据项
      formContract:{ 
        Reinsurer:"",	
        CountryOfReinsurer:"",	
        SettlementCurrency:"",
        PlacementBroker:"",	
        CountryOfPlacementBroker:"",	
        Settlementcurrency:"",
        Brokerage:"",	
        IncludingExcludingBrokerageVAT:"",	
        otherFeeCharge:"",
        WrittenLines:"",
        SignedLines:"",
        States:"",
        ExpiyDateOfExtension:"",
        UnderwritingPeiod:"",
        signingDate:"", 
        RICondition:"",
        Remarks:"",
      },
      value: '',
      search:"",
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
      newOptions:[{
          value: '1',
          label: '吃饭'
        }, 
        {
          value: '2',
          label: '睡觉'
      }],
      newValue:""
    }
  },
  created(){

  },
  methods:{
    async saveInfo(){
      this.formData.breSlipNumber= '1'
      const res = await this.$axios.addBreTreatyBasisInfo(this.formData)
      console.log(res);
    },
    addForm(){
      this.$router.push({path:"./addform"})
    },
    handleEdit(val,res){
      this.$router.push({path:"/editform"})
    },
	handleRemove(val,res){
		console.log(res);
	},
   
    //抽屉的样式
    //  handleClose(done) {
    //   if (this.loading) {
    //     return;
    //   }
    //   this.$confirm('确定要提交表单吗？')
    //     .then(_ => {
    //       this.loading = true;
    //       this.timer = setTimeout(() => {
    //         done();
    //         // 动画关闭需要一定的时间
    //         setTimeout(() => {
    //           this.loading = false;
    //         }, 400);
    //       }, 2000);
    //     })
    //     .catch(_ => {});
    // },
    // cancelForm() {
    //   this.loading = false;
    //   this.dialog = false;
    //   clearTimeout(this.timer);
    // },
    //这是form折叠面板
    handleChange(val) {
        console.log(val);
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
/deep/ .infor{
  position: relative;
    top: 144px;
    left: -603px;
}
 /deep/ .remarksForm {
   .formItem {
    position: relative;
     .formInput {
      position: absolute;
      left:-566px;
    }
  }
}
/deep/.el-input__inner{
  width: 15%;
}

/deep/.marginButton{
  margin-left: 20px;
}
/deep/.rightfloat{
  .el-input__inner{
    width: 70%;
  }
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
  padding: 56px 0 0 1032px;
 /deep/ .fieldInput{
    width: 100%;
    .el-input__inner{
      width: 100%;
    }
  }
}
// /deep/.editTable-small{
//   .el-table th.is-leaf{
//     border-bottom: 0.5px solid #EBEEF5
//   }
// }
/deep/.addTable{
  .el-table th.is-leaf{
    border-bottom: 0.5px solid #EBEEF5
  }
}
</style>
