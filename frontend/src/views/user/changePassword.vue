<template>
  <el-form
    ref="changePasswordForm"
    :model="changePasswordForm"
    :rules="rules"
    label-width="80px"
    hide-required-asterisk="True"
  >
    <el-form-item label="旧密码" prop="oldpassword">
      <el-input v-model="changePasswordForm.oldpassword"></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="newpassword">
      <el-input v-model="changePasswordForm.newpassword"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="repassword">
      <el-input v-model="changePasswordForm.repassword"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit('changePasswordForm')"
        >立即创建</el-button
      >
    </el-form-item>
  </el-form>
</template>
<script>
import { changePassword } from "@/api/user";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else callback();
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.changePasswordForm.newpassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      changePasswordForm: {
        oldpassword: "",
        newpassword: "",
        repassword: "",
      },
      rules: {
        oldpassword: [
          { required: true, message: "请输入旧密码", trigger: "blur" },
        ],
        newpassword: [{ validator: validatePass, trigger: "blur" }],
        repassword: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          changePassword(this.changePasswordForm).then((response) => {
            console.log(response);
          });
        } else {
          console.log("error");
        }
      });
    },
  },
};
</script>