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
        <el-input v-model="s.name" @input="update"></el-input>
        <el-input v-model="s.wave" @input="update"></el-input>
        <el-input v-model="s.period" @input="update"></el-input>
        <el-input v-model="s.phase" @input="update"></el-input>
        <el-button @click.prevent="removesignal(s)">删除</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('dynamicValidateForm')"
          >提交</el-button
        >
        <el-button @click="addsignal">新增信号</el-button>
        <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
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
          }
        ]
      }
    };
  },
  // watch: {
  //   signals: function () {
  //     console.log(this.dynamicValidateForm.signals);
  //     WaveDrom.renderWaveForm(this.id, JSON.parse(this.dynamicValidateForm.signals), "a");
  //   },
  // },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    removesignal(item) {
      var index = this.dynamicValidateForm.signal.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.signal.splice(index, 1);
      }
    },
    addsignal() {
      this.dynamicValidateForm.signal.push({
        value: "",
        key: Date.now(),
      });
    },
    update() {
      WaveDrom.renderWaveForm(
        this.id,
        this.dynamicValidateForm,
        "a"
      );
    },
  },
};
</script>