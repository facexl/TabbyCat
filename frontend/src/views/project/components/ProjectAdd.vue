<template>
    <el-dialog
        :title="`${projectInfo.id?'编辑':'添加'}`"
        v-model="dialogVisible"
        width="30%"
        :before-close="handleClose"
    >
        <el-form ref="root" :model="form" label-width="80px">
            <el-form-item label="项目名称" :rules="simpleRule" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="项目简介" :rules="simpleRule" prop="profile">
                <el-input v-model="form.profile" type="textarea"></el-input>
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
import { ref, toRefs, watch, reactive, onMounted } from 'vue'
import $api from '@/api/index'
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    projectInfo: {}
  },
  emits: ['fresh'],
  setup (props, { emit }) {
    const root = ref(null)
    const state = reactive({
      dialogVisible: false,
      form: {
        name: '',
        profile: ''
      },
      simpleRule: { required: true, message: '必填项', trigger: 'change' }
    })
    const { show } = toRefs(props)
    watch(show, v => {
      state.dialogVisible = v
    })
    watch(
      () => state.dialogVisible,
      v => {
        emit('update:show', v)
      }
    )
    watch(
      () => props.projectInfo,
      v => {
        Object.keys(state.form).forEach(key => {
          state.form[key] = props.projectInfo[key]
        })
      }
    )
    const handleClose = () => {
      state.dialogVisible = false
    }
    const submit = () => {
      root.value.validate(val => {
        if (val) {
          $api.project.save({
            ...state.form,
            id: props.projectInfo.id ? props.projectInfo.id : 0
          }).then(res => {
            state.dialogVisible = false
            emit('fresh')
          }).catch(err => {
            console.log(err)
          })
        }
      })
    }
    return {
      ...toRefs(state),
      handleClose,
      submit,
      root
    }
  }
}
</script>
