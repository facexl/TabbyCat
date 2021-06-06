<template>
    <el-header class="header">
        <div class="left">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>{{father}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{child}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="right">
            <el-dropdown @command="userOperate">
                <i class="el-icon-setting" style="margin-right: 15px"></i>
                <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="edit">编辑</el-dropdown-item>
                    <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
                </template>
            </el-dropdown>
            <span class="name">肖浪</span>
        </div>
    </el-header>
</template>
<script>
import { routes } from '@/router/index'
export default {
  watch: {
    $route: {
      handler (v) {
        routes.forEach((it, i) => {
          it.children.forEach(item => {
            if (item.name === v.name) {
              this.father = it.meta.title
              this.child = v.meta.title
            }
          })
        })
      },
      immediate: true
    }
  },
  data () {
    return {
      father: '',
      child: ''
    }
  },
  methods: {
    userOperate (key) {
      switch (key) {
        case 'edit':
          this.$router.push({
            name: 'userEdit'
          })
          break
        default:
          console.log('未定义操作')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height:60px;
    box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
    .name{
        color:#333;
        font-size: 14px;
    }
}
</style>
