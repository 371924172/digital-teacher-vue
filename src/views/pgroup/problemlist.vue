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
    </el-row>

    <el-table
      :data="
        problemList
          .filter(
            (data) =>
              !search ||
              (data.name.toLowerCase().includes(searchName.toLowerCase()) &&
                data.ptag.includes(searchTag) &&
                data.difficulty.toString().includes(searchDiff))
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

    <el-button type="primary" @click="adds">选择题目并创建题单</el-button>
  </div>
</template>
<script>
import { getList, getPtagList, PtagColor } from "@/api/problem";
import { addProblemPgroup } from "@/api/problem_pgroup";
import { formatTag } from "@/api/format";
export default {
  name: "problemList",
  data() {
    return {
      pGroupId: (Number = 1),
      searchName: "",
      searchTag: "",
      searchDiff: "",
      pageSize: 5,
      currentPage: 1,
      problemList: [],
      idlist: [],
      pglist: [],
      ptagList: [{ id: Number, name: "" }],

      // difficultyList: ["简单", "适中", "困难"],
      difficultyList: [
        { id: 0, label: "简单" },
        { id: 1, label: "适中" },
        { id: 2, label: "困难" },
      ],
    };
  },
  methods: {
    getParams() {
      var routeparams = this.$route.params.id;
      this.pGroupId = routeparams;
    },
    adds() {
      for (let i in this.idlist) {
        var idLi = {};
        idLi.pgroup_id = this.pGroupId;
        idLi.problem_id = this.idlist[i].id;
        this.pglist = this.pglist.concat(idLi);
      }
      //console.log(this.pglist);
      addProblemPgroup(this.pglist).then((response) => {
        console.log(response.data);
      });
    },
    getData() {
      getList()
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
    formatDifficulty(row) {
      // return this.difficultyList[row.difficulty];
      var difficulty = this.difficultyList.find((d) => {
        return d.id == row.difficulty;
      });
      return difficulty.label;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    search() {
      this.problemList;
    },
    handleSelectionChange(selected) {
      this.idlist = selected;
      //console.log(selected);
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