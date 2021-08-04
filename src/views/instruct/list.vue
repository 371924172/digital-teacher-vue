<template>
  <div class="tableAll">
    <div class="tableMain">
      <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column prop="teacher_id.name" label="任课老师" width="180">
        </el-table-column>
        <el-table-column prop="class_id.name" label="所在班级" width="180">
        </el-table-column>
        <el-table-column prop="lesson_id.name" label="教授课程" width="180">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="openUpdate(scope.row.id)" circle></el-button>
            <el-button slot="reference" style="margin-left: 10px"
                       @click="deleteInstruct(scope.row.id)" icon="el-icon-delete" type="danger" size="mini" circle>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog style="width: 1000px;height: 1000px;" title="授课信息"
               :visible.sync="dialogVisible" :before-close="handleClose">
        <el-form ref="instructInfo" :model="instructInfo">

    <el-form-item label="任课老师" width="180px">
          <el-select v-model="instructInfo.teacher_id" placeholder="任课老师">
            <el-option
              v-for="item in teacherList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="所在班级" width="180px">
          <el-select v-model="instructInfo.class_id" placeholder="所在班级">
            <el-option
              v-for="item in classList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="教授课程" width="180px">
          <el-select v-model="instructInfo.lesson_id" placeholder="教授课程">
            <el-option
              v-for="item in lessonList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

    </el-form>


      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addUpdateInfo">提交</el-button>
      </div>
    </el-dialog>

    <div class="addArea">
      <el-button class="add_btn" type="primary" @click="openCreate">创建授课信息</el-button>
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
    import { getClassList, addClass, getClass,deleteClass,updateClass } from "@/api/class";
    import { getTeacherList, addTeacher, getTeacher,deleteTeacher,updateTeacher } from "@/api/teacher";
    import { getLessonList, addLesson, getLesson, deleteLesson, updateLesson } from "@/api/lesson";
    import { getInstructList, addInstruct, getInstruct,deleteInstruct,updateInstruct } from "@/api/instruct";

    export default {
    name:"instructList",
    inject: ["reload"],
    data() {
      return {
        tableData:[],
        instructInfo:{},
        teacherList: [],
        classList: [],
        lessonList: [],
        pageSize: 5,
        currentPage: 1,
        dialogVisible: false,
      }
    },

    methods: {
        getData() {//获取数据
        getInstructList().then((response) => {
          this.tableData = response.data;
          console.log(response);
        });
      },

      openUpdate(id) {
        getInstruct(id).then((response) => {
          this.instructInfo = response.data;
        });
        this.dialogVisible = true;
      },

      openCreate() {
        this.dialogVisible = true;
        getTeacherList().then((response) => {
          this.teacherList = response.data;
        });
        getClassList().then((response) => {
          this.classList = response.data;
        });
        getLessonList().then((response) => {
          this.lessonList = response.data;
        });
      },

      handleClose() {
        this.dialogVisible = false;
        this.instructInfo = {};
      },
      handleSizeChange(val) {
        this.currentPage = 1;
        this.pageSize = val;
      },

      handleCurrentChange(val) {
        this.currentPage = val;
      },
      handleSelectionChange(selected) {},

      addUpdateInfo() {
        if (this.instructInfo.id == null) {
          addInstruct(this.instructInfo).then((response) => {
            this.$message({
              message: "添加成功！",
              type: "success",
            });
            this.reload();
          });
        }else {
          updateInstruct(this.instructInfo).then((response) => {
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
        this.instructInfo = {};
      },

      deleteInstruct(id) {
        console.log(id);
        deleteInstruct(id);
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


