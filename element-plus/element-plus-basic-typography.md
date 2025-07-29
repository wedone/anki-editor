### 12. Typography 排版
- **用途**: 文字排版组件
- **特点**: 提供标题、段落等排版组件

#### 详细用法
```vue
<template>
  <!-- 标题 -->
  <el-title :level="1">一级标题</el-title>
  <el-title :level="2">二级标题</el-title>
  <el-title :level="3">三级标题</el-title>
  <el-title :level="4">四级标题</el-title>
  <el-title :level="5">五级标题</el-title>
  <el-title :level="6">六级标题</el-title>

  <!-- 段落 -->
  <el-paragraph>
    这是一个段落，包含了一些文本内容。
  </el-paragraph>

  <!-- 段落样式 -->
  <el-paragraph :spacing="'loose'">宽松间距段落</el-paragraph>
  <el-paragraph :spacing="'default'">默认间距段落</el-paragraph>
  <el-paragraph :spacing="'tight'">紧凑间距段落</el-paragraph>

  <!-- 文本块 -->
  <el-blockquote>
    这是一个引用块，用于突出显示重要的文本内容。
  </el-blockquote>
</template>
```

#### Title 属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| level | 标题级别 | number | 1 / 2 / 3 / 4 / 5 / 6 | 1 |

#### Paragraph 属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| spacing | 段落间距 | string | loose / default / tight | default | 