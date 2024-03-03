<template>
  <div class="menu-setting">
    <Menu :menuIdentify="menuIdentify"
    :menuChange="menuChange"
    :menuDelete="menuDelete"
    v-for="item in menus"
    :key="item.id"
    :id="item.id"
    :title="item.name"
    :ingredients="item.description"
    :price="item.price"
    :pic="item.pic"></Menu>
    <div class="edit-dish">
      <el-tooltip class="item" effect="dark" content="新增菜品" placement="top">
        <el-button type="primary" icon="el-icon-plus" circle></el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import Menu from '@/components/Menu.vue'

export default {
  name: 'MenuSetting',
  data () {
    return {
      menuIdentify: true,
      menus: []
    }
  },
  methods: {
    menuChange (val, form) {
      const t = this.menus.findIndex(item => item.id === val)
      this.menus[t].id = form.id
      this.menus[t].title = form.title
      this.menus[t].ingredients = form.ingredients
      this.menus[t].price = form.price
    },
    menuDelete (val) {
      const t = this.menus.findIndex(item => item.id === val)
      this.menus.splice(t, 1)
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
    Menu
  }
}
</script>

<style>
.menu-setting{
  display: flex;
  flex-wrap: wrap;
  height: 100%;
}
.edit-dish{
  position: fixed;
  bottom: 10px;
  left: 55%;
  z-index: 1;
}
</style>
