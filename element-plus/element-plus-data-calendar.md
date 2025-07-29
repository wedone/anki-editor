### 27. Calendar 日历
- **用途**: 日历展示
- **特点**: 支持事件标记、自定义内容

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-calendar v-model="value1" />

  <!-- 自定义内容 -->
  <el-calendar v-model="value2">
    <template #dateCell="{ data }">
      <p :class="data.isSelected ? 'is-selected' : ''">
        {{ data.day.split('-').slice(1).join('-') }}
        {{ data.isSelected ? '✓' : '' }}
      </p>
    </template>
  </el-calendar>

  <!-- 事件标记 -->
  <el-calendar v-model="value3">
    <template #dateCell="{ data }">
      <div class="calendar-cell">
        <span class="date-text">{{ data.day.split('-').slice(1).join('-') }}</span>
        <div class="event-dots">
          <span 
            v-for="event in getEvents(data.day)" 
            :key="event.id"
            class="event-dot"
            :style="{ backgroundColor: event.color }"
            :title="event.title"
          ></span>
        </div>
      </div>
    </template>
  </el-calendar>

  <!-- 自定义头部 -->
  <el-calendar v-model="value4">
    <template #header="{ date }">
      <span>{{ date }}</span>
      <el-button-group>
        <el-button size="small" @click="selectDate('prev-month')">上个月</el-button>
        <el-button size="small" @click="selectDate('today')">今天</el-button>
        <el-button size="small" @click="selectDate('next-month')">下个月</el-button>
      </el-button-group>
    </template>
  </el-calendar>

  <!-- 范围选择 -->
  <el-calendar v-model="value5" :range="['2024-01-01', '2024-12-31']" />

  <!-- 不同尺寸 -->
  <el-calendar v-model="value6" size="large" />
  <el-calendar v-model="value6" size="default" />
  <el-calendar v-model="value6" size="small" />

  <!-- 在页面中使用 -->
  <div class="calendar-container">
    <h3>项目日程安排</h3>
    <el-calendar v-model="currentDate">
      <template #header="{ date }">
        <div class="calendar-header">
          <span class="header-title">{{ formatDate(date) }}</span>
          <div class="header-actions">
            <el-button size="small" @click="goToToday">今天</el-button>
            <el-button size="small" @click="addEvent">添加事件</el-button>
          </div>
        </div>
      </template>
      <template #dateCell="{ data }">
        <div class="project-calendar-cell">
          <div class="date-number">{{ data.day.split('-').slice(2).join('') }}</div>
          <div class="event-list">
            <div 
              v-for="event in getProjectEvents(data.day)" 
              :key="event.id"
              class="event-item"
              :class="event.type"
              @click="viewEvent(event)"
            >
              <span class="event-time">{{ event.time }}</span>
              <span class="event-title">{{ event.title }}</span>
            </div>
          </div>
        </div>
      </template>
    </el-calendar>

    <!-- 事件详情弹窗 -->
    <el-dialog
      v-model="eventDialogVisible"
      title="事件详情"
      width="500px"
    >
      <div v-if="selectedEvent" class="event-detail">
        <div class="event-header">
          <h4>{{ selectedEvent.title }}</h4>
          <el-tag :type="selectedEvent.type" size="small">
            {{ getEventTypeText(selectedEvent.type) }}
          </el-tag>
        </div>
        <div class="event-info">
          <p><strong>时间:</strong> {{ selectedEvent.date }} {{ selectedEvent.time }}</p>
          <p><strong>地点:</strong> {{ selectedEvent.location }}</p>
          <p><strong>负责人:</strong> {{ selectedEvent.assignee }}</p>
          <p><strong>描述:</strong> {{ selectedEvent.description }}</p>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="eventDialogVisible = false">关闭</el-button>
          <el-button type="primary" @click="editEvent">编辑</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const value1 = ref(new Date())
const value2 = ref(new Date())
const value3 = ref(new Date())
const value4 = ref(new Date())
const value5 = ref(new Date())
const value6 = ref(new Date())

const currentDate = ref(new Date())
const eventDialogVisible = ref(false)
const selectedEvent = ref(null)

// 事件数据
const events = ref([
  {
    id: 1,
    date: '2024-01-15',
    title: '项目启动会议',
    color: '#409EFF',
    type: 'meeting'
  },
  {
    id: 2,
    date: '2024-01-20',
    title: '需求评审',
    color: '#67C23A',
    type: 'review'
  },
  {
    id: 3,
    date: '2024-01-25',
    title: '设计评审',
    color: '#E6A23C',
    type: 'review'
  },
  {
    id: 4,
    date: '2024-02-01',
    title: '开发开始',
    color: '#F56C6C',
    type: 'development'
  }
])

