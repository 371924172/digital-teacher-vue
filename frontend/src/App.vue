<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    // 在页面刷新时将vuex里的信息保存到sessionStorage里 // beforeunload事件在页面刷新时先触发
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  },
};
</script>
