<template>
  <div class="import-export">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>导入导出</span>
          <div class="header-actions">
            <el-button type="primary" @click="exportData" :disabled="!ankiStore.isConnected">
              <el-icon><Download /></el-icon>
              导出数据
            </el-button>
            <el-button type="success" @click="importData" :disabled="!ankiStore.isConnected">
              <el-icon><Upload /></el-icon>
              导入数据
            </el-button>
          </div>
        </div>
      </template>

      <!-- 连接状态提示 -->
      <el-alert
        v-if="!ankiStore.isConnected"
        title="未连接到 Anki"
        type="warning"
        description="请确保 Anki 正在运行且已安装 AnkiConnect 插件"
        show-icon
        :closable="false"
        style="margin-bottom: 20px;"
      />

      <!-- 数据概览 -->
      <div class="data-overview" style="margin-bottom: 30px;">
        <h3>数据概览</h3>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-card shadow="hover" class="overview-card">
              <div class="overview-content">
                <div class="overview-icon">
                  <el-icon size="24"><Folder /></el-icon>
                </div>
                <div class="overview-info">
                  <div class="overview-number">{{ dataStats.deckCount }}</div>
                  <div class="overview-label">牌组数量</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover" class="overview-card">
              <div class="overview-content">
                <div class="overview-icon">
                  <el-icon size="24"><Document /></el-icon>
                </div>
                <div class="overview-info">
                  <div class="overview-number">{{ dataStats.cardCount }}</div>
                  <div class="overview-label">卡片数量</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover" class="overview-card">
              <div class="overview-content">
                <div class="overview-icon">
                  <el-icon size="24"><EditPen /></el-icon>
                </div>
                <div class="overview-info">
                  <div class="overview-number">{{ dataStats.noteCount }}</div>
                  <div class="overview-label">笔记数量</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover" class="overview-card">
              <div class="overview-content">
                <div class="overview-icon">
                  <el-icon size="24"><Collection /></el-icon>
                </div>
                <div class="overview-info">
                  <div class="overview-number">{{ dataStats.tagCount }}</div>
                  <div class="overview-label">标签数量</div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <!-- 操作面板 -->
      <div class="operation-panels">
        <!-- 导出面板 -->
        <el-card class="operation-card">
          <template #header>
            <div class="panel-header">
              <el-icon><Download /></el-icon>
              <span>数据导出</span>
            </div>
          </template>
          <div class="panel-content">
            <p class="panel-description">
              导出 Anki 数据到本地文件，支持多种格式
            </p>
            <div class="export-options">
              <el-form :model="exportOptions" label-width="120px">
                <el-form-item label="导出格式">
                  <el-radio-group v-model="exportOptions.format">
                    <el-radio label="apkg">Anki 包文件 (.apkg)</el-radio>
                    <el-radio label="json">JSON 格式 (.json)</el-radio>
                    <el-radio label="csv">CSV 格式 (.csv)</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="导出内容">
                  <el-checkbox-group v-model="exportOptions.content">
                    <el-checkbox label="decks">牌组</el-checkbox>
                    <el-checkbox label="cards">卡片</el-checkbox>
                    <el-checkbox label="notes">笔记</el-checkbox>
                    <el-checkbox label="tags">标签</el-checkbox>
                    <el-checkbox label="media">媒体文件</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item label="包含设置">
                  <el-checkbox v-model="exportOptions.includeSettings">包含用户设置</el-checkbox>
                </el-form-item>
              </el-form>
            </div>
            <div class="panel-actions">
              <el-button type="primary" @click="startExport" :loading="exporting">
                开始导出
              </el-button>
            </div>
          </div>
        </el-card>

        <!-- 导入面板 -->
        <el-card class="operation-card">
          <template #header>
            <div class="panel-header">
              <el-icon><Upload /></el-icon>
              <span>数据导入</span>
            </div>
          </template>
          <div class="panel-content">
            <p class="panel-description">
              从本地文件导入数据到 Anki
            </p>
            <div class="import-options">
              <el-form :model="importOptions" label-width="120px">
                <el-form-item label="导入模式">
                  <el-radio-group v-model="importOptions.mode">
                    <el-radio label="merge">合并模式</el-radio>
                    <el-radio label="replace">替换模式</el-radio>
                    <el-radio label="update">更新模式</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="冲突处理">
                  <el-select v-model="importOptions.conflictResolution" placeholder="选择冲突处理方式">
                    <el-option label="跳过重复项" value="skip" />
                    <el-option label="覆盖重复项" value="overwrite" />
                    <el-option label="重命名重复项" value="rename" />
                  </el-select>
                </el-form-item>
                <el-form-item label="导入设置">
                  <el-checkbox v-model="importOptions.importSettings">导入用户设置</el-checkbox>
                  <el-checkbox v-model="importOptions.importMedia">导入媒体文件</el-checkbox>
                </el-form-item>
              </el-form>
            </div>
            <div class="panel-actions">
              <el-upload
                ref="uploadRef"
                :auto-upload="false"
                :on-change="handleFileChange"
                :show-file-list="false"
                accept=".apkg,.json,.csv"
              >
                <el-button type="primary" @click="selectFile">
                  选择文件
                </el-button>
              </el-upload>
              <el-button 
                type="success" 
                @click="startImport" 
                :loading="importing"
                :disabled="!selectedFile"
              >
                开始导入
              </el-button>
            </div>
            <div v-if="selectedFile" class="selected-file">
              <el-tag type="success">
                已选择: {{ selectedFile.name }}
              </el-tag>
            </div>
          </div>
        </el-card>
      </div>

      <!-- 进度显示 -->
      <div v-if="showProgress" class="progress-section">
        <el-card>
          <template #header>
            <div class="progress-header">
              <span>{{ progressTitle }}</span>
              <el-button type="link" @click="cancelOperation">
                取消
              </el-button>
            </div>
          </template>
          <div class="progress-content">
            <el-progress 
              :percentage="progressPercentage" 
              :status="progressStatus"
              :stroke-width="8"
            />
            <div class="progress-info">
              <p>{{ progressMessage }}</p>
              <p v-if="progressDetail">{{ progressDetail }}</p>
            </div>
          </div>
        </el-card>
      </div>

      <!-- 历史记录 -->
      <div class="history-section">
        <el-card>
          <template #header>
            <div class="history-header">
              <span>操作历史</span>
              <el-button type="link" @click="refreshHistory">
                刷新
              </el-button>
            </div>
          </template>
          <el-table :data="operationHistory" style="width: 100%">
            <el-table-column prop="type" label="操作类型" width="120">
              <template #default="{ row }">
                <el-tag :type="getOperationType(row.type)">
                  {{ getOperationLabel(row.type) }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="filename" label="文件名" min-width="200" />
            <el-table-column prop="size" label="文件大小" width="120" align="center">
              <template #default="{ row }">
                {{ formatFileSize(row.size) }}
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" width="100" align="center">
              <template #default="{ row }">
                <el-tag :type="getStatusType(row.status)">
                  {{ getStatusLabel(row.status) }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="created" label="操作时间" width="180" align="center">
              <template #default="{ row }">
                {{ formatDate(row.created) }}
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150" align="center">
              <template #default="{ row }">
                <el-button type="link" size="small" @click="downloadFile(row)">
                  下载
                </el-button>
                <el-button type="link" size="small" @click="deleteHistory(row)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </div>
    </el-card>

    <!-- 导入确认对话框 -->
    <el-dialog
      v-model="importConfirmVisible"
      title="确认导入"
      width="500px"
    >
      <div class="import-confirm">
        <p>即将导入文件：<strong>{{ selectedFile?.name }}</strong></p>
        <p>导入模式：<strong>{{ getImportModeLabel(importOptions.mode) }}</strong></p>
        <p>冲突处理：<strong>{{ getConflictResolutionLabel(importOptions.conflictResolution) }}</strong></p>
        <el-alert
          title="注意"
          type="warning"
          description="导入操作可能会影响现有数据，请确保已备份重要数据"
          show-icon
          style="margin-top: 15px;"
        />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="importConfirmVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmImport" :loading="importing">
            确认导入
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useAnkiStore } from '../stores/ankiStore.js'
import { 
  Download, 
  Upload, 
  Folder, 
  Document, 
  EditPen, 
  Collection 
} from '@element-plus/icons-vue'

const ankiStore = useAnkiStore()

// 响应式数据
const exporting = ref(false)
const importing = ref(false)
const showProgress = ref(false)
const progressTitle = ref('')
const progressPercentage = ref(0)
const progressStatus = ref('')
const progressMessage = ref('')
const progressDetail = ref('')
const selectedFile = ref(null)
const importConfirmVisible = ref(false)

const exportOptions = ref({
  format: 'apkg',
  content: ['decks', 'cards', 'notes', 'tags'],
  includeSettings: true
})

const importOptions = ref({
  mode: 'merge',
  conflictResolution: 'skip',
  importSettings: false,
  importMedia: true
})

// 模拟数据统计
const dataStats = ref({
  deckCount: 8,
  cardCount: 228,
  noteCount: 156,
  tagCount: 12
})

// 模拟操作历史
const operationHistory = ref([
  {
    id: 1,
    type: 'export',
    filename: 'anki_backup_2024-01-25.apkg',
    size: 2048576,
    status: 'completed',
    created: new Date('2024-01-25 14:30:00')
  },
  {
    id: 2,
    type: 'import',
    filename: 'new_cards.json',
    size: 512000,
    status: 'completed',
    created: new Date('2024-01-24 16:45:00')
  },
  {
    id: 3,
    type: 'export',
    filename: 'deck_backup.csv',
    size: 102400,
    status: 'failed',
    created: new Date('2024-01-23 09:15:00')
  }
])

// 方法
const formatDate = (date) => {
  if (!date) return '-'
  return new Date(date).toLocaleString('zh-CN')
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const getOperationType = (type) => {
  return type === 'export' ? 'success' : 'primary'
}

const getOperationLabel = (type) => {
  return type === 'export' ? '导出' : '导入'
}

const getStatusType = (status) => {
  switch (status) {
    case 'completed': return 'success'
    case 'failed': return 'danger'
    case 'processing': return 'warning'
    default: return 'info'
  }
}

const getStatusLabel = (status) => {
  switch (status) {
    case 'completed': return '完成'
    case 'failed': return '失败'
    case 'processing': return '处理中'
    default: return '未知'
  }
}

const getImportModeLabel = (mode) => {
  switch (mode) {
    case 'merge': return '合并模式'
    case 'replace': return '替换模式'
    case 'update': return '更新模式'
    default: return '未知'
  }
}

const getConflictResolutionLabel = (resolution) => {
  switch (resolution) {
    case 'skip': return '跳过重复项'
    case 'overwrite': return '覆盖重复项'
    case 'rename': return '重命名重复项'
    default: return '未知'
  }
}

const exportData = () => {
  if (!ankiStore.isConnected) {
    ElMessage.warning('请先连接到 Anki')
    return
  }
  
  if (exportOptions.value.content.length === 0) {
    ElMessage.warning('请至少选择一项导出内容')
    return
  }
  
  startExport()
}

const startExport = async () => {
  exporting.value = true
  showProgress.value = true
  progressTitle.value = '正在导出数据...'
  progressPercentage.value = 0
  progressStatus.value = ''
  progressMessage.value = '准备导出数据'
  progressDetail.value = ''
  
  try {
    // 模拟导出进度
    for (let i = 0; i <= 100; i += 10) {
      progressPercentage.value = i
      progressMessage.value = `导出进度: ${i}%`
      
      if (i === 30) {
        progressDetail.value = '正在收集牌组数据...'
      } else if (i === 60) {
        progressDetail.value = '正在收集卡片数据...'
      } else if (i === 90) {
        progressDetail.value = '正在生成文件...'
      }
      
      await new Promise(resolve => setTimeout(resolve, 200))
    }
    
    progressStatus.value = 'success'
    progressMessage.value = '导出完成！'
    progressDetail.value = '文件已保存到本地'
    
    // 添加到历史记录
    const historyItem = {
      id: Date.now(),
      type: 'export',
      filename: `anki_backup_${new Date().toISOString().split('T')[0]}.${exportOptions.value.format}`,
      size: Math.floor(Math.random() * 2000000) + 500000,
      status: 'completed',
      created: new Date()
    }
    operationHistory.value.unshift(historyItem)
    
    ElMessage.success('数据导出成功！')
  } catch (error) {
    progressStatus.value = 'exception'
    progressMessage.value = '导出失败'
    progressDetail.value = error.message
    ElMessage.error(`导出失败: ${error.message}`)
  } finally {
    exporting.value = false
    setTimeout(() => {
      showProgress.value = false
    }, 2000)
  }
}

const importData = () => {
  if (!ankiStore.isConnected) {
    ElMessage.warning('请先连接到 Anki')
    return
  }
  
  // 触发文件选择
  const uploadRef = document.querySelector('.el-upload input')
  if (uploadRef) {
    uploadRef.click()
  }
}

const handleFileChange = (file) => {
  selectedFile.value = file.raw
  importConfirmVisible.value = true
}

const selectFile = () => {
  const uploadRef = document.querySelector('.el-upload input')
  if (uploadRef) {
    uploadRef.click()
  }
}

const confirmImport = async () => {
  importConfirmVisible.value = false
  await startImport()
}

const startImport = async () => {
  if (!selectedFile.value) {
    ElMessage.warning('请先选择要导入的文件')
    return
  }
  
  importing.value = true
  showProgress.value = true
  progressTitle.value = '正在导入数据...'
  progressPercentage.value = 0
  progressStatus.value = ''
  progressMessage.value = '准备导入数据'
  progressDetail.value = ''
  
  try {
    // 模拟导入进度
    for (let i = 0; i <= 100; i += 10) {
      progressPercentage.value = i
      progressMessage.value = `导入进度: ${i}%`
      
      if (i === 20) {
        progressDetail.value = '正在解析文件...'
      } else if (i === 50) {
        progressDetail.value = '正在验证数据...'
      } else if (i === 80) {
        progressDetail.value = '正在导入数据...'
      }
      
      await new Promise(resolve => setTimeout(resolve, 300))
    }
    
    progressStatus.value = 'success'
    progressMessage.value = '导入完成！'
    progressDetail.value = '数据已成功导入到 Anki'
    
    // 添加到历史记录
    const historyItem = {
      id: Date.now(),
      type: 'import',
      filename: selectedFile.value.name,
      size: selectedFile.value.size,
      status: 'completed',
      created: new Date()
    }
    operationHistory.value.unshift(historyItem)
    
    selectedFile.value = null
    ElMessage.success('数据导入成功！')
  } catch (error) {
    progressStatus.value = 'exception'
    progressMessage.value = '导入失败'
    progressDetail.value = error.message
    ElMessage.error(`导入失败: ${error.message}`)
  } finally {
    importing.value = false
    setTimeout(() => {
      showProgress.value = false
    }, 2000)
  }
}

const cancelOperation = () => {
  showProgress.value = false
  exporting.value = false
  importing.value = false
  ElMessage.info('操作已取消')
}

const refreshHistory = () => {
  ElMessage.success('历史记录已刷新')
}

const downloadFile = (item) => {
  ElMessage.info(`下载文件: ${item.filename}`)
}

const deleteHistory = async (item) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除历史记录 "${item.filename}" 吗？`,
      '确认删除',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
    
    const index = operationHistory.value.findIndex(h => h.id === item.id)
    if (index > -1) {
      operationHistory.value.splice(index, 1)
      ElMessage.success('历史记录删除成功！')
    }
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(`删除失败: ${error.message}`)
    }
  }
}

// 生命周期
onMounted(async () => {
  try {
    // 如果已连接，加载数据统计
    if (ankiStore.isConnected) {
      // 这里可以加载真实的数据统计
    }
  } catch (error) {
    console.error('加载数据失败:', error)
  }
})
</script>

<style scoped>
.import-export {
  height: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.data-overview {
  margin-bottom: 30px;
}

.data-overview h3 {
  margin-bottom: 20px;
  color: #303133;
}

.overview-card {
  text-align: center;
}

.overview-content {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
}

.overview-icon {
  margin-right: 15px;
  color: #409EFF;
}

.overview-info {
  text-align: left;
}

.overview-number {
  font-size: 24px;
  font-weight: bold;
  color: #409EFF;
  margin-bottom: 5px;
}

.overview-label {
  font-size: 14px;
  color: #606266;
}

.operation-panels {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 30px;
}

.operation-card {
  height: fit-content;
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.panel-content {
  padding: 10px 0;
}

.panel-description {
  margin-bottom: 20px;
  color: #606266;
  font-size: 14px;
}

.export-options,
.import-options {
  margin-bottom: 20px;
}

.panel-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.selected-file {
  margin-top: 10px;
}

.progress-section {
  margin-bottom: 30px;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.progress-content {
  padding: 10px 0;
}

.progress-info {
  margin-top: 15px;
}

.progress-info p {
  margin: 5px 0;
  color: #606266;
  font-size: 14px;
}

.history-section {
  margin-top: 30px;
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.import-confirm p {
  margin: 10px 0;
  color: #606266;
}

.import-confirm strong {
  color: #303133;
}
</style> 