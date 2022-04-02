<template>
    <div>
        <Search :searchOPtions="searchOPtions" @searchCallback="onSearch"></Search>
        <div class="app-table-header mb8">
            <el-button @click="showProjectAdd = true;editingProjectInfo={}" type="primary" size="small">添加</el-button>
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
          <el-table-column label="创建时间" align="center" prop="createdAt"></el-table-column>
          <el-table-column label="操作" align="center" fixed="right">
              <template #default="scope">
                  <div>
                    <el-button @click="$router.push({name:'projectErrorList',query:{token:scope.row.token}})" type="text">查看</el-button>
                    <el-button @click="edit(scope.row)" type="text">编辑</el-button>
                    <el-button @click="del(scope.row.id)" class="danger-color" type="text">删除</el-button>
                  </div>
              </template>
          </el-table-column>
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
        <ProjectAdd :projectInfo="editingProjectInfo" @fresh="getList" v-model:show="showProjectAdd"></ProjectAdd>
    </div>
</template>
<script>
import Search from '@/components/Search.vue'
import Pagination from '@/components/Pagination.vue'
import usePagination from '@/composables/usePagination'
import useSearch from '@/composables/useSearch'
import $api from '@/api/index'
import ProjectAdd from './components/ProjectAdd.vue'
import { reactive, toRefs, onMounted } from 'vue'
import { keyer } from '@/utils/index'
export default {
  components: {
    Search, Pagination, ProjectAdd
  },
  setup () {
    const state = reactive({
      searchOPtions: [{ type: 'input', key: 'key' }],
      loading: false,
      tableData: [],
      total: 0,
      showProjectAdd: false,
      editingProjectInfo: {}
    })
    onMounted(() => {
        console.log(keyer.key)
      getList()
    })
    const getList = () => {
      state.loading = true
      $api.project.projectList({
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
    const del = (id) => {
      $api.project.del({
        id
      }).then(() => {
        getList()
      })
    }
    const edit = (row) => {
      state.editingProjectInfo = row
      state.showProjectAdd = true
    }
    const { page, pageSize, handleSizeChange, handleCurrentChange } = usePagination(getList)
    const { onSearch, query } = useSearch(getList)
    return {
      ...toRefs(state),
      getList,
      page,
      pageSize,
      handleSizeChange,
      handleCurrentChange,
      onSearch,
      query,
      del,
      edit
    }
  }
}
</script>
