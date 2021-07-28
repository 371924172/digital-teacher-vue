<template>
  <div class="tableAll">
    <div class="tableMain">
      <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column prop="name" label="专业名称" width="180">
        </el-table-column>
        <el-table-column prop="short_name" label="专业简称" width="180">
        </el-table-column>
        <el-table-column prop="estab_date" label="开设时间" width="180">
        </el-table-column>
        <el-table-column prop="intro" label="专业介绍" width="180">
        </el-table-column>
        <el-table-column prop="tuition_fee" label="学费" width="180">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="openUpdate(scope.row.id)" circle></el-button>
            <el-button slot="reference" style="margin-left: 10px"
                       @click="deleteMajor(scope.row.id)" icon="el-icon-delete" type="danger" size="mini" circle>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog style="width: 1000px;height: 1000px;" title="专业信息"
               :visible.sync="dialogVisible" before-close="handleClose">
      <el-form :model="majorInfo">
        <el-form-item label="专业名称" width="80px">
          <el-input class="dialog_input" v-model="majorInfo.name" ></el-input>
        </el-form-item>
        <el-form-item label="专业简称" width="80px">
          <el-input class="dialog_input" v-model="majorInfo.short_name" ></el-input>
        </el-form-item>
        <el-form-item label="开设时间" width="80px">
          <el-date-picker
            v-model="majorInfo.estab_date"
            type="date"
            @change="getEstabDate"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="专业介绍" width="80px">
          <el-input class="dialog_input" v-model="majorInfo.intro" ></el-input>
        </el-form-item>
        <el-form-item label="学费" width="80px" >
          <el-input class="dialog_input" v-model="majorInfo.tuition_fee"  style="margin-left: 6%"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addUpdateInfo">提交</el-button>
      </div>
    </el-dialog>

    <div class="addArea">
      <el-button class="add_btn" type="primary" @click="openCreate">创建专业</el-button>
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
  import { getMajorList, addMajor, getMajor,deleteMajor,updateMajor } from "@/api/major";
  export default {
    name:"majorList",
    inject: ["reload"],
    data() {
      return {

        tableData:[],
        majorInfo:{
          estab_date:''
        },
        pageSize: 5,
        currentPage: 1,
        dialogVisible: false,
      }
    },
    methods: {
      getEstabDate (val) {
        console.log(val);
        this.majorInfo.estab_date = val;
      },


      getData() {//获取数据
        getMajorList().then((response) => {
          this.tableData = response.data;
          // console.log(response);
          console.log(this.majorInfo);
        });
      },

      openUpdate(id) {
        getMajor(id).then((response) => {
          this.majorInfo = response.data;
        });
        this.dialogVisible = true;
      },

      openCreate() {
        this.dialogVisible = true;
      },
      handleClose() {
        this.dialogVisible = false;
        this.majorInfo = {};
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
        if (this.majorInfo.id == null) {
          addMajor(this.majorInfo).then((response) => {
            this.$message({
              message: "添加成功！",
              type: "success",
            });
            this.reload();
          });
        }else {
          updateMajor(this.majorInfo).then((response) => {
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
        this.majorInfo = {};
      },

      deleteMajor(id) {
        console.log(id);
        deleteMajor(id);
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
    width:1100px;
    height: 300px;
    /* border: red 1px solid; */
  }
  .addArea{
    height: 40px;
    width: 1100px;
    /* border: red 1px solid; */
  }
  .add_btn{
    float: left;
    margin-right: 5%;
  }
  .dialog_input{
    width:220px;
  }

</style>

