<template>
    <el-container v-if="showApp" style="min-height: 100vh;padding-left:200px">
        <Aside />
        <el-container direction="vertical">
            <Header />
            <el-main>
                <router-view v-slot="{ Component }">
                    <transition name="slide-fade" mode="out-in">
                        <component :is="Component" />
                    </transition>
                </router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script setup lang="ts">
import Aside from '@/views/layout/Aside.vue'
import Header from '@/views/layout/Header.vue'
import { useStore } from 'vuex'
import { ElLoading } from 'element-plus'
    const store = useStore()
    const state = defineReactive({
        showApp:false
    })
    const loading = ElLoading.service({
      lock: true,
    })
    console.log('trigger app init setup')
    const userInfo = store.getters['user/userInfo']
    if (!userInfo.id) {
      store.dispatch('user/getUserInfo').then(res => {
        state.showApp = true
        loading.close()
      }).catch(err => {
        console.log(err)
        loading.close()
      })
    }else{
        state.showApp = true
    }
</script>
<style lang="less">
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
