### 6. Layout 布局
- **用途**: 页面布局容器
- **特点**: 支持多种布局方式，响应式设计

#### 详细用法
```vue
<template>
  <div>
    <!-- 基础布局 -->
    <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
    </el-container>

    <!-- 经典布局 -->
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>

    <!-- 常见页面布局 -->
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
      <el-footer>Footer</el-footer>
    </el-container>

    <!-- 侧边栏布局 -->
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>

    <!-- 响应式布局 -->
    <el-container class="responsive-layout">
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px" class="responsive-aside">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>

    <!-- 自定义高度布局 -->
    <el-container style="height: 500px">
      <el-header height="60px">Header</el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>

    <!-- 嵌套布局 -->
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">
          <el-container style="height: 100%">
            <el-header height="50px">Aside Header</el-header>
            <el-main>Aside Content</el-main>
          </el-container>
        </el-aside>
        <el-container>
          <el-main>Main Content</el-main>
          <el-footer height="60px">Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>

    <!-- 固定头部和侧边栏 -->
    <el-container class="fixed-layout">
      <el-header height="60px" class="fixed-header">Header</el-header>
      <el-container>
        <el-aside width="200px" class="fixed-aside">Aside</el-aside>
        <el-main class="fixed-main">Main</el-main>
      </el-container>
    </el-container>

    <!-- 可折叠侧边栏 -->
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside :width="isCollapse ? '64px' : '200px'" class="collapsible-aside">
          <div class="aside-content">
            <el-button @click="toggleCollapse" type="text">
              <el-icon><Fold v-if="!isCollapse" /><Expand v-else /></el-icon>
            </el-button>
            <div v-show="!isCollapse">Aside Content</div>
          </div>
        </el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>

    <!-- 多级布局 -->
    <el-container>
      <el-header>Top Header</el-header>
      <el-container>
        <el-aside width="200px">Left Aside</el-aside>
        <el-container>
          <el-header height="50px">Sub Header</el-header>
          <el-container>
            <el-aside width="150px">Right Aside</el-aside>
            <el-main>Main Content</el-main>
          </el-container>
        </el-container>
      </el-container>
    </el-container>

    <!-- 卡片式布局 -->
    <el-container class="card-layout">
      <el-header class="card-header">
        <el-card shadow="never">
          <div class="header-content">
            <h2>应用标题</h2>
            <div class="header-actions">
              <el-button type="primary">操作按钮</el-button>
            </div>
          </div>
        </el-card>
      </el-header>
      <el-container>
        <el-aside width="200px" class="card-aside">
          <el-card shadow="never">
            <div class="aside-content">
              <h3>导航菜单</h3>
              <el-menu default-active="1">
                <el-menu-item index="1">菜单项1</el-menu-item>
                <el-menu-item index="2">菜单项2</el-menu-item>
                <el-menu-item index="3">菜单项3</el-menu-item>
              </el-menu>
            </div>
          </el-card>
        </el-aside>
        <el-main class="card-main">
          <el-card shadow="never">
            <div class="main-content">
              <h3>主要内容</h3>
              <p>这里是主要内容区域</p>
            </div>
          </el-card>
        </el-main>
      </el-container>
    </el-container>

    <!-- 后台管理系统布局 -->
    <el-container class="admin-layout">
      <el-header class="admin-header">
        <div class="header-left">
          <h2>管理系统</h2>
        </div>
        <div class="header-right">
          <el-dropdown>
            <span class="user-info">
              管理员 <el-icon><ArrowDown /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px" class="admin-aside">
          <el-menu default-active="1" class="admin-menu">
            <el-menu-item index="1">
              <el-icon><House /></el-icon>
              <span>首页</span>
            </el-menu-item>
            <el-menu-item index="2">
              <el-icon><User /></el-icon>
              <span>用户管理</span>
            </el-menu-item>
            <el-menu-item index="3">
              <el-icon><Setting /></el-icon>
              <span>系统设置</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="admin-main">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          </el-breadcrumb>
          <div class="main-content">
            <h3>用户管理</h3>
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="name" label="姓名" width="180" />
              <el-table-column prop="email" label="邮箱" width="180" />
              <el-table-column prop="role" label="角色" />
            </el-table>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Fold, Expand, ArrowDown, House, User, Setting } from '@element-plus/icons-vue'

const isCollapse = ref(false)

const tableData = ref([
  {
    name: '张三',
    email: 'zhangsan@example.com',
    role: '管理员'
  },
  {
    name: '李四',
    email: 'lisi@example.com',
    role: '用户'
  },
  {
    name: '王五',
    email: 'wangwu@example.com',
    role: '用户'
  }
])

const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}
</script>

<style scoped>
/* 基础样式 */
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef6;
  color: #333;
  text-align: center;
  line-height: 160px;
}

.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .responsive-aside {
    width: 100px !important;
  }
  
  .responsive-layout .el-header {
    line-height: 40px;
    height: 40px !important;
  }
}

/* 固定布局 */
.fixed-layout {
  height: 100vh;
}

.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.fixed-aside {
  position: fixed;
  top: 60px;
  left: 0;
  bottom: 0;
  z-index: 999;
}

.fixed-main {
  margin-left: 200px;
  margin-top: 60px;
  min-height: calc(100vh - 60px);
}

/* 可折叠侧边栏 */
.collapsible-aside {
  transition: width 0.3s ease;
}

.aside-content {
  padding: 20px;
}

/* 卡片式布局 */
.card-layout .el-header {
  background: none;
  padding: 20px;
}

.card-layout .el-aside {
  background: none;
  padding: 20px;
}

.card-layout .el-main {
  background: none;
  padding: 20px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.aside-content h3 {
  margin-bottom: 20px;
}

.main-content h3 {
  margin-bottom: 20px;
}

/* 后台管理系统布局 */
.admin-layout {
  height: 100vh;
}

.admin-header {
  background-color: #409eff;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.admin-aside {
  background-color: #304156;
  color: white;
}

.admin-menu {
  background-color: #304156;
  border-right: none;
}

.admin-menu .el-menu-item {
  color: #bfcbd9;
}

.admin-menu .el-menu-item:hover {
  background-color: #263445;
  color: #409eff;
}

.admin-menu .el-menu-item.is-active {
  background-color: #409eff;
  color: white;
}

.admin-main {
  background-color: #f0f2f5;
  padding: 20px;
}

.main-content {
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  margin-top: 20px;
}

.user-info {
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
}

/* 布局间距 */
.el-container {
  margin-bottom: 20px;
}

/* 嵌套布局样式 */
.el-container .el-container {
  margin-bottom: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .fixed-aside {
    transform: translateX(-100%);
  }
  
  .fixed-main {
    margin-left: 0;
  }
  
  .admin-header {
    padding: 0 10px;
  }
  
  .admin-main {
    padding: 10px;
  }
  
  .main-content {
    padding: 15px;
  }
}

/* 动画效果 */
.el-aside {
  transition: width 0.3s ease;
}

.el-header {
  transition: height 0.3s ease;
}

/* 阴影效果 */
.card-layout .el-card {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

/* 边框样式 */
.el-container {
  border: 1px solid #ebeef5;
  border-radius: 4px;
}

/* 悬停效果 */
.el-aside:hover {
  background-color: #e6e6e6;
}

.el-header:hover {
  background-color: #a3b1c4;
}
</style>

#### 主要属性

##### Container 属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| direction | 子元素的排列方向 | string | horizontal / vertical | horizontal |

##### Header 属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| height | 顶栏高度 | string | — | 60px |

##### Aside 属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| width | 侧边栏宽度 | string | — | 300px |

##### Main 属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| — | — | — | — | — |

##### Footer 属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| height | 底栏高度 | string | — | 60px |

#### 使用示例
```vue
<!-- 基础布局 -->
<el-container>
  <el-header>Header</el-header>
  <el-main>Main</el-main>
