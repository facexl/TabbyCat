<template>
    <div>
        <Search :searchOPtions="searchOPtions"></Search>
        <el-table
          element-loading-spinner="el-icon-loading"
          :highlight-current-row="true"
          v-loading="loading"
          border
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          :header-cell-style="{background:'#fafafa',border:'none',borderBottom:'1px solid #e8e8e8'}"
        >
          <el-table-column align="center" label="用户头像"></el-table-column>
          <el-table-column label="用户ID"  align="center" prop="id"></el-table-column>
          <el-table-column label="用户昵称" align="center" prop="username"></el-table-column>
          <el-table-column label="用户类型" align="center" prop="typeName"></el-table-column>
          <el-table-column label="用户类型" align="center" prop="typeName"></el-table-column>
          <el-table-column label="用户类型" align="center" prop="typeName"></el-table-column>
          <el-table-column label="用户类型" align="center" prop="typeName"></el-table-column>
          <el-table-column label="用户类型" align="center" prop="typeName"></el-table-column>
          <el-table-column label="用户类型" align="center" prop="typeName"></el-table-column>
          <el-table-column label="用户类型" align="center" prop="typeName"></el-table-column>
          <el-table-column label="用户类型" align="center" prop="typeName"></el-table-column>
        </el-table>
    </div>
</template>
<script>
import Search from '@/components/Search'
export default {
  components: {
    Search
  },
  data () {
    return {
      searchOPtions: [{ type: 'input', key: 'key' }],
      loading: false,
      tableData: [{}, {}]
    }
  }
}
</script>
