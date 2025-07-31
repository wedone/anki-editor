<template>
  <div class="main-layout">
    <!-- 顶部导航栏 -->
    <el-header class="app-header" height="60px">
      <div class="header-content">
        <div class="header-left">
          <h1 class="app-title">ANKI EDITOR</h1>
        </div>
        <div class="header-right">
          <el-tag 
            :type="connectionStatus.type" 
            size="small"
            class="connection-status"
            @click="testConnection"
          >
            <el-icon v-if="ankiStore.isLoading" class="is-loading"><Loading /></el-icon>
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
    </el-header>

    <!-- 主体内容 -->
    <el-container class="main-container">
      <!-- 侧边栏 -->
      <el-aside width="280px" class="app-sidebar">
        <el-card class="sidebar-card" shadow="never">
          <template #header>
            <span>导航菜单</span>
          </template>
          
          <!-- 牌组管理 -->
          <el-collapse v-model="activeCollapse">
            <el-collapse-item title="牌组管理" name="decks">
              <template #title>
                <div class="collapse-title">
                  <el-icon><Folder /></el-icon>
                  <span>牌组管理</span>
                  <el-tag size="small" type="info" class="deck-count">
                    {{ ankiStore.decks.length }}
                  </el-tag>
                </div>
              </template>
              <div class="tree-container">
                <el-tree
                  :data="deckTreeData"
                  :props="treeProps"
                  node-key="id"
                  :expand-on-click-node="false"
                  accordion
                  @node-click="handleDeckClick"
                >
                  <template #default="{ node, data }">
                    <span class="tree-node" :class="{ 'leaf-node': data.isLeaf }">
                      <el-icon v-if="data.type === 'folder'"><Folder /></el-icon>
                      <el-icon v-else-if="data.type === 'deck'"><Document /></el-icon>
                      <el-icon v-else><Folder /></el-icon>
                      {{ node.label }}
                    </span>
                  </template>
                </el-tree>
              </div>
            </el-collapse-item>

            <!-- 卡片管理 -->
            <el-collapse-item title="卡片管理" name="cards">
              <template #title>
                <div class="collapse-title">
                  <el-icon><Document /></el-icon>
                  <span>卡片管理</span>
                </div>
              </template>
              <div class="menu-items">
                <div class="menu-item" @click="openCards">
                  <el-icon><Document /></el-icon>
                  <span>浏览卡片</span>
                </div>
                <div class="menu-item" @click="openCardManager">
                  <el-icon><Edit /></el-icon>
                  <span>卡片编辑器</span>
                </div>
              </div>
            </el-collapse-item>

            <!-- 模板管理 -->
            <el-collapse-item title="模板管理" name="templates">
              <template #title>
                <div class="collapse-title">
                  <el-icon><Files /></el-icon>
                  <span>模板管理</span>
                </div>
              </template>
              <div class="tree-container">
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
            </el-collapse-item>

            <!-- 标签管理 -->
            <el-collapse-item title="标签管理" name="tags">
              <template #title>
                <div class="collapse-title">
                  <el-icon><PriceTag /></el-icon>
                  <span>标签管理</span>
                </div>
              </template>
              <div class="tree-container">
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
            </el-collapse-item>

            <!-- 统计 -->
            <el-collapse-item title="统计分析" name="stats">
              <template #title>
                <div class="collapse-title">
                  <el-icon><DataAnalysis /></el-icon>
                  <span>统计分析</span>
                </div>
              </template>
              <div class="menu-items">
                <div class="menu-item" @click="openStats">
                  <el-icon><DataAnalysis /></el-icon>
                  <span>学习统计</span>
                </div>
              </div>
            </el-collapse-item>

            <!-- 设置 -->
            <el-collapse-item title="系统设置" name="settings">
              <template #title>
                <div class="collapse-title">
                  <el-icon><Setting /></el-icon>
                  <span>系统设置</span>
                </div>
              </template>
              <div class="menu-items">
                <div class="menu-item" @click="openSettings">
                  <el-icon><Setting /></el-icon>
                  <span>应用设置</span>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-aside>

      <!-- 主内容区域 -->
      <el-main class="app-main">
        <el-card class="content-card" shadow="never">
          <template #header>
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
          </template>
          <div class="content-body">
            <router-view />
          </div>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useAnkiStore } from '@/stores/ankiStore'

const router = useRouter()
const ankiStore = useAnkiStore()

// 连接状态
const connectionStatus = computed(() => {
  if (ankiStore.isLoading) {
    return {
      type: 'info' as const,
      text: '连接中...'
    }
  }
  
  if (ankiStore.isConnected) {
    return {
      type: 'success' as const,
      text: '已连接'
    }
  }
  
  return {
    type: 'danger' as const,
    text: '未连接'
  }
})

// 状态
const currentModule = ref('')
const activeCollapse = ref(['decks', 'cards', 'templates', 'tags', 'stats', 'settings'])

