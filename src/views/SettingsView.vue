<template>
  <div class="settings-view">
    <div class="page-header">
      <h2>设置</h2>
    </div>

    <div class="settings-content">
      <el-tabs v-model="activeTab" type="border-card">
        <!-- 连接设置 -->
        <el-tab-pane label="连接设置" name="connection">
          <el-form :model="connectionSettings" label-width="120px">
            <el-form-item label="AnkiConnect 地址">
              <el-input v-model="connectionSettings.host" placeholder="localhost" />
            </el-form-item>
            <el-form-item label="端口">
              <el-input v-model="connectionSettings.port" placeholder="8765" />
            </el-form-item>
            <el-form-item label="API 密钥">
              <el-input v-model="connectionSettings.apiKey" placeholder="可选，留空则不使用" />
            </el-form-item>
            <el-form-item label="连接超时">
              <el-input-number v-model="connectionSettings.timeout" :min="1000" :max="30000" />
              <span style="margin-left: 10px;">毫秒</span>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="testConnection" :loading="ankiStore.isLoading">
                测试连接
              </el-button>
              <el-button @click="saveConnectionSettings">保存设置</el-button>
            </el-form-item>
          </el-form>
          
          <!-- 连接状态显示 -->
          <el-alert
            v-if="ankiStore.connectionError"
            :title="ankiStore.connectionError"
            type="error"
            show-icon
            style="margin-top: 20px;"
          />
          
          <el-alert
            v-if="ankiStore.isConnected"
            title="连接成功！AnkiConnect 已就绪"
            type="success"
            show-icon
            style="margin-top: 20px;"
          />
        </el-tab-pane>

        <!-- 界面设置 -->
        <el-tab-pane label="界面设置" name="interface">
          <el-form :model="interfaceSettings" label-width="120px">
            <el-form-item label="主题">
              <el-radio-group v-model="interfaceSettings.theme">
                <el-radio label="light">浅色主题</el-radio>
                <el-radio label="dark">深色主题</el-radio>
                <el-radio label="auto">跟随系统</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="语言">
              <el-select v-model="interfaceSettings.language">
                <el-option label="简体中文" value="zh-CN" />
                <el-option label="English" value="en-US" />
              </el-select>
            </el-form-item>
            <el-form-item label="侧边栏宽度">
              <el-slider v-model="interfaceSettings.sidebarWidth" :min="200" :max="400" />
              <span style="margin-left: 10px;">{{ interfaceSettings.sidebarWidth }}px</span>
            </el-form-item>
            <el-form-item label="自动保存">
              <el-switch v-model="interfaceSettings.autoSave" />
            </el-form-item>
            <el-form-item label="保存间隔">
              <el-input-number 
                v-model="interfaceSettings.saveInterval" 
                :min="1" 
                :max="60"
                :disabled="!interfaceSettings.autoSave"
              />
              <span style="margin-left: 10px;">分钟</span>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveInterfaceSettings">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!-- 卡片设置 -->
        <el-tab-pane label="卡片设置" name="cards">
          <el-form :model="cardSettings" label-width="120px">
            <el-form-item label="默认牌组">
              <el-select v-model="cardSettings.defaultDeck" placeholder="选择默认牌组">
                <el-option 
                  v-for="deck in ankiStore.decks" 
                  :key="deck.name" 
                  :label="deck.name" 
                  :value="deck.name" 
                />
              </el-select>
            </el-form-item>
            <el-form-item label="默认模板">
              <el-select v-model="cardSettings.defaultTemplate" placeholder="选择默认模板">
                <el-option 
                  v-for="model in ankiStore.models" 
                  :key="model.name" 
                  :label="model.name" 
                  :value="model.name" 
                />
              </el-select>
            </el-form-item>
            <el-form-item label="默认标签">
              <el-input v-model="cardSettings.defaultTags" placeholder="输入默认标签，用逗号分隔" />
            </el-form-item>
            <el-form-item label="自动添加标签">
              <el-switch v-model="cardSettings.autoAddTags" />
            </el-form-item>
            <el-form-item label="卡片预览">
              <el-switch v-model="cardSettings.showPreview" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveCardSettings">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!-- 导入导出设置 -->
        <el-tab-pane label="导入导出" name="import">
          <el-form :model="importSettings" label-width="120px">
            <el-form-item label="导入时确认">
              <el-switch v-model="importSettings.confirmImport" />
            </el-form-item>
            <el-form-item label="自动备份">
              <el-switch v-model="importSettings.autoBackup" />
            </el-form-item>
            <el-form-item label="备份路径">
              <el-input v-model="importSettings.backupPath" placeholder="选择备份文件保存路径" />
            </el-form-item>
            <el-form-item label="导出格式">
              <el-checkbox-group v-model="importSettings.exportFormats">
                <el-checkbox label="apkg">Anki 包 (.apkg)</el-checkbox>
                <el-checkbox label="csv">CSV 文件 (.csv)</el-checkbox>
                <el-checkbox label="txt">文本文件 (.txt)</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveImportSettings">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!-- 关于 -->
        <el-tab-pane label="关于" name="about">
          <div class="about-section">
            <h3>Anki Editor</h3>
            <p>版本：1.0.0</p>
            <p>基于 AnkiConnect 的自定义 Anki 客户端</p>
            <p>技术栈：Vue 3 + TypeScript + Element Plus</p>
            <div class="about-links">
              <el-button type="primary" @click="openAnkiConnectDocs">
                查看 AnkiConnect 文档
              </el-button>
              <el-button @click="openElementPlusDocs">
                查看 Element Plus 文档
              </el-button>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useAnkiStore } from '@/stores/ankiStore'

const ankiStore = useAnkiStore()
const activeTab = ref('connection')

// 连接设置
const connectionSettings = reactive({
  host: 'localhost',
  port: 8765,
  apiKey: '',
  timeout: 5000
})

// 界面设置
const interfaceSettings = reactive({
  theme: 'light',
  language: 'zh-CN',
  sidebarWidth: 250,
  autoSave: true,
  saveInterval: 5
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

const testConnection = async () => {
  try {
    // 更新连接设置
    ankiStore.updateConnectionSettings({
      host: connectionSettings.host,
      port: connectionSettings.port,
      apiKey: connectionSettings.apiKey,
      timeout: connectionSettings.timeout
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
    host: connectionSettings.host,
    port: connectionSettings.port,
    apiKey: connectionSettings.apiKey,
    timeout: connectionSettings.timeout
  })
  ElMessage.success('连接设置已保存')
}

const saveInterfaceSettings = () => {
  ElMessage.success('界面设置已保存')
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
  Object.assign(connectionSettings, ankiStore.connectionSettings)
})
</script>

<style scoped>
.settings-view {
  padding: 20px;
}

.page-header {
  margin-bottom: 20px;
}

.page-header h2 {
  margin: 0;
  color: #303133;
}

.settings-content {
  background: #fff;
  border-radius: 4px;
}

.about-section {
  text-align: center;
  padding: 40px 20px;
}

.about-section h3 {
  margin: 0 0 20px 0;
  color: #303133;
  font-size: 24px;
}

.about-section p {
  margin: 10px 0;
  color: #606266;
}

.about-links {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 15px;
}
</style> 