<template>
  <div class="tableAll">
    <div class="tableMain">
      <el-table :data="tableData" style="width: 100%"  @selection-change="handleSelectionChange">
        <el-table-column prop="name" label="学院名称" width="180">
        </el-table-column>
        <el-table-column prop="short_name" label="学院简称" width="180">
        </el-table-column>
        <el-table-column prop="intro" label="学院介绍" width="180">
        </el-table-column>
        <el-table-column prop="president" label="院长" width="180">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="openUpdate(scope.row.id)" circle></el-button>
            <el-button slot="reference" style="margin-left: 10px"
                       @click="deleteCollege(scope.row.id)" icon="el-icon-delete" type="danger" size="mini" circle>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>


    <el-dialog style="width: 1000px;height: 1000px;" title="学院信息"
               :visible.sync="dialogVisible" before-close="handleClose">
      <el-form :model="collegeInfo">
        <el-form-item label="学院名称" width="80px">
          <el-input class="dialog_input" v-model="collegeInfo.name" ></el-input>
        </el-form-item>
        <el-form-item label="学院简称" width="80px">
          <el-input class="dialog_input" v-model="collegeInfo.short_name" ></el-input>
        </el-form-item>
        <el-form-item label="学院介绍" width="80px">
          <el-input class="dialog_input" v-model="collegeInfo.intro" ></el-input>
        </el-form-item>
        <el-form-item label="院长" width="80px">
          <el-input class="dialog_input" v-model="collegeInfo.president"  style="margin-left: 6%"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addUpdateInfo">提交</el-button>
      </div>
    </el-dialog>

    <div class="addArea">
      <el-button class="add_btn" type="primary" @click="openCreate">创建学院</el-button>
    </div>

    <el-pagination
      align="center"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length"
    >
    </el-pagination>
  </div>
</template>

<script type="text/javascript">
  import { getCollegeList, addCollege, getCollege,deleteCollege,updateCollege }
    from "@/api/college";
  export default {
    name:"collegeList",
    inject: ["reload"],
    data() {
      return {

        tableData:[],
        collegeInfo:{},
        pageSize: 5,
        currentPage: 1,
        dialogVisible: false,
      }
    },
    methods: {
      getData() {//获取数据
        getCollegeList().then((response) => {
          this.tableData = response.data;
          console.log(response);
        });
      },

      openUpdate(id) {
        getCollege(id).then((response) => {
          this.collegeInfo = response.data;
        });
        this.dialogVisible = true;
      },

      openCreate() {
        this.dialogVisible = true;
      },
      handleClose() {
        this.dialogVisible = false;
        this.collegeInfo = {};
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
        if (this.collegeInfo.id == null) {
          addCollege(this.collegeInfo).then((response) => {
            this.$message({
              message: "添加成功！",
              type: "success",
            });
            this.reload();
          });
        }else {
          updateCollege(this.collegeInfo).then((response) => {
            console.log(response);
            const {status} = response;
            if (status == 200)
              this.$message({
                message: "修改成功！",
                type: "success",
              });
            this.reload();
          });
        }
        this.handleClose();
        this.collegeInfo = {};
      },


      deleteCollege(id) {
        console.log(id);
        deleteCollege(id);
        this.$message({
          message: "删除成功！",
          type: "success",
        });
        this.reload();
      },
    },
    mounted() {
      this.getData();
    },

  }
</script>


<style>
  .tableAll{
    width:900px;
    height: 300px;
    /* border: red 1px solid; */
  }
  .addArea{
    height: 40px;
    width: 900px;
    /* border: red 1px solid; */
  }
  .add_btn{
    float: left;
    margin-right: 20px;
  }
  .dialog_input{
    width:220px;
  }

</style>

