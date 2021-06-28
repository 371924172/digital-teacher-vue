<template>
  <div>
    <el-table :data="teacherRole" style="width: 50%">
      <el-table-column prop="teacher_id" label="教师号"></el-table-column>
      <el-table-column prop="user.username" label="用户名"></el-table-column>
      <el-table-column prop="user.name" label="真实姓名"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <!-- <el-button type="danger" @click="deleteRole(scope.row.id)"
            >移除</el-button
          >
        </template></el-table-column
      > -->
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
                  @click="deleteRole(scope.row.id)"
                  >确定</el-button
                >
              </div>
            </div>
            <el-button
              slot="reference"
              style="margin-left: 10px"
              icon="el-icon-delete"
              type="danger"
              size="mini"
              circle
            ></el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" @click="dialogVisible = true">新增</el-button>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-select v-model="teacher.user" filterable placeholder="用户名">
        <el-option
          v-for="user in userList"
          :key="user.id"
          :label="user.username"
          :value="user.id"
        >
        </el-option>
      </el-select>
      <el-select v-model="teacher.role_id" filterable placeholder="教师号" style="margin-top:10px">
        <el-option
          v-for="teacher in teacherList"
          :key="teacher.id"
          :label="teacher.id"
          :value="teacher.id"
        >
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="assignRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getUnteacher,
  getTeacher,
  getTeacher111,
  deleteRole,
  assignRole,
} from "@/api/userManage";

export default {
  inject: ["reload"],
  data() {
    return {
      teacherRole: [],
      userList: [],
      teacherList: [],
      dialogVisible: false,
      teacher: {
        user: "",
        role_id: "",
        name: "teacher",
      },
    };
  },
  methods: {
    getTeacherRole() {
      getTeacher().then((response) => {
        this.teacherRole = response.data;
      });
    },
    getTeacher(){
      getTeacher111().then((response)=>{
        this.teacherList =response.data;
      })
    },
    assignRole() {
      assignRole(this.teacher).then((response) => {
        this.dialogVisible = false;
        this.reload();
      });
    },
    deleteRole(id) {
      deleteRole(id).then((response) => {
        this.reload();
      });
    },
    getUnteacher() {
      getUnteacher().then((response) => {
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
    this.getUnteacher();
    this.getTeacher();
    this.getTeacherRole();
  },
};
</script>