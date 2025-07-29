### Config Provider 全局配置
- **用途**: 全局配置提供者
- **特点**: 统一管理组件库的全局配置

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-config-provider :locale="zhCn">
    <el-app>
      <el-button>按钮</el-button>
      <el-date-picker v-model="date" />
    </el-app>
  </el-config-provider>

  <!-- 配置主题 -->
  <el-config-provider :locale="zhCn" :size="size" :z-index="zIndex">
    <el-app>
      <el-button>主题按钮</el-button>
    </el-app>
  </el-config-provider>

  <!-- 配置消息 -->
  <el-config-provider :message="messageConfig">
    <el-app>
      <el-button @click="showMessage">显示消息</el-button>
    </el-app>
  </el-config-provider>

  <!-- 配置命名空间 -->
  <el-config-provider namespace="ep">
    <el-app>
      <el-button>自定义命名空间</el-button>
    </el-app>
  </el-config-provider>
</template>

<script setup>
import { ref } from 'vue'
import { ElConfigProvider, ElApp, ElButton, ElDatePicker } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

// 响应式配置
const size = ref('default')
const zIndex = ref(3000)
const date = ref('')

// 消息配置
const messageConfig = {
  max: 3,
  grouping: true,
  showClose: true,
  duration: 3000
}

// 显示消息
const showMessage = () => {
  ElMessage.success('这是一条成功消息')
}
</script>

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| locale | 语言包 | object | — | en |
| size | 全局组件大小 | string | large / default / small | default |
| z-index | 全局初始化 zIndex | number | — | 3000 |
| namespace | 全局组件类名前缀 | string | — | el |
| button | 按钮全局配置 | object | — | — |
| message | 消息全局配置 | object | — | — |
| experimental-features | 实验性功能 | object | — | — |

#### 配置对象详解

**locale 语言包配置**
```javascript
// 中文语言包
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
``` 