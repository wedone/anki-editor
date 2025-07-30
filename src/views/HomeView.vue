<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()

// 快速操作
const quickActions = ref([
  {
    id: 'decks',
    title: '牌组管理',
    description: '创建、编辑和管理牌组',
    icon: 'Folder',
    route: '/decks'
  },
  {
    id: 'cards',
    title: '卡片管理',
    description: '创建和编辑卡片',
    icon: 'Document',
    route: '/cards'
  },
  {
    id: 'templates',
    title: '模板管理',
    description: '管理笔记模板',
    icon: 'Files',
    route: '/templates'
  },
  {
    id: 'import',
    title: '导入导出',
    description: '导入导出数据',
    icon: 'Upload',
    route: '/import'
  }
])

// 统计数据
const stats = ref([
  {
    id: 'decks',
    label: '牌组数量',
    value: '12',
    icon: 'Folder',
    color: '#409eff'
  },
  {
    id: 'cards',
    label: '卡片总数',
    value: '1,234',
    icon: 'Document',
    color: '#67c23a'
  },
  {
    id: 'templates',
    label: '模板数量',
    value: '8',
    icon: 'Files',
    color: '#e6a23c'
  },
  {
    id: 'tags',
    label: '标签数量',
    value: '45',
    icon: 'PriceTag',
    color: '#f56c6c'
  }
])

// 最近活动
const recentActivities = ref([
  {
    id: '1',
    content: '创建了新牌组 "JavaScript 学习"',
    time: '2024-01-15 14:30',
    type: 'primary'
  },
  {
    id: '2',
    content: '添加了 50 张新卡片',
    time: '2024-01-15 13:45',
    type: 'success'
  },
  {
    id: '3',
    content: '导入了 CSV 文件',
    time: '2024-01-15 12:20',
    type: 'info'
  },
  {
    id: '4',
    content: '编辑了模板 "基础模板"',
    time: '2024-01-15 11:15',
    type: 'warning'
  }
])

const handleAction = (action: any) => {
  router.push(action.route)
  ElMessage.success(`正在跳转到${action.title}`)
}
</script>

<template>
  <div class="home-view">
    <div class="welcome-section">
      <h2>欢迎使用 Anki Editor</h2>
      <p>这是一个基于 AnkiConnect 的自定义 Anki 客户端</p>
    </div>

    <div class="quick-actions">
      <h3>快速操作</h3>
      <div class="action-grid">
        <el-card 
          v-for="action in quickActions" 
          :key="action.id"
          class="action-card"
          @click="handleAction(action)"
        >
          <div class="action-content">
            <el-icon class="action-icon">
              <component :is="action.icon" />
            </el-icon>
            <h4>{{ action.title }}</h4>
            <p>{{ action.description }}</p>
          </div>
        </el-card>
      </div>
    </div>

    <div class="stats-section">
      <h3>数据统计</h3>
      <el-row :gutter="20">
        <el-col :span="6" v-for="stat in stats" :key="stat.id">
          <el-card class="stat-card">
            <div class="stat-content">
              <el-icon class="stat-icon" :style="{ color: stat.color }">
                <component :is="stat.icon" />
              </el-icon>
              <div class="stat-info">
                <div class="stat-value">{{ stat.value }}</div>
                <div class="stat-label">{{ stat.label }}</div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div class="recent-activity">
      <h3>最近活动</h3>
      <el-timeline>
        <el-timeline-item
          v-for="activity in recentActivities"
          :key="activity.id"
          :timestamp="activity.time"
          :type="activity.type"
        >
          {{ activity.content }}
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<style scoped>
.home-view {
  padding: 20px;
}

.welcome-section {
  text-align: center;
  margin-bottom: 40px;
  padding: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
}

.welcome-section h2 {
  margin: 0 0 10px 0;
  font-size: 28px;
}

.welcome-section p {
  margin: 0;
  font-size: 16px;
  opacity: 0.9;
}

.quick-actions {
  margin-bottom: 40px;
}

.quick-actions h3 {
  margin: 0 0 20px 0;
  color: #303133;
}

.action-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.action-card {
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.action-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.action-content {
  text-align: center;
  padding: 20px;
}

.action-icon {
  font-size: 48px;
  color: #409eff;
  margin-bottom: 15px;
}

.action-content h4 {
  margin: 0 0 10px 0;
  color: #303133;
  font-size: 18px;
}

.action-content p {
  margin: 0;
  color: #606266;
  font-size: 14px;
}

.stats-section {
  margin-bottom: 40px;
}

.stats-section h3 {
  margin: 0 0 20px 0;
  color: #303133;
}

.stat-card {
  height: 100%;
}

.stat-content {
  display: flex;
  align-items: center;
  padding: 20px;
}

.stat-icon {
  font-size: 36px;
  margin-right: 15px;
}

.stat-info {
  flex: 1;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 14px;
  color: #606266;
}

.recent-activity h3 {
  margin: 0 0 20px 0;
  color: #303133;
}
</style>
