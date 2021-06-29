<template>
    <el-dialog
        :title="`${projectInfo.id?'编辑':'添加'}`"
        v-model="dialogVisible"
        width="30%"
        :before-close="handleClose"
    >
        <el-form ref="form" :model="form" label-width="80px">
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
import { ref, toRefs, watch, reactive } from 'vue'
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    projectInfo: {}
  },
  setup (props, { emit }) {
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
    watch(state.dialogVisible, v => {
      emit('update:show', v)
    })
    const handleClose = () => {
      state.dialogVisible = false
    }
    const submit = () => {
    //   this.$refs.form.validate(val => {
    //     if (val) {
    //       this.$api.project.save(this.form).then(res => {
    //         this.dialogVisible = false
    //         this.$emit('fresh')
    //       })
    //     }
    //   })
    }
    return {
      ...toRefs(state),
      handleClose,
      submit
    }
  }
}
</script>
