<template>
  <div class="app-container">
    <el-row>
      <el-col :span="16">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"
          style="width: 180px; margin: 10px"
          prefix-icon="el-icon-search"
        ></el-input
      ></el-col>
    </el-row>

    <el-table
      :data="
        SourceData.filter(
          (data) =>
            !search || data.name.toLowerCase().includes(search.toLowerCase())
        )
      "
      stripe
      style="width: 100%"
    >
      <el-table-column prop="numbers" label="序号" width="140">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        prop="id"
        label="来源ID"
        width="180"
        sortable
      ></el-table-column>
      <el-table-column
        prop="type"
        label="来源类型"
        width="200"
        sortable
      ></el-table-column>
      <el-table-column
        prop="source"
        label="来源"
        width="200"
        sortable
      ></el-table-column>
      <el-table-column
        prop="decription"
        label="描述"
        width="380"
      ></el-table-column>
      <el-table-column prop="edit" label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row, scope.$index)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div>
        <el-form ref="form" :model="editinfo" :inline="true" size="mini">
          <el-form-item label="来源类型">
            <el-input v-model="editinfo.type"></el-input>
          </el-form-item>
          <el-form-item label="来源">
            <el-input v-model="editinfo.source"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="editinfo.decription"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click.native="confirm()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getSourceList,
  addSource,
  getSource,
  deleteSource,
  updateSource,
} from "@/api/psource";
export default {
  inject: ["reload"],
  data() {
    return {
      Sourceinfo: {
        //来源类别信息
        id: "",
        type: "",
        source: "",
        decription: "",
      },
      editinfo: {
        //dialog页面暂存信息
        id: "",
        type: "",
        source: "",
        decription: "",
      },
      SourceData: [],
      dialogVisible: false,
      sourceIndex: 0,
      search: "",
      addflag: false, //判断是否为add按钮激活dialog界面
    };
  },
  methods: {
    //新增题目类别
    addlabel() {
      this.dialogVisible = true;
      this.sourceIndex = 0;
      this.addflag = true;
    },
    //编辑按钮
    handleEdit(item, idx) {
      this.sourceIndex = idx;
      this.editinfo = {
        id: item.id,
        type: item.type,
        source: item.source,
        decription: item.decription,
      };
      this.dialogVisible = true;
    },
    //删除题目类别,之后实现后端接口
    handleDelete(idx, r) {
      this.$confirm("确认删除？")
        .then((_) => {
          //this.SourceData.splice(idx,1);
          this.deleteSourceData(r.id);
        })
        .catch((_) => {});
    },
    //点击按钮实现更新
    confirm() {
      if (this.addflag == false) {
        //若为编辑按钮启动该dialog界面
        this.dialogVisible = false;
        //this.SourceData[this.SourceIndex]=this.editinfo;
        this.$set(this.SourceData, this.sourceIndex, this.editinfo);
        this.updateSource(this.editinfo);
      } else {
        //用增加按钮启动该dialog界面
        this.dialogVisible = false;
        //this.SourceData.push(this.editinfo);
        this.addSourceData(this.editinfo);
      }
      this.sourceIndex = 0;
      this.addflag = false;
      this.editinfo = {
        id: "",
        type: "",
        source: "",
        decription: "",
      };
    },
    handleClose(done) {
      this.dialogVisible = false;
      this.addflag = false;
      //console.log(this.editinfo);
    },
    search() {
      this.SourceData;
    },
    getSourceData() {
      //获取数据
      getSourceList().then((response) => {
        this.SourceData = response.data;
        //console.log(this.SourceData)
      });
    },
    addSourceData(data) {
      //增
      addSource(data).then((response) => {
        this.$message({
          message: "添加成功！",
          type: "success",
        });
      });
      this.reload();
    },
    updateSource(data) {
      //更
      updateSource(data).then((response) => {
        const { status } = response;
        if (status == 200)
          this.$message({
            message: "修改成功！",
            type: "success",
          });
      });
      this.reload();
    },
    deleteSourceData(id) {
      console.log(id);
      deleteSource(id);
      this.$message({
        message: "删除成功！",
        type: "success",
      });
      this.reload();
    },
  },

  mounted() {
    this.getSourceData();
  },
};
</script>