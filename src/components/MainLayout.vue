<template>
  <el-container class="main-layout">
    <!-- 顶部导航栏 -->
    <el-header class="header">
      <div class="header-left">
        <h2 class="logo">Anki Editor</h2>
      </div>
      <div class="header-right">
        <el-tag 
          :type="ankiStore.connectionStatus.type" 
          :icon="getStatusIcon(ankiStore.connectionStatus.icon)"
          size="large"
          @click="testConnection"
          style="cursor: pointer;"
        >
          {{ ankiStore.connectionStatus.text }}
        </el-tag>
        <el-button
          v-if="!ankiStore.isConnected"
          type="link"
          @click="showSetupGuide"
          style="color: white; margin-left: 10px;"
        >
          <el-icon><Setting /></el-icon>
          设置指南
        </el-button>
        <el-button
          type="link"
          @click="refreshData"
          :loading="ankiStore.isLoading"
          style="color: white; margin-left: 10px;"
        >
          <el-icon><Refresh /></el-icon>
        </el-button>
      </div>
    </el-header>

    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="250px" class="sidebar">
        <el-menu
          :default-active="activeMenu"
          class="sidebar-menu"
          :collapse="isCollapse"
          @select="handleMenuSelect"
          router
        >
          <el-sub-menu index="1">
            <template #title>
              <el-icon><Folder /></el-icon>
              <span>牌组管理</span>
            </template>
            <el-menu-item index="/app/decks">牌组管理</el-menu-item>
            <el-menu-item index="1-2">创建牌组</el-menu-item>
          </el-sub-menu>

          <el-sub-menu index="2">
            <template #title>
              <el-icon><Document /></el-icon>
              <span>卡片管理</span>
            </template>
            <el-menu-item index="/app/cards">卡片浏览</el-menu-item>
            <el-menu-item index="2-2">创建卡片</el-menu-item>
          </el-sub-menu>

          <el-sub-menu index="3">
            <template #title>
              <el-icon><EditPen /></el-icon>
              <span>笔记管理</span>
            </template>
            <el-menu-item index="/app/notes">笔记管理</el-menu-item>
            <el-menu-item index="3-2">字段管理</el-menu-item>
          </el-sub-menu>

          <el-sub-menu index="4">
            <template #title>
              <el-icon><Collection /></el-icon>
              <span>标签管理</span>
            </template>
            <el-menu-item index="/app/tags">标签管理</el-menu-item>
            <el-menu-item index="4-2">创建标签</el-menu-item>
          </el-sub-menu>

          <el-sub-menu index="5">
            <template #title>
              <el-icon><Upload /></el-icon>
              <span>导入导出</span>
            </template>
            <el-menu-item index="/app/import-export">导入数据</el-menu-item>
            <el-menu-item index="5-2">导出数据</el-menu-item>
          </el-sub-menu>

          <el-menu-item index="/app/statistics">
            <el-icon><DataAnalysis /></el-icon>
            <span>统计信息</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <!-- 主内容区域 -->
      <el-main class="main-content">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/" class="breadcrumb">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-for="item in breadcrumbItems" :key="item.path">
            {{ item.name }}
          </el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 内容区域 -->
        <div class="content-area">
          <router-view />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAnkiStore } from '../stores/ankiStore.js'
import { ElMessage, ElMessageBox } from 'element-plus'
import { 
  Folder, 
  Document, 
  EditPen, 
  Collection, 
  Upload, 
  DataAnalysis,
  Connection,
  Warning,
  Refresh,
  Loading,
  Setting
} from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()
const ankiStore = useAnkiStore()

const isCollapse = ref(false)
const activeMenu = ref('/app/decks')

// 面包屑导航
const breadcrumbItems = computed(() => {
  const pathMap = {
    '/app/decks': [{ name: '牌组管理', path: '/app/decks' }],
    '/app/cards': [{ name: '卡片浏览', path: '/app/cards' }],
    '/app/notes': [{ name: '笔记管理', path: '/app/notes' }],
    '/app/tags': [{ name: '标签管理', path: '/app/tags' }],
    '/app/import-export': [{ name: '导入导出', path: '/app/import-export' }],
    '/app/statistics': [{ name: '统计信息', path: '/app/statistics' }]
  }
  return pathMap[route.path] || []
})

// 监听路由变化，更新激活菜单
watch(() => route.path, (newPath) => {
  activeMenu.value = newPath
}, { immediate: true })

// 菜单选择处理
const handleMenuSelect = (index) => {
  console.log('选择菜单:', index)
  activeMenu.value = index
}

// 获取状态图标
const getStatusIcon = (iconName) => {
  const iconMap = {
    'Connection': Connection,
    'Warning': Warning,
    'Loading': Loading
  }
  return iconMap[iconName] || Connection
}

