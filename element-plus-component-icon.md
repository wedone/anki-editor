### 5. Icon 图标
- **用途**: 图标组件
- **特点**: 丰富的图标库，支持自定义图标

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-icon><Edit /></el-icon>
  <el-icon><Share /></el-icon>
  <el-icon><Delete /></el-icon>

  <!-- 图标颜色 -->
  <el-icon color="#409eff"><Edit /></el-icon>
  <el-icon color="#67c23a"><Share /></el-icon>
  <el-icon color="#e6a23c"><Delete /></el-icon>

  <!-- 图标尺寸 -->
  <el-icon :size="20"><Edit /></el-icon>
  <el-icon :size="24"><Share /></el-icon>
  <el-icon :size="30"><Delete /></el-icon>

  <!-- 图标动画 -->
  <el-icon class="is-loading"><Loading /></el-icon>
</template>

<script setup>
import { Edit, Share, Delete, Loading } from '@element-plus/icons-vue'
</script>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| size | 图标尺寸 | number / string | — | 1em |
| color | 图标颜色 | string | — | currentColor |

#### CSS 类名
| 类名 | 说明 |
|------|------|
| is-loading | 旋转动画 | 