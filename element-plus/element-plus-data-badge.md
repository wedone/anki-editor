### 5. Badge 徽章
- **用途**: 徽章标记
- **特点**: 支持数字、文字、点状徽章

#### 详细用法
```vue
<template>
  <div>
    <!-- 基础用法 -->
    <el-badge :value="12" class="item">
      <el-button size="small">评论</el-button>
    </el-badge>
    <el-badge :value="3" class="item">
      <el-button size="small">回复</el-button>
    </el-badge>
    <el-badge :value="1" class="item" type="primary">
      <el-button size="small">点赞</el-button>
    </el-badge>
    <el-badge :value="2" class="item" type="warning">
      <el-button size="small">收藏</el-button>
    </el-badge>

    <!-- 最大值 -->
    <el-badge :value="200" :max="99" class="item">
      <el-button size="small">评论</el-button>
    </el-badge>

    <!-- 自定义内容 -->
    <el-badge value="new" class="item">
      <el-button size="small">评论</el-button>
    </el-badge>
    <el-badge value="hot" class="item">
      <el-button size="small">回复</el-button>
    </el-badge>

    <!-- 小圆点 -->
    <el-badge is-dot class="item">
      <el-button size="small">评论</el-button>
    </el-badge>
    <el-badge is-dot class="item">
      <el-button size="small">回复</el-button>
    </el-badge>

    <!-- 不同类型 -->
    <el-badge :value="12" type="primary" class="item">
      <el-button size="small">主要</el-button>
    </el-badge>
    <el-badge :value="12" type="success" class="item">
      <el-button size="small">成功</el-button>
    </el-badge>
    <el-badge :value="12" type="warning" class="item">
      <el-button size="small">警告</el-button>
    </el-badge>
    <el-badge :value="12" type="danger" class="item">
      <el-button size="small">危险</el-button>
    </el-badge>
    <el-badge :value="12" type="info" class="item">
      <el-button size="small">信息</el-button>
    </el-badge>

    <!-- 隐藏徽章 -->
    <el-badge :value="0" :hidden="true" class="item">
      <el-button size="small">评论</el-button>
    </el-badge>
    <el-badge :value="0" class="item">
      <el-button size="small">回复</el-button>
    </el-badge>

    <!-- 自定义位置 -->
    <el-badge :value="12" class="item">
      <el-button size="small">右上角</el-button>
    </el-badge>
    <el-badge :value="12" placement="top-start" class="item">
      <el-button size="small">左上角</el-button>
    </el-badge>
    <el-badge :value="12" placement="bottom-end" class="item">
      <el-button size="small">右下角</el-button>
    </el-badge>
    <el-badge :value="12" placement="bottom-start" class="item">
      <el-button size="small">左下角</el-button>
    </el-badge>

    <!-- 自定义样式 -->
    <el-badge :value="12" class="item custom-badge">
      <el-button size="small">自定义样式</el-button>
    </el-badge>

    <!-- 在图标上使用 -->
    <el-badge :value="12" class="item">
      <el-icon :size="24"><Bell /></el-icon>
    </el-badge>
    <el-badge :value="3" class="item">
      <el-icon :size="24"><Message /></el-icon>
    </el-badge>
    <el-badge is-dot class="item">
      <el-icon :size="24"><Setting /></el-icon>
    </el-badge>

    <!-- 在头像上使用 -->
    <el-badge :value="12" class="item">
      <el-avatar :size="40" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    </el-badge>
    <el-badge is-dot class="item">
      <el-avatar :size="40" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    </el-badge>

    <!-- 在导航菜单上使用 -->
    <el-menu mode="horizontal" :default-active="activeIndex" class="demo-menu">
      <el-menu-item index="1">
        <el-badge :value="12" class="item">
          首页
        </el-badge>
      </el-menu-item>
      <el-menu-item index="2">
        <el-badge :value="3" class="item">
          消息
        </el-badge>
      </el-menu-item>
      <el-menu-item index="3">
        <el-badge is-dot class="item">
          设置
        </el-badge>
      </el-menu-item>
    </el-menu>

    <!-- 在标签页上使用 -->
    <el-tabs v-model="activeTab" class="demo-tabs">
      <el-tab-pane label="消息" name="messages">
        <el-badge :value="12" class="item">
          消息内容
        </el-badge>
      </el-tab-pane>
      <el-tab-pane label="通知" name="notifications">
        <el-badge :value="3" class="item">
          通知内容
        </el-badge>
      </el-tab-pane>
      <el-tab-pane label="任务" name="tasks">
        <el-badge is-dot class="item">
          任务内容
        </el-badge>
      </el-tab-pane>
    </el-tabs>

    <!-- 在表格中使用 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column prop="status" label="状态" width="180">
        <template #default="scope">
          <el-badge :value="scope.row.status" :type="getStatusType(scope.row.status)">
            {{ scope.row.name }}
          </el-badge>
        </template>
      </el-table-column>
      <el-table-column prop="notifications" label="通知" width="180">
        <template #default="scope">
          <el-badge :value="scope.row.notifications" :hidden="scope.row.notifications === 0">
            <el-icon :size="20"><Bell /></el-icon>
          </el-badge>
        </template>
      </el-table-column>
    </el-table>

    <!-- 在卡片中使用 -->
    <el-card style="width: 300px" class="demo-card">
      <template #header>
        <div class="card-header">
          <span>通知中心</span>
          <el-badge :value="totalNotifications" :max="99">
            <el-icon :size="20"><Bell /></el-icon>
          </el-badge>
        </div>
      </template>
      <div v-for="notification in notifications" :key="notification.id" class="notification-item">
        <el-badge :value="notification.count" :hidden="notification.count === 0">
          <span>{{ notification.title }}</span>
        </el-badge>
      </div>
    </el-card>

    <!-- 动态徽章 -->
    <el-badge :value="dynamicValue" class="item">
      <el-button size="small" @click="incrementValue">动态徽章</el-button>
    </el-badge>

    <!-- 响应式徽章 -->
    <el-badge :value="12" class="item responsive-badge">
      <el-button size="small">响应式</el-button>
    </el-badge>

    <!-- 自定义徽章内容 -->
    <el-badge class="item">
      <template #content>
        <el-icon :size="12"><Star /></el-icon>
      </template>
      <el-button size="small">自定义内容</el-button>
    </el-badge>

    <!-- 徽章组 -->
    <div class="badge-group">
      <el-badge :value="12" class="item">
        <el-button size="small">评论</el-button>
      </el-badge>
      <el-badge :value="3" class="item">
        <el-button size="small">回复</el-button>
      </el-badge>
      <el-badge :value="1" class="item">
        <el-button size="small">点赞</el-button>
      </el-badge>
      <el-badge :value="2" class="item">
        <el-button size="small">收藏</el-button>
      </el-badge>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Bell, Message, Setting, Star } from '@element-plus/icons-vue'

const activeIndex = ref('1')
const activeTab = ref('messages')
const dynamicValue = ref(0)

const tableData = ref([
  {
    name: '张三',
    status: '在线',
    notifications: 5
  },
  {
    name: '李四',
    status: '离线',
    notifications: 0
  },
  {
    name: '王五',
    status: '忙碌',
    notifications: 12
  }
])

const notifications = ref([
  { id: 1, title: '系统通知', count: 3 },
  { id: 2, title: '消息提醒', count: 0 },
  { id: 3, title: '任务提醒', count: 7 }
])

const totalNotifications = ref(10)

const getStatusType = (status) => {
  const statusMap = {
    '在线': 'success',
    '离线': 'info',
    '忙碌': 'warning'
  }
  return statusMap[status] || 'info'
}

const incrementValue = () => {
  dynamicValue.value++
}
</script>

<style scoped>
.item {
  margin-right: 20px;
  margin-bottom: 20px;
}

.custom-badge .el-badge__content {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
}

.demo-menu {
  margin-bottom: 20px;
}

.demo-tabs {
  margin-bottom: 20px;
}

.demo-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.notification-item {
  padding: 10px 0;
  border-bottom: 1px solid #ebeef5;
}

.notification-item:last-child {
  border-bottom: none;
}

.badge-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

/* 响应式徽章 */
@media (max-width: 768px) {
  .responsive-badge .el-badge__content {
    font-size: 10px;
    height: 16px;
    line-height: 16px;
    padding: 0 4px;
  }
  
  .item {
    margin-right: 10px;
    margin-bottom: 10px;
  }
  
  .badge-group {
    gap: 5px;
  }
}
</style>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| value / model-value | 显示值 | string / number | — | — |
| max | 最大值，超过最大值会显示 '{max}+'，要求 value 是 Number 类型 | number | — | — |
| is-dot | 小圆点 | boolean | — | false |
| hidden | 隐藏 badge | boolean | — | false |
| type | 类型 | string | primary / success / warning / danger / info | — |
| placement | badge 的位置 | string | top / top-start / top-end / bottom / bottom-start / bottom-end / left / left-start / left-end / right / right-start / right-end | top-end |

#### 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 当 value 改变时触发 | (value: string \| number) |

#### 插槽
| 插槽名 | 说明 |
|--------|------|
| — | 徽章的内容 |
| content | 徽章显示的内容 |

#### 使用示例
```vue
<!-- 基础用法 -->
<el-badge :value="12" class="item">
  <el-button size="small">评论</el-button>
