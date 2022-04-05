<template>
  <div class="search">
    <el-form ref="searchForm" style="width:100%" :model="searchForm">
      <el-row type="flex">
        <div
          class="left"
          :class="`left-width-${searchOPtions.length}`"
        >
          <div
            v-for="(item, index) in searchOPtions"
            :key="item.key"
            v-show="index<searchItemNum"
            class="search-form-item"
            :class="`search-form-item-${WidthMap[item.type]} form-item-${searchOPtions.length}`"
          >
            <el-form-item
              :label="item.label"
              :prop="item.key"
              :key="item.key"
              v-if="item.type === 'datePicker'"
            >
            <!-- @keyup.enter.native="keyupEnter(item.key)" -->
              <el-date-picker
                :ref="item.key"
                value-format="yyyy-MM-dd"
                size="small"
                :clearable="clearable"
                v-model="searchForm[item.key]"
                type="date"
                :placeholder="item.placeholder || '选择日期'"
              ></el-date-picker>
            </el-form-item>

            <el-form-item
              :label="item.label"
              :prop="item.key"
              :key="item.key"
              v-if="item.type === 'dateMonthPicker'"
            >
            <!-- @keyup.enter.native="keyupEnter(item.key)" -->
              <el-date-picker
                :ref="item.key"
                v-model="searchForm[item.key]"
                type="month"
                :placeholder="item.placeholder || '选择月份'"
              ></el-date-picker>
            </el-form-item>

            <el-form-item
              :label="item.label"
              :prop="item.key"
              :key="item.key"
              v-if="item.type === 'dateRangePicker'"
            >
            <!-- @keyup.enter.native="keyupEnter(item.key)" -->
              <el-date-picker
                :ref="item.key"
                size="small"
                v-model="searchForm[item.key]"
                :picker-options="pickerOptions"
                style="width:100%;vertical-align: -2px"
                type="daterange"
                range-separator="-"
                :start-placeholder="item.placeholder || '开始日期'"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>

            <el-form-item
              :label="item.label"
              :prop="item.key"
              :key="item.key"
              v-if="item.type === 'datetimerange'"
            >
            <!-- @keyup.enter.native="keyupEnter(item.key)" -->
              <el-date-picker
                :ref="item.key"
                v-model="searchForm[item.key]"
                :picker-options="pickerOptions"
                style="width:100%;vertical-align: -2px"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="-"
                :start-placeholder="item.placeholder || '开始日期'"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>

            <el-form-item
              :label="item.label"
              :prop="item.key"
              :key="item.key"
              v-if="item.type === 'datetimerange_single_param'"
            >
             <!-- @keyup.enter.native="keyupEnter(item.key)" -->
              <el-date-picker
                :ref="item.key"
                style="width:100%;vertical-align: -2px"
                v-model="searchForm[item.key]"
                :picker-options="pickerOptions"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="-"
                :start-placeholder="item.placeholder || '开始日期'"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>

            <el-form-item
              :label="item.label"
              :prop="item.key"
              :key="item.key"
              v-if="item.type === 'dateTimePicker'"
            >
             <!-- @keyup.enter.native="keyupEnter(item.key)" -->
              <el-date-picker
                :ref="item.key"
                size="small"
                v-model="searchForm[item.key]"
                type="datetime"
                :placeholder="item.placeholder || '选择日期时间'"
              ></el-date-picker>
            </el-form-item>

            <el-form-item
              :label="item.label"
              :prop="item.key"
              :key="item.key"
              v-if="item.type === 'select'"
            >
            <!-- @keyup.enter.native="keyupEnter(item.key)" -->
              <el-select
                :ref="item.key"
                style="width:100%"
                filterable
                clearable
                size="small"
                v-model="searchForm[item.key]"
                :placeholder="item.placeholder || '请选择'"
                @change="selectChange(searchForm[item.key],item.key)"
              >
                <el-option
                  v-for="item in item.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item
              :label="item.label"
              :prop="item.key"
              :key="item.key"
              v-if="item.type === 'select-multiple'"
            >
             <!-- @keyup.enter.native="keyupEnter(item.key)" -->
              <el-select
                :ref="item.key"
                style="width:100%"
                size="small"
                v-model="searchForm[item.key]"
                multiple
                :placeholder="item.placeholder || '请选择'"
              >
                <el-option
                  filterable
                  v-for="item in item.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item
              :label="item.label"
              :prop="item.key"
              :key="item.key"
              v-if="item.type === 'input'"
            >
             <!-- @keyup.enter.native="keyupEnter(item.key)" -->
              <el-input
                :ref="item.key"
                size="small"
                v-model="searchForm[item.key]"
                :placeholder="item.placeholder || '请填写'"
              ></el-input>
            </el-form-item>

            <el-form-item
              :label="item.label"
              :prop="item.key"
              :key="item.key"
              v-if="item.type === 'cascader'"
            >
            <!-- @keyup.enter.native="keyupEnter(item.key)" -->
              <el-cascader
                :ref="item.key"
                clearable
                size="small"
                change-on-select
                style="width:100%"
                filterable
                expand-trigger="hover"
                :options="item.options"
                v-model="searchForm[item.key]"
                :placeholder="item.placeholder || '请选择'"
              ></el-cascader>
            </el-form-item>
          </div>
        </div>
        <div v-if="searchOPtions.length > 0" class="right">
          <div v-if="searchOPtions.length > 0">
               <!-- @keyup.enter.native="onSearch" -->
            <el-button
              ref="searchButton"
              size="small"
              type="primary"
              class="search-btn"
              @click="onSearch"
            >查询</el-button>
            <el-button size="small" plain @click="resetForm('searchForm')" v-if="clearable">重置</el-button>
            <div
              v-if="searchOPtions.length>3"
              style="font-size: 12px;cursor: pointer;color:#1890ff;margin-left:0;margin-right:10px"
              class="ml20 inline"
              type="text"
              size="small"
              @click="openToogle"
            >
              {{searchItemNum===minSearchItem?'展开':'收起'}}
              <i
                v-show="searchItemNum===minSearchItem"
                class="el-icon-arrow-down"
              ></i>
              <i v-show="searchItemNum===maxSearchItem" class="el-icon-arrow-up"></i>
            </div>
          </div>
        </div>
      </el-row>
    </el-form>
    <div>
      <!-- <slot></slot> -->
    </div>
  </div>
