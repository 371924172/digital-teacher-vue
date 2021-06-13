<template>
  <div>
    <el-dialog
      title="用户信息"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="60%"
    >
      <el-form
        ref="userForm"
        :model="userInfo"
        label-width="80px"
        :rules="registerRules"
      >
        <el-form-item label="用户名">
          <el-input v-model="userInfo.username"></el-input>
        </el-form-item>

        <el-form-item label="手机号">
          <el-input v-model="userInfo.mobile_phone"></el-input>
        </el-form-item>
        <el-form-item label="电子邮件">
          <el-input v-model="userInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="userInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="userInfo.nickname"></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="userInfo.id_card_no"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="userInfo.gender" label="性别">
            <el-radio label="男" value="1"></el-radio>
            <el-radio label="女" value="0"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker v-model="userInfo.birth"> </el-date-picker
        ></el-form-item>
        <el-form-item label="简要介绍">
          <el-input type="textarea" v-model="userInfo.intro"></el-input>
        </el-form-item>
        <el-form-item label="居住地址">
          <el-input
            type="textarea"
            v-model="userInfo.present_address"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="addUpdateInfo">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-table
      :data="userList"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="name" label="真实名字"> </el-table-column>
      <el-table-column prop="mobile_phone" label="手机号码"> </el-table-column>
      <el-table-column prop="email" label="电子邮箱"> </el-table-column>
      <el-table-column label="操作">
        <!-- <el-button @click.stop="deleteUser(scope.row.id)">删除</el-button> -->
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="openUpdate(scope.row.id)"
            circle
          ></el-button>
          <el-popover
            ref="popoverDel"
            placement="bottom"
            width="160"
            trigger="click"
          >
            <div>
              <div class="delTip">
                <i class="el-icon-warning" style="color: #e6a23c"></i>提示
              </div>
              <p>此操作将永久删除该用户, 是否继续?</p>
              <div style="text-align: center">
                <el-button
                  type="primary"
                  size="mini"
                  @click="deleteUser(scope.row.id)"
                  >确定</el-button
                >
              </div>
            </div>
            <el-button slot="reference"  style="margin-left: 10px" icon="el-icon-delete" type="danger" size="mini" circle></el-button>
          </el-popover>
          <!-- <el-button
            style="margin-left: 10px"
            v-popover:popoverDel
            type="danger"
            size="mini"
            icon="el-icon-delete"
            circle
          ></el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-button style="margin: 10px" type="primary" @click="openCreate"
      >创建用户</el-button
    >

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
import { deleteUser, getUserList, addUser } from "@/api/userManage";
import { getInfo, updateInfo } from "@/api/user";
export default {
  name: "problemList",
  data() {
    return {
      userList: [],
      pageSize: 5,
      currentPage: 1,
      dialogVisible: false,
      userInfo: {},
      id: Number,
      registerRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { message: "", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { message: "", trigger: "blur" },
        ],
        repassword: [
          { required: true, message: "请确认密码", trigger: "blur" },
          { message: "", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    getData() {
      getUserList().then((response) => {
        this.userList = response.data;
      });
    },
    onSubmit() {},

    openUpdate(id) {
      getInfo(id).then((response) => {
        this.userInfo = response.data;
        // sessionStorage.setItem("userid", this.id);
      });
      this.dialogVisible = true;
    },
    openCreate() {
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
      this.userInfo = {};
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
    addUpdateInfo() {
      if (this.userInfo.status) {
        updateInfo(this.userInfo).then((response) => {
          console.log(response);
        });
      } else {
        this.userInfo.status = "True";
        addUser(this.userInfo).then((response) => {
          console.log(response);
          const { status } = response;
          if (status == 200)
            this.$message({
              message: "添加成功",
              type: "success",
            });
        });
      }
      this.handleClose();
      this.userInfo = {};
      this.getData();
    },
    deleteUser(id) {
      console.log(id);
      deleteUser(id);
      this.getData();
    },
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