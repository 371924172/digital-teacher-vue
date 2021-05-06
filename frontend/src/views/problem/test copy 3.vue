<template>
  <!-- <div v-html="test()"></div>
   -->
  <div class="markdown">
    <Markdown />
  </div>
</template>
<script>
// import marked from "../../assets/marked/src/marked";
import Markdown from "@/components/vue-markdown/pro";
window.WaveSkin = require("../../assets/default.js");
var WaveDrom = require("wavedrom");
export default {
  name: "wave",
  components:{Markdown},
  data() {
    return {
      txt: "",
      data: {
        signal: [
          { name: "clk", wave: "p......" },
          { name: "bus", wave: "x.34.5x", data: "head body tail" },
          { name: "wire", wave: "0.1..0." },
        ],
      },
      mark:
        '((({"signal": [{ "name": "clk", "wave": "p......" },{ "name": "bus", "wave": "x.34.5x", "data": "head body tail" },{ "name": "wire", "wave": "0.1..0." },],})))',
      // '# 123\n(((\n{"signal": [{ "name": "clk", "wave": "p......" },{ "name": "bus", "wave": "x.34.5x", "data": "head body tail" },{ "name": "wire", "wave": "0.1..0." },],}))) \n((({"signal": [{ "name": "clk", "wave": "p......" },{ "name": "bus", "wave": "x.34.5x", "data": "head body tail" },{ "name": "wire", "wave": "0.1..0." },],}))) ',
    };
  },
  computed: {},
  methods: {
    test() {
      var rendererMD = new marked.Renderer();
      marked.setOptions({
        renderer: rendererMD,
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
      }); //基本设置
      return marked(this.mark);
    },
  },
  mounted() {
    this.test();
    WaveDrom.processAll();
  },
};
</script>
