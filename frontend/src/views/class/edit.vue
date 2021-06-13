<template>
  <div class="tableAll">
    <div class="addArea">
      <el-button class="add_btn" type="primary" @click="add">新增</el-button>
    </div>

    <div class="tableMain">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="college" label="所在学院" width="180">
        </el-table-column>
        <el-table-column prop="major" label="所属专业" width="180">
        </el-table-column>
        <el-table-column prop="className" label="班级名称" width="180">
        </el-table-column>
        <el-table-column prop="classIntroduction" label="班级说明" width="180">
        </el-table-column>
        <el-table-column prop="foundationTime" label="成立时间" width="120">
        </el-table-column>
        <el-table-column prop="studyYearNumber" label="学习年数" width="100">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>


    <el-dialog style="width: 1000px;height: 1000px;" title="班级信息" :visible.sync="dialog">
      <el-form :model="form">
        <el-form-item label="所在学院" width="80px">
          <el-input class="dialog_input" v-model="form.college" ></el-input>
        </el-form-item>
        <el-form-item label="所属专业" width="80px">
          <el-input class="dialog_input" v-model="form.major" ></el-input>
        </el-form-item>
        <el-form-item label="班级名称" width="80px">
          <el-input class="dialog_input" v-model="form.className" ></el-input>
        </el-form-item>
        <el-form-item label="组织说明" width="80px">
          <el-input class="dialog_input" v-model="form.classIntroduction" ></el-input>
        </el-form-item>
        <el-form-item label="成立时间" width="80px">
          <el-input class="dialog_input" v-model="form.foundationTime" ></el-input>
        </el-form-item>
        <el-form-item label="学习年数" width="40px">
          <el-input class="dialog_input" v-model="form.studyYearNumber" ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">

  export default {

    data() {
      return {
        tableData: [{
          college: '计算机学院',
          major: '计科',
          className: '计科1班',
          classIntroduction:'1111111',
          foundationTime: '2021-01-01',
          studyYearNumber: '四年',

        },],
        dialog: false,

        formLabelWidth: '80px',
        form: {},
        submitType : "",
      }
    },
    methods: {
      add() {
        this.form = {
          college: '',
          major: '',
          className: '',
          classIntroduction:'',
          foundationTime: '',
          studyYearNumber: ''
        }
        this.submitType = "add";
        this.dialog = true
      },
      submit() {
        this.dialog = false

        if(this.submitType == "add"){
          this.tableData.push(this.form)
        }
      },
      handleEdit(index, row) {
        this.form = this.tableData[index]
        this.submitType = "update";
        this.form = row
        this.dialog = true
      },
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableData.splice(index, 1)
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
      },
      cancel() {
        this.dialog = false
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
      }
    },
  }
</script>


<style>
  .tableAll{
    width:100%;
    height: 300px;
    /* border: red 1px solid; */
  }
  .addArea{
    height: 40px;
    width: 100%;
    /* border: red 1px solid; */
  }
  .add_btn{
    float: right;
    margin-right: 7%;
  }
  .dialog_input{
    width:220px;
  }

</style>

