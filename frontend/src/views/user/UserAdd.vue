<template>
    <el-dialog
        title="添加用户"
        v-model="dialogVisible"
        width="30%"
        :before-close="handleClose"
    >
        <el-form :model="form" label-width="80px">
            <el-form-item label="用户名" prop="name" :rules="simpleRule">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" :rules="simpleRule">
                <el-input type="password" autocomplete="new-password" v-model="form.password"></el-input>
            </el-form-item>
             <el-form-item label="确认密码" prop="sure_password" :rules="simpleRule">
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
      form: {
        role: '',
        name: '',
        password: '',
        sure_password: ''
      },
      roles: [],
      simpleRule: { required: true, message: '必填项', trigger: 'change' }
    }
  },
  created () {
    this.$api.config.roles().then(res => {
      this.roles = res.data
    })
  },
  methods: {
    handleClose () {
      this.dialogVisible = false
    }
  }
}
</script>
