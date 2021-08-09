<template>
  <div class="tableAll">
    <el-row>
      <el-col :span="4">
        <el-select
          v-model="organizationId"
          placeholder="请选择学校或者组织"
          @change="getCollegeList(organizationId)"
        >
          <el-option
            v-for="item in organizationList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option> </el-select
      ></el-col>
      <el-col :span="4">
        <el-select
          v-model="collegeId"
          placeholder="请选择学院"
          @change="getMajorList(collegeId)"
        >
          <el-option
            v-for="item in collegeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option> </el-select
      ></el-col>
      <el-col :span="4">
        <el-select
          v-model="majorId"
          placeholder="请选择专业"
          @change="getClassList(majorId)"
        >
          <el-option
            v-for="item in majorList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option> </el-select></el-col
      ><el-col :span="4">
        <el-select
          v-model="classId"
          placeholder="请选择班级"
          @change="getStudentList(classId)"
        >
          <el-option
            v-for="item in classList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option> </el-select
      ></el-col>
      <el-col :span="8">
        <el-button
          style="float: right"
          class="add_btn"
          type="primary"
          @click="openCreate"
          >创建班级</el-button
        >
      </el-col></el-row
    >
    <div class="tableMain">
      <el-table
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="id" label="学生学号" width="180">
        </el-table-column>
        <el-table-column
          prop="organization_id.name"
          label="所在组织"
          width="180"
        >
        </el-table-column>
        <el-table-column prop="college_id.name" label="所在学院" width="180">
        </el-table-column>
        <el-table-column prop="class_id.name" label="所在班级" width="180">
        </el-table-column>
        <el-table-column prop="intro" label="简要介绍" width="180">
        </el-table-column>
        <el-table-column prop="entry_date" label="入学日期" width="120">
        </el-table-column>
        <el-table-column prop="status" label="学习状态" width="120">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="openUpdate(scope.row.id)"
              circle
            ></el-button>
            <el-button
              slot="reference"
              style="margin-left: 10px"
              @click="deleteStudent(scope.row.id)"
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
      title="学生信息"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
    >
      <el-form ref="studentInfo" :model="studentInfo">
        <el-form-item label="学生学号" width="80px">
          <el-input class="dialog_input" v-model="studentInfo.id"></el-input>
        </el-form-item>

        <el-form-item label="所在组织" width="180px">
          <el-select
            v-model="studentInfo.organization_id"
            @change="getCollegeList(studentInfo.organization_id)"
          >
            <el-option
              v-for="item in organizationList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="所在学院" width="180px">
          <el-select
            v-model="studentInfo.college_id"
            @change="getMajorList(studentInfo.college_id)"
          >
            <el-option
              v-for="item in collegeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在专业" width="180px">
          <el-select
            v-model="studentInfo.major_id"
            @change="getClassList(studentInfo.major_id)"
          >
            <el-option
              v-for="item in majorList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在班级" width="180px">
          <el-select v-model="studentInfo.class_id" placeholder="所在班级">
            <el-option
              v-for="item in classList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="简要介绍" width="80px">
          <el-input class="dialog_input" v-model="studentInfo.intro"></el-input>
        </el-form-item>

        <el-form-item label="入学日期" width="80px">
          <el-date-picker
            v-model="studentInfo.entry_date"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="学习状态" width="40px">
          <el-input
            class="dialog_input"
            v-model="studentInfo.status"
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addUpdateInfo">提交</el-button>
      </div>
    </el-dialog>

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
import { getOrganizationList } from "@/api/organization";
import { getCollegeList, getCollegeListByOrganization } from "@/api/college";
import { getMajorByCollege } from "@/api/major";
import { getClassList, getClassByMajor } from "@/api/class";
import {
  getStudentList,
  addStudent,
  getStudent,
  deleteStudent,
  updateStudent,
  getStudentByOrganization,
  getStudentByCollege,
  getStudentByClass,
} from "@/api/student";
export default {
  name: "studentList",
  inject: ["reload"],
  data() {
    return {
      organizationList: [],
      collegeList: [],
      majorList: [],
      classList: [],
      organizationId: "",
      collegeId: "",
      majorId: "",
      classId: "",
      tableData: [],
      studentInfo: {
        entry_date: "",
      },

      pageSize: 5,
      currentPage: 1,
      dialogVisible: false,
    };
  },

  methods: {
    getOrganizationList() {
      getOrganizationList().then((response) => {
        this.organizationList = response.data;
      });
    },
    getCollegeList(id) {
      var data = { id: id };
      getCollegeListByOrganization(data).then((response) => {
        this.collegeList = response.data;
      });
      getStudentByOrganization(data).then((response) => {
        this.tableData = response.data;
      });
    },
    getMajorList(id) {
      var data = { id: id };
      getMajorByCollege(data).then((response) => {
        this.majorList = response.data;
      });
      getStudentByCollege(data).then((response) => {
        this.tableData = response.data;
      });
    },
    getClassList(id) {
      var data = { id: id };
      getClassByMajor(data).then((response) => {
        this.classList = response.data;
      });
    },
    getStudentList(id) {
      var data = { id: id };
      getStudentByClass(data).then((response) => {
        this.tableData = response.data;
      });
    },
    openUpdate(id) {
      getStudent(id).then((response) => {
        this.studentInfo = response.data;
      });
      this.dialogVisible = true;
    },

    openCreate() {
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
      this.studentInfo = {};
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
      this.classId = this.studentInfo.class_id;
      if (this.studentInfo.index == null) {
        addStudent(this.studentInfo).then((response) => {
          this.$message({
            message: "添加成功！",
            type: "success",
          });
          this.getStudentList(this.classId);
        });
      } else {
        updateStudent(this.studentInfo).then((response) => {
          console.log(response);
          const { status } = response;
          if (status == 200)
            this.$message({
              message: "修改成功！",
              type: "success",
            });
          this.getStudentList(this.classId);
        });
      }
      this.handleClose();
      this.studentInfo = {};
    },

    deleteStudent(id) {
      deleteStudent(id).then((response) => {
        this.$message({
          message: "删除成功！",
          type: "success",
        });
        if (this.classId) this.getStudentList(this.classId);
        else if (this.collegeId) {
          getStudentByCollege({ id: this.collegeId }).then((response) => {
            this.tableData = response.data;
          });
        } else if (this.organizationId) {
          getStudentByOrganization({ id: this.organizationId }).then(
            (response) => {
              this.tableData = response.data;
            }
          );
        }
      });
    },
  },
  mounted() {
    this.getOrganizationList();
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