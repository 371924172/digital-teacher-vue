<template>
  <div>
    <!-- <el-row>
      <el-col :span="14">
        <el-input
          v-model="searchName"
          size="mini"
          placeholder="输入关键字搜索"
          style="width: 180px; margin: 10px"
          prefix-icon="el-icon-search"
        ></el-input
      ></el-col>
      <el-col :span="1.5">
        <el-select
          v-model="searchTag"
          placeholder="标签"
          multiple
          size="mini"
          :clearable="true"
          style="margin-top: 10px"
        >
          <el-option
            v-for="item in ptagList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select> </el-col
      ><el-col :span="1.5"
        ><el-select
          v-model="searchDiff"
          placeholder="难度"
          size="mini"
          style="margin-top: 10px"
        >
          <el-option
            v-for="item in difficultyList"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          >
          </el-option> </el-select
      ></el-col>
    </el-row> -->

    <el-table
      :data="userList"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column type="name" label="真实名字">
        <template slot-scope="scope">
          <router-link
            :to="{ name: 'userDetail', params: { id: scope.row.id } }"
          >
            {{ scope.row.username }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column prop="mobile_phone" label="手机号码"> </el-table-column>
      <el-table-column prop="email" label="电子邮箱"> </el-table-column>
      <el-table-column label="是否为管理员">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.is_superuser"></el-checkbox>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      align="center"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="userList.length"
    >
    </el-pagination>
  </div>
</template>
<script>
import { getUserList } from "@/api/user";

export default {
  name: "problemList",
  data() {
    return {
      userList: [],
      pageSize: 5,
      currentPage: 1,
    };
  },
  methods: {
    getData() {
      getUserList().then((response) => {
        this.userList = response.data;
        console.log(this.userList);
      });
    },
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleSelectionChange(selected) {},
  },
  mounted() {
    this.getData();
  },
};
</script>
<style>
.el-tag {
  margin-left: 5px;
  border-style: none;
}
.el-input {
  width: 6em;
  margin-right: 1em;
}
</style>