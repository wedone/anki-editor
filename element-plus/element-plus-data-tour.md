### 38. Tour 漫游式引导
- **用途**: 为用户提供功能引导和操作指引
- **特点**: 支持步骤导航、自定义样式、键盘控制、遮罩层

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-button @click="startTour">开始引导</el-button>
  
  <el-tour v-model="currentStep" :steps="steps" />

  <!-- 自定义样式 -->
  <el-tour 
    v-model="currentStep2" 
    :steps="steps2"
    :show-arrow="true"
    :show-overlay="true"
    placement="bottom"
  />

  <!-- 键盘控制 -->
  <el-tour 
    v-model="currentStep3" 
    :steps="steps3"
    :keyboard="true"
    :scroll-into-view-options="{ block: 'center' }"
  />

  <!-- 在页面中使用 -->
  <div class="tour-container">
    <h3>功能引导示例</h3>
    
    <!-- 控制面板 -->
    <div class="control-panel">
      <el-button type="primary" @click="startGuideTour">
        开始功能引导
      </el-button>
      <el-button @click="startProductTour">
        开始产品介绍
      </el-button>
      <el-button @click="startHelpTour">
        开始帮助引导
      </el-button>
      <el-button @click="resetTour">
        重置引导
      </el-button>
    </div>

    <!-- 功能区域 -->
    <div class="feature-area">
      <!-- 导航栏 -->
      <div ref="navRef" class="nav-section">
        <h4>导航栏</h4>
        <el-menu mode="horizontal" class="demo-nav">
          <el-menu-item index="1">首页</el-menu-item>
          <el-menu-item index="2">产品</el-menu-item>
          <el-menu-item index="3">服务</el-menu-item>
          <el-menu-item index="4">关于</el-menu-item>
        </el-menu>
      </div>

      <!-- 搜索框 -->
      <div ref="searchRef" class="search-section">
        <h4>搜索功能</h4>
        <el-input 
          v-model="searchText"
          placeholder="请输入搜索关键词"
          class="search-input"
        >
          <template #append>
            <el-button type="primary">搜索</el-button>
          </template>
        </el-input>
      </div>

      <!-- 数据展示 -->
      <div ref="dataRef" class="data-section">
        <h4>数据展示</h4>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="name" label="名称" />
          <el-table-column prop="status" label="状态" />
          <el-table-column prop="date" label="日期" />
        </el-table>
      </div>

      <!-- 操作按钮 -->
      <div ref="actionRef" class="action-section">
        <h4>操作区域</h4>
        <el-button-group>
          <el-button type="primary">添加</el-button>
          <el-button type="success">编辑</el-button>
          <el-button type="warning">导出</el-button>
          <el-button type="danger">删除</el-button>
        </el-button-group>
      </div>

      <!-- 设置面板 -->
      <div ref="settingRef" class="setting-section">
        <h4>设置面板</h4>
        <el-card>
          <template #header>
            <span>系统设置</span>
          </template>
          <el-form label-width="100px">
            <el-form-item label="主题">
              <el-select v-model="theme" placeholder="选择主题">
                <el-option label="浅色" value="light" />
                <el-option label="深色" value="dark" />
              </el-select>
            </el-form-item>
            <el-form-item label="语言">
              <el-select v-model="language" placeholder="选择语言">
                <el-option label="中文" value="zh" />
                <el-option label="English" value="en" />
              </el-select>
            </el-form-item>
          </el-form>
        </el-card>
      </div>

      <!-- 帮助信息 -->
      <div ref="helpRef" class="help-section">
        <h4>帮助信息</h4>
        <el-alert
          title="使用提示"
          description="这里是帮助信息，您可以在这里查看使用说明和常见问题。"
          type="info"
          show-icon
        />
      </div>
    </div>

    <!-- 引导配置 -->
    <div class="tour-config">
      <h4>引导配置</h4>
      <el-form :model="tourConfig" label-width="120px">
        <el-form-item label="显示箭头">
          <el-switch v-model="tourConfig.showArrow" />
        </el-form-item>
        <el-form-item label="显示遮罩">
          <el-switch v-model="tourConfig.showOverlay" />
        </el-form-item>
        <el-form-item label="键盘控制">
          <el-switch v-model="tourConfig.keyboard" />
        </el-form-item>
        <el-form-item label="自动滚动">
          <el-switch v-model="tourConfig.scrollIntoView" />
        </el-form-item>
        <el-form-item label="遮罩颜色">
          <el-color-picker v-model="tourConfig.overlayColor" />
        </el-form-item>
      </el-form>
    </div>

    <!-- 引导步骤编辑器 -->
    <div class="step-editor">
      <h4>步骤编辑器</h4>
      <div class="step-list">
        <div 
          v-for="(step, index) in currentSteps" 
          :key="index"
          class="step-item"
        >
          <div class="step-header">
            <span>步骤 {{ index + 1 }}</span>
            <el-button 
              size="small" 
              type="danger" 
              @click="removeStep(index)"
            >
              删除
            </el-button>
          </div>
          <el-form :model="step" label-width="80px">
            <el-form-item label="标题">
              <el-input v-model="step.title" />
            </el-form-item>
            <el-form-item label="内容">
              <el-input 
                v-model="step.content" 
                type="textarea" 
                :rows="3"
              />
            </el-form-item>
            <el-form-item label="位置">
              <el-select v-model="step.placement">
                <el-option label="顶部" value="top" />
                <el-option label="底部" value="bottom" />
                <el-option label="左侧" value="left" />
                <el-option label="右侧" value="right" />
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <el-button @click="addStep">添加步骤</el-button>
    </div>

    <!-- 引导组件 -->
    <el-tour 
      v-model="currentStep"
      :steps="currentSteps"
      :show-arrow="tourConfig.showArrow"
      :show-overlay="tourConfig.showOverlay"
      :keyboard="tourConfig.keyboard"
      :scroll-into-view-options="tourConfig.scrollIntoView ? { block: 'center' } : false"
      :overlay-color="tourConfig.overlayColor"
      @finish="handleTourFinish"
      @change="handleTourChange"
    />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

