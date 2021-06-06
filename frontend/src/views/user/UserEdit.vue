<template>
    <div>
        <el-row type="flex" justify="center">
            <el-card style="width:500px">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="用户名">
                        <el-input></el-input>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-row>
    </div>
</template>
<script>
export default {
  date () {
    return {
      form: {}
    }
  }
}
</script>
