<template>
    <el-container v-show="showApp" style="min-height: 100vh;padding-left:200px">
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
<script>
import Aside from '@/views/layout/Aside'
import Header from '@/views/layout/Header'
import { ref, reactive, toRefs, computed } from 'vue'
import { useStore } from 'vuex'
export default {
  components: {
    Aside,
    Header
  },
  setup () {
    const store = useStore()
    const state = reactive({
      showApp: false
    })
    const userInfo = store.getters['user/userInfo']
    if (userInfo.id) {

    }
    console.log(userInfo)
    return {
      ...toRefs(state)
    }
  }
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
