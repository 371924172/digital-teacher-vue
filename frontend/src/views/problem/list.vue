<template>
  <div>
    <el-input
      v-model="searchName"
      size="mini"
      placeholder="输入关键字搜索"
      style="width: 180px; margin: 10px"
      prefix-icon="el-icon-search"
    ></el-input>
    <el-table
      :data="
        problemList
          .filter(
            (data) =>
              !search ||
              data.name.toLowerCase().includes(searchName.toLowerCase())
          )
          .slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="60"> </el-table-column>
      <el-table-column prop="problem_id" label="题号" width="100">
      </el-table-column>
      <el-table-column prop="name" label="名称" width="300"> </el-table-column>
      <el-table-column prob="ptag" label="标签">
        <template slot-scope="scope">
          <el-tag
            v-for="item in scope.row.ptag.split(',')"
            :key="item.index"
            size="mini"
            :color="tagColor(item)"
            effect="dark"
          >
            {{ formatTag(item) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="difficulty"
        label="难度"
        :filters="[
          { text: '简单', value: '0' },
          { text: '适中', value: '1' },
          { text: '困难', value: '2' },
        ]"
        :filter-method="filterHandler"
        :formatter="formatDifficulty"
      >
      </el-table-column>
    </el-table>
    <el-pagination
      align="center"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="problemList.length"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: "problemList",
  data() {
    return {
      searchName: "",
      pageSize: 5,
      currentPage: 1,
      problemList: [
        {
          id: '',
          problem_id: '',
          name: '',
          difficulty: '',
          ptag: '',
        },
      ],
      ptagList: [
        {
          id: '',
          name: '',
        },
      ],
      colorList: [
        "#9dc6eb",
        "#f8c471",
        "#b9a3ef",
        "#fdb1ca",
        "#9dc6eb",
        "#f8c471",
        "#b9a3ef",
        "#fdb1ca",
      ],
    };
  },
  methods: {
    getData() {
      this.axios({
        method: "get",
        url: "http://127.0.0.1:8000/problem/",
      }).then((response) => {
        this.problemList = response.data;
      }),
        this.axios({
          method: "get",
          url: "http://127.0.0.1:8000/ptag/",
        }).then((response) => {
          this.ptagList = response.data;
        });
    },
    formatDifficulty(row) {
      switch (row.difficulty) {
        case 0:
          return "简单";
          break;
        case 1:
          return "适中";
          break;
        case 2:
          return "困难";
          break;
      }
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    search() {
      this.problemList;
    },
    handleSelectionChange(selected) {},

    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      this.currentPage = val;
    },

    formatTag(id) {
      var tag = this.ptagList.find((t) => {
        return t.id == id;
      });
      return tag.name;
    },
    tagColor(item) {
      return this.colorList[item];
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
<style>
.el-tag {
  margin-left: 5px;
  border-style: none;
}
</style>