<template>
    <el-dialog
        title="添加项目"
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
    watch(show, v => {
      dialogVisible.value = v
    })
    watch(dialogVisible, v => {
      emit('update:show', v)
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
      },
      simpleRule: { required: true, message: '必填项', trigger: 'change' }
    }
  },
  methods: {
    handleClose () {
      this.dialogVisible = false
    },
    submit () {
      this.$refs.form.validate(val => {
        if (val) {
          this.$api.project.save(this.form).then(res => {
            this.dialogVisible = false
            this.$emit('fresh')
          })
        }
      })
    }
  }
}
</script>
