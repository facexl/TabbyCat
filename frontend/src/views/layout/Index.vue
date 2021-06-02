<template>
  <el-container style="min-height: 100vh">
    <Aside />
    <el-container direction="vertical">
        <Header />
        <el-main>
            <router-view />
        </el-main>
    </el-container>
</el-container>
</template>
<script>
import Aside from '@/views/layout/Aside'
import Header from '@/views/layout/Header'
export default {
  components: {
    Aside,
    Header
  }
}
</script>
