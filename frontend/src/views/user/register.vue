<template>
  <el-row>
    <el-col :span="8"><div>1</div></el-col>
    <el-col :span="8"
      ><div class="grid-content bg-purple-light">
        <el-form
          ref="userForm"
          :model="form"
          label-width="80px"
          :rules="registerRules"
        >
          <el-form-item prop="username">
            <template slot="label">
              <i class="el-icon-user"></i>
            </template>
            <el-input v-model="form.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <template slot="label">
              <i class="el-icon-lock"></i>
            </template>
            <el-input v-model="form.password" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="repassword">
            <template slot="label">
              <i class="el-icon-key"></i>
            </template>
            <el-input
              v-model="form.repassword"
              placeholder="确认密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <template slot="label">
              <i class="el-icon-mobile-phone"></i>
            </template>
            <el-input
              v-model="form.mobile_phone"
              placeholder="手机号"
            ></el-input>
          </el-form-item>
          <el-form-item label="电子邮件">
            <template slot="label">
              <i class="el-icon-message"></i>
            </template>
            <el-input v-model="form.email" placeholder="电子邮箱"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <template slot="label">
              <i class="el-icon-tickets"></i>
            </template>
            <el-input v-model="form.name" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="昵称">
            <template slot="label">
              <i class="el-icon-s-custom"></i>
            </template>
            <el-input v-model="form.nickname" placeholder="昵称"></el-input>
          </el-form-item>
          <el-form-item label="身份证号">
            <template slot="label">
              <i class="el-icon-postcard"></i>
            </template>
            <el-input
              v-model="form.id_card_no"
              placeholder="身份证号"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <template slot="label">
              <i class="el-icon-guide"></i>
            </template>
            <el-radio-group v-model="form.gender" label="性别">
              <el-radio label="男" value="1"></el-radio>
              <el-radio label="女" value="0"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="出生日期">
            <template slot="label">
              <i class="el-icon-date"></i>
            </template>
            <el-date-picker v-model="form.birth" placeholder="出生日期">
            </el-date-picker
          ></el-form-item>
          <el-form-item label="简要介绍">
            <template slot="label">
              <i class="el-icon-collection"></i>
            </template>
            <el-input type="textarea" v-model="form.intro" placeholder="简要介绍"></el-input>
          </el-form-item>
          <el-form-item label="居住地址">
            <template slot="label">
              <i class="el-icon-map-location"></i>
            </template>
            <el-input type="textarea" v-model="form.present_address" placeholder="居住地址"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit('userForm')"
              >立即创建</el-button
            >
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div></el-col
    >
    <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      form: {},
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
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.form);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>