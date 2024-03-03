<template>
  <div class="login-bg">
    <div class="login-content">
      <div class="login-title">登录</div>
      <div class="login-msg">
        <div class="login-name">
          <label for="username">手机号码</label>
          <el-input size="medium" style="width:300px" class="login-ipt" v-model="loginForm.tele"
            placeholder="请输入11位手机号"></el-input>
        </div>
        <div class="login-password">
          <label for="userpassword">登录密码</label>
          <el-input show-password size="medium" style="width:300px" class="login-ipt" v-model="loginForm.pwd"
            placeholder="请输入密码"></el-input>
        </div>
        <div class="login-radio">
          <el-radio-group v-model="loginForm.type">
            <el-radio :label="1" style="color:white">顾客</el-radio>
            <el-radio :label="2" style="color:white">员工</el-radio>
            <el-radio :label="3" style="color:white">经理</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="login-btn">
        <el-button type="primary" style="width:150px" @click="login">登录</el-button>
        <br>
        <el-button type="text">未有账号？点击注册</el-button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        tele: '',
        pwd: '',
        type: 1
      }
    }
  },
  methods: {
    login() {
      if (this.loginForm.tele === '' || this.loginForm.pwd === '') {
        this.$message({
          message: '请输入手机号和密码',
          type: 'warning'
        })
        return
      }
      if (this.loginForm.tele.length !== 11) {
        this.$message({
          message: '请输入11位手机号',
          type: 'warning'
        })
        return
      }
      if (this.loginForm.pwd.length < 8 || this.loginForm.pwd.length > 20) {
        this.$message({
          message: '请输入8~20位密码',
          type: 'warning'
        })
        return
      }
      // 测试开发环节 配合服务器文件 建议使用localhost
      this.$axios.post('http://localhost:3000/login', this.loginForm).then((res) => {
        const logintype = res.data.logintype
        if (logintype === 1) {
          const token = res.data.token
          // 随机生成两位数在1~20范围中
          // 模拟入店店员随机分配的桌号
          const ran = Math.floor(Math.random() * 20) + 1
          if (ran < 10) {
            token.table = '0' + ran
          } else {
            token.table = '' + ran
          }
          window.localStorage.setItem('token', JSON.stringify(token))
          if (token.type === 1) {
            this.$router.push({
              name: 'customer'
            })
          } else if (token.type === 2) {
            this.$router.push({
              name: 'employee'
            })
          } else {
            this.$router.push({
              name: 'boss'
            })
          }
        } else if (logintype === 0) {
          this.$message.error('密码错误')
        } else if (logintype === -1) {
          this.$message.error('此手机号码未注册')
        } else {
          this.$message.error('请稍后重试,错误码为500')
        }
      }, (err) => {
        this.$message.error('发起请求失败')
        console.log(err)
      })
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

.login-bg {
  color: white;
  position: relative;
  width: 100%;
  height: 100%;
  background: url('~@/assets/img/login-3.png');
  background-size: 100% 100%;
}

.login-content {
  position: absolute;
  width: 500px;
  height: 350px;
  left: 50%;
  top: 50%;
  border-radius: 5px 5px;
  transform: translate(-50%, -50%);
  background-position: center top;
  background-size: cover;
  overflow: hidden;
  box-shadow: 0 0 0 1px hsla(0, 0%, 100%, .3) inset, 0 .5em 1em rgba(0, 0, 0, 0.6);
}

.login-title {
  margin-top: 25px;
  font-size: 30px;
  font-weight: bolds;
}

.login-name,
.login-password,
.login-btn {
  margin: 28px auto;
}

.login-msg {
  margin-top: 35px;
}

.login-ipt {
  padding-left: 10px;
}

.login-content:before {
  content: '';
  position: absolute;
  background: url('~@/assets/img/login-3.png');
  background-position: center top;
  background-size: cover;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  filter: blur(20px);
  z-index: -1;
  margin: -30px;
}

.login-radio {
  color: white;
}
</style>
