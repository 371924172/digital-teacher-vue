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
        <el-form-item label="设备ID">
    <el-input v-model="editinfo.id" readonly: true></el-input>
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
        <el-form-item label="出厂日期">
          <el-date-picker
            v-model="editinfo.mfr_time"
            type="date"
            format="yyyy-MM-dd hh:mm:ss"
            value-format="yyyy-MM-dd hh:mm:ss"
            placeholder="选择日期">
          </el-date-picker>
    <!--    <el-input v-model="editinfo.mfr_time" ></el-input>    -->
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
import {getDeviceList,addDevice,getDevice,deleteDevice,updateDevice} from "@/api/device";
  export default {
    inject: ["reload"],
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
        deviceData:[],
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
            //this.deviceData.splice(idx,1);
              this.deleteDeviceData(r.id);
          })
    .catch(_ => {});
      },
      //点击按钮实现更新
      confirm(){
        if(this.addflag==false){
          //若为编辑按钮启动该dialog界面
          this.dialogVisible=false;
          //this.deviceData[this.deviceIndex]=this.editinfo;
          this.$set(this.deviceData, this.deviceIndex, this.editinfo);
          this.updateDevice(this.editinfo);
        }
        else{//用增加按钮启动该dialog界面
          this.dialogVisible=false;
          //this.deviceData.push(this.editinfo);
          this.addDeviceData(this.editinfo)
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
      },     
      getDeviceData(){//获取数据
        getDeviceList().then((response) => {
          this.deviceData = response.data;
          //console.log(this.deviceData)
        });
      },
      addDeviceData(data){//增
        addDevice(data).then((response) => {
            this.$message({
              message: "添加成功！",
              type: "success",
            });
          });
          this.reload();
      },
       updateDevice(data){//更
         updateDevice(data).then((response)=>{
            const {status} = response;
            if (status == 200)
              this.$message({
                message: "修改成功！",
                type: "success",
              });

         });
         this.reload();
      },
       deleteDeviceData(id) {
        console.log(id);
            deleteDevice(id);
        this.$message({
          message: "删除成功！",
          type: "success",
        });
        this.reload();
      },

    },

mounted() {

      this.getDeviceData();
},


  }
</script>