// 测试连接
const testConnection = async () => {
  try {
    ElMessage.info('正在测试 AnkiConnect 连接...')
    const connected = await ankiStore.testConnection()
    
    if (connected) {
      ElMessage.success('连接成功！正在加载数据...')
      // 连接成功后自动加载数据
      await ankiStore.refreshData()
      ElMessage.success('数据加载完成！')
    } else {
      ElMessage.error('连接失败，请检查 Anki 是否正在运行且 AnkiConnect 插件已安装')
    }
  } catch (error) {
    ElMessage.error(`连接测试失败: ${error.message}`)
  }
}

// 刷新数据
const refreshData = async () => {
  try {
    ElMessage.info('正在刷新数据，请稍候...')
    await ankiStore.refreshData()
    ElMessage.success('数据刷新成功！')
  } catch (error) {
    ElMessage.error(`刷新失败: ${error.message}`)
  }
}

// 显示设置指南
const showSetupGuide = () => {
  ElMessageBox.alert(`
<h3>AnkiConnect 设置指南</h3>

<p><strong>步骤 1: 安装 Anki 桌面应用</strong></p>
<ul>
  <li>下载并安装 Anki 桌面应用: <a href="https://apps.ankiweb.net/" target="_blank">https://apps.ankiweb.net/</a></li>
  <li>确保 Anki 版本为 2.1 或更高</li>
</ul>

<p><strong>步骤 2: 安装 AnkiConnect 插件</strong></p>
<ul>
  <li>打开 Anki 桌面应用</li>
  <li>进入 <code>工具</code> > <code>附加组件</code></li>
  <li>点击 <code>获取附加组件</code></li>
  <li>输入插件代码: <code>2055492159</code></li>
  <li>点击 <code>确定</code> 安装</li>
</ul>

<p><strong>步骤 3: 启用插件</strong></p>
<ul>
  <li>重启 Anki 应用</li>
  <li>确保 AnkiConnect 插件已启用</li>
  <li>插件会在后台运行，监听端口 8765</li>
</ul>

<p><strong>步骤 4: 测试连接</strong></p>
<ul>
  <li>确保 Anki 正在运行</li>
  <li>点击上方的连接状态标签测试连接</li>
  <li>如果显示"已连接"，说明配置成功</li>
</ul>

<p><strong>高级配置:</strong></p>
<ul>
  <li><strong>主机地址:</strong> 默认为 localhost</li>
  <li><strong>端口:</strong> 默认为 8765</li>
  <li><strong>超时时间:</strong> 默认为 30 秒</li>
  <li><strong>API Key:</strong> 可选，用于身份验证</li>
</ul>

<p><strong>常见问题:</strong></p>
<ul>
  <li>如果连接失败，请检查防火墙设置</li>
  <li>确保端口 8765 没有被其他程序占用</li>
  <li>某些杀毒软件可能会阻止连接</li>
  <li>如果数据加载超时，可以增加超时时间</li>
</ul>
  `, 'AnkiConnect 设置指南', {
    dangerouslyUseHTMLString: true,
    confirmButtonText: '我知道了',
    customClass: 'setup-guide-dialog'
  })
}

// 组件挂载时初始化
onMounted(async () => {
  try {
    await ankiStore.initialize()
  } catch (error) {
    console.error('初始化失败:', error)
  }
})
</script>

<style scoped>
.main-layout {
  height: 100vh;
}

.header {
  background-color: var(--el-color-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-left .logo {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.sidebar {
  background-color: var(--el-bg-color);
  border-right: 1px solid var(--el-border-color-light);
}

.sidebar-menu {
  height: 100%;
  border-right: none;
}

.main-content {
  padding: 20px;
  background-color: var(--el-bg-color-page);
}

.breadcrumb {
  margin-bottom: 20px;
  padding: 10px 0;
  background-color: var(--el-bg-color);
  border-radius: 4px;
  padding-left: 15px;
}

.content-area {
  background-color: var(--el-bg-color);
  border-radius: 4px;
  padding: 20px;
  min-height: calc(100vh - 200px);
}

/* 设置指南对话框样式 */
:global(.setup-guide-dialog) {
  max-width: 600px;
}

:global(.setup-guide-dialog .el-message-box__content) {
  max-height: 70vh;
  overflow-y: auto;
}

:global(.setup-guide-dialog h3) {
  color: #409EFF;
  margin-bottom: 15px;
}

:global(.setup-guide-dialog p) {
  margin-bottom: 10px;
}

:global(.setup-guide-dialog ul) {
  margin-bottom: 15px;
  padding-left: 20px;
}

:global(.setup-guide-dialog li) {
  margin-bottom: 5px;
}

:global(.setup-guide-dialog code) {
  background-color: #f5f7fa;
  padding: 2px 4px;
  border-radius: 3px;
  font-family: monospace;
}

:global(.setup-guide-dialog a) {
  color: #409EFF;
  text-decoration: none;
}

:global(.setup-guide-dialog a:hover) {
  text-decoration: underline;
}
</style> 