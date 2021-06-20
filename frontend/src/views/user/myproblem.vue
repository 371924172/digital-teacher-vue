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
      <!-- <el-table-column label="操作">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.publish_status"
            style="width: 100px"
            @blur="publish_status(scope.row.id, scope.row.publish_status)"
          >
            <el-option
              v-for="item in statusOptions"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            ></el-option>
          </el-select>
        </template>
      </el-table-column> -->
      <el-table-column>
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="申请发布"
            placement="top-start"
          >
            <el-button
              type="success"
              size="mini"
              icon="el-icon-top"
              @click="publish_status(scope.row.id, 1)"
              circle
            ></el-button> </el-tooltip
          ><el-tooltip
            class="item"
            effect="dark"
            content="申请下架"
            placement="top-start"
            ><el-button
              type="info"
              size="mini"
              icon="el-icon-bottom"
              @click="publish_status(scope.row.id, 5)"
              circle
            ></el-button
          ></el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="申请删除"
            placement="top-start"
            ><el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="publish_status(scope.row.id, 9)"
              circle
            ></el-button></el-tooltip
          ><el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            placement="top-start"
            ><el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="editProblem(scope.row)"
              circle
            ></el-button
          ></el-tooltip> </template
      ></el-table-column>
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
import { getMyProblem, statusList, publish_status } from "@/api/problem";
import pro from "@/components/vue-markdown/pro";

export default {
  name: "problemList",
  inject: ["reload"],
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
    editProblem(problem) {
      const { publish_status } = problem;
      if (publish_status == 0 || publish_status == 8) {
        this.$router.push({
          name: "addProblem",
          query: {
            problem: JSON.stringify(problem),
          },
        });
      } else {
        this.$message.error("仅可对未发布或者下架状态的题目进行编辑，请申请");
      }
    },
    publish_status(id, status) {
      console.log(status);
      publish_status(id, status).then((response) => {
        console.log(response.data);
        this.reload();
      });
    },
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
      if (id || id == 0) {
        var s = statusList.find((t) => {
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