# Element Plus 学习记录

## 📚 概述

Element Plus 是一个基于 Vue 3 的组件库，提供了丰富的 UI 组件，帮助开发者快速构建现代化的 Web 应用界面。

**官方文档**: https://element-plus.org/zh-CN/component/overview.html

## 🎨 基础组件 (12个)

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

### 3. Color 色彩
- **用途**: 颜色系统
- **特点**: 提供标准化的颜色体系

#### 主色调
```css
/* 主色 */
--el-color-primary: #409eff;
--el-color-primary-light-3: #79bbff;
--el-color-primary-light-5: #a0cfff;
--el-color-primary-light-7: #c6e2ff;
--el-color-primary-light-8: #d9ecff;
--el-color-primary-light-9: #ecf5ff;
--el-color-primary-dark-2: #337ecc;

/* 成功色 */
--el-color-success: #67c23a;
--el-color-success-light-3: #95d475;
--el-color-success-light-5: #b3e19d;
--el-color-success-light-7: #d1edc4;
--el-color-success-light-8: #e1f3d8;
--el-color-success-light-9: #f0f9eb;
--el-color-success-dark-2: #529b2e;

/* 警告色 */
--el-color-warning: #e6a23c;
--el-color-warning-light-3: #eebe77;
--el-color-warning-light-5: #f3d19e;
--el-color-warning-light-7: #f8e3c5;
--el-color-warning-light-8: #faecd8;
--el-color-warning-light-9: #fdf6ec;
--el-color-warning-dark-2: #b88230;

/* 危险色 */
--el-color-danger: #f56c6c;
--el-color-danger-light-3: #f78989;
--el-color-danger-light-5: #f9a7a7;
--el-color-danger-light-7: #fbc4c4;
--el-color-danger-light-8: #fcd3d3;
--el-color-danger-light-9: #fef0f0;
--el-color-danger-dark-2: #c45656;

/* 信息色 */
--el-color-info: #909399;
--el-color-info-light-3: #b1b3b8;
--el-color-info-light-5: #c8c9cc;
--el-color-info-light-7: #dedfe0;
--el-color-info-light-8: #e9e9eb;
--el-color-info-light-9: #f4f4f5;
--el-color-info-dark-2: #73767a;
```

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

### 6. Layout 布局
- **用途**: 栅格布局系统
- **特点**: 24栅格系统，响应式布局

#### 详细用法
```vue
<template>
  <el-row>
    <el-col :span="24"><div class="grid-content bg-purple-dark" /></el-col>
  </el-row>
  <el-row>
    <el-col :span="12"><div class="grid-content bg-purple" /></el-col>
    <el-col :span="12"><div class="grid-content bg-purple-light" /></el-col>
  </el-row>
  <el-row>
    <el-col :span="8"><div class="grid-content bg-purple" /></el-col>
    <el-col :span="8"><div class="grid-content bg-purple-light" /></el-col>
    <el-col :span="8"><div class="grid-content bg-purple" /></el-col>
  </el-row>
  <el-row>
    <el-col :span="6"><div class="grid-content bg-purple" /></el-col>
    <el-col :span="6"><div class="grid-content bg-purple-light" /></el-col>
    <el-col :span="6"><div class="grid-content bg-purple" /></el-col>
    <el-col :span="6"><div class="grid-content bg-purple-light" /></el-col>
  </el-row>
  <el-row>
    <el-col :span="4"><div class="grid-content bg-purple" /></el-col>
    <el-col :span="4"><div class="grid-content bg-purple-light" /></el-col>
    <el-col :span="4"><div class="grid-content bg-purple" /></el-col>
    <el-col :span="4"><div class="grid-content bg-purple-light" /></el-col>
    <el-col :span="4"><div class="grid-content bg-purple" /></el-col>
    <el-col :span="4"><div class="grid-content bg-purple-light" /></el-col>
  </el-row>
</template>
```

#### Row 属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| gutter | 栅格间隔 | number | — | 0 |
| justify | 水平排列方式 | string | start / end / center / space-around / space-between | start |
| align | 垂直排列方式 | string | top / middle / bottom | top |
| tag | 自定义元素标签 | string | * | div |

#### Col 属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| span | 栅格占据的列数 | number | — | 24 |
| offset | 栅格左侧的间隔格数 | number | — | 0 |
| push | 栅格向右移动格数 | number | — | 0 |
| pull | 栅格向左移动格数 | number | — | 0 |
| xs | <768px 响应式栅格数或者栅格属性对象 | number/object | — | — |
| sm | ≥768px 响应式栅格数或者栅格属性对象 | number/object | — | — |
| md | ≥992px 响应式栅格数或者栅格属性对象 | number/object | — | — |
| lg | ≥1200px 响应式栅格数或者栅格属性对象 | number/object | — | — |
| xl | ≥1920px 响应式栅格数或者栅格属性对象 | number/object | — | — |
| tag | 自定义元素标签 | string | * | div |

### 7. Link 链接
- **用途**: 链接组件
- **特点**: 支持不同类型和状态的链接

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-link href="https://element-plus.org" target="_blank">默认链接</el-link>
  <el-link type="primary">主要链接</el-link>
  <el-link type="success">成功链接</el-link>
  <el-link type="warning">警告链接</el-link>
  <el-link type="danger">危险链接</el-link>
  <el-link type="info">信息链接</el-link>

  <!-- 下划线 -->
  <el-link :underline="false">无下划线</el-link>
  <el-link>有下划线</el-link>

  <!-- 禁用状态 -->
  <el-link disabled>禁用链接</el-link>

  <!-- 图标 -->
  <el-link type="primary" :underline="false">
    <el-icon><Edit /></el-icon>
    编辑
  </el-link>
</template>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| type | 类型 | string | primary / success / warning / danger / info | default |
| underline | 是否下划线 | boolean | — | true |
| disabled | 是否禁用状态 | boolean | — | false |
| href | 原生 href | string | — | — |
| icon | 图标组件 | string / Component | — | — |

#### 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击事件 | (evt: MouseEvent) |

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

