import { ref } from 'vue'
export default function () {
  const query = ref({})
  const onSearch = (type:string, q:any) => {
    if (type === 'search') {
      query.value = q
    } else {
      query.value = {}
    }
  }
  return {
    onSearch,
    query
  }
}
