<template>
  <div>
    <el-row>
      <el-col :span="14">
        <el-input
          v-model="searchName"
          size="mini"
          placeholder="输入关键字搜索"
          style="width: 180px; margin: 10px"
          prefix-icon="el-icon-search"
        ></el-input
      ></el-col>
    </el-row>

    <el-table
      :data="
        problemList
          .filter(
            (data) =>
              !search ||
              data.name.toLowerCase().includes(searchName.toLowerCase())
          )
          .slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="60"> </el-table-column>
      <el-table-column prop="problem_id" label="题号"> </el-table-column>
      <el-table-column label="名称">
        <template slot-scope="scope">
          <router-link
            :to="{ name: 'problemDetail', query: { id: scope.row.id } }"
          >
            {{ scope.row.name }}
          </router-link>
        </template>
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          {{ formatStatus(scope.row.publish_status) }}
        </template>
      </el-table-column>
      <el-table-column label="是否通过下架审核">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="mini"
            icon="el-icon-success"
            @click="receive(scope.row.id)"
            circle
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-close"
            size="mini"
            @click="reject(scope.row.id)"
            circle
          ></el-button>
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
      :total="problemList.length"
    >
    </el-pagination>
  </div>
</template>
<script>
import {
  getByPublishStatus,
  getPtagList,
  PtagColor,
  statusList,
  publish_status,
} from "@/api/problem";
import { changePassword } from "@/api/user";

export default {
  name: "problemList",
  inject: ["reload"],
  data() {
    return {
      searchName: "",
      searchTag: "",
      searchDiff: "",
      pageSize: 5,
      currentPage: 1,
      problemList: [],
    };
  },
  methods: {
    getData() {
      getByPublishStatus(1)
        .then((response) => {
          this.problemList = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      getPtagList().then((response) => {
        this.ptagList = response.data;
      });
    },

    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    search() {
      this.problemList;
    },
    handleSelectionChange(selected) {},

    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    receive(id) {
      publish_status(id, 8).then((response) => {
        console.log(response.data);
        this.reload();
      });
    },
    reject(id) {
      publish_status(id, 7).then((response) => {
        this.reload();
      });
    },
    formatStatus(id) {
      var status = statusList.find((t) => {
        return t.id == id;
      });
      return status.label;
    },
    tagColor(item) {
      return PtagColor[item];
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
<style>
.el-tag {
  margin-left: 5px;
  border-style: none;
}
.el-input {
  width: 6em;
  margin-right: 1em;
}
</style>