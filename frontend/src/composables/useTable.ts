import { ref } from 'vue'
export default function () {
  const loading = ref(false)
  const tableData = ref([])
  return {
    loading,
    tableData
  }
}
