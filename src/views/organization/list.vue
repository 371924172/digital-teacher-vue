<template>
  <div class="tableAll">
    <div class="tableMain">
      <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column prop="name" label="组织名称" width="180">
        </el-table-column>
        <el-table-column prop="short_name" label="组织简称" width="180">
        </el-table-column>
        <el-table-column prop="intro" label="组织介绍" width="180">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="openUpdate(scope.row.id)" circle></el-button>
            <!--<el-button size="small" @click="openUpdate(scope.row.id)">编辑</el-button>-->
            <el-button slot="reference" style="margin-left: 10px"
                       @click="deleteOrganization(scope.row.id)" icon="el-icon-delete" type="danger" size="mini" circle>
            </el-button>
            <!--<el-button size="small" type="danger" @click="deleteOrganization(scope.row.id)">删除</el-button>-->
          </template>
        </el-table-column>
      </el-table>
    </div>


    <el-dialog style="width: 1000px;height:1000px;" title="组织信息"
               :visible.sync="dialogVisible" :before-close="handleClose">
      <el-form :model="organizationInfo">
        <el-form-item label="组织名称" width="80px">
          <el-input class="dialog_input" v-model="organizationInfo.name" ></el-input>
        </el-form-item>
        <el-form-item label="组织简称" width="80px">
          <el-input class="dialog_input" v-model="organizationInfo.short_name" ></el-input>
        </el-form-item>
        <el-form-item label="组织介绍" width="80px">
          <el-input class="dialog_input" v-model="organizationInfo.intro" ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <!--<el-button @click="cancel">取 消</el-button>-->
        <el-button type="primary" @click="addUpdateInfo">提交</el-button>
      </div>
    </el-dialog>

    <div class="addArea">
      <el-button class="add_btn" type="primary" @click="openCreate">创建组织</el-button>
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
  import { getOrganizationList, addOrganization, getOrganization,deleteOrganization,updateOrganization }
  from "@/api/organization";
  export default {
    name:"organizationList",
    inject: ["reload"],
    data() {
      return {

        tableData:[],
        organizationInfo:{},
        pageSize: 5,
        currentPage: 1,
        dialogVisible: false,
      }
    },
    methods: {
      getData() {//获取数据
        getOrganizationList().then((response) => {
          this.tableData = response.data;
          console.log(response);
        });
      },

      openUpdate(id) {
        getOrganization(id).then((response) => {
          this.organizationInfo = response.data;
        });
        this.dialogVisible = true;
      },

      openCreate() {
        this.dialogVisible = true;
      },
      handleClose() {
        this.dialogVisible = false;
        this.organizationInfo = {};
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
        if (this.organizationInfo.id == null) {
          addOrganization(this.organizationInfo).then((response) => {
              this.$message({
                message: "添加成功！",
                type: "success",
              });
            this.reload();
          });
        }else {
          updateOrganization(this.organizationInfo).then((response) => {
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
          this.organizationInfo = {};
        },


      deleteOrganization(id) {
        console.log(id);
        deleteOrganization(id);
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

