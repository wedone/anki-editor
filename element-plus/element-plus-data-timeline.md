### 26. Timeline 时间线
- **用途**: 时间线展示
- **特点**: 支持多种样式、自定义内容

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-timeline>
    <el-timeline-item
      v-for="(activity, index) in activities1"
      :key="index"
      :timestamp="activity.timestamp"
    >
      {{ activity.content }}
    </el-timeline-item>
  </el-timeline>

  <!-- 自定义节点 -->
  <el-timeline>
    <el-timeline-item
      v-for="(activity, index) in activities2"
      :key="index"
      :type="activity.type"
      :color="activity.color"
      :size="activity.size"
      :timestamp="activity.timestamp"
    >
      {{ activity.content }}
    </el-timeline-item>
  </el-timeline>

  <!-- 自定义图标 -->
  <el-timeline>
    <el-timeline-item
      v-for="(activity, index) in activities3"
      :key="index"
      :timestamp="activity.timestamp"
      placement="top"
    >
      <template #icon>
        <el-icon :class="activity.icon">
          <component :is="activity.iconComponent" />
        </el-icon>
      </template>
      <el-card>
        <h4>{{ activity.title }}</h4>
        <p>{{ activity.content }}</p>
      </el-card>
    </el-timeline-item>
  </el-timeline>

  <!-- 时间线位置 -->
  <el-timeline>
    <el-timeline-item
      v-for="(activity, index) in activities4"
      :key="index"
      :timestamp="activity.timestamp"
      placement="top"
    >
      {{ activity.content }}
    </el-timeline-item>
  </el-timeline>

  <!-- 自定义颜色 -->
  <el-timeline>
    <el-timeline-item
      v-for="(activity, index) in activities5"
      :key="index"
      :timestamp="activity.timestamp"
      :color="activity.color"
    >
      {{ activity.content }}
    </el-timeline-item>
  </el-timeline>

  <!-- 不同尺寸 -->
  <el-timeline>
    <el-timeline-item
      v-for="(activity, index) in activities6"
      :key="index"
      :timestamp="activity.timestamp"
      size="large"
    >
      {{ activity.content }}
    </el-timeline-item>
  </el-timeline>

  <!-- 隐藏时间戳 -->
  <el-timeline>
    <el-timeline-item
      v-for="(activity, index) in activities7"
      :key="index"
      :hide-timestamp="activity.hideTimestamp"
    >
      {{ activity.content }}
    </el-timeline-item>
  </el-timeline>

  <!-- 在页面中使用 -->
  <div class="timeline-container">
    <h3>项目开发进度</h3>
    <el-timeline>
      <el-timeline-item
        v-for="(milestone, index) in projectMilestones"
        :key="index"
        :type="milestone.type"
        :color="milestone.color"
        :timestamp="milestone.timestamp"
        placement="top"
      >
        <template #icon>
          <el-icon :class="milestone.icon">
            <component :is="milestone.iconComponent" />
          </el-icon>
        </template>
        <el-card class="milestone-card">
          <template #header>
            <div class="card-header">
              <span class="milestone-title">{{ milestone.title }}</span>
              <el-tag :type="milestone.status" size="small">
                {{ milestone.statusText }}
              </el-tag>
            </div>
          </template>
          <div class="milestone-content">
            <p>{{ milestone.description }}</p>
            <div class="milestone-meta">
              <span class="assignee">负责人: {{ milestone.assignee }}</span>
              <span class="duration">预计工期: {{ milestone.duration }}</span>
            </div>
          </div>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  Check, 
  Clock, 
  Warning, 
  CircleClose, 
  Document, 
  User, 
  Setting,
  Star
} from '@element-plus/icons-vue'

const activities1 = ref([
  {
    content: '项目启动',
    timestamp: '2024-01-15 20:46'
  },
  {
    content: '需求分析',
    timestamp: '2024-01-20 20:46'
  },
  {
    content: '设计阶段',
    timestamp: '2024-01-25 20:46'
  },
  {
    content: '开发阶段',
    timestamp: '2024-02-01 20:46'
  }
])

const activities2 = ref([
  {
    content: '项目启动',
    timestamp: '2024-01-15 20:46',
    type: 'primary',
    color: '#409EFF',
    size: 'large'
  },
  {
    content: '需求分析',
    timestamp: '2024-01-20 20:46',
    type: 'success',
    color: '#67C23A',
    size: 'large'
  },
  {
    content: '设计阶段',
    timestamp: '2024-01-25 20:46',
    type: 'warning',
    color: '#E6A23C',
    size: 'large'
  },
  {
    content: '开发阶段',
    timestamp: '2024-02-01 20:46',
    type: 'danger',
    color: '#F56C6C',
    size: 'large'
  }
])

const activities3 = ref([
  {
    title: '项目启动',
    content: '项目正式启动，确定项目目标和范围',
    timestamp: '2024-01-15 20:46',
    icon: 'el-icon-check',
    iconComponent: Check
  },
  {
    title: '需求分析',
    content: '深入分析用户需求，制定详细的功能规格',
    timestamp: '2024-01-20 20:46',
    icon: 'el-icon-document',
    iconComponent: Document
  },
  {
    title: '设计阶段',
    content: '完成系统架构设计和UI/UX设计',
    timestamp: '2024-01-25 20:46',
    icon: 'el-icon-setting',
    iconComponent: Setting
  },
  {
    title: '开发阶段',
    content: '开始编码实现，完成核心功能开发',
    timestamp: '2024-02-01 20:46',
    icon: 'el-icon-user',
    iconComponent: User
  }
])

