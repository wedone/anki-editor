### 36. Segmented 分段控制器
- **用途**: 用于展示多个选项并允许用户选择其中单个选项
- **特点**: 支持不同尺寸、禁用状态、自定义样式

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-segmented v-model="value1" :options="options1" />

  <!-- 不同尺寸 -->
  <el-segmented v-model="value2" :options="options2" size="large" />
  <el-segmented v-model="value2" :options="options2" size="default" />
  <el-segmented v-model="value2" :options="options2" size="small" />

  <!-- 禁用状态 -->
  <el-segmented v-model="value3" :options="options3" disabled />

  <!-- 自定义样式 -->
  <el-segmented 
    v-model="value4" 
    :options="options4"
    :style="{ width: '300px' }"
  />

  <!-- 带图标 -->
  <el-segmented v-model="value5" :options="options5" />

  <!-- 在页面中使用 -->
  <div class="segmented-container">
    <h3>分段控制器示例</h3>
    
    <!-- 视图切换 -->
    <div class="view-switcher">
      <h4>视图切换</h4>
      <el-segmented 
        v-model="currentView" 
        :options="viewOptions"
        @change="handleViewChange"
      />
      
      <div class="view-content">
        <div v-if="currentView === 'list'" class="list-view">
          <h5>列表视图</h5>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="名称" />
            <el-table-column prop="status" label="状态" />
            <el-table-column prop="date" label="日期" />
          </el-table>
        </div>
        
        <div v-else-if="currentView === 'grid'" class="grid-view">
          <h5>网格视图</h5>
          <div class="grid-container">
            <el-card 
              v-for="item in tableData" 
              :key="item.id"
              class="grid-item"
            >
              <h4>{{ item.name }}</h4>
              <p>状态: {{ item.status }}</p>
              <p>日期: {{ item.date }}</p>
            </el-card>
          </div>
        </div>
        
        <div v-else-if="currentView === 'kanban'" class="kanban-view">
          <h5>看板视图</h5>
          <div class="kanban-container">
            <div class="kanban-column">
              <h6>待处理</h6>
              <div class="kanban-items">
                <div 
                  v-for="item in tableData.filter(i => i.status === '待处理')" 
                  :key="item.id"
                  class="kanban-item"
                >
                  {{ item.name }}
                </div>
              </div>
            </div>
            <div class="kanban-column">
              <h6>进行中</h6>
              <div class="kanban-items">
                <div 
                  v-for="item in tableData.filter(i => i.status === '进行中')" 
                  :key="item.id"
                  class="kanban-item"
                >
                  {{ item.name }}
                </div>
              </div>
            </div>
            <div class="kanban-column">
              <h6>已完成</h6>
              <div class="kanban-items">
                <div 
                  v-for="item in tableData.filter(i => i.status === '已完成')" 
                  :key="item.id"
                  class="kanban-item"
                >
                  {{ item.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 数据筛选 -->
    <div class="data-filter">
      <h4>数据筛选</h4>
      <el-segmented 
        v-model="filterType" 
        :options="filterOptions"
        @change="handleFilterChange"
      />
      
      <div class="filter-content">
        <p>当前筛选: {{ filterType }}</p>
        <el-table :data="filteredData" style="width: 100%">
          <el-table-column prop="name" label="名称" />
          <el-table-column prop="category" label="分类" />
          <el-table-column prop="value" label="数值" />
        </el-table>
      </div>
    </div>

    <!-- 主题切换 -->
    <div class="theme-switcher">
      <h4>主题切换</h4>
      <el-segmented 
        v-model="currentTheme" 
        :options="themeOptions"
        @change="handleThemeChange"
      />
      
      <div class="theme-preview" :class="currentTheme">
        <h5>主题预览</h5>
        <p>当前主题: {{ currentTheme }}</p>
        <el-button type="primary">主要按钮</el-button>
        <el-button type="success">成功按钮</el-button>
        <el-button type="warning">警告按钮</el-button>
        <el-button type="danger">危险按钮</el-button>
      </div>
    </div>

    <!-- 语言切换 -->
    <div class="language-switcher">
      <h4>语言切换</h4>
      <el-segmented 
        v-model="currentLanguage" 
        :options="languageOptions"
        @change="handleLanguageChange"
      />
      
      <div class="language-content">
        <p>当前语言: {{ currentLanguage }}</p>
        <p>{{ getLanguageText() }}</p>
      </div>
    </div>

    <!-- 控制面板 -->
    <div class="control-panel">
      <h4>控制面板</h4>
      <div class="control-group">
        <label>尺寸控制:</label>
        <el-segmented 
          v-model="segmentedSize" 
          :options="sizeOptions"
          @change="handleSizeChange"
        />
      </div>
      
      <div class="control-group">
        <label>禁用状态:</label>
        <el-switch v-model="isDisabled" />
      </div>
      
      <div class="control-group">
        <label>自定义宽度:</label>
        <el-input-number 
          v-model="customWidth" 
          :min="200" 
          :max="600" 
          :step="50"
        />
      </div>
      
      <!-- 动态演示 -->
      <div class="dynamic-demo">
        <h5>动态演示</h5>
        <el-segmented 
          v-model="demoValue" 
          :options="demoOptions"
          :size="segmentedSize"
          :disabled="isDisabled"
          :style="{ width: customWidth + 'px' }"
          @change="handleDemoChange"
        />
        <p>当前选择: {{ demoValue }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { 
  List, 
  Grid, 
  View, 
  Sun, 
  Moon, 
  Monitor,
  Flag,
  Globe
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

// 基础数据
const value1 = ref('选项1')
const value2 = ref('选项1')
const value3 = ref('选项1')
const value4 = ref('选项1')
const value5 = ref('选项1')

// 选项配置
const options1 = ref(['选项1', '选项2', '选项3'])
const options2 = ref(['选项1', '选项2', '选项3'])
const options3 = ref(['选项1', '选项2', '选项3'])
const options4 = ref(['选项1', '选项2', '选项3'])
const options5 = ref([
  { label: '选项1', value: '选项1', icon: List },
  { label: '选项2', value: '选项2', icon: Grid },
  { label: '选项3', value: '选项3', icon: View }
])

// 视图切换
const currentView = ref('list')
const viewOptions = ref([
  { label: '列表', value: 'list', icon: List },
  { label: '网格', value: 'grid', icon: Grid },
  { label: '看板', value: 'kanban', icon: View }
])

const tableData = ref([
  { id: 1, name: '项目A', status: '待处理', date: '2024-01-15' },
  { id: 2, name: '项目B', status: '进行中', date: '2024-01-16' },
  { id: 3, name: '项目C', status: '已完成', date: '2024-01-17' },
  { id: 4, name: '项目D', status: '待处理', date: '2024-01-18' },
  { id: 5, name: '项目E', status: '进行中', date: '2024-01-19' }
])

// 数据筛选
const filterType = ref('all')
const filterOptions = ref([
  { label: '全部', value: 'all' },
  { label: '分类A', value: 'categoryA' },
  { label: '分类B', value: 'categoryB' },
  { label: '分类C', value: 'categoryC' }
])

const filterData = ref([
  { id: 1, name: '数据1', category: 'categoryA', value: 100 },
  { id: 2, name: '数据2', category: 'categoryB', value: 200 },
  { id: 3, name: '数据3', category: 'categoryA', value: 150 },
  { id: 4, name: '数据4', category: 'categoryC', value: 300 },
  { id: 5, name: '数据5', category: 'categoryB', value: 250 }
])

const filteredData = computed(() => {
  if (filterType.value === 'all') {
    return filterData.value
  }
  return filterData.value.filter(item => item.category === filterType.value)
})

// 主题切换
const currentTheme = ref('light')
const themeOptions = ref([
  { label: '浅色', value: 'light', icon: Sun },
  { label: '深色', value: 'dark', icon: Moon },
  { label: '自动', value: 'auto', icon: Monitor }
])

// 语言切换
const currentLanguage = ref('zh')
const languageOptions = ref([
  { label: '中文', value: 'zh', icon: Flag },
  { label: 'English', value: 'en', icon: Globe },
  { label: '日本語', value: 'ja', icon: Flag }
])

// 控制面板
const segmentedSize = ref('default')
const isDisabled = ref(false)
const customWidth = ref(300)
const demoValue = ref('选项1')

const sizeOptions = ref([
  { label: '大', value: 'large' },
  { label: '默认', value: 'default' },
  { label: '小', value: 'small' }
])

const demoOptions = ref(['选项1', '选项2', '选项3', '选项4'])

// 事件处理函数
const handleViewChange = (value) => {
  ElMessage.success(`切换到${value}视图`)
}

const handleFilterChange = (value) => {
  ElMessage.info(`筛选条件: ${value}`)
}

const handleThemeChange = (value) => {
  ElMessage.success(`主题已切换到: ${value}`)
  // 实际应用中这里会切换主题
}

const handleLanguageChange = (value) => {
  ElMessage.success(`语言已切换到: ${value}`)
  // 实际应用中这里会切换语言
}

const handleSizeChange = (value) => {
  ElMessage.info(`尺寸已切换到: ${value}`)
}

const handleDemoChange = (value) => {
  ElMessage.info(`选择了: ${value}`)
}

const getLanguageText = () => {
  const texts = {
    zh: '这是中文内容',
    en: 'This is English content',
    ja: 'これは日本語のコンテンツです'
  }
  return texts[currentLanguage.value] || texts.zh
}
</script>

<style scoped>
.segmented-container {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}

.view-switcher,
.data-filter,
.theme-switcher,
.language-switcher,
.control-panel {
  margin: 30px 0;
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}

.view-switcher h4,
.data-filter h4,
.theme-switcher h4,
.language-switcher h4,
.control-panel h4 {
  margin: 0 0 20px 0;
  color: #303133;
  font-size: 16px;
}

.view-content {
  margin-top: 20px;
}

.list-view h5,
.grid-view h5,
.kanban-view h5 {
  margin: 0 0 15px 0;
  color: #606266;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
}

.grid-item {
  text-align: center;
}

.kanban-container {
  display: flex;
  gap: 20px;
  margin-top: 15px;
}

.kanban-column {
  flex: 1;
  background: #f5f7fa;
  border-radius: 4px;
  padding: 15px;
}

.kanban-column h6 {
  margin: 0 0 10px 0;
  color: #303133;
  text-align: center;
}

.kanban-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.kanban-item {
  background: white;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  font-size: 14px;
}

.filter-content {
  margin-top: 20px;
}

.theme-preview {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  background: #fff;
}

.theme-preview.dark {
  background: #1f2937;
  color: white;
}

.theme-preview h5 {
  margin: 0 0 15px 0;
}

.theme-preview .el-button {
  margin: 5px;
}

.language-content {
  margin-top: 20px;
  padding: 15px;
  background: #f5f7fa;
  border-radius: 4px;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 15px 0;
}

.control-group label {
  min-width: 100px;
  color: #606266;
  font-weight: 500;
}

.dynamic-demo {
  margin-top: 30px;
  padding: 20px;
  background: #f5f7fa;
  border-radius: 4px;
  text-align: center;
}

.dynamic-demo h5 {
  margin: 0 0 15px 0;
  color: #303133;
}

.dynamic-demo p {
  margin: 15px 0 0 0;
  color: #606266;
}
</style>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| model-value / v-model | 绑定值 | string / number | — | — |
| options | 选项数组 | array | — | [] |
| size | 尺寸 | string | large / default / small | default |
| disabled | 是否禁用 | boolean | — | false |

#### 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 值改变时触发 | (value: string \| number) |

#### 选项配置
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| label | 选项标签 | string | — | — |
| value | 选项值 | string / number | — | — |
| icon | 选项图标 | Component | — | — |
| disabled | 是否禁用 | boolean | — | false |

#### 使用场景
1. **视图切换**: 列表、网格、看板等不同视图模式切换
2. **数据筛选**: 按不同条件筛选数据
3. **主题切换**: 浅色、深色主题切换
4. **语言切换**: 多语言界面切换
5. **状态选择**: 任务状态、订单状态等选择
6. **分类筛选**: 按分类筛选内容
7. **设置面板**: 各种设置选项的快速切换 