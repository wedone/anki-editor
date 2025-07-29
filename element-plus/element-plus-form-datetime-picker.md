### 8. DateTime Picker 日期时间选择器
- **用途**: 日期时间选择
- **特点**: 精确到时分秒的选择

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-date-picker
    v-model="value1"
    type="datetime"
    placeholder="选择日期时间"
  />

  <!-- 日期时间范围 -->
  <el-date-picker
    v-model="value2"
    type="datetimerange"
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
  />

  <!-- 默认时间 -->
  <el-date-picker
    v-model="value3"
    type="datetime"
    placeholder="选择日期时间"
    :default-time="defaultTime"
  />

  <!-- 格式化 -->
  <el-date-picker
    v-model="value4"
    type="datetime"
    placeholder="选择日期时间"
    format="YYYY-MM-DD HH:mm:ss"
    value-format="YYYY-MM-DD HH:mm:ss"
  />

  <!-- 快捷选项 -->
  <el-date-picker
    v-model="value5"
    type="datetimerange"
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    :shortcuts="shortcuts"
  />
</template>

<script setup>
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
const value4 = ref('')
const value5 = ref('')

const defaultTime = new Date(2000, 1, 1, 12, 0, 0)

const shortcuts = [
  {
    text: '最近一周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    }
  },
  {
    text: '最近一个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    }
  }
]
</script>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| model-value / v-model | 绑定值 | Date / string / number | — | — |
| readonly | 只读 | boolean | — | false |
| disabled | 禁用 | boolean | — | false |
| editable | 文本框可输入 | boolean | — | true |
| clearable | 是否显示清除按钮 | boolean | — | true |
| size | 输入框尺寸 | string | large / default / small | default |
| placeholder | 非范围选择时的占位内容 | string | — | — |
| start-placeholder | 范围选择时开始日期的占位内容 | string | — | — |
| end-placeholder | 范围选择时结束日期的占位内容 | string | — | — |
| type | 显示类型 | string | datetime / datetimerange | datetime |
| format | 显示在输入框中的格式 | string | 见日期格式 | YYYY-MM-DD HH:mm:ss |
| popper-class | DatePicker 下拉框的类名 | string | — | — |
| range-separator | 选择范围时的分隔符 | string | — | - |
| value-format | 可选，绑定值的格式。 不指定则绑定值为 Date 对象 | string | 见日期格式 | — |
| id | 输入框 id | string | — | — |
| name | 输入框 name | string | — | — |
| unlink-panels | 在范围选择器里取消两个日期面板之间的联动 | boolean | — | false |
| prefix-icon | 自定义前缀图标 | string / Component | — | Calendar |
| clear-icon | 自定义清除图标 | string / Component | — | Close |
| validate-event | 输入时是否触发表单的校验 | boolean | — | true |
| shortcuts | 设置快捷选项，需要传入数组对象 | object[] | — | — |
| disabled-date | 设置禁用状态，参数为当前日期，要求返回 Boolean | function | — | — |
| cell-class-name | 设置日期的 className | function | — | — |
| teleported | 是否将下拉列表插入至 body 元素 | boolean | — | true |

#### 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 用户确认选定的值时触发 | 组件绑定值。格式与绑定值一致，可受 value-format 控制 |
| blur | 当 input 失去焦点时触发 | 组件实例 |
| focus | 当 input 获得焦点时触发 | 组件实例 |
| calendar-change | 如果该日期值得改变 | 返回数组格式，[组件实例, 日期] | 