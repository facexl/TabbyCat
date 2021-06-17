<template>
    <div>
        <Search :searchOPtions="searchOPtions" @searchCallback="(type,query)=>{onSearch(type,query,getList)}"></Search>
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
          <el-table-column label="用户昵称" align="center" prop="name"></el-table-column>
          <el-table-column label="用户类型" align="center" prop="role"></el-table-column>
          <el-table-column label="是否启用" align="center" prop="status">
              <template v-slot="scope">
                  <div>
                      <el-switch @change="statusChange(scope.row)" v-model="scope.row.status" :active-value="1" :inactive-value="10"></el-switch>
                  </div>
              </template>
          </el-table-column>
          <el-table-column label="创建时间" align="center" prop="createdAt"></el-table-column>
          <el-table-column label="更新时间" align="center" prop="updatedAt"></el-table-column>
        </el-table>
        <div class="app-table-pager mt8">
            <Pagination
                :page="page"
                :pageSize="pageSize"
                :total="total"
                @handleSizeChange="_=>{handleSizeChange(_,getList)}"
                @handleCurrentChange="_=>{handleCurrentChange(_,getList)}"
            />
        </div>
        <UserAdd @fresh="getList" v-model:show="showUserAdd"></UserAdd>
    </div>
</template>
<script>
import Search from '@/components/Search'
import UserAdd from './UserAdd.vue'
import Pagination from '@/components/Pagination'
import usePagination from '@/composables/usePagination'
import useSearch from '@/composables/useSearch'
export default {
  components: {
    Search,
    UserAdd,
    Pagination
  },
  data () {
    return {
      searchOPtions: [{ type: 'input', key: 'key' }],
      loading: false,
      tableData: [],
      showUserAdd: false
    }
  },
  setup () {
    const { page, pageSize, handleSizeChange, handleCurrentChange } = usePagination()
    const { onSearch, query } = useSearch()
    return {
      page,
      pageSize,
      handleSizeChange,
      handleCurrentChange,
      onSearch,
      query
    }
  },
  created () {
    this.getList()
  },
  methods: {
    addUser () {
      this.showUserAdd = true
    },
    statusChange (row) {
      if (row.id) {
        this.$api.user.setStatus({
          id: row.id,
          status: row.status
        }, { success: true }).catch(err => {
          console.log(err)
          row.status = row.status === 1 ? 10 : 1
        })
      }
    },
    getList () {
      this.loading = true
      this.$api.user.list({
        page: this.page,
        pageSize: this.pageSize,
        ...this.query
      }).then(res => {
        this.loading = false
        this.tableData = res.data.list
        this.total = res.data.count
      }).catch((err) => {
        console.error(err)
        this.loading = false
      })
    }
  }
}
</script>
