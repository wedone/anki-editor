<template>
  <div class="import-view">
    <el-card class="page-card" shadow="never">
      <template #header>
        <div class="page-header">
          <span>导入导出</span>
        </div>
      </template>

      <!-- 连接状态提示 -->
      <el-alert
        v-if="!ankiStore.isConnected"
        title="未连接到 Anki"
        description="请先在设置中配置 AnkiConnect 连接"
        type="warning"
        show-icon
        style="margin-bottom: 20px;"
      />

      <el-tabs v-model="activeTab" class="import-tabs">
        <!-- 导入 -->
        <el-tab-pane label="导入数据" name="import">
          <el-card class="section-card" shadow="never">
            <template #header>
              <span>导入 Anki 数据</span>
            </template>
            
            <el-form :model="importForm" label-width="120px">
              <el-form-item label="导入类型">
                <el-radio-group v-model="importForm.type">
                  <el-radio label="apkg">Anki 包 (.apkg)</el-radio>
                  <el-radio label="csv">CSV 文件 (.csv)</el-radio>
                  <el-radio label="txt">文本文件 (.txt)</el-radio>
                </el-radio-group>
              </el-form-item>
              
              <el-form-item label="目标牌组">
                <el-select v-model="importForm.targetDeck" placeholder="选择目标牌组" style="width: 300px;">
                  <el-option 
                    v-for="deck in ankiStore.decks" 
                    :key="deck.name" 
                    :label="deck.name" 
                    :value="deck.name" 
                  />
                </el-select>
              </el-form-item>
              
              <el-form-item label="文件选择">
                <el-upload
                  class="upload-demo"
                  drag
                  action="#"
                  :auto-upload="false"
                  :on-change="handleFileChange"
                  :file-list="fileList"
                >
                  <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                  <div class="el-upload__text">
                    将文件拖到此处，或<em>点击上传</em>
                  </div>
                  <template #tip>
                    <div class="el-upload__tip">
                      支持 {{ importForm.type.toUpperCase() }} 格式文件
                    </div>
                  </template>
                </el-upload>
              </el-form-item>
              
              <el-form-item label="导入选项">
                <el-checkbox v-model="importForm.overwrite">覆盖现有卡片</el-checkbox>
                <el-checkbox v-model="importForm.keepTags">保留标签</el-checkbox>
                <el-checkbox v-model="importForm.keepDeck">保留牌组结构</el-checkbox>
              </el-form-item>
              
              <el-form-item>
                <el-button type="primary" @click="handleImport" :loading="importing">
                  开始导入
                </el-button>
                <el-button @click="clearImportForm">重置</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-tab-pane>

        <!-- 导出 -->
        <el-tab-pane label="导出数据" name="export">
          <el-card class="section-card" shadow="never">
            <template #header>
              <span>导出 Anki 数据</span>
            </template>
            
            <el-form :model="exportForm" label-width="120px">
              <el-form-item label="导出类型">
                <el-radio-group v-model="exportForm.type">
                  <el-radio label="apkg">Anki 包 (.apkg)</el-radio>
                  <el-radio label="csv">CSV 文件 (.csv)</el-radio>
                  <el-radio label="txt">文本文件 (.txt)</el-radio>
                </el-radio-group>
              </el-form-item>
              
              <el-form-item label="导出范围">
                <el-select v-model="exportForm.scope" placeholder="选择导出范围" style="width: 300px;">
                  <el-option label="全部数据" value="all" />
                  <el-option label="指定牌组" value="deck" />
                  <el-option label="指定标签" value="tag" />
                </el-select>
              </el-form-item>
              
              <el-form-item v-if="exportForm.scope === 'deck'" label="选择牌组">
                <el-select v-model="exportForm.selectedDeck" placeholder="选择牌组" style="width: 300px;">
                  <el-option 
                    v-for="deck in ankiStore.decks" 
                    :key="deck.name" 
                    :label="deck.name" 
                    :value="deck.name" 
                  />
                </el-select>
              </el-form-item>
              
              <el-form-item v-if="exportForm.scope === 'tag'" label="选择标签">
                <el-select v-model="exportForm.selectedTag" placeholder="选择标签" style="width: 300px;">
                  <el-option 
                    v-for="tag in ankiStore.tags" 
                    :key="tag" 
                    :label="tag" 
                    :value="tag" 
                  />
                </el-select>
              </el-form-item>
              
              <el-form-item label="导出选项">
                <el-checkbox v-model="exportForm.includeMedia">包含媒体文件</el-checkbox>
                <el-checkbox v-model="exportForm.includeTags">包含标签</el-checkbox>
                <el-checkbox v-model="exportForm.includeDeck">包含牌组结构</el-checkbox>
              </el-form-item>
              
              <el-form-item>
                <el-button type="primary" @click="handleExport" :loading="exporting">
                  开始导出
                </el-button>
                <el-button @click="clearExportForm">重置</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-tab-pane>

        <!-- 备份 -->
        <el-tab-pane label="数据备份" name="backup">
          <el-card class="section-card" shadow="never">
            <template #header>
              <span>数据备份与恢复</span>
            </template>
            
            <el-row :gutter="20">
              <el-col :span="12">
                <el-card class="backup-card" shadow="hover">
                  <template #header>
                    <span>创建备份</span>
                  </template>
                  <div class="backup-content">
                    <p>创建当前 Anki 集合的完整备份</p>
                    <el-button type="primary" @click="createBackup" :loading="backingUp">
                      创建备份
                    </el-button>
                  </div>
                </el-card>
              </el-col>
              
              <el-col :span="12">
                <el-card class="backup-card" shadow="hover">
                  <template #header>
                    <span>恢复备份</span>
                  </template>
                  <div class="backup-content">
                    <p>从备份文件恢复 Anki 集合</p>
                    <el-upload
                      class="backup-upload"
                      action="#"
                      :auto-upload="false"
                      :on-change="handleBackupFileChange"
                      :file-list="backupFileList"
                    >
                      <el-button type="success">选择备份文件</el-button>
                    </el-upload>
                    <el-button 
                      type="warning" 
                      @click="restoreBackup" 
                      :loading="restoring"
                      :disabled="!backupFile"
                    >
                      恢复备份
                    </el-button>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useAnkiStore } from '@/stores/ankiStore'

