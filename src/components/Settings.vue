<template>
  <div class="settings">
    <el-card>
      <template #header>
        <div class="card-header">
          <el-icon><Setting /></el-icon>
          <span>应用设置</span>
        </div>
      </template>
      
      <el-tabs v-model="activeTab" type="border-card">
        <!-- 连接设置 -->
        <el-tab-pane label="连接设置" name="connection">
          <div class="settings-section">
            <h3>AnkiConnect 连接</h3>
            <el-descriptions :column="2" border>
              <el-descriptions-item label="连接地址">http://localhost:8765</el-descriptions-item>
              <el-descriptions-item label="连接状态">
                <el-tag :type="connectionStatus.connected ? 'success' : 'danger'">
                  {{ connectionStatus.connected ? '已连接' : '未连接' }}
                </el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="版本" v-if="connectionStatus.version">
                {{ connectionStatus.version }}
              </el-descriptions-item>
            </el-descriptions>
            
            <div class="settings-actions">
              <el-button type="primary" @click="testConnection">
                <el-icon><Connection /></el-icon>
                测试连接
              </el-button>
              <el-button @click="refreshConnection">
                <el-icon><Refresh /></el-icon>
                刷新状态
              </el-button>
            </div>
          </div>
        </el-tab-pane>
        
        <!-- 界面设置 -->
        <el-tab-pane label="界面设置" name="interface">
          <div class="settings-section">
            <h3>显示选项</h3>
            <el-form :model="interfaceSettings" label-width="120px">
              <el-form-item label="自动保存">
                <el-switch v-model="interfaceSettings.autoSave" />
              </el-form-item>
              <el-form-item label="显示卡片ID">
                <el-switch v-model="interfaceSettings.showCardId" />
              </el-form-item>
              <el-form-item label="预览模式">
                <el-select v-model="interfaceSettings.defaultPreviewMode">
                  <el-option label="正面" value="front" />
                  <el-option label="背面" value="back" />
                  <el-option label="完整卡片" value="full" />
                </el-select>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        
        <!-- 关于 -->
        <el-tab-pane label="关于" name="about">
          <div class="settings-section">
            <h3>Anki Editor</h3>
            <el-descriptions :column="1" border>
              <el-descriptions-item label="版本">1.0.0</el-descriptions-item>
              <el-descriptions-item label="技术栈">Vue 3 + Vite + Element Plus</el-descriptions-item>
              <el-descriptions-item label="AnkiConnect">基于 AnkiConnect API</el-descriptions-item>
              <el-descriptions-item label="功能">卡片字段编辑和预览</el-descriptions-item>
            </el-descriptions>
            
            <div class="about-links">
              <h4>相关链接</h4>
              <ul>
                <li><a href="https://git.sr.ht/~foosoft/anki-connect" target="_blank">AnkiConnect 文档</a></li>
                <li><a href="https://element-plus.org" target="_blank">Element Plus 文档</a></li>
                <li><a href="https://vitejs.dev" target="_blank">Vite 文档</a></li>
              </ul>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Setting, Connection, Refresh } from '@element-plus/icons-vue'
import { checkConnection } from '../services/ankiConnect.js'

export default {
  name: 'Settings',
  components: {
    Setting,
    Connection,
    Refresh
  },
  setup() {
    const activeTab = ref('connection')
    const connectionStatus = reactive({
      connected: false,
      error: null,
      version: null
    })
    
    const interfaceSettings = reactive({
      autoSave: true,
      showCardId: true,
      defaultPreviewMode: 'front'
    })

    // 测试连接
    const testConnection = async () => {
      try {
        const result = await checkConnection()
        connectionStatus.connected = result.connected
        connectionStatus.error = result.error
        connectionStatus.version = result.version
        
        if (result.connected) {
          ElMessage.success('连接测试成功')
        } else {
          ElMessage.error('连接测试失败: ' + result.error)
        }
      } catch (error) {
        ElMessage.error('连接测试失败: ' + error.message)
      }
    }

    // 刷新连接状态
    const refreshConnection = async () => {
      await testConnection()
    }

    // 初始化时测试连接
    testConnection()

    return {
      activeTab,
      connectionStatus,
      interfaceSettings,
      testConnection,
      refreshConnection
    }
  }
}
</script>

<style scoped>
.settings {
  padding: 20px;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
}

.settings-section {
  padding: 20px 0;
}

.settings-section h3 {
  margin: 0 0 16px 0;
  color: #303133;
}

.settings-section h4 {
  margin: 16px 0 8px 0;
  color: #606266;
}

.settings-actions {
  margin-top: 16px;
  display: flex;
  gap: 12px;
}

.about-links ul {
  margin: 8px 0;
  padding-left: 20px;
}

.about-links li {
  margin-bottom: 4px;
}

.about-links a {
  color: #409EFF;
  text-decoration: none;
}

.about-links a:hover {
  text-decoration: underline;
}
</style> 