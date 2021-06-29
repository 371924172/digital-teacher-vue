<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="题目名称">
            <el-input v-model="form.name" ref="name" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="题目描述">
        <markdown
          v-model="form.problem_decription"
          :wave="waveJson"
          @insertWave="insertWave"
          @editWave="selectWave"
          @getValue="getProblem_decription"
          ref="problem_decription"
        />
      </el-form-item>
      <el-form-item label="模块定义">
        <markdown
          v-model="form.module_decription"
          :wave="waveJson"
          @insertWave="insertWave"
          @editWave="selectWave"
          @getValue="getModule_decription"
        />
      </el-form-item>
      <el-form-item label="输入描述">
        <markdown
          v-model="form.input_decription"
          :wave="waveJson"
          @insertWave="insertWave"
          @editWave="selectWave"
          @getValue="getInput_decription"
        />
      </el-form-item>
      <el-form-item label="输出描述">
        <markdown
          v-model="form.output_decription"
          :wave="waveJson"
          @insertWave="insertWave"
          @editWave="selectWave"
          @getValue="getOutput_decription"
        />
      </el-form-item>
      <el-form-item label="测试描述">
        <markdown
          v-model="form.test_decription"
          :wave="waveJson"
          @insertWave="insertWave"
          @editWave="selectWave"
          @getValue="getTest_decription"
        />
      </el-form-item>
      <el-form-item label="难度选择">
        <el-select v-model="form.difficulty" placeholder="请选择题目难度">
          <el-option
            v-for="item in optionsdiff"
            :key="item.id"
            :label="item.Name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="题目类型">
        <el-checkbox-group v-model="ptag">
          <el-checkbox-button
            v-for="tag in tagOptions"
            :label="tag.id"
            :key="tag.id"
            >{{ tag.name }}</el-checkbox-button
          >
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="题目类别">
        <el-checkbox-group v-model="pcategory">
          <el-checkbox-button
            v-for="category in categoryOptions"
            :label="category.id"
            :key="category.id"
            >{{ category.name }}</el-checkbox-button
          >
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="题目来源">
        <el-checkbox-group v-model="source">
          <el-checkbox-button
            v-for="source in sourceOptions"
            :label="source.id"
            :key="source.id"
            >{{ source.source }}</el-checkbox-button
          >
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="是否公开"
        ><el-switch
          v-model="form.public_status"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-value="1"
          inactive-value="0"
        >
        </el-switch
      ></el-form-item>

      <el-form-item>
        <el-button type="primary" @click="addProblem">Create</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      :visible.sync="dialog"
      title="详细信息"
      customClass="customWidth"
      @close="destroy"
    >
      <div>
        <el-form :model="waveJson" label-width="100px" class="demo-dynamic">
          <el-form-item
            v-for="(s, index) in waveJson.signal"
            style="margin-bottom: 10px"
            :label="'信号' + index"
            :key="s.key"
            :prop="'signal.' + index + '.value'"
          >
            <el-row :gutter="20">
              <el-col :span="4"
                ><div class="grid-content bg-purple">
                  <el-input
                    v-model="s.name"
                    @input="update"
                    placeholder="信号名称"
                  ></el-input></div
              ></el-col>
              <el-col :span="4"
                ><div class="grid-content bg-purple-light">
                  <el-input
                    v-model="s.wave"
                    @input="update"
                    placeholder="波形数据"
                  ></el-input></div
              ></el-col>
              <el-col :span="4"
                ><div class="grid-content bg-purple">
                  <el-input
                    v-model="s.period"
                    @input="update"
                    placeholder="周期"
                  ></el-input></div
              ></el-col>
              <el-col :span="4"
                ><div class="grid-content bg-purple-light">
                  <el-input
                    v-model="s.phase"
                    @input="update"
                    placeholder="相位"
                  ></el-input></div></el-col
              ><el-col :span="1.5"
                ><div class="grid-content bg-purple-light">
                  <el-button @click.prevent="removesignal(s)">删除</el-button>
                </div></el-col
              >
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="finish">提交</el-button>
            <el-button @click="addsignal">新增信号</el-button>
          </el-form-item>
        </el-form>
        <div id="a"></div>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="selectDialog"
      title="选择要修改的图"
      customClass="customWidth"
      @close="destroy"
    >
      <el-select v-model="waveIndex" placeholder="请选择">
        <el-option
          v-for="i in waveString.length"
          :key="i"
          :label="i"
          :value="i"
        >
        </el-option>
      </el-select>
      <el-button @click="editWave" style="float: right; margin-right: 20px"
        >确定</el-button
      >
      <div id="selectWave" style="margin-top: 20px"></div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getProblemList,
  addProblem,
  updateProblem,
  deleteProblem,
} from "@/api/problem";
import { getTagList } from "@/api/ptag";
import { getCategoryList } from "@/api/pcategory";
import { getSourceList } from "@/api/psource";
import Markdown from "@/components/vue-markdown/simple";
import pro from "@/components/vue-markdown/pro.js";
var WaveDrom = require("wavedrom");
window.WaveSkin = require("../../assets/default.js");
export default {
  components: {
    Markdown,
  },

  data() {
    return {
      ptag: [],
      pcategory: [],
      source: [],
      tagOptions: [],

      categoryOptions: [],

      sourceOptions: [],

      optionsdiff: [
        { Name: "简单", id: "1" },
        { Name: "普通", id: "2" },
        { Name: "困难", id: "3" },
      ],
      TagId: Number,
      form: {
        problem_id: "",
        name: "",
        ptag: "",
        source: "",
        pcateory: "1",
        problem_decription:
          '((({"signal": [{ "name": "clk", "wave": "p......" },{ "name": "bus", "wave": "x.34.5x", "data": "head body tail" },{ "name": "wire", "wave": "0.1..0." }]})))\n\n((({"signal": [{ "name": "clk", "wave": "p......" },{ "name": "bus", "wave": "x.34.5x", "data": "head body tail" },{ "name": "wire", "wave": "0.1..0." }]})))',
        public_status: "1",
      },

      taglist: [
        {
          problem_id: "",
          ptag_id: "",
        },
      ],
      cateorylist: [
        {
          problem_id: "",
          pcageory_id: "",
        },
      ],
      waveJson: {
        signal: [
          {
            name: "",
            wave: "",
            period: "",
            phase: "",
          },
        ],
      },
      waveString: [],
      waveIndex: "",
      dialog: false,
      selectDialog: false,
    };
  },

  methods: {
    addProblem() {
      var tag = "";
      var category = "";
      var source = "";
      for (let i in this.ptag) {
        tag = this.ptag[i] + "," + tag;
      }
      for (let j in this.pcategory) {
        category = this.pcategory[j] + "," + category;
      }
      for (let k in this.source) {
        source = this.source[k] + "," + source;
      }

      tag = tag.substring(0, tag.length - 1).toString();
      source = source.substring(0, source.length - 1).toString();
      category = category.substring(0, category.length - 1).toString();

      this.form.ptag = tag;
      this.form.pcateory = category;
      this.form.source = source;
      console.log(this.form);
      if (!this.form.id) {
        addProblem(this.form).then((response) => {
          const { status } = response.data;
          console.log(response);
          if (status == 101) {
            this.$message.error(response.data.message);
          } else {
            this.$message({
              type: "success",
              message: "添加成功,请至我的题目页面进行后续操作",
            });
          }
        });
      } else {
        updateProblem(this.form).then((response) => {
          
          this.$message({
            type: "success",
            message: "修改成功,请至我的题目页面进行后续操作",
          });
        });
      }
      this.$router.push({
        path:'/user/problem/'
      })
    },
    insertWave() {
      this.dialog = true;
    },
    selectWave() {
      var regExp = /\(\(\(.+\)\)\)/g;
      // var result = regExp.match(this.form.problem_decription);
      this.waveString = this.form.problem_decription.match(regExp);
      this.selectDialog = true;
    },
    editWave() {
      this.dialog = true;
    },
    finish() {
      if (this.waveIndex != 0) {
        this.form.problem_decription =
          this.$refs.problem_decription.currentValue.replace(
            this.waveString[this.waveIndex - 1],
            "(((" + JSON.stringify(this.waveJson) + ")))"
          );
        console.log(1);
      } else {
        var waveString =
          "(((" +
          JSON.stringify({
            signal: [
              {
                name: "",
                wave: "",
                period: "",
                phase: "",
              },
            ],
          }) +
          ")))";
        this.form.problem_decription =
          this.$refs.problem_decription.currentValue.replace(
            waveString,
            "(((" + JSON.stringify(this.waveJson) + ")))"
          );
        console.log(2);
      }
      this.selectDialog = false;
      this.dialog = false;
      this.waveIndex = 0;
      this.waveJson = {
        signal: [
          {
            name: "",
            wave: "",
            period: "",
            phase: "",
          },
        ],
      };
      WaveDrom.renderWaveForm("", this.waveJson, "selectWave");
    },
    destroy() {
      //关闭
      this.dialog = false;
    },
    //数据准备
    prepareData() {
      getTagList().then((response) => {
        this.tagOptions = response.data;
      });
      getCategoryList().then((response) => {
        this.categoryOptions = response.data;
      });
      getSourceList().then((response) => {
        this.sourceOptions = response.data;
        console.log(response.data);
      });
    },
    removesignal(item) {
      var index = this.waveJson.signal.indexOf(item);
      if (index !== -1) {
        this.waveJson.signal.splice(index, 1);
      }
      this.update();
    },
    addsignal() {
      this.waveJson.signal.push({});
      this.update();
    },
    update() {
      WaveDrom.renderWaveForm(this.id, this.waveJson, "a");
    },
    getProblem_decription(value) {
      this.form.problem_decription = value;
    },

    getModule_decription(value) {
      this.form.module_decription = value;
    },
    getInput_decription(value) {
      this.form.input_decription = value;
    },
    getOutput_decription(value) {
      this.form.output_decription = value;
    },
    getTest_decription(value) {
      this.form.test_decription = value;
    },
  },
  mounted() {
    //编辑题目，填充数据
    if (this.$route.query.problem) {
      let problem = JSON.parse(this.$route.query.problem);
      this.form = problem;
      this.ptag = problem.ptag ? problem.ptag.split(",") : [];
      this.pcategory = problem.pcategory ? problem.pcategory.split(",") : [];

      this.source = problem.psource ? problem.psource.split(",") : [];
    }
    this.prepareData();
    console.log(1);
  },
  watch: {
    waveIndex() {
      this.waveJson = JSON.parse(
        this.waveString[this.waveIndex - 1].substr(
          3,
          this.waveString[this.waveIndex - 1].length - 6
        )
      );
      WaveDrom.renderWaveForm("", this.waveJson, "selectWave");
    },
  },
};
</script>


<style scoped>
.line {
  text-align: center;
}
.customWidth {
  width: 90%;
}
</style>


