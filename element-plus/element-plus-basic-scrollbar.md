### 9. Scrollbar 滚动条
- **用途**: 自定义滚动条
- **特点**: 可自定义样式的滚动条组件

#### 详细用法
```vue
<template>
  <el-scrollbar height="400px">
    <div v-for="item in 20" :key="item" class="scrollbar-demo-item">
      {{ item }}
    </div>
  </el-scrollbar>
</template>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| height | 容器高度 | string / number | — | — |
| max-height | 容器最大高度 | string / number | — | — |
| always | 总是显示滚动条 | boolean | — | false |
| min-size | 滚动条最小尺寸 | number | — | 6 | 