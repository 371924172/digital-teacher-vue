<template>
  <el-table :data="collegeList" border style="width: 100%">
    <el-table-column prop="collegeName" label="学院名称" width="350" align="center">
      <template slot-scope="scope">
        <el-input v-model="scope.row.status"></el-input>
      </template>
    </el-table-column>
    <el-table-column prop="collegeSName" label="学院简称" width="200" align="center">
      <template slot-scope="scope">
        <el-input v-model="scope.row.status"></el-input>
      </template>
    </el-table-column>
    <el-table-column prop="collegeIntroduction" label="学院介绍" width="500" align="center">
      <template slot-scope="scope">
        <el-input v-model="scope.row.status"></el-input>
      </template>
    </el-table-column>
    <el-table-column prop="dean" label="院长" width="105" align="center">
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
