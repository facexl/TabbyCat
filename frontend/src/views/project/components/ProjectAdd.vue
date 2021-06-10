<template>
    <el-dialog
        title="添加项目"
        v-model="dialogVisible"
        width="30%"
        :before-close="handleClose"
    >
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="项目名称" required>
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="项目简介" required>
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
import { ref, toRefs, watch } from 'vue'
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const dialogVisible = ref(false)
    const { show } = toRefs(props)
    watch(show, _ => {
      dialogVisible.value = _
    })
    watch(dialogVisible, _ => {
      emit('update:show', _)
    })
    return {
      dialogVisible
    }
  },
  data () {
    return {
      form: {
        name: '',
        profile: ''
      }
    }
  },
  methods: {
    handleClose () {
      this.dialogVisible = false
    },
    submit () {
    //   this.$refs.form
    }
  }
}
</script>