## ⚙️ 配置组件 (1个)

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
```

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

// 英文语言包
import en from 'element-plus/dist/locale/en.mjs'

// 自定义语言包
const customLocale = {
  name: 'zh-cn',
  el: {
    colorpicker: {
      confirm: '确定',
      clear: '清空'
    },
    datepicker: {
      now: '此刻',
      today: '今天',
      cancel: '取消',
      clear: '清空',
      confirm: '确定',
      selectDate: '选择日期',
      selectTime: '选择时间',
      startDate: '开始日期',
      startTime: '开始时间',
      endDate: '结束日期',
      endTime: '结束时间',
      prevYear: '前一年',
      nextYear: '后一年',
      prevMonth: '上个月',
      nextMonth: '下个月',
      year: '年',
      month1: '1 月',
      month2: '2 月',
      month3: '3 月',
      month4: '4 月',
      month5: '5 月',
      month6: '6 月',
      month7: '7 月',
      month8: '8 月',
      month9: '9 月',
      month10: '10 月',
      month11: '11 月',
      month12: '12 月',
      weeks: {
        sun: '日',
        mon: '一',
        tue: '二',
        wed: '三',
        thu: '四',
        fri: '五',
        sat: '六'
      },
      months: {
        jan: '一月',
        feb: '二月',
        mar: '三月',
        apr: '四月',
        may: '五月',
        jun: '六月',
        jul: '七月',
        aug: '八月',
        sep: '九月',
        oct: '十月',
        nov: '十一月',
        dec: '十二月'
      }
    },
    select: {
      loading: '加载中',
      noMatch: '无匹配数据',
      noData: '无数据',
      placeholder: '请选择'
    },
    pagination: {
      goto: '前往',
      pagesize: '条/页',
      total: '共 {total} 条',
      pageClassifier: '页',
      page: '页',
      prev: '上一页',
      next: '下一页',
      currentPage: '第 {pager} 页',
      prevPages: '向前 {pager} 页',
      nextPages: '向后 {pager} 页',
      deprecationWarning: '你使用了一些已被废弃的用法，请参考 el-pagination 的官方文档'
    },
    messagebox: {
      title: '提示',
      confirm: '确定',
      cancel: '取消',
      error: '输入的数据不合法!'
    },
    upload: {
      deleteTip: '按 delete 键可删除',
      delete: '删除',
      preview: '查看图片',
      continue: '继续上传'
    },
    table: {
      emptyText: '暂无数据',
      confirmFilter: '筛选',
      resetFilter: '重置',
      clearFilter: '全部',
      sumText: '合计'
    },
    tree: {
      emptyText: '暂无数据'
    },
    transfer: {
      noMatch: '无匹配数据',
      noData: '无数据',
      titles: ['列表 1', '列表 2'],
      filterPlaceholder: '请输入搜索内容',
      noCheckedFormat: '共 {total} 项',
      hasCheckedFormat: '已选 {checked}/{total} 项'
    },
    image: {
      error: '加载失败'
    },
    pageHeader: {
      title: '返回'
    },
    popconfirm: {
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }
  }
}
```

**button 按钮全局配置**
```javascript
const buttonConfig = {
  autoInsertSpace: true, // 自动在两个中文字符之间插入空格
  text: false, // 是否使用文字按钮
  link: false, // 是否使用链接按钮
  bg: false, // 是否显示背景色
  size: 'default', // 按钮尺寸
  type: 'default' // 按钮类型
}
```

**message 消息全局配置**
```javascript
const messageConfig = {
  max: 3, // 最大显示数量
  grouping: true, // 是否合并相同内容的消息
  showClose: true, // 是否显示关闭按钮
  duration: 3000, // 显示时间
  customClass: '', // 自定义类名
  dangerouslyUseHTMLString: false, // 是否将 message 属性作为 HTML 字符串处理
  center: false, // 是否居中显示
  onClose: null // 关闭时的回调函数
}
```

**experimental-features 实验性功能**
```javascript
const experimentalFeatures = {
  // 实验性功能配置
  // 具体功能根据版本而定
}
```

#### 使用场景

**1. 国际化配置**
```vue
<template>
  <el-config-provider :locale="currentLocale">
    <el-app>
      <!-- 所有子组件都会使用配置的语言包 -->
      <el-date-picker v-model="date" />
      <el-pagination :total="100" />
    </el-app>
  </el-config-provider>
</template>

<script setup>
import { ref } from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'

const currentLocale = ref(zhCn)

// 切换语言
const switchLanguage = (lang) => {
  currentLocale.value = lang === 'zh' ? zhCn : en
}
</script>
```

**2. 主题配置**
```vue
<template>
  <el-config-provider :size="size" :z-index="zIndex">
    <el-app>
      <el-button @click="changeSize">切换尺寸</el-button>
      <el-input placeholder="输入框" />
      <el-select placeholder="选择器">
        <el-option label="选项1" value="1" />
        <el-option label="选项2" value="2" />
      </el-select>
    </el-app>
  </el-config-provider>
</template>

<script setup>
import { ref } from 'vue'

const size = ref('default')
const zIndex = ref(3000)

const changeSize = () => {
  const sizes = ['large', 'default', 'small']
  const currentIndex = sizes.indexOf(size.value)
  size.value = sizes[(currentIndex + 1) % sizes.length]
}
</script>
```

**3. 消息配置**
```vue
<template>
  <el-config-provider :message="messageConfig">
    <el-app>
      <el-button @click="showSuccess">成功消息</el-button>
      <el-button @click="showError">错误消息</el-button>
      <el-button @click="showWarning">警告消息</el-button>
    </el-app>
  </el-config-provider>
</template>

<script setup>
import { ElMessage } from 'element-plus'

const messageConfig = {
  max: 5,
  grouping: true,
  showClose: true,
  duration: 5000,
  center: true
}

const showSuccess = () => {
  ElMessage.success('操作成功！')
}

const showError = () => {
  ElMessage.error('操作失败！')
}

const showWarning = () => {
  ElMessage.warning('警告信息！')
}
</script>
```

**4. 命名空间配置**
```vue
<template>
  <el-config-provider namespace="ep">
    <el-app>
      <!-- 使用自定义命名空间，CSS 类名会变成 ep-button 等 -->
      <el-button>自定义命名空间按钮</el-button>
    </el-app>
  </el-config-provider>
</template>

<style>
/* 使用自定义命名空间的样式 */
.ep-button {
  background-color: #409eff;
}
</style>
```

#### 最佳实践

1. **全局配置**: 在应用的根组件中使用 Config Provider 进行全局配置
2. **响应式配置**: 使用 ref 或 reactive 使配置具有响应性
3. **按需配置**: 只配置需要的属性，避免不必要的性能开销
4. **语言包管理**: 将语言包配置集中管理，便于维护
5. **主题切换**: 结合 CSS 变量实现动态主题切换

#### 注意事项

1. **嵌套使用**: Config Provider 可以嵌套使用，内层配置会覆盖外层配置
2. **性能考虑**: 频繁变化的配置会影响性能，建议使用响应式配置
3. **版本兼容**: 某些配置项可能在不同版本中有变化，需要查看对应版本的文档
4. **实验性功能**: 实验性功能可能不稳定，生产环境谨慎使用

## 📝 表单组件 (22个)

