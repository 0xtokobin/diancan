<template>
  <el-table
    :data="supplierData.filter(data => !search || data.food.toLowerCase().includes(search.toLowerCase()))"
    style="width: 1280px">
    <el-table-column
      label="供应商编号"
      prop="supplierID">
    </el-table-column>
    <el-table-column
      label="供应商地址"
      prop="address">
    </el-table-column>
    <el-table-column
      label="食材"
      prop="food">
    </el-table-column>
    <el-table-column
      label="食材单价"
      prop="price">
    </el-table-column>
    <el-table-column
      label="食材单位"
      prop="unit">
    </el-table-column>
    <el-table-column
      align="right">
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
          type="success"
          @click="handleEdit(scope.$index, scope.row)">去导航</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'Supplier',
  data () {
    return {
      supplierData: [{
        supplierID: '001',
        address: '都市大街2号铺',
        food: '土豆',
        price: '5.00',
        unit: '元/斤'
      }, {
        supplierID: '001',
        address: '都市大街2号铺',
        food: '老母鸡',
        price: '25.00',
        unit: '元/斤'
      }, {
        supplierID: '001',
        address: '都市大街2号铺',
        food: '猪肉',
        price: '30.00',
        unit: '元/斤'
      }, {
        supplierID: '002',
        address: '都市大街1号铺',
        food: '土豆',
        price: '5.50',
        unit: '元/斤'
      }, {
        supplierID: '002',
        address: '都市大街1号铺',
        food: '鲜虾',
        price: '45.00',
        unit: '元/斤'
      }, {
        supplierID: '003',
        address: '都市大街4号铺',
        food: '土豆',
        price: '4.95',
        unit: '元/斤'
      }, {
        supplierID: '003',
        address: '都市大街4号铺',
        food: '鲫鱼',
        price: '10.00',
        unit: '元/斤'
      }, {
        supplierID: '004',
        address: '都市大街7号铺',
        food: '牛肉',
        price: '55.00',
        unit: '元/斤'
      }, {
        supplierID: '004',
        address: '都市大街7号铺',
        food: '卷心菜',
        price: '2.00',
        unit: '元/斤'
      }, {
        supplierID: '005',
        address: '商业CBD中心2层6号',
        food: '猪肉',
        price: '36.00',
        unit: '元/斤'
      }, {
        supplierID: '007',
        address: '西郊摩纳哥市场',
        food: '羊蝎子',
        price: '75.00',
        unit: '元/斤'
      }, {
        supplierID: '007',
        address: '西郊摩纳哥市场',
        food: '老母鸡',
        price: '30.00',
        unit: '元/斤'
      }, {
        supplierID: '008',
        address: '沃尔妈',
        food: '猪肉',
        price: '30.00',
        unit: '元/斤'
      }, {
        supplierID: '008',
        address: '沃尔妈',
        food: '羊蝎子',
        price: '74.00',
        unit: '元/斤'
      }],
      search: ''
    }
  },
  methods: {
    handleEdit (index, row) {
      // console.log(index, row)
    }
  }
}
</script>

<style>
.food-search{
  border: 1px solid #ccc;
  padding: 7px 0px;
  border-radius: 3px; /*css3属性IE不支持*/
  padding-left:5px;
  margin: 5px 0;
}
.food-search:focus{
  border-color: #66afe9;
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)
}
</style>
