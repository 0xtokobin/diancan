<template>
  <div class="staff-info">
    <el-table
    :data="tableData"
    style="width: 1278px">
    <el-table-column
      label="工号">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="姓名">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.name }}</p>
          <p>住址: {{ scope.row.address }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="性别">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.gender }}</span>
      </template>
    </el-table-column>
    <el-table-column label="年龄">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.age }}</span>
      </template>
    </el-table-column>
    <el-table-column label="薪资">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.salary }}</span>
      </template>
    </el-table-column>
    <el-table-column label="职位">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.job }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">解雇</el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-dialog title="修改员工信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="工号" :label-width="formLabelWidth">
          <el-input v-model="form.id" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="form.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="薪资" :label-width="formLabelWidth">
          <el-input v-model="form.salary" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="职位" :label-width="formLabelWidth">
          <el-input v-model="form.job" autocomplete="off"></el-input>
        </el-form-item>
        <div>
          <el-radio v-model="form.gender" label="1" border>男</el-radio>
          <el-radio v-model="form.gender" label="2" border>女</el-radio>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false;save(currentId)">确 定</el-button>
      </div>
    </el-dialog>
    <div class="edit-people">
      <el-tooltip class="item" effect="dark" content="新增员工信息" placement="top">
        <el-button type="primary" icon="el-icon-edit" circle></el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{
        id: '0001',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        gender: '男',
        age: 26,
        salary: 7000,
        job: '厨师'
      }, {
        id: '0002',
        name: '露娜',
        address: '玫瑰单身公寓',
        gender: '女',
        age: 27,
        salary: 7000,
        job: '厨师'
      }, {
        id: '0003',
        name: 'Olivia',
        address: '潮人街',
        gender: '女',
        age: 26,
        salary: 3500,
        job: '服务员'
      }, {
        id: '0011',
        name: '小明',
        address: '三里屯',
        gender: '男',
        age: 21,
        salary: 3100,
        job: '服务员'
      },
      {
        id: '0042',
        name: '小明',
        address: '三里屯',
        gender: '男',
        age: 21,
        salary: 3100,
        job: '服务员'
      },
      {
        id: '0045',
        name: '小明',
        address: '三里屯',
        gender: '男',
        age: 21,
        salary: 3100,
        job: '服务员'
      },
      {
        id: '0047',
        name: '小明',
        address: '三里屯',
        gender: '男',
        age: 21,
        salary: 3100,
        job: '服务员'
      },
      {
        id: '0014',
        name: '小明',
        address: '三里屯',
        gender: '男',
        age: 21,
        salary: 3100,
        job: '服务员'
      },
      {
        id: '0033',
        name: '小明',
        address: '三里屯',
        gender: '男',
        age: 21,
        salary: 3100,
        job: '服务员'
      },
      {
        id: '0029',
        name: '小明',
        address: '三里屯',
        gender: '男',
        age: 21,
        salary: 3100,
        job: '服务员'
      }, {
        id: '0005',
        name: 'windy',
        address: '富贵村庄',
        gender: '女',
        age: 28,
        salary: 3800,
        job: '前台'
      }, {
        id: '0006',
        name: 'linda',
        address: '丽人公寓',
        gender: '女',
        age: 25,
        salary: 6000,
        job: '大堂经理'
      }, {
        id: '0007',
        name: 'Tommy',
        address: '安徽大学',
        gender: '男',
        age: 50,
        salary: 3000,
        job: '仓库管理员'
      }],
      dialogFormVisible: false,
      form: {
        id: '',
        name: '',
        address: '',
        gender: '1',
        age: '',
        salary: 0,
        job: ''
      },
      formLabelWidth: '120px',
      currentId: ''
    }
  },
  methods: {
    handleEdit (index, row) {
      // console.log(index, row)
      // const t = this.tableData.findIndex(item => item.id === row.id)
      // console.log(t)
      this.dialogFormVisible = true
      const info = this.tableData[index]
      this.currentId = info.id
      for (const k in this.form) {
        this.form[k] = info[k]
      }
      if (this.form.gender === '男') {
        this.form.gender = '1'
      } else {
        this.form.gender = '2'
      }
    },
    handleDelete (index, row) {
      this.$confirm('此操作为解雇该员工, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData.splice(index, 1)
        this.$message({
          type: 'success',
          message: '解雇成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消解雇'
        })
      })
    },
    save (val) {
      const t = this.tableData.findIndex(item => item.id === val)
      for (const k in this.form) {
        this.tableData[t][k] = this.form[k]
      }
      if (this.tableData[t].gender === '1') {
        this.tableData[t].gender = '男'
      } else {
        this.tableData[t].gender = '女'
      }
    }
  }
}
</script>

<style>
.v-modal{
  background: transparent !important;
  z-index: -999 !important;
}
.edit-people{
  position: fixed;
  bottom: 10px;
  left: 55%;
  z-index: 1;
}
</style>
