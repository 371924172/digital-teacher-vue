<template>
  <div class="tableAll">
    <div class="tableMain">
      <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column prop="id" label="学生学号" width="180">
        </el-table-column>
        <el-table-column prop="organization_id.name" label="所在组织" width="180">
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
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="openUpdate(scope.row.index)" circle></el-button>
            <el-button slot="reference" style="margin-left: 10px"
                       @click="deleteStudent(scope.row.index)" icon="el-icon-delete" type="danger" size="mini" circle>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog style="width: 1000px;height: 1000px;" title="学生信息"
               :visible.sync="dialogVisible" before-close="handleClose">
      <el-form ref="studentInfo" :model="studentInfo">

        <el-form-item label="学生学号" width="80px">
          <el-input class="dialog_input" v-model="studentInfo.id" ></el-input>
        </el-form-item>

        <el-form-item label="所在组织" width="180px">
          <el-select v-model="studentInfo.organization_id" placeholder="所在组织">
            <el-option
              v-for="item in organizationList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item label="所在学院" width="180px">
          <el-select v-model="studentInfo.college_id" placeholder="所在学院">
            <el-option
              v-for="item in collegeList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="所在班级" width="180px">
          <el-select v-model="studentInfo.class_id" placeholder="所在班级">
            <el-option
              v-for="item in classList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="简要介绍" width="80px">
          <el-input class="dialog_input" v-model="studentInfo.intro" ></el-input>
        </el-form-item>

        <el-form-item label="入学日期" width="80px">
          <el-date-picker
            v-model="studentInfo.entry_date"
            type="date"
            @change="getEntryDate"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="学习状态" width="40px">
          <el-input class="dialog_input" v-model="studentInfo.status" ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addUpdateInfo">提交</el-button>
      </div>
    </el-dialog>

    <div class="addArea">
      <el-button class="add_btn" type="primary" @click="openCreate">创建学生</el-button>
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
  import { getStudentList, addStudent, getStudent, deleteStudent, updateStudent } from "@/api/student";
  import { getClassList, addClass, getClass, deleteClass, updateClass } from "@/api/class";
  import { getCollegeList, addCollege, getCollege, deleteCollege, updateCollege } from "@/api/college";
  import { getOrganizationList, addOrganization, getOrganization, deleteOrganization, updateOrganization } from "@/api/organization";

  export default {
    name:"studentList",
    inject: ["reload"],
    data() {
      return {
        tableData:[],
        studentInfo:{
          entry_date:''
        },
        collegeList: [],
        classList: [],
        organizationList: [],
        pageSize: 5,
        currentPage: 1,
        dialogVisible: false,
      }
    },

    methods: {
      getEntryDate (val) {
        console.log(val);
        this.studentInfo.entry_date = val;
      },

      getData() {//获取数据
        getStudentList().then((response) => {
          this.tableData = response.data;
          console.log(response);
        });
      },

      openUpdate(index) {
        getStudent(index).then((response) => {
          this.studentInfo = response.data;
        });
        this.dialogVisible = true;
      },

      openCreate() {
        this.dialogVisible = true;
        getCollegeList().then((response) => {
          this.collegeList = response.data;
        });
        getClassList().then((response) => {
          this.classList = response.data;
        });
        getOrganizationList().then((response) => {
          this.organizationList = response.data;
        });
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
        if (this.studentInfo.index == null) {
          addStudent(this.studentInfo).then((response) => {
            this.$message({
              message: "添加成功！",
              type: "success",
            });
            this.reload();
          });
        }else {
          updateStudent(this.studentInfo).then((response) => {
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
        this.studentInfo = {};
      },

      deleteStudent(index) {
        console.log(index);
        deleteStudent(index);
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