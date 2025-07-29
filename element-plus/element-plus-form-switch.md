### 5. Switch 开关
- **用途**: 开关组件
- **特点**: 支持自定义样式和状态

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-switch v-model="value1" />

  <!-- 禁用状态 -->
  <el-switch v-model="value2" disabled />

  <!-- 文字描述 -->
  <el-switch
    v-model="value3"
    active-text="开启"
    inactive-text="关闭"
  />

  <!-- 自定义值 -->
  <el-switch
    v-model="value4"
    active-value="100"
    inactive-value="0"
  />

  <!-- 自定义颜色 -->
  <el-switch
    v-model="value5"
    active-color="#13ce66"
    inactive-color="#ff4949"
  />

  <!-- 自定义图标 -->
  <el-switch
    v-model="value6"
    active-icon="Check"
    inactive-icon="Close"
  />

  <!-- 扩展的 value 类型 -->
  <el-switch
    v-model="value7"
    :active-value="{ a: 1, b: 2 }"
    :inactive-value="{ a: 3, b: 4 }"
  />

  <!-- 加载状态 -->
  <el-switch v-model="value8" loading />

  <!-- 不同尺寸 -->
  <el-switch v-model="value9" size="large" />
  <el-switch v-model="value9" />
  <el-switch v-model="value9" size="small" />
</template>

<script setup>
import { ref } from 'vue'

const value1 = ref(true)
const value2 = ref(true)
const value3 = ref(true)
const value4 = ref('100')
const value5 = ref(true)
const value6 = ref(true)
const value7 = ref({ a: 1, b: 2 })
const value8 = ref(true)
const value9 = ref(true)
</script>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| model-value / v-model | 绑定值 | boolean / string / number | — | — |
| disabled | 是否禁用 | boolean | — | false |
| loading | 是否显示加载中 | boolean | — | false |
| size | switch 的大小 | string | large / default / small | default |
| width | switch 的宽度（像素） | number / string | — | 40 |
| active-icon | switch 打开时所显示图标的类名，设置此项会忽略 active-text | string / Component | — | — |
| inactive-icon | switch 关闭时所显示图标的类名，设置此项会忽略 inactive-text | string / Component | — | — |
| active-text | switch 打开时的文字描述 | string | — | — |
| inactive-text | switch 关闭时的文字描述 | string | — | — |
| active-value | switch 打开时的值 | boolean / string / number | — | true |
| inactive-value | switch 关闭时的值 | boolean / string / number | — | false |
| active-color | switch 打开时的背景色 | string | — | #409eff |
| inactive-color | switch 关闭时的背景色 | string | — | #c0ccda |
| border-color | switch 的边框颜色 | string | — | #dcdfe6 |
| name | switch 对应的 name 属性 | string | — | — |
| id | switch 对应的 id 属性 | string | — | — |
| validate-event | 改变时是否触发表单验证 | boolean | — | true |

#### 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | switch 状态发生变化时的回调函数 | 新状态的值 | 