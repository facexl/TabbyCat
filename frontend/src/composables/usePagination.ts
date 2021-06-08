import { ref } from 'vue'
export default function () {
  const page = ref(1)
  const pageSize = ref(20)
  const handleSizeChange = (size:number) => {
    pageSize.value = size
  }
  const handleCurrentChange = (p:number) => {
    page.value = p
  }
  return {
    page,
    pageSize,
    handleSizeChange,
    handleCurrentChange
  }
}
