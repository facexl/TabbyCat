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
            <span class="name">{{userInfo.name}}</span>
        </div>
    </el-header>
</template>
<script setup lang="ts">
import { routes } from '@/router/index'
import { useStore } from 'vuex'
import { local, session } from '@/utils/index'
import { useRouter, useRoute } from 'vue-router'
import { watch,ref } from 'vue'
const router = useRouter()
const route = useRoute()
const father = ref()
const child = ref()
const store = useStore()
const userInfo = store.getters['user/userInfo']
watch(route,(v)=>{
    routes.forEach((it: { children: any[]; meta: { title: string } }) => {
        it.children.forEach(item => {
            if (item.name === v.name) {
                father.value = it.meta.title
                child.value = v.meta.title
            }
        })
    })
},{
    immediate:true
})
const userOperate = (key:string)=>{
      switch (key) {
        case 'edit':
          router.push({
            name: 'userEdit'
          })
          break
        case 'logout':
          local.clear()
          session.clear()
          window.location.reload()
          break
        default:
          console.log('未定义操作')
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
