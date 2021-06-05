<template>
  <el-container style="min-height: 100vh">
    <Aside />
    <el-container direction="vertical">
        <Header />
        <el-main>
            <transition name="slide-fade" mode="out-in">
                <router-view />
            </transition>
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
<style lang="less">
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
