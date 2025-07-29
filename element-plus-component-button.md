### 1. Button 按钮
- **用途**: 常用的操作按钮
- **特点**: 支持多种类型、尺寸、状态
- **常用属性**: `type`、`size`、`disabled`、`loading`

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-button>默认按钮</el-button>
  <el-button type="primary">主要按钮</el-button>
  <el-button type="success">成功按钮</el-button>
  <el-button type="warning">警告按钮</el-button>
  <el-button type="danger">危险按钮</el-button>
  <el-button type="info">信息按钮</el-button>

  <!-- 不同尺寸 -->
  <el-button size="large">大型按钮</el-button>
  <el-button size="default">默认尺寸</el-button>
  <el-button size="small">小型按钮</el-button>

  <!-- 状态 -->
  <el-button disabled>禁用按钮</el-button>
  <el-button loading>加载中</el-button>
  <el-button :loading="loading" @click="handleClick">
    {{ loading ? '加载中' : '点击加载' }}
  </el-button>

  <!-- 图标按钮 -->
  <el-button type="primary" :icon="Search">搜索</el-button>
  <el-button type="primary" :icon="Edit" circle></el-button>
</template>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| type | 按钮类型 | string | primary / success / warning / danger / info / text | — |
| size | 按钮尺寸 | string | large / default / small | default |
| disabled | 是否禁用 | boolean | — | false |
| loading | 是否加载中 | boolean | — | false |
| icon | 图标组件 | string / Component | — | — |
| circle | 是否圆形按钮 | boolean | — | false |
| round | 是否圆角按钮 | boolean | — | false |
| plain | 是否朴素按钮 | boolean | — | false |
| link | 是否链接按钮 | boolean | — | false |
| text | 是否文字按钮 | boolean | — | false |
| bg | 是否显示背景色 | boolean | — | false |
| autofocus | 是否默认聚焦 | boolean | — | false |
| native-type | 原生 type 属性 | string | button / submit / reset | button |

#### 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击事件 | (evt: MouseEvent) |