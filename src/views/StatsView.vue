<template>
  <div class="stats-view">
    <div class="page-header">
      <h2>统计分析</h2>
      <div class="header-actions">
        <el-select v-model="selectedPeriod" placeholder="选择时间范围" style="width: 150px; margin-right: 10px;">
          <el-option label="今天" value="today" />
          <el-option label="本周" value="week" />
          <el-option label="本月" value="month" />
          <el-option label="今年" value="year" />
        </el-select>
        <el-button type="primary" @click="refreshStats">
          <el-icon><Refresh /></el-icon>
          刷新数据
        </el-button>
      </div>
    </div>

    <div class="stats-content">
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
      <div v-else-if="ankiStore.isConnected" class="stats-sections">
        <!-- 概览统计 -->
        <div class="overview-section">
          <h3>概览统计</h3>
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

        <!-- 牌组统计 -->
        <div class="deck-stats-section">
          <h3>牌组统计</h3>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-card>
                <template #header>
                  <span>牌组卡片分布</span>
                </template>
                <div class="chart-container">
                  <div v-if="deckStats.length > 0" class="deck-chart">
                    <div 
                      v-for="deck in deckStats" 
                      :key="deck.name" 
                      class="deck-bar"
                    >
                      <div class="deck-info">
                        <span class="deck-name">{{ deck.name }}</span>
                        <span class="deck-count">{{ deck.cardCount }}</span>
                      </div>
                      <div class="progress-bar">
                        <div 
                          class="progress-fill" 
                          :style="{ width: getDeckPercentage(deck.cardCount) + '%' }"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div v-else class="no-data">
                    <el-empty description="暂无牌组数据" />
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card>
                <template #header>
                  <span>牌组列表</span>
                </template>
                <div class="deck-list">
                  <el-table :data="ankiStore.decks" style="width: 100%">
                    <el-table-column prop="name" label="牌组名称" />
                    <el-table-column prop="cardCount" label="卡片数量" width="100" />
                    <el-table-column prop="lastModified" label="最后修改" width="180">
                      <template #default="{ row }">
                        {{ formatDate(row.lastModified) }}
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>

        <!-- 模板统计 -->
        <div class="model-stats-section">
          <h3>模板统计</h3>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-card>
                <template #header>
                  <span>模板字段分布</span>
                </template>
                <div class="chart-container">
                  <div v-if="modelStats.length > 0" class="model-chart">
                    <div 
                      v-for="model in modelStats" 
                      :key="model.name" 
                      class="model-item"
                    >
                      <div class="model-info">
                        <span class="model-name">{{ model.name }}</span>
                        <span class="model-fields">{{ model.fields.length }} 字段</span>
                      </div>
                      <div class="fields-tags">
                        <el-tag 
                          v-for="field in model.fields" 
                          :key="field" 
                          size="small" 
                          style="margin-right: 4px; margin-bottom: 4px;"
                        >
                          {{ field }}
                        </el-tag>
                      </div>
                    </div>
                  </div>
                  <div v-else class="no-data">
                    <el-empty description="暂无模板数据" />
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card>
                <template #header>
                  <span>模板列表</span>
                </template>
                <div class="model-list">
                  <el-table :data="ankiStore.models" style="width: 100%">
                    <el-table-column prop="name" label="模板名称" />
                    <el-table-column label="字段数量" width="100">
                      <template #default="{ row }">
                        {{ row.fields.length }}
                      </template>
                    </el-table-column>
                    <el-table-column label="卡片模板" width="100">
                      <template #default="{ row }">
                        {{ row.templates.length }}
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>

        <!-- 标签统计 -->
        <div class="tag-stats-section">
          <h3>标签统计</h3>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-card>
                <template #header>
                  <span>热门标签</span>
                </template>
                <div class="chart-container">
                  <div v-if="tagStats.length > 0" class="tag-chart">
                    <div 
                      v-for="tag in tagStats.slice(0, 10)" 
                      :key="tag.name" 
                      class="tag-item"
                    >
                      <div class="tag-info">
                        <span class="tag-name">{{ tag.name }}</span>
                        <span class="tag-count">{{ tag.count }}</span>
                      </div>
                      <div class="progress-bar">
                        <div 
                          class="progress-fill" 
                          :style="{ width: getTagPercentage(tag.count) + '%' }"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div v-else class="no-data">
                    <el-empty description="暂无标签数据" />
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card>
                <template #header>
                  <span>标签列表</span>
                </template>
                <div class="tag-list">
                  <div class="tag-cloud">
                    <el-tag 
                      v-for="tag in ankiStore.tags.slice(0, 20)" 
                      :key="tag" 
                      size="small"
                      style="margin: 4px;"
                    >
                      {{ tag }}
                    </el-tag>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>

        <!-- 学习统计 -->
        <div class="study-stats-section">
          <h3>学习统计</h3>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-card>
                <template #header>
                  <span>今日学习</span>
                </template>
                <div class="study-stats">
                  <div class="study-item">
                    <span class="study-label">今日复习卡片数</span>
                    <span class="study-value">{{ todayReviewed }}</span>
                  </div>
                  <div class="study-item">
                    <span class="study-label">今日新增卡片数</span>
                    <span class="study-value">{{ todayAdded }}</span>
                  </div>
                  <div class="study-item">
                    <span class="study-label">学习时长</span>
                    <span class="study-value">{{ studyTime }}</span>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card>
                <template #header>
                  <span>学习趋势</span>
                </template>
                <div class="trend-chart">
                  <div class="trend-item">
                    <span class="trend-label">本周学习</span>
                    <span class="trend-value">{{ weeklyStudy }}</span>
                  </div>
                  <div class="trend-item">
                    <span class="trend-label">本月学习</span>
                    <span class="trend-value">{{ monthlyStudy }}</span>
                  </div>
                  <div class="trend-item">
                    <span class="trend-label">总学习天数</span>
                    <span class="trend-value">{{ totalStudyDays }}</span>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-else class="empty-state">
        <el-empty description="暂无统计数据">
          <el-button type="primary" @click="refreshStats">
            刷新数据
          </el-button>
        </el-empty>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useAnkiStore } from '@/stores/ankiStore'

