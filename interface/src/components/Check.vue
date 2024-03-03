<template>
  <div class="check-box">
    <el-tooltip class="item" effect="dark" content="点击结账" placement="top">
      <el-badge :value="totalFood">
        <div @click="checkout" class="check-count">￥{{ totalMoney }}</div>
      </el-badge>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: 'Check',
  methods: {
    checkout () {
      const orders = this.orders
      const tm = this.totalMoney
      if (this.totalFood !== 0) {
        this.$router.push({
          name: 'checkout',
          params: { orders: orders, tm: tm }
        })
      }
    }
  },
  props: {
    totalFood: Number,
    totalMoney: Number,
    orders: Array
  }
}
</script>

<style>
.check-box{
  position: fixed;
  bottom: 15px;
  right: 15px;
  z-index: 1;
}
.check-count {
  border-radius: 20px;
  min-width: 90px;
  height: 40px;
  background-color: #333744;
  color: white;
  line-height: 40px;
  font-size: 15px;
}
.check-count:hover{
  background-color: #21a549;
  cursor: pointer;
}
</style>
