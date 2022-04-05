<template>
    <div>
        <el-pagination
            @size-change="_=>{$emit('handleSizeChange',_)}"
            @current-change="_=>{$emit('handleCurrentChange',_)}"
            :current-page="page"
            :page-sizes="[20, 50, 100, 200]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div>
</template>
<script>
export default {
  props: {
    page: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 20
    },
    total: {
      type: Number,
      default: 0
    }
  }
}
</script>