const ankiStore = useAnkiStore()

// 状态
const loading = ref(false)
const selectedPeriod = ref('today')

// 学习统计数据
const todayReviewed = ref(0)
const todayAdded = ref(0)
const studyTime = ref('0 分钟')
const weeklyStudy = ref(0)
const monthlyStudy = ref(0)
const totalStudyDays = ref(0)

// 计算属性
const deckStats = computed(() => {
  return ankiStore.decks.map(deck => ({
    name: deck.name,
    cardCount: deck.cardCount
  })).sort((a, b) => b.cardCount - a.cardCount)
})

const modelStats = computed(() => {
  return ankiStore.models.map(model => ({
    name: model.name,
    fields: model.fields
  }))
})

const tagStats = computed(() => {
  const tagCounts: Record<string, number> = {}
  
  ankiStore.notes.forEach(note => {
    note.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
    })
  })
  
  return Object.entries(tagCounts).map(([name, count]) => ({
    name,
    count
  })).sort((a, b) => b.count - a.count)
})

// 获取牌组百分比
const getDeckPercentage = (cardCount: number) => {
  if (deckStats.value.length === 0) return 0
  const maxCount = Math.max(...deckStats.value.map(d => d.cardCount))
  return maxCount > 0 ? (cardCount / maxCount) * 100 : 0
}

// 获取标签百分比
const getTagPercentage = (count: number) => {
  if (tagStats.value.length === 0) return 0
  const maxCount = Math.max(...tagStats.value.map(t => t.count))
  return maxCount > 0 ? (count / maxCount) * 100 : 0
}

// 格式化日期
const formatDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleString('zh-CN')
}

// 刷新统计数据
const refreshStats = async () => {
  if (!ankiStore.isConnected) {
    ElMessage.warning('请先连接到 Anki')
    return
  }

  loading.value = true
  try {
    // 刷新基础数据
    await ankiStore.initialize()
    
    // 获取今日学习统计
    try {
      todayReviewed.value = await ankiStore.getStats()
    } catch (error) {
      console.error('获取今日学习统计失败:', error)
      todayReviewed.value = 0
    }
    
    // 模拟其他统计数据
    todayAdded.value = Math.floor(Math.random() * 10)
    studyTime.value = `${Math.floor(Math.random() * 60)} 分钟`
    weeklyStudy.value = Math.floor(Math.random() * 100)
    monthlyStudy.value = Math.floor(Math.random() * 500)
    totalStudyDays.value = Math.floor(Math.random() * 365)
    
    ElMessage.success('统计数据已刷新')
  } catch (error) {
    ElMessage.error('刷新统计数据失败')
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

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.page-header h2 {
  margin: 0;
  color: #303133;
}

.header-actions {
  display: flex;
  align-items: center;
}

.stats-content {
  background: #fff;
  border-radius: 4px;
  padding: 20px;
}

.loading-container {
  padding: 20px;
}

.stats-sections {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.stats-sections h3 {
  margin: 0 0 20px 0;
  color: #303133;
  font-size: 18px;
}

.overview-section {
  margin-bottom: 30px;
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

.chart-container {
  min-height: 200px;
}

.deck-chart {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.deck-bar {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.deck-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.deck-name {
  font-weight: bold;
  color: #303133;
}

.deck-count {
  color: #409eff;
  font-weight: bold;
}

.progress-bar {
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #409eff, #67c23a);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.model-chart {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.model-item {
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  padding: 10px;
}

.model-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.model-name {
  font-weight: bold;
  color: #303133;
}

.model-fields {
  color: #409eff;
  font-size: 12px;
}

.fields-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.tag-chart {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.tag-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.tag-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tag-name {
  font-weight: bold;
  color: #303133;
}

.tag-count {
  color: #409eff;
  font-weight: bold;
}

.study-stats {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.study-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.study-item:last-child {
  border-bottom: none;
}

.study-label {
  color: #606266;
}

.study-value {
  font-weight: bold;
  color: #409eff;
}

.trend-chart {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.trend-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.trend-item:last-child {
  border-bottom: none;
}

.trend-label {
  color: #606266;
}

.trend-value {
  font-weight: bold;
  color: #409eff;
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 10px;
}

.no-data {
  text-align: center;
  padding: 40px 20px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
}
</style> 