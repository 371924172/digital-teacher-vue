<template>
  <el-table :data="pgroupList" style="width: 100%" @row-click="detail">
    <el-table-column prop="name" label="名称" width="200px"> </el-table-column>
    <el-table-column prop="decription" label="描述" width="200px">
    </el-table-column>
  </el-table>
</template>
<script>
import { getMyPgroup } from "@/api/pgroup";
export default {
  data() {
    return {
      pgroupList: [],
    };
  },
  methods: {
    getPgroupList() {
      getMyPgroup().then((response) => {
        this.pgroupList = response.data;
        console.log(this.pgroupList);
      });
    },
    detail(row, event, column) {
      this.$router.push({
        name: "myPgroupDetail",
        query: {
          id: row.id,
        },
      });
    },
  },
  mounted() {
    this.getPgroupList();
  },
};
</script>