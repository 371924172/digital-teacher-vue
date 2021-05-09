<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
    <el-form-item label="题目名称">
      <el-input v-model="form.problem_id" ref="name"/>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="题目名称">
            <el-input v-model="form.name" ref="name"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-button v-on:click="test">检验是否重名</el-button>
        </el-col>
      </el-row>
          <el-form-item label="题目描述">
            <markdown  v-model="form.problem_description" :sig="dynamicValidateForm" @cha="cha" />
          </el-form-item>
     <el-button @click="change">修改</el-button>
     <el-button @click="popUp">弹窗</el-button>
<el-dialog :visible.sync="dialog" title="详细信息" customClass="customWidth" @close="destroy">
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
        <el-button type="primary" @click="destroy"
          >提交</el-button
        >
        <el-button @click="addsignal">新增信号</el-button>
        <!-- <el-button @click="resetForm('dynamicValidateForm')">重置</el-button> -->
        <el-button @click="getWave">get</el-button>
      </el-form-item>
    </el-form>
    <div :id="'a' + id"></div>
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
          <el-option label="简单" value="1" />
          <el-option label="中等" value="2" />
          <el-option label="难" value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label="题目标签">
        <el-checkbox-group v-model="form.ptag">
          <el-checkbox label="数字电路" name="type" />
          <el-checkbox label="通信原理"  name="type" />
          <el-checkbox label="计算机组成原理"  name="type" />
          <el-checkbox label="其他" name="type" />
        </el-checkbox-group>
      </el-form-item>
<el-row>
        <el-col :span="12">
      <el-form-item label="题目来源">
        <el-input v-model="form.source" type="textarea" />
      </el-form-item>
        </el-col>
</el-row>
      <el-form-item>
        <el-button type="primary" @click="po">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Markdown from "@/components/vue-markdown/simple";
 export default {
  components: {
    Markdown,
  },
  data() {
     return {
      form: {
         problem_id:"1",
         name: "1",
         ptag:"1",
         source: "22",
        // region: "",
        // input: "",
        // output: "",
        // describe: "",
        // type: [],
        // definition: "",
        // desc: "",
      },
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
    po(){
      this.axios({
        method: "post",
        url: "http://127.0.0.1:8000/problem/",
        data:this.form,
      }).then((response)=>{
        console.log(response.data);

      })
    },
    
      cha(){
          this.dialog=true;
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

      change(){
      //this.form.describe="hello";
      var de='123((({"signal": [{ "name": "clk", "wave": "p......" },{ "name": "bus", "wave": "x.34.5x", "data": "head body tail" },{ "name": "wire", "wave": "0.1..0." }]})))666';
      var te=/\(\(\(.+\)\)\)/;
      var den=te.exec(de);
      var a=den[0].length;
      var denn=den[0].substr(3,a-6);
      console.log(denn);
      this.dynamicValidateForm = JSON.parse(denn);
      this.dialog=true;
      de=de.substr(0,den[2])+this.dynamicValidateForm+de.substr(a-3,);
      console.log(de);
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
.customWidth{
        width:90%;
    }
</style>