### 1. Input 输入框
- **用途**: 基础输入框
- **特点**: 支持多种类型、验证、格式化

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-input v-model="input" placeholder="请输入内容" />

  <!-- 禁用状态 -->
  <el-input v-model="input" disabled placeholder="禁用状态" />

  <!-- 可清空 -->
  <el-input v-model="input" clearable placeholder="可清空" />

  <!-- 密码框 -->
  <el-input v-model="input" type="password" placeholder="请输入密码" show-password />

  <!-- 带图标 -->
  <el-input v-model="input" placeholder="请输入内容">
    <template #prefix>
      <el-icon><Search /></el-icon>
    </template>
  </el-input>

  <!-- 文本域 -->
  <el-input v-model="textarea" type="textarea" :rows="2" placeholder="请输入内容" />

  <!-- 复合型输入框 -->
  <el-input v-model="input" placeholder="请输入内容">
    <template #append>
      <el-button>搜索</el-button>
    </template>
  </el-input>

  <!-- 尺寸 -->
  <el-input v-model="input" size="large" placeholder="大型输入框" />
  <el-input v-model="input" placeholder="默认输入框" />
  <el-input v-model="input" size="small" placeholder="小型输入框" />
</template>

<script setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'

const input = ref('')
const textarea = ref('')
</script>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| type | 类型 | string | text / textarea / password | text |
| model-value / v-model | 绑定值 | string / number | — | — |
| maxlength | 最大输入长度 | string / number | — | — |
| minlength | 最小输入长度 | string / number | — | — |
| show-word-limit | 是否显示输入字数统计 | boolean | — | false |
| placeholder | 输入框占位文本 | string | — | — |
| clearable | 是否可清空 | boolean | — | false |
| show-password | 是否显示切换密码图标 | boolean | — | false |
| disabled | 是否禁用 | boolean | — | false |
| size | 输入框尺寸 | string | large / default / small | default |
| prefix-icon | 输入框头部图标 | string / Component | — | — |
| suffix-icon | 输入框尾部图标 | string / Component | — | — |
| rows | 输入框行数，只对 type="textarea" 有效 | number | — | 2 |
| autosize | 自适应内容高度，只对 type="textarea" 有效 | boolean / object | — | false |
| autocomplete | 原生属性，自动完成 | string | on / off | off |
| name | 原生属性 | string | — | — |
| readonly | 原生属性，是否只读 | boolean | — | false |
| max | 原生属性，设置最大值 | — | — | — |
| min | 原生属性，设置最小值 | — | — | — |
| step | 原生属性，设置输入字段的合法数字间隔 | — | — | — |
| tabindex | 输入框的 tabindex | string / number | — | — |
| validate-event | 输入时是否触发表单的校验 | boolean | — | true |
| input-style | 控制 input 元素的样式 | object | — | {} |

#### 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| blur | 在 Input 失去焦点时触发 | (event: Event) |
| focus | 在 Input 获得焦点时触发 | (event: Event) |
| change | 在值改变时触发 | (value: string \| number) |
| input | 在值改变时触发 | (value: string \| number) |
| clear | 在点击清空按钮时触发 | — |

#### 插槽
| 插槽名 | 说明 |
|--------|------|
| prefix | 输入框头部内容 |
| suffix | 输入框尾部内容 |
| prepend | 输入框前置内容 |
| append | 输入框后置内容 |

### 2. Select 选择器
- **用途**: 下拉选择
- **特点**: 支持单选、多选、搜索、分组

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-select v-model="value" placeholder="请选择">
    <el-option label="选项1" value="1" />
    <el-option label="选项2" value="2" />
    <el-option label="选项3" value="3" />
  </el-select>

  <!-- 禁用状态 -->
  <el-select v-model="value" disabled placeholder="禁用状态">
    <el-option label="选项1" value="1" />
  </el-select>

  <!-- 可清空选项 -->
  <el-select v-model="value" clearable placeholder="请选择">
    <el-option label="选项1" value="1" />
    <el-option label="选项2" value="2" />
  </el-select>

  <!-- 多选 -->
  <el-select v-model="value1" multiple placeholder="请选择">
    <el-option label="选项1" value="1" />
    <el-option label="选项2" value="2" />
    <el-option label="选项3" value="3" />
  </el-select>

  <!-- 自定义模板 -->
  <el-select v-model="value" placeholder="请选择">
    <el-option label="选项1" value="1">
      <span style="float: left">选项1</span>
      <span style="float: right; color: #8492a6; font-size: 13px">选项1</span>
    </el-option>
    <el-option label="选项2" value="2">
      <span style="float: left">选项2</span>
      <span style="float: right; color: #8492a6; font-size: 13px">选项2</span>
    </el-option>
  </el-select>

  <!-- 分组 -->
  <el-select v-model="value" placeholder="请选择">
    <el-option-group label="热门城市">
      <el-option label="上海" value="shanghai" />
      <el-option label="北京" value="beijing" />
    </el-option-group>
    <el-option-group label="城市名">
      <el-option label="成都" value="chengdu" />
      <el-option label="深圳" value="shenzhen" />
    </el-option-group>
  </el-select>

  <!-- 可搜索 -->
  <el-select v-model="value" filterable placeholder="请选择">
    <el-option label="选项1" value="1" />
    <el-option label="选项2" value="2" />
    <el-option label="选项3" value="3" />
  </el-select>

  <!-- 远程搜索 -->
  <el-select
    v-model="value"
    filterable
    remote
    reserve-keyword
    placeholder="请输入关键词"
    :remote-method="remoteMethod"
    :loading="loading"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
const value1 = ref([])
const loading = ref(false)
const options = ref([])

const remoteMethod = (query) => {
  if (query !== '') {
    loading.value = true
    setTimeout(() => {
      loading.value = false
      options.value = [
        { value: query, label: query },
        { value: query + query, label: query + query }
      ]
    }, 2000)
  } else {
    options.value = []
  }
}
</script>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| model-value / v-model | 绑定值 | boolean / string / number | — | — |
| multiple | 是否多选 | boolean | — | false |
| disabled | 是否禁用 | boolean | — | false |
| value-key | 作为 value 唯一标识的键名，绑定值为对象类型时必填 | string | — | value |
| size | 输入框尺寸 | string | large / default / small | default |
| clearable | 是否可以清空选项 | boolean | — | false |
| collapse-tags | 多选时是否将选中值按文字的形式展示 | boolean | — | false |
| collapse-tags-tooltip | 当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签。 要使用此功能，collapse-tags 属性必须设定为 true | boolean | — | false |
| multiple-limit | 多选时用户最多可以选择的项目数，为 0 则不限制 | number | — | 0 |
| name | select input 的 name 属性 | string | — | — |
| effect | Tooltip 主题，内置了 dark / light 两种 | string | dark / light | light |
| id | select input 的 id 属性 | string | — | — |
| autocomplete | select input 的 autocomplete 属性 | string | — | off |
| placeholder | 占位符 | string | — | Select |
| filterable | 是否可搜索 | boolean | — | false |
| allow-create | 是否允许用户创建新条目， 只有当 filterable 设置为 true 时才会生效 | boolean | — | false |
| filter-method | 自定义搜索方法 | function | — | — |
| remote | 是否为远程搜索 | boolean | — | false |
| remote-method | 远程搜索方法 | function | — | — |
| loading | 是否正在从远程获取数据 | boolean | — | false |
| loading-text | 远程加载时显示的文字 | string | — | Loading |
| no-match-text | 搜索条件无匹配时显示的文字，也可以使用 empty 插槽 | string | — | No matching data |
| no-data-text | 选项为空时显示的文字，也可以使用 empty 插槽 | string | — | No data |
| popper-class | 下拉框的类名 | string | — | — |
| reserve-keyword | 多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词 | boolean | — | true |
| default-first-option | 在输入新标签时，按下回车键是否默认选中第一个选项。 需配合 filterable 或 allow-create 使用 | boolean | — | false |
| teleported | 是否将下拉列表插入至 body 元素 | boolean | — | true |
| persistent | 当下拉选择器未被激活并且persistent设置为false，选择器会被删除 | boolean | — | true |
| clear-icon | 自定义清除图标 | string / Component | — | Close |
| fit-input-width | 下拉框的宽度是否与输入框相同 | boolean | — | false |
| suffix-icon | 自定义后缀图标 | string / Component | — | ArrowDown |
| tag-type | 标签类型 | string | success / info / warning / danger | — |
| validate-event | 输入时是否触发表单的校验 | boolean | — | true |

