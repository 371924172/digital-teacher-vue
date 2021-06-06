<template>
  
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="类别管理" name="first">
      <el-form ref="form" :inline="true" :model="query" label-width="40px" size="mini">
    <el-form-item>
        <el-input  placeholder="类别名查询"></el-input>
    </el-form-item>
     <el-form-item>
        <el-button type="primary" @click="onSubmit" icon="el-icon-search">查询</el-button>
        <el-button type="primary" @click="addlabel" icon="el-icon-circle-plus-outline">添加</el-button>
     </el-form-item>
  </el-form>

      <el-table
        :data="labelData"
            stripe
                style="width: 100%">
    <el-table-column prop="numbers" label="序号" width="280">
      <template slot-scope="scope">
        {{scope.$index+1}}
      </template>
    </el-table-column>
    <el-table-column prop="name" label="类别名" width="280" sortable></el-table-column>
    <el-table-column prop="edit" label="操作" width="300" align="center">
         <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.row,scope.$index)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </el-tab-pane>

  <el-tab-pane label="标签管理" name="second">
    <el-form ref="form" :inline="true" :model="query" label-width="40px" size="mini">
    <el-form-item>
        <el-input  placeholder="标签名查询"></el-input>
    </el-form-item>
     <el-form-item>
        <el-button type="primary" @click="onSubmit" icon="el-icon-search">查询</el-button>
        <el-button type="primary" @click="addlabel" icon="el-icon-circle-plus-outline">添加</el-button>
     </el-form-item>
  </el-form>

      <el-table
        :data="categoryData"
            stripe
                style="width: 100%">
    <el-table-column prop="numbers" label="序号" width="280">
      <template slot-scope="scope">
        {{scope.$index+1}}
      </template>
    </el-table-column>
    <el-table-column prop="name" label="标签名" width="280" sortable></el-table-column>
    <el-table-column prop="edit" label="操作" width="300" align="center">
         <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.row,scope.$index)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </el-tab-pane>
</el-tabs>
  <!--修改和新增公用同一个dialog页面-->
  <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <div>
      <el-form ref="form" :model="editinfo" :inline="true" size="mini" >
        <el-form-item :label="dialoglabel">
    <el-input v-model="editinfo.name" ></el-input>
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
import api from '@/api/problem'
  export default {
    data() {
      return {
        labelinfo: {  //题目类别信息
          name: '',
      },
        editinfo: {  
          name: '',
      },
        categoryinfo: {  //标签类别信息
          name: '',
      },
        labelData: [{
          name: '类别一'
        }, {
          name: '类别二'
        }, {
          name: '类别三'
        }, {
          name: '类别四'
        }],
        categoryData: [{
          name: '标签一'
        }, {
          name: '标签二'
        }, {
          name: '标签三'
        }, {
          name: '标签四'
        }],
        dialogVisible:false,
        labelIndex:0,
        categoryIndex:0,
        activeName: 'second',
        dialoglabel:'设置标签名', 
        addflag:false,  //判断是否为add按钮激活dialog界面
      }
    },
    methods:{
      //点击tab标签后
      handleClick(tab, event) {
        if(this.activeName=='first')
          this.dialoglabel='设置类别名';
        else if(this.activeName=='second')
          this.dialoglabel='设置标签名'; 
      },
      //新增题目类别
      addlabel(){
        this.dialogVisible=true;
        this.categoryIndex=0;
        this.labelIndex=0;
        this.addflag=true;
      },
      //编辑按钮
      handleEdit(item,idx){
        if(this.activeName=='first'){
            this.labelIndex=idx;
             this.editinfo={
             name:item.name
        }
     }
        else if(this.activeName=='second'){
            this.categoryIndex=idx;
             this.editinfo={
             name:item.name
       }
    }
        this.dialogVisible=true;
  
      },
      //删除题目类别,之后实现后端接口
      handleDelete(idx,r){
       console.log(this.activeName)
       if(this.activeName=='first'){
       this.$confirm('确认删除？')
         .then(_ => {
            this.labelData.splice(idx,1);
          })
    .catch(_ => {});
       }
       else if(this.activeName=='second'){
         this.$confirm('确认删除？')
         .then(_ => {
            this.categoryData.splice(idx,1);
          })
    .catch(_ => {});
       }  
      },
      //点击按钮实现更新
      confirm(){
        if(this.activeName=='first'){
          //console.log(this.labelIndex);
        if(this.addflag==false){
          //若为编辑按钮启动该dialog界面
          this.dialogVisible=false;
          this.labelData[this.labelIndex].name=this.editinfo.name;
        }
        else{//用增加按钮启动该dialog界面
          this.dialogVisible=false;
          this.labelData.push(this.editinfo);
        }
      }
      else if(this.activeName=='second'){
          console.log(this.categoryIndex);
        if(this.addflag==false){
          //若为编辑按钮启动该dialog界面
          this.dialogVisible=false;
          this.categoryData[this.categoryIndex].name=this.editinfo.name;
        }
        else{//用增加按钮启动该dialog界面
          this.dialogVisible=false;
          this.categoryData.push(this.editinfo);
        }
      }
          this.labelIndex=0;
          this.categoryIndex=0;
          this.addflag=false;
          this.editinfo={name:''};
       },
      handleClose(done) {
        this.dialogVisible = false;
        this.addflag=false;
      }
    },
      
    
  }

</script>
