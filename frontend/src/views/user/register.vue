<template>
  <el-container>
    <el-header height="200px"></el-header>
    <el-container>
      <el-aside width="60%"></el-aside>
      <el-container>
        <el-main height="100px"
          ><el-form
            ref="userForm"
            :model="userForm"
            label-width="80px"
            :rules="registerRules"
            ><span> 用户注册</span>
            <el-form-item prop="username">
              <template slot="label">
                <i class="el-icon-user"></i>
              </template>
              <el-input
                v-model="userForm.username"
                placeholder="用户名"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <template slot="label">
                <i class="el-icon-lock"></i>
              </template>
              <el-input
                v-model="userForm.password"
                placeholder="密码"
                type="password"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="repassword">
              <template slot="label">
                <i class="el-icon-key"></i>
              </template>
              <el-input
                v-model="userForm.repassword"
                placeholder="确认密码"
                type="password"
              ></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <template slot="label">
                <i class="el-icon-mobile-phone"></i>
              </template>
              <el-input
                v-model="userForm.mobile_phone"
                placeholder="手机号"
              ></el-input>
            </el-form-item>
            <el-form-item label="电子邮件">
              <template slot="label">
                <i class="el-icon-message"></i>
              </template>
              <el-input
                v-model="userForm.email"
                placeholder="电子邮箱"
              ></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <template slot="label">
                <i class="el-icon-tickets"></i>
              </template>
              <el-input v-model="userForm.name" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item label="昵称">
              <template slot="label">
                <i class="el-icon-s-custom"></i>
              </template>
              <el-input
                v-model="userForm.nickname"
                placeholder="昵称"
              ></el-input>
            </el-form-item>
            <el-form-item label="身份证号">
              <template slot="label">
                <i class="el-icon-postcard"></i>
              </template>
              <el-input
                v-model="userForm.id_card_no"
                placeholder="身份证号"
              ></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <template slot="label">
                <i class="el-icon-guide"></i>
              </template>
              <el-radio-group v-model="userForm.gender" label="性别">
                <el-radio label="男" value="1"></el-radio>
                <el-radio label="女" value="0"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="出生日期">
              <template slot="label">
                <i class="el-icon-date"></i>
              </template>
              <el-date-picker v-model="userForm.birth" placeholder="出生日期">
              </el-date-picker
            ></el-form-item>
            <el-form-item label="简要介绍">
              <template slot="label">
                <i class="el-icon-collection"></i>
              </template>
              <el-input
                type="textarea"
                v-model="userForm.intro"
                placeholder="简要介绍"
              ></el-input>
            </el-form-item>
            <el-form-item label="居住地址">
              <template slot="label">
                <i class="el-icon-map-location"></i>
              </template>
              <el-input
                type="textarea"
                v-model="userForm.present_address"
                placeholder="居住地址"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="onSubmit('userForm')"
                >注册</el-button
              >
            </el-form-item>
          </el-form></el-main
        >
        <el-footer></el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
import { exist, register } from "@/api/user";
export default {
  data() {
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        exist(this.userForm).then((response) => {
          this.exist = response.data.count;
        });
        if (this.exist) {
          callback(new Error("用户名重复"));
        } else callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else callback();
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.userForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      userForm: {
        is_staff: 1,
      },
      registerRules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        repassword: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          register(this.userForm).then((response) => {
             this.$message({
                message: "注册成功，请等待管理员审核。",
                type: "success",
              });
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style>
.el-input {
  width: 300px;
}
</style>