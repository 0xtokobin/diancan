<template>
  <el-table
    :data="bill"
    style="width: 1280px">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="总金额">
            <span>{{ props.row.totalMoney }}</span>
          </el-form-item>
          <el-form-item label="支付方式">
            <span>支付宝</span>
          </el-form-item>
          <el-form-item label="点单详情">
            <span>{{ props.row.detail }}</span>
          </el-form-item>
          <el-form-item label="桌号">
            <span>{{ props.row.tableNum }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="日期"
      prop="orderTime">
    </el-table-column>
    <el-table-column
      label="订单编号"
      prop="orderID">
    </el-table-column>
    <el-table-column
      label="姓名"
      prop="username">
    </el-table-column>
    <el-table-column
      label="手机号"
      prop="tele">
    </el-table-column>
    <el-table-column
      label="总金额"
      prop="totalMoney">
    </el-table-column>
    <el-table-column label="完成状态" >
      <template slot-scope="scope">
        <el-checkbox v-model="scope.row.flag" disabled>{{isDone(scope.row.flag)}}</el-checkbox>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data () {
    return {
      bill: []
    }
  },
  computed: {
    isDone () {
      return function (flag) {
        if (flag) {
          return '完成'
        } else {
          return '未完成'
        }
      }
    }
  },
  created () {
    const token = JSON.parse(window.localStorage.getItem('token'))
    this.$axios.get('http://localhost:3000/cgb', {
      params: {
        tele: token.tele
      }
    }).then(res => {
      const data = res.data
      if (data.state === 200) {
        this.bill = data.bill
        this.bill.forEach(item => {
          if (item.flag === 0) {
            item.flag = false
          } else {
            item.flag = true
          }
        })
        this.bill.reverse()
      } else {
        this.$message.error('数据异常，请稍后再试')
      }
    }, err => {
      this.$message.error('网络异常，请稍后再试')
      console.log(err)
    })
  }
}
</script>

<style>
 .demo-table-expand {
    font-size: 0;
  }
 .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
.demo-table-expand{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 500px;
  }
.el-table::before {
  z-index: 0 !important;
}
</style>