</el-badge>

<!-- 最大值 -->
<el-badge :value="200" :max="99" class="item">
  <el-button size="small">评论</el-button>
</el-badge>

<!-- 自定义内容 -->
<el-badge value="new" class="item">
  <el-button size="small">评论</el-button>
</el-badge>

<!-- 小圆点 -->
<el-badge is-dot class="item">
  <el-button size="small">评论</el-button>
</el-badge>

<!-- 不同类型 -->
<el-badge :value="12" type="primary" class="item">
  <el-button size="small">主要</el-button>
</el-badge>

<el-badge :value="12" type="success" class="item">
  <el-button size="small">成功</el-button>
</el-badge>

<el-badge :value="12" type="warning" class="item">
  <el-button size="small">警告</el-button>
</el-badge>

<el-badge :value="12" type="danger" class="item">
  <el-button size="small">危险</el-button>
</el-badge>

<el-badge :value="12" type="info" class="item">
  <el-button size="small">信息</el-button>
</el-badge>

<!-- 隐藏徽章 -->
<el-badge :value="0" :hidden="true" class="item">
  <el-button size="small">评论</el-button>
</el-badge>

<!-- 自定义位置 -->
<el-badge :value="12" placement="top-start" class="item">
  <el-button size="small">左上角</el-button>
