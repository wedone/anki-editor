### 1. Menu 菜单
- **用途**: 导航菜单
- **特点**: 支持多级菜单、路由集成

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="1">处理中心</el-menu-item>
    <el-sub-menu index="2">
      <template #title>我的工作台</template>
      <el-menu-item index="2-1">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
      <el-menu-item index="2-3">选项3</el-menu-item>
      <el-sub-menu index="2-4">
        <template #title>选项4</template>
        <el-menu-item index="2-4-1">选项1</el-menu-item>
        <el-menu-item index="2-4-2">选项2</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="3" disabled>消息中心</el-menu-item>
    <el-menu-item index="4">订单管理</el-menu-item>
  </el-menu>

  <!-- 垂直菜单 -->
  <el-menu
    :default-active="activeIndex2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon><location /></el-icon>
        <span>导航一</span>
      </template>
      <el-menu-item-group title="分组1">
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="分组2">
        <el-menu-item index="1-3">选项3</el-menu-item>
      </el-menu-item-group>
      <el-sub-menu index="1-4">
        <template #title>选项4</template>
        <el-menu-item index="1-4-1">选项1</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="2">
      <el-icon><icon-menu /></el-icon>
      <span>导航二</span>
    </el-menu-item>
    <el-menu-item index="3" disabled>
      <el-icon><document /></el-icon>
      <span>导航三</span>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon><setting /></el-icon>
      <span>导航四</span>
    </el-menu-item>
  </el-menu>

  <!-- 折叠菜单 -->
  <el-menu
    :default-active="activeIndex3"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon><location /></el-icon>
        <span>导航一</span>
      </template>
      <el-menu-item-group>
        <template #title>分组1</template>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="分组2">
        <el-menu-item index="1-3">选项3</el-menu-item>
      </el-menu-item-group>
      <el-sub-menu index="1-4">
        <template #title>选项4</template>
        <el-menu-item index="1-4-1">选项1</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="2">
      <el-icon><icon-menu /></el-icon>
      <template #title>导航二</template>
    </el-menu-item>
    <el-menu-item index="3" disabled>
      <el-icon><document /></el-icon>
      <template #title>导航三</template>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon><setting /></el-icon>
      <template #title>导航四</template>
    </el-menu-item>
  </el-menu>
  <div style="flex-grow: 1" />
  <el-button type="text" @click="isCollapse = !isCollapse">
    <el-icon><Expand /></el-icon>
  </el-button>

  <!-- 手风琴菜单 -->
  <el-menu
    :default-active="activeIndex4"
    class="el-menu-vertical-demo"
    :collapse="isCollapse2"
    unique-opened
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon><location /></el-icon>
        <span>导航一</span>
      </template>
      <el-menu-item index="1-1">选项1</el-menu-item>
      <el-menu-item index="1-2">选项2</el-menu-item>
      <el-menu-item index="1-3">选项3</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <el-icon><icon-menu /></el-icon>
        <span>导航二</span>
      </template>
      <el-menu-item index="2-1">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
      <el-menu-item index="2-3">选项3</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>
        <el-icon><document /></el-icon>
        <span>导航三</span>
      </template>
      <el-menu-item index="3-1">选项1</el-menu-item>
      <el-menu-item index="3-2">选项2</el-menu-item>
      <el-menu-item index="3-3">选项3</el-menu-item>
    </el-sub-menu>
  </el-menu>

  <!-- 带路由的菜单 -->
  <el-menu
    :default-active="$route.path"
    class="el-menu-demo"
    mode="horizontal"
    router
  >
    <el-menu-item index="/">首页</el-menu-item>
    <el-menu-item index="/about">关于</el-menu-item>
    <el-menu-item index="/contact">联系我们</el-menu-item>
  </el-menu>

  <!-- 自定义菜单 -->
  <el-menu
    :default-active="activeIndex5"
    class="custom-menu"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="1">处理中心</el-menu-item>
    <el-sub-menu index="2">
      <template #title>我的工作台</template>
      <el-menu-item index="2-1">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
      <el-menu-item index="2-3">选项3</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="3">消息中心</el-menu-item>
    <el-menu-item index="4">订单管理</el-menu-item>
  </el-menu>

  <!-- 带徽章的菜单 -->
  <el-menu
    :default-active="activeIndex6"
    class="el-menu-demo"
    mode="horizontal"
  >
    <el-menu-item index="1">
      处理中心
      <el-badge value="3" class="item" />
    </el-menu-item>
    <el-menu-item index="2">
      消息中心
      <el-badge value="99+" class="item" />
    </el-menu-item>
    <el-menu-item index="3">订单管理</el-menu-item>
  </el-menu>
</template>

<script setup>
import { ref } from 'vue'
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting,
  Expand
} from '@element-plus/icons-vue'

const activeIndex = ref('1')
const activeIndex2 = ref('1')
const activeIndex3 = ref('1')
const activeIndex4 = ref('1')
const activeIndex5 = ref('1')
const activeIndex6 = ref('1')
const isCollapse = ref(false)
const isCollapse2 = ref(false)

const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
}

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}

const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
</script>

