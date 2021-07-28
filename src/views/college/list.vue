<template>
  <div class="tableAll">
    <el-row>
      <el-col :span="12">
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
      <el-rol :span="12">
        <el-button
          style="float: right"
          class="add_btn"
          type="primary"
          @click="openCreate"
          >创建学院</el-button
        >
      </el-rol>
    </el-row>
    <div class="tableMain">
      <el-table
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        empty-text="该学校或组织尚未包含学院"
      >
        <el-table-column prop="name" label="学院名称" width="180">
        </el-table-column>
        <el-table-column prop="short_name" label="学院简称" width="180">
        </el-table-column>

        <el-table-column prop="intro" label="学院介绍" width="180">
        </el-table-column>
        <el-table-column prop="president" label="院长" width="180">
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
              @click="deleteCollege(scope.row.id)"
              icon="el-icon-delete"
              type="danger"
              size="mini"
              circle
            >
            </el-button>
          </template>
        </el-table-column>
      </el-table>
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

    <el-dialog
      style="width: 1000px; height: 1000px"
      title="学院信息"
      :visible.sync="dialogVisible"
      before-close="handleClose"
    >
      <el-form :model="collegeInfo" label-width="180px">
        <el-form-item label="所属学校或组织">
          <el-select
            v-model="collegeInfo.organization_id"
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
        <el-form-item label="学院名称">
          <el-input class="dialog_input" v-model="collegeInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="学院简称">
          <el-input
            class="dialog_input"
            v-model="collegeInfo.short_name"
          ></el-input>
        </el-form-item>
        <el-form-item label="学院介绍">
          <el-input class="dialog_input" v-model="collegeInfo.intro"></el-input>
        </el-form-item>
        <el-form-item label="院长">
          <el-input
            class="dialog_input"
            v-model="collegeInfo.president"
            style="margin-left: 6%"
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addUpdateInfo">提交</el-button>
      </div>
    </el-dialog>

    <div class="addArea"></div>
  </div>
</template>

<script type="text/javascript">
import {
  getCollegeList,
  addCollege,
  getCollege,
  deleteCollege,
  updateCollege,
  getCollegeListByOrganization,
} from "@/api/college";
import { getOrganizationList } from "@/api/organization";
export default {
  name: "collegeList",
  inject: ["reload"],
  data() {
    return {
      tableData: [],
      organizationList: [],
      organizationId: "",
      collegeInfo: {},
      pageSize: 5,
      currentPage: 1,
      dialogVisible: false,
    };
  },
  methods: {
    getData() {
      //获取数据

      getOrganizationList().then((response) => {
        this.organizationList = response.data;
      });
    },
    getCollegeList() {
      var data = { id: this.organizationId };
      getCollegeListByOrganization(data).then((response) => {
        this.tableData = response.data;
      });
      this.display = inline
    },
    openUpdate(id) {
      getCollege(id).then((response) => {
        this.collegeInfo = response.data;
        console.log(res);
      });
      this.dialogVisible = true;
    },

    openCreate() {
      this.collegeInfo.organization_id = this.organizationId;
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
      this.collegeInfo = {};
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
      if (this.collegeInfo.id == null) {
        addCollege(this.collegeInfo).then((response) => {
          this.$message({
            message: "添加成功！",
            type: "success",
          });
          this.getCollegeList();
        });
      } else {
        updateCollege(this.collegeInfo).then((response) => {
          console.log(response);
          const { status } = response;
          if (status == 200)
            this.$message({
              message: "修改成功！",
              type: "success",
            });
          this.reload();
        });
      }
      this.handleClose();
      this.collegeInfo = {};
    },

    deleteCollege(id) {
      console.log(id);
      deleteCollege(id);
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
};
</script>


<style>
.tableAll {
  width: 900px;
  height: 300px;
  /* border: red 1px solid; */
}
.addArea {
  height: 40px;
  width: 900px;
  /* border: red 1px solid; */
}
.add_btn {
  float: left;
  margin-right: 20px;
}
.dialog_input {
  width: 220px;
}
</style>