</el-badge>

<el-badge :value="12" placement="bottom-end" class="item">
  <el-button size="small">右下角</el-button>
</el-badge>

<!-- 在图标上使用 -->
<el-badge :value="12" class="item">
  <el-icon :size="24"><Bell /></el-icon>
</el-badge>

<!-- 在头像上使用 -->
<el-badge :value="12" class="item">
  <el-avatar :size="40" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
</el-badge>

<!-- 自定义徽章内容 -->
<el-badge class="item">
  <template #content>
    <el-icon :size="12"><Star /></el-icon>
  </template>
  <el-button size="small">自定义内容</el-button>
</el-badge>
```

#### 样式定制
```css
/* 自定义徽章样式 */
.custom-badge .el-badge__content {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 10px;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.custom-badge .el-badge__content:hover {
  transform: scale(1.1);
  transition: transform 0.2s ease;
}

/* 徽章动画 */
.el-badge__content {
  transition: all 0.3s ease;
}

.el-badge:hover .el-badge__content {
  transform: scale(1.1);
}

/* 响应式徽章 */
@media (max-width: 768px) {
  .responsive-badge .el-badge__content {
    font-size: 10px;
    height: 16px;
    line-height: 16px;
    padding: 0 4px;
    min-width: 16px;
  }
  
  .el-badge {
    font-size: 12px;
  }
}

/* 徽章组样式 */
.badge-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.badge-group .el-badge {
  margin: 0;
}

/* 不同类型徽章的颜色 */
.el-badge--primary .el-badge__content {
  background-color: #409eff;
}

.el-badge--success .el-badge__content {
  background-color: #67c23a;
}

.el-badge--warning .el-badge__content {
  background-color: #e6a23c;
}

.el-badge--danger .el-badge__content {
  background-color: #f56c6c;
}

.el-badge--info .el-badge__content {
  background-color: #909399;
}
```

#### 使用场景
1. **消息通知**: 显示未读消息数量
2. **购物车**: 显示购物车商品数量
3. **评论系统**: 显示评论数量
4. **社交应用**: 显示点赞、收藏数量
5. **导航菜单**: 在菜单项上显示通知数量
6. **用户状态**: 显示用户在线状态
7. **任务提醒**: 显示待处理任务数量

#### 注意事项
1. **数值范围**: 合理设置最大值，避免显示过大的数字
2. **位置选择**: 根据内容选择合适的徽章位置
3. **类型选择**: 根据语义选择合适的徽章类型
4. **响应式设计**: 在移动端考虑徽章的显示效果
5. **性能优化**: 避免在大量元素上使用徽章
6. **可访问性**: 确保徽章对屏幕阅读器友好
7. **样式一致性**: 保持与整体设计风格一致 