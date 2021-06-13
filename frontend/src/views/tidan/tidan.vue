<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="题单名称">
            <el-input v-model="form.name" ref="name" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-button v-on:click="test">检验是否重名</el-button>
        </el-col>
      </el-row>
      <el-form-item label="题单描述">
       <el-input v-model="form.description" ref="name" />
      </el-form-item>
    <el-form-item>
             <el-col :span="12">
          <el-button v-on:click="change">创建题单</el-button>
        </el-col>
    </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Markdown from "@/components/vue-markdown/simple";
import api from '@/api/problem'
window.WaveSkin = require("../../assets/default.js");
export default {
  components: {
    Markdown,
  },
 name: "problemList",
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
        dialog: false,
      searchName: "",
      searchTag: "",
      searchDiff: "",
      pageSize: 5,
      currentPage: 1,
      problemList: [],
      ptagList: [],
      categoryOptions: [
        { Name: "类别1", id: "1" },
        { Name: "类别2", id: "2" },
        { Name: "类别3", id: "3" },
        { Name: "其他", id: "4" },
      ],
      colorList: [
        "#9dc6eb",
        "#f8c471",
        "#b9a3ef",
        "#fdb1ca",
        "#9dc6eb",
        "#f8c471",
        "#b9a3ef",
        "#fdb1ca",
      ],
      difficultyList: [
        { id: 0, label: "简单" },
        { id: 1, label: "适中" },
        { id: 2, label: "困难" },
      ],
      id1: Number,
      TagId: Number,
      form: {
        problem_id: "",
        name: "",
        ptag: "",
        pcateory: "",
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
    change(){
      this.dialog=true;
      },
    popUp() {
      //显示
      this.dialog = true;
    },
    destroy() {
      //关闭
      this.dialog = false;
    },
    getData() {
      this.axios({
        method: "get",
        url: api.problemApi,
      }).then((response) => {
        this.problemList = response.data;
      }),
        this.axios({
          method: "get",
          url:api.ptagApi,
        }).then((response) => {
          this.ptagList = response.data;
        });
    },
    // getDetail() {
    //   this.$router.push({ path: "detail", query: { id: row.id } });
    // },
    formatDifficulty(row) {
      // return this.difficultyList[row.difficulty];
      var difficulty = this.difficultyList.find((d)=>{
        return d.id == row.difficulty;
      })
      return difficulty.label;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    search() {
      this.problemList;
    },
    handleSelectionChange(selected) {},

    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      this.currentPage = val;
    },

    formatTag(id) {
      var tag = this.ptagList.find((t) => {
        return t.id == id;
      });
      return tag.name;
    },
    tagColor(item) {
      return this.colorList[item];
    },
  
    po() {
      var tag1 = "";

      for (let i in this.ptag) {
        tag1 = this.ptag[i] + "," + tag1;
        console.log(this.ptag[i]);
      }
      this.form.ptag = tag1;
      this.axios({
        method: "post",
        url: "http://127.0.0.1:8000/problem/",
        data: this.form,
      }).then((response) => {
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
.el-tag {
  margin-left: 5px;
  border-style: none;
}
.el-input {
  width: 6em;
  margin-right: 1em;
}
</style>


