<template>
  <div>
  	<div>
  		<el-row>
		  <el-col :span="8">
		  	<div class="grid-content bg-purple">页面导出字段</div>
		  </el-col>
		  <el-col :span="8">
		  	<el-form ref="form"  label-width="80px">
			  	<el-form-item label="业务模块">
					<el-select v-model="workId" placeholder="请选择">
						<el-option
								v-for="item in options"
								:key="item.workId"
								:label="item.workDesc"
								:value="item.workDesc">
						</el-option>
					</el-select>
				</el-form-item>
			 </el-form>
		  </el-col>
		  <el-col :span="8">
			  <el-button type="primary">查询</el-button>
		  	  <el-button type="primary">重置</el-button>
			  <el-button type="primary">返回</el-button>
		  </el-col>
		</el-row>
  	</div>
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop="fieldId" label="英文描述" > </el-table-column>
      <el-table-column prop="fieldDesc" label="中文描述" > </el-table-column>
      <el-table-column prop="check" label="选择">
		  <el-table-column prop="exportOff" label="选择" align="center" style="height: 20px;">
			  <template scope="scope">
				  <el-checkbox-group v-model="scope.row.checked">
					  <el-checkbox :key="scope.row.fieldId"  @change="updateBreFieldExportInfo(scope.row)" ></el-checkbox>
				  </el-checkbox-group>
			  </template>
		  </el-table-column>
	  </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {

    return {
		workId:"",
		options:null,
      tableData:null,

    }
  },
	created() {
     this.getBreFieldExportInfoList();
     this.getFiledWorkIdList();
	},
	mounted() {

	},
	methods: {
		getBreFieldExportInfoList(){
			this.$axios.getBreFieldExportInfoList().then(res => {
				console.log("-------------")
				console.log(res)
				if(res.data.status!=403){
					let dataUser=[];
					let data=res.data.data;
					for(let i=0;i<data.length;i++) {
						let item = data[i];
						if (item.exportOff == 'Y') {
							item.checked = true;
						} else {
							item.checked = false;
						}
						dataUser.push(item)
					}
					this.tableData=dataUser;
				}
			}).catch(error => {
				console.log(error);
			})
		},
		getFiledWorkIdList(){
			this.$axios.getFiledWorkIdList().then(res => {
				console.log("-------getBreFieldExportInfoList------")
				console.log(res)
				if(res.data.status!=403){
					this.options=res.data.data;
				}
			}).catch(error => {
				console.log(error);
			})
		},
		updateBreFieldExportInfo(item){
			console.log("-------updateBreFieldExportInfo------")
			console.log(item)
			if(item.exportOff=='N'){
				item.exportOff='Y';
			}else{
				item.exportOff='N';
			}
			this.$axios.updateBreFieldExportInfo(item).then(res => {
				console.log("-------updateBreFieldExportInfo------")
				console.log(res)
				if(res.data.code==0){
					console.log(res.data)
				}else{
					alert("选择失败");
				}
				this.getBreFieldExportInfoList();
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