</template>
<script>
import { pickerOptions } from './searchConfig.js'
const WidthMap = {
  dateMonthPicker: 3,
  datePicker: 6,
  dateRangePicker: 6,
  datetimerange_single_param: 6,
  datetimerange: 6,
  dateTimePicker: 6,
  select: 3,
  'select-multiple': 6,
  input: 3,
  cascader: 3
}
export default {
  name: 'search',
  props: {
    clearable: {
      type: [Boolean],
      default: true
    },
    defaultValue: {
      type: [Object],
      default: null
    },
    searchOPtions: {
      type: [Array],
      required: true
    },
    otherButton: {
      type: [String],
      default: ''
    },
    leftWidth: {
      type: [String],
      default: ''
    }
  },
  data () {
    const searchForm = this.defaultValue || {}
    this.searchOPtions.map(val => {
      if (val.defaultValue) {
        searchForm[val.key] = val.defaultValue
      }
    })
    return {
      searchForm,
      searchItemNum: 4,
      minSearchItem: 4,
      maxSearchItem: 999,
      pickerOptions,
      WidthMap
    }
  },
  created () {
    this.init()
  },
  watch: {
    // 动态修改 searchOPtions 重新计算
    searchOPtions: {
      handler (val, pre) {
        if (val.length !== pre.length) {
          this.init()
        }
      }
    }
  },
  methods: {
    init () {
      if (this.calculateItemsTotalWidth(4) > 12) {
        if (this.calculateItemsTotalWidth(2) === 12) {
          this.searchItemNum = this.minSearchItem = 2
          return
        }
        if (this.calculateItemsTotalWidth(3) === 12) {
          this.searchItemNum = this.minSearchItem = 3
          return
        }
        if (this.calculateItemsTotalWidth(3) > 12) {
          this.searchItemNum = this.minSearchItem = 2
        } else {
          this.searchItemNum = this.minSearchItem = 3
        }
      }
    },
    // 计算搜索前几项宽度之和
    calculateItemsTotalWidth (count) {
      if (this.searchOPtions.length === 0) return 0
      return this.searchOPtions
        .slice(0, count)
        .map(it => WidthMap[it.type])
        .reduce((a, b) => a + b)
    },
    openToogle () {
      this.searchItemNum =
        this.searchItemNum === this.minSearchItem
          ? this.maxSearchItem
          : this.minSearchItem
    },
    onSearch () {
      const query = { ...this.searchForm }
      this.searchOPtions.map(val => {
        switch (val.type) {
          case 'dateMonthPicker':
            if (query[val.key]) {
              query[val.key] = this.$moment(query[val.key]).format('YYYY-MM')
            } else {
              delete query[val.key]
            }
            break
            //   case 'dateRangePicker':
            //     const [key_start, key_end] = val.key.split('-')
            //     if (query[val.key]) {
            //       const [time_start, time_end] = query[val.key]
            //       query[key_start] = this.$moment(time_start).format('YYYY-MM-DD')
            //       query[key_end] = this.$moment(time_end).format('YYYY-MM-DD')
            //     }
            //     delete query[val.key]
            //     break
            //   case 'datetimerange':
            //     const [key_start2, key_end2] = val.key.split('-')
            //     if (query[val.key]) {
            //       const [time_start, time_end] = query[val.key]
            //       query[key_start2] = time_start
            //       query[key_end2] = time_end
            //     }
            //     delete query[val.key]
            //   case 'datetimerange_single_param':
            //     if (query[val.key]) {
            //       const [time_start, time_end] = query[val.key]
            //       query[val.key] = `${time_start}~${time_end}`
            //     }
            //     break
        }
      })
      this.$emit('searchCallback', 'search', query)
    },
    resetForm (formName) {
      try {
        this.$refs[formName].resetFields()
        this.searchForm = {}
      } catch (e) {
        throw new Error(e)
      }
      this.$emit('searchCallback', 'reset')
    },
    selectChange (val, key) {
      this.$emit('selectChange', val, key)
    },
    keyupEnter (ref) {
      // this.$refs[ref]为Array
      this.$refs[ref][0].blur()
      this.onSearch()
      // 搜索完成后，聚焦到搜索框以便下次继续搜索
      this.$nextTick(() => {
        this.$refs.searchButton.$el.focus()
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less" scoped>
.search {
  width: 100%;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .search-form-item {
    display: inline-block;
    margin-bottom: 20px;
    width: 25%;
  }
  .left {
    width: 66%;
  }
  .right {
      padding-top:4px;
    display: flex;
    flex: 1;
    justify-content: space-between;
    margin-left: 8px;
  }
  .left-width-1 {
    width: 20%;
  }
  .left-width-2 {
    width: 40%;
  }
  .search-form-item-3 {
    width: 25%;
  }
  .search-form-item-6 {
    width: 50%;
  }
  .form-item-1 {
    width: 100%;
  }
  .form-item-2 {
    width: 50%;
  }
  .form-item-3 {
    width: 33.3%;
  }
}
</style>
<style lang="less">
.search {
  .el-form--inline {
    > div {
      margin-bottom: 0;
    }
  }
  .el-form-item--small.el-form-item {
    margin-bottom: 0;
    margin-right: 6px;
  }
  .el-form-item--small .el-form-item__content {
    height: 28px;
    line-height: 28px;
  }
}
</style>
