<template>
  <div>
    <el-table :data="pgroupList" style="width: 100%" @row-click="detail">
      <el-table-column prop="name" label="名称" width="200px">
      </el-table-column>
      <el-table-column
        prop="decription"
        label="描述"
        width="200px"
      ></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="申请删除"
            placement="top-start"
            ><el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click.stop="deletePgroup(scope.row.id)"
              circle
            ></el-button></el-tooltip
          ><el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            placement="top-start"
            ><el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click.stop="editPgroup(scope.row)"
              circle
            ></el-button
          ></el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form label-width="120px">
        <el-row>
          <el-form-item label="题单名称">
            <el-input v-model="pgroup.name" ref="name" style="width: 300px" />
          </el-form-item>
        </el-row>

        <el-form-item label="题单描述">
          <markdown
            v-model="pgroup.decription"
            @getValue="getDecription"
            style="height: 300px"
          />
        </el-form-item>
        <el-form-item>
          <el-col :span="12">
            <el-button v-on:click="updatePgroup">更新题单信息</el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { deletePgroup, getMyPgroup, updatePgroup } from "@/api/pgroup";

import Markdown from "@/components/vue-markdown/simple";
export default {
  components: {
    Markdown,
  },
  data() {
    return {
      pgroupList: [],
      dialogVisible: false,
      pgroup: {},
    };
  },
  methods: {
    getPgroupList() {
      getMyPgroup().then((response) => {
        this.pgroupList = response.data;
        console.log(this.pgroupList);
      });
    },
    detail(row, event, column) {
      this.$router.push({
        name: "myPgroupDetail",
        query: {
          id: row.id,
        },
      });
    },
    deletePgroup(id) {
      deletePgroup(id)
        .then((response) => {
          this.$message({
            message: "删除题单成功",
            type: "success",
          });
          this.getPgroupList();
        })
        .catch((error) => {
          this.$message.error("出错了！");
        });
    },
    editPgroup(pgroup) {
      this.pgroup = pgroup;
      this.dialogVisible = true;
    },
    updatePgroup() {
      updatePgroup(this.pgroup).then((response) => {
        this.$message({
          message: "更新题单成功",
          type: "success",
        });
        this.dialogVisible = false;
        this.pgroup = {};
        this.getPgroupList();
      });
    },
    getDecription(value) {
      this.pgroup.decription = value;
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
    this.getPgroupList();
  },
};
</script>