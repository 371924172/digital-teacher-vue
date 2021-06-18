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
    >
      <el-table-column prop="problem_id" label="题号" width="100">
      </el-table-column>
      <el-table-column label="名称" width="300">
        <template slot-scope="scope">
          <router-link
            :to="{ name: 'problemDetail', query: { id: scope.row.id } }"
          >
            {{ scope.row.name }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="当前状态">
        <template slot-scope="scope">
          {{ formatStatus(scope.row.publish_status) }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <el-select v-model="status" style="width: 100px">
          <el-option
            v-for="item in statusOptions"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          ></el-option>
        </el-select>
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
import { getMyProblem, statusList } from "@/api/problem";

export default {
  name: "problemList",
  data() {
    return {
      searchName: "",
      pageSize: 5,
      currentPage: 1,
      problemList: [],
      statusOptions: [
        {
          id: 1,
          label: "申请发布",
        },
        {
          id: 5,
          label: "申请下架",
        },
        {
          id: 9,
          label: "申请删除",
        },
      ],
    };
  },
  methods: {
    getData() {
      getMyProblem().then((response) => {
        this.problemList = response.data;
        console.log(response.data);
      });
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    search() {
      this.problemList;
    },
    changeStatus() {},
    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      this.currentPage = val;
    },

    formatStatus(id) {
      if (id) {
        var s = status.find((t) => {
          return t.id == id;
        });
        return s.label;
      } else return "状态错误";
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