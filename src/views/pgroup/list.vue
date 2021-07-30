<template>
  <div>
    <el-table :data="pgroupList" style="width: 100%" @row-click="detail">
      <el-table-column prop="name" label="名称" width="230px">
      </el-table-column>
      <el-table-column label="标签" width="400px">
        <template slot-scope="scope">
          <el-tag
            v-for="item in scope.row.tag"
            :key="item.index"
            size="mini"
            :color="tagColor(item)"
            effect="dark"
          >
            {{ formatTag(item) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="难度分布">
        <template slot-scope="scope">
          <div
            :id="scope.row.id + 'charts'"
            style="position: fixed; width: 50px; height: 50px; z-index: 1"
          >
            {{ renderCharts(scope.row) }}
          </div>
        </template>
      </el-table-column>
    </el-table>
    <router-link :to="{ name: 'addpgroup' }">
      <el-button>创建题单</el-button>
    </router-link>
  </div>
</template>
<script>
import { getPgroupList } from "@/api/pgroup";
import { getTagList } from "@/api/ptag";
import { formatTag } from "@/api/format";
import { PtagColor } from "@/api/problem";
import * as echarts from "echarts";
export default {
  data() {
    return {
      pgroupList: [],
      ptagList: [],
      chartsOption: {
        tooltip: {
          trigger: "item",
          position: ["10%", "0%"],
          backgroundColor: "rgba(255,255,255,0.3)",
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
            data: [
              { value: 1048, name: "搜索引擎" },
              { value: 735, name: "直接访问" },
              { value: 580, name: "邮件营销" },
            ],
          },
        ],
      },
    };
  },
  methods: {
    getPgroupList() {
      getPgroupList().then((response) => {
        this.pgroupList = response.data;
      });
    },
    getPtagList() {
      getTagList().then((response) => {
        this.ptagList = response.data;
      });
    },
    detail(row, event, column) {
      this.$router.push({
        name: "pgroupdetail",
        query: {
          id: row.id,
        },
      });
    },
    renderCharts(pgroup) {
      this.$nextTick(() => {
        let chartsOption = this.chartsOption;
        if (pgroup.difficulty) chartsOption.series[0].data = pgroup.difficulty;
        var myChart = echarts.init(
          document.getElementById(pgroup.id + "charts")
        );
        myChart.setOption(chartsOption);
      });
    },
    formatTag(id) {
      return formatTag(id, this.ptagList);
    },
    tagColor(item) {
      return PtagColor[item];
    },
  },
  mounted() {
    this.getPgroupList();
    this.getPtagList();
  },
};
</script>