#### 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 选中值发生变化时触发 | 目前的选中值 |
| visible-change | 下拉框出现/隐藏时触发 | 出现则为 true，隐藏则为 false |
| remove-tag | 多选模式下移除tag时触发 | 移除的tag值 |
| clear | 可清空的单选模式下用户点击清空按钮时触发 | — |
| blur | 当 input 失去焦点时触发 | (event: Event) |
| focus | 当 input 获得焦点时触发 | (event: Event) |

#### 插槽
| 插槽名 | 说明 |
|--------|------|
| — | Option 组件列表 |
| prefix | Select 组件头部内容 |
| empty | 无选项时的列表 |

### 3. Checkbox 多选框
- **用途**: 多选组件
- **特点**: 支持单个和组选择

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-checkbox v-model="checked">选项1</el-checkbox>

  <!-- 禁用状态 -->
  <el-checkbox v-model="checked1" disabled>禁用</el-checkbox>
  <el-checkbox v-model="checked2" disabled>选中且禁用</el-checkbox>

  <!-- 多选框组 -->
  <el-checkbox-group v-model="checkList">
    <el-checkbox label="选项 A" />
    <el-checkbox label="选项 B" />
    <el-checkbox label="选项 C" />
  </el-checkbox-group>

  <!-- 带有边框 -->
  <el-checkbox-group v-model="checkList1" size="large">
    <el-checkbox label="选项 A" border />
    <el-checkbox label="选项 B" border />
  </el-checkbox-group>

  <!-- 按钮样式 -->
  <el-checkbox-group v-model="checkList2">
    <el-checkbox-button label="上海" />
    <el-checkbox-button label="北京" />
    <el-checkbox-button label="广州" />
    <el-checkbox-button label="深圳" />
  </el-checkbox-group>

  <!-- 限制数量 -->
  <el-checkbox-group v-model="checkedCities" :min="1" :max="2">
    <el-checkbox label="上海" />
    <el-checkbox label="北京" />
    <el-checkbox label="广州" />
    <el-checkbox label="深圳" />
  </el-checkbox-group>

  <!-- 中间状态 -->
  <el-checkbox
    v-model="checkAll"
    :indeterminate="isIndeterminate"
    @change="handleCheckAllChange"
  >
    全选
  </el-checkbox>
  <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
    <el-checkbox label="上海" />
    <el-checkbox label="北京" />
    <el-checkbox label="广州" />
    <el-checkbox label="深圳" />
  </el-checkbox-group>
</template>

<script setup>
import { ref } from 'vue'

const checked = ref(false)
const checked1 = ref(false)
const checked2 = ref(true)
const checkList = ref(['选中且禁用', '复选框 A'])
const checkList1 = ref(['选项 A'])
const checkList2 = ref(['上海'])
const checkedCities = ref(['上海', '北京'])
const checkAll = ref(false)
const isIndeterminate = ref(true)

const handleCheckAllChange = (val) => {
  checkedCities.value = val ? cityOptions : []
  isIndeterminate.value = false
}

const handleCheckedCitiesChange = (value) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === cityOptions.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < cityOptions.length
}

const cityOptions = ['上海', '北京', '广州', '深圳']
</script>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| model-value / v-model | 绑定值 | string / number / boolean | — | — |
| label | 选中状态的值（只有在checkbox-group或者绑定对象类型为array时有效） | string / number / boolean | — | — |
| true-label | 选中时的值 | string / number | — | — |
| false-label | 没有选中时的值 | string / number | — | — |
| disabled | 是否禁用 | boolean | — | false |
| border | 是否显示边框 | boolean | — | false |
| size | Checkbox 的尺寸，仅在 border 为真时有效 | string | large / default / small | default |
| name | 原生 name 属性 | string | — | — |
| checked | 当前是否勾选 | boolean | — | false |
| indeterminate | 设置 indeterminate 状态，只负责样式控制 | boolean | — | false |

#### 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 当绑定值变化时触发的事件 | 更新后的值 |

### 4. Radio 单选框
- **用途**: 单选组件
- **特点**: 支持单个和组选择

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-radio v-model="radio" label="1">选项1</el-radio>
  <el-radio v-model="radio" label="2">选项2</el-radio>

  <!-- 禁用状态 -->
  <el-radio v-model="radio1" disabled label="禁用">禁用</el-radio>
  <el-radio v-model="radio1" disabled label="选中且禁用">选中且禁用</el-radio>

  <!-- 单选框组 -->
  <el-radio-group v-model="radio2">
    <el-radio label="1">选项1</el-radio>
    <el-radio label="2">选项2</el-radio>
    <el-radio label="3">选项3</el-radio>
  </el-radio-group>

  <!-- 按钮样式 -->
  <el-radio-group v-model="radio3">
    <el-radio-button label="上海" />
    <el-radio-button label="北京" />
    <el-radio-button label="广州" />
    <el-radio-button label="深圳" />
  </el-radio-group>

  <!-- 带有边框 -->
  <el-radio-group v-model="radio4" size="large">
    <el-radio label="1" border>选项1</el-radio>
    <el-radio label="2" border>选项2</el-radio>
  </el-radio-group>

  <!-- 自定义 -->
  <el-radio-group v-model="radio5">
    <el-radio label="1">
      <span style="color: #f56c6c">选项1</span>
    </el-radio>
    <el-radio label="2">
      <span style="color: #409eff">选项2</span>
    </el-radio>
  </el-radio-group>
