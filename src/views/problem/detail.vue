<template>
  <el-form v-model="problemDetail" label-width="80px">
    <el-form-item label="题号">
      {{ problemDetail.problem_id }}
      <div v-if="problemDetail.ptag">
        <el-tag
          v-for="item in this.problemDetail.ptag.split(',')"
          :key="item.index"
          size="mini"
          :color="tagColor(item)"
          effect="dark"
        >
          {{ formatTag(item) }}
        </el-tag>
      </div>
      <div v-else>
        <el-tag size="mini" :color="tagColor(0)" effect="dark">
          尚未分配标签
        </el-tag>
      </div>
    </el-form-item>
    <el-form-item label="题目名称">
      {{ problemDetail.name }}
    </el-form-item>
    <el-form-item label="难度">
      {{ formatDifficulty(this.problemDetail) }}
    </el-form-item>
    <el-form-item label="题目描述">
      <div id="problem_decription"></div>
    </el-form-item>
    <el-form-item label="输入描述">
      <div id="input_decription"></div>
    </el-form-item>
    <el-form-item label="输出描述">
      <div id="output_decription"></div>
    </el-form-item>
    <el-form-item label="测试描述">
      <div id="test_decription"></div>
    </el-form-item>
  </el-form>
</template>
<script>
import { getProblem, PtagColor } from "@/api/problem";
var WaveDrom = require("wavedrom");
window.WaveSkin = require("../../assets/default");
import marked from "../../components/vue-markdown/assets/js/marked/marked";
export default {
  data() {
    return {
      problemDetail: {},
      difficultyList: [
        { id: 1, label: "简单" },
        { id: 2, label: "适中" },
        { id: 3, label: "困难" },
      ],
    };
  },
  methods: {
    getProblem() {
      getProblem(this.$route.query.id).then((response) => {
        this.problemDetail = response.data;
        console.log(this.problemDetail);
        if (this.problemDetail.problem_decription) {
          document.getElementById("problem_decription").innerHTML = marked(
            this.problemDetail.problem_decription
          );
        }
        if (this.problemDetail.input_decription) {
          document.getElementById("input_decription").innerHTML = marked(
            this.problemDetail.input_decription
          );
        }
        if (this.problemDetail.output_decription) {
          document.getElementById("output_decription").innerHTML = marked(
            this.problemDetail.output_decription
          );
        }
        if (this.problemDetail.test_decription) {
          document.getElementById("test_decription").innerHTML = marked(
            this.problemDetail.test_decription
          );
        }
        WaveDrom.processAll();
      });
    },

    formatDifficulty(problem) {
      if (problem.difficulty) {
        // return this.difficultyList[row.difficulty];
        var difficulty = this.difficultyList.find((d) => {
          return d.id == problem.difficulty;
        });
        return difficulty.label;
      } else return "其他";
    },
    formatTag(id) {
      if (id) {
        var tag = this.ptagList.find((t) => {
          return t.id == id;
        });
        return tag.name;
      } else return "尚未分配标签";
    },
    tagColor(item) {
      return PtagColor[item];
    },adds() {
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
   
  },
  mounted() {
    this.getProblem();
  },
};
</script>
