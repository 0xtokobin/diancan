<template>
  <el-menu class="aside-menu"
        background-color="#333744"
        text-color="#fff"
        active-text-color="#ffd04b"
        router>
          <el-menu-item v-for="(item,index) in wModel" :key="index" :index="item.router">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.name }}</span>
          </el-menu-item>

  </el-menu>
</template>

<script>
export default {
  name: 'Left',
  props: {
    wModel: Array
  }
}
</script>

<style>

</style>
