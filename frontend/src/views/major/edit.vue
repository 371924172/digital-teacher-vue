<template>
  <div class="tableAll">
    <div class="addArea">
      <el-button class="add_btn" type="primary" @click="add">新增</el-button>
    </div>

    <div class="tableMain">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="majorName" label="专业名称" width="180">
        </el-table-column>
        <el-table-column prop="majorSName" label="专业简称" width="180">
        </el-table-column>
        <el-table-column prop="openTime" label="开设时间" width="180">
        </el-table-column>
        <el-table-column prop="majorIntroduction" label="专业介绍" width="180">
        </el-table-column>
        <el-table-column prop="tuition" label="学费" width="180">
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


    <el-dialog style="width: 1000px;height: 1000px;" title="专业信息" :visible.sync="dialog">
      <el-form :model="form">
        <el-form-item label="专业名称" width="80px">
          <el-input class="dialog_input" v-model="form.majorName" ></el-input>
        </el-form-item>
        <el-form-item label="专业简称" width="80px">
          <el-input class="dialog_input" v-model="form.majorSName" ></el-input>
        </el-form-item>
        <el-form-item label="开设时间" width="80px">
          <el-input class="dialog_input" v-model="form.openTime" ></el-input>
        </el-form-item>
        <el-form-item label="专业介绍" width="80px">
          <el-input class="dialog_input" v-model="form.majorIntroduction" ></el-input>
        </el-form-item>
        <el-form-item label="学费" width="80px" >
          <el-input class="dialog_input" v-model="form.tuition"  style="margin-left: 6%"></el-input>
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
          majorName: '计算机科学与技术',
          majorSName: '计科',
          openTime: '2021-01-01',
          majorIntroduction: '12345678',
          tuition: '80000/人/年'
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
          majorName: '',
          majorSName: '',
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
    width:1100px;
    height: 300px;
    /* border: red 1px solid; */
  }
  .addArea{
    height: 40px;
    width: 1100px;
    /* border: red 1px solid; */
  }
  .add_btn{
    float: right;
    margin-right: 5%;
  }
  .dialog_input{
    width:220px;
  }

</style>

