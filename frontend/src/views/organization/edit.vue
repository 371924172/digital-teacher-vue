<template>
  <div class="tableAll">
    <div class="addArea">
      <el-button class="add_btn" type="primary" @click="add">新增</el-button>
    </div>

    <div class="tableMain">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="organizeName" label="组织名称" width="180">
        </el-table-column>
        <el-table-column prop="organizeSName" label="组织简称" width="180">
        </el-table-column>
        <el-table-column prop="organizeIntroduction" label="组织介绍" width="180">
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


    <el-dialog style="width: 1000px;height: 1000px;" title="组织信息" :visible.sync="dialog">
      <el-form :model="form">
        <el-form-item label="组织名称" width="80px">
          <el-input class="dialog_input" v-model="form.organizeName" ></el-input>
        </el-form-item>
        <el-form-item label="组织简称" width="80px">
          <el-input class="dialog_input" v-model="form.organizeSName" ></el-input>
        </el-form-item>
        <el-form-item label="组织介绍" width="80px">
          <el-input class="dialog_input" v-model="form.organizeIntroduction" ></el-input>
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
    name:"eltable",
    data() {
      return {
        tableData: [{
          organizeName: '东南大学',
          organizeSName: '东大',
          organizeIntroduction: '12345678',
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
          organizeName: '',
          organizeSName: '',
          organizeIntroduction: ''
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
    width:900px;
    height: 300px;
    /* border: red 1px solid; */
  }
  .addArea{
    height: 40px;
    width: 900px;
    /* border: red 1px solid; */
  }
  .add_btn{
    float: right;
    margin-right: 20px;
  }
  .dialog_input{
    width:220px;
  }

</style>

