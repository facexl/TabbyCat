<template>
    <div>
        <Search :searchOPtions="searchOPtions"></Search>
        用户列表用户列表用户列表用户列表用户列表用户列表用户列表用户列表用户列表用户列表用户列表用户列表用户列表用户列表用户列表用户列表用户列表用户列表用户列表用户列表用户列表用户列表用户列表用户列表
    </div>
</template>
<script>
import Search from '@/components/Search'
export default {
  components: {
    Search
  },
  data () {
    return {
      searchOPtions: [{ type: 'input', key: 'key' }]
    }
  }
}
</script>
