<template>
    <el-dialog
        title="添加用户"
        v-model="dialogVisible"
        width="30%"
        :before-close="handleClose"
    >
        <el-form :model="form" ref="root" label-width="80px">
            <el-form-item label="用户名" prop="name" :rules="simpleRule">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item v-if="!isEdit" label="密码" prop="password" :rules="simpleRule">
                <el-input type="password" autocomplete="new-password" v-model="form.password"></el-input>
            </el-form-item>
             <el-form-item v-if="!isEdit" label="确认密码" prop="sure_password" :rules="surePasswordRule">
                <el-input type="password" autocomplete="new-password" v-model="form.sure_password"></el-input>
            </el-form-item>
            <el-form-item label="身份" prop="role" :rules="simpleRule">
                <el-select clearable placeholder="请选择" v-model="form.role">
                    <el-option v-for="item in roles" :key="item.type" :label="item.name" :value="item.type"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script>
import useRoles from '@/composables/constant/useRoles'
import { reactive, toRefs, onMounted, ref, watch, nextTick } from 'vue'
import $api from '@/api/index'

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    userInfo: {}
  },
  emits: ['fresh'],
  setup (props, { emit }) {
    const root = ref(null)
    const { roles, setRoles } = useRoles()
    setRoles()
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== state.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    const state = reactive({
      dialogVisible: false,
      isEdit: false,
      form: {
        role: '',
        name: '',
        password: '',
        sure_password: ''
      },
      simpleRule: { required: true, message: '必填项', trigger: 'change' },
      surePasswordRule: { required: true, validator: validatePass, trigger: 'blur' }
    })
    watch(() => props.show, v => {
      state.dialogVisible = v
    })
    watch(() => state.dialogVisible, v => {
      emit('update:show', v)
    })
    watch(() => props.userInfo, async v => {
      if (v.id) {
        await nextTick()
        Object.keys(state.form).forEach(key => {
          state.form[key] = v[key]
        })
        state.isEdit = true
      } else {
        root.value && root.value.resetFields()
        state.isEdit = false
      }
    })
    const handleClose = () => {
      state.dialogVisible = false
    }
    const submit = () => {
      root.value.validate(val => {
        console.log(val)
        if (!val) return
        state.isEdit
          ? $api.user.update({
            ...state.form,
            id: props.userInfo.id
          }).then(res => {
            state.dialogVisible = false
            emit('fresh')
          })
          : $api.user.signIn(state.form).then(res => {
            state.dialogVisible = false
            emit('fresh')
          })
      })
    }
    return {
      ...toRefs(state),
      roles,
      handleClose,
      submit,
      root
    }
  }
}
</script>