// 基础数据
const currentStep = ref(0)
const currentStep2 = ref(0)
const currentStep3 = ref(0)

// 搜索相关
const searchText = ref('')
const theme = ref('light')
const language = ref('zh')

// 表格数据
const tableData = ref([
  { name: '项目A', status: '进行中', date: '2024-01-15' },
  { name: '项目B', status: '已完成', date: '2024-01-16' },
  { name: '项目C', status: '待开始', date: '2024-01-17' }
])

// 基础步骤
const steps = ref([
  {
    target: '.el-button',
    content: '点击这里开始引导',
    placement: 'bottom'
  }
])

const steps2 = ref([
  {
    target: '.el-button',
    content: '自定义样式的引导',
    placement: 'bottom'
  }
])

const steps3 = ref([
  {
    target: '.el-button',
    content: '支持键盘控制的引导',
    placement: 'bottom'
  }
])

// 功能引导步骤
const featureSteps = ref([
  {
    target: () => navRef.value,
    title: '导航栏',
    content: '这是网站的主要导航栏，您可以在这里快速访问不同的页面和功能模块。',
    placement: 'bottom'
  },
  {
    target: () => searchRef.value,
    title: '搜索功能',
    content: '使用搜索框可以快速查找您需要的内容，支持关键词搜索和高级筛选。',
    placement: 'bottom'
  },
  {
    target: () => dataRef.value,
    title: '数据展示',
    content: '这里展示了系统的主要数据，您可以查看、筛选和排序数据。',
    placement: 'top'
  },
  {
    target: () => actionRef.value,
    title: '操作区域',
    content: '在这里您可以进行各种操作，包括添加、编辑、导出和删除数据。',
    placement: 'left'
  },
  {
    target: () => settingRef.value,
    title: '设置面板',
    content: '在这里您可以自定义系统设置，包括主题、语言等个性化配置。',
    placement: 'right'
  },
  {
    target: () => helpRef.value,
    title: '帮助信息',
    content: '如果您在使用过程中遇到问题，可以在这里查看帮助文档和常见问题解答。',
    placement: 'top'
  }
])

// 产品介绍步骤
const productSteps = ref([
  {
    target: () => navRef.value,
    title: '产品导航',
    content: '我们的产品涵盖了多个领域，包括企业解决方案、个人工具等。',
    placement: 'bottom'
  },
  {
    target: () => dataRef.value,
    title: '产品展示',
    content: '这里展示了我们最新的产品信息和功能特点，您可以详细了解每个产品的优势。',
    placement: 'top'
  },
  {
    target: () => actionRef.value,
    title: '产品操作',
    content: '您可以在这里试用产品功能，体验产品的易用性和强大性能。',
    placement: 'left'
  }
])

// 帮助引导步骤
const helpSteps = ref([
  {
    target: () => helpRef.value,
    title: '帮助中心',
    content: '这里是帮助中心，您可以找到详细的使用说明和常见问题解答。',
    placement: 'top'
  },
  {
    target: () => settingRef.value,
    title: '个性化设置',
    content: '您可以根据个人喜好调整系统设置，让使用体验更加舒适。',
    placement: 'right'
  }
])

