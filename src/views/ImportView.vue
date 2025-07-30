<template>
  <div class="import-view">
    <div class="page-header">
      <h2>导入导出</h2>
      <div class="header-actions">
        <el-button type="primary" @click="exportData">
          <el-icon><Download /></el-icon>
          导出数据
        </el-button>
      </div>
    </div>

    <div class="import-content">
      <!-- 连接状态提示 -->
      <el-alert
        v-if="!ankiStore.isConnected"
        title="未连接到 Anki"
        description="请先在设置中配置 AnkiConnect 连接"
        type="warning"
        show-icon
        style="margin-bottom: 20px;"
      />

      <!-- 导入导出区域 -->
      <div v-if="ankiStore.isConnected" class="import-sections">
        <!-- 导入区域 -->
        <div class="import-section">
          <h3>导入数据</h3>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-card>
                <template #header>
                  <span>导入 Anki 牌组文件</span>
                </template>
                <div class="import-area">
                  <el-upload
                    ref="uploadRef"
                    :auto-upload="false"
                    :on-change="handleFileChange"
                    :file-list="fileList"
                    accept=".apkg"
                    drag
                  >
                    <el-icon class="el-icon--upload"><UploadFilled /></el-icon>
                    <div class="el-upload__text">
                      将文件拖到此处，或<em>点击上传</em>
                    </div>
                    <template #tip>
                      <div class="el-upload__tip">
                        只能上传 .apkg 文件，且不超过 100MB
                      </div>
                    </template>
                  </el-upload>
                  <div class="upload-actions">
                    <el-button type="primary" @click="handleImport" :loading="importing" :disabled="!selectedFile">
                      开始导入
                    </el-button>
                    <el-button @click="clearFiles">清空文件</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card>
                <template #header>
                  <span>导入 CSV 文件</span>
                </template>
                <div class="import-area">
                  <el-upload
                    ref="csvUploadRef"
                    :auto-upload="false"
                    :on-change="handleCsvFileChange"
                    :file-list="csvFileList"
                    accept=".csv"
                    drag
                  >
                    <el-icon class="el-icon--upload"><Document /></el-icon>
                    <div class="el-upload__text">
                      将 CSV 文件拖到此处，或<em>点击上传</em>
                    </div>
                    <template #tip>
                      <div class="el-upload__tip">
                        只能上传 .csv 文件，格式：字段1,字段2,字段3
                      </div>
                    </template>
                  </el-upload>
                  <div class="upload-actions">
                    <el-button type="primary" @click="handleCsvImport" :loading="csvImporting" :disabled="!selectedCsvFile">
                      开始导入
                    </el-button>
                    <el-button @click="clearCsvFiles">清空文件</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>

        <!-- 导出区域 -->
        <div class="export-section">
          <h3>导出数据</h3>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-card>
                <template #header>
                  <span>导出牌组</span>
                </template>
                <div class="export-area">
                  <el-select v-model="selectedDeck" placeholder="选择要导出的牌组" style="width: 100%; margin-bottom: 15px;">
                    <el-option label="全部牌组" value="" />
                    <el-option 
                      v-for="deck in ankiStore.decks" 
                      :key="deck.name" 
                      :label="deck.name" 
                      :value="deck.name" 
                    />
                  </el-select>
                  <el-button type="primary" @click="exportDeck" :loading="exporting" style="width: 100%;">
                    <el-icon><Download /></el-icon>
                    导出牌组
                  </el-button>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card>
                <template #header>
                  <span>导出卡片</span>
                </template>
                <div class="export-area">
                  <el-select v-model="selectedCards" placeholder="选择要导出的卡片" style="width: 100%; margin-bottom: 15px;">
                    <el-option label="全部卡片" value="" />
                    <el-option label="按牌组筛选" value="by-deck" />
                    <el-option label="按标签筛选" value="by-tag" />
                  </el-select>
                  <el-button type="primary" @click="exportCards" :loading="exporting" style="width: 100%;">
                    <el-icon><Download /></el-icon>
                    导出卡片
                  </el-button>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card>
                <template #header>
                  <span>导出模板</span>
                </template>
                <div class="export-area">
                  <el-select v-model="selectedModel" placeholder="选择要导出的模板" style="width: 100%; margin-bottom: 15px;">
                    <el-option label="全部模板" value="" />
                    <el-option 
                      v-for="model in ankiStore.models" 
                      :key="model.name" 
                      :label="model.name" 
                      :value="model.name" 
                    />
                  </el-select>
                  <el-button type="primary" @click="exportModel" :loading="exporting" style="width: 100%;">
                    <el-icon><Download /></el-icon>
                    导出模板
                  </el-button>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>

        <!-- 导入历史 -->
        <div class="history-section">
          <h3>导入历史</h3>
          <el-card>
            <el-table :data="importHistory" style="width: 100%">
              <el-table-column prop="fileName" label="文件名" />
              <el-table-column prop="type" label="类型" width="100">
                <template #default="{ row }">
                  <el-tag :type="row.type === 'apkg' ? 'primary' : 'success'">
                    {{ row.type === 'apkg' ? '牌组文件' : 'CSV文件' }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="status" label="状态" width="100">
                <template #default="{ row }">
                  <el-tag :type="row.status === 'success' ? 'success' : row.status === 'error' ? 'danger' : 'warning'">
                    {{ row.status === 'success' ? '成功' : row.status === 'error' ? '失败' : '进行中' }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="importTime" label="导入时间" width="180" />
              <el-table-column prop="description" label="描述" />
            </el-table>
          </el-card>
        </div>

        <!-- 数据概览 -->
        <div class="overview-section">
          <h3>数据概览</h3>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-card class="overview-card">
                <div class="overview-content">
                  <div class="overview-icon">
                    <el-icon><Folder /></el-icon>
                  </div>
                  <div class="overview-info">
                    <div class="overview-number">{{ ankiStore.decks.length }}</div>
                    <div class="overview-label">牌组数量</div>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card class="overview-card">
                <div class="overview-content">
                  <div class="overview-icon">
                    <el-icon><Document /></el-icon>
                  </div>
                  <div class="overview-info">
                    <div class="overview-number">{{ ankiStore.notes.length }}</div>
                    <div class="overview-label">卡片数量</div>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card class="overview-card">
                <div class="overview-content">
                  <div class="overview-icon">
                    <el-icon><Files /></el-icon>
                  </div>
                  <div class="overview-info">
                    <div class="overview-number">{{ ankiStore.models.length }}</div>
                    <div class="overview-label">模板数量</div>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card class="overview-card">
                <div class="overview-content">
                  <div class="overview-icon">
                    <el-icon><PriceTag /></el-icon>
                  </div>
                  <div class="overview-info">
                    <div class="overview-number">{{ ankiStore.tags.length }}</div>
                    <div class="overview-label">标签数量</div>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-else class="empty-state">
        <el-empty description="暂无导入导出功能">
          <el-button type="primary" @click="testConnection">
            测试连接
          </el-button>
        </el-empty>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useAnkiStore } from '@/stores/ankiStore'

const ankiStore = useAnkiStore()

// 状态
const importing = ref(false)
const csvImporting = ref(false)
const exporting = ref(false)

// 文件上传
const uploadRef = ref()
const csvUploadRef = ref()
const fileList = ref([])
const csvFileList = ref([])
const selectedFile = ref(null)
const selectedCsvFile = ref(null)

// 导出选项
const selectedDeck = ref('')
const selectedCards = ref('')
const selectedModel = ref('')

// 导入历史
const importHistory = ref([
  {
    fileName: 'JavaScript基础.apkg',
    type: 'apkg',
    status: 'success',
    importTime: '2024-01-15 14:30:00',
    description: '成功导入 150 张卡片'
  },
  {
    fileName: 'Vue.js学习.csv',
    type: 'csv',
    status: 'success',
    importTime: '2024-01-14 10:20:00',
    description: '成功导入 89 张卡片'
  }
])

// 处理文件选择
const handleFileChange = (file: any) => {
  selectedFile.value = file.raw
  ElMessage.success('文件已选择')
}

const handleCsvFileChange = (file: any) => {
  selectedCsvFile.value = file.raw
  ElMessage.success('CSV 文件已选择')
}

// 清空文件
const clearFiles = () => {
  fileList.value = []
  selectedFile.value = null
  uploadRef.value?.clearFiles()
}

const clearCsvFiles = () => {
  csvFileList.value = []
  selectedCsvFile.value = null
  csvUploadRef.value?.clearFiles()
}

// 导入牌组文件
const handleImport = async () => {
  if (!selectedFile.value) {
    ElMessage.warning('请先选择文件')
    return
  }

  importing.value = true
  try {
    // 模拟导入过程
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // 添加到导入历史
    importHistory.value.unshift({
      fileName: selectedFile.value.name,
      type: 'apkg',
      status: 'success',
      importTime: new Date().toLocaleString(),
      description: '成功导入牌组文件'
    })
    
    ElMessage.success('牌组导入成功')
    clearFiles()
  } catch (error) {
    ElMessage.error('导入失败')
  } finally {
    importing.value = false
  }
}

// 导入 CSV 文件
const handleCsvImport = async () => {
  if (!selectedCsvFile.value) {
    ElMessage.warning('请先选择 CSV 文件')
    return
  }

  csvImporting.value = true
  try {
    // 模拟导入过程
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // 添加到导入历史
    importHistory.value.unshift({
      fileName: selectedCsvFile.value.name,
      type: 'csv',
      status: 'success',
      importTime: new Date().toLocaleString(),
      description: '成功导入 CSV 文件'
    })
    
    ElMessage.success('CSV 文件导入成功')
    clearCsvFiles()
  } catch (error) {
    ElMessage.error('导入失败')
  } finally {
    csvImporting.value = false
  }
}

// 导出数据
const exportData = async () => {
  try {
    await ElMessageBox.confirm(
      '确定要导出所有数据吗？这将包含牌组、卡片、模板和标签信息。',
      '确认导出',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }
    )

    exporting.value = true
    
    // 模拟导出过程
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    ElMessage.success('数据导出成功')
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('导出失败')
    }
  } finally {
    exporting.value = false
  }
}

