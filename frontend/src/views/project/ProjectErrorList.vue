<template>
    <div>
        <Search :searchOPtions="searchOPtions" @searchCallback="(type,query)=>{onSearch(type,query,getList)}"></Search>
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
                @handleSizeChange="_=>{handleSizeChange(_,getList)}"
                @handleCurrentChange="_=>{handleCurrentChange(_,getList)}"
            />
        </div>
    </div>
</template>
<script>
import Search from '@/components/Search'
import Pagination from '@/components/Pagination'
import usePagination from '@/composables/usePagination'
import useSearch from '@/composables/useSearch'
import { onMounted, ref } from 'vue'
import $api from '@/api/index'
const useGetList = (page, pageSize, query) => {
  const loading = ref(false)
  const tableData = ref([])
  const total = ref(0)
  const getList = () => {
    loading.value = true
    $api.errors.errList({
      page: page.value,
      pageSize: pageSize.value,
      ...query.value
    }).then(res => {
      loading.value = false
      tableData.value = res.data.list
      total.value = res.data.count
    }).catch((err) => {
      console.error(err)
      loading.value = false
    })
  }
  return {
    loading,
    tableData,
    total,
    getList
  }
}
export default {
  components: {
    Search, Pagination
  },
  data () {
    return {
      searchOPtions: [{ type: 'input', key: 'key' }]
    }
  },
  setup () {
    const { page, pageSize, handleSizeChange, handleCurrentChange } = usePagination()
    const { onSearch, query } = useSearch()
    const { loading, tableData, total, getList } = useGetList(page, pageSize, query)
    onMounted(getList)
    return {
      page,
      pageSize,
      handleSizeChange,
      handleCurrentChange,
      onSearch,
      query,
      loading,
      total,
      tableData,
      getList
    }
  }
}
</script>
