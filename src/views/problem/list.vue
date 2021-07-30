<template>
  <div>
    <el-row>
      <el-col :span="16">
        <el-input
          v-model="searchName"
          size="mini"
          placeholder="输入关键字搜索"
          style="width: 180px; margin: 10px"
          prefix-icon="el-icon-search"
        ></el-input
      ></el-col>
      <el-col :span="1.5">
        <el-select
          v-model="searchTag"
          placeholder="标签"
          multiple
          size="mini"
          :clearable="true"
          style="margin-top: 10px"
        >
          <el-option
            v-for="item in ptagList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select> </el-col
      ><el-col :span="1.5"
        ><el-select
          v-model="searchDiff"
          placeholder="难度"
          size="mini"
          style="margin-top: 10px"
        >
          <el-option
            v-for="item in difficultyList"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          >
          </el-option> </el-select
      ></el-col>
      <el-col :span="3">
        <el-button
          size="mini"
          type="primary"
          style="margin-top: 10px"
          @click="createProblem"
          >创建题目</el-button
        >
      </el-col>
    </el-row>

    <el-table
      :data="
        problemList
          .filter(
            (data) =>
              !search ||
              (data.name.toLowerCase().includes(searchName.toLowerCase()) &&
                data.ptag.includes(searchTag) &&
                (searchDiff ? data.difficulty == searchDiff : 1))
          )
          .slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="60"> </el-table-column>
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
      <el-table-column prob="ptag" label="标签">
        <template slot-scope="scope">
          <el-tag
            v-for="item in scope.row.ptag.split(',')"
            :key="item.index"
            size="mini"
            :color="tagColor(item)"
            effect="dark"
          >
            {{ formatTag(item) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="difficulty"
        label="难度"
        :filters="[
          { text: '简单', value: '0' },
          { text: '适中', value: '1' },
          { text: '困难', value: '2' },
        ]"
        :filter-method="filterHandler"
        :formatter="formatDifficulty"
      >
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
import { getList, PtagColor, draftCount } from "@/api/problem";
import { getTagList } from "@/api/ptag";
import { formatTag } from "@/api/format";
import store from "@/store";

export default {
  name: "problemList",
  data() {
    return {
      searchName: "",
      searchTag: "",
      searchDiff: "",
      pageSize: 20,
      currentPage: 1,
      problemList: [],
      ptagList: [],

      // difficultyList: ["简单", "适中", "困难"],
      difficultyList: [
        { id: 1, label: "简单" },
        { id: 2, label: "适中" },
        { id: 3, label: "困难" },
      ],
    };
  },
  methods: {
    getData() {
      getList()
        .then((response) => {
          this.problemList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
      getTagList().then((response) => {
        this.ptagList = response.data;
      });
    },
    formatDifficulty(row) {
      if (row.difficulty || row.difficulty == 0) {
        var difficulty = this.difficultyList.find((d) => {
          return d.id == row.difficulty;
        });
        return difficulty.label;
      } else {
        return "未标记难度";
      }

      // return this.difficultyList[row.difficulty];
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    search() {
      this.problemList;
    },
    createProblem() {
      var data = { id: store.getters.userid };
      draftCount(data).then((response) => {
        const { count } = response.data;
        if (count > 5) {
          this.$message.error("您的未发布题目已经超过5条，请处理");
        } else {
          this.$router.push({
            name: "addProblem",
          });
        }
      });
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
    formatTag(id) {
      return formatTag(id, this.ptagList);
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