// 导出牌组
const exportDeck = async () => {
  exporting.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    ElMessage.success(`牌组 "${selectedDeck.value || '全部'}" 导出成功`)
  } catch (error) {
    ElMessage.error('导出失败')
  } finally {
    exporting.value = false
  }
}

// 导出卡片
const exportCards = async () => {
  exporting.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    ElMessage.success(`卡片导出成功`)
  } catch (error) {
    ElMessage.error('导出失败')
  } finally {
    exporting.value = false
  }
}

// 导出模板
const exportModel = async () => {
  exporting.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    ElMessage.success(`模板 "${selectedModel.value || '全部'}" 导出成功`)
  } catch (error) {
    ElMessage.error('导出失败')
  } finally {
    exporting.value = false
  }
}

// 测试连接
const testConnection = async () => {
  try {
    await ankiStore.testConnection()
    if (ankiStore.isConnected) {
      ElMessage.success('连接成功')
    } else {
      ElMessage.error('连接失败')
    }
  } catch (error) {
    ElMessage.error('连接测试失败')
  }
}

// 页面加载时初始化
onMounted(async () => {
  if (ankiStore.isConnected) {
    await ankiStore.initialize()
  }
})
</script>

<style scoped>
.import-view {
  padding: 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.page-header h2 {
  margin: 0;
  color: #303133;
}

.header-actions {
  display: flex;
  align-items: center;
}

.import-content {
  background: #fff;
  border-radius: 4px;
  padding: 20px;
}

.import-sections {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.import-sections h3 {
  margin: 0 0 20px 0;
  color: #303133;
  font-size: 18px;
}

.import-area {
  padding: 20px;
}

.upload-actions {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

.export-area {
  padding: 20px;
  text-align: center;
}

.overview-card {
  height: 120px;
  cursor: pointer;
  transition: all 0.3s;
}

.overview-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.overview-content {
  display: flex;
  align-items: center;
  height: 100%;
}

.overview-icon {
  font-size: 48px;
  color: #409eff;
  margin-right: 20px;
}

.overview-info {
  flex: 1;
}

.overview-number {
  font-size: 32px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 5px;
}

.overview-label {
  color: #606266;
  font-size: 14px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
}
</style> 