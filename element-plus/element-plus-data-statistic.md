### 35. Statistic 统计组件
- **用途**: 展示统计数据
- **特点**: 支持数值格式化、前缀后缀、精度控制

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-statistic title="活跃用户" :value="112893" />

  <!-- 带前缀后缀 -->
  <el-statistic 
    title="账户余额" 
    :value="112893" 
    prefix="¥" 
    suffix="元"
  />

  <!-- 数值格式化 -->
  <el-statistic 
    title="总销售额" 
    :value="112893" 
    :precision="2"
    prefix="¥"
  />

  <!-- 千分位分隔符 -->
  <el-statistic 
    title="访问量" 
    :value="112893" 
    :value-style="{ color: '#3f8600' }"
  />

  <!-- 自定义样式 -->
  <el-statistic 
    title="增长率" 
    :value="11.28" 
    :precision="2"
    suffix="%"
    :value-style="{ color: '#cf1322' }"
  />

  <!-- 不同尺寸 -->
  <el-statistic 
    title="大尺寸" 
    :value="112893" 
    size="large"
  />
  <el-statistic 
    title="默认尺寸" 
    :value="112893" 
    size="default"
  />
  <el-statistic 
    title="小尺寸" 
    :value="112893" 
    size="small"
  />

  <!-- 在页面中使用 -->
  <div class="statistic-container">
    <h3>数据统计面板</h3>
    
    <!-- 统计卡片网格 -->
    <div class="statistic-grid">
      <el-card class="statistic-card">
        <el-statistic 
          title="总用户数"
          :value="userStats.total"
          :precision="0"
          :value-style="{ color: '#409eff', fontSize: '24px' }"
        >
          <template #prefix>
            <el-icon style="color: #409eff; margin-right: 8px">
              <User />
            </el-icon>
          </template>
        </el-statistic>
        <div class="statistic-trend">
          <span class="trend-label">较昨日</span>
          <span class="trend-value positive">+{{ userStats.increase }}%</span>
        </div>
      </el-card>

      <el-card class="statistic-card">
        <el-statistic 
          title="今日活跃"
          :value="userStats.active"
          :precision="0"
          :value-style="{ color: '#67c23a', fontSize: '24px' }"
        >
          <template #prefix>
            <el-icon style="color: #67c23a; margin-right: 8px">
              <UserFilled />
            </el-icon>
          </template>
        </el-statistic>
        <div class="statistic-trend">
          <span class="trend-label">较昨日</span>
          <span class="trend-value positive">+{{ userStats.activeIncrease }}%</span>
        </div>
      </el-card>

      <el-card class="statistic-card">
        <el-statistic 
          title="总收入"
          :value="revenueStats.total"
          :precision="2"
          prefix="¥"
          :value-style="{ color: '#e6a23c', fontSize: '24px' }"
        >
          <template #prefix>
            <el-icon style="color: #e6a23c; margin-right: 8px">
              <Money />
            </el-icon>
          </template>
        </el-statistic>
        <div class="statistic-trend">
          <span class="trend-label">较昨日</span>
          <span class="trend-value positive">+{{ revenueStats.increase }}%</span>
        </div>
      </el-card>

      <el-card class="statistic-card">
        <el-statistic 
          title="订单数"
          :value="orderStats.total"
          :precision="0"
          :value-style="{ color: '#f56c6c', fontSize: '24px' }"
        >
          <template #prefix>
            <el-icon style="color: #f56c6c; margin-right: 8px">
              <ShoppingCart />
            </el-icon>
          </template>
        </el-statistic>
        <div class="statistic-trend">
          <span class="trend-label">较昨日</span>
          <span class="trend-value negative">-{{ orderStats.decrease }}%</span>
        </div>
      </el-card>
    </div>

    <!-- 详细统计表格 -->
    <div class="detailed-stats">
      <h4>详细统计</h4>
      <el-table :data="detailedStats" style="width: 100%">
        <el-table-column prop="category" label="分类" />
        <el-table-column prop="value" label="数值">
          <template #default="scope">
            <el-statistic 
              :value="scope.row.value"
              :precision="scope.row.precision"
              :prefix="scope.row.prefix"
              :suffix="scope.row.suffix"
              :value-style="scope.row.style"
            />
          </template>
        </el-table-column>
        <el-table-column prop="change" label="变化">
          <template #default="scope">
            <span :class="scope.row.changeClass">
              {{ scope.row.change }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="trend" label="趋势">
          <template #default="scope">
            <el-icon :class="scope.row.trendClass">
              <component :is="scope.row.trendIcon" />
            </el-icon>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 实时数据监控 -->
    <div class="realtime-monitor">
      <h4>实时数据监控</h4>
      <div class="monitor-grid">
        <div class="monitor-item">
          <el-statistic 
            title="CPU 使用率"
            :value="systemStats.cpu"
            suffix="%"
            :value-style="{ color: getCpuColor(systemStats.cpu) }"
          />
          <el-progress 
            :percentage="systemStats.cpu" 
            :color="getCpuColor(systemStats.cpu)"
            :stroke-width="8"
          />
        </div>
        
        <div class="monitor-item">
          <el-statistic 
            title="内存使用率"
            :value="systemStats.memory"
            suffix="%"
            :value-style="{ color: getMemoryColor(systemStats.memory) }"
          />
          <el-progress 
            :percentage="systemStats.memory" 
            :color="getMemoryColor(systemStats.memory)"
            :stroke-width="8"
          />
        </div>
        
        <div class="monitor-item">
          <el-statistic 
            title="磁盘使用率"
            :value="systemStats.disk"
            suffix="%"
            :value-style="{ color: getDiskColor(systemStats.disk) }"
          />
          <el-progress 
            :percentage="systemStats.disk" 
            :color="getDiskColor(systemStats.disk)"
            :stroke-width="8"
          />
        </div>
        
        <div class="monitor-item">
          <el-statistic 
            title="网络流量"
            :value="systemStats.network"
            suffix="MB/s"
            :value-style="{ color: '#409eff' }"
          />
          <div class="network-chart">
            <div class="chart-bar" :style="{ height: systemStats.network * 2 + 'px' }"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 控制按钮 -->
    <div class="demo-controls">
      <el-button @click="refreshData" :loading="refreshing">
        刷新数据
      </el-button>
      <el-button @click="exportData">
        导出数据
      </el-button>
      <el-button @click="toggleAutoRefresh">
        {{ autoRefresh ? '停止自动刷新' : '开始自动刷新' }}
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { 
  User, 
  UserFilled, 
  Money, 
  ShoppingCart,
  ArrowUp,
  ArrowDown
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

// 状态控制
const refreshing = ref(false)
const autoRefresh = ref(false)
let refreshTimer = null

// 用户统计数据
const userStats = reactive({
  total: 1234567,
  active: 45678,
  increase: 12.5,
  activeIncrease: 8.3
})

// 收入统计数据
const revenueStats = reactive({
  total: 9876543.21,
  increase: 15.7
})

// 订单统计数据
const orderStats = reactive({
  total: 34567,
  decrease: 2.1
})

// 系统统计数据
const systemStats = reactive({
  cpu: 45,
  memory: 68,
  disk: 72,
  network: 12.5
})

// 详细统计数据
const detailedStats = ref([
  {
    category: '新用户注册',
    value: 1234,
    precision: 0,
    prefix: '',
    suffix: '人',
    style: { color: '#67c23a' },
    change: '+12.5%',
    changeClass: 'change-positive',
    trend: 'up',
    trendClass: 'trend-up',
    trendIcon: ArrowUp
  },
  {
    category: '付费用户',
    value: 567,
    precision: 0,
    prefix: '',
    suffix: '人',
    style: { color: '#e6a23c' },
    change: '+8.3%',
    changeClass: 'change-positive',
    trend: 'up',
    trendClass: 'trend-up',
    trendIcon: ArrowUp
  },
  {
    category: '平均订单金额',
    value: 299.99,
    precision: 2,
    prefix: '¥',
    suffix: '',
    style: { color: '#409eff' },
    change: '-2.1%',
    changeClass: 'change-negative',
    trend: 'down',
    trendClass: 'trend-down',
    trendIcon: ArrowDown
  },
  {
    category: '转化率',
    value: 15.7,
    precision: 1,
    prefix: '',
    suffix: '%',
    style: { color: '#f56c6c' },
    change: '+1.2%',
    changeClass: 'change-positive',
    trend: 'up',
    trendClass: 'trend-up',
    trendIcon: ArrowUp
  }
])

// 颜色计算函数
const getCpuColor = (value) => {
  if (value < 50) return '#67c23a'
  if (value < 80) return '#e6a23c'
  return '#f56c6c'
}

const getMemoryColor = (value) => {
  if (value < 60) return '#67c23a'
  if (value < 85) return '#e6a23c'
  return '#f56c6c'
}

const getDiskColor = (value) => {
  if (value < 70) return '#67c23a'
  if (value < 90) return '#e6a23c'
  return '#f56c6c'
}

// 数据刷新函数
const refreshData = async () => {
  refreshing.value = true
  
  // 模拟数据更新
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // 更新统计数据
  userStats.total = Math.floor(Math.random() * 2000000) + 1000000
  userStats.active = Math.floor(Math.random() * 100000) + 30000
  userStats.increase = (Math.random() * 20).toFixed(1)
  userStats.activeIncrease = (Math.random() * 15).toFixed(1)
  
  revenueStats.total = Math.random() * 20000000 + 5000000
  revenueStats.increase = (Math.random() * 25).toFixed(1)
  
  orderStats.total = Math.floor(Math.random() * 50000) + 20000
  orderStats.decrease = (Math.random() * 5).toFixed(1)
  
  systemStats.cpu = Math.floor(Math.random() * 100)
  systemStats.memory = Math.floor(Math.random() * 100)
  systemStats.disk = Math.floor(Math.random() * 100)
  systemStats.network = (Math.random() * 20).toFixed(1)
  
  refreshing.value = false
  ElMessage.success('数据已刷新')
}

// 导出数据
const exportData = () => {
  ElMessage.success('数据导出功能')
}

// 切换自动刷新
const toggleAutoRefresh = () => {
  autoRefresh.value = !autoRefresh.value
  
  if (autoRefresh.value) {
    refreshTimer = setInterval(refreshData, 5000)
    ElMessage.success('已开启自动刷新')
  } else {
    if (refreshTimer) {
      clearInterval(refreshTimer)
      refreshTimer = null
    }
    ElMessage.info('已停止自动刷新')
  }
}

// 生命周期
onMounted(() => {
  // 初始化数据
  refreshData()
})

onUnmounted(() => {
  if (refreshTimer) {
    clearInterval(refreshTimer)
  }
})
</script>

<style scoped>
.statistic-container {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}

.statistic-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.statistic-card {
  padding: 20px;
}

.statistic-trend {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.trend-label {
  color: #909399;
}

.trend-value {
  font-weight: bold;
}

.trend-value.positive {
  color: #67c23a;
}

.trend-value.negative {
  color: #f56c6c;
}

.detailed-stats {
  margin: 30px 0;
}

.detailed-stats h4 {
  margin: 0 0 20px 0;
  color: #303133;
}

.change-positive {
  color: #67c23a;
  font-weight: bold;
}

.change-negative {
  color: #f56c6c;
  font-weight: bold;
}

.trend-up {
  color: #67c23a;
}

.trend-down {
  color: #f56c6c;
}

.realtime-monitor {
  margin: 30px 0;
}

.realtime-monitor h4 {
  margin: 0 0 20px 0;
  color: #303133;
}

.monitor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.monitor-item {
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  background: #fff;
}

.network-chart {
  margin-top: 10px;
  height: 40px;
  display: flex;
  align-items: end;
  justify-content: center;
}

.chart-bar {
  width: 20px;
  background: #409eff;
  border-radius: 2px;
  transition: height 0.3s ease;
}

.demo-controls {
  margin: 30px 0;
  text-align: center;
  padding: 20px;
  background: #f5f7fa;
  border-radius: 4px;
}

.demo-controls .el-button {
  margin: 0 10px;
}
</style>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| value | 数值 | number | — | — |
| decimal-separator | 设置小数点 | string | — | . |
| formatter | 自定义格式化函数 | function | — | — |
| group-separator | 设置千分位标识符 | string | — | , |
| precision | 数值精度 | number | — | 0 |
| prefix | 设置数值的前缀 | string / slot | — | — |
| suffix | 设置数值的后缀 | string / slot | — | — |
| title | 数值的标题 | string / slot | — | — |
| value-style | 设置数值的样式 | object | — | — |

#### 插槽
| 插槽名 | 说明 |
|--------|------|
| prefix | 自定义前缀内容 |
| suffix | 自定义后缀内容 |
| title | 自定义标题内容 |

#### 使用场景
1. **数据仪表板**: 展示关键业务指标
2. **财务统计**: 收入、支出、利润等财务数据
3. **用户统计**: 用户数量、活跃度等用户数据
4. **系统监控**: CPU、内存、磁盘等系统指标
5. **销售统计**: 销售额、订单数等销售数据
6. **性能指标**: 响应时间、吞吐量等性能数据
7. **实时数据**: 实时更新的统计数据展示 