</template>

<script setup>
import { ref } from 'vue'

const radio = ref('1')
const radio1 = ref('选中且禁用')
const radio2 = ref('1')
const radio3 = ref('上海')
const radio4 = ref('1')
const radio5 = ref('1')
</script>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| model-value / v-model | 绑定值 | string / number / boolean | — | — |
| label | 单选框的值 | string / number / boolean | — | — |
| disabled | 是否禁用 | boolean | — | false |
| border | 是否显示边框 | boolean | — | false |
| size | 单选框的尺寸，仅在 border 为真时有效 | string | large / default / small | default |
| name | 原生 name 属性 | string | — | — |

#### 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 绑定值变化时触发的事件 | 更新后的值 |

### 5. Switch 开关
- **用途**: 开关组件
- **特点**: 支持自定义样式和状态

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-switch v-model="value1" />

  <!-- 禁用状态 -->
  <el-switch v-model="value2" disabled />

  <!-- 文字描述 -->
  <el-switch
    v-model="value3"
    active-text="开启"
    inactive-text="关闭"
  />

  <!-- 自定义值 -->
  <el-switch
    v-model="value4"
    active-value="100"
    inactive-value="0"
  />

  <!-- 自定义颜色 -->
  <el-switch
    v-model="value5"
    active-color="#13ce66"
    inactive-color="#ff4949"
  />

  <!-- 自定义图标 -->
  <el-switch
    v-model="value6"
    active-icon="Check"
    inactive-icon="Close"
  />

  <!-- 扩展的 value 类型 -->
  <el-switch
    v-model="value7"
    :active-value="{ a: 1, b: 2 }"
    :inactive-value="{ a: 3, b: 4 }"
  />

  <!-- 加载状态 -->
  <el-switch v-model="value8" loading />

  <!-- 不同尺寸 -->
  <el-switch v-model="value9" size="large" />
  <el-switch v-model="value9" />
  <el-switch v-model="value9" size="small" />
</template>

<script setup>
import { ref } from 'vue'

const value1 = ref(true)
const value2 = ref(true)
const value3 = ref(true)
const value4 = ref('100')
const value5 = ref(true)
const value6 = ref(true)
const value7 = ref({ a: 1, b: 2 })
const value8 = ref(true)
const value9 = ref(true)
</script>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| model-value / v-model | 绑定值 | boolean / string / number | — | — |
| disabled | 是否禁用 | boolean | — | false |
| loading | 是否显示加载中 | boolean | — | false |
| size | switch 的大小 | string | large / default / small | default |
| width | switch 的宽度（像素） | number / string | — | 40 |
| active-icon | switch 打开时所显示图标的类名，设置此项会忽略 active-text | string / Component | — | — |
| inactive-icon | switch 关闭时所显示图标的类名，设置此项会忽略 inactive-text | string / Component | — | — |
| active-text | switch 打开时的文字描述 | string | — | — |
| inactive-text | switch 关闭时的文字描述 | string | — | — |
| active-value | switch 打开时的值 | boolean / string / number | — | true |
| inactive-value | switch 关闭时的值 | boolean / string / number | — | false |
| active-color | switch 打开时的背景色 | string | — | #409eff |
| inactive-color | switch 关闭时的背景色 | string | — | #c0ccda |
| border-color | switch 的边框颜色 | string | — | #dcdfe6 |
| name | switch 对应的 name 属性 | string | — | — |
| id | switch 对应的 id 属性 | string | — | — |
| validate-event | 改变时是否触发表单验证 | boolean | — | true |

#### 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | switch 状态发生变化时的回调函数 | 新状态的值 |

### 6. Slider 滑块
- **用途**: 滑块组件
- **特点**: 支持范围选择、自定义样式

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-slider v-model="value1" />

  <!-- 自定义初始值 -->
  <el-slider v-model="value2" />

  <!-- 禁用状态 -->
  <el-slider v-model="value3" disabled />

  <!-- 自定义步长 -->
  <el-slider v-model="value4" :step="10" />

  <!-- 显示间断点 -->
  <el-slider v-model="value5" :step="10" show-stops />

  <!-- 显示输入框 -->
  <el-slider v-model="value6" show-input />

  <!-- 范围选择 -->
  <el-slider v-model="value7" range />

  <!-- 垂直模式 -->
  <el-slider v-model="value8" vertical height="200px" />

  <!-- 自定义标记 -->
  <el-slider
    v-model="value9"
    range
    :marks="marks"
  />
</template>

<script setup>
import { ref } from 'vue'

const value1 = ref(0)
const value2 = ref(50)
const value3 = ref(0)
const value4 = ref(0)
const value5 = ref(0)
const value6 = ref(0)
const value7 = ref([20, 40])
const value8 = ref(0)
const value9 = ref([30, 60])

const marks = {
  0: '0°C',
  8: '8°C',
  37: '37°C',
  50: {
    style: {
      color: '#1989fa'
    },
    label: '50%'
  }
}
</script>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| model-value / v-model | 绑定值 | number / array | — | 0 |
| min | 最小值 | number | — | 0 |
| max | 最大值 | number | — | 100 |
| disabled | 是否禁用 | boolean | — | false |
| step | 步长 | number | — | 1 |
| show-input | 是否显示输入框，仅在非范围选择时有效 | boolean | — | false |
| show-input-controls | 在显示输入框的情况下，是否显示输入框的控制按钮 | boolean | — | true |
| input-size | 输入框的尺寸 | string | large / default / small | default |
| show-stops | 是否显示间断点 | boolean | — | false |
| show-tooltip | 是否显示 tooltip | boolean | — | true |
| format-tooltip | 格式化 tooltip message | function | — | — |
| range | 是否为范围选择 | boolean | — | false |
| vertical | 是否竖向模式 | boolean | — | false |
| height | Slider 的高度，竖向模式时必填 | string | — | — |
| marks | 标记， key 的类型必须为 number 且取值在闭区间 [min, max] 内，每个标记可以自己设置 style | object | — | — |
| validate-event | 输入时是否触发表单的校验 | boolean | — | true |

#### 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 值改变时触发（使用鼠标拖拽时，事件在拖拽结束后触发） | 改变后的值 |
| input | 数据改变时触发（使用鼠标拖拽时，事件在拖拽过程中实时触发） | 改变后的值 |

