<template>
    <div>
        <el-row type="flex" class="flex-no-warp">
            <div ref="leftRef" class="left" :class="{isOpen:isOpen}">
                <el-form class="flex flex-wrap" ref="searchRef" style="width:100%" :model="searchForm">
                    <div class="mr8 left-item" v-for="item in searchOptions" :key="item.key">
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
            <div class="right flex flex-no-wrap flex-no-shink">
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
            <span
              class="ml8 mr8 open-tag"
              type="text"
              size="small"
              @click="isOpen=!isOpen"
              v-if="showOpenTrigger"
            >
              {{isOpen?'收起':'展开'}}
              <el-icon class="receive-icon" :class="{'open-icon':isOpen}"><arrow-down /></el-icon>
            </span>
            <slot></slot>
            </div>
        </el-row>
    </div>
</template>
<script setup>
import { ref,watch,nextTick } from 'vue'

const props = defineProps({
    searchOptions:Array
})
const emit = defineEmits(['onSearch'])
const searchForm = ref({});

const leftRef = ref()

const searchRef = ref()

const isOpen = ref(false)

// 是否展示开关  
const showOpenTrigger = ref(false)

props.searchOptions.forEach(it => {
    searchForm.value[it.key] = it.defaultValue
});


const calculateOptionsLength = async ()=>{
    const nodeList = leftRef.value.querySelectorAll('.left-item')
    // 存在第二行
    if(nodeList[nodeList.length-1].offsetTop){
        showOpenTrigger.value = true
    }
}

watch(()=>props.searchOptions,async ()=>{
    await nextTick()
    if(leftRef.value){
        calculateOptionsLength()
    }else{
        await nextTick()
        calculateOptionsLength()
    }
},{
    immediate:true,
    deep:true
})


const onSearch = ()=>{
    emit('onSearch',{...searchForm.value})
}
const reset = ()=>{
    searchRef.value && searchRef.value.resetFields()
    emit('onSearch',{})
}

</script>

<style lang="less" scoped>
.left{
    max-width:70%;
    height:50px;
    overflow: hidden;
}
.isOpen{
    height:auto;
    overflow: visible;
}
.right{
    width:30%;
}
.receive-icon{
    transition: all .3s;
}
.open-icon{
    transform: rotate(180deg);
}
.open-tag{
    font-size: 12px;
    cursor: pointer;
    color:#1890ff;
    line-height: 32px;
}
</style>