<template>
  <div class="settings-view">
    <el-card class="page-card" shadow="never">
      <template #header>
        <div class="page-header">
          <span>系统设置</span>
        </div>
      </template>

      <el-tabs v-model="activeTab" class="settings-tabs">
        <!-- 连接设置 -->
        <el-tab-pane label="连接设置" name="connection">
          <el-card class="section-card" shadow="never">
            <template #header>
              <span>AnkiConnect 连接</span>
            </template>
            
            <el-form :model="connectionForm" label-width="120px">
              <el-form-item label="服务器地址">
                <el-input 
                  v-model="connectionForm.host" 
                  placeholder="localhost"
                  style="width: 300px;"
                />
              </el-form-item>
              <el-form-item label="端口">
                <el-input-number 
                  v-model="connectionForm.port" 
                  :min="1" 
                  :max="65535"
                  placeholder="8765"
                  style="width: 200px;"
                />
              </el-form-item>
              <el-form-item label="连接状态">
                <el-tag :type="ankiStore.isConnected ? 'success' : 'danger'">
                  {{ ankiStore.isConnected ? '已连接' : '未连接' }}
                </el-tag>
                <el-button 
                  v-if="!ankiStore.isConnected" 
                  type="primary" 
                  @click="testConnection"
                  style="margin-left: 10px;"
                >
                  测试连接
                </el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveConnectionSettings">
                  保存设置
                </el-button>
                <el-button @click="testConnection">
                  测试连接
                </el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-tab-pane>

        <!-- 界面设置 -->
        <el-tab-pane label="界面设置" name="interface">
          <el-card class="section-card" shadow="never">
            <template #header>
              <span>界面配置</span>
            </template>
            
            <el-form :model="interfaceForm" label-width="120px">
              <el-form-item label="主题">
                <el-select v-model="interfaceForm.theme" style="width: 200px;">
                  <el-option label="浅色主题" value="light" />
                  <el-option label="深色主题" value="dark" />
                  <el-option label="跟随系统" value="auto" />
                </el-select>
              </el-form-item>
              <el-form-item label="语言">
                <el-select v-model="interfaceForm.language" style="width: 200px;">
                  <el-option label="简体中文" value="zh-CN" />
                  <el-option label="English" value="en-US" />
                </el-select>
              </el-form-item>
              <el-form-item label="页面大小">
                <el-select v-model="interfaceForm.pageSize" style="width: 200px;">
                  <el-option label="10 条/页" :value="10" />
                  <el-option label="20 条/页" :value="20" />
                  <el-option label="50 条/页" :value="50" />
                  <el-option label="100 条/页" :value="100" />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveInterfaceSettings">
                  保存设置
                </el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-tab-pane>

        <!-- 数据设置 -->
        <el-tab-pane label="数据设置" name="data">
          <el-card class="section-card" shadow="never">
            <template #header>
              <span>数据管理</span>
            </template>
            
            <el-form label-width="120px">
              <el-form-item label="数据缓存">
                <el-button @click="clearCache">
                  清除缓存
                </el-button>
                <el-button @click="exportData">
                  导出数据
                </el-button>
                <el-button @click="importData">
                  导入数据
                </el-button>
              </el-form-item>
              <el-form-item label="自动刷新">
                <el-switch v-model="dataForm.autoRefresh" />
                <span style="margin-left: 10px; color: #909399;">
                  自动刷新数据（每5分钟）
                </span>
              </el-form-item>
              <el-form-item label="数据备份">
                <el-button @click="backupData">
                  备份数据
                </el-button>
                <el-button @click="restoreData">
                  恢复数据
                </el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-tab-pane>

        <!-- 关于 -->
        <el-tab-pane label="关于" name="about">
          <el-card class="section-card" shadow="never">
            <template #header>
              <span>关于 Anki Editor</span>
            </template>
            
            <div class="about-content">
              <div class="about-item">
                <strong>版本:</strong> 1.0.0
              </div>
              <div class="about-item">
                <strong>描述:</strong> Anki 卡片编辑器，基于 Vue 3 + Element Plus 开发
              </div>
              <div class="about-item">
                <strong>技术栈:</strong> Vue 3, TypeScript, Element Plus, Pinia
              </div>
              <div class="about-item">
                <strong>许可证:</strong> MIT License
              </div>
              <div class="about-item">
                <strong>GitHub:</strong> 
                <el-link href="https://github.com/your-repo" target="_blank">
                  https://github.com/your-repo
                </el-link>
              </div>
            </div>
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useAnkiStore } from '@/stores/ankiStore'