// 当前步骤
const currentSteps = ref([...featureSteps.value])

// 引导配置
const tourConfig = reactive({
  showArrow: true,
  showOverlay: true,
  keyboard: true,
  scrollIntoView: true,
  overlayColor: 'rgba(0, 0, 0, 0.5)'
})

// 模板引用
const navRef = ref()
const searchRef = ref()
const dataRef = ref()
const actionRef = ref()
const settingRef = ref()
const helpRef = ref()

// 开始引导函数
const startTour = () => {
  currentStep.value = 0
}

const startGuideTour = () => {
  currentSteps.value = [...featureSteps.value]
  currentStep.value = 0
  ElMessage.success('开始功能引导')
}

const startProductTour = () => {
  currentSteps.value = [...productSteps.value]
  currentStep.value = 0
  ElMessage.success('开始产品介绍')
}

const startHelpTour = () => {
  currentSteps.value = [...helpSteps.value]
  currentStep.value = 0
  ElMessage.success('开始帮助引导')
}

const resetTour = () => {
  currentStep.value = 0
  currentSteps.value = [...featureSteps.value]
  ElMessage.info('引导已重置')
}

// 步骤管理
const addStep = () => {
  currentSteps.value.push({
    target: '.el-button',
    title: '新步骤',
    content: '这是新添加的引导步骤',
    placement: 'bottom'
  })
}

const removeStep = (index) => {
  currentSteps.value.splice(index, 1)
  if (currentStep.value >= currentSteps.value.length) {
    currentStep.value = Math.max(0, currentSteps.value.length - 1)
  }
}

// 事件处理
const handleTourFinish = () => {
  ElMessage.success('引导完成！')
}

const handleTourChange = (step) => {
  console.log('当前步骤:', step)
}
</script>

<style scoped>
.tour-container {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}

.control-panel {
  margin: 20px 0;
  padding: 20px;
  background: #f5f7fa;
  border-radius: 4px;
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.feature-area {
  margin: 30px 0;
}

.nav-section,
.search-section,
.data-section,
.action-section,
.setting-section,
.help-section {
  margin: 30px 0;
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  background: #fff;
}

.nav-section h4,
.search-section h4,
.data-section h4,
.action-section h4,
.setting-section h4,
.help-section h4 {
  margin: 0 0 15px 0;
  color: #303133;
}

.search-input {
  max-width: 400px;
}

.demo-nav {
  border-bottom: 1px solid #ebeef5;
}

.tour-config {
  margin: 30px 0;
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  background: #fff;
}

.tour-config h4 {
  margin: 0 0 20px 0;
  color: #303133;
}

.step-editor {
  margin: 30px 0;
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  background: #fff;
}

.step-editor h4 {
  margin: 0 0 20px 0;
  color: #303133;
}

.step-list {
  margin-bottom: 20px;
}

.step-item {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  background: #f5f7fa;
}

.step-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  font-weight: bold;
  color: #303133;
}

.step-item .el-form {
  margin: 0;
}

.step-item .el-form-item {
  margin-bottom: 15px;
}

.step-item .el-form-item:last-child {
  margin-bottom: 0;
}
</style>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| model-value / v-model | 当前步骤的索引 | number | — | 0 |
| steps | 引导步骤配置 | array | — | [] |
| show-arrow | 是否显示箭头 | boolean | — | true |
| show-overlay | 是否显示遮罩层 | boolean | — | true |
| overlay-color | 遮罩层颜色 | string | — | rgba(0, 0, 0, 0.5) |
| placement | 弹出层位置 | string | top / bottom / left / right | bottom |
| keyboard | 是否支持键盘控制 | boolean | — | true |
| scroll-into-view-options | 滚动到视图的配置 | object | — | — |

#### 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 步骤改变时触发 | (step: number) |
| finish | 引导完成时触发 | — |

#### 步骤配置
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| target | 目标元素 | string / HTMLElement / function | — | — |
| title | 步骤标题 | string | — | — |
| content | 步骤内容 | string | — | — |
| placement | 弹出层位置 | string | top / bottom / left / right | bottom |

#### 使用场景
1. **新用户引导**: 为新用户介绍产品功能
2. **功能教学**: 指导用户如何使用特定功能
3. **产品介绍**: 展示产品特色和优势
4. **操作指引**: 引导用户完成复杂操作
5. **帮助系统**: 提供上下文相关的帮助信息
6. **功能介绍**: 介绍新功能或更新内容
7. **用户培训**: 系统化的用户培训流程 