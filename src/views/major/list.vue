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
      <el-col :span="4" :style="{ visibility: visibilitySelectMajor }">
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
      <el-col :span="12">
        <el-button
          style="float: right"
          class="add_btn"
          type="primary"
          @click="openCreate"
          >创建专业</el-button
        >
      </el-col>
    </el-row>

    <div class="tableMain">
      <el-table
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="name" label="专业名称" width="180">
        </el-table-column>
        <el-table-column prop="short_name" label="专业简称" width="180">
        </el-table-column>
        <el-table-column prop="estab_date" label="开设时间" width="180">
        </el-table-column>
        <el-table-column prop="intro" label="专业介绍" width="180">
        </el-table-column>
        <el-table-column prop="tuition_fee" label="学费" width="180">
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
              @click="deleteMajor(scope.row.id)"
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
      title="专业信息"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
    >
      <el-form :model="majorInfo">
        <el-form-item label="所属学校或者组织">
          <el-select
            v-model="organizationId"
            @change="getCollegeList(organizationId)"
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
        <el-form-item label="所属学院">
          <el-select v-model="majorInfo.college_id">
            <el-option
              v-for="item in collegeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业名称" width="80px">
          <el-input class="dialog_input" v-model="majorInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="专业简称" width="80px">
          <el-input
            class="dialog_input"
            v-model="majorInfo.short_name"
          ></el-input>
        </el-form-item>
        <el-form-item label="开设时间" width="80px">
          <el-date-picker
            v-model="majorInfo.estab_date"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="专业介绍" width="80px">
          <el-input class="dialog_input" v-model="majorInfo.intro"></el-input>
        </el-form-item>
        <el-form-item label="学费" width="80px">
          <el-input
            class="dialog_input"
            v-model="majorInfo.tuition_fee"
            style="margin-left: 6%"
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
import { getCollegeListByOrganization } from "@/api/college";
import {
  getMajorList,
  addMajor,
  getMajor,
  deleteMajor,
  updateMajor,
  getMajorByCollege,
} from "@/api/major";

export default {
  name: "majorList",
  inject: ["reload"],
  data() {
    return {
      tableData: [],
      organizationList: [],
      collegeList: [],
      organizationId: "",
      collegeId: "",
      majorInfo: {
        estab_date: "",
      },
      visibilitySelectMajor: "visible",
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
    },
    getMajorList(id) {
      var data = { id: id };
      getMajorByCollege(data).then((response) => {
        this.tableData = response.data;
      });
    },
    getEstabDate(val) {
      console.log(val);
      this.majorInfo.estab_date = val;
    },

    openUpdate(id) {
      getMajor(id).then((response) => {
        this.majorInfo = response.data;
      });
      this.dialogVisible = true;
    },

    openCreate() {
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
      this.majorInfo = {};
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
      this.collegeId = this.majorInfo.college_id;
      if (this.majorInfo.id == null) {
        addMajor(this.majorInfo)
          .then((response) => {
            console.log(this.collegeId);
            this.getMajorList(this.collegeId);
            this.$message({
              message: "添加成功！",
              type: "success",
            });
          })
          .catch((error) => {
            this.$message.error("出错了");
          });
      } else {
        this.majorInfo.college_id = this.majorInfo.college_id.id;

        updateMajor(this.majorInfo)
          .then((response) => {
            this.getMajorList(this.collegeId);
            const { status } = response;
            if (status == 200)
              this.$message({
                message: "修改成功！",
                type: "success",
              });
          })
          .catch((error) => {
            this.$message.error("出错了");
          });
      }
      this.handleClose();
      this.majorInfo = {};
    },

    deleteMajor(id) {
      deleteMajor(id).then((resposne) => {
        this.$message({
          message: "删除成功！",
          type: "success",
        });
        this.getMajorList(this.collegeId);
      });
    },
  },
  mounted() {
    this.getOrganizationList();
  },
};
</script>


<style>
</style>

