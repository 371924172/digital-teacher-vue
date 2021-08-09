<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-form label-width="80px">
          <el-form-item label="名称">{{ pgroupInfo.name }}</el-form-item>
          <el-form-item label="描述">
            <div id="decription"></div>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
        <div id="charts" :style="{ width: '100px', height: '100px' }"></div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="14">
        <el-input
          v-model="PgroupsearchName"
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
        problemListId.filter(
          (data) =>
            !search ||
            data.name.toLowerCase().includes(PgroupsearchName.toLowerCase()) ||
            (data.problem_id
              .toLowerCase()
              .includes(PgroupsearchName.toLowerCase()) &&
              data.ptag.includes(searchTag) &&
              (searchDiff ? data.difficulty == searchDiff : 1))
        )
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
    <!-- <el-pagination
      align="center"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="problemList.length"
    >
    </el-pagination> -->
  </div>
</template>
<script>
import { getList, getPtagList, PtagColor } from "@/api/problem";
import { getPgroupInfo } from "@/api/pgroup";
import { formatTag } from "@/api/format";
import * as echarts from "echarts";
import marked from "../../components/vue-markdown/assets/js/marked/marked";
import {
  addProblemPgroup,
  deleteProblemPgroup,
  getListofId,
  getOutofPgroup,
} from "@/api/problem_pgroup";
export default {
  name: "problemList",
  inject: ["reload"],
  data() {
    return {
      dialog: false,
      pgroupInfo: {},
      pGroupId: { id: "" },
      problemList: [],
      problemListId: [],
      propgroupList: [],
      pglist: [],
      deleteId: [],
      ptagList: [{ id: Number, name: "" }],

      // difficultyList: ["简单", "适中", "困难"],
      difficultyList: [
        { id: 0, label: "简单" },
        { id: 1, label: "适中" },
        { id: 2, label: "困难" },
      ],
      PgroupsearchName: "",
      searchName: "",
      searchTag: "",
      searchDiff: "",
      pageSize: 20,
      currentPage: 1,

      chartsOption: {
        tooltip: {
          trigger: "item",
        },

        series: [
          {
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: false,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [],
          },
        ],
      },
    };
  },
  methods: {
    adds() {
      for (let i in this.propgroupList) {
        var propgroup = {};

        propgroup.pgroup_id = this.pGroupId.id;
        propgroup.problem_id = this.propgroupList[i].id;
        this.pglist = this.pglist.concat(propgroup);
      }
      console.log(this.pglist);
      //console.log(this.pglist);
      addProblemPgroup(this.pglist).then((response) => {
        console.log(response.data);
        this.dialog = false;
        this.reload();
      });
    },
    getData() {
      getPgroupInfo(this.$route.query.id).then((response) => {
        this.pgroupInfo = response.data;
        if (this.pgroupInfo.decription) {
          document.getElementById("decription").innerHTML = marked(
            this.pgroupInfo.decription
          );
        }
      });
      getOutofPgroup(this.pGroupId)
        .then((response) => {
          this.problemList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
      getPtagList().then((response) => {
        this.ptagList = response.data;
      });
    },
    destroy() {
      this.dialog = false;
    },
    getParams() {
      this.pGroupId.id = this.$route.query.id;
    },
    adds1() {
      this.dialog = true;
    },
    deletes() {
      for (let i in this.propgroupList) {
        var deleteofid = {};
        deleteofid.id = this.propgroupList[i].id;
        this.deleteId = this.deleteId.concat(deleteofid);
      }
      deleteProblemPgroup(this.deleteId).then((response) => {
        console.log(response.data);
      });
      this.reload();
    },
    getDataofId() {
      getListofId(this.pGroupId)
        .then((response) => {
          this.problemListId = response.data;
          console.log(this.problemListId);
          this.getChartsOptionData();
          this.renderCharts();
        })
        .catch((error) => {
          console.log(error);
        });
      getPtagList().then((response) => {
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
    handleSelectionChange(selected) {
      this.propgroupList = selected;
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
    getChartsOptionData() {
      let count0 = 0,
        count1 = 0,
        count2 = 0,
        count3 = 0;
      this.problemListId.forEach(function (p) {
        switch (p.difficulty) {
          case 0:
            count0++;
            break;
          case 1:
            count1++;
            break;
          case 2:
            count2++;
            break;
          default:
            count3++;
        }
      });
      let data = [];
      if (count0) data.push({ value: count0, name: "简单" });
      if (count1) data.push({ value: count1, name: "适中" });
      if (count2) data.push({ value: count2, name: "困难" });
      if (count3) data.push({ value: count3, name: "未标记难度" });
      console.log(data);
      this.chartsOption.series[0].data = data;
    },
    renderCharts() {
      var chartDom = document.getElementById("charts");
      var myChart = echarts.init(chartDom);
      this.chartsOption && myChart.setOption(this.chartsOption);
    },
  },
  mounted() {
    this.getParams();
    this.getData();
    this.getDataofId();
  },
  //   watch: {

  //     $route: "getParams",
  //   },
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