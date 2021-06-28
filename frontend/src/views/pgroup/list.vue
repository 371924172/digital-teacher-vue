<template>
  <div>
    <el-table :data="pgroupList" style="width: 100%" @row-click="detail">
      <el-table-column prop="name" label="名称" width="200px">
      </el-table-column>
      <el-table-column prop="decription" label="描述" width="200px">
      </el-table-column>
    </el-table>
    <router-link :to="{ name: 'addpgroup' }">
      <el-button
        >创建题单</el-button
      >
    </router-link>
  </div>
</template>
<script>
import { getPgroupList } from "@/api/pgroup";
export default {
  data() {
    return {
      pgroupList: [],
    };
  },
  methods: {
    getPgroupList() {
      getPgroupList().then((response) => {
        this.pgroupList = response.data;
        console.log(this.pgroupList);
      });
    },
    detail(row, event, column) {
      this.$router.push({
        name: "pgroupdetail",
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