### 7. Date Picker 日期选择器
- **用途**: 日期选择
- **特点**: 支持多种日期格式和范围选择

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-date-picker
    v-model="value1"
    type="date"
    placeholder="选择日期"
  />

  <!-- 其他日期单位 -->
  <el-date-picker
    v-model="value2"
    type="month"
    placeholder="选择月份"
  />
  <el-date-picker
    v-model="value3"
    type="year"
    placeholder="选择年份"
  />
  <el-date-picker
    v-model="value4"
    type="week"
    format="YYYY 第 WW 周"
    placeholder="选择周"
  />

  <!-- 多个日期 -->
  <el-date-picker
    v-model="value5"
    type="dates"
    placeholder="选择一个或多个日期"
  />

  <!-- 日期范围 -->
  <el-date-picker
    v-model="value6"
    type="daterange"
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
  />

  <!-- 月份范围 -->
  <el-date-picker
    v-model="value7"
    type="monthrange"
    range-separator="至"
    start-placeholder="开始月份"
    end-placeholder="结束月份"
  />

  <!-- 默认时间 -->
  <el-date-picker
    v-model="value8"
    type="date"
    placeholder="选择日期"
    :default-time="defaultTime"
  />

  <!-- 格式化 -->
  <el-date-picker
    v-model="value9"
    type="date"
    placeholder="选择日期"
    format="YYYY/MM/DD"
    value-format="YYYY-MM-DD"
  />

  <!-- 快捷选项 -->
  <el-date-picker
    v-model="value10"
    type="daterange"
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    :shortcuts="shortcuts"
  />
</template>

<script setup>
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
const value4 = ref('')
const value5 = ref('')
const value6 = ref('')
const value7 = ref('')
const value8 = ref('')
const value9 = ref('')
const value10 = ref('')

const defaultTime = new Date(2000, 1, 1, 12, 0, 0)

const shortcuts = [
  {
    text: '最近一周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    }
  },
  {
    text: '最近一个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    }
  },
  {
    text: '最近三个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    }
  }
]
</script>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| model-value / v-model | 绑定值 | Date / string / number | — | — |
| readonly | 只读 | boolean | — | false |
| disabled | 禁用 | boolean | — | false |
| size | 输入框尺寸 | string | large / default / small | default |
| editable | 文本框可输入 | boolean | — | true |
| clearable | 是否显示清除按钮 | boolean | — | true |
| placeholder | 非范围选择时的占位内容 | string | — | — |
| start-placeholder | 范围选择时开始日期的占位内容 | string | — | — |
| end-placeholder | 范围选择时结束日期的占位内容 | string | — | — |
| type | 显示类型 | string | date / dates / datetime / datetimerange / daterange / month / monthrange / year / week | date |
| format | 显示在输入框中的格式 | string | 见日期格式 | YYYY-MM-DD |
| popper-class | DatePicker 下拉框的类名 | string | — | — |
| range-separator | 选择范围时的分隔符 | string | — | - |
| value-format | 可选，绑定值的格式。 不指定则绑定值为 Date 对象 | string | 见日期格式 | — |
| id | 输入框 id | string | — | — |
| name | 输入框 name | string | — | — |
| unlink-panels | 在范围选择器里取消两个日期面板之间的联动 | boolean | — | false |
| prefix-icon | 自定义前缀图标 | string / Component | — | Calendar |
| clear-icon | 自定义清除图标 | string / Component | — | Close |
| validate-event | 输入时是否触发表单的校验 | boolean | — | true |
| shortcuts | 设置快捷选项，需要传入数组对象 | object[] | — | — |
| disabled-date | 设置禁用状态，参数为当前日期，要求返回 Boolean | function | — | — |
| cell-class-name | 设置日期的 className | function | — | — |
| teleported | 是否将下拉列表插入至 body 元素 | boolean | — | true |

#### 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 用户确认选定的值时触发 | 组件绑定值。格式与绑定值一致，可受 value-format 控制 |
| blur | 当 input 失去焦点时触发 | 组件实例 |
| focus | 当 input 获得焦点时触发 | 组件实例 |
| calendar-change | 如果该日期值得改变 | 返回数组格式，[组件实例, 日期] |

### 8. DateTime Picker 日期时间选择器
- **用途**: 日期时间选择
- **特点**: 精确到时分秒的选择

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-date-picker
    v-model="value1"
    type="datetime"
    placeholder="选择日期时间"
  />

  <!-- 日期时间范围 -->
  <el-date-picker
    v-model="value2"
    type="datetimerange"
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
  />

  <!-- 默认时间 -->
  <el-date-picker
    v-model="value3"
    type="datetime"
    placeholder="选择日期时间"
    :default-time="defaultTime"
  />

  <!-- 格式化 -->
  <el-date-picker
    v-model="value4"
    type="datetime"
    placeholder="选择日期时间"
    format="YYYY-MM-DD HH:mm:ss"
    value-format="YYYY-MM-DD HH:mm:ss"
  />

  <!-- 快捷选项 -->
  <el-date-picker
    v-model="value5"
    type="datetimerange"
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    :shortcuts="shortcuts"
  />
</template>

<script setup>
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
const value4 = ref('')
const value5 = ref('')

const defaultTime = new Date(2000, 1, 1, 12, 0, 0)

const shortcuts = [
  {
    text: '最近一周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    }
  },
  {
    text: '最近一个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    }
  }
]
</script>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| model-value / v-model | 绑定值 | Date / string / number | — | — |
| readonly | 只读 | boolean | — | false |
| disabled | 禁用 | boolean | — | false |
| editable | 文本框可输入 | boolean | — | true |
| clearable | 是否显示清除按钮 | boolean | — | true |
| size | 输入框尺寸 | string | large / default / small | default |
| placeholder | 非范围选择时的占位内容 | string | — | — |
| start-placeholder | 范围选择时开始日期的占位内容 | string | — | — |
| end-placeholder | 范围选择时结束日期的占位内容 | string | — | — |
| time-arrow-control | 是否使用箭头进行时间选择 | boolean | — | false |
| type | 显示类型 | string | datetime / datetimerange | datetime |
| format | 显示在输入框中的格式 | string | 见日期格式 | YYYY-MM-DD HH:mm:ss |
| popper-class | DatePicker 下拉框的类名 | string | — | — |
| range-separator | 选择范围时的分隔符 | string | — | - |
| value-format | 可选，绑定值的格式。 不指定则绑定值为 Date 对象 | string | 见日期格式 | — |
| id | 输入框 id | string | — | — |
| name | 输入框 name | string | — | — |
| unlink-panels | 在范围选择器里取消两个日期面板之间的联动 | boolean | — | false |
| prefix-icon | 自定义前缀图标 | string / Component | — | Calendar |
| clear-icon | 自定义清除图标 | string / Component | — | Close |
| validate-event | 输入时是否触发表单的校验 | boolean | — | true |
| shortcuts | 设置快捷选项，需要传入数组对象 | object[] | — | — |
| disabled-date | 设置禁用状态，参数为当前日期，要求返回 Boolean | function | — | — |
| cell-class-name | 设置日期的 className | function | — | — |
| teleported | 是否将下拉列表插入至 body 元素 | boolean | — | true |

