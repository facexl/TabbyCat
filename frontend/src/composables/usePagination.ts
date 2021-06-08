import { ref } from 'vue'
export default function () {
  const page = ref(1)
  const pageSize = ref(20)
  const handleSizeChange = (size:number, getList:()=>unknown) => {
    pageSize.value = size
    getList()
  }
  const handleCurrentChange = (p:number, getList:()=>unknown) => {
    page.value = p
    getList()
  }
  return {
    page,
    pageSize,
    handleSizeChange,
    handleCurrentChange
  }
}
