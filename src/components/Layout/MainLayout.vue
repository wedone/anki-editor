<template>
  <div class="main-layout">
    <!-- 顶部导航栏 -->
    <header class="header">
      <div class="header-content">
        <h1 class="app-title">ANKI EDITOR</h1>
        <div class="header-right">
          <el-tag 
            :type="connectionStatus.type" 
            size="small"
            class="connection-status"
          >
            {{ connectionStatus.text }}
          </el-tag>
          <el-button 
            type="text" 
            size="small"
            @click="openSettings"
          >
            <el-icon><Setting /></el-icon>
          </el-button>
          <el-button 
            type="text" 
            size="small"
            @click="openHelp"
          >
            <el-icon><QuestionFilled /></el-icon>
          </el-button>
        </div>
      </div>
    </header>

    <!-- 主体内容 -->
    <div class="main-content">
      <!-- 侧边栏 -->
      <aside class="sidebar">
        <div class="sidebar-content">
          <!-- 牌组管理 -->
          <div class="sidebar-section">
            <div class="section-header" @click="toggleDeckTree">
              <el-icon><Folder /></el-icon>
              <span>牌组</span>
              <el-icon class="expand-icon" :class="{ 'expanded': deckTreeExpanded }">
                <ArrowDown />
              </el-icon>
            </div>
            <div v-show="deckTreeExpanded" class="tree-container">
              <el-tree
                :data="deckTreeData"
                :props="treeProps"
                node-key="id"
                :expand-on-click-node="false"
                @node-click="handleDeckClick"
              >
                <template #default="{ node, data }">
                  <span class="tree-node">
                    <el-icon v-if="data.type === 'deck'"><Folder /></el-icon>
                    <el-icon v-else><Document /></el-icon>
                    {{ node.label }}
                  </span>
                </template>
              </el-tree>
            </div>
          </div>

          <!-- 模板管理 -->
          <div class="sidebar-section">
            <div class="section-header" @click="toggleTemplateTree">
              <el-icon><Files /></el-icon>
              <span>模板</span>
              <el-icon class="expand-icon" :class="{ 'expanded': templateTreeExpanded }">
                <ArrowDown />
              </el-icon>
            </div>
            <div v-show="templateTreeExpanded" class="tree-container">
              <el-tree
                :data="templateTreeData"
                :props="treeProps"
                node-key="id"
                :expand-on-click-node="false"
                @node-click="handleTemplateClick"
              >
                <template #default="{ node, data }">
                  <span class="tree-node">
                    <el-icon><Document /></el-icon>
                    {{ node.label }}
                  </span>
                </template>
              </el-tree>
            </div>
          </div>

          <!-- 标签管理 -->
          <div class="sidebar-section">
            <div class="section-header" @click="toggleTagTree">
              <el-icon><Collection /></el-icon>
              <span>标签</span>
              <el-icon class="expand-icon" :class="{ 'expanded': tagTreeExpanded }">
                <ArrowDown />
              </el-icon>
            </div>
            <div v-show="tagTreeExpanded" class="tree-container">
              <el-tree
                :data="tagTreeData"
                :props="treeProps"
                node-key="id"
                :expand-on-click-node="false"
                @node-click="handleTagClick"
              >
                <template #default="{ node, data }">
                  <span class="tree-node">
                    <el-icon><PriceTag /></el-icon>
                    {{ node.label }}
                  </span>
                </template>
              </el-tree>
            </div>
          </div>

          <!-- 统计 -->
          <div class="sidebar-section">
            <div class="section-header" @click="openStats">
              <el-icon><DataAnalysis /></el-icon>
              <span>统计</span>
            </div>
          </div>

          <!-- 设置 -->
          <div class="sidebar-section">
            <div class="section-header" @click="openSettings">
              <el-icon><Setting /></el-icon>
              <span>设置</span>
            </div>
          </div>
        </div>
      </aside>

      <!-- 主内容区域 -->
      <main class="content">
        <div class="content-header">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentModule">{{ currentModule }}</el-breadcrumb-item>
          </el-breadcrumb>
          <div class="content-actions">
            <el-button type="primary" size="small" @click="refreshData">
              <el-icon><Refresh /></el-icon>
              刷新
            </el-button>
          </div>
        </div>
        <div class="content-body">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()

