<template>
    <div>
        <el-row type="flex" class="flex-no-warp">
            <div class="left">
                <el-form class="flex flex-wrap" ref="searchFormRef" style="width:100%" :model="searchForm">
                    <div class="mr8" v-for="item in searchOptions" :key="item.key">
                        <el-form-item
                            :label="item.label"
                            :prop="item.key"
                            v-if="item.type==='input'"
                        >
                            <el-input
                                v-model="searchForm[item.key]"
                                clearable
                                :placeholder="item.placeholder || '请填写'"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            :label="item.label"
                            :prop="item.key"
                            v-if="item.type === 'select'"
                        >
                            <el-select
                                clearable
                                v-model="searchForm[item.key]"
                                :placeholder="item.placeholder || '请选择'"
                            >
                                <el-option
                                    v-for="item in item.options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
            <div class="right flex flex-no-wrap">
            <el-button
                ref="searchButton"
                type="primary"
                class="search-btn ml8"
                @click="onSearch">
              查询
            </el-button>
            <el-button 
                plain 
                @click="reset">
                重置
            </el-button>
            </div>
        </el-row>
    </div>
</template>
<script setup>
import { ref } from 'vue'

const props = defineProps({
    searchOptions:Array
})
const searchForm = ref({});

props.searchOptions.forEach(it => {
    searchForm.value[it.key] = it.defaultValue
});

const onSearch = ()=>{

}
const reset = ()=>{
    
}

</script>

<style lang="less" scoped>
.left{
    max-width:70%;
}
</style>