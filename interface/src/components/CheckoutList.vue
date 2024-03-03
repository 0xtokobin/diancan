<template>
  <div class="ckl-box">
    <div>
      <div class="ckl-img">
        <img :src="'/img/'+pic" alt="" style="width:100%;height:100%">
      </div>
      <p class="ckl-title">{{ title }}</p>
    </div>
    <p class="ckl-count">x {{ num }}</p>
    <span class="ckl-price">{{ price }}元</span>
  </div>
</template>

<script>
export default {
  name: 'CheckoutList',
  props: {
    title: String,
    num: Number,
    price: Number,
    pic: String
  }
}
</script>

<style>
.ckl-box{
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 150px;
  background: #FFFFFF;
  /* border: steelblue 1px solid; */
  position: relative;
  border-radius: 2px;
  font-size: 25px;
  margin: 5px 0;
}
.ckl-img,.ckl-title,.ckl-price{
  position: absolute;
}
.ckl-img{
  border-radius: 2px;
  overflow: hidden;
  width: 90px;
  height: 90px;
  bottom: 15px;
  left: 15px;
}
.ckl-title{
  top: 5px;
  left: 15px;
}
.ckl-count{
  padding: 63px 0;
}
.ckl-price{
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}
</style>
