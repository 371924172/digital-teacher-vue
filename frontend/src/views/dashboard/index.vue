<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ username }}</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  username: "Dashboard",
  computed: {
    ...mapGetters(["username"]),
  },
  methods: {
    test() {
      // console.log(this.$router.options);
      // console.log("1");
    },
  },
  mounted() {
    this.test();
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
