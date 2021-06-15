import { ref } from 'vue'
import $api from '@/api'
export default function () {
  const roles = ref([])
  const setRoles = async () => {
    const { data } = await $api.config.roles()
    roles.value = data
  }
  return {
    roles,
    setRoles
  }
}