### 9. Time Picker 时间选择器
- **用途**: 时间选择
- **特点**: 支持时分秒选择

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-time-picker
    v-model="value1"
    placeholder="选择时间"
  />

  <!-- 时间范围 -->
  <el-time-picker
    v-model="value2"
    is-range
    range-separator="至"
    start-placeholder="开始时间"
    end-placeholder="结束时间"
  />

  <!-- 任意时间点 -->
  <el-time-picker
    v-model="value3"
    placeholder="选择时间"
    :picker-options="{
      selectableRange: '18:30:00 - 20:30:00'
    }"
  />

  <!-- 格式化 -->
  <el-time-picker
    v-model="value4"
    placeholder="选择时间"
    format="HH:mm"
    value-format="HH:mm:ss"
  />

  <!-- 步长 -->
  <el-time-picker
    v-model="value5"
    placeholder="选择时间"
    :picker-options="{
      step: '00:30'
    }"
  />

  <!-- 默认时间 -->
  <el-time-picker
    v-model="value6"
    placeholder="选择时间"
    :picker-options="{
      selectableRange: '18:30:00 - 20:30:00'
    }"
    arrow-control
  />
</template>

<script setup>
import { ref } from 'vue'

const value1 = ref(new Date(2016, 9, 10, 18, 40))
const value2 = ref([
  new Date(2016, 9, 10, 8, 40),
  new Date(2016, 9, 10, 9, 40)
])
const value3 = ref(new Date(2016, 9, 10, 18, 40))
const value4 = ref('')
const value5 = ref(new Date(2016, 9, 10, 18, 40))
const value6 = ref(new Date(2016, 9, 10, 18, 40))
</script>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| model-value / v-model | 绑定值 | Date | — | — |
| readonly | 完全只读 | boolean | — | false |
| disabled | 禁用 | boolean | — | false |
| editable | 文本框可输入 | boolean | — | true |
| clearable | 是否显示清除按钮 | boolean | — | true |
| size | 输入框尺寸 | string | large / default / small | default |
| placeholder | 非范围选择时的占位内容 | string | — | — |
| start-placeholder | 范围选择时开始日期的占位内容 | string | — | — |
| end-placeholder | 范围选择时结束日期的占位内容 | string | — | — |
| is-range | 是否为时间范围选择 | boolean | — | false |
| arrow-control | 是否使用箭头进行时间选择 | boolean | — | false |
| align | 对齐方式 | string | left / center / right | left |
| popper-class | TimePicker 下拉框的类名 | string | — | — |
| range-separator | 选择范围时的分隔符 | string | — | - |
| format | 显示在输入框中的格式 | string | 见日期格式 | HH:mm:ss |
| value-format | 可选，绑定值的格式。 不指定则绑定值为 Date 对象 | string | 见日期格式 | — |
| id | 输入框 id | string | — | — |
| name | 输入框 name | string | — | — |
| prefix-icon | 自定义前缀图标 | string / Component | — | Clock |
| clear-icon | 自定义清除图标 | string / Component | — | Close |
| validate-event | 输入时是否触发表单的校验 | boolean | — | true |
| teleported | 是否将下拉列表插入至 body 元素 | boolean | — | true |

#### 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 用户确认选定的值时触发 | 组件绑定值。格式与绑定值一致，可受 value-format 控制 |
| blur | 当 input 失去焦点时触发 | 组件实例 |
| focus | 当 input 获得焦点时触发 | 组件实例 |

### 10. Time Select 时间选择
- **用途**: 时间选择
- **特点**: 下拉式时间选择

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-time-select
    v-model="value1"
    placeholder="选择时间"
  />

  <!-- 任意时间点 -->
  <el-time-select
    v-model="value2"
    placeholder="选择时间"
    start="08:30"
    step="00:15"
    end="18:30"
  />

  <!-- 格式化 -->
  <el-time-select
    v-model="value3"
    placeholder="选择时间"
    start="08:30"
    step="00:15"
    end="18:30"
    format="HH:mm"
  />

  <!-- 禁用状态 -->
  <el-time-select
    v-model="value4"
    placeholder="选择时间"
    disabled
  />

  <!-- 可清空 -->
  <el-time-select
    v-model="value5"
    placeholder="选择时间"
    clearable
  />
</template>

<script setup>
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
const value4 = ref('')
const value5 = ref('')
</script>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| model-value / v-model | 绑定值 | string | — | — |
| disabled | 是否禁用 | boolean | — | false |
| editable | 文本框可输入 | boolean | — | true |
| clearable | 是否显示清除按钮 | boolean | — | true |
| size | 输入框尺寸 | string | large / default / small | default |
| placeholder | 占位符 | string | — | — |
| start | 开始时间 | string | — | 09:00 |
| end | 结束时间 | string | — | 18:00 |
| step | 间隔时间 | string | — | 00:30 |
| min-time | 最小时间，小于该时间的时间选项会被禁用 | string | — | 00:00 |
| max-time | 最大时间，大于该时间的时间选项会被禁用 | string | — | — |
| format | 时间格式 | string | — | HH:mm |
| value-format | 可选，绑定值的格式。 不指定则绑定值为 Date 对象 | string | 见日期格式 | — |
| name | 原生属性 name | string | — | — |
| prefix-icon | 自定义前缀图标 | string / Component | — | Clock |
| clear-icon | 自定义清除图标 | string / Component | — | Close |
| validate-event | 输入时是否触发表单的校验 | boolean | — | true |
| teleported | 是否将下拉列表插入至 body 元素 | boolean | — | true |

#### 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 用户确认选定的值时触发 | 组件绑定值。格式与绑定值一致，可受 value-format 控制 |
| blur | 当 input 失去焦点时触发 | 组件实例 |
| focus | 当 input 获得焦点时触发 | 组件实例 |

### 11. Upload 上传
- **用途**: 文件上传
- **特点**: 支持拖拽、多文件、进度显示

### 12. Form 表单
- **用途**: 表单容器
- **特点**: 支持验证、布局、提交处理

### 13. Autocomplete 自动补全输入框
- **用途**: 自动完成输入
- **特点**: 支持搜索建议、自定义匹配

### 14. Cascader 级联选择器
- **用途**: 级联选择
- **特点**: 支持多级数据选择

### 15. Color Picker 取色器
- **用途**: 颜色选择
- **特点**: 支持多种颜色格式

### 16. Input Number 数字输入框
- **用途**: 数字输入
- **特点**: 支持步长、范围限制

### 17. Input Tag 标签输入框 (2.9.0+)
- **用途**: 标签输入
- **特点**: 支持动态添加删除标签

### 18. Mention 提及 (2.8.0+)
- **用途**: 提及功能
- **特点**: 支持@提及用户

### 19. Rate 评分
- **用途**: 评分组件
- **特点**: 支持自定义图标、半星评分

### 20. Transfer 穿梭框
- **用途**: 数据穿梭
- **特点**: 支持双向数据转移