const activities4 = ref([
  {
    content: '项目启动',
    timestamp: '2024-01-15 20:46'
  },
  {
    content: '需求分析',
    timestamp: '2024-01-20 20:46'
  },
  {
    content: '设计阶段',
    timestamp: '2024-01-25 20:46'
  },
  {
    content: '开发阶段',
    timestamp: '2024-02-01 20:46'
  }
])

const activities5 = ref([
  {
    content: '项目启动',
    timestamp: '2024-01-15 20:46',
    color: '#409EFF'
  },
  {
    content: '需求分析',
    timestamp: '2024-01-20 20:46',
    color: '#67C23A'
  },
  {
    content: '设计阶段',
    timestamp: '2024-01-25 20:46',
    color: '#E6A23C'
  },
  {
    content: '开发阶段',
    timestamp: '2024-02-01 20:46',
    color: '#F56C6C'
  }
])

const activities6 = ref([
  {
    content: '项目启动',
    timestamp: '2024-01-15 20:46'
  },
  {
    content: '需求分析',
    timestamp: '2024-01-20 20:46'
  },
  {
    content: '设计阶段',
    timestamp: '2024-01-25 20:46'
  },
  {
    content: '开发阶段',
    timestamp: '2024-02-01 20:46'
  }
])

const activities7 = ref([
  {
    content: '项目启动',
    hideTimestamp: false
  },
  {
    content: '需求分析',
    hideTimestamp: true
  },
  {
    content: '设计阶段',
    hideTimestamp: false
  },
  {
    content: '开发阶段',
    hideTimestamp: true
  }
])

// 项目里程碑数据
const projectMilestones = ref([
  {
    title: '项目立项',
    description: '确定项目目标、范围和预算，获得项目批准',
    timestamp: '2024-01-15 20:46',
    type: 'primary',
    color: '#409EFF',
    icon: 'el-icon-star',
    iconComponent: Star,
    status: 'success',
    statusText: '已完成',
    assignee: '项目经理',
    duration: '3天'
  },
  {
    title: '需求调研',
    description: '深入调研用户需求，收集和分析业务需求',
    timestamp: '2024-01-20 20:46',
    type: 'success',
    color: '#67C23A',
    icon: 'el-icon-document',
    iconComponent: Document,
    status: 'success',
    statusText: '已完成',
    assignee: '产品经理',
    duration: '5天'
  },
  {
    title: '系统设计',
    description: '完成系统架构设计、数据库设计和接口设计',
    timestamp: '2024-01-25 20:46',
    type: 'warning',
    color: '#E6A23C',
    icon: 'el-icon-setting',
    iconComponent: Setting,
    status: 'warning',
    statusText: '进行中',
    assignee: '架构师',
    duration: '7天'
  },
  {
    title: '开发实现',
    description: '开始编码实现，完成核心功能模块开发',
    timestamp: '2024-02-01 20:46',
    type: 'info',
    color: '#909399',
    icon: 'el-icon-user',
    iconComponent: User,
    status: 'info',
    statusText: '待开始',
    assignee: '开发团队',
    duration: '15天'
  },
  {
    title: '测试验收',
    description: '进行系统测试、用户验收测试和性能测试',
    timestamp: '2024-02-15 20:46',
    type: 'danger',
    color: '#F56C6C',
    icon: 'el-icon-check',
    iconComponent: Check,
    status: 'danger',
    statusText: '未开始',
    assignee: '测试团队',
    duration: '10天'
  }
])
</script>

<style scoped>
.timeline-container {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}

.milestone-card {
  margin-bottom: 10px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.milestone-title {
  font-weight: bold;
  font-size: 16px;
}

.milestone-content {
  line-height: 1.6;
}

.milestone-meta {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  color: #909399;
  font-size: 12px;
}

.assignee, .duration {
  background: #f5f7fa;
  padding: 2px 8px;
  border-radius: 4px;
}
</style>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| reverse | 指定节点排序方向，默认为正序 | boolean | — | false |

#### Timeline Item 属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| timestamp | 时间戳 | string | — | — |
| hide-timestamp | 是否隐藏时间戳 | boolean | — | false |
| placement | 时间戳位置 | string | top / bottom | bottom |
| type | 节点类型 | string | primary / success / warning / danger / info | — |
| color | 节点颜色 | string | hsl / hsv / hex / rgb | — |
| size | 节点尺寸 | string | normal / large | normal |
| icon | 图标类名 | string | — | — |
| hollow | 是否空心点 | boolean | — | false |

#### 插槽
| 插槽名 | 说明 |
|--------|------|
| default | Timeline Item 的内容 |
| icon | 自定义图标 |

#### 使用场景
1. **项目进度**: 项目开发进度展示
2. **操作日志**: 用户操作历史记录
3. **版本更新**: 软件版本更新历史
4. **工作流程**: 业务流程步骤展示
5. **活动时间线**: 活动安排和进度
6. **历史记录**: 重要事件历史展示
7. **状态跟踪**: 订单、任务状态变化 