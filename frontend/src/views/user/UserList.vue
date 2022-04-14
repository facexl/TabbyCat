<template>
    <div>
        <Search :searchOptions="searchOptions" @onSearch="onSearch"></Search>
        <div class="app-table-header mb8">
            <el-button @click="addUser" type="primary">添加</el-button>
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
            <Pagination
                :page="page"
                :pageSize="pageSize"
                :total="total"
                @handleSizeChange="handleSizeChange"
                @handleCurrentChange="handleCurrentChange"
            />
        </div>
        <!-- <UserAdd @fresh="getList" :userInfo="userInfo" v-model:show="showUserAdd"></UserAdd> -->
    </div>
</template>
<script setup>
import Search from '@/components/Search.vue'
import UserAdd from './UserAdd.vue'
import Pagination from '@/components/Pagination.vue'
import useSearch from '@/composables/useSearch'
import $api from '@/api/index'
const state = defineReactive({
    searchOptions: [
        { type: 'input', key: 'key',placeholder:'姓名' },
        { type: 'select', key: 'type',options:[{label:'name',value:1},{label:'name2',value:2}] },
    ],
    loading: false,
    tableData: [],
    showUserAdd: false,
    userInfo: {},
})
onMounted(() => {
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
        total.value = res.data.count
    }).catch((err) => {
        console.error(err)
        state.loading = false
    })
}
const {
    onSearch,
    handleSizeChange,
    handleCurrentChange,
    query,
    page,
    pageSize,
    total
} = useSearch(getList)

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
const addUser = () => {
    state.showUserAdd = true
    state.userInfo = {}
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


</script>

