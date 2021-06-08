import { ref } from 'vue'
export default function () {
  const query = ref({})
  const onSearch = (type:string, q:any, getList:()=>unknown) => {
    if (type === 'search') {
      query.value = q
    } else {
      query.value = {}
    }
    getList()
  }
  return {
    onSearch,
    query
  }
}
