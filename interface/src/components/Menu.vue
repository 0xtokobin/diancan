<template>
  <div class="item-box" >
    <div class="item-img">
      <img :src="'/img/'+pic" alt="">
    </div>
    <div class="item-content">
      <span class="item-detail d1">{{ title }}</span>
      <span class="item-detail d2"><i class="el-icon-edit"> ￥{{ price }}/份</i></span>
      <span class="item-detail d3"><i class="el-icon-dish"></i>{{ ingredients }}</span>
    </div>
    <el-input-number v-if="!menuIdentify" class="item-count" v-model="num" @change="handleChange" :min="0" :max="20" label="描述文字"></el-input-number>
    <el-button-group v-if="menuIdentify" class="item-setting" >
      <el-button @click="dishChange(id)" size="medium" type="primary" icon="el-icon-edit"></el-button>
      <el-button size="medium" type="primary" icon="el-icon-picture-outline"></el-button>
      <el-button @click="dishDelete(id)" size="medium" type="primary" icon="el-icon-delete"></el-button>
    </el-button-group>
    <div class="chosen" v-show="isChosen">
      <img src="@/assets/img/gou.png" alt="" width="30px" height="30px">
    </div>
    <el-dialog title="修改菜品" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="菜品ID" :label-width="formLabelWidth">
          <el-input v-model="form.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="菜品名称" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="菜品价格" :label-width="formLabelWidth">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="菜品食材" :label-width="formLabelWidth">
          <el-input v-model="form.ingredients" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dishSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data () {
    return {
      num: 0,
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        id: '',
        title: '',
        ingredients: '',
        price: 0
      },
      currentID: '',
      formLabelWidth: '120px'
    }
  },
  methods: {
    handleChange () {
      this.$emit('numChange', { num: this.num, title: this.title })
    },
    dishChange (val) {
      const currentDish = {
        id: this.id,
        title: this.title,
        ingredients: this.ingredients,
        price: this.price
      }
      this.currentID = val
      this.dialogFormVisible = true
      for (const k in currentDish) {
        this.form[k] = currentDish[k]
      }
    },
    dishDelete (val) {
      this.$confirm('此操作将永久删除该菜品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.menuDelete(val)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    dishSave () {
      this.menuChange(this.currentID, this.form)
      this.dialogFormVisible = false
    }
  },
  props: {
    id: String,
    title: String,
    ingredients: String,
    price: String,
    pic: String,
    menuIdentify: Boolean,
    menuChange: Function,
    menuDelete: Function
  },
  computed: {
    isChosen () {
      if (this.num > 0) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style>
.item-box{
  position: relative;
  margin: 30px 25px;
  width: 266px;
  height: 400px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
.item-img{
  width: 100%;
  height: 66%;
  border-radius: 5px 5px 0 0;
  overflow: hidden;
}
.item-img img{
  width: 100%;
  height: 100%;
}
.item-count,.item-setting{
  margin-top: 5px;
}
.item-detail{
  display: block;
  margin: 3px 0;
}
.d1{
  font-size: 25px;
}
.d2{
  font-size: 18px;
  color: brown;
}
.d3{
  font-size: 15px;
  color: rgba(54, 54, 54, 0.534);
}
.chosen{
  position: absolute;
  width: 260px;
  height: 394px;
  top: 0;
  left: 0;
  border: blue 3px solid;
  border-radius: 5px;
}
.chosen img{
  position: absolute;
  top: 10px;
  left: 10px;
}
</style>
