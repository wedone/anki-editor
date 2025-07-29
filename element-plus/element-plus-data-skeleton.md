### 33. Skeleton 骨架屏
- **用途**: 在加载数据时显示占位内容
- **特点**: 支持多种形状、动画效果、自定义内容

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-skeleton :rows="3" />

  <!-- 自定义行数 -->
  <el-skeleton :rows="6" />

  <!-- 自定义宽度 -->
  <el-skeleton :rows="3" :width="['40%', '60%', '80%']" />

  <!-- 动画效果 -->
  <el-skeleton :rows="3" animated />

  <!-- 加载状态 -->
  <el-skeleton :rows="3" :loading="loading" />

  <!-- 不同尺寸 -->
  <el-skeleton :rows="3" size="large" />
  <el-skeleton :rows="3" size="default" />
  <el-skeleton :rows="3" size="small" />

  <!-- 头像骨架屏 -->
  <el-skeleton style="width: 100%">
    <template #template>
      <el-skeleton-item variant="image" style="width: 100px; height: 100px" />
      <div style="padding: 14px">
        <el-skeleton-item variant="h3" style="width: 50%" />
        <div style="display: flex; align-items: center; justify-content: space-between; margin: 16px 0">
          <el-skeleton-item variant="text" style="margin-right: 16px" />
          <el-skeleton-item variant="text" style="width: 30%" />
        </div>
        <el-skeleton-item variant="text" style="width: 80%" />
      </div>
    </template>
  </el-skeleton>

  <!-- 表格骨架屏 -->
  <el-skeleton style="width: 100%">
    <template #template>
      <el-skeleton-item variant="image" style="width: 100%; height: 200px" />
      <div style="padding: 14px">
        <el-skeleton-item variant="h3" style="width: 50%" />
        <el-skeleton-item variant="text" style="width: 80%" />
        <el-skeleton-item variant="text" style="width: 60%" />
      </div>
    </template>
  </el-skeleton>

  <!-- 在页面中使用 -->
  <div class="skeleton-container">
    <h3>用户列表</h3>
    
    <!-- 加载状态 -->
    <div v-if="loading" class="loading-state">
      <div class="user-list-skeleton">
        <div 
          v-for="i in 5" 
          :key="i" 
          class="user-item-skeleton"
        >
          <el-skeleton animated>
            <template #template>
              <div class="user-skeleton-content">
                <el-skeleton-item variant="image" style="width: 60px; height: 60px" />
                <div class="user-info-skeleton">
                  <el-skeleton-item variant="h3" style="width: 60%" />
                  <el-skeleton-item variant="text" style="width: 80%" />
                  <el-skeleton-item variant="text" style="width: 40%" />
                </div>
                <div class="user-actions-skeleton">
                  <el-skeleton-item variant="button" style="width: 60px; height: 32px" />
                  <el-skeleton-item variant="button" style="width: 60px; height: 32px" />
                </div>
              </div>
            </template>
          </el-skeleton>
        </div>
      </div>
    </div>

    <!-- 数据加载完成 -->
    <div v-else class="user-list">
      <div 
        v-for="user in userList" 
        :key="user.id"
        class="user-item"
      >
        <div class="user-avatar">
          <el-avatar :size="60" :src="user.avatar">
            {{ user.name.charAt(0) }}
          </el-avatar>
        </div>
        <div class="user-info">
          <h4 class="user-name">{{ user.name }}</h4>
          <p class="user-email">{{ user.email }}</p>
          <p class="user-role">{{ user.role }}</p>
        </div>
        <div class="user-actions">
          <el-button size="small" type="primary" @click="editUser(user)">
            编辑
          </el-button>
          <el-button size="small" @click="viewUser(user)">
            查看
          </el-button>
        </div>
      </div>
    </div>

    <!-- 控制按钮 -->
    <div class="demo-controls">
      <el-button @click="toggleLoading">
        {{ loading ? '显示数据' : '显示骨架屏' }}
      </el-button>
      <el-button @click="refreshData" :loading="refreshing">
        刷新数据
      </el-button>
    </div>

    <!-- 卡片骨架屏示例 -->
    <div class="card-skeleton-demo">
      <h4>卡片骨架屏</h4>
      <div class="card-grid">
        <div 
          v-for="i in 3" 
          :key="i"
          class="card-skeleton"
        >
          <el-skeleton animated>
            <template #template>
              <div class="card-skeleton-content">
                <el-skeleton-item variant="image" style="width: 100%; height: 150px" />
                <div style="padding: 16px">
                  <el-skeleton-item variant="h3" style="width: 70%" />
                  <el-skeleton-item variant="text" style="width: 90%" />
                  <el-skeleton-item variant="text" style="width: 60%" />
                  <div style="margin-top: 16px">
                    <el-skeleton-item variant="button" style="width: 100%; height: 36px" />
                  </div>
                </div>
              </div>
            </template>
          </el-skeleton>
        </div>
      </div>
    </div>

    <!-- 表格骨架屏示例 -->
    <div class="table-skeleton-demo">
      <h4>表格骨架屏</h4>
      <el-skeleton animated>
        <template #template>
          <div class="table-skeleton-content">
            <!-- 表头 -->
            <div class="table-header-skeleton">
              <el-skeleton-item variant="text" style="width: 20%" />
              <el-skeleton-item variant="text" style="width: 25%" />
              <el-skeleton-item variant="text" style="width: 25%" />
              <el-skeleton-item variant="text" style="width: 20%" />
              <el-skeleton-item variant="text" style="width: 10%" />
            </div>
            <!-- 表格行 -->
            <div 
              v-for="i in 5" 
              :key="i"
              class="table-row-skeleton"
            >
              <el-skeleton-item variant="text" style="width: 20%" />
              <el-skeleton-item variant="text" style="width: 25%" />
              <el-skeleton-item variant="text" style="width: 25%" />
              <el-skeleton-item variant="text" style="width: 20%" />
              <el-skeleton-item variant="text" style="width: 10%" />
            </div>
          </div>
        </template>
      </el-skeleton>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

