<template>
  <el-table :data="majorList" border style="width: 100%">
    <el-table-column prop="majorName" label="专业名称" width="200" align="center">
      <template slot-scope="scope">
        <el-input v-model="scope.row.status"></el-input>
      </template>
    </el-table-column>
    <el-table-column prop="majorSName" label="专业简称" width="150" align="center">
      <template slot-scope="scope">
        <el-input v-model="scope.row.status"></el-input>
      </template>
    </el-table-column>
    <el-table-column prop="openTime" label="开设时间" width="150" align="center">
      <template slot-scope="scope">
        <el-input v-model="scope.row.status"></el-input>
      </template>
    </el-table-column>
    <el-table-column prop="majorIntroduction" label="专业介绍" width="535" align="center">
      <template slot-scope="scope">
        <el-input v-model="scope.row.status"></el-input>
      </template>
    </el-table-column>
    <el-table-column prop="tuition" label="学费" width="120" align="center">
      <template slot-scope="scope">
        <el-input v-model="scope.row.status"></el-input>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
    export default {
        name: "list.vue"
    }
</script>

<style scoped>

</style>
