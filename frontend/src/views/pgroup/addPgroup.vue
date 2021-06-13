<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="题单名称">
            <el-input v-model="pgroup.name" ref="name" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-button v-on:click="test">检验是否重名</el-button>
        </el-col>
      </el-row>
      <el-form-item label="题单描述">
        <el-input v-model="pgroup.decription" ref="name" />
      </el-form-item>
      <el-form-item>
        <el-col :span="12">
          <el-button v-on:click="add">创建题单</el-button>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Markdown from "@/components/vue-markdown/simple";
import { addPgroup } from "@/api/pgroup";
window.WaveSkin = require("../../assets/default.js");
export default {
  components: {
    Markdown,
  },
  data() {
    return {
      id1: Number,
      pgroup: {
        id: "",
        name: "",
        description: "",
      },
    };
  },

  methods: {
    add() {
      addPgroup(this.pgroup).then((response) => {
        this.id1 = response.data.id;
        console.log(response.data);
        console.log(this.id1);
        this.$router.push({
          path: "/problem/pgroupdetail",
          name: "detail",
          params: {
            id: this.id1,
          },
        });
      });
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


