<template>
  <el-table :data="organizeList" border style="width: 100%">
    <el-table-column prop="organizeName" label="组织名称" width="400" align="center">
      <template slot-scope="scope">
        <el-input v-model="scope.row.status"></el-input>
      </template>
    </el-table-column>
    <el-table-column prop="organizeSName" label="组织简称" width="205" align="center">
      <template slot-scope="scope">
        <el-input v-model="scope.row.status"></el-input>
      </template>
    </el-table-column>
    <el-table-column prop="organizeIntroduction" label="组织介绍" width="550" align="center">
      <template slot-scope="scope">
        <el-input v-model="scope.row.status"></el-input>
      </template>
    </el-table-column>
  </el-table>
</template>


