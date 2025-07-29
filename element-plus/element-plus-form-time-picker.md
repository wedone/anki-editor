### 9. Time Picker 时间选择器
- **用途**: 时间选择
- **特点**: 支持时分秒选择

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-time-picker
    v-model="value1"
    placeholder="选择时间"
  />

  <!-- 时间范围 -->
  <el-time-picker
    v-model="value2"
    is-range
    range-separator="至"
    start-placeholder="开始时间"
    end-placeholder="结束时间"
  />

  <!-- 任意时间点 -->
  <el-time-picker
    v-model="value3"
    placeholder="选择时间"
    :picker-options="{
      selectableRange: '18:30:00 - 20:30:00'
    }"
  />

  <!-- 格式化 -->
  <el-time-picker
    v-model="value4"
    placeholder="选择时间"
    format="HH:mm"
    value-format="HH:mm:ss"
  />

  <!-- 步长 -->
  <el-time-picker
    v-model="value5"
    placeholder="选择时间"
    :picker-options="{
      step: '00:30'
    }"
  />

  <!-- 默认时间 -->
  <el-time-picker
    v-model="value6"
    placeholder="选择时间"
    :picker-options="{
      selectableRange: '18:30:00 - 20:30:00'
    }"
    arrow-control
  />
</template>

<script setup>
import { ref } from 'vue'

const value1 = ref(new Date(2016, 9, 10, 18, 40))
const value2 = ref([
  new Date(2016, 9, 10, 8, 40),
  new Date(2016, 9, 10, 9, 40)
])
const value3 = ref(new Date(2016, 9, 10, 18, 40))
const value4 = ref('')
const value5 = ref(new Date(2016, 9, 10, 18, 40))
const value6 = ref(new Date(2016, 9, 10, 18, 40))
</script>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| model-value / v-model | 绑定值 | Date | — | — |
| readonly | 完全只读 | boolean | — | false |
| disabled | 禁用 | boolean | — | false |
| editable | 文本框可输入 | boolean | — | true |
| clearable | 是否显示清除按钮 | boolean | — | true |
| size | 输入框尺寸 | string | large / default / small | default |
| placeholder | 非范围选择时的占位内容 | string | — | — |
| start-placeholder | 范围选择时开始日期的占位内容 | string | — | — |
| end-placeholder | 范围选择时结束日期的占位内容 | string | — | — |
| is-range | 是否为时间范围选择 | boolean | — | false |
| arrow-control | 是否使用箭头进行时间选择 | boolean | — | false |
| align | 对齐方式 | string | left / center / right | left |
| popper-class | TimePicker 下拉框的类名 | string | — | — |
| range-separator | 选择范围时的分隔符 | string | — | - |
| format | 显示在输入框中的格式 | string | 见日期格式 | HH:mm:ss |
| value-format | 可选，绑定值的格式。 不指定则绑定值为 Date 对象 | string | 见日期格式 | — |
| id | 输入框 id | string | — | — |
| name | 输入框 name | string | — | — |
| prefix-icon | 自定义前缀图标 | string / Component | — | Clock |
| clear-icon | 自定义清除图标 | string / Component | — | Close |
| validate-event | 输入时是否触发表单的校验 | boolean | — | true |
| teleported | 是否将下拉列表插入至 body 元素 | boolean | — | true | 