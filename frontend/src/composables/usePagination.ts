import { ref } from 'vue'
export default function (getList:()=>unknown) {
  const page = ref(1)
  const pageSize = ref(20)
  const handleSizeChange = (size:number) => {
    pageSize.value = size
    getList()
  }
  const handleCurrentChange = (p:number) => {
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
