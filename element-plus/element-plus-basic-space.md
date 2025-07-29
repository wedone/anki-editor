### 10. Space 间距
- **用途**: 间距组件
- **特点**: 统一管理元素间距

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-space>
    <el-button>按钮1</el-button>
    <el-button>按钮2</el-button>
    <el-button>按钮3</el-button>
  </el-space>

  <!-- 垂直间距 -->
  <el-space direction="vertical" size="large">
    <el-button>按钮1</el-button>
    <el-button>按钮2</el-button>
    <el-button>按钮3</el-button>
  </el-space>

  <!-- 不同尺寸 -->
  <el-space size="small">
    <el-button>小间距</el-button>
    <el-button>小间距</el-button>
  </el-space>
  <el-space size="default">
    <el-button>默认间距</el-button>
    <el-button>默认间距</el-button>
  </el-space>
  <el-space size="large">
    <el-button>大间距</el-button>
    <el-button>大间距</el-button>
  </el-space>

  <!-- 自定义间距 -->
  <el-space :size="20">
    <el-button>自定义间距</el-button>
    <el-button>自定义间距</el-button>
  </el-space>

  <!-- 换行 -->
  <el-space wrap>
    <el-button v-for="i in 20" :key="i">按钮{{ i }}</el-button>
  </el-space>
</template>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| alignment | flex 布局下的水平排列方式 | string | start / end / center / baseline | — |
| class | 自定义类名 | string | — | — |
| direction | 间距方向 | string | vertical / horizontal | horizontal |
| prefix-cls | 设置前缀类名 | string | — | el-space |
| size | 间距大小 | string / number / [number, number] | small / default / large | default |
| spacer | 间隔符 | string / number / VNode | — | — |
| style | 自定义样式 | CSSProperties | — | — |
| wrap | 是否自动换行 | boolean | — | false | 