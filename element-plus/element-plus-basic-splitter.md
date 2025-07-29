### 11. Splitter 分隔面板 (2.10.0+)
- **用途**: 可拖拽分隔面板
- **特点**: 支持拖拽调整面板大小

#### 详细用法
```vue
<template>
  <el-splitter style="height: 300px">
    <el-splitter-pane :size="30">
      <div class="pane-content">左侧面板</div>
    </el-splitter-pane>
    <el-splitter-pane :size="70">
      <div class="pane-content">右侧面板</div>
    </el-splitter-pane>
  </el-splitter>
</template>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| model-value | 分隔条位置 | number | — | 50 |
| min | 最小尺寸 | number | — | 0 |
| max | 最大尺寸 | number | — | 100 |
| step | 拖拽步长 | number | — | 1 |
| orientation | 分隔方向 | string | horizontal / vertical | horizontal | 