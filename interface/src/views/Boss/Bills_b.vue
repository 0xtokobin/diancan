<template>
  <div>
    <Records :identify="indentify"></Records>
  </div>
</template>

<script>
import Records from '@/components/Records.vue'

export default {
  name: 'Bills_b',
  data () {
    return {
      identify: false
    }
  },
  components: {
    Records
  }
}
</script>

<style>

</style>
