<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAnkiStore } from '@/stores/ankiStore'

const router = useRouter()
const ankiStore = useAnkiStore()

// 最近活动数据
const recentActivities = ref([
  {
    content: '应用启动',
    time: new Date().toLocaleString(),
    type: 'primary'
  },
  {
    content: 'AnkiConnect 连接测试',
    time: new Date().toLocaleString(),
    type: 'success'
  }
])

// 最后更新时间
const lastUpdateTime = computed(() => {
  return new Date().toLocaleString()
})

// 导航到指定页面
const navigateTo = (path: string) => {
  router.push(path)
}

// 页面加载时初始化
onMounted(async () => {
  if (ankiStore.isConnected) {
    // 添加连接成功的活动记录
    recentActivities.value.unshift({
      content: 'AnkiConnect 连接成功',
      time: new Date().toLocaleString(),
      type: 'success'
    })
  } else {
    // 添加连接失败的活动记录
    recentActivities.value.unshift({
      content: 'AnkiConnect 连接失败，请检查设置',
      time: new Date().toLocaleString(),
      type: 'danger'
    })
  }
})
</script>

<template>
  <div class="home-view">
    <div class="welcome-section">
      <h1>欢迎使用 Anki Editor</h1>
      <p>基于 AnkiConnect 的自定义 Anki 客户端</p>
    </div>

    <!-- 连接状态提示 -->
    <el-alert
      v-if="!ankiStore.isConnected"
      title="未连接到 Anki"
      description="请先在设置中配置 AnkiConnect 连接，然后刷新页面"
      type="warning"
      show-icon
      style="margin-bottom: 20px;"
    />

    <!-- 统计卡片 -->
    <div v-if="ankiStore.isConnected" class="stats-section">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card class="stat-card">
            <div class="stat-content">
              <div class="stat-icon">
                <el-icon><Folder /></el-icon>
              </div>
              <div class="stat-info">
                <div class="stat-number">{{ ankiStore.decks.length }}</div>
                <div class="stat-label">牌组数量</div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="stat-card">
            <div class="stat-content">
              <div class="stat-icon">
                <el-icon><Document /></el-icon>
              </div>
              <div class="stat-info">
                <div class="stat-number">{{ ankiStore.notes.length }}</div>
                <div class="stat-label">卡片数量</div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="stat-card">
            <div class="stat-content">
              <div class="stat-icon">
                <el-icon><Files /></el-icon>
              </div>
              <div class="stat-info">
                <div class="stat-number">{{ ankiStore.models.length }}</div>
                <div class="stat-label">模板数量</div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="stat-card">
            <div class="stat-content">
              <div class="stat-icon">
                <el-icon><PriceTag /></el-icon>
              </div>
              <div class="stat-info">
                <div class="stat-number">{{ ankiStore.tags.length }}</div>
                <div class="stat-label">标签数量</div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 快速操作 -->
    <div class="quick-actions">
      <h2>快速操作</h2>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card class="action-card" @click="navigateTo('/decks')">
            <div class="action-content">
              <el-icon class="action-icon"><Folder /></el-icon>
              <h3>管理牌组</h3>
              <p>创建、编辑和删除牌组</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="action-card" @click="navigateTo('/cards')">
            <div class="action-content">
              <el-icon class="action-icon"><Document /></el-icon>
              <h3>管理卡片</h3>
              <p>添加、编辑和删除卡片</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="action-card" @click="navigateTo('/templates')">
            <div class="action-content">
              <el-icon class="action-icon"><Files /></el-icon>
              <h3>管理模板</h3>
              <p>创建和配置笔记模板</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="action-card" @click="navigateTo('/import')">
            <div class="action-content">
              <el-icon class="action-icon"><Upload /></el-icon>
              <h3>导入导出</h3>
              <p>导入和导出 Anki 数据</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 最近活动 -->
    <div class="recent-activities">
      <h2>最近活动</h2>
      <el-card>
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in recentActivities"
            :key="index"
            :timestamp="activity.time"
            :type="activity.type"
          >
            {{ activity.content }}
          </el-timeline-item>
        </el-timeline>
      </el-card>
    </div>

    <!-- 系统信息 -->
    <div class="system-info">
      <h2>系统信息</h2>
      <el-card>
        <el-descriptions :column="2" border>
          <el-descriptions-item label="应用版本">1.0.0</el-descriptions-item>
          <el-descriptions-item label="Vue 版本">3.x</el-descriptions-item>
          <el-descriptions-item label="Element Plus">2.x</el-descriptions-item>
          <el-descriptions-item label="AnkiConnect">6.x</el-descriptions-item>
          <el-descriptions-item label="连接状态">
            <el-tag :type="ankiStore.isConnected ? 'success' : 'danger'">
              {{ ankiStore.isConnected ? '已连接' : '未连接' }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="最后更新">{{ lastUpdateTime }}</el-descriptions-item>
        </el-descriptions>
      </el-card>
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
}

.welcome-section h1 {
  color: #303133;
  margin-bottom: 10px;
}

.welcome-section p {
  color: #606266;
  font-size: 16px;
}

.stats-section {
  margin-bottom: 40px;
}

.stat-card {
  height: 120px;
  cursor: pointer;
  transition: all 0.3s;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.stat-content {
  display: flex;
  align-items: center;
  height: 100%;
}

.stat-icon {
  font-size: 48px;
  color: #409eff;
  margin-right: 20px;
}

.stat-info {
  flex: 1;
}

.stat-number {
  font-size: 32px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 5px;
}

.stat-label {
  color: #606266;
  font-size: 14px;
}

.quick-actions {
  margin-bottom: 40px;
}

.quick-actions h2 {
  margin-bottom: 20px;
  color: #303133;
}

.action-card {
  height: 150px;
  cursor: pointer;
  transition: all 0.3s;
}

.action-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.action-content {
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.action-icon {
  font-size: 48px;
  color: #409eff;
  margin-bottom: 15px;
}

.action-content h3 {
  margin: 0 0 10px 0;
  color: #303133;
}

.action-content p {
  margin: 0;
  color: #606266;
  font-size: 14px;
}

.recent-activities {
  margin-bottom: 40px;
}

.recent-activities h2 {
  margin-bottom: 20px;
  color: #303133;
}

.system-info h2 {
  margin-bottom: 20px;
  color: #303133;
}
</style>
