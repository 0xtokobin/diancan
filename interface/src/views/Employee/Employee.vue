<template>
  <div>
    <Header ></Header>
    <el-container class="container">
      <el-aside width="200px" class="left-box">
        <Left :wModel="bModel"></Left>
        <div class="contact-box">
          <span class="contact-us contact">联系我们</span>
          <span class="contact-tele contact">电话：12345678910</span>
          <span class="contact-email contact">邮箱：123456@rice.com</span>
        </div>
      </el-aside>
      <el-main class="right-box">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Left from '@/components/Left.vue'

export default {
  name: 'Employee',
  data () {
    return {
      loginInfo: {},
      bModel: [
        { name: '订单中心', icon: 'el-icon-tickets', router: '/employee/bills' },
        { name: '仓库管理', icon: 'el-icon-box', router: '/employee/warehouse' },
        { name: '供应商名单', icon: 'el-icon-truck', router: '/employee/supplier' },
        { name: '个人中心', icon: 'el-icon-setting', router: '/employee/center' }
      ]
    }
  },
  components: {
    Header,
    Left
  },
  created () {
    this.loginInfo = JSON.parse(window.localStorage.getItem('token'))
  }
}
</script>

<style>

</style>
