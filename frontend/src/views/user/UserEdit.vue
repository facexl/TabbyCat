<template>
    <div>
        <el-row type="flex" justify="center">
            <el-card style="width:500px">
                <el-form ref="root" :model="form" label-width="80px">
                    <el-form-item label="用户名" prop="name" :rules="simpleRule">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="旧密码" prop="oldPassword" :rules="simpleRule">
                        <el-input type="password" autocomplete="new-password" v-model="form.oldPassword"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="newPassword" :rules="simpleRule">
                        <el-input type="password" autocomplete="new-password" v-model="form.newPassword"></el-input>
                    </el-form-item>
                </el-form>
                <el-row type="flex" justify="center">
                    <el-button @click="submit" type="primary" class="button">提交</el-button>
                </el-row>
            </el-card>
        </el-row>
    </div>
</template>
<script>
import { ref, toRefs, watch, reactive, onMounted } from 'vue'
import $api from '@/api/index'
export default {
  setup () {
    const root = ref(null)
    const state = reactive({
      form: {
        name: '',
        oldPassword: '',
        newPassword: ''
      },
      simpleRule: { required: true, message: '必填项', trigger: 'change' }
    })
    const submit = () => {
      root.value.validate(val => {
        if (val) {
          $api.user.changePassword({
            ...state.form
          }, { success: true })
        }
      })
    }
    return {
      ...toRefs(state),
      submit,
      root
    }
  }
}
</script>
