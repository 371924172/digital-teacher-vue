<template>
  <div>
    <el-table
      :data="userList"
      style="width: 100%"
      empty-text="所有用户都已审核完毕"
    >
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column label="审核状态">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.status"></el-checkbox>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" @click="onSubmit">确认</el-button>
  </div>
</template>
<script>
import { getUncheckedUser, checkUser } from "@/api/user";

export default {
  data() {
    return {
      userList: [],
    };
  },
  methods: {
    getUncheckedUser() {
      getUncheckedUser().then((response) => {
        this.userList = response.data;
      });
    },
    onSubmit() {
      checkUser(this.userList).then((response) => {});
    },
  },
  mounted() {
    this.getUncheckedUser();
    console.log(this.$router);
  },
};
</script>