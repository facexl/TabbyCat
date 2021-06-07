<template>
    <el-dialog
        title="添加用户"
        v-model="dialogVisible"
        width="30%"
        :before-close="handleClose"
    >
        <el-form :model="form" label-width="80px">
            <el-form-item label="用户名">
                <el-input></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input></el-input>
            </el-form-item>
            <el-form-item label="身份">
                <el-input></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    show (v) {
      this.dialogVisible = v
    },
    dialogVisible (v) {
      this.$emit('update:show', v)
    }
  },
  data () {
    return {
      dialogVisible: false,
      form: {}
    }
  },
  methods: {
    handleClose () {
      this.dialogVisible = false
    }
  }
}
</script>