const ankiStore = useAnkiStore()
const activeTab = ref('connection')

// 连接设置
const connectionForm = reactive({
  host: 'localhost',
  port: 8765,
  apiKey: '',
  timeout: 5000
})

// 界面设置
const interfaceForm = reactive({
  theme: 'light',
  language: 'zh-CN',
  sidebarWidth: 250,
  autoSave: true,
  saveInterval: 5,
  pageSize: 10
})

// 卡片设置
const cardSettings = reactive({
  defaultDeck: '',
  defaultTemplate: '',
  defaultTags: '',
  autoAddTags: true,
  showPreview: true
})

// 导入导出设置
const importSettings = reactive({
  confirmImport: true,
  autoBackup: true,
  backupPath: '',
  exportFormats: ['apkg', 'csv']
})

// 数据设置
const dataForm = reactive({
  autoRefresh: true
})

// 测试连接
const testConnection = async () => {
  try {
    // 更新连接设置
    ankiStore.updateConnectionSettings({
      host: connectionForm.host,
      port: connectionForm.port,
      apiKey: connectionForm.apiKey,
      timeout: connectionForm.timeout
    })
    
    await ankiStore.testConnection()
    if (ankiStore.isConnected) {
      ElMessage.success('连接测试成功！')
      await ankiStore.initialize()
    } else {
      ElMessage.error(ankiStore.connectionError || '连接失败')
    }
  } catch (error) {
    ElMessage.error('连接测试失败')
  }
}

const saveConnectionSettings = () => {
  ankiStore.updateConnectionSettings({
    host: connectionForm.host,
    port: connectionForm.port,
    apiKey: connectionForm.apiKey,
    timeout: connectionForm.timeout
  })
  ElMessage.success('连接设置已保存')
}

const saveInterfaceSettings = () => {
  ElMessage.success('界面设置已保存')
}

const clearCache = () => {
  localStorage.clear()
  ElMessage.success('缓存已清除')
}

const exportData = () => {
  ElMessage.info('导出功能开发中...')
}

const importData = () => {
  ElMessage.info('导入功能开发中...')
}

const backupData = () => {
  ElMessage.info('备份功能开发中...')
}

const restoreData = () => {
  ElMessage.info('恢复功能开发中...')
}

const saveCardSettings = () => {
  ElMessage.success('卡片设置已保存')
}

const saveImportSettings = () => {
  ElMessage.success('导入导出设置已保存')
}

const openAnkiConnectDocs = () => {
  window.open('https://git.sr.ht/~foosoft/anki-connect/tree/master/item/README.md', '_blank')
}

const openElementPlusDocs = () => {
  window.open('https://element-plus.org/zh-CN/component/overview.html', '_blank')
}

onMounted(() => {
  // 初始化连接设置
  Object.assign(connectionForm, ankiStore.connectionSettings)
})
</script>

<style scoped>
.settings-view {
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

.settings-tabs {
  margin-top: 20px;
}

.section-card {
  margin-bottom: 20px;
}

.about-content {
  padding: 20px 0;
}

.about-item {
  margin-bottom: 15px;
  padding: 10px;
  background: #f9f9f9;
  border-radius: 4px;
}

.about-item strong {
  color: #303133;
  margin-right: 10px;
}
</style> 