<template>
  <div class="tableAll">
    <div class="tableMain">
      <el-table
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="user_id.id" label="学号" width="180">
        </el-table-column>
        <el-table-column prop="user_id.name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="lesson_id.name" label="课程" width="180">
        </el-table-column>
        <el-table-column prop="class_id.name" label="班级" width="180">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="openUpdate(scope.row.id)"
              circle
            ></el-button> -->
            <el-button
              slot="reference"
              style="margin-left: 10px"
              @click="deleteSelclass(scope.row.id)"
              icon="el-icon-delete"
              type="danger"
              size="mini"
              circle
            >
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      style="width: 1000px; height: 1000px"
      title="选课信息"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
    >
      <el-form ref="selclassInfo" :model="selclassInfo">
        <el-form-item label="学生" width="180px">
          <el-select v-model="selclassInfo.user_id" placeholder="学生">
            <el-option
              v-for="item in studentList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="班级" width="180px">
          <el-select v-model="selclassInfo.class_id" placeholder="班级">
            <el-option
              v-for="item in classList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="课程" width="180px">
          <el-select v-model="selclassInfo.lesson_id" placeholder="课程">
            <el-option
              v-for="item in lessonList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addUpdateInfo">提交</el-button>
      </div>
    </el-dialog>

    <div class="addArea">
      <el-button class="add_btn" type="primary" @click="openCreate"
        >创建选课记录</el-button
      >
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
import { getClassList } from "@/api/class";
import { getStudentList } from "@/api/student";
import { getLessonList } from "@/api/lesson";
import {
  getSelclassList,
  addSelclass,
  getSelclass,
  deleteSelclass,
  updateSelclass,
} from "@/api/selclass";

export default {
  name: "selclassList",
  inject: ["reload"],
  data() {
    return {
      tableData: [],
      selclassInfo: {},
      studentList: [],
      classList: [],
      lessonList: [],
      pageSize: 5,
      currentPage: 1,
      dialogVisible: false,
    };
  },
  methods: {
    getData() {
      //获取数据
      getSelclassList().then((response) => {
        this.tableData = response.data;
      });
    },

    openUpdate(id) {
      getSelclass(id).then((response) => {
        this.selclassInfo = response.data;
      });
      this.dialogVisible = true;
    },

    openCreate() {
      this.dialogVisible = true;
      getStudentList().then((response) => {
        this.studentList = response.data;
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
      this.selclassInfo = {};
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
      if (this.selclassInfo.id == null) {
        addSelclass(this.selclassInfo).then((response) => {
          this.$message({
            message: "添加成功！",
            type: "success",
          });
          this.getData();
        });
      } else {
        updateSelclass(this.selclassInfo).then((response) => {
          const { status } = response;
          if (status == 200)
            this.$message({
              message: "修改成功！",
              type: "success",
            });
          this.getData();
        });
      }
      this.handleClose();
      this.selclassInfo = {};
    },

    deleteSelclass(id) {
      deleteSelclass(id);
      this.$message({
        message: "删除成功！",
        type: "success",
      });
      this.getData();
    },
  },
  mounted() {
    this.getData();
  },
};
</script>


<style>
.tableAll {
  width: 100%;
  height: 300px;
  /* border: red 1px solid; */
}
.addArea {
  height: 40px;
  width: 100%;
  /* border: red 1px solid; */
}
.add_btn {
  float: left;
  margin-right: 7%;
}
.dialog_input {
  width: 220px;
}
</style>

