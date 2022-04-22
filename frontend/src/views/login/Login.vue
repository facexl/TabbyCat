<template>
  <div class="app-login-container flex-center">
    <el-form
      :model="loginForm"
      :rules="loginRules"
      ref="root"
      label-position="left"
      label-width="0px"
      class="card-box login-form"
    >
      <h3 class="title">
        狸花猫
      </h3>
      <el-form-item prop="name">
        <el-icon class="svg-container flex-center"><user-filled /></el-icon>
        <el-input name="username" type="text" v-model="loginForm.name" placeholder="请输入用户名称" />
      </el-form-item>
      <el-form-item prop="password">
        <el-icon class="svg-container flex-center"><lock /></el-icon>
        <el-input
          name="password"
          type="password"
          @keyup.enter="handleLogin"
          v-model="loginForm.password"
          placeholder="请输入登录密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          style="width:100%;"
          :loading="loading"
          size="large"
          @click.prevent="handleLogin"
        >登 录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { local } from '@/utils'
import { ref } from 'vue'
import $api from '@/api/index'
import { useRouter,useRoute } from 'vue-router'
const root = ref(null)
const router = useRouter()
const route = useRoute()
const validatename = (rule, value, callback) => {
    if (!value) {
    callback(new Error('请输入用户名'))
    return
    }
    callback()
}
const validatePass = (rule, value, callback) => {
    if (value.length < 6) {
    callback(new Error('密码不能小于6位'))
    return
    }
    callback()
}
const state = defineReactive({
      loginForm: {
        name: '',
        password: ''
      },
      loginRules: {
        name: [
          { required: true, trigger: 'blur', validator: validatename }
        ],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false
})
const handleLogin =()=> {
      root.value.validate(valid => {
        if (valid) {
          state.loading = true
          $api.user.login(state.loginForm).then(res => {
            local.set('_t', res.data.token)
            if (route.query.redirect) {
              router.push({
                path: route.query.redirect
              })
            } else {
              router.push({
                name: 'workspace'
              })
            }
          }).catch(err => {
              console.log(err)
            state.loading = false
          })
        }
      })
    }
</script>

<style lang="less" type="text/less">
.app-login-container {
  background: #2d3a4b;
  position: fixed;
  height: 100%;
  width: 100%;
  input {
    background: transparent;
    border: 0;
    -webkit-appearance: none;
    border-radius: 0;
    padding: 12px 5px 12px 15px;
    color: #eee;
    height: 47px;
    &:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
  }
  .el-input {
    display: inline-block;
    flex:1;
    .el-input__inner{
        box-shadow:none;
    }
  }
  .svg-container {
    padding-left:15px;
    color:  #889aa4;
    font-size: 18px;
  }
  .title {
    font-size: 24px;
    color: #eee;
    margin: 0 auto 40px auto;
    text-align: center;
    font-weight: bold;
    img {
      width: 70px;
      vertical-align: -4px;
      margin-right: 10px;
    }
  }
  .login-form {
    width: 400px;
    padding: 0 15px;
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>
