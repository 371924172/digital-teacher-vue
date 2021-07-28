<template>
  <div class="tableAll">
    <div class="tableMain">
      <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column prop="college_id.name" label="所在学院" width="180">
        </el-table-column>
        <el-table-column prop="name" label="职位名称" width="180">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="openUpdate(scope.row.id)" circle></el-button>
            <el-button slot="reference" style="margin-left: 10px"
                       @click="deleteTeacher(scope.row.id)" icon="el-icon-delete" type="danger" size="mini" circle>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog style="width: 1000px;height: 1000px;" title="教师信息"
               :visible.sync="dialogVisible" before-close="handleClose">
      <el-form :model="teacherInfo">
        
    <el-form-item label="所在学院" width="180px">
          <el-select v-model="teacherInfo.college_id" placeholder="所在学院">
            <el-option
              v-for="item in collegeList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="职位名称" width="80px">
          <el-input class="dialog_input" v-model="teacherInfo.name" ></el-input>
        </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addUpdateInfo">提交</el-button>
      </div>
    </el-dialog>

    <div class="addArea">
      <el-button class="add_btn" type="primary" @click="openCreate">创建教师</el-button>
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
import { getCollegeList, addCollege, getCollege, deleteCollege, updateCollege } from "@/api/college";
import { getTeacherList, addTeacher, getTeacher, deleteTeacher, updateTeacher } from "@/api/teacher";

export default {
    name:"studentList",
    inject: ["reload"],
    data() {
      return {
        tableData:[],
        teacherInfo:{},
        collegeList: [],
        pageSize: 5,
        currentPage: 1,
        dialogVisible: false,
      }
    },

    methods: {
      getData() {//获取数据
        getTeacherList().then((response) => {
          this.tableData = response.data;
          console.log(response);
        });
      },

      openUpdate(id) {
        getTeacher(id).then((response) => {
          this.teacherInfo = response.data;
        });
        this.dialogVisible = true;
      },

      openCreate() {
        this.dialogVisible = true;
        getCollegeList().then((response) => {
          this.collegeList = response.data;
        });
      },
      handleClose() {
        this.dialogVisible = false;
        this.organizationInfo = {};
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
        if (this.teacherInfo.id == null) {
          addTeacher(this.teacherInfo).then((response) => {
              this.$message({
                message: "添加成功！",
                type: "success",
              });
            this.reload();
          });
        }else {
          updateTeacher(this.teacherInfo).then((response) => {
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
          this.organizationInfo = {};
        },


      deleteTeacher(id) {
        console.log(id);
        deleteTeacher(id);
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
    float: left;
    margin-right: 20px;
  }
  .dialog_input{
    width:220px;
  }

</style>