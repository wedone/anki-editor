### 10. Time Select 时间选择
- **用途**: 时间选择
- **特点**: 下拉式时间选择

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-time-select
    v-model="value1"
    placeholder="选择时间"
  />

  <!-- 任意时间点 -->
  <el-time-select
    v-model="value2"
    placeholder="选择时间"
    start="08:30"
    step="00:15"
    end="18:30"
  />

  <!-- 格式化 -->
  <el-time-select
    v-model="value3"
    placeholder="选择时间"
    start="08:30"
    step="00:15"
    end="18:30"
    format="HH:mm"
  />

  <!-- 禁用状态 -->
  <el-time-select
    v-model="value4"
    placeholder="选择时间"
    disabled
  />

  <!-- 可清空 -->
  <el-time-select
    v-model="value5"
    placeholder="选择时间"
    clearable
  />
</template>

<script setup>
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
const value4 = ref('')
const value5 = ref('')
</script>

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| model-value / v-model | 绑定值 | string | — | — |
| disabled | 是否禁用 | boolean | — | false |
| editable | 文本框可输入 | boolean | — | true |
| clearable | 是否显示清除按钮 | boolean | — | true |
| size | 输入框尺寸 | string | large / default / small | default |
| placeholder | 占位符 | string | — | — |
| start | 开始时间 | string | — | 09:00 |
| end | 结束时间 | string | — | 18:00 |
| step | 间隔时间 | string | — | 00:30 |
| min-time | 最小时间，小于该时间的时间选项会被禁用 | string | — | 00:00 |
| max-time | 最大时间，大于该时间的时间选项会被禁用 | string | — | — |
| format | 时间格式 | string | — | HH:mm |
| value-format | 可选，绑定值的格式。 不指定则绑定值为 Date 对象 | string | 见日期格式 | — |
| name | 原生属性 name | string | — | — |
| prefix-icon | 自定义前缀图标 | string / Component | — | Clock |
| clear-icon | 自定义清除图标 | string / Component | — | Close |
| validate-event | 输入时是否触发表单的校验 | boolean | — | true |
| teleported | 是否将下拉列表插入至 body 元素 | boolean | — | true |

#### 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 用户确认选定的值时触发 | 组件绑定值。格式与绑定值一致，可受 value-format 控制 |
| blur | 当 input 失去焦点时触发 | 组件实例 |
| focus | 当 input 获得焦点时触发 | 组件实例 | 