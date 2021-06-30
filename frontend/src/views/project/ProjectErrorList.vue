<template>
    <div>
        <Search :searchOPtions="searchOPtions" @searchCallback="onSearch"></Search>
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
          <el-table-column label="错误" align="center" prop="errString"></el-table-column>
          <el-table-column label="平台" align="center" prop="platform"></el-table-column>
          <el-table-column label="环境" align="center" prop="environment"></el-table-column>
          <el-table-column label="用户" align="center" prop="uid"></el-table-column>
          <el-table-column label="链接" align="center" prop="url"></el-table-column>
        </el-table>
        <div class="app-table-pager mt8">
            <Pagination
                :page="page"
                :pageSize="pageSize"
                :total="total"
                @handleSizeChange="handleSizeChange"
                @handleCurrentChange="handleCurrentChange"
            />
        </div>
    </div>
</template>
<script>
import Search from '@/components/Search'
import Pagination from '@/components/Pagination'
import usePagination from '@/composables/usePagination'
import useSearch from '@/composables/useSearch'
import $api from '@/api/index'
import { reactive, toRefs, onMounted } from 'vue'
export default {
  components: {
    Search, Pagination
  },
  setup () {
    const state = reactive({
      searchOPtions: [{ type: 'input', key: 'key' }],
      loading: false,
      tableData: [],
      total: 0
    })
    const getList = () => {
      state.loading = true
      $api.errors.errList({
        page: page.value,
        pageSize: pageSize.value,
        ...query.value
      }).then(res => {
        state.loading = false
        state.tableData = res.data.list
        state.total = res.data.count
      }).catch((err) => {
        console.error(err)
        state.loading = false
      })
    }
    const { page, pageSize, handleSizeChange, handleCurrentChange } = usePagination(getList)
    const { onSearch, query } = useSearch(getList)
    onMounted(() => {
      getList()
    })
    return {
      ...toRefs(state),
      page,
      pageSize,
      handleSizeChange,
      handleCurrentChange,
      onSearch,
      query,
      getList
    }
  }
}
</script>
