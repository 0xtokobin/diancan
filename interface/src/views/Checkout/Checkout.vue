<template>
  <el-container class="checkout-box">
    <el-header>
      <Header></Header>
    </el-header>
  <el-main class="ck-detail">
    <div class="ck-list">
      <div class="ck-title">
        <span>检查并付款</span>
      </div>
      <hr>
      <div class="ck-column-name">
        <p>菜品</p>
        <p>数量</p>
        <p>单价</p>
      </div>
      <CheckoutList v-for="(item,index) in orders" :key="index" :title="item.name" :num="item.num" :price="item.price" :pic="item.pic"></CheckoutList>
    </div>
    <div class="ck-total">
      <div class="ck-t-box">
        <div class="ck-t-title">
          <span>订单摘要</span>
        </div>
        <hr>
        <div class="ck-t-count">
          <span class="ck-t-one">数量</span>
          <span class="ck-t-two">{{ tn }}</span>
        </div>
        <div class="ck-t-money">
          <span class="ck-t-one">总计</span>
          <span class="ck-t-two">{{ tm }}元</span>
        </div>
        <hr>
        <el-button @click="checkDone" class="ck-t-btn" type="success">结账</el-button>
      </div>
    </div>
  </el-main>
</el-container>
</template>

<script>
import Header from '@/components/Header.vue'
import CheckoutList from '@/components/CheckoutList.vue'

export default {
  name: 'Customer',
  data () {
    return {
      orders: [],
      tm: 0
    }
  },
  methods: {
    checkDone () {
      var token = JSON.parse(window.localStorage.getItem('token'))
      var ods = []
      this.orders.forEach(item => {
        const temp = {
          id: '',
          num: 0
        }
        for (const k in temp) {
          temp[k] = item[k]
        }
        ods.push(temp)
      })
      this.$axios.post('http://localhost:3000/checkout', {
        tele: token.tele,
        table: token.table,
        totalMoney: this.tm,
        orders: ods
      }).then((res) => {
        if (res.data.state === 200) {
          this.$router.push({ path: '/result' })
        } else {
          this.$message.error('提交订单失败，请稍后重试')
        }
      }, (err) => {
        this.$message.error('网络异常，请稍后重试')
        console.log(err)
      })
    }
  },
  components: {
    Header,
    CheckoutList
  },
  computed: {
    tn () {
      return this.orders.reduce((total, item) => (total += item.num), 0)
    }
  },
  created () {
    this.orders = this.$route.params.orders
    this.tm = this.$route.params.tm
  }
}
</script>

<style>
.checkout-box{
  height: 100%;
  background: #F2F6FC;
}
.ck-detail{
  padding:50px 100px !important;
  display: flex !important;
  justify-content: space-around;
}
.ck-list{
  width: 65%;
}
.ck-title{
  height: 40px;
  font-size: 30px;
  position: relative;
}
.ck-title span{
  display: block;
  position: absolute;
  top: 0;
  left: 0;
}
.ck-t-title{
  height: 30px;
  position: relative;
}
.ck-t-title span{
  font-size: 20px;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
}
.ck-column-name{
  height: 30px;
  display: flex;
  justify-content: space-between;
  margin: 15px 0 0 0;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  font-size: 18px;
  line-height: 30px;
}
.ck-column-name p{
  padding: 0 30px;
}
.ck-total{
  /* float: left; */
  top: 50px;
  width: 35%;
  margin: 0 20px;
}
.ck-t-box{
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px 10px;
  margin-top: 59px;
}
.ck-t-count,.ck-t-money{
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}
.ck-t-one,.ck-t-two{
  display: block;
}
.ck-t-btn{
  margin-top: 20px!important;
  width: 100%;
}
</style>
