### 4. Container 布局容器
- **用途**: 页面布局容器
- **特点**: 支持头部、侧边栏、主要内容区域、底部布局

#### 详细用法
```vue
<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| direction | 子元素的排列方向 | string | horizontal / vertical | vertical |

#### 子组件属性
**el-header**
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| height | 顶栏高度 | string | — | 60px |

**el-aside**
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| width | 侧边栏宽度 | string | — | 300px |

**el-main**
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| — | — | — | — | — |

**el-footer**
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| height | 底栏高度 | string | — | 60px | 