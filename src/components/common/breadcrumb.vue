<template>
  <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(v,i) in breadcrumbList" :key="i">{{ v }}</el-breadcrumb-item>
      </el-breadcrumb>
  </div>
</template>

<script>
export default {
    // name:"insuranceBreadcrumb",
    props:["breadcrumbList"],
    data(){
        return{
            
        }
    }
    }
</script>

<style lang="less" scoped>
.el-breadcrumb {
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
  line-height: 50px;
  padding-left: 20px;
}
</style>