<template>
  <div class="center-box">
    <div class="center-pic">
      <img :src="'/h-img/'+centerInfo.pic" alt="">
      <el-button class="upload-btn" size="small" type="primary">点击上传</el-button>
    </div>
    <div class="center-info">
      <div class="cf">
        <label for="id">昵称</label>
        <el-input style="width:300px" v-model="centerInfo.username"  placeholder="请输入昵称" ></el-input>
      </div>
      <div class="cf">
        <label for="psw">密码</label>
        <el-input style="width:300px"  placeholder="请输入密码" v-model="centerInfo.pwd" show-password></el-input>
      </div>
      <div class="cf">
        <label for="tele">电话</label>
        <el-input disabled style="width:300px" placeholder="请输入内容" v-model="centerInfo.tele"></el-input>
      </div>
      <div class="cf cf-3">
        <el-radio v-model="centerInfo.gender" label="男">男</el-radio>
        <el-radio v-model="centerInfo.gender" label="女">女</el-radio>
      </div>
      <el-button class="update-btn" size="small" type="primary" :plain="true" @click="open2">更新信息</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Center',
  data () {
    return {
      centerInfo: {
        tele: '',
        pwd: '',
        username: '',
        gender: '',
        pic: '',
        type: 0
      }
    }
  },
  methods: {
    open2 () {
      this.$axios.post('http://localhost:3000/updateInfo', this.centerInfo).then(res => {
        const data = res.data
        if (data.state === 200) { // 成功修改
          this.$message({
            message: data.msg,
            type: 'success'
          })
          window.localStorage.setItem('token', JSON.stringify(this.centerInfo))
          setTimeout(() => {
            window.location.reload()// 刷新页面
          }, 2000)
        } else {
          this.$message({
            message: data.msg,
            type: 'error'
          })
        }
      }, err => {
        this.$message({
          message: '网络错误',
          type: 'error'
        })
        console.log(err)
      })
    }
  },
  created () {
    const token = JSON.parse(window.localStorage.getItem('token'))
    for (const k in this.centerInfo) {
      this.centerInfo[k] = token[k]
    }
  }
}
</script>

<style>
.center-box{
  position: relative;
  width: 1200px;
  height: 600px;
}
.center-pic{
  width: 300px;
  height: 360px;
  position: absolute;
  top: 50%;
  left: 25%;
  transform: translateY(-50%);
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  overflow: hidden;
}
.center-pic img{
  width: 100%;
  height: 83%;
}
.upload-btn{
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
}
.center-info{
  position: absolute;
  width: 400px;
  top: 50%;
  left: 55%;
  transform: translateY(-50%);
}
.cf{
  margin: 30px 10px;
}
.cf label{
  padding-right: 5px;
}
</style>
