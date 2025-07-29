### 7. Link 链接
- **用途**: 文字链接
- **特点**: 支持多种样式和状态

#### 详细用法
```vue
<template>
  <div>
    <!-- 基础用法 -->
    <el-link href="https://element-plus.org" target="_blank">默认链接</el-link>
    <el-link type="primary">主要链接</el-link>
    <el-link type="success">成功链接</el-link>
    <el-link type="warning">警告链接</el-link>
    <el-link type="danger">危险链接</el-link>
    <el-link type="info">信息链接</el-link>

    <!-- 禁用状态 -->
    <el-link disabled>禁用链接</el-link>
    <el-link type="primary" disabled>禁用主要链接</el-link>

    <!-- 下划线 -->
    <el-link :underline="false">无下划线</el-link>
    <el-link type="primary" :underline="false">无下划线主要链接</el-link>

    <!-- 图标链接 -->
    <el-link type="primary" :icon="Edit">编辑</el-link>
    <el-link type="success" :icon="View">查看</el-link>
    <el-link type="warning" :icon="Delete">删除</el-link>

    <!-- 不同尺寸 -->
    <el-link size="large">大号链接</el-link>
    <el-link size="default">默认链接</el-link>
    <el-link size="small">小号链接</el-link>

    <!-- 事件处理 -->
    <el-link @click="handleClick">点击事件</el-link>
    <el-link @click="handleClick" type="primary">主要点击事件</el-link>

    <!-- 自定义样式 -->
    <el-link class="custom-link">自定义样式链接</el-link>
    <el-link class="gradient-link">渐变链接</el-link>

    <!-- 在表格中使用 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column prop="email" label="邮箱" width="180" />
      <el-table-column prop="status" label="状态" width="120" />
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-link type="primary" :icon="View" @click="viewUser(scope.row)">
            查看
          </el-link>
          <el-link type="success" :icon="Edit" @click="editUser(scope.row)">
            编辑
          </el-link>
          <el-link type="danger" :icon="Delete" @click="deleteUser(scope.row)">
            删除
          </el-link>
        </template>
      </el-table-column>
    </el-table>

    <!-- 在卡片中使用 -->
    <el-card style="width: 300px">
      <template #header>
        <div class="card-header">
          <span>用户信息</span>
          <el-link type="primary" :icon="Edit">编辑</el-link>
        </div>
      </template>
      <div class="user-info">
        <p><strong>姓名:</strong> 张三</p>
        <p><strong>邮箱:</strong> zhangsan@example.com</p>
        <p><strong>状态:</strong> 
          <el-link type="success" :underline="false">激活</el-link>
        </p>
      </div>
      <div class="card-actions">
        <el-link type="primary" :icon="View">查看详情</el-link>
        <el-link type="warning" :icon="Setting">设置</el-link>
      </div>
    </el-card>

    <!-- 在面包屑中使用 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>
        <el-link @click="goHome">首页</el-link>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <el-link @click="goToUsers">用户管理</el-link>
      </el-breadcrumb-item>
      <el-breadcrumb-item>用户详情</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 在菜单中使用 -->
    <el-menu mode="horizontal" :default-active="activeIndex">
      <el-menu-item index="1">
        <el-link type="primary" :underline="false">首页</el-link>
      </el-menu-item>
      <el-menu-item index="2">
        <el-link type="primary" :underline="false">产品</el-link>
      </el-menu-item>
      <el-menu-item index="3">
        <el-link type="primary" :underline="false">关于我们</el-link>
      </el-menu-item>
    </el-menu>

    <!-- 在表单中使用 -->
    <el-form :model="form" label-width="120px">
      <el-form-item label="用户协议">
        <el-link type="primary" @click="showAgreement">查看用户协议</el-link>
      </el-form-item>
      <el-form-item label="隐私政策">
        <el-link type="primary" @click="showPrivacy">查看隐私政策</el-link>
      </el-form-item>
      <el-form-item label="忘记密码">
        <el-link type="warning" @click="resetPassword">重置密码</el-link>
      </el-form-item>
    </el-form>

    <!-- 在标签页中使用 -->
    <el-tabs v-model="activeTab">
      <el-tab-pane label="基本信息" name="basic">
        <div class="tab-content">
          <p>这里是基本信息内容</p>
          <el-link type="primary" @click="editBasic">编辑基本信息</el-link>
        </div>
      </el-tab-pane>
      <el-tab-pane label="安全设置" name="security">
        <div class="tab-content">
          <p>这里是安全设置内容</p>
          <el-link type="warning" @click="changePassword">修改密码</el-link>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 在通知中使用 -->
    <el-alert
      title="系统维护通知"
      type="info"
      :closable="false"
      show-icon
    >
      <template #default>
        <p>系统将于今晚进行维护，详情请查看 
          <el-link type="primary" @click="showMaintenance">维护公告</el-link>
        </p>
      </template>
    </el-alert>

    <!-- 在对话框中使用 -->
    <el-button @click="dialogVisible = true">打开对话框</el-button>
    <el-dialog v-model="dialogVisible" title="确认操作" width="30%">
      <span>确定要执行此操作吗？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmAction">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 响应式链接 -->
    <div class="responsive-links">
      <el-link type="primary" class="responsive-link">响应式链接1</el-link>
      <el-link type="success" class="responsive-link">响应式链接2</el-link>
      <el-link type="warning" class="responsive-link">响应式链接3</el-link>
    </div>

    <!-- 链接组 -->
    <div class="link-group">
      <el-link type="primary" :icon="Home">首页</el-link>
      <el-link type="success" :icon="User">用户</el-link>
      <el-link type="warning" :icon="Setting">设置</el-link>
      <el-link type="danger" :icon="Logout">退出</el-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Edit, View, Delete, Setting, Home, User, Logout } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const activeIndex = ref('1')
const activeTab = ref('basic')
const dialogVisible = ref(false)

const tableData = ref([
  {
    name: '张三',
    email: 'zhangsan@example.com',
    status: '激活'
  },
  {
    name: '李四',
    email: 'lisi@example.com',
    status: '禁用'
  },
  {
    name: '王五',
    email: 'wangwu@example.com',
    status: '激活'
  }
])

const form = ref({
  agreement: false,
  privacy: false
})

const handleClick = () => {
  ElMessage.success('链接被点击了!')
}

const viewUser = (row) => {
  ElMessage.success(`查看用户: ${row.name}`)
}

const editUser = (row) => {
  ElMessage.success(`编辑用户: ${row.name}`)
}

const deleteUser = (row) => {
  ElMessage.warning(`删除用户: ${row.name}`)
}

const goHome = () => {
  ElMessage.success('跳转到首页')
}

const goToUsers = () => {
  ElMessage.success('跳转到用户管理')
}

const showAgreement = () => {
  ElMessage.info('显示用户协议')
}

const showPrivacy = () => {
  ElMessage.info('显示隐私政策')
}

const resetPassword = () => {
  ElMessage.warning('重置密码')
}

const editBasic = () => {
  ElMessage.success('编辑基本信息')
}

const changePassword = () => {
  ElMessage.warning('修改密码')
}

const showMaintenance = () => {
  ElMessage.info('显示维护公告')
}

const confirmAction = () => {
  ElMessage.success('操作已确认')
  dialogVisible.value = false
}
</script>

<style scoped>
.custom-link {
  color: #ff6b6b;
  font-weight: bold;
}

.custom-link:hover {
  color: #ff5252;
  text-decoration: underline;
}

.gradient-link {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: bold;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-info p {
  margin: 10px 0;
}

.card-actions {
  margin-top: 20px;
  display: flex;
  gap: 15px;
}

.tab-content {
  padding: 20px 0;
}

.tab-content p {
  margin-bottom: 15px;
}

.responsive-links {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 20px;
}

.link-group {
  display: flex;
  gap: 20px;
  margin-top: 20px;
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .responsive-link {
    font-size: 14px;
  }
  
  .link-group {
    flex-direction: column;
    gap: 10px;
  }
  
  .card-actions {
    flex-direction: column;
    gap: 10px;
  }
}

/* 链接动画 */
.el-link {
  transition: all 0.3s ease;
}

.el-link:hover {
  transform: translateY(-1px);
}

/* 自定义链接样式 */
.el-link--custom {
  position: relative;
  overflow: hidden;
}

.el-link--custom::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #409eff, transparent);
  transition: left 0.3s ease;
}

.el-link--custom:hover::before {
  left: 100%;
}

/* 链接组样式 */
.link-group .el-link {
  padding: 8px 16px;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.link-group .el-link:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}
</style>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| type | 类型 | string | primary / success / warning / danger / info | default |
| underline | 是否下划线 | boolean | — | true |
| disabled | 是否禁用状态 | boolean | — | false |
| href | 原生 href 属性 | string | — | — |
| icon | 图标组件 | string / Component | — | — |
| size | 尺寸 | string | large / default / small | default |

#### 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击事件 | (evt: MouseEvent) |

#### 插槽
| 插槽名 | 说明 |
|--------|------|
| — | 链接的内容 |
| icon | 自定义图标 |

#### 使用示例
```vue
<!-- 基础用法 -->
<el-link href="https://element-plus.org" target="_blank">默认链接</el-link>
<el-link type="primary">主要链接</el-link>
<el-link type="success">成功链接</el-link>
<el-link type="warning">警告链接</el-link>
<el-link type="danger">危险链接</el-link>
<el-link type="info">信息链接</el-link>

