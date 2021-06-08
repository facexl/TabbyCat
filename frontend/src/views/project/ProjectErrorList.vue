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
            <el-pagination
                @size-change="_=>{handleSizeChange(_,getErrList)}"
                @current-change="_=>{handleCurrentChange(_,getErrList)}"
                :current-page="page"
                :page-sizes="[20, 50, 100, 200]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import Search from '@/components/Search'
import usePagination from '@/composables/usePagination'
import useSearch from '@/composables/useSearch'
import useTable from '@/composables/useTable'
import { onMounted } from 'vue'
import $api from '@/api/index'
export default {
  components: {
    Search
  },
  data () {
    return {
      searchOPtions: [{ type: 'input', key: 'key' }],
      //   loading: false,
      tableData: [],
      total: 0
    }
  },
  setup () {
    const getErrList = () => {
      loading.value = true
      $api.errors.errList({
        page: page.value,
        pageSize: pageSize.value
      }).then(res => {
        loading.value = false
        tableData.value = res.data.list
        // this.total = res.data.count
      }).catch((err) => {
        console.error(err)
        loading.value = false
      })
    }
    const { page, pageSize, handleSizeChange, handleCurrentChange } = usePagination()
    const { onSearch, query } = useSearch()
    const { loading, tableData } = useTable()
    onMounted(getErrList)
    return {
      page,
      pageSize,
      handleSizeChange,
      handleCurrentChange,
      onSearch,
      query,
      loading
    }
  }
}
</script>