const ankiStore = useAnkiStore()

// 状态
const activeTab = ref('import')
const importing = ref(false)
const exporting = ref(false)
const backingUp = ref(false)
const restoring = ref(false)

// 导入表单
const importForm = reactive({
  type: 'apkg',
  targetDeck: '',
  overwrite: false,
  keepTags: true,
  keepDeck: true
})

// 导出表单
const exportForm = reactive({
  type: 'apkg',
  scope: 'all',
  selectedDeck: '',
  selectedTag: '',
  includeMedia: true,
  includeTags: true,
  includeDeck: true
})

// 文件列表
const fileList = ref<any[]>([])
const backupFileList = ref<any[]>([])
const backupFile = ref<File | null>(null)

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

// 方法
const handleFileChange = (file: any) => {
  fileList.value = [file]
}

const handleBackupFileChange = (file: any) => {
  backupFileList.value = [file]
  backupFile.value = file.raw
}

const handleImport = async () => {
  if (fileList.value.length === 0) {
    ElMessage.warning('请选择要导入的文件')
    return
  }
  
  try {
    importing.value = true
    ElMessage.info('导入功能开发中...')
  } catch (error) {
    ElMessage.error('导入失败')
  } finally {
    importing.value = false
  }
}

const handleExport = async () => {
  try {
    exporting.value = true
    ElMessage.info('导出功能开发中...')
  } catch (error) {
    ElMessage.error('导出失败')
  } finally {
    exporting.value = false
  }
}

// 清空导入表单
const clearImportForm = () => {
  importForm.type = 'apkg'
  importForm.targetDeck = ''
  importForm.overwrite = false
  importForm.keepTags = true
  importForm.keepDeck = true
  fileList.value = []
}

// 清空导出表单
const clearExportForm = () => {
  exportForm.type = 'apkg'
  exportForm.scope = 'all'
  exportForm.selectedDeck = ''
  exportForm.selectedTag = ''
  exportForm.includeMedia = true
  exportForm.includeTags = true
  exportForm.includeDeck = true
}

// 创建备份
const createBackup = async () => {
  try {
    backingUp.value = true
    ElMessage.info('备份功能开发中...')
  } catch (error) {
    ElMessage.error('创建备份失败')
  } finally {
    backingUp.value = false
  }
}

// 恢复备份
const restoreBackup = async () => {
  if (!backupFile.value) {
    ElMessage.warning('请选择备份文件')
    return
  }
  
  try {
    restoring.value = true
    ElMessage.info('恢复功能开发中...')
  } catch (error) {
    ElMessage.error('恢复备份失败')
  } finally {
    restoring.value = false
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

.import-tabs {
  margin-top: 20px;
}

.section-card {
  margin-bottom: 20px;
}

.backup-card {
  height: 200px;
}

.backup-content {
  text-align: center;
  padding: 20px;
}

.backup-content p {
  margin-bottom: 20px;
  color: #606266;
}

.backup-upload {
  margin-bottom: 15px;
}
</style> 