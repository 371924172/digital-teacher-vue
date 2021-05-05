<template>
  <body :onload="WaveDrom.ProcessAll()">
    <div>
      <remote-js
        src="https://cdnjs.cloudflare.com/ajax/libs/wavedrom/2.6.8/skins/default.js"
      ></remote-js>
      <remote-js
        src="https://cdnjs.cloudflare.com/ajax/libs/wavedrom/2.6.8/wavedrom.min.js"
      ></remote-js>
      <textarea v-model="txt"></textarea>
      <p>{{ txt }}</p>
      <p>{{ markdown }}</p>
      <p v-html="markdown"></p>
      <div >
        <script type="WaveDrom">
          { signal : [
            { name: "clk",  wave: "p......" },
            { name: "bus",  wave: "x.34.5x",   data: "head body tail" },
            { name: "wire", wave: "0.1..0." },
          ]}
        </script>
      </div>
    </div>
  </body>
</template>
<script>
import Mk from "markdown-it";

export default {
  components: {
    "remote-js": {
      render(createElement) {
        return createElement("script", {
          attrs: { type: "text/javascript", src: this.src },
        });
      },
      props: {
        src: { type: String, required: true },
      },
    },
  },
  data() {
    return {
      txt: "",
    };
  },
  computed: {
    markdown() {
      var md = new Mk();
      var res = md.render("# 123");
      return res;
    },
  },
};
</script>