// 防抖处理
const debounce = (func: Function, wait: number) => {
  let timeout: number
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// 树形数据 - 使用computed优化性能
const deckTreeData = computed(() => {
  const deckMap = new Map<string, any>()
  const rootNodes: any[] = []
  
  // 处理所有牌组，构建树形结构
  ankiStore.decks.forEach(deck => {
    const deckName = deck.name
    const parts = deckName.split('::').filter(part => part.trim() !== '')
    
    if (parts.length === 0) return
    
    let currentPath = ''
    let parentNode: any = null
    
    parts.forEach((part, index) => {
      const isLeaf = index === parts.length - 1
      const fullPath = currentPath ? `${currentPath}::${part}` : part
      
      // 检查节点是否已存在
      if (!deckMap.has(fullPath)) {
        const node = {
          id: fullPath,
          name: part.trim(),
          type: isLeaf ? 'deck' : 'folder',
          children: [],
          fullName: fullPath,
          isLeaf: isLeaf
        }
        deckMap.set(fullPath, node)
        
        // 添加到父节点或根节点
        if (parentNode) {
          parentNode.children.push(node)
        } else {
          rootNodes.push(node)
        }
      }
      
      parentNode = deckMap.get(fullPath)
      currentPath = fullPath
    })
  })
  
  return rootNodes
})

const templateTreeData = computed(() => {
  return ankiStore.models.map(model => ({
    id: model.name,
    name: model.name,
    type: 'template'
  }))
})

const tagTreeData = computed(() => {
  return ankiStore.tags.slice(0, 20).map(tag => ({ // 限制显示前20个标签
    id: tag,
    name: tag,
    type: 'tag'
  }))
})

// 树形配置
const treeProps = {
  children: 'children',
  label: 'name'
}

// 默认展开的节点
const expandedKeys = computed(() => {
  const keys: string[] = []
  const traverse = (nodes: any[]) => {
    nodes.forEach(node => {
      if (node.children && node.children.length > 0) {
        keys.push(node.id)
        traverse(node.children)
      }
    })
  }
  traverse(deckTreeData.value)
  return keys
})

// 优化点击处理 - 添加防抖
const handleDeckClick = debounce((data: any) => {
  console.log('点击牌组:', data)
  
  // 只有叶子节点（实际牌组）才能点击
  if (data.isLeaf) {
    currentModule.value = '牌组管理'
    ElMessage.info(`选择了牌组: ${data.fullName}`)
    router.push('/decks')
  }
}, 100)

const handleTemplateClick = debounce((data: any) => {
  console.log('点击模板:', data)
  currentModule.value = '模板管理'
  router.push('/templates')
}, 100)

const handleTagClick = debounce((data: any) => {
  console.log('点击标签:', data)
  currentModule.value = '标签管理'
  router.push('/tags')
}, 100)

const openCards = debounce(() => {
  currentModule.value = '卡片管理'
  router.push('/cards')
}, 100)

const openCardManager = debounce(() => {
  currentModule.value = '卡片编辑器'
  router.push('/card-manager')
}, 100)

const openStats = debounce(() => {
  currentModule.value = '统计'
  router.push('/stats')
}, 100)

const openSettings = debounce(() => {
  currentModule.value = '设置'
  router.push('/settings')
}, 100)

const openHelp = debounce(() => {
  ElMessage.info('帮助功能开发中...')
}, 100)

const refreshData = debounce(async () => {
  try {
    await ankiStore.initialize()
    ElMessage.success('数据已刷新')
  } catch (error) {
    ElMessage.error('刷新数据失败')
  }
}, 100)

const testConnection = debounce(async () => {
  try {
    await ankiStore.testConnection()
    if (ankiStore.isConnected) {
      ElMessage.success('连接成功！')
      await ankiStore.initialize()
    } else {
      ElMessage.error(ankiStore.connectionError || '连接失败')
    }
  } catch (error) {
    ElMessage.error('连接测试失败')
  }
}, 100)

onMounted(async () => {
  await ankiStore.initialize()
})
</script>

<style scoped>
.main-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 0 20px;
  display: flex;
  align-items: center;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.header-left {
  display: flex;
  align-items: center;
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
  cursor: pointer;
}

.main-container {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.app-sidebar {
  background: #f5f7fa;
  border-right: 1px solid #e4e7ed;
  overflow-y: auto;
}

.sidebar-card {
  height: 100%;
}

.sidebar-card .el-card__header {
  padding-bottom: 10px;
}

.collapse-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.collapse-title .el-icon {
  font-size: 16px;
}

.deck-count {
  margin-left: auto;
  font-size: 12px;
}

.menu-items {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px 20px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 4px;
  font-size: 14px;
  color: #606266;
}

.menu-item:hover {
  background: #ecf5ff;
  color: #409eff;
  transform: translateX(2px);
}

.menu-item:active {
  transform: translateX(1px);
}

.menu-item .el-icon {
  font-size: 16px;
  transition: all 0.2s ease;
}

.menu-item:hover .el-icon {
  transform: scale(1.1);
}

.tree-container {
  padding: 0 20px 10px 20px;
}

.tree-node {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  color: #606266;
  transition: all 0.2s ease;
  padding: 2px 0;
}

.tree-node:hover {
  color: #409eff;
}

.tree-node.leaf-node {
  font-weight: 500;
  color: #303133;
}

.tree-node.leaf-node:hover {
  color: #409eff;
  background-color: #ecf5ff;
  border-radius: 4px;
  padding: 2px 4px;
}

.tree-node .el-icon {
  font-size: 14px;
  transition: all 0.2s ease;
}

.tree-node:hover .el-icon {
  transform: scale(1.1);
}

.app-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #fff;
}

.content-card {
  height: 100%;
}

.content-card .el-card__header {
  padding-bottom: 10px;
}

.content-header {
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