### 4. Radio 单选框
- **用途**: 单选组件
- **特点**: 支持单个和组选择

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-radio v-model="radio" label="1">选项1</el-radio>
  <el-radio v-model="radio" label="2">选项2</el-radio>

  <!-- 禁用状态 -->
  <el-radio v-model="radio1" disabled label="禁用">禁用</el-radio>
  <el-radio v-model="radio1" disabled label="选中且禁用">选中且禁用</el-radio>

  <!-- 单选框组 -->
  <el-radio-group v-model="radio2">
    <el-radio label="1">选项1</el-radio>
    <el-radio label="2">选项2</el-radio>
    <el-radio label="3">选项3</el-radio>
  </el-radio-group>

  <!-- 按钮样式 -->
  <el-radio-group v-model="radio3">
    <el-radio-button label="上海" />
    <el-radio-button label="北京" />
    <el-radio-button label="广州" />
    <el-radio-button label="深圳" />
  </el-radio-group>

  <!-- 带有边框 -->
  <el-radio-group v-model="radio4" size="large">
    <el-radio label="1" border>选项1</el-radio>
    <el-radio label="2" border>选项2</el-radio>
  </el-radio-group>

  <!-- 自定义 -->
  <el-radio-group v-model="radio5">
    <el-radio label="1">
      <span style="color: #f56c6c">选项1</span>
    </el-radio>
    <el-radio label="2">
      <span style="color: #409eff">选项2</span>
    </el-radio>
  </el-radio-group>
</template>

<script setup>
import { ref } from 'vue'

const radio = ref('1')
const radio1 = ref('选中且禁用')
const radio2 = ref('1')
const radio3 = ref('上海')
const radio4 = ref('1')
const radio5 = ref('1')
</script>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| model-value / v-model | 绑定值 | string / number / boolean | — | — |
| label | 单选框的值 | string / number / boolean | — | — |
| disabled | 是否禁用 | boolean | — | false |
| border | 是否显示边框 | boolean | — | false |
| size | 单选框的尺寸，仅在 border 为真时有效 | string | large / default / small | default |
| name | 原生 name 属性 | string | — | — |

#### 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 绑定值变化时触发的事件 | 更新后的值 |

#### Radio Group 属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| model-value / v-model | 绑定值 | string / number / boolean | — | — |
| disabled | 是否禁用 | boolean | — | false |
| text-color | 按钮形式的 Radio 激活时的文字颜色 | string | — | #ffffff |
| fill | 按钮形式的 Radio 激活时的填充色和边框色 | string | — | #409eff |
| size | 单选框组尺寸，仅对按钮形式的 Radio 或带有边框的 Radio 有效 | string | large / default / small | default |
| name | 原生 name 属性 | string | — | — |
| id | 原生 id 属性 | string | — | — |

#### Radio Group 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 绑定值变化时触发的事件 | 更新后的值 |

#### Radio Button 属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| label | 单选框的值 | string / number / boolean | — | — |
| disabled | 是否禁用 | boolean | — | false |
| name | 原生 name 属性 | string | — | — | 