### 21. TreeSelect 树形选择 (2.1.8+)
- **用途**: 树形选择器
- **特点**: 支持树形结构数据选择

### 22. Virtualized Select 虚拟化选择器
- **用途**: 大数据量选择器
- **特点**: 优化大数据量渲染性能

## 📊 数据展示组件 (23个)

### 1. Table 表格
- **用途**: 数据表格
- **特点**: 支持排序、筛选、分页、选择

### 2. Virtualized Table 虚拟化表格 (2.2.0+)
- **用途**: 大数据量表格
- **特点**: 优化大数据量渲染性能

### 3. Card 卡片
- **用途**: 卡片容器
- **特点**: 支持头部、内容、操作区域

### 4. Avatar 头像
- **用途**: 用户头像
- **特点**: 支持图片、文字、图标头像

### 5. Badge 徽章
- **用途**: 徽章标记
- **特点**: 支持数字、文字、点状徽章

### 6. Tag 标签
- **用途**: 标签组件
- **特点**: 支持多种类型、可关闭

### 7. Progress 进度条
- **用途**: 进度显示
- **特点**: 支持线性、环形进度条

### 8. Pagination 分页
- **用途**: 分页组件
- **特点**: 支持多种分页模式

### 9. Tree 树形控件
- **用途**: 树形结构
- **特点**: 支持展开、选择、搜索

### 10. Virtualized Tree 虚拟化树形控件
- **用途**: 大数据量树形控件
- **特点**: 优化大数据量渲染性能

### 11. Timeline 时间线
- **用途**: 时间线
- **特点**: 支持多种时间线样式

### 12. Calendar 日历
- **用途**: 日历组件
- **特点**: 支持事件显示、日期选择

### 13. Carousel 走马灯
- **用途**: 轮播图
- **特点**: 支持自动播放、指示器

### 14. Collapse 折叠面板
- **用途**: 折叠内容
- **特点**: 支持手风琴模式

### 15. Descriptions 描述列表
- **用途**: 描述信息
- **特点**: 支持响应式布局

### 16. Empty 空状态
- **用途**: 空数据状态
- **特点**: 提供友好的空状态提示

### 17. Image 图片
- **用途**: 图片组件
- **特点**: 支持预览、懒加载

### 18. Skeleton 骨架屏
- **用途**: 加载骨架
- **特点**: 提供加载状态的占位

### 19. Result 结果
- **用途**: 结果页面
- **特点**: 支持成功、失败、警告等状态

### 20. Statistic 统计组件 (2.2.30+)
- **用途**: 统计数据
- **特点**: 支持数字动画、前缀后缀

### 21. Segmented 分段控制器 (2.7.0+)
- **用途**: 分段控制
- **特点**: 支持分段选择器

### 22. Infinite Scroll 无限滚动
- **用途**: 无限滚动
- **特点**: 支持触底加载更多

### 23. Tour 漫游式引导 (2.5.0+)
- **用途**: 用户引导
- **特点**: 支持步骤式用户引导

## 🧭 导航组件 (9个)

### 1. Menu 菜单
- **用途**: 导航菜单
- **特点**: 支持多级菜单、路由集成

### 2. Tabs 标签页
- **用途**: 标签页切换
- **特点**: 支持多种标签页样式

### 3. Breadcrumb 面包屑
- **用途**: 面包屑导航
- **特点**: 显示页面层级关系

### 4. Dropdown 下拉菜单
- **用途**: 下拉菜单
- **特点**: 支持触发方式、菜单项配置

### 5. Steps 步骤条
- **用途**: 步骤指示器
- **特点**: 支持垂直、水平布局

### 6. Affix 固钉
- **用途**: 固定定位
- **特点**: 支持滚动固定

### 7. Anchor 锚点 (2.6.0+)
- **用途**: 锚点导航
- **特点**: 支持页面内导航

### 8. Backtop 回到顶部
- **用途**: 返回顶部
- **特点**: 支持自定义触发条件

### 9. Page Header 页头
- **用途**: 页面头部
- **特点**: 提供页面标题和操作区域

## 💬 反馈组件 (10个)

### 1. Dialog 对话框
- **用途**: 弹窗对话框
- **特点**: 支持多种类型、自定义内容

### 2. Message 消息提示
- **用途**: 消息提示
- **特点**: 支持多种类型、自动关闭

### 3. Notification 通知
- **用途**: 通知消息
- **特点**: 支持多种类型、自定义位置

### 4. Alert 提示
- **用途**: 警告提示
- **特点**: 支持多种类型、可关闭

### 5. Loading 加载
- **用途**: 加载状态
- **特点**: 支持全屏、局部加载

### 6. Message Box 消息弹出框
- **用途**: 确认对话框
- **特点**: 支持多种类型、自定义按钮

### 7. Drawer 抽屉
- **用途**: 抽屉组件
- **特点**: 支持多种方向、自定义内容

### 8. Popover 弹出框
- **用途**: 弹出提示
- **特点**: 支持多种触发方式

### 9. Tooltip 文字提示
- **用途**: 文字提示
- **特点**: 支持多种位置、自定义内容

### 10. Popconfirm 气泡确认框
- **用途**: 确认提示
- **特点**: 支持自定义确认操作

## 🔧 其他组件 (2个)

### 1. Divider 分割线
- **用途**: 分割线
- **特点**: 支持水平和垂直分割线

### 2. Watermark 水印 (2.4.0+)
- **用途**: 水印组件
- **特点**: 支持文字和图片水印

## 🚀 最佳实践

### 1. 组件选择原则
- **功能匹配**: 根据具体需求选择合适的组件
- **性能考虑**: 大数据量场景优先使用虚拟化组件
- **用户体验**: 选择合适的反馈组件提升交互体验

### 2. 版本兼容性
- 注意组件标注的版本号，确保 Element Plus 版本支持
- 新版本组件可能提供更好的性能和功能

### 3. 响应式设计
- 结合 Container、Layout 等布局组件
- 使用 Grid 系统实现响应式布局

### 4. 主题定制
- 使用 Config Provider 进行全局配置
- 支持 CSS 变量进行主题定制

### 5. 性能优化
- 大数据量场景使用虚拟化组件
- 合理使用懒加载和分页
- 避免不必要的组件渲染

## 📝 学习总结

Element Plus 提供了完整的组件生态，涵盖了现代 Web 应用开发中的各种需求：

1. **组件丰富**: 79个组件覆盖所有常见场景
2. **版本更新**: 持续更新，新功能不断加入
3. **性能优化**: 提供虚拟化组件处理大数据量
4. **易于使用**: 统一的 API 设计，学习成本低
5. **高度可定制**: 支持主题定制和样式覆盖

通过合理使用这些组件，可以大大提高开发效率，构建出美观且功能完整的 Vue 3 应用。
