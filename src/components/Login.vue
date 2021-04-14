<template>
  <div>
    <header></header>
    <div class="container">
      <div class="loginBox">
        <h2>用户登录</h2>
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginFormRules"
          label-width="80px"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="loginForm.username"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="loginForm.password"
              autocomplete="off"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="userCode">
            <input
              v-model="loginForm.userCode"
              class="user-code el-input__inner"
              placeholder="请输入验证码"
            />
            <authentication-code
              ref="auth-code"
              class="authentication-code"
            ></authentication-code>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
            <el-button @click="resetLoginForm()">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <footer>
      <div class="links">
    </div>
    </footer>
  </div>
</template>
<script>
import AuthenticationCode from './AuthenticationCode'
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        userCode: ''
      },
      loginRequest: {
        username: '',
        password: '',
        userCode: ''
      },
      loginFormRules: {
        username: [
          { required: true, message: '用户名字', trigger: 'blur' },
          { min: 2, max: 60, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 8, message: '密码长度在3-8位', trigger: 'blur' }
        ]
      }
      
    }
  },
  components: {
    AuthenticationCode
  },
  methods: {
    async login() {
      this.$refs.loginFormRef.validate(async flag => {
        if (!flag) {
          return false
        }
        try {
          // 此处做校验
          const res =  this.$refs['auth-code'].validateCode(this.loginForm.userCode)
          console.log(res)
        } catch (err) {
          // 验证码错误
          this.$message.error('验证码输入错误')
        }

        // 发送异步请求
        this.loginRequest.password=this.$md5(this.loginForm.password);
        console.log(this.loginRequest.password);
        this.loginRequest.username=this.loginForm.username;
         await this.$axios.getLogin(this.loginRequest).then(res => {
           console.log("-----------")
           console.log(res)
         if(res.data.code == '403'){
           return  this.$router.push('/page4');
         }else if(res.data.code!='0'){
           this.$message.error(res.data.msg);
           return;
         }
         // 登录成功，保存凭据
         this.$message.success('登录成功！')
         window.sessionStorage.setItem('token', res.data.data)
         return this.$router.push('/home');
       });


        // if (res.status !== '200') {
        //  //出现错误
        // return this.$message.error('用户名或密码错误！')
        // }


      })
    },
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    },
    openNewPage(newPageUrl) {
      window.open(newPageUrl, '_blank')
    },
    openHome() {
      let routeUrl = this.$router.resolve({
        path: '/home'
      })
      window.open(routeUrl.href, '_blank')
    }
  }
}
</script>
<style lang="less" scoped>
header {
  height: 94px;
}
.container {
  height: 540px;
  background: url(../assets/loginbg.png) no-repeat;
  background-size: cover;
  position: relative;
}
  .loginBox {
    width: 350px;
    height: 400px;
    box-shadow: 0 0 6px 3px #e1e1e1;
    background-color: #fff;
    position: absolute;
    top: 100px;
    right: 250px;
  }
  h2 {
    margin-top: 15px;
    padding-left: 12px;
    height: 45px;
    line-height: 45px;
    font-size: 30px;
    border-left: 3px solid #ff9d02;
    text-align: start;
  }
  .el-form {
    padding: 15px;
  }
    .el-form-item__content {
      text-align: left;}
      .user-code {
        width: 50% !important;
      }

    .authentication-code {
      margin-left: 20px;
      height: 40px;
      background-color: #ff9d02 !important;
      border-radius: 3px;
    }
.el-form-item__content {
  text-align: left !important;
}
footer .links {
  text-align: center;
}
</style>
