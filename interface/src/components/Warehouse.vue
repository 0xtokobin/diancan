<template>
  <div>
    <el-table
    :data="foodData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 1280px">
      <el-table-column label="食材" prop="name"></el-table-column>
      <el-table-column label="余量" prop="num"></el-table-column>
      <el-table-column label="单位" prop="unit"></el-table-column>
      <el-table-column label="更新">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="success"
            @click="updatePurchase(scope.$index, scope.row)">更新</el-button>
        </template>
      </el-table-column>
      <el-table-column label="历史记录">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="success"
            @click="checkPurchase(scope.$index, scope.row)">查看历史记录</el-button>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header" >
          <input
            class="food-search"
            type="text"
            v-model="search"
            size="mini"
            placeholder="输入食材关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button
            size="small"
            type="danger"
            @click="handleEdit(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="更新库存" :visible.sync="dialogFormVisible">
      <el-form :model="purchase">
        <el-form-item el-form-item label="进货日期" :label-width="formLabelWidth">
          <el-input v-model="purchase.pDate" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item el-form-item label="食材名称" :label-width="formLabelWidth">
          <el-input v-model="purchase.pFood" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item el-form-item label="进货数量" :label-width="formLabelWidth">
          <el-input v-model="purchase.pNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item el-form-item label="进货人" :label-width="formLabelWidth">
          <el-input v-model="purchase.pName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="phSave">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="进货历史记录" :visible.sync="dialogTableVisible">
      <el-table :data="cfHistory">
        <el-table-column property="phDate" label="日期" ></el-table-column>
        <el-table-column property="phFood" label="食材名称" ></el-table-column>
        <el-table-column property="phNum" label="进货数量"></el-table-column>
        <el-table-column property="phUnit" label="单位"></el-table-column>
        <el-table-column property="phName" label="进货人"></el-table-column>
      </el-table>
    </el-dialog>
    <div class="edit-dish">
      <el-tooltip class="item" effect="dark" content="新增食材" placement="top">
        <el-button type="success" icon="el-icon-plus" circle></el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Warehouse',
  data () {
    return {
      search: '',
      foodData: [
        { name: '土豆', num: 20, unit: '斤' },
        { name: '鸡肉', num: 25, unit: '斤' },
        { name: '白菜', num: 10, unit: '斤' },
        { name: '牛肉', num: 11, unit: '斤' }
      ],
      purchase: [
        { pDate: '', pFood: '', pNum: 0, pName: '', pUnit: '' }
      ],
      pHistory: [
        { phDate: '2021-10-20', phFood: '土豆', phNum: 10, phName: 'boss', phUnit: '斤' },
        { phDate: '2021-10-21', phFood: '鸡肉', phNum: 10, phName: 'boss', phUnit: '斤' },
        { phDate: '2021-7-20', phFood: '牛肉', phNum: 20, phName: 'boss2', phUnit: '斤' },
        { phDate: '2021-9-20', phFood: '牛肉', phNum: 15, phName: 'boss3', phUnit: '斤' },
        { phDate: '2021-10-22', phFood: '土豆', phNum: 20, phName: 'boss2', phUnit: '斤' },
        { phDate: '2021-10-26', phFood: '鸡肉', phNum: 30, phName: 'boss2', phUnit: '斤' },
        { phDate: '2021-10-30', phFood: '白菜', phNum: 20, phName: 'boss2', phUnit: '斤' }
      ],
      dialogTableVisible: false,
      dialogFormVisible: false,
      cfID: 0,
      cfHistory: []
    }
  },
  methods: {
    updatePurchase (index, row) {
      this.dialogFormVisible = true
      this.purchase.pFood = row.name
      this.purchase.pDate = '2021-10-20'
      this.purchase.pUnit = row.unit
      this.cfID = index
    },
    phSave () {
      this.dialogFormVisible = false
      const history = {
        phDate: this.purchase.pDate,
        phFood: this.purchase.pFood,
        phNum: this.purchase.pNum,
        phName: this.purchase.pName,
        phUnit: this.purchase.pUnit
      }
      this.pHistory.push(history)
      this.foodData[this.cfID].num += parseInt(history.phNum)
    },
    checkPurchase (index, row) {
      this.dialogTableVisible = true
      this.cfHistory = this.pHistory.filter(item => item.phFood === row.name)
    },
    handleEdit (index, row) {
      this.$confirm('此操作为删除该食材, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.foodData.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style >
form.el-form {
    margin: 0 60px;
}
</style>