<!-- 禁用状态 -->
<el-link disabled>禁用链接</el-link>
<el-link type="primary" disabled>禁用主要链接</el-link>

<!-- 下划线 -->
<el-link :underline="false">无下划线</el-link>
<el-link type="primary" :underline="false">无下划线主要链接</el-link>

<!-- 图标链接 -->
<el-link type="primary" :icon="Edit">编辑</el-link>
<el-link type="success" :icon="View">查看</el-link>
<el-link type="warning" :icon="Delete">删除</el-link>

<!-- 不同尺寸 -->
<el-link size="large">大号链接</el-link>
<el-link size="default">默认链接</el-link>
<el-link size="small">小号链接</el-link>

<!-- 事件处理 -->
<el-link @click="handleClick">点击事件</el-link>
<el-link @click="handleClick" type="primary">主要点击事件</el-link>

<!-- 自定义图标 -->
<el-link type="primary">
  <template #icon>
    <el-icon><Edit /></el-icon>
  </template>
  自定义图标
</el-link>
```

#### 样式定制
```css
/* 自定义链接样式 */
.custom-link {
  color: #ff6b6b;
  font-weight: bold;
}

.custom-link:hover {
  color: #ff5252;
  text-decoration: underline;
}

.gradient-link {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: bold;
}

