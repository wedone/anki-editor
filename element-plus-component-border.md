### 2. Border 边框
- **用途**: 边框样式组件
- **特点**: 提供统一的边框样式规范

#### 详细用法
```vue
<template>
  <!-- 基础边框 -->
  <div class="el-border">
    <div class="el-border--top"></div>
    <div class="el-border--right"></div>
    <div class="el-border--bottom"></div>
    <div class="el-border--left"></div>
  </div>

  <!-- 边框样式 -->
  <div class="el-border--dashed">虚线边框</div>
  <div class="el-border--solid">实线边框</div>
</template>
```

#### CSS 类名
| 类名 | 说明 |
|------|------|
| el-border | 边框容器 |
| el-border--top | 上边框 |
| el-border--right | 右边框 |
| el-border--bottom | 下边框 |
| el-border--left | 左边框 |
| el-border--dashed | 虚线边框 |
| el-border--solid | 实线边框 |