<style scoped>
.el-menu-demo {
  padding-left: 55px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.custom-menu {
  margin-top: 20px;
}

.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| mode | 模式 | string | horizontal / vertical | vertical |
| collapse | 是否水平折叠收起菜单（仅在 mode 为 vertical 时可用） | boolean | — | false |
| background-color | 菜单的背景色（仅支持 hex 格式） | string | — | #ffffff |
| text-color | 菜单的文字颜色（仅支持 hex 格式） | string | — | #303133 |
| active-text-color | 当前激活菜单的文字颜色（仅支持 hex 格式） | string | — | #409eff |
| default-active | 当前激活菜单的 index | string | — | — |
| default-openeds | 当前打开的 sub-menu 的 index 的数组 | array | — | — |
| unique-opened | 是否只保持一个子菜单的展开 | boolean | — | false |
| menu-trigger | 子菜单打开的触发方式，只在 mode 为 horizontal 时有效 | string | hover / click | hover |
| router | 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 | boolean | — | false |
| collapse-transition | 是否开启折叠动画 | boolean | — | true |
| ellipsis | 是否省略多余的子项 | boolean | — | true |

#### 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| select | 菜单激活回调 | index: 选中菜单项的 index, indexPath: 选中菜单项的 index path |
| open | sub-menu 展开的回调 | index: 打开的 sub-menu 的 index, indexPath: 打开的 sub-menu 的 index path |
| close | sub-menu 收起的回调 | index: 收起的 sub-menu 的 index, indexPath: 收起的 sub-menu 的 index path |

#### Menu Item 属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| index | 唯一标识 | string | — | — |
| route | Vue Router 路径对象 | object | — | — |
| disabled | 是否禁用 | boolean | — | false |

#### Sub Menu 属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| index | 唯一标识 | string | — | — |
| show-timeout | 展开延时，仅在 mode 为 horizontal 时有效 | number | — | 300 |
| hide-timeout | 收起延时，仅在 mode 为 horizontal 时有效 | number | — | 300 |
| disabled | 是否禁用 | boolean | — | false |
| popper-class | 弹出菜单的自定义类名 | string | — | — |
| popper-offset | 弹出菜单的偏移 | number | — | 6 |
| expand-close-icon | 展开时的图标 | string / Component | — | ArrowDown |
| expand-open-icon | 收起时的图标 | string / Component | — | ArrowUp |
| teleported | 是否将下拉列表插入至 body 元素 | boolean | — | false |

#### Menu Group 属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| title | 分组标题 | string | — | — |

#### 插槽
| 插槽名 | 说明 |
|--------|------|
| — | Menu Item 的内容 |
| title | Sub Menu 的标题内容 |

#### 使用示例
```vue
<!-- 基础水平菜单 -->
<el-menu mode="horizontal" :default-active="activeIndex">
  <el-menu-item index="1">首页</el-menu-item>
  <el-menu-item index="2">产品</el-menu-item>
  <el-menu-item index="3">关于</el-menu-item>
</el-menu>

<!-- 垂直菜单 -->
<el-menu :default-active="activeIndex">
  <el-menu-item index="1">首页</el-menu-item>
  <el-sub-menu index="2">
    <template #title>产品</template>
    <el-menu-item index="2-1">产品一</el-menu-item>
    <el-menu-item index="2-2">产品二</el-menu-item>
  </el-sub-menu>
</el-menu>

<!-- 折叠菜单 -->
<el-menu :collapse="isCollapse">
  <el-menu-item index="1">首页</el-menu-item>
  <el-sub-menu index="2">
    <template #title>产品</template>
    <el-menu-item index="2-1">产品一</el-menu-item>
  </el-sub-menu>
</el-menu>

<!-- 路由菜单 -->
<el-menu router>
  <el-menu-item index="/">首页</el-menu-item>
  <el-menu-item index="/about">关于</el-menu-item>
</el-menu>
```

#### 样式定制
```css
/* 自定义菜单样式 */
.custom-menu {
  border-radius: 4px;
}

.custom-menu .el-menu-item {
  border-radius: 4px;
  margin: 2px 4px;
}

.custom-menu .el-menu-item:hover {
  background-color: #f5f7fa;
}

/* 响应式菜单 */
@media (max-width: 768px) {
  .el-menu--horizontal {
    flex-direction: column;
  }
  
  .el-menu--horizontal .el-menu-item {
    border-bottom: 1px solid #ebeef5;
  }
}
```

#### 使用场景
1. **网站导航**: 网站的主要导航菜单
2. **后台管理**: 管理系统的侧边栏菜单
3. **移动端菜单**: 响应式的移动端导航
4. **多级导航**: 复杂的多级菜单结构
5. **权限控制**: 根据用户权限显示不同菜单

#### 注意事项
1. **路由集成**: 使用 `router` 属性可以自动处理路由跳转
2. **权限控制**: 可以通过 `v-if` 或 `v-show` 控制菜单项的显示
3. **响应式设计**: 考虑在不同屏幕尺寸下的显示效果
4. **性能优化**: 避免在菜单中放置过多内容
5. **可访问性**: 确保菜单对键盘导航和屏幕阅读器友好 