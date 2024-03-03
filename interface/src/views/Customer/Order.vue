<template>
  <div class="menu">
    <Menu @numChange="getMenuCount" :menuIdentify="menuIdentify" v-for="item in menus" :key="item.id" :title="item.name" :ingredients="item.description" :price="item.price" :pic="item.pic"></Menu>
    <Check :totalMoney="totalMoney" :totalFood="totalFood" :orders="orders"></Check>
  </div>
</template>

<script>
import Menu from '@/components/Menu.vue'
import Check from '@/components/Check.vue'

export default {
  name: 'Order',
  data () {
    return {
      menuIdentify: false,
      menus: []
    }
  },
  methods: {
    getMenuCount (val) {
      const i = this.menus.findIndex(item => item.name === val.title)
      this.menus[i].num = val.num
    }
  },
  computed: {
    totalFood () {
      return this.menus.reduce((total, item) => (total += item.num), 0)
    },
    totalMoney () {
      return this.menus.reduce((total, item) => (total += item.num * item.price), 0)
    },
    orders () {
      return this.menus.filter(item => item.num !== 0)
    }
  },
  created () {
    this.$axios.get('http://localhost:3000/getMenu').then(res => {
      const data = res.data
      if (data.state === 200) {
        data.menu.forEach(item => {
          const dish = { id: '', name: '', price: 0, description: '', pic: '', num: 0 }
          for (const k in item) {
            dish[k] = item[k]
          }
          this.menus.push(dish)
        })
      }
    }, err => {
      this.$message.error('网络异常，请稍后再试')
      console.log(err)
    })
  },
  components: {
    Menu,
    Check
  }
}
</script>

<style>
.menu{
  display: flex;
  flex-wrap: wrap;
  height: 100%;
}
</style>