/* 链接动画 */
.el-link {
  transition: all 0.3s ease;
}

.el-link:hover {
  transform: translateY(-1px);
}

/* 自定义链接样式 */
.el-link--custom {
  position: relative;
  overflow: hidden;
}

.el-link--custom::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #409eff, transparent);
  transition: left 0.3s ease;
}

.el-link--custom:hover::before {
  left: 100%;
}

/* 链接组样式 */
.link-group .el-link {
  padding: 8px 16px;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.link-group .el-link:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .responsive-link {
    font-size: 14px;
  }
  
  .link-group {
    flex-direction: column;
    gap: 10px;
  }
}

/* 不同类型链接的颜色 */
.el-link--primary {
  color: #409eff;
}

.el-link--success {
  color: #67c23a;
}

.el-link--warning {
  color: #e6a23c;
}

.el-link--danger {
  color: #f56c6c;
}

.el-link--info {
  color: #909399;
}

/* 禁用状态 */
.el-link.is-disabled {
  color: #c0c4cc;
  cursor: not-allowed;
}

.el-link.is-disabled:hover {
  color: #c0c4cc;
}
```

#### 使用场景
1. **导航链接**: 在导航菜单中使用
2. **操作链接**: 在表格操作列中使用
3. **文档链接**: 在文档中引用外部链接
4. **表单链接**: 在表单中提供相关链接
5. **面包屑导航**: 在面包屑中使用
6. **卡片操作**: 在卡片组件中使用

#### 注意事项
1. **语义化**: 合理使用链接类型，保持语义化
2. **可访问性**: 确保链接对屏幕阅读器友好
3. **外部链接**: 外部链接建议使用 `target="_blank"`
4. **禁用状态**: 禁用状态下的链接不应有点击事件
5. **图标使用**: 合理使用图标增强视觉效果
6. **响应式设计**: 在移动端考虑链接的显示效果
7. **样式一致性**: 保持与整体设计风格一致 