</el-container>

<!-- 经典布局 -->
<el-container>
  <el-aside width="200px">Aside</el-aside>
  <el-container>
    <el-header>Header</el-header>
    <el-main>Main</el-main>
  </el-container>
</el-container>

<!-- 常见页面布局 -->
<el-container>
  <el-header>Header</el-header>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-main>Main</el-main>
  </el-container>
  <el-footer>Footer</el-footer>
</el-container>

<!-- 自定义高度 -->
<el-container style="height: 500px">
  <el-header height="60px">Header</el-header>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-main>Main</el-main>
  </el-container>
</el-container>

<!-- 嵌套布局 -->
<el-container>
  <el-header>Header</el-header>
  <el-container>
    <el-aside width="200px">
      <el-container style="height: 100%">
        <el-header height="50px">Aside Header</el-header>
        <el-main>Aside Content</el-main>
      </el-container>
    </el-aside>
    <el-container>
      <el-main>Main Content</el-main>
      <el-footer height="60px">Footer</el-footer>
    </el-container>
  </el-container>
</el-container>
```

#### 样式定制
```css
/* 基础样式 */
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef6;
  color: #333;
  text-align: center;
  line-height: 160px;
}

.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

/* 固定布局 */
.fixed-layout {
  height: 100vh;
}

.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.fixed-aside {
  position: fixed;
  top: 60px;
  left: 0;
  bottom: 0;
  z-index: 999;
}

.fixed-main {
  margin-left: 200px;
  margin-top: 60px;
  min-height: calc(100vh - 60px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .el-aside {
    width: 100px !important;
  }
  
  .el-header {
    line-height: 40px;
    height: 40px !important;
  }
  
  .fixed-aside {
    transform: translateX(-100%);
  }
  
  .fixed-main {
    margin-left: 0;
  }
}

/* 动画效果 */
.el-aside {
  transition: width 0.3s ease;
}

.el-header {
  transition: height 0.3s ease;
}

/* 卡片式布局 */
.card-layout .el-header {
  background: none;
  padding: 20px;
}

.card-layout .el-aside {
  background: none;
  padding: 20px;
}

.card-layout .el-main {
  background: none;
  padding: 20px;
}

/* 后台管理系统样式 */
.admin-header {
  background-color: #409eff;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.admin-aside {
  background-color: #304156;
  color: white;
}

.admin-main {
  background-color: #f0f2f5;
  padding: 20px;
}
```

#### 使用场景
1. **后台管理系统**: 经典的顶部导航 + 侧边栏布局
2. **企业官网**: 头部 + 内容 + 底部的标准布局
3. **移动端应用**: 响应式布局适配不同屏幕
4. **数据展示页面**: 侧边栏 + 主内容区域的布局
5. **文档系统**: 左侧导航 + 右侧内容的布局
6. **电商平台**: 复杂的多级嵌套布局

#### 注意事项
1. **响应式设计**: 在移动端需要调整布局结构
2. **高度设置**: 合理设置容器高度，避免内容溢出
3. **嵌套使用**: 可以多层嵌套，但要注意性能影响
4. **固定定位**: 使用固定定位时要注意 z-index 层级
5. **内容溢出**: 主内容区域要考虑滚动条的处理
6. **浏览器兼容**: 确保在不同浏览器中正常显示
7. **性能优化**: 避免过度嵌套和复杂的布局结构 