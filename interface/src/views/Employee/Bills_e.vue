<template>
  <div>
    <Records :identify="identify" ></Records>
  </div>
</template>

<script>
import Records from '@/components/Records.vue'

export default {
  name: 'Bills_e',
  data () {
    return {
      identify: true
    }
  },
  methods: {
    doneChange (val, status) {
      const i = this.billsData.findIndex(item => item.orderNum === val)
      this.billsData[i].isDone = status
      if (status) {
        this.billsData[i].doneFlag = 1
      } else {
        this.billsData[i].doneFlag = 0
      }
    }
  },
  components: {
    Records
  }
}
</script>

<style>

</style>
