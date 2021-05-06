<template>
  <div>
    <p v-html="markdown"></p>
    <!-- <script type="WaveDrom">
      {{data}}
    </script> -->
  </div>
</template>
<script>
import Mk from "markdown-it";
markdownItAttrs = require("markdown-it-attrs");

window.WaveSkin = require("../../assets/default.js");
var WaveDrom = require("wavedrom");

export default {
  name: "wave",
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
    };
  },
  computed: {
    markdown() {
      var md = new Mk();
      md.renderer.rules.strong_open = function () {
        return '<script type="WaveDrom">';
      };
      md.renderer.rules.strong_close = function () {
        return "<script>";
      };
      var res = md.render(this.txt);
      return res;
    },
  },
  methods: {
    getwave() {
      WaveDrom.processAll();
    },
  },
  mounted() {
    this.getwave();
  },
};
</script>