// 项目事件数据
const projectEvents = ref([
  {
    id: 1,
    date: '2024-01-15',
    time: '09:00',
    title: '项目启动会议',
    type: 'meeting',
    location: '会议室A',
    assignee: '项目经理',
    description: '讨论项目目标、范围和计划'
  },
  {
    id: 2,
    date: '2024-01-20',
    time: '14:00',
    title: '需求评审',
    type: 'review',
    location: '会议室B',
    assignee: '产品经理',
    description: '评审用户需求和功能规格'
  },
  {
    id: 3,
    date: '2024-01-25',
    time: '10:00',
    title: '设计评审',
    type: 'review',
    location: '会议室A',
    assignee: '架构师',
    description: '评审系统架构和UI设计'
  },
  {
    id: 4,
    date: '2024-02-01',
    time: '09:00',
    title: '开发开始',
    type: 'development',
    location: '开发办公室',
    assignee: '开发团队',
    description: '开始编码实现核心功能'
  },
  {
    id: 5,
    date: '2024-02-05',
    time: '16:00',
    title: '周例会',
    type: 'meeting',
    location: '会议室A',
    assignee: '全体成员',
    description: '每周项目进度汇报'
  },
  {
    id: 6,
    date: '2024-02-10',
    time: '15:00',
    title: '代码评审',
    type: 'review',
    location: '会议室B',
    assignee: '技术负责人',
    description: '评审核心模块代码'
  }
])

// 获取指定日期的事件
const getEvents = (day) => {
  return events.value.filter(event => event.date === day)
}

// 获取指定日期的项目事件
const getProjectEvents = (day) => {
  return projectEvents.value.filter(event => event.date === day)
}

// 选择日期
const selectDate = (type) => {
  const date = new Date(value4.value)
  
  switch (type) {
    case 'prev-month':
      date.setMonth(date.getMonth() - 1)
      break
    case 'next-month':
      date.setMonth(date.getMonth() + 1)
      break
    case 'today':
      date.setTime(Date.now())
      break
  }
  
  value4.value = date
}

// 格式化日期
const formatDate = (date) => {
  const d = new Date(date)
  return `${d.getFullYear()}年${d.getMonth() + 1}月`
}

// 跳转到今天
const goToToday = () => {
  currentDate.value = new Date()
  ElMessage.success('已跳转到今天')
}

// 添加事件
const addEvent = () => {
  ElMessage.info('添加事件功能')
}

// 查看事件详情
const viewEvent = (event) => {
  selectedEvent.value = event
  eventDialogVisible.value = true
}

// 编辑事件
const editEvent = () => {
  ElMessage.info('编辑事件功能')
  eventDialogVisible.value = false
}

// 获取事件类型文本
const getEventTypeText = (type) => {
  const typeMap = {
    meeting: '会议',
    review: '评审',
    development: '开发',
    test: '测试',
    deploy: '部署'
  }
  return typeMap[type] || '其他'
}
</script>

<style scoped>
.calendar-container {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.header-title {
  font-size: 18px;
  font-weight: bold;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.calendar-cell {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 4px;
}

.date-text {
  font-size: 12px;
  color: #606266;
}

.event-dots {
  display: flex;
  gap: 2px;
  justify-content: center;
  margin-top: 2px;
}

.event-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  cursor: pointer;
}

.project-calendar-cell {
  height: 100%;
  padding: 4px;
  display: flex;
  flex-direction: column;
}

.date-number {
  font-size: 14px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 4px;
}

.event-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.event-item {
  padding: 2px 4px;
  border-radius: 2px;
  font-size: 10px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.event-item.meeting {
  background-color: #e1f3d8;
  color: #67c23a;
}

.event-item.review {
  background-color: #fdf6ec;
  color: #e6a23c;
}

.event-item.development {
  background-color: #fef0f0;
  color: #f56c6c;
}

.event-item.test {
  background-color: #f0f9ff;
  color: #409eff;
}

.event-item.deploy {
  background-color: #f3e8ff;
  color: #8b5cf6;
}

.event-time {
  font-weight: bold;
}

.event-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.event-detail {
  padding: 20px 0;
}

.event-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.event-header h4 {
  margin: 0;
  color: #303133;
}

.event-info p {
  margin: 10px 0;
  line-height: 1.6;
}

.event-info strong {
  color: #606266;
}

.is-selected {
  color: #409eff;
  font-weight: bold;
}
</style>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| model-value / v-model | 绑定值 | Date | — | — |
| range | 时间范围，包括开始时间，结束时间 | array | — | — |
| first-day-of-week | 周起始日 | number | 1 到 7 | 1 |

#### 插槽
| 插槽名 | 说明 |
|--------|------|
| dateCell | 日期单元格的内容 | { data } |
| header | 日历头部内容 | { date } |

#### 插槽参数
| 参数 | 说明 | 类型 |
|------|------|------|
| data | 日期单元格的数据 | object |
| date | 当前显示的日期 | string |

#### data 对象属性
| 属性 | 说明 | 类型 |
|------|------|------|
| day | 日期 | string |
| isSelected | 是否被选中 | boolean |
| type | 日期类型 | string |

#### 使用场景
1. **日程管理**: 个人或团队日程安排
2. **项目管理**: 项目里程碑和任务安排
3. **会议安排**: 会议室预订和会议安排
4. **活动日历**: 活动安排和展示
5. **考勤管理**: 员工考勤记录
6. **预约系统**: 预约时间选择
7. **事件展示**: 重要事件时间线展示 