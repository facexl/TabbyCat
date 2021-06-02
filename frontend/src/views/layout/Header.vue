<template>
    <el-header class="header">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <template #dropdown>
          <el-dropdown-menu>
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <span class="name">肖浪</span>
    </el-header>
</template>
<style lang="less" scoped>
.header{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height:60px;
    box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
    .name{
        color:#333;
        font-size: 14px;
    }
}
</style>
