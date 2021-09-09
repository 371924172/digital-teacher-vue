<template>
  <div class="dashboard-container">
    <el-row>
      <el-col :span="4">
        <el-select
          v-model="organizationId"
          placeholder="请选择学校或者组织"
          @change="getCollegeList(organizationId)"
        >
          <el-option
            v-for="item in organizationList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option> </el-select
      ></el-col>
      <el-col :span="4">
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
      <el-col :span="4">
        <el-select
          v-model="majorId"
          placeholder="请选择专业"
          @change="getClassList(majorId)"
        >
          <el-option
            v-for="item in majorList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option> </el-select></el-col
      ><el-col :span="4">
        <el-select
          v-model="classId"
          placeholder="请选择班级"
          @change="getData(classId)"
        >
          <el-option
            v-for="item in classList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option> </el-select></el-col
    ></el-row>
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
import { getOrganizationList } from "@/api/organization";
import { getCollegeListByOrganization } from "@/api/college";
import { getMajorByCollege } from "@/api/major";
import { getClassByMajor } from "@/api/class";
import * as echarts from "echarts";
export default {
  username: "Dashboard",
  computed: {
    ...mapGetters(["username"]),
  },
  data() {
    return {
      organizationList: [],
      collegeList: [],
      majorList: [],
      classList: [],
      organizationId: "",
      collegeId: "",
      majorId: "",
      classId: "",
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
      getStudentByOrganization(data).then((response) => {
        this.tableData = response.data;
      });
    },
    getMajorList(id) {
      var data = { id: id };
      getMajorByCollege(data).then((response) => {
        this.majorList = response.data;
      });
      getStudentByCollege(data).then((response) => {
        this.tableData = response.data;
      });
    },
    getClassList(id) {
      var data = { id: id };
      getClassByMajor(data).then((response) => {
        this.classList = response.data;
      });
    },
    getData(classId) {
      var data = { classId: classId };
      recordByClass(data).then((response) => {
        this.classOption.xAxis.data = response.data.user_name;
        this.classOption.series[0].data = response.data.percent;
        var classChart = echarts.init(document.getElementById("classChart"));
        this.classOption && classChart.setOption(this.classOption);
      });
      recordByProblem(data).then((response) => {
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
    this.getOrganizationList();
  },
};
</script>

