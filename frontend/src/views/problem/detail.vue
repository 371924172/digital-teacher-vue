<template>
</template>
<script>
export default {
  data() {
    return {
      id: '',
    };
  },
  methods: {
    test() {
      console.log(this.$route.query);
    },
  },
  mounted() {
    this.test();
  },
};
</script>
