<template>
  <div>
    <el-table :data="roleList" style="width: 50%">
      <el-table-column prop="user" label="管理员"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button type="danger" @click="deleteAdmin(scope.row.id)"
            >移除</el-button
          >
        </template></el-table-column
      >
    </el-table>
    <el-button type="primary" @click="onSubmit">确认</el-button>
    <el-button type="primary" @click="dialogVisible = true">新增</el-button>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-select v-model="admin.id" filterable placeholder="请选择用户">
        <el-option
          v-for="user in userList"
          :key="user.id"
          :label="user.username"
          :value="user.id"
        >
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="assignRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getUserList,
  getRole,
  deleteAdmin,
  assignRole,
} from "@/api/userManage";

export default {
  data() {
    return {
      userList: [],
      roleList: [],
      dialogVisible: false,
      admin: {
        id: "",
      },
    };
  },
  methods: {
    getRole() {
      getRole().then((response) => {
        this.roleList = response.data;
        console.log(this.roleList);
      });
    },
    assignRole() {
      assignRole(this.admin).then((response) => {
        this.dialogVisible = false;
        this.$forceUpdate();
      });
    },
    onSubmit() {
      checkUser(this.userList).then((response) => {
        console.log(response);
      });
    },
    deleteAdmin(id) {
      deleteAdmin(id).then((response) => {
        this.$forceUpdate();
      });
    },
    getUserList() {
      getUserList().then((response) => {
        this.userList = response.data;
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
  mounted() {
    this.getUserList();
    this.getRole();
  },
};
</script>