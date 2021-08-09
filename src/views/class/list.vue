<template>
  <div class="tableAll">
    <el-row>
      <el-col :span="4">
        <el-select
          v-model="organizationId"
          placeholder="请选择学校或者组织"
          @change="getCollegeList"
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
          </el-option> </el-select
      ></el-col>
      <el-col :span="12">
        <el-button
          style="float: right"
          class="add_btn"
          type="primary"
          @click="openCreate"
          >创建班级</el-button
        >
      </el-col>
    </el-row>
    <div class="tableMain">
      <el-table
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="college_id.name" label="所在学院" width="180">
        </el-table-column>
        <el-table-column prop="major_id.name" label="所属专业" width="180">
        </el-table-column>
        <el-table-column prop="name" label="班级名称" width="180">
        </el-table-column>
        <el-table-column prop="intro" label="班级说明" width="180">
        </el-table-column>
        <el-table-column prop="estab_date" label="成立时间" width="120">
        </el-table-column>
        <el-table-column prop="year_number" label="学习年数" width="100">
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
              @click="deleteClass(scope.row.id)"
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
      title="班级信息"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
    >
      <el-form ref="classInfo" :model="classInfo">
        <!--<el-form-item label="所在学院" width="80px">-->
        <!--<el-input class="dialog_input" v-model="classInfo.college_id" ></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="所属专业" width="80px">-->
        <!--<el-input class="dialog_input" v-model="classInfo.major_id" ></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="所属学校或者组织">
          <el-select
            v-model="organizationIdForm"
            @change="getCollegeList(organizationIdForm)"
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
            v-model="classInfo.college_id"
            @change="getMajorList(classInfo.college_id)"
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

        <el-form-item label="所属专业" width="180px">
          <el-select v-model="classInfo.major_id" placeholder="所属专业">
            <el-option
              v-for="item in majorList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="班级名称" width="80px">
          <el-input class="dialog_input" v-model="classInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="组织说明" width="80px">
          <el-input class="dialog_input" v-model="classInfo.intro"></el-input>
        </el-form-item>
        <el-form-item label="成立时间" width="80px">
          <el-date-picker
            v-model="classInfo.estab_date"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          >
          </el-date-picker>
          <!--<el-input class="dialog_input" v-model="classInfo.estab_date" placeholder="输入格式为yyyy-mm-dd"></el-input>-->
        </el-form-item>
        <el-form-item label="学习年数" width="40px">
          <el-input
            class="dialog_input"
            v-model="classInfo.year_number"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="test"> </el-button>
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
import { getMajorList, getMajorByCollege } from "@/api/major";
import {
  getClassList,
  addClass,
  getClass,
  deleteClass,
  updateClass,
  getClassByMajor,
} from "@/api/class";

export default {
  name: "classList",
  inject: ["reload"],
  data() {
    return {
      tableData: [],
      organizationList: [],
      collegeList: [],
      majorList: [],
      organizationId: "",
      organizationIdForm: "",
      collegeId: "",
      majorId: "",
      classInfo: {
        estab_date: "",
      },
      collegeList: [],
      majorList: [],
      pageSize: 10,
      currentPage: 1,
      dialogVisible: false,
    };
  },
  methods: {
    test() {
      console.log(this.classInfo);
    },
    init() {
      this.collegeId = "";
      this.classInfo.college_id = "";
      this.majorId = "";
      // this.classInfo.major_id = "";
    },

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
    },
    getMajorList(id) {
      var data = { id: id };
      getMajorByCollege(data).then((response) => {
        this.majorList = response.data;
      });
    },
    getClassList(id) {
      var data = { id: id };
      getClassByMajor(data).then((response) => {
        this.tableData = response.data;
      });
    },
    openUpdate(id) {
      getClass(id).then((response) => {
        this.classInfo = response.data;
      });
      this.dialogVisible = true;
    },

    openCreate() {
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;

      this.classInfo = {};
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
      this.majorId = this.classInfo.major_id;
      if (this.classInfo.id == null) {
        addClass(this.classInfo)
          .then((response) => {
            this.$message({
              message: "添加成功！",
              type: "success",
            });
            this.getClassList();
            this.init();
            this.handleClose();
          })
          .catch((error) => {
            this.$message.error("出错了");
          });
      } else {
        console.log(this.classInfo);
        this.classInfo.major_id = this.classInfo.major_id.id;
        this.classInfo.college_id = this.classInfo.college_id.id;
        console.log(this.classInfo);
        updateClass(this.classInfo)
          .then((response) => {
            console.log(response);
            const { status } = response;
            if (status == 200)
              this.$message({
                message: "修改成功！",
                type: "success",
              });
            this.getClassList(this.majorId);
            this.init();
            this.handleClose();
          })
          .catch((error) => {
            this.$message.error("出错了");
          });
      }
    },

    deleteClass(id) {
      deleteClass(id).then((response) => {
        this.$message({
          message: "删除成功！",
          type: "success",
        });
        this.getClassList(this.majorId);
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

