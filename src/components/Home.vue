<template>
  <div class="home-container">
    <the-header></the-header>
    <the-main></the-main>
  </div>
</template>
<script>
import theHeader from './header/header.vue'
import theMain from './main/main'

export default {
  components: {
    theHeader,
    theMain
  },

}
</script>
<style lang="less" scoped>
.home-container {
  height: 100%;
  width: 100%;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
</style>
