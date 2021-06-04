<template>
    <el-aside class="el-aside app-aside" width="200px">
    <div class="aside-top" style="height:60px"></div>
    <el-menu class="el-menu" style="height:100vh" :default-openeds="defaultOpeneds">
      <el-submenu v-for="(item,i) in filterRoutes" :index="String(i)" :key="item.name">
        <template #title><i class="el-icon-message"></i>{{item.meta.title}}</template>
        <el-menu-item :class="{active:it.active}" @click="$router.push({name:it.name})" v-for="(it,oi) in item.children" :key="it.name" :index="`${i}-${oi}`">{{it.meta.title}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>
<script>
import { routes } from '@/router/index'
export default {
  watch: {
    $route: {
      handler (v) {
        this.filterRoutes.forEach((it, i) => {
          it.children.forEach(item => {
            if (item.name === v.name) {
              this.defaultOpeneds = [String(i)]
              item.active = true
            } else {
              item.active = false
            }
          })
        })
      },
      immediate: true
    }
  },
  computed: {
    filterRoutes () {
      const filterRoutes = routes.filter(it => !it.hidden)
      filterRoutes.forEach(it => {
        it.children = it.children.filter(item => {
          item.active = false
          return !item.hidden
        })
      })
      return filterRoutes
    }
  },
  data () {
    return {
      defaultOpeneds: []
    }
  }
}
</script>
<style lang="less" scoped>
.el-aside,.el-menu{
    background-color: #001529;
}
.el-menu{
    border-right: none;
}

</style>
<style lang="less">
.app-aside{
    .el-submenu__title,.el-icon-message,.el-submenu__icon-arrow{
        color:#fff;
    }
    .el-submenu__title:hover{
        background-color: inherit;
    }
    .el-menu-item{
        background-color: #000c17;
        color:#d10a0a;
        color:hsla(0,0%,100%,.65);
        transition: background-color .3s;
    }
    .el-menu-item:hover{
        color:#fff;
    }
    .el-menu-item.active{
        background-color: #1890ff;
    }
}
</style>
