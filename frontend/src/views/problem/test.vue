<template>
  <div>
    <!-- <div class="markdown"> -->

    <div>
      <Markdown v-model="wave"></Markdown>
      <!-- <script type="WaveDrom" > -->
    </div>
    <button @click="process">shuaxin</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Markdown from "@/components/vue-markdown/simple";
window.WaveSkin = require("../../assets/default.js");
var WaveDrom = require("wavedrom");
export default {
  name: "markdown",
  components: {
    Markdown,
  },
  data() {
    return {
      wave:
        '((({"signal": [{ "name": "clk", "wave": "p......" },{ "name": "bus", "wave": "x.34.5x", "data": "head body tail" },{ "name": "wire", "wave": "0.1..0." },],})))',
    };
  },
  methods: {
    process() {
      console.log(this.$children[0].currentValue);
    },
  },
  mounted() {},
};
</script>