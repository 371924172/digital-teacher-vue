<template>
  <div class="tableAll">
    <div class="tableMain">
      <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column prop="name" label="课程名" width="180">
        </el-table-column>
        <el-table-column prop="intro" label="课程说明" width="180">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="openUpdate(scope.row.id)" circle></el-button>
            <el-button slot="reference" style="margin-left: 10px"
                       @click="deleteLesson(scope.row.id)" icon="el-icon-delete" type="danger" size="mini" circle>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

       <el-dialog style="width: 1000px;height: 1000px;" title="课程信息"
               :visible.sync="dialogVisible" :before-close="handleClose">
      <el-form ref="lessonInfo" :model="lessonInfo">

        <el-form-item label="课程名" width="80px">
          <el-input class="dialog_input" v-model="lessonInfo.name" ></el-input>
        </el-form-item>
        <el-form-item label="课程说明" width="80px">
          <el-input class="dialog_input" v-model="lessonInfo.intro" ></el-input>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addUpdateInfo">提交</el-button>
      </div>
    </el-dialog>

    <div class="addArea">
      <el-button class="add_btn" type="primary" @click="openCreate">创建课程</el-button>
    </div>

    <el-pagination
      align="center"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length"
    >
    </el-pagination>
  </div>
</template>

<script type="text/javascript">
    import { getLessonList, addLesson, getLesson, deleteLesson, updateLesson } from "@/api/lesson";

    export default {
    name:"lessonList",
    inject: ["reload"],
    data() {
      return {

        tableData: [],
        lessonInfo: {},
        pageSize: 5,
        currentPage: 1,
        dialogVisible: false,
      }
    },
    methods: {

      getData() {//获取数据
        getLessonList().then((response) => {
          this.tableData = response.data;
          console.log(response);
        });
      },

      openUpdate(id) {
        getLesson(id).then((response) => {
          this.lessonInfo = response.data;
        });
        this.dialogVisible = true;
      },

      openCreate() {
        this.dialogVisible = true;
      },

      handleClose() {
        this.dialogVisible = false;
        this.lessonInfo = {};
      },
      handleSizeChange(val) {
        this.currentPage = 1;
        this.pageSize = val;
      },
      //当前页改变时触发 跳转其他页
      handleCurrentChange(val) {
        this.currentPage = val;
      },
      handleSelectionChange(selected) {},

      addUpdateInfo() {
        if (this.lessonInfo.id == null) {
          addLesson(this.lessonInfo).then((response) => {
            this.$message({
              message: "添加成功！",
              type: "success",
            });
            this.reload();
          });
        }else {
          updateLesson(this.lessonInfo).then((response) => {
            console.log(response);
            const {status} = response;
            if (status == 200)
              this.$message({
                message: "修改成功！",
                type: "success",
              });
            this.reload();
          });
        }
        this.handleClose();
        this.lessonInfo = {};
      },

      deleteLesson(id) {
        console.log(id);
        deleteLesson(id);
        this.$message({
          message: "删除成功！",
          type: "success",
        });
        this.reload();
      },
    },
    mounted() {
      this.getData();
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
    float: left;
    margin-right: 7%;
  }
  .dialog_input{
    width:220px;
  }

</style>

