<template>
  <div class="statistics">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>统计信息</span>
          <div class="header-actions">
            <el-button type="primary" @click="refreshStats" :loading="loading">
              <el-icon><Refresh /></el-icon>
              刷新统计
            </el-button>
            <el-button type="success" @click="exportStats">
              <el-icon><Download /></el-icon>
              导出报告
            </el-button>
          </div>
        </div>
      </template>

      <!-- 连接状态提示 -->
      <el-alert
        v-if="!ankiStore.isConnected"
        title="未连接到 Anki"
        type="warning"
        description="请确保 Anki 正在运行且已安装 AnkiConnect 插件"
        show-icon
        :closable="false"
        style="margin-bottom: 20px;"
      />

      <!-- 总体统计 -->
      <div class="overall-stats" style="margin-bottom: 30px;">
        <h3>总体统计</h3>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-card shadow="hover" class="stat-card">
              <div class="stat-content">
                <div class="stat-icon">
                  <el-icon size="24"><Document /></el-icon>
                </div>
                <div class="stat-info">
                  <div class="stat-number">{{ overallStats.totalCards }}</div>
                  <div class="stat-label">总卡片数</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover" class="stat-card">
              <div class="stat-content">
                <div class="stat-icon">
                  <el-icon size="24"><Folder /></el-icon>
                </div>
                <div class="stat-info">
                  <div class="stat-number">{{ overallStats.totalDecks }}</div>
                  <div class="stat-label">总牌组数</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover" class="stat-card">
              <div class="stat-content">
                <div class="stat-icon">
                  <el-icon size="24"><DataAnalysis /></el-icon>
                </div>
                <div class="stat-info">
                  <div class="stat-number">{{ overallStats.reviewedToday }}</div>
                  <div class="stat-label">今日复习</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover" class="stat-card">
              <div class="stat-content">
                <div class="stat-icon">
                  <el-icon size="24"><TrendCharts /></el-icon>
                </div>
                <div class="stat-info">
                  <div class="stat-number">{{ overallStats.avgAccuracy }}%</div>
                  <div class="stat-label">平均正确率</div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <!-- 图表区域 -->
      <div class="charts-section">
        <el-row :gutter="20">
          <!-- 学习进度图表 -->
          <el-col :span="12">
            <el-card class="chart-card">
              <template #header>
                <div class="chart-header">
                  <span>学习进度趋势</span>
                  <el-select v-model="progressPeriod" size="small" style="width: 120px;">
                    <el-option label="7天" value="7" />
                    <el-option label="30天" value="30" />
                    <el-option label="90天" value="90" />
                  </el-select>
                </div>
              </template>
              <div class="chart-container">
                <div class="chart-placeholder">
                  <el-icon size="48" color="#409EFF"><TrendCharts /></el-icon>
                  <p>学习进度图表</p>
                  <p class="chart-desc">显示每日复习卡片数量和正确率趋势</p>
                </div>
              </div>
            </el-card>
          </el-col>

          <!-- 牌组分布图表 -->
          <el-col :span="12">
            <el-card class="chart-card">
              <template #header>
                <div class="chart-header">
                  <span>牌组卡片分布</span>
                </div>
              </template>
              <div class="chart-container">
                <div class="chart-placeholder">
                  <el-icon size="48" color="#67C23A"><PieChart /></el-icon>
                  <p>牌组分布图表</p>
                  <p class="chart-desc">显示各牌组的卡片数量分布</p>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <!-- 详细统计表格 -->
      <div class="detailed-stats">
        <el-tabs v-model="activeTab" type="border-card">
          <!-- 牌组统计 -->
          <el-tab-pane label="牌组统计" name="decks">
            <el-table :data="deckStats" style="width: 100%">
              <el-table-column prop="name" label="牌组名称" min-width="200" />
              <el-table-column prop="cardCount" label="卡片数量" width="120" align="center">
                <template #default="{ row }">
                  <el-tag type="info">{{ row.cardCount }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="reviewedToday" label="今日复习" width="120" align="center">
                <template #default="{ row }">
                  <el-tag type="success">{{ row.reviewedToday }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="accuracy" label="正确率" width="120" align="center">
                <template #default="{ row }">
                  <el-progress 
                    :percentage="row.accuracy" 
                    :color="getAccuracyColor(row.accuracy)"
                    :stroke-width="8"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="lastReview" label="最后复习" width="180" align="center">
                <template #default="{ row }">
                  {{ formatDate(row.lastReview) }}
                </template>
              </el-table-column>
              <el-table-column label="操作" width="120" align="center">
                <template #default="{ row }">
                  <el-button type="link" size="small" @click="viewDeckDetails(row)">
                    详情
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>

          <!-- 学习记录 -->
          <el-tab-pane label="学习记录" name="reviews">
            <div class="review-filters" style="margin-bottom: 20px;">
              <el-date-picker
                v-model="reviewDateRange"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="width: 300px; margin-right: 10px;"
              />
              <el-select v-model="selectedDeck" placeholder="选择牌组" style="width: 200px; margin-right: 10px;">
                <el-option label="全部牌组" value="" />
                <el-option
                  v-for="deck in deckStats"
                  :key="deck.name"
                  :label="deck.name"
                  :value="deck.name"
                />
              </el-select>
              <el-button type="primary" @click="filterReviews">
                筛选
              </el-button>
            </div>
            <el-table :data="reviewHistory" style="width: 100%">
              <el-table-column prop="date" label="日期" width="120" align="center">
                <template #default="{ row }">
                  {{ formatDate(row.date) }}
                </template>
              </el-table-column>
              <el-table-column prop="deck" label="牌组" width="150" />
              <el-table-column prop="reviewed" label="复习数量" width="120" align="center">
                <template #default="{ row }">
                  <el-tag type="info">{{ row.reviewed }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="correct" label="正确数量" width="120" align="center">
                <template #default="{ row }">
                  <el-tag type="success">{{ row.correct }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="accuracy" label="正确率" width="120" align="center">
                <template #default="{ row }">
                  <el-progress 
                    :percentage="row.accuracy" 
                    :color="getAccuracyColor(row.accuracy)"
                    :stroke-width="8"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="timeSpent" label="用时" width="120" align="center">
                <template #default="{ row }">
                  {{ formatTime(row.timeSpent) }}
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>

          <!-- 卡片状态 -->
          <el-tab-pane label="卡片状态" name="cards">
            <div class="card-status-summary" style="margin-bottom: 20px;">
              <el-row :gutter="20">
                <el-col :span="6">
                  <el-card shadow="hover">
                    <div class="status-item">
                      <div class="status-number">{{ cardStatus.new }}</div>
                      <div class="status-label">新卡片</div>
                    </div>
                  </el-card>
                </el-col>
                <el-col :span="6">
                  <el-card shadow="hover">
                    <div class="status-item">
                      <div class="status-number">{{ cardStatus.learning }}</div>
                      <div class="status-label">学习中</div>
                    </div>
                  </el-card>
                </el-col>
                <el-col :span="6">
                  <el-card shadow="hover">
                    <div class="status-item">
                      <div class="status-number">{{ cardStatus.review }}</div>
                      <div class="status-label">复习中</div>
                    </div>
                  </el-card>
                </el-col>
                <el-col :span="6">
                  <el-card shadow="hover">
                    <div class="status-item">
                      <div class="status-number">{{ cardStatus.suspended }}</div>
                      <div class="status-label">已暂停</div>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </div>
            <el-table :data="cardStatusDetails" style="width: 100%">
              <el-table-column prop="deck" label="牌组" min-width="200" />
              <el-table-column prop="new" label="新卡片" width="100" align="center">
                <template #default="{ row }">
                  <el-tag type="info">{{ row.new }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="learning" label="学习中" width="100" align="center">
                <template #default="{ row }">
                  <el-tag type="warning">{{ row.learning }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="review" label="复习中" width="100" align="center">
                <template #default="{ row }">
                  <el-tag type="success">{{ row.review }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="suspended" label="已暂停" width="100" align="center">
                <template #default="{ row }">
                  <el-tag type="danger">{{ row.suspended }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="total" label="总计" width="100" align="center">
                <template #default="{ row }">
                  <el-tag type="primary">{{ row.total }}</el-tag>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>

    <!-- 牌组详情对话框 -->
    <el-dialog
      v-model="deckDetailsVisible"
      title="牌组详情"
      width="800px"
    >
      <div class="deck-details">
        <div class="details-header">
          <h3>{{ selectedDeckDetails.name }}</h3>
          <p>{{ selectedDeckDetails.description }}</p>
        </div>
        <div class="details-stats">
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="detail-stat">
                <div class="stat-number">{{ selectedDeckDetails.cardCount }}</div>
                <div class="stat-label">卡片数量</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="detail-stat">
                <div class="stat-number">{{ selectedDeckDetails.reviewedToday }}</div>
                <div class="stat-label">今日复习</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="detail-stat">
                <div class="stat-number">{{ selectedDeckDetails.accuracy }}%</div>
                <div class="stat-label">正确率</div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="details-chart">
          <h4>学习进度</h4>
          <div class="chart-placeholder">
            <el-icon size="48" color="#409EFF"><TrendCharts /></el-icon>
            <p>学习进度图表</p>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useAnkiStore } from '../stores/ankiStore.js'
import { 
  Refresh, 
  Download, 
  Document, 
  Folder, 
  DataAnalysis, 
  TrendCharts,
  PieChart
} from '@element-plus/icons-vue'

const ankiStore = useAnkiStore()

// 响应式数据
const loading = ref(false)
const activeTab = ref('decks')
const progressPeriod = ref('30')
const reviewDateRange = ref([])
const selectedDeck = ref('')
const deckDetailsVisible = ref(false)
const selectedDeckDetails = ref({})

// 使用真实数据
const overallStats = computed(() => ankiStore.overallStats)

const deckStats = computed(() => {
  return Object.entries(ankiStore.deckStats).map(([name, stats]) => {
    if (!stats) return null
    
    return {
      name,
      cardCount: stats.total || 0,
      reviewedToday: 0, // 暂时设为0，后续可以从复习记录中获取
      accuracy: 85, // 暂时设为85%，后续可以从复习记录中计算
      lastReview: new Date(), // 暂时使用当前时间
      description: `${name} 牌组`
    }
  }).filter(Boolean)
})

const reviewHistory = computed(() => {
  return ankiStore.reviewHistory.map(review => ({
    date: new Date(review.reviewTime * 1000),
    deck: review.deck || '未知牌组',
    reviewed: 1,
    correct: review.ease >= 3 ? 1 : 0,
    accuracy: review.ease >= 3 ? 100 : 0,
    timeSpent: review.timeTaken || 0
  }))
})

const cardStatus = computed(() => ankiStore.cardStatusStats)

const cardStatusDetails = computed(() => {
  return Object.entries(ankiStore.deckStats).map(([deckName, stats]) => {
    if (!stats) return null
    
    return {
      deck: deckName,
      new: stats.new || 0,
      learning: stats.learning || 0,
      review: stats.review || 0,
      suspended: stats.suspended || 0,
      total: stats.total || 0
    }
  }).filter(Boolean)
})

// 方法
const formatDate = (date) => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('zh-CN')
}

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

const getAccuracyColor = (accuracy) => {
  if (accuracy >= 90) return '#67C23A'
  if (accuracy >= 80) return '#E6A23C'
  if (accuracy >= 70) return '#F56C6C'
  return '#909399'
}

const refreshStats = async () => {
  if (!ankiStore.isConnected) {
    ElMessage.warning('请先连接到 Anki')
    return
  }
  
  loading.value = true
  try {
    // 刷新所有统计数据
    await Promise.allSettled([
      ankiStore.loadDeckStats(),
      ankiStore.loadCardStatusStats(),
      ankiStore.loadOverallStats()
    ])
    ElMessage.success('统计数据已刷新！')
  } catch (error) {
    ElMessage.error(`刷新失败: ${error.message}`)
  } finally {
    loading.value = false
  }
}

const exportStats = () => {
  ElMessage.info('导出统计报告功能开发中...')
}

const viewDeckDetails = (deck) => {
  selectedDeckDetails.value = { ...deck }
  deckDetailsVisible.value = true
}

const filterReviews = () => {
  if (reviewDateRange.value && reviewDateRange.value.length === 2) {
    const [startDate, endDate] = reviewDateRange.value
    const start = startDate.toISOString().split('T')[0]
    const end = endDate.toISOString().split('T')[0]
    
    ankiStore.loadReviewHistory(start, end)
    ElMessage.success('筛选条件已应用')
  } else {
    ElMessage.warning('请选择日期范围')
  }
}

// 生命周期
onMounted(async () => {
  try {
    // 如果已连接，加载统计数据
    if (ankiStore.isConnected) {
      await Promise.allSettled([
        ankiStore.loadDeckStats(),
        ankiStore.loadCardStatusStats(),
        ankiStore.loadOverallStats()
      ])
    }
  } catch (error) {
    console.error('加载统计数据失败:', error)
  }
})
</script>

<style scoped>
.statistics {
  height: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.overall-stats {
  margin-bottom: 30px;
}

.overall-stats h3 {
  margin-bottom: 20px;
  color: #303133;
}

.stat-card {
  text-align: center;
}

.stat-content {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
}

.stat-icon {
  margin-right: 15px;
  color: #409EFF;
}

.stat-info {
  text-align: left;
}

.stat-number {
  font-size: 24px;
  font-weight: bold;
  color: #409EFF;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 14px;
  color: #606266;
}

.charts-section {
  margin-bottom: 30px;
}

.chart-card {
  height: 400px;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chart-container {
  height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart-placeholder {
  text-align: center;
  color: #909399;
}

.chart-placeholder p {
  margin: 10px 0 5px 0;
  font-size: 16px;
}

.chart-desc {
  font-size: 14px;
  color: #C0C4CC;
}

.detailed-stats {
  margin-top: 30px;
}

.review-filters {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.status-item {
  text-align: center;
  padding: 15px;
}

.status-number {
  font-size: 24px;
  font-weight: bold;
  color: #409EFF;
  margin-bottom: 5px;
}

.status-label {
  font-size: 14px;
  color: #606266;
}

.deck-details {
  max-height: 600px;
  overflow-y: auto;
}

.details-header {
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ebeef5;
}

.details-header h3 {
  margin: 0 0 10px 0;
  color: #303133;
}

.details-header p {
  margin: 0;
  color: #606266;
}

.details-stats {
  margin-bottom: 20px;
}

.detail-stat {
  text-align: center;
  padding: 15px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.detail-stat .stat-number {
  font-size: 20px;
  font-weight: bold;
  color: #409EFF;
  margin-bottom: 5px;
}

.detail-stat .stat-label {
  font-size: 12px;
  color: #606266;
}

.details-chart {
  margin-top: 20px;
}

.details-chart h4 {
  margin-bottom: 15px;
  color: #303133;
}
</style> 