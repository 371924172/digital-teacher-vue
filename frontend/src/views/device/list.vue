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
        :data="deviceData"
            stripe
                style="width: 100%">
    <el-table-column prop="numbers" label="序号" width="140">
      <template slot-scope="scope">
        {{scope.$index+1}}
      </template>
    </el-table-column>
    <el-table-column prop="id" label="设备ID" width="160" sortable></el-table-column>
    <el-table-column prop="sn" label="设备序列号" width="160" sortable></el-table-column>
    <el-table-column prop="type" label="设备类型" width="160" sortable></el-table-column>
    <el-table-column prop="mmac" label="设备移动MAC" width="200" ></el-table-column>
    <el-table-column prop="mip" label="设备移动ip" width="200" ></el-table-column>
    <el-table-column prop="mfr_time" label="出厂日期" width="140" sortable></el-table-column>
    <el-table-column prop="edit" label="操作" width="180" align="center">
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
        <el-form-item label="设备id">
    <el-input v-model="editinfo.id" ></el-input>
        </el-form-item>
        <el-form-item label="设备序列号">
    <el-input v-model="editinfo.sn" ></el-input>
        </el-form-item>
        <el-form-item label="设备类型">
    <el-input v-model="editinfo.type" ></el-input>
        </el-form-item>
        <el-form-item label="设备移动MAC">
    <el-input v-model="editinfo.mmac" ></el-input>
        </el-form-item>
        <el-form-item label="设备移动ip">
    <el-input v-model="editinfo.mip" ></el-input>
        </el-form-item>
        <el-form-item label="出厂日期" 
          :rules="[
            { required: true, message: '记录时间不能为空', trigger: 'blur'},
            { validator: validateDate, trigger: ['blur', 'change'] }
          ]"
>
      <el-date-picker 
            v-model="editinfo.mfr_time"
            type="datetime"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          ></el-date-picker>
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
        deviceinfo: {  //设备类别信息
          id:'',
          sn: '',
          type:'',
          mmac:'',
          mip:'',
          mfr_time:''
      },
        editinfo: {  //dialog页面暂存信息
          id:'',
          sn: '',
          type:'',
          mmac:'',
          mip:'',
          mfr_time:''
      },
        deviceData: [{
          id:'1',
          sn: '2',
          type:'3',
          mmac:'4',
          mip:'5',
          mfr_time:''
        }, {
          id:'11',
          sn: '22',
          type:'33',
          mmac:'44',
          mip:'55',
          mfr_time:''
        },  {
          id:'111',
          sn: '222',
          type:'333',
          mmac:'444',
          mip:'555',
          mfr_time:''
        }],
        dialogVisible:false,
        deviceIndex:0,
        addflag:false,  //判断是否为add按钮激活dialog界面
      }
    },
    methods:{
      //新增题目类别
      addlabel(){
        this.dialogVisible=true;
        this.deviceIndex=0;
        this.addflag=true;
      },
      //编辑按钮
      handleEdit(item,idx){
             this.deviceIndex=idx;
             this.editinfo={
             id:item.id,
             sn:item.sn,
             type:item.type,
             mmac:item.mmac,
             mip:item.mip,
             mfr_time:item.mfr_time,
        }
        this.dialogVisible=true;
      },
      //删除题目类别,之后实现后端接口
      handleDelete(idx,r){
       this.$confirm('确认删除？')
         .then(_ => {
            this.deviceData.splice(idx,1);
          })
    .catch(_ => {});
      },
      //点击按钮实现更新
      confirm(){
        if(this.addflag==false){
          //若为编辑按钮启动该dialog界面
          this.dialogVisible=false;
          //this.deviceData[this.deviceIndex]=this.editinfo;
          this.$set(this.deviceData, this.deviceIndex, this.editinfo)
        }
        else{//用增加按钮启动该dialog界面
          this.dialogVisible=false;
          this.deviceData.push(this.editinfo);
        }
          this.deviceIndex=0;
          this.addflag=false;
          this.editinfo={
            id:'',
            sn: '',
            type:'',
            mmac:'',
            mip:'',
            mfr_time:'',
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