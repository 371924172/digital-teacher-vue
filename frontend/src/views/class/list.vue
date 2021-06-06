<template>
  <el-table :data="classList" border style="width: 100%">
    <el-table-column prop="college" label="所在学院" width="125" align="center">
      <template slot-scope="scope">
        <el-input v-model="scope.row.status"></el-input>
      </template>
    </el-table-column>
    <el-table-column prop="major" label="所属专业" width="150" align="center">
      <template slot-scope="scope">
        <el-input v-model="scope.row.status"></el-input>
      </template>
    </el-table-column>
    <el-table-column prop="className" label="班级名称" width="130" align="center">
      <template slot-scope="scope">
        <el-input v-model="scope.row.status"></el-input>
      </template>
    </el-table-column>
    <el-table-column prop="classIntroduction" label="班级说明" width="500" align="center">
        <template slot-scope="scope">
          <el-input v-model="scope.row.status"></el-input>
        </template>
    </el-table-column>
    <el-table-column prop="foundationTime" label="成立时间" width="130" align="center">
      <template slot-scope="scope">
        <el-input v-model="scope.row.status"></el-input>
      </template>
    </el-table-column>
    <el-table-column prop="studyYearNumber" label="学习年数" width="120" align="center">
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
