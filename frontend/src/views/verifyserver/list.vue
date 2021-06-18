<template>
  
  <div class="app-container">
      <el-form ref="form" :inline="true" :model="query" label-width="40px" size="mini">
    <el-form-item>
        <el-input  placeholder="输入关键字查询"></el-input>
    </el-form-item>
     <el-form-item>
        <el-button type="primary" @click="onSubmit" icon="el-icon-search">查询</el-button>
        <el-button type="primary" @click="addlabel" icon="el-icon-circle-plus-outline">添加</el-button>
     </el-form-item>
  </el-form>

      <el-table
        :data="serverData"
            stripe
                style="width: 100%">
    <el-table-column prop="numbers" label="序号" width="200">
      <template slot-scope="scope">
        {{scope.$index+1}}
      </template>
    </el-table-column>
    <el-table-column prop="id" label="设备ID" width="200" sortable></el-table-column>
    <el-table-column prop="ip" label="IP地址" width="200"></el-table-column>
    <el-table-column prop="port" label="端口号" width="200"></el-table-column>
    <el-table-column prop="version" label="版本号" width="200" ></el-table-column>
    <el-table-column prop="edit" label="操作" width="280" align="center">
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
  <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <div>
      <el-form ref="form" :model="editinfo" :inline="true" size="mini" >
        <el-form-item label="验证服务器id">
    <el-input v-model="editinfo.id" ></el-input>
        </el-form-item>
        <el-form-item label="设备ip">
    <el-input v-model="editinfo.ip" ></el-input>
        </el-form-item>
        <el-form-item label="端口号">
    <el-input v-model="editinfo.port" ></el-input>
        </el-form-item>
        <el-form-item label="版本号">
    <el-input v-model="editinfo.version" ></el-input>
        </el-form-item>
      </el-form>
    </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button port="primary" @click.native="confirm()">确 定</el-button>
  </span>
</el-dialog>
  </div>
  
</template>

<script>
import api from '@/api/problem'
  export default {
    data() {
      return {
        deviceinfo: {  //设备类别信息
          id:'',
          ip: '',
          port:'',
          version:''
      },
        editinfo: {  //dialog页面暂存信息
          id:'',
          ip: '',
          port:'',
          version:''
      },
        serverData: [{
          id:'1',
          ip: '2',
          port:'3',
          version:'4'
        }, {
          id:'11',
          ip: '22',
          port:'33',
          version:'44',
        },  {
          id:'111',
          ip: '222',
          port:'333',
          version:'444'
        }],
        dialogVisible:false,
        serverIndex:0,
        addflag:false,  //判断是否为add按钮激活dialog界面
      }
    },
    methods:{
      //新增验证服务器id类别
      addlabel(){
        this.dialogVisible=true;
        this.serverIndex=0;
        this.addflag=true;
      },
      //编辑按钮
      handleEdit(item,idx){
             this.serverIndex=idx;
             this.editinfo={
             id:item.id,
             ip:item.ip,
             port:item.port,
             version:item.version,
        }
        this.dialogVisible=true;
      },
      //删除服务器id类别,之后实现后端接口
      handleDelete(idx,r){
       this.$confirm('确认删除？')
         .then(_ => {
            this.serverData.splice(idx,1);
          })
    .catch(_ => {});
      },
      //点击按钮实现更新
      confirm(){
        if(this.addflag==false){
          //若为编辑按钮启动该dialog界面
          this.dialogVisible=false;
          //this.serverData[this.serverIndex]=this.editinfo;
          this.$set(this.serverData, this.serverIndex, this.editinfo)
        }
        else{//用增加按钮启动该dialog界面
          this.dialogVisible=false;
          this.serverData.push(this.editinfo);
        }
          this.serverIndex=0;
          this.addflag=false;
          this.editinfo={
            id:'',
            ip: '',
            port:'',
            version:''
          }
       },
      handleClose(done) {
        this.dialogVisible = false;
        this.addflag=false;
          //console.log(this.editinfo);
      }
    },

  }
</script>