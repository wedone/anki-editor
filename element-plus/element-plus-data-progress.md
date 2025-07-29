### 7. Progress 进度条
- **用途**: 进度显示
- **特点**: 支持线性、环形进度条

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-progress :percentage="50" />

  <!-- 百分比内显 -->
  <el-progress :percentage="percentage" />

  <!-- 自定义颜色 -->
  <el-progress :percentage="percentage2" color="#8e71c7" />

  <!-- 自定义颜色函数 -->
  <el-progress :percentage="percentage3" :color="customColors" />

  <!-- 自定义颜色数组 -->
  <el-progress :percentage="percentage4" :color="customColorMethod" />

  <!-- 不同尺寸 -->
  <el-progress :percentage="percentage5" :stroke-width="18" />
  <el-progress :percentage="percentage5" :stroke-width="12" />
  <el-progress :percentage="percentage5" :stroke-width="6" />

  <!-- 环形进度条 -->
  <el-progress type="circle" :percentage="percentage6" />

  <!-- 环形进度条不同尺寸 -->
  <el-progress type="circle" :percentage="percentage7" :width="80" />
  <el-progress type="circle" :percentage="percentage7" :width="120" />

  <!-- 环形进度条自定义颜色 -->
  <el-progress
    type="circle"
    :percentage="percentage8"
    :color="customColors"
  />

  <!-- 动态进度条 -->
  <el-progress :percentage="percentage9" />
  <el-button-group style="margin-top: 20px">
    <el-button :icon="Minus" @click="decrease" />
    <el-button :icon="Plus" @click="increase" />
  </el-button-group>

  <!-- 带状态的进度条 -->
  <el-progress :percentage="100" status="success" />
  <el-progress :percentage="80" status="warning" />
  <el-progress :percentage="50" status="exception" />

  <!-- 自定义文本格式 -->
  <el-progress
    :percentage="percentage10"
    :format="format"
  />

  <!-- 条纹进度条 -->
  <el-progress :percentage="percentage11" :stroke-width="18" striped />
  <el-progress
    :percentage="percentage11"
    :stroke-width="18"
    striped
    striped-flow
  />

  <!-- 仪表盘进度条 -->
  <el-progress
    type="dashboard"
    :percentage="percentage12"
  />

  <!-- 仪表盘进度条自定义颜色 -->
  <el-progress
    type="dashboard"
    :percentage="percentage13"
    :color="customColors"
  />

  <!-- 多进度条 -->
  <div class="progress-group">
    <el-progress :percentage="percentage14" />
    <el-progress :percentage="percentage15" />
    <el-progress :percentage="percentage16" />
  </div>

  <!-- 带标签的进度条 -->
  <el-progress
    :percentage="percentage17"
    :show-text="false"
  >
    <template #default="{ percentage }">
      <span class="custom-progress-label">{{ percentage }}%</span>
    </template>
  </el-progress>

  <!-- 动画进度条 -->
  <el-progress
    :percentage="percentage18"
    :duration="3000"
    :show-text="false"
  >
    <template #default="{ percentage }">
      <span class="animated-progress">{{ percentage }}%</span>
    </template>
  </el-progress>
</template>

<script setup>
import { ref } from 'vue'
import { Minus, Plus } from '@element-plus/icons-vue'

const percentage = ref(50)
const percentage2 = ref(80)
const percentage3 = ref(90)
const percentage4 = ref(70)
const percentage5 = ref(50)
const percentage6 = ref(80)
const percentage7 = ref(60)
const percentage8 = ref(90)
const percentage9 = ref(20)
const percentage10 = ref(50)
const percentage11 = ref(60)
const percentage12 = ref(80)
const percentage13 = ref(90)
const percentage14 = ref(30)
const percentage15 = ref(60)
const percentage16 = ref(90)
const percentage17 = ref(75)
const percentage18 = ref(0)

// 自定义颜色函数
const customColors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#1989fa', percentage: 80 },
  { color: '#6f7ad3', percentage: 100 }
]

