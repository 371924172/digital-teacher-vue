<template>
  <div>
    <el-form
      :model="dynamicValidateForm"
      ref="dynamicValidateForm"
      label-width="100px"
      class="demo-dynamic"
    >
      <el-form-item
        v-for="(s, index) in dynamicValidateForm.signal"
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
        <el-button type="primary" @click="submitForm('dynamicValidateForm')"
          >提交</el-button
        >
        <el-button @click="addsignal">新增信号</el-button>
        <!-- <el-button @click="resetForm('dynamicValidateForm')">重置</el-button> -->
        <el-button @click="getWave">get</el-button>
      </el-form-item>
    </el-form>
    <div :id="'a' + id"></div>
  </div>
</template>
<script>
window.WaveSkin = require("wavedrom/skins/default.js");
window.WaveSkin = require("../assets/default.js");
var WaveDrom = require("wavedrom");

export default {
  props: {
    id: Number,
    parentText: String,
  },
  data() {
    return {
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
    };
  },
  // watch: {
  //   signals: function () {
  //     console.log(this.dynamicValidateForm.signals);
  //     WaveDrom.renderWaveForm(this.id, JSON.parse(this.dynamicValidateForm.signals), "a");
  //   },
  // },
  methods: {
    submitForm() {
      console.log(this.dynamicValidateForm.signal);
      this.axios({
        method: "post",
        url: "http://127.0.0.1:5000/pre",
        data: {
          signal: this.dynamicValidateForm.signal,
        },
      }).catch((error) => {
        console.log(error);
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.update();
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
    getWave() {
      this.axios.get("http://127.0.0.1:5000/getWave").then((response) => {
        console.log(response.data);
        this.dynamicValidateForm = response.data;
        this.update();
      });
    },
  },
};
</script>

<style>
.el-row {
  margin-bottom: 20px;
  & :last-child : {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>