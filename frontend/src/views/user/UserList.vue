<template>
    <div>
        <!-- <Search :searchOPtions="searchOPtions" @searchCallback="onSearch"></Search> -->
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
                      <el-switch @change="statusChange(scope.row)" v-model="scope.row.status" :active-value="10" :inactive-value="0"></el-switch>
                  </div>
              </template>
          </el-table-column>
          <el-table-column label="创建时间" align="center" prop="createdAt"></el-table-column>
          <el-table-column label="更新时间" align="center" prop="updatedAt"></el-table-column>
            <el-table-column label="操作" align="center" fixed="right">
              <template #default="scope">
                  <div>
                    <el-button @click="edit(scope.row)" type="text">编辑</el-button>
                    <el-button @click="del(scope.row.id)" class="danger-color" type="text">删除</el-button>
                  </div>
              </template>
          </el-table-column>
        </el-table>
        <div class="app-table-pager mt8">
            <!-- <Pagination
                :page="page"
                :pageSize="pageSize"
                :total="total"
                @handleSizeChange="handleSizeChange"
                @handleCurrentChange="handleCurrentChange"
            /> -->
        </div>
        <UserAdd @fresh="getList" :userInfo="userInfo" v-model:show="showUserAdd"></UserAdd>
    </div>
</template>
<script>
// import Search from '@/components/Search.vue'
import UserAdd from './UserAdd.vue'
// import Pagination from '@/components/Pagination.vue'
import usePagination from '@/composables/usePagination'
import useSearch from '@/composables/useSearch'
import { reactive, toRefs, onMounted } from 'vue'
import $api from '@/api/index'
import { keyer } from '@/utils/index'
export default {
  components: {
    // Search,
    UserAdd,
    // Pagination
  },
  setup () {
    const state = reactive({
      searchOPtions: [{ type: 'input', key: 'key' }],
      loading: false,
      tableData: [],
      showUserAdd: false,
      total: 0,
      userInfo: {},
    })
    onMounted(() => {
        console.log(keyer.key)
      getList()
    })
    const getList = () => {
      state.loading = true
      $api.user.list({
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
    const addUser = () => {
      state.showUserAdd = true
      state.userInfo = {}
    }
    const statusChange = (row) => {
      if (row.id) {
        $api.user.setStatus({
          id: row.id,
          status: row.status
        }, { success: true }).catch(err => {
          console.log(err)
          row.status = row.status === 0 ? 10 : 0
        })
      }
    }
    const edit = (row) => {
      state.showUserAdd = true
      state.userInfo = row
    }
    const del = id => {
      $api.user.setStatus({
        id,
        status: 999
      }, { success: true }).then(() => {
        getList()
      })
    }
    return {
      ...toRefs(state),
      page,
      pageSize,
      handleSizeChange,
      handleCurrentChange,
      onSearch,
      query,
      getList,
      addUser,
      statusChange,
      del,
      edit
    }
  }
}
</script>
