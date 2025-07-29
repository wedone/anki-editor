### 6. Slider 滑块
- **用途**: 滑块组件
- **特点**: 支持范围选择、自定义样式

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-slider v-model="value1" />

  <!-- 自定义初始值 -->
  <el-slider v-model="value2" />

  <!-- 禁用状态 -->
  <el-slider v-model="value3" disabled />

  <!-- 自定义步长 -->
  <el-slider v-model="value4" :step="10" />

  <!-- 显示间断点 -->
  <el-slider v-model="value5" :step="10" show-stops />

  <!-- 显示输入框 -->
  <el-slider v-model="value6" show-input />

  <!-- 范围选择 -->
  <el-slider v-model="value7" range />

  <!-- 垂直模式 -->
  <el-slider v-model="value8" vertical height="200px" />

  <!-- 自定义标记 -->
  <el-slider
    v-model="value9"
    range
    :marks="marks"
  />
</template>

<script setup>
import { ref } from 'vue'

const value1 = ref(0)
const value2 = ref(50)
const value3 = ref(0)
const value4 = ref(0)
const value5 = ref(0)
const value6 = ref(0)
const value7 = ref([20, 40])
const value8 = ref(0)
const value9 = ref([30, 60])

const marks = {
  0: '0°C',
  8: '8°C',
  37: '37°C',
  50: {
    style: {
      color: '#1989fa'
    },
    label: '50%'
  }
}
</script>

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| model-value / v-model | 绑定值 | number / array | — | 0 |
| min | 最小值 | number | — | 0 |
| max | 最大值 | number | — | 100 |
| disabled | 是否禁用 | boolean | — | false |
| step | 步长 | number | — | 1 |
| show-input | 是否显示输入框，仅在非范围选择时有效 | boolean | — | false |
| show-input-controls | 在显示输入框的情况下，是否显示输入框的控制按钮 | boolean | — | true |
| input-size | 输入框的尺寸 | string | large / default / small | default |
| show-stops | 是否显示间断点 | boolean | — | false |
| show-tooltip | 是否显示 tooltip | boolean | — | true |
| format-tooltip | 格式化 tooltip message | function | — | — |
| range | 是否为范围选择 | boolean | — | false |
| vertical | 是否竖向模式 | boolean | — | false |
| height | Slider 的高度，竖向模式时必填 | string | — | — |
| marks | 标记， key 的类型必须为 number 且取值在闭区间 [min, max] 内，每个标记可以自己设置 style | object | — | — |
| validate-event | 输入时是否触发表单的校验 | boolean | — | true |

#### 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 值改变时触发（使用鼠标拖拽时，事件在拖拽结束后触发） | 改变后的值 |
| input | 数据改变时触发（使用鼠标拖拽时，事件在拖拽过程中实时触发） | 改变后的值 | 