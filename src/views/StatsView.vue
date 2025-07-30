<template>
  <div class="stats-view">
    <el-card class="page-card" shadow="never">
      <template #header>
        <div class="page-header">
          <span>统计信息</span>
          <el-button type="primary" @click="refreshStats">
            <el-icon><Refresh /></el-icon>
            刷新统计
          </el-button>
        </div>
      </template>

      <!-- 连接状态提示 -->
      <el-alert
        v-if="!ankiStore.isConnected"
        title="未连接到 Anki"
        description="请先在设置中配置 AnkiConnect 连接"
        type="warning"
        show-icon
        style="margin-bottom: 20px;"
      />

      <!-- 加载状态 -->
      <div v-if="loading" class="loading-container">
        <el-skeleton :rows="5" animated />
      </div>

      <!-- 统计内容 -->
      <div v-else class="stats-content">
        <!-- 概览统计 -->
        <el-row :gutter="20" class="stats-overview">
          <el-col :span="6">
            <el-card class="stat-card" shadow="hover">
              <div class="stat-content">
                <div class="stat-icon">
                  <el-icon><Folder /></el-icon>
                </div>
                <div class="stat-info">
                  <div class="stat-number">{{ stats?.collectionStats?.decks || 0 }}</div>
                  <div class="stat-label">牌组数量</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="stat-card" shadow="hover">
              <div class="stat-content">
                <div class="stat-icon">
                  <el-icon><Document /></el-icon>
                </div>
                <div class="stat-info">
                  <div class="stat-number">{{ stats?.collectionStats?.notes || 0 }}</div>
                  <div class="stat-label">卡片数量</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="stat-card" shadow="hover">
              <div class="stat-content">
                <div class="stat-icon">
                  <el-icon><Files /></el-icon>
                </div>
                <div class="stat-info">
                  <div class="stat-number">{{ stats?.collectionStats?.models || 0 }}</div>
                  <div class="stat-label">模板数量</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="stat-card" shadow="hover">
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

        <!-- 今日复习统计 -->
        <el-row :gutter="20" class="stats-section">
          <el-col :span="12">
            <el-card class="section-card" shadow="never">
              <template #header>
                <span>今日复习</span>
              </template>
              <div class="today-stats">
                <div class="stat-item">
                  <span class="stat-label">今日复习卡片数:</span>
                  <span class="stat-value">{{ stats?.todayReviewed || 0 }}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">今日新增卡片数:</span>
                  <span class="stat-value">{{ stats?.collectionStats?.newCards || 0 }}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">今日学习时间:</span>
                  <span class="stat-value">{{ formatTime(stats?.collectionStats?.studyTime || 0) }}</span>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="section-card" shadow="never">
              <template #header>
                <span>学习进度</span>
              </template>
              <div class="progress-stats">
                <div class="stat-item">
                  <span class="stat-label">已学习卡片:</span>
                  <span class="stat-value">{{ stats?.collectionStats?.learnedCards || 0 }}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">待复习卡片:</span>
                  <span class="stat-value">{{ stats?.collectionStats?.dueCards || 0 }}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">学习天数:</span>
                  <span class="stat-value">{{ stats?.collectionStats?.studyDays || 0 }} 天</span>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>

        <!-- 牌组统计 -->
        <el-card class="section-card" shadow="never">
          <template #header>
            <span>牌组统计</span>
          </template>
          <div v-if="deckStats.length > 0" class="deck-stats">
            <el-table :data="deckStats" style="width: 100%">
              <el-table-column prop="name" label="牌组名称" min-width="200">
                <template #default="{ row }">
                  <div class="deck-name">
                    <el-icon><Folder /></el-icon>
                    <span>{{ row.name }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="cardCount" label="卡片数量" width="120">
                <template #default="{ row }">
                  <el-tag size="small">{{ row.cardCount }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="newCards" label="新卡片" width="100">
                <template #default="{ row }">
                  <el-tag size="small" type="success">{{ row.newCards }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="dueCards" label="待复习" width="100">
                <template #default="{ row }">
                  <el-tag size="small" type="warning">{{ row.dueCards }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="lastModified" label="最后修改" width="180">
                <template #default="{ row }">
                  {{ formatDate(row.lastModified) }}
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-else class="empty-stats">
            <el-empty description="暂无牌组数据" />
          </div>
        </el-card>

        <!-- 学习趋势 -->
        <el-card class="section-card" shadow="never">
          <template #header>
            <span>学习趋势</span>
          </template>
          <div class="trend-chart">
            <el-empty description="学习趋势图表开发中..." />
          </div>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useAnkiStore } from '@/stores/ankiStore'

const ankiStore = useAnkiStore()

// 状态
const loading = ref(false)
const stats = ref<any>(null)
const deckStats = ref<any[]>([])

// 格式化日期
const formatDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleString('zh-CN')
}

// 格式化时间
const formatTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return `${hours} 小时 ${remainingMinutes} 分钟`
}

// 刷新统计数据
const refreshStats = async () => {
  if (!ankiStore.isConnected) {
    ElMessage.error('未连接到 Anki')
    return
  }

  try {
    loading.value = true
    stats.value = await ankiStore.getStats()
    deckStats.value = ankiStore.decks
    ElMessage.success('统计数据已刷新')
  } catch (error) {
    ElMessage.error('刷新统计数据失败')
    console.error('刷新统计数据失败:', error)
  } finally {
    loading.value = false
  }
}

// 页面加载时初始化
onMounted(async () => {
  if (ankiStore.isConnected) {
    await refreshStats()
  }
})
</script>

<style scoped>
.stats-view {
  padding: 20px;
}

.page-card {
  min-height: 500px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-header span {
  font-size: 16px;
  color: #303133;
  font-weight: 600;
}

.loading-container {
  padding: 20px;
}

.stats-content {
  margin-top: 20px;
}

.stats-overview {
  margin-bottom: 20px;
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
  height: 100%;
  display: flex;
  align-items: center;
  gap: 15px;
}

.stat-icon {
  font-size: 40px;
  color: #409eff;
}

.stat-info {
  flex: 1;
}

.stat-number {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 14px;
  color: #909399;
}

.stats-section {
  margin-bottom: 20px;
}

.section-card {
  height: 200px;
}

.today-stats,
.progress-stats {
  padding: 10px 0;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding: 10px;
  background: #f9f9f9;
  border-radius: 4px;
}

.stat-label {
  font-size: 14px;
  color: #606266;
}

.stat-value {
  font-size: 16px;
  font-weight: bold;
  color: #303133;
}

.deck-stats {
  margin-top: 10px;
}

.deck-name {
  display: flex;
  align-items: center;
  gap: 8px;
}

.empty-stats {
  text-align: center;
  padding: 40px 20px;
}

.trend-chart {
  text-align: center;
  padding: 40px 20px;
}
</style> 