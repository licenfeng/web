<template>
    <div>
        <el-row>
            <el-col :span="20">
                <div style="height: 10px"></div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="20" :offset="1">
                <div style="font-size: 24px;font-weight:bold;text-align:left;">文件上传</div>
            </el-col>
            <el-col :span="6">
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="20">
                <div style="height: 60px"></div>
            </el-col>
        </el-row>
        <el-row :gutter="3" >
            <el-col :span="24">
                <div style="float: contour">
                    <el-col :span="4">
                        <el-upload
                                v-loading="loading"
                                class="upload-demo"
                                action="string"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :before-remove="beforeRemove"
                                accept=".xls,.xlsx"
                                multiple
                                :http-request="uploadUrl"
                                :show-file-list="false"
                                :before-upload="beforeAvatarUpload">
                            <el-button size="medium" type="primary">点击上传</el-button>
                        </el-upload>
                    </el-col>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>

    export default {
        data() {
            return {
                isAll: "N",
                options: [{
                    key: '1',
                    value: 'Y',
                    label: '全部覆盖',
                }, {
                    key: '2',
                    value: 'N',
                    label: '追加',
                }],
                loading: false,
            };
        },
        methods: {
            uploadUrl: function (param) {
                this.$confirm('确认上传'+param.file.name+'文件', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                        this.loading = true;
                        let form = new FormData();
                        form.append("file", param.file);
                        form.append("isAll",this.isAll);
                        this.loading = false;
                        // this.$axios.getBreCurrencyExcelUpload(form).then(res => {
                        //     if(res.data.code!='0'){
                        //         this.$message.error(res.data.msg);
                        //         return;
                        //     }
                        //     this.$message.success('文件成功！')
                        //     this.loading = false;
                        // });

                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        })
                    })


            },
            handleRemove(file, fileList) {
            },

            handlePreview(file) {
            },

            beforeAvatarUpload(file) {
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${file.name}？`);
            }
        }
    }
</script>
<style lang="less" scoped>

</style>
