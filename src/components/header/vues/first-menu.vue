<template>
  <div>
    <div class="nav">
      <ul :class="{ moveUp: isMoveUp, moveDown: isMoveDown }">
        <li class="current-active">个人中心1</li>
        <li>个人中心2</li>
        <li>个人中心3</li>
        <li>个人中心4</li>
        <li>个人中心5</li>
        <li>个人中心6</li>
        <li>个人中心7</li>
        <li>个人中心8</li>
      </ul>
    </div>
    <div class="btn">
      <button @click="moveUp" :disabled="upDownDis == 'up' ? true : false">
        <i
          class="el-icon-arrow-up"
          :style="{ color: upDownDis == 'up' ? '#ccc' : 'green' }"
        ></i>
      </button>
      <button @click="moveDown" :disabled="upDownDis == 'down' ? true : false">
        <i
          class="el-icon-arrow-down"
          :style="{ color: upDownDis == 'down' ? '#ccc' : 'green' }"
        ></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMoveUp: false,
      isMoveDown: false,
      upDownDis: 'up'
    }
  },
  methods: {
    // header中的一级菜单动画
    moveUp() {
      this.isMoveUp = true
      this.isMoveDown = false
      this.upDownDis = 'up'
    },
    moveDown() {
      this.isMoveDown = true
      this.isMoveUp = false
      this.upDownDis = 'down'
    }
  }
}
</script>

<style lang="less" scoped>
.nav {
  float: left;
  margin-left: 100px;
  color: #fff;
  ul {
    width: 400px;
    border-left: 1px solid #198b25;
    overflow: hidden;
    transition: all 300ms ease-in-out;
    li {
      float: left;
      height: 68px;
      padding: 0 10px;
      border-right: 1px solid #198b25;
      border-bottom: 2px solid transparent;
    }
    li:hover {
      border-bottom: 2px solid #ff9d02;
    }
    .current-active {
      background-color: rgba(0, 0, 0, 0.2);
      border-bottom: 2px solid #ff9d02;
    }
  }
  .moveDown {
    transform: translateY(-70px);
  }
}
.btn {
  float: left;
  margin-left: 15px;
  width: 25px;
  height: 52px;
  border-radius: 3px;
  margin-top: 9px;
  overflow: hidden;
  button {
    border: 0;
    width: 25px;
    height: 25px;
    float: left;
  }
  button:nth-child(2) {
    margin-top: 2px;
  }
}
</style>
