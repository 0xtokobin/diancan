<template>
  <div class="result-box">
    <Header></Header>
    <div class="result-detail">
      <div class="rd-img rd" style="width:200px;height:200px">
        <img src="@/assets/img/result-2.gif" alt="" style="width:100%;height:100%">
      </div>
      <p class="rd-msg1 rd">
        <i class="el-icon-success" style="color:green"></i>
        付款成功！
      </p>
      <p class="rd-msg2 rd">稍等片刻，工作人员正在快马加鞭出餐...</p>
      <p class="rd-msg3 rd">点击按钮马上前往"我的订单"页面，页面将在{{time}}秒后自动跳转至"我的订单"页面</p>
      <el-button class="rd" @click="payDone" type="primary" size="medium">返回</el-button>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  name: 'Result',
  data () {
    return {
      time: 10,
      timer: null
    }
  },
  methods: {
    payDone () {
      window.clearInterval(this.timer)
      this.$router.push({ path: '/customer/bill' })
    }
  },
  components: {
    Header
  },
  mounted () {
    this.timer = setInterval(() => {
      if (this.time === 0) {
        this.payDone()
      }
      this.time -= 1
    }, 1000)
  }
}
</script>

<style>
.result-box{
  position: relative;
  height: 100%;
}
.result-detail{
  position: absolute;
  top:calc(0.5 * (100% - 60px));
  left: 50%;
  transform: translate(-50%,-50%);
}
.rd{
  margin:20px auto;
}
.rd-msg1{
  font-size: 40px;
  color: green
}
.rd-msg2{
  font-size: 20px;
}
.rd-msg3{
  font-size: 15px;
  color: #b8bcc5;
}
</style>
