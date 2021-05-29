<template>
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
      <el-input type="textarea" v-model="userInfo.present_address"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="updateInfo()">保存</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { getInfo, updateInfo } from "@/api/user";
import store from "@/store";
export default {
  data() {
    return {
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
    getInfo() {
      if (sessionStorage.getItem("userid")) {
        this.id = sessionStorage.getItem("userid");
      } else if (this.$route.params.id) this.id = this.$route.params.id;
      else this.id = store.getters.userid;
      getInfo(this.id).then((response) => {
        this.userInfo = response.data;
        sessionStorage.setItem("userid", this.id);
      });
    },
    updateInfo() {
      updateInfo(this.userInfo);
    },
  },
  created() {
    window.addEventListener("beforeunload", () => {
      sessionStorage.removeItem("userid");
    });
  },
  mounted() {
    this.getInfo();
  },
};
</script>