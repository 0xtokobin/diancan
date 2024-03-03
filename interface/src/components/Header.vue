<template>
  <div class="header">
      <img class="logo" src="@/assets/img/logo.png">
      <div class="title">米饭餐饮</div>
      <p class="customer-name">欢迎,{{ loginInfo.username }}</p>
      <div class="head-pic">
        <img :src="'/h-img/'+loginInfo.pic" alt="">
      </div>
      <el-button @click="exit" class="exit-btn" type="info" size="small">退出</el-button>
  </div>
</template>

<script>

export default {
  name: 'Header',
  data () {
    return {
      loginInfo: {
        username: '',
        pic: ''
      }
    }
  },
  methods: {
    exit () {
      window.localStorage.removeItem('token')
      this.$router.push({
        path: '/'
      })
    }
  },
  created () {
    const token = JSON.parse(window.localStorage.getItem('token'))
    for (const k in this.loginInfo) {
      this.loginInfo[k] = token[k]
    }
  }
}
</script>

<style>
.header{
  background-color: #373d41;
  position: relative;
  height: 60px;
  line-height: 60px;
  color: #fff
}
.logo,.title,.exit-btn,.head-pic{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.logo{
  width: 50px;
  height: 50px;
  left: 5px;
}
.title{
  font-size: 25px;
  left: 70px;
}
.head-pic{
  width: 30px;
  height: 30px;
  position: absolute;
  right: 75px;
  overflow: hidden;
  border-radius: 15px;
  cursor: pointer;
}
.head-pic img{
  position: absolute;
  top: 0;
  left: 0;
  width:100%;
  height:100%;
}
.customer-name{
  position: absolute;
  right: 110px;
}
.exit-btn{
  right: 10px;
}
</style>