// 连接状态
const connectionStatus = reactive({
  type: 'warning' as 'success' | 'warning' | 'danger',
  text: '未连接'
})

// 侧边栏展开状态
const deckTreeExpanded = ref(true)
const templateTreeExpanded = ref(false)
const tagTreeExpanded = ref(false)

// 当前模块
const currentModule = ref('')

// 树形数据
const deckTreeData = ref([
  {
    id: '1',
    label: '默认牌组',
    type: 'deck',
    children: [
      {
        id: '1-1',
        label: '子牌组1',
        type: 'deck'
      },
      {
        id: '1-2',
        label: '子牌组2',
        type: 'deck'
      }
    ]
  }
])

const templateTreeData = ref([
  {
    id: '1',
    label: '基础模板',
    type: 'template'
  },
  {
    id: '2',
    label: '填空题模板',
    type: 'template'
  }
])

const tagTreeData = ref([
  {
    id: '1',
    label: '学习',
    type: 'tag'
  },
  {
    id: '2',
    label: '工作',
    type: 'tag'
  }
])

const treeProps = {
  children: 'children',
  label: 'label'
}

// 方法
const toggleDeckTree = () => {
  deckTreeExpanded.value = !deckTreeExpanded.value
}

const toggleTemplateTree = () => {
  templateTreeExpanded.value = !templateTreeExpanded.value
}

const toggleTagTree = () => {
  tagTreeExpanded.value = !tagTreeExpanded.value
}

const handleDeckClick = (data: any) => {
  console.log('点击牌组:', data)
  currentModule.value = '牌组管理'
  router.push('/decks')
}

const handleTemplateClick = (data: any) => {
  console.log('点击模板:', data)
  currentModule.value = '模板管理'
  router.push('/templates')
}

const handleTagClick = (data: any) => {
  console.log('点击标签:', data)
  currentModule.value = '标签管理'
  router.push('/tags')
}

const openStats = () => {
  currentModule.value = '统计'
  router.push('/stats')
}

const openSettings = () => {
  currentModule.value = '设置'
  router.push('/settings')
}

const openHelp = () => {
  ElMessage.info('帮助功能开发中...')
}

const refreshData = () => {
  ElMessage.success('数据已刷新')
}

// 检查连接状态
const checkConnection = async () => {
  try {
    // 这里将来会调用 AnkiConnect API
    // 暂时模拟连接检查
    await new Promise(resolve => setTimeout(resolve, 1000))
    connectionStatus.type = 'success'
    connectionStatus.text = '已连接'
  } catch (error) {
    connectionStatus.type = 'danger'
    connectionStatus.text = '连接失败'
  }
}

onMounted(() => {
  checkConnection()
})
</script>

<style scoped>
.main-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 0 20px;
  height: 60px;
  display: flex;
  align-items: center;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.app-title {
  margin: 0;
  font-size: 20px;
  font-weight: bold;
  color: #303133;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.connection-status {
  margin-right: 10px;
}

.main-content {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.sidebar {
  width: 250px;
  background: #f5f7fa;
  border-right: 1px solid #e4e7ed;
  overflow-y: auto;
}

.sidebar-content {
  padding: 20px 0;
}

.sidebar-section {
  margin-bottom: 10px;
}

.section-header {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  user-select: none;
}

.section-header:hover {
  background: #ecf5ff;
}

.section-header .el-icon {
  margin-right: 8px;
  font-size: 16px;
}

.expand-icon {
  margin-left: auto;
  transition: transform 0.3s;
}

.expand-icon.expanded {
  transform: rotate(180deg);
}

.tree-container {
  padding: 0 20px 10px 20px;
}

.tree-node {
  display: flex;
  align-items: center;
  gap: 5px;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #fff;
}

.content-header {
  padding: 15px 20px;
  border-bottom: 1px solid #e4e7ed;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.content-actions {
  display: flex;
  gap: 10px;
}

.content-body {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}
</style> 