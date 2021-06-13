<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="题号">
            <el-input v-model="form.problem_id" ref="name" />
          </el-form-item> </el-col
      ></el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="题目名称">
            <el-input v-model="form.name" ref="name" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-button v-on:click="test">检验是否重名</el-button>
        </el-col>
      </el-row>
      <el-form-item label="题目描述">
        <markdown
          v-model="form.problem_description"
          :sig="dynamicValidateForm"
          @cha="cha"
        />
      </el-form-item>
      <el-button @click="change">修改</el-button>
      <el-dialog
        :visible.sync="dialog"
        title="详细信息"
        customClass="customWidth"
        @close="destroy"
      >
        <div>
          <el-form
            :model="dynamicValidateForm"
            label-width="100px"
            class="demo-dynamic"
          >
            <el-form-item
              v-for="(s, index) in dynamicValidateForm.signal"
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
              <el-button type="primary" @click="change1">提交</el-button>
              <el-button @click="addsignal">新增信号</el-button>
              <!-- <el-button @click="resetForm('dynamicValidateForm')">重置</el-button> -->
              <el-button @click="getWave">get</el-button>
            </el-form-item>
          </el-form>
          
        </div>
      </el-dialog>
      <el-form-item label="模块定义">
        <markdown v-model="form.module_description" />
      </el-form-item>
      <el-form-item label="输入描述">
        <markdown v-model="form.input_description" />
      </el-form-item>
      <el-form-item label="输出描述">
        <markdown v-model="form.output_description" />
      </el-form-item>
      <el-form-item label="测试描述">
        <markdown v-model="form.test_description" />
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
            v-for="tag in TagOptions"
            :label="tag.id"
            :key="tag.id"
            >{{ tag.Name }}</el-checkbox-button
          >
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="题目类别">
        <el-checkbox-group v-model="pcategory1">
          <el-checkbox-button
            v-for="category in categoryOptions"
            :label="category.id"
            :key="category.id"
            >{{ category.Name }}</el-checkbox-button
          >
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="题目来源">
        <el-checkbox-group v-model="source">
          <el-checkbox-button
            v-for="source in sourceOptions"
            :label="source.id"
            :key="source.id"
            >{{ source.Name }}</el-checkbox-button
          >
        </el-checkbox-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="po">Create</el-button>
        <el-button @click="dayin">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {getProblemList,addProblem,getProblem,deleteProblem,updateProblem}  from "@/api/problem";
import Markdown from "@/components/vue-markdown/simple";
window.WaveSkin = require("../../assets/default.js");
export default {
  components: {
    Markdown,
  },

  data() {
    return {
      ptag: [],
      pcategory1: [],
      source: [],
      TagOptions: [
        { Name: "数字电路", id: "1" },
        { Name: "通信工程", id: "2" },
        { Name: "计算机组成原理", id: "3" },
        { Name: "其他", id: "4" },
      ],

      categoryOptions: [
        { Name: "类别1", id: "1" },
        { Name: "类别2", id: "2" },
        { Name: "类别3", id: "3" },
        { Name: "其他", id: "4" },
      ],

      sourceOptions: [
        { Name: "来源1", id: "1" },
        { Name: "来源2", id: "2" },
        { Name: "来源3", id: "3" },
        { Name: "其他", id: "4" },
      ],

      optionsdiff: [
        { Name: "简单", id: "1" },
        { Name: "普通", id: "2" },
        { Name: "困难", id: "3" },
      ],
      id1: Number,
      TagId: Number,
      form: {
        problem_id: "1",
        name: "1",
        ptag: "",
        source: "",
        pcateory: "1",
        // pcateory: "",
        // region: "",
        // input: "",
        // output: "",
        // describe: "",
        // type: [],
        // definition: "",
        // desc: "",
      },
      taglist: [{
        problem_id: "",
        ptag_id: "",
      }],
      cateorylist: [{
        problem_id: "",
        pcageory_id: "",
      }],
      dynamicValidateForm: {
        signal: [
          {
            name: "",
            wave: "",
            period: "",
            phase: "",
          },
        ],
      },
      dialog: false,
    };
  },

  methods: {
    dayin() {
      // console.log(this.form.ptag);
    },
    po() {
      var tag1 = "";
      var category1 = "";
      var source1 = "";
      for (let i in this.ptag) {
        tag1 = this.ptag[i] + "," + tag1;
      }
      for (let j in this.pcategory1) {
        category1 = this.pcategory1[j] + "," + category1;
       
      }
      for (let k in this.source) {
        source1 = this.source[k] + "," + source1;
       
      }
      
       tag1= tag1.substring(0,tag1.length - 1).toString();
       source1= source1.substring(0,source1.length - 1).toString();
       category1= category1.substring(0,category1.length - 1).toString();
      
      this.form.ptag = tag1;
      this.form.pcateory = category1;
      this.form.source = source1;
      addProblem(this.form).then((response) => {
        console.log(response.data);
        id1 = response.data.id;
      });
    },

    taginsert(id1) {
      for (let i in this.ptag) {
        var proptag = {};
        proptag.ptag_id = this.ptag[i];
        proptag.problem_id = id1;
        this.taglist = this.taglist.concat(proptag);
      }
    },
    
    categoryinsert(id1) {
      for (let i in this.pcategory1) {
        var propcategory = {};
        propcategory.pcateory_id = this.pcategory1[i];
        propcategory.problem_id = id1;
        this.cateroylist = this.cateorylist.concat(propcategory);
      }
    },
    cha() {
      this.dialog = true;
    },
    test() {
      if (this.form.name == "" || this.form.name == null) {
        //eslint-disable-line
        alert("请重新输入");
        return;
      } else {
        alert("可以使用");
        return;
      }
    },

    removesignal(item) {
      var index = this.dynamicValidateForm.signal.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.signal.splice(index, 1);
      }
      this.update();
    },
    addsignal() {
      this.dynamicValidateForm.signal.push({});
      this.update();
    },
    update() {
      WaveDrom.renderWaveForm(this.id, this.dynamicValidateForm, "a");
    },

    popUp() {
      //显示
      this.dialog = true;
    },
    destroy() {
      //关闭
      this.dialog = false;
    },

    change() {
      //this.form.describe="hello";
      var de =
        '123((({"signal": [{ "name": "clk", "wave": "p......" },{ "name": "bus", "wave": "x.34.5x", "data": "head body tail" },{ "name": "wire", "wave": "0.1..0." }]})))666';
      var te = /\(\(\(.+\)\)\)/;
      var den = te.exec(de);
      var a = den[0].length;
      var denn = den[0].substr(3, a - 6);
      console.log(denn);
      this.dynamicValidateForm = JSON.parse(denn);
      this.dialog = true;
    },
    change1() {
      var de =
        '123((({"signal": [{ "name": "clk", "wave": "p......" },{ "name": "bus", "wave": "x.34.5x", "data": "head body tail" },{ "name": "wire", "wave": "0.1..0." }]})))666';
      var te = /\(\(\(.+\)\)\)/;
      var den = te.exec(de);
      var a = den[0].length;
      var denn = den[0].substr(3, a - 6);
      var deq =
        de.substr(0, den[2]) + this.dynamicValidateForm + de.substr(a - 3);
      //console.log(de);
      this.form.problem_description = deq;
      this.dialog = false;
    },

    onSubmit() {
      this.$message("submit!");
    },
    onCancel() {
      this.$message({
        message: "cancel!",
        type: "warning",
      });
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


