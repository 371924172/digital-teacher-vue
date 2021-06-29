<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-row>
        <el-form-item label="题单名称">
          <el-input v-model="pgroup.name" ref="name" />
        </el-form-item>
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
      id: Number,
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
        const { code, message } = response.data;
        if (code == 0) {
          this.$message.error(message);
        } else {
          this.id = response.data.id;
          this.$message({
            type: "success",
            message: "添加题单成功",
          });
          this.$router.push({
            name: "myPgroupDetail",
            query: { id: this.id },
          });
        }
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


