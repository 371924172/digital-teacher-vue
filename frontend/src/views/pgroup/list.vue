<template>
  <div>
    <el-table :data="pgroupList" style="width: 100%" @row-click="detail">
      <el-table-column prop="name" label="名称" width="200px">
      </el-table-column>
      <el-table-column label="标签" width="200px"> </el-table-column>
      <el-table-column label="难度分布">
        <template slot-scope="scope">
          {{ renderCharts(scope.row.id) }}
          <div
            :id="scope.row.id + 'charts'"
            style="width: 50px; height: 50px; z-index: 1"
          ></div>
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

  import * as echarts from "echarts";
export default {
  data() {
    return {
      pgroupList: [],
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
            data: [
              { value: 1048, name: "搜索引擎" },
              { value: 735, name: "直接访问" },
              { value: 580, name: "邮件营销" },
              { value: 484, name: "联盟广告" },
              { value: 300, name: "视频广告" },
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
        console.log(this.pgroupList);
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
    renderCharts(id) {
      this.$nextTick(() => {
        var myChart = echarts.init(document.getElementById(id + "charts"));
        this.chartsOption && myChart.setOption(this.chartsOption);
      });
    },
  },
  mounted() {
    this.getPgroupList();
  },
};
</script>