<template>
  <div class="big-header">
    <div class="topic">
      <h2>信息管理系统</h2>
    </div>
    <!-- <first-menu></first-menu> -->
    <div class="expand">
      <ul>
        <li class="user">
          <el-dropdown szie="medium">
            <div>
              <img class="avator" src="../../assets/logo.png" />
              <span style="font-weight: 700; color: #fff">Admin</span>
              <i class="el-icon-arrow-down" style="margin-right: 15px;font-size: 18px;color: #fff"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>用户信息</el-dropdown-item>
              <el-dropdown-item>消息</el-dropdown-item>
              <el-dropdown-item @click.native="dialogVisible = true"
                >修改密码</el-dropdown-item
              >
              <el-dropdown-item @click.native="logout" divided>
                退出
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
    </div>

    <!-- 修改密码弹框 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import screenfull from 'screenfull'
//import topTheme from './vues/top-theme'
// import firstMenu from './vues/first-menu'
export default {
  components: {
    //topTheme
    // firstMenu
  },
  data() {
    return {

      reqFrom:{},
      dialogVisible: false
    }
  },
  methods: {
    handleClose(){},
    screenCli() {
      console.log(screenfull)
      if (!screenfull.isEnabled) {
        // 如果不允许进入全屏，发出不允许提示
        this.$message({
          message: '不支持全屏',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    },
    // 退出登录
    logout() {
      this.$confirm('确认是否退出登录', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$router.push('/logout');
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style lang="less" scoped>
.big-header {
  background-color: #409eff;
  width: 100%;
  height: 70px;
  line-height: 70px;
  overflow: hidden;
  div {
    display: inline-block;
  }
  .topic {
    float: left;
    margin-left: 100px;
    color: #fff;
    h2 {
      font-size: 36px;
    }
  }
  .expand {
    float: right;
    ul {
      overflow: hidden;
    }
    li {
      float: left;
    }
    .theme-picker {
      margin: 20px;
    }
    .user {
      cursor: pointer;
      .avator {
        width: 48px;
        height: 48px;
        border-radius: 24px;
        vertical-align: middle;
      }
    }
    .user:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
