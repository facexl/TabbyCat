import { reactive,toRefs } from 'vue'
export default function (getList:()=>unknown) {
  const state = reactive({
      query:{},
      page:1,
      pageSize:20,
      total:0
  })
  const onSearch = (params:Object) => {
    state.query = params
    getList()
  }
  const handleSizeChange = (size:number) => {
    state.pageSize = size
    getList()
  }
  const handleCurrentChange = (p:number) => {
    state.page = p
    getList()
  }
  return {
      ...toRefs(state),
      onSearch,
      handleSizeChange,
      handleCurrentChange,
  }
}