// 状态控制
const loading = ref(true)
const refreshing = ref(false)

// 用户数据
const userList = ref([
  {
    id: 1,
    name: '张三',
    email: 'zhangsan@example.com',
    role: '管理员',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
  },
  {
    id: 2,
    name: '李四',
    email: 'lisi@example.com',
    role: '编辑',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
  },
  {
    id: 3,
    name: '王五',
    email: 'wangwu@example.com',
    role: '用户',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
  },
  {
    id: 4,
    name: '赵六',
    email: 'zhaoliu@example.com',
    role: '用户',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
  },
  {
    id: 5,
    name: '钱七',
    email: 'qianqi@example.com',
    role: '编辑',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
  }
])

// 控制函数
const toggleLoading = () => {
  loading.value = !loading.value
}

const refreshData = async () => {
  refreshing.value = true
  loading.value = true
  
  // 模拟数据加载
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  loading.value = false
  refreshing.value = false
  ElMessage.success('数据刷新完成')
}

const editUser = (user) => {
  ElMessage.info(`编辑用户: ${user.name}`)
}

const viewUser = (user) => {
  ElMessage.info(`查看用户: ${user.name}`)
}

// 初始化时显示骨架屏
setTimeout(() => {
  loading.value = false
}, 3000)
</script>

<style scoped>
.skeleton-container {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}

.loading-state {
  margin: 20px 0;
}

.user-list-skeleton {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.user-item-skeleton {
  border: 1px solid #ebeef5;
  border-radius: 4px;
  padding: 20px;
}

.user-skeleton-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.user-info-skeleton {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.user-actions-skeleton {
  display: flex;
  gap: 10px;
}

.user-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px 0;
}

.user-item {
  display: flex;
  align-items: center;
  gap: 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  padding: 20px;
  transition: box-shadow 0.3s;
}

.user-item:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.user-info {
  flex: 1;
}

.user-name {
  margin: 0 0 8px 0;
  color: #303133;
  font-size: 16px;
  font-weight: bold;
}

.user-email {
  margin: 0 0 4px 0;
  color: #606266;
  font-size: 14px;
}

.user-role {
  margin: 0;
  color: #909399;
  font-size: 12px;
}

.user-actions {
  display: flex;
  gap: 10px;
}

.demo-controls {
  margin: 30px 0;
  padding: 20px;
  background: #f5f7fa;
  border-radius: 4px;
  text-align: center;
}

.demo-controls .el-button {
  margin: 0 10px;
}

.card-skeleton-demo {
  margin: 30px 0;
}

.card-skeleton-demo h4 {
  margin: 0 0 20px 0;
  color: #303133;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.card-skeleton {
  border: 1px solid #ebeef5;
  border-radius: 4px;
  overflow: hidden;
}

.card-skeleton-content {
  background: #fff;
}

.table-skeleton-demo {
  margin: 30px 0;
}

.table-skeleton-demo h4 {
  margin: 0 0 20px 0;
  color: #303133;
}

.table-skeleton-content {
  border: 1px solid #ebeef5;
  border-radius: 4px;
  overflow: hidden;
}

.table-header-skeleton,
.table-row-skeleton {
  display: flex;
  padding: 12px 16px;
  border-bottom: 1px solid #ebeef5;
}

.table-header-skeleton {
  background: #f5f7fa;
  font-weight: bold;
}

.table-row-skeleton:last-child {
  border-bottom: none;
}

.table-header-skeleton > *,
.table-row-skeleton > * {
  flex: 1;
  margin-right: 16px;
}

.table-header-skeleton > *:last-child,
.table-row-skeleton > *:last-child {
  margin-right: 0;
}
</style>

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| animated | 是否使用动画 | boolean | — | false |
| count | 渲染多少个 template, 建议使用尽可能小的数字 | number | — | 1 |
| loading | 是否显示骨架屏，传 false 时会展示真实内容 | boolean | — | true |
| rows | 骨架屏段落数量 | number | — | 3 |
| throttle | 延迟占位 DOM 渲染的时间，单位是毫秒 | number | — | 0 |

#### Skeleton Item 属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| variant | 显示的占位元素类型 | string | p / text / h1 / h3 / text / caption / button / image / circle / rect | text |

#### 插槽
| 插槽名 | 说明 |
|--------|------|
| default | 自定义加载完成后的内容 |
| template | 自定义骨架屏模板 |

#### 使用场景
1. **列表加载**: 数据列表加载时的占位显示
2. **卡片加载**: 卡片内容加载时的骨架屏
3. **表格加载**: 表格数据加载时的占位显示
4. **详情页加载**: 详情页面内容加载时的骨架屏
5. **搜索结果显示**: 搜索结果加载时的占位显示
6. **图片加载**: 图片加载时的占位显示
7. **表单加载**: 表单数据加载时的骨架屏 