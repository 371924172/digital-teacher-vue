<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-row>
        <el-form-item label="题单名称">
          <el-input v-model="pgroup.name" ref="name" style="width: 300px" />
        </el-form-item>
      </el-row>

      <el-form-item label="题单描述">
        <markdown
          v-model="pgroup.decription"
          @getValue="getDecription"
          style="height: 300px"
        />
      </el-form-item>
      <el-form-item>
        <el-col :span="12">
          <el-button @click="add">创建题单</el-button>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addPgroup } from "@/api/pgroup";
import Markdown from "@/components/vue-markdown/simple";
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
        console.log(this.pgroup);
        if (code == 0) {
          this.$message.error(message);
        } else {
          this.id = response.data.id;
          this.$message({
            type: "success",
            message: "添加题单成功,在我的提单页面进行下面操作",
          });
          this.$router.push({
            name: "myPgroupDetail",
            query: { id: this.id },
          });
        }
      });
    },
    getDecription(value) {
      this.pgroup.decription = value;
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


