<template>
  <div class="tableAll">
    <div class="tableMain">
      <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column prop="college_id.name" label="所在学院" width="180">
        </el-table-column>
        <el-table-column prop="major_id.name" label="所属专业" width="180">
        </el-table-column>
        <el-table-column prop="name" label="班级名称" width="180">
        </el-table-column>
        <el-table-column prop="intro" label="班级说明" width="180">
        </el-table-column>
        <el-table-column prop="estab_date" label="成立时间" width="120">
        </el-table-column>
        <el-table-column prop="year_number" label="学习年数" width="100">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="openUpdate(scope.row.id)" circle></el-button>
            <el-button slot="reference" style="margin-left: 10px"
                       @click="deleteClass(scope.row.id)" icon="el-icon-delete" type="danger" size="mini" circle>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>


    <el-dialog style="width: 1000px;height: 1000px;" title="班级信息"
               :visible.sync="dialogVisible" before-close="handleClose">
      <el-form ref="classInfo":model="classInfo">
        <!--<el-form-item label="所在学院" width="80px">-->
          <!--<el-input class="dialog_input" v-model="classInfo.college_id" ></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="所属专业" width="80px">-->
          <!--<el-input class="dialog_input" v-model="classInfo.major_id" ></el-input>-->
        <!--</el-form-item>-->

        <el-form-item label="所在学院" width="180px">
          <el-select v-model="classInfo.college_id" placeholder="所在学院">
            <el-option
              v-for="item in collegeList"
              :key="item.id"
              :label="item.name"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="所属专业" width="180px">
          <el-select v-model="classInfo.major_id" placeholder="所属专业">
            <el-option
              v-for="item in majorList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="班级名称" width="80px">
          <el-input class="dialog_input" v-model="classInfo.name" ></el-input>
        </el-form-item>
        <el-form-item label="组织说明" width="80px">
          <el-input class="dialog_input" v-model="classInfo.intro" ></el-input>
        </el-form-item>
        <el-form-item label="成立时间" width="80px">
          <el-input class="dialog_input" v-model="classInfo.estab_date" placeholder="输入格式为yyyy-mm-dd"></el-input>
        </el-form-item>
        <el-form-item label="学习年数" width="40px">
          <el-input class="dialog_input" v-model="classInfo.year_number" ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addUpdateInfo">提交</el-button>
      </div>
    </el-dialog>


    <div class="addArea">
      <el-button class="add_btn" type="primary" @click="openCreate">创建班级</el-button>
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
  import { getClassList, addClass, getClass,deleteClass,updateClass } from "@/api/class";
  import { getCollegeList, addCollege, getCollege,deleteCollege,updateCollege } from "@/api/college";
  import { getMajorList, addMajor, getMajor,deleteMajor,updateMajor } from "@/api/major";
  export default {
    name:"classList",
    inject: ["reload"],
    data() {
      return {

        tableData:[],
        classInfo:{},

        collegeList: [],
        majorList: [],
        pageSize: 5,
        currentPage: 1,
        dialogVisible: false,
      }
    },
    methods: {
      getData() {//获取数据
        getClassList().then((response) => {
          this.tableData = response.data;
          console.log(response);
        });
      },

      openUpdate(id) {
        getClass(id).then((response) => {
          this.classInfo = response.data;
        });
        this.dialogVisible = true;
      },

      openCreate() {
        this.dialogVisible = true;
        getCollegeList().then((response) => {
          this.collegeList = response.data;
        });
        getMajorList().then((response) => {
          this.majorList = response.data;
        });
      },
      handleClose() {
        this.dialogVisible = false;
        this.classInfo = {};
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
        if (this.classInfo.id == null) {
          addClass(this.classInfo).then((response) => {
            this.$message({
              message: "添加成功！",
              type: "success",
            });
            this.reload();
          });
        }else {
          updateClass(this.classInfo).then((response) => {
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
        this.classInfo = {};
      },

      deleteClass(id) {
        console.log(id);
        deleteClass(id);
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
    width:100%;
    height: 300px;
    /* border: red 1px solid; */
  }
  .addArea{
    height: 40px;
    width: 100%;
    /* border: red 1px solid; */
  }
  .add_btn{
    float: left;
    margin-right: 7%;
  }
  .dialog_input{
    width:220px;
  }

</style>

