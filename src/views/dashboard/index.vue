<template>
  <div class="dashboard-container">
    <el-row
      ><el-col :span="12">
        <div id="problemChart" style="width: 100%; height: 500px"></div>
      </el-col>
      <el-col :span="12">
        <div id="classChart" style="width: 100%; height: 500px"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { recordByClass, recordByProblem } from "@/api/dashboard";
import * as echarts from "echarts";
export default {
  username: "Dashboard",
  computed: {
    ...mapGetters(["username"]),
  },
  data() {
    return {
      record: [
        {
          problem_id: 1,
          user_id: 1,
          status: 1,
        },
      ],
      problemOption: {
        title: {
          text: "题目通过率",
        },
        xAxis: {
          type: "value",
          axisLabel: {
            // 显示百分比
            show: true,
            interval: "auto",
            formatter: "{value} %",
          },
        },
        yAxis: {
          type: "category",
          data: [],
        },
        series: [
          {
            data: [],
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
            itemStyle: {
              color: function (params) {
                var colorList = [
                  "rgb(164,205,238)",
                  "rgb(42,170,227)",
                  "rgb(25,46,94)",
                  "rgb(195,229,235)",
                ];
                return colorList[params.dataIndex];
              },
            },
          },
        ],
      },
      classOption: {
        title: {
          text: "学生通过率",
        },
        xAxis: {
          type: "category",
          data: [],
        },
        yAxis: {
          type: "value",
          axisLabel: {
            // 显示百分比
            show: true,
            interval: "auto",
            formatter: "{value} %",
          },
        },
        series: [
          {
            data: [],
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
            itemStyle: {
              color: function (params) {
                var colorList = [
                  "rgb(164,205,238)",
                  "rgb(42,170,227)",
                  "rgb(25,46,94)",
                  "rgb(195,229,235)",
                ];
                return colorList[params.dataIndex];
              },
            },
          },
        ],
      },
    };
  },
  methods: {
    getData() {
      recordByClass().then((response) => {
        this.classOption.xAxis.data = response.data.user_name;
        this.classOption.series[0].data = response.data.percent;
        var classChart = echarts.init(document.getElementById("classChart"));
        this.classOption && classChart.setOption(this.classOption);
      });
      recordByProblem().then((response) => {
        this.problemOption.yAxis.data = response.data.problem_name;
        this.problemOption.series[0].data = response.data.percent;
        var problemChart = echarts.init(
          document.getElementById("problemChart")
        );
        this.problemOption && problemChart.setOption(this.problemOption);
      });
    },
    // renderCharts(id) {
    //   var myChart = echarts.init(document.getElementById(id));
    //   this.chartsOption && myChart.setOption(this.problemOption);
    // },
  },
  mounted() {
    this.getData();
    console.log(this.$store.getters.roles);
  },
};
</script>

