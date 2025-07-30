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
    <el-card class="page-card" shadow="never">
      <template #header>
        <div class="page-header">
          <span>欢迎使用 Anki Editor</span>
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

      <!-- 快速操作 -->
      <el-row :gutter="20" class="quick-actions">
        <el-col :span="6">
          <el-card class="action-card" shadow="hover" @click="navigateTo('/decks')">
            <div class="action-content">
              <div class="action-icon">
                <el-icon><Folder /></el-icon>
              </div>
              <div class="action-info">
                <h3>牌组管理</h3>
                <p>管理您的 Anki 牌组</p>
              </div>
            </div>
          </el-card>
        </el-col>
        
        <el-col :span="6">
          <el-card class="action-card" shadow="hover" @click="navigateTo('/cards')">
            <div class="action-content">
              <div class="action-icon">
                <el-icon><Document /></el-icon>
              </div>
              <div class="action-info">
                <h3>卡片管理</h3>
                <p>浏览和编辑卡片</p>
              </div>
            </div>
          </el-card>
        </el-col>
        
        <el-col :span="6">
          <el-card class="action-card" shadow="hover" @click="navigateTo('/templates')">
            <div class="action-content">
              <div class="action-icon">
                <el-icon><Files /></el-icon>
              </div>
              <div class="action-info">
                <h3>模板管理</h3>
                <p>管理卡片模板</p>
              </div>
            </div>
          </el-card>
        </el-col>
        
        <el-col :span="6">
          <el-card class="action-card" shadow="hover" @click="navigateTo('/tags')">
            <div class="action-content">
              <div class="action-icon">
                <el-icon><PriceTag /></el-icon>
              </div>
              <div class="action-info">
                <h3>标签管理</h3>
                <p>管理卡片标签</p>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <!-- 统计概览 -->
      <el-row :gutter="20" class="stats-overview">
        <el-col :span="8">
          <el-card class="stat-card" shadow="never">
            <template #header>
              <span>牌组统计</span>
            </template>
            <div class="stat-content">
              <div class="stat-number">{{ ankiStore.decks.length }}</div>
              <div class="stat-label">牌组数量</div>
            </div>
          </el-card>
        </el-col>
        
        <el-col :span="8">
          <el-card class="stat-card" shadow="never">
            <template #header>
              <span>卡片统计</span>
            </template>
            <div class="stat-content">
              <div class="stat-number">{{ ankiStore.notes.length }}</div>
              <div class="stat-label">卡片数量</div>
            </div>
          </el-card>
        </el-col>
        
        <el-col :span="8">
          <el-card class="stat-card" shadow="never">
            <template #header>
              <span>模板统计</span>
            </template>
            <div class="stat-content">
              <div class="stat-number">{{ ankiStore.models.length }}</div>
              <div class="stat-label">模板数量</div>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <!-- 最近活动 -->
      <el-card class="section-card" shadow="never">
        <template #header>
          <span>最近活动</span>
        </template>
        <div class="recent-activity">
          <el-empty description="暂无最近活动" />
        </div>
      </el-card>

      <!-- 快速入门 -->
      <el-card class="section-card" shadow="never">
        <template #header>
          <span>快速入门</span>
        </template>
        <div class="quick-start">
          <el-steps :active="1" direction="vertical">
            <el-step title="连接 Anki" description="在设置中配置 AnkiConnect 连接">
              <template #icon>
                <el-icon><Connection /></el-icon>
              </template>
            </el-step>
            <el-step title="管理牌组" description="创建和管理您的牌组">
              <template #icon>
                <el-icon><Folder /></el-icon>
              </template>
            </el-step>
            <el-step title="编辑卡片" description="创建和编辑卡片内容">
              <template #icon>
                <el-icon><Document /></el-icon>
              </template>
            </el-step>
            <el-step title="使用模板" description="选择合适的卡片模板">
              <template #icon>
                <el-icon><Files /></el-icon>
              </template>
            </el-step>
          </el-steps>
        </div>
      </el-card>
    </el-card>
  </div>
</template>

<style scoped>
.home-view {
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

.quick-actions {
  margin-bottom: 30px;
}

.action-card {
  height: 120px;
  cursor: pointer;
  transition: all 0.3s;
}

.action-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.action-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.action-icon {
  font-size: 40px;
  color: #409eff;
  margin-bottom: 10px;
}

.action-info h3 {
  margin: 0 0 5px 0;
  color: #303133;
  font-size: 16px;
}

.action-info p {
  margin: 0;
  color: #606266;
  font-size: 14px;
}

.stats-overview {
  margin-bottom: 30px;
}

.stat-card {
  height: 100px;
}

.stat-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.stat-number {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 5px;
}

.stat-label {
  color: #909399;
  font-size: 14px;
}

.section-card {
  margin-bottom: 20px;
}

.recent-activity {
  min-height: 200px;
}

.quick-start {
  padding: 20px;
}
</style>
