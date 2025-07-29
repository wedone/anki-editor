### 8. Text 文本 (2.3.0+)
- **用途**: 文本组件
- **特点**: 提供文本排版和样式控制

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-text>默认文本</el-text>
  <el-text type="primary">主要文本</el-text>
  <el-text type="success">成功文本</el-text>
  <el-text type="warning">警告文本</el-text>
  <el-text type="danger">危险文本</el-text>
  <el-text type="info">信息文本</el-text>

  <!-- 文本大小 -->
  <el-text size="large">大型文本</el-text>
  <el-text size="default">默认文本</el-text>
  <el-text size="small">小型文本</el-text>

  <!-- 文本样式 -->
  <el-text tag="b">粗体文本</el-text>
  <el-text tag="del">删除线文本</el-text>
  <el-text tag="em">斜体文本</el-text>
  <el-text tag="i">斜体文本</el-text>
  <el-text tag="mark">标记文本</el-text>
  <el-text tag="strong">强调文本</el-text>
  <el-text tag="u">下划线文本</el-text>

  <!-- 截断 -->
  <el-text truncated>这是一段很长的文本，会被截断显示</el-text>
  <el-text truncated :line-clamp="2">
    这是一段很长的文本，会被截断显示，最多显示两行
  </el-text>
</template>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| type | 文本类型 | string | primary / success / warning / danger / info | — |
| size | 文本大小 | string | large / default / small | default |
| tag | 渲染的 HTML 标签 | string | — | span |
| truncated | 是否截断 | boolean | — | false |
| line-clamp | 多行截断行数 | number | — | — | 