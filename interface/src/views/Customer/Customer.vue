<template>
  <div>
    <Header></Header>
    <el-container class="container">
      <el-aside width="200px" class="left-box">
        <Left :wModel="cModel"></Left>
        <div class="contact-box">
          <span class="contact-us contact">联系我们</span>
          <span class="contact-tele contact">电话：12345678910</span>
          <span class="contact-email contact">邮箱：123456@rice.com</span>
        </div>
      </el-aside>
      <el-main class="right-box">
        <router-view ></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Left from '@/components/Left.vue'
import Header from '@/components/Header.vue'

export default {
  name: 'customer',
  data () {
    return {
      loginInfo: {},
      cModel: [
        { name: '点餐', icon: 'el-icon-sold-out', router: '/customer/order' },
        { name: '我的订单', icon: 'el-icon-tickets', router: '/customer/bill' },
        { name: '个人中心', icon: 'el-icon-setting', router: '/customer/center' }
      ]
    }
  },
  components: {
    Left,
    Header
  }
}
</script>

<style>
.header{
  position: fixed;
  top: 0;
  left: 0;
  height: 60px;
  width: 100%;
  z-index: 2;
}
.left-box{
  background-color: #333744;
  position: fixed;
  top: 60px;
  left: 0;
  height: 100%;
  z-index: 1;
}
.contact-box{
  position: fixed;
  bottom: 10px;
  color: rgba(255, 255, 255, 0.438);
}
.contact{
  display: block;
  margin: 5px auto;
  width: 200px;
  font-size: 10px;
}
.contact-us{
  font-size: 15px;
}
.right-box{
   position: absolute;
  top: 60px;
  left: 200px;
}
</style>