const customColorMethod = (percentage) => {
  if (percentage < 30) {
    return '#909399'
  } else if (percentage < 70) {
    return '#e6a23c'
  } else {
    return '#67c23a'
  }
}

// 自定义文本格式
const format = (percentage) => {
  return percentage === 100 ? '满' : `${percentage}%`
}

// 动态进度条控制
const increase = () => {
  percentage9.value += 10
  if (percentage9.value > 100) {
    percentage9.value = 100
  }
}

const decrease = () => {
  percentage9.value -= 10
  if (percentage9.value < 0) {
    percentage9.value = 0
  }
}

// 动画进度条
const startAnimation = () => {
  percentage18.value = 0
  const timer = setInterval(() => {
    percentage18.value += 1
    if (percentage18.value >= 100) {
      clearInterval(timer)
    }
  }, 30)
}

// 页面加载时开始动画
startAnimation()
</script>

<style scoped>
.progress-group {
  margin: 20px 0;
}

.progress-group .el-progress {
  margin-bottom: 15px;
}

.custom-progress-label {
  font-size: 14px;
  color: #606266;
  font-weight: bold;
}

.animated-progress {
  font-size: 16px;
  color: #409eff;
  font-weight: bold;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| percentage | 百分比，必填 | number | 0-100 | 0 |
| type | 进度条类型 | string | line / circle / dashboard | line |
| stroke-width | 进度条的宽度，单位 px | number | — | 6 |
| text-inside | 进度条显示文字内置在进度条内（只在 type=line 时可用） | boolean | — | false |
| status | 进度条当前状态 | string | success / exception / warning | — |
| color | 进度条背景色（会覆盖 status 状态颜色） | string / function / array | — | — |
| width | 环形进度条画布宽度（只在 type=circle 时可用） | number | — | 126 |
| show-text | 是否显示进度条文字内容 | boolean | — | true |
| stroke-linecap | 设置进度条端点的形状 | string | butt / round / square | round |
| format | 指定进度条文字内容 | function(percentage) | — | — |
| striped | 是否显示条纹 | boolean | — | false |
| striped-flow | 是否显示流动条纹 | boolean | — | false |
| duration | 动画持续时间 | number | — | 3000 |

#### 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 进度条进度改变时触发 | (percentage: number) |

#### 插槽
| 插槽名 | 说明 | 参数 |
|--------|------|------|
| default | 自定义进度条文字内容 | { percentage: number } |

#### 使用示例
```vue
<!-- 基础进度条 -->
<el-progress :percentage="50" />

<!-- 环形进度条 -->
<el-progress type="circle" :percentage="80" />

<!-- 仪表盘进度条 -->
<el-progress type="dashboard" :percentage="90" />

<!-- 自定义颜色 -->
<el-progress :percentage="70" color="#8e71c7" />

<!-- 带状态 -->
<el-progress :percentage="100" status="success" />

<!-- 自定义文本 -->
<el-progress :percentage="50" :format="format" />

<!-- 条纹进度条 -->
<el-progress :percentage="60" striped />

<!-- 流动条纹 -->
<el-progress :percentage="60" striped striped-flow />

<!-- 自定义内容 -->
<el-progress :percentage="75" :show-text="false">
  <template #default="{ percentage }">
    <span>{{ percentage }}%</span>
  </template>
</el-progress>
```

#### 使用场景
1. **文件上传**: 显示文件上传进度
2. **数据加载**: 显示数据加载进度
3. **任务执行**: 显示任务执行进度
4. **技能展示**: 展示技能熟练度
5. **目标完成**: 显示目标完成度

#### 注意事项
1. **性能优化**: 避免频繁更新进度条，特别是在动画过程中
2. **颜色搭配**: 确保进度条颜色与背景有足够的对比度
3. **状态管理**: 合理使用不同的状态来表示进度条的不同阶段
4. **响应式设计**: 考虑在不同屏幕尺寸下的显示效果
5. **可访问性**: 确保进度条对屏幕阅读器友好，提供适当的文本描述 