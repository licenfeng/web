<template>
  <div class="main-container">
    <left-menu></left-menu>
    <right-box></right-box>
  </div>
</template>

<script>
import leftMenu from './vues/left-menu'
import rightBox from './vues/right-box'
export default {
  components: {
    leftMenu,
    rightBox
  }
}
</script>

<style lang="less" scoped>
.main-container {
  width: 100%;
  // height: 80%;
  top: 70px;
  bottom: 0;
  position: absolute;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  display: flex;
  .aside {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    overflow: auto;
    overflow-x: hidden;
  }
  .right-box {
    height: 100%;
    width: 100%;
    background-color: #fff;
    box-sizing: border-box;
    position: relative;
}
}
</style>
