<template>
    <div>
        <Search :searchOPtions="searchOPtions"></Search>
        <div class="app-table-header mb8">
            <el-button @click="addUser" type="primary" size="small">添加</el-button>
        </div>
        <el-table
          element-loading-spinner="el-icon-loading"
          :highlight-current-row="true"
          v-loading="loading"
          border
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
        >
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
        <UserAdd v-model:show="showUserAdd"></UserAdd>
    </div>
</template>
<script>
import Search from '@/components/Search'
import UserAdd from './UserAdd.vue'
export default {
  components: {
    Search,
    UserAdd
  },
  data () {
    return {
      searchOPtions: [{ type: 'input', key: 'key' }],
      loading: false,
      tableData: [{}, {}],
      showUserAdd: false
    }
  },
  methods: {
    addUser () {
      this.showUserAdd = true
    }
  }
}
</script>
