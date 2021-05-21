<template>
  <div>
    <!-- <div class="markdown"> -->

    <div>
      <Markdown v-model="wave"></Markdown>
      <!-- <script type="WaveDrom" > -->
    </div>
  </div>
</template>

<script>
import { getUserlist } from "@/api/userManage";
import Markdown from "@/components/vue-markdown/simple";
import { getList } from "@/api/problem.js";
window.WaveSkin = require("../../assets/default.js");
var WaveDrom = require("wavedrom");
export default {
  name: "markdown",
  components: {
    Markdown,
  },
  data() {
    return {
      problem: {
        id: 5,
        problem_id: "1",
        name: "1205",
        ptag: "1,2",
        difficulty: "1",
      },
      wave:
        '((({"signal": [{ "name": "clk", "wave": "p......" },{ "name": "bus", "wave": "x.34.5x", "data": "head body tail" },{ "name": "wire", "wave": "0.1..0." },],})))',
    };
  },
  methods: {
    // process() {
    //   console.log(this.$children[0].currentValue);
    // },
    test() {
     
    },
  },
  mounted() {
    this.test();
  },
};
</script>