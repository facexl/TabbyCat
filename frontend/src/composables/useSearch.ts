import { ref } from 'vue'
export default function (getList:()=>unknown) {
  const query = ref({})
  const onSearch = (type:string, q:any) => {
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
