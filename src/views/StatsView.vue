<template>
  <div class="stats-view">
    <div class="page-header">
      <h2>数据统计</h2>
      <div class="header-actions">
        <el-button @click="refreshStats">
          <el-icon><Refresh /></el-icon>
          刷新统计
        </el-button>
      </div>
    </div>

    <div class="stats-content">
      <!-- 概览卡片 -->
      <el-row :gutter="20" style="margin-bottom: 20px;">
        <el-col :span="6" v-for="stat in overviewStats" :key="stat.id">
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

      <!-- 图表区域 -->
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card>
            <template #header>
              <div class="card-header">
                <span>牌组卡片分布</span>
              </div>
            </template>
            <div class="chart-container">
              <div class="chart-placeholder">
                <el-icon><PieChart /></el-icon>
                <p>饼图：牌组卡片分布</p>
                <p>这里将显示各牌组的卡片数量分布</p>
              </div>
            </div>
          </el-card>
        </el-col>
        
        <el-col :span="12">
          <el-card>
            <template #header>
              <div class="card-header">
                <span>学习进度趋势</span>
              </div>
            </template>
            <div class="chart-container">
              <div class="chart-placeholder">
                <el-icon><TrendCharts /></el-icon>
                <p>折线图：学习进度趋势</p>
                <p>这里将显示每日学习卡片数量趋势</p>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <!-- 详细统计表格 -->
      <el-card style="margin-top: 20px;">
        <template #header>
          <div class="card-header">
            <span>牌组详细统计</span>
          </div>
        </template>
        
        <el-table :data="deckStats" style="width: 100%">
          <el-table-column prop="name" label="牌组名称" />
          <el-table-column prop="totalCards" label="总卡片数" width="120" />
          <el-table-column prop="newCards" label="新卡片" width="100" />
          <el-table-column prop="learningCards" label="学习中" width="100" />
          <el-table-column prop="reviewCards" label="待复习" width="100" />
          <el-table-column prop="suspendedCards" label="暂停" width="100" />
          <el-table-column prop="lastStudied" label="最后学习" width="180" />
        </el-table>
      </el-card>

      <!-- 标签统计 -->
      <el-card style="margin-top: 20px;">
        <template #header>
          <div class="card-header">
            <span>标签统计</span>
          </div>
        </template>
        
        <el-table :data="tagStats" style="width: 100%">
          <el-table-column prop="name" label="标签名称" />
          <el-table-column prop="color" label="颜色" width="100">
            <template #default="scope">
              <el-tag :color="scope.row.color" effect="dark">{{ scope.row.name }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="cardCount" label="卡片数量" width="120" />
          <el-table-column prop="percentage" label="占比" width="100">
            <template #default="scope">
              {{ scope.row.percentage }}%
            </template>
          </el-table-column>
          <el-table-column prop="lastUsed" label="最后使用" width="180" />
        </el-table>
      </el-card>

      <!-- 学习历史 -->
      <el-card style="margin-top: 20px;">
        <template #header>
          <div class="card-header">
            <span>学习历史</span>
          </div>
        </template>
        
        <el-timeline>
          <el-timeline-item
            v-for="history in studyHistory"
            :key="history.id"
            :timestamp="history.time"
            :type="history.type"
          >
            <h4>{{ history.title }}</h4>
            <p>{{ history.description }}</p>
          </el-timeline-item>
        </el-timeline>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

// 概览统计
const overviewStats = ref([
  {
    id: '1',
    label: '总卡片数',
    value: '1,234',
    icon: 'Document',
    color: '#409eff'
  },
  {
    id: '2',
    label: '今日学习',
    value: '45',
    icon: 'Clock',
    color: '#67c23a'
  },
  {
    id: '3',
    label: '待复习',
    value: '23',
    icon: 'Warning',
    color: '#e6a23c'
  },
  {
    id: '4',
    label: '学习天数',
    value: '15',
    icon: 'Calendar',
    color: '#f56c6c'
  }
])

// 牌组统计
const deckStats = ref([
  {
    name: '默认牌组',
    totalCards: 150,
    newCards: 10,
    learningCards: 5,
    reviewCards: 8,
    suspendedCards: 2,
    lastStudied: '2024-01-15 14:30:00'
  },
  {
    name: 'JavaScript 学习',
    totalCards: 89,
    newCards: 15,
    learningCards: 3,
    reviewCards: 12,
    suspendedCards: 1,
    lastStudied: '2024-01-15 13:45:00'
  },
  {
    name: 'Vue.js 基础',
    totalCards: 67,
    newCards: 8,
    learningCards: 2,
    reviewCards: 6,
    suspendedCards: 0,
    lastStudied: '2024-01-15 12:20:00'
  }
])

// 标签统计
const tagStats = ref([
  {
    name: '学习',
    color: '#409eff',
    cardCount: 150,
    percentage: 12.2,
    lastUsed: '2024-01-15 14:30:00'
  },
  {
    name: '工作',
    color: '#67c23a',
    cardCount: 89,
    percentage: 7.2,
    lastUsed: '2024-01-15 13:45:00'
  },
  {
    name: 'javascript',
    color: '#e6a23c',
    cardCount: 67,
    percentage: 5.4,
    lastUsed: '2024-01-15 12:20:00'
  },
  {
    name: 'vue',
    color: '#f56c6c',
    cardCount: 45,
    percentage: 3.6,
    lastUsed: '2024-01-15 11:15:00'
  }
])

// 学习历史
const studyHistory = ref([
  {
    id: '1',
    title: '完成今日学习',
    description: '学习了 45 张卡片，其中新卡片 15 张，复习 30 张',
    time: '2024-01-15 14:30:00',
    type: 'success'
  },
  {
    id: '2',
    title: '添加新卡片',
    description: '在 JavaScript 学习牌组中添加了 10 张新卡片',
    time: '2024-01-15 13:45:00',
    type: 'primary'
  },
  {
    id: '3',
    title: '导入牌组',
    description: '导入了 Vue.js 基础牌组，共 67 张卡片',
    time: '2024-01-15 12:20:00',
    type: 'info'
  },
  {
    id: '4',
    title: '创建新牌组',
    description: '创建了 JavaScript 学习牌组',
    time: '2024-01-15 11:15:00',
    type: 'warning'
  }
])

const refreshStats = () => {
  ElMessage.success('统计数据已刷新')
}
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
  gap: 10px;
}

.stats-content {
  background: #fff;
  border-radius: 4px;
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

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chart-container {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart-placeholder {
  text-align: center;
  color: #909399;
}

.chart-placeholder .el-icon {
  font-size: 48px;
  margin-bottom: 10px;
}

.chart-placeholder p {
  margin: 5px 0;
}
</style> 