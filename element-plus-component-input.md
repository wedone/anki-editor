### 1. Input 输入框
- **用途**: 基础输入框
- **特点**: 支持多种类型、验证、格式化

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-input v-model="input" placeholder="请输入内容" />

  <!-- 禁用状态 -->
  <el-input v-model="input" disabled placeholder="禁用状态" />

  <!-- 可清空 -->
  <el-input v-model="input" clearable placeholder="可清空" />

  <!-- 密码框 -->
  <el-input v-model="input" type="password" placeholder="请输入密码" show-password />

  <!-- 带图标 -->
  <el-input v-model="input" placeholder="请输入内容">
    <template #prefix>
      <el-icon><Search /></el-icon>
    </template>
  </el-input>

  <!-- 文本域 -->
  <el-input v-model="textarea" type="textarea" :rows="2" placeholder="请输入内容" />

  <!-- 复合型输入框 -->
  <el-input v-model="input" placeholder="请输入内容">
    <template #append>
      <el-button>搜索</el-button>
    </template>
  </el-input>

  <!-- 尺寸 -->
  <el-input v-model="input" size="large" placeholder="大型输入框" />
  <el-input v-model="input" placeholder="默认输入框" />
  <el-input v-model="input" size="small" placeholder="小型输入框" />
</template>

<script setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'

const input = ref('')
const textarea = ref('')
</script>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| type | 类型 | string | text / textarea / password | text |
| model-value / v-model | 绑定值 | string / number | — | — |
| maxlength | 最大输入长度 | string / number | — | — |
| minlength | 最小输入长度 | string / number | — | — |
| show-word-limit | 是否显示输入字数统计 | boolean | — | false |
| placeholder | 输入框占位文本 | string | — | — |
| clearable | 是否可清空 | boolean | — | false |
| show-password | 是否显示切换密码图标 | boolean | — | false |
| disabled | 是否禁用 | boolean | — | false |
| size | 输入框尺寸 | string | large / default / small | default |
| prefix-icon | 输入框头部图标 | string / Component | — | — |
| suffix-icon | 输入框尾部图标 | string / Component | — | — |
| rows | 输入框行数，只对 type="textarea" 有效 | number | — | 2 |
| autosize | 自适应内容高度，只对 type="textarea" 有效 | boolean / object | — | false |
| autocomplete | 原生属性，自动完成 | string | on / off | off |
| name | 原生属性 | string | — | — |
| readonly | 原生属性，是否只读 | boolean | — | false |
| max | 原生属性，设置最大值 | — | — | — |
| min | 原生属性，设置最小值 | — | — | — |
| step | 原生属性，设置输入字段的合法数字间隔 | — | — | — |
| tabindex | 输入框的 tabindex | string / number | — | — |
| validate-event | 输入时是否触发表单的校验 | boolean | — | true |
| input-style | 控制 input 元素的样式 | object | — | {} |

#### 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| blur | 在 Input 失去焦点时触发 | (event: Event) |
| focus | 在 Input 获得焦点时触发 | (event: Event) |
| change | 在值改变时触发 | (value: string \| number) |
| input | 在值改变时触发 | (value: string \| number) |
| clear | 在点击清空按钮时触发 | — |

#### 插槽
| 插槽名 | 说明 |
|--------|------|
| prefix | 输入框头部内容 |
| suffix | 输入框尾部内容 |
| prepend | 输入框前置内容 |
| append | 输入框后置内容 | 