<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="信号名称" width="180">
        <el-input
          placeholder="请输入内容"
          v-model="signal.name"
          @input="submitData"
        ></el-input>
      </el-table-column>
      <el-table-column prop="wave" label="波形数据" width="180">
        <el-input
          placeholder="请输入内容"
          v-model="signal.wave"
          @input="submitData"
        ></el-input>
      </el-table-column>
      <el-table-column prop="period" label="周期" width="180">
        <el-input
          placeholder="请输入内容"
          v-model="signal.period"
          @input="submitData"
        ></el-input>
      </el-table-column>
      <el-table-column prop="phase" label="相位" width="180">
        <el-input
          placeholder="请输入内容"
          v-model="signals[index].phase"
          @input="submitData"
        ></el-input>
      </el-table-column>

      <el-table-column width="180" label="编辑">
        <el-button @click="deleteSingal">删除信号</el-button>
      </el-table-column>
    </el-table>
    <el-button @click="addSignal">添加信号</el-button>
    <el-button @input="submitData">更新</el-button>
    <div v-html="data"></div>
  </div>
</template>
<script>
export default {
  name: "test",
  data() {
    return {
      tableData: [
        {
          name: "cm",
          wave: "10101001",
          period: "",
          phase: "",
        },
      ],
      signals:{signal},
      signal: {
        name: "",
        wave: "",
        period: "",
        phase: "",
      },
      data: "",
    };
  },
  methods: {
    getSvg() {
      this.axios.get(" http://127.0.0.1:5000/").then((response) => {
        this.data = response.data;
      });
    },
    submitData() {
      // console.log(this.signal);
    },
    addSignal() {
      var List = {
        name: "",
        wave: "",
        period: "",
        phase: "",
      };
      this.tableData.push(List);
    },
    deleteSingal(index) {
      this.tableData.splice(index, 1);
    },
  },
  mounted() {
    this.getSvg();
  },
};
</script>