<template>
  <div class="app-login-container">
    <el-form
      :model="loginForm"
      :rules="loginRules"
      ref="loginForm"
      label-position="left"
      label-width="0px"
      class="card-box login-form"
    >
      <h3 class="title">
        狸花猫
      </h3>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
            <i class="el-icon-user-solid"></i>
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" placeholder="请输入用户名称" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container svg-container_login">
            <i class="el-icon-lock"></i>
        </span>
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
          @click.prevent="handleLogin"
        >登 录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import { mapActions } from "vuex";
export default {
  data () {
    const validateUsername = (rule, value, callback) => {
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
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false
    }
  },
  methods: {
    handleLogin () {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          this.loading = true
          try {
            await this.Login(this.loginForm)
            this.$nextTick(_ => {
              this.$router.push({ name: 'Index' })
              this.loading = false
            })
          } catch (err) {
            this.loading = false
          }
        }
      })
    }
  }
}
</script>

<style lang="less" type="text/less">
.app-login-container {
  background: #2d3a4b;
  position: fixed;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
    vertical-align: -2px;
    width: 85%;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color:  #889aa4;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
    svg {
      font-size: 15px;
    }
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
