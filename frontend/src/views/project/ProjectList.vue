<template>
    <div>
        <Search :searchOPtions="searchOPtions" @searchCallback="(type,query)=>{onSearch(type,query,getList)}"></Search>
        <div class="app-table-header mb8">
            <el-button @click="showProjectAdd = true" type="primary" size="small">添加</el-button>
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
          <el-table-column label="ID"  align="center" prop="id"></el-table-column>
          <el-table-column label="名称" align="center" prop="name"></el-table-column>
          <el-table-column label="简介" align="center" prop="profile"></el-table-column>
          <el-table-column label="token" align="center" prop="token"></el-table-column>
          <el-table-column label="创建时间" align="center" prop="create_time"></el-table-column>
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
        <ProjectAdd v-model:show="showProjectAdd"></ProjectAdd>
    </div>
</template>
<script>
import Search from '@/components/Search'
import Pagination from '@/components/Pagination'
import usePagination from '@/composables/usePagination'
import useSearch from '@/composables/useSearch'
import $api from '@/api/index'
import ProjectAdd from './components/ProjectAdd.vue'
export default {
  components: {
    Search, Pagination, ProjectAdd
  },
  data () {
    return {
      searchOPtions: [{ type: 'input', key: 'key' }],
      loading: false,
      tableData: [],
      total: 0,
      showProjectAdd: false
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
  methods: {
    getList () {
      this.loading = true
      $api.errors.errList({
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
