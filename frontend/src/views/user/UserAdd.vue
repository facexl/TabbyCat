<template>
    <el-dialog
        title="提示"
        v-model:visible="dialogVisible"
        width="30%"
        :before-close="handleClose"
    >
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="用户名">
                        <el-input></el-input>
                    </el-form-item>
                    <el-form-item label="旧密码">
                        <el-input></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input></el-input>
                    </el-form-item>
                </el-form>
    </el-dialog>
</template>
<script>
export default {
  data () {
    return {
      dialogVisible: false,
      form: {}
    }
  },
  methods: {
    handleClose () {
      console.log('closed')
    }
  }
}
</script>
