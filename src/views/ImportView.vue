<template>
  <div class="import-view">
    <div class="page-header">
      <h2>导入导出</h2>
    </div>

    <div class="import-content">
      <el-row :gutter="20">
        <!-- 导入部分 -->
        <el-col :span="12">
          <el-card>
            <template #header>
              <div class="card-header">
                <span>导入数据</span>
              </div>
            </template>
            
            <div class="import-section">
              <h4>从文件导入</h4>
              <el-upload
                class="upload-demo"
                drag
                action="#"
                :auto-upload="false"
                :on-change="handleFileChange"
                accept=".apkg,.csv,.txt"
              >
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">
                  将文件拖到此处，或<em>点击上传</em>
                </div>
                <template #tip>
                  <div class="el-upload__tip">
                    支持 .apkg, .csv, .txt 格式文件
                  </div>
                </template>
              </el-upload>
              
              <div class="import-options">
                <h4>导入选项</h4>
                <el-form label-width="100px">
                  <el-form-item label="目标牌组">
                    <el-select v-model="importOptions.deck" placeholder="选择目标牌组">
                      <el-option label="默认牌组" value="默认牌组" />
                      <el-option label="JavaScript 学习" value="JavaScript 学习" />
                      <el-option label="Vue.js 基础" value="Vue.js 基础" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="标签">
                    <el-input v-model="importOptions.tags" placeholder="添加标签，用逗号分隔" />
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="startImport" :loading="importing">
                      开始导入
                    </el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </el-card>
        </el-col>

        <!-- 导出部分 -->
        <el-col :span="12">
          <el-card>
            <template #header>
              <div class="card-header">
                <span>导出数据</span>
              </div>
            </template>
            
            <div class="export-section">
              <h4>导出选项</h4>
              <el-form label-width="100px">
                <el-form-item label="导出范围">
                  <el-select v-model="exportOptions.scope" placeholder="选择导出范围">
                    <el-option label="全部牌组" value="all" />
                    <el-option label="指定牌组" value="specific" />
                    <el-option label="指定标签" value="tags" />
                  </el-select>
                </el-form-item>
                
                <el-form-item label="牌组选择" v-if="exportOptions.scope === 'specific'">
                  <el-select v-model="exportOptions.decks" multiple placeholder="选择要导出的牌组">
                    <el-option label="默认牌组" value="默认牌组" />
                    <el-option label="JavaScript 学习" value="JavaScript 学习" />
                    <el-option label="Vue.js 基础" value="Vue.js 基础" />
                  </el-select>
                </el-form-item>
                
                <el-form-item label="标签选择" v-if="exportOptions.scope === 'tags'">
                  <el-select v-model="exportOptions.tags" multiple placeholder="选择要导出的标签">
                    <el-option label="学习" value="学习" />
                    <el-option label="工作" value="工作" />
                    <el-option label="javascript" value="javascript" />
                    <el-option label="vue" value="vue" />
                  </el-select>
                </el-form-item>
                
                <el-form-item label="导出格式">
                  <el-radio-group v-model="exportOptions.format">
                    <el-radio label="apkg">Anki 包 (.apkg)</el-radio>
                    <el-radio label="csv">CSV 文件 (.csv)</el-radio>
                    <el-radio label="txt">文本文件 (.txt)</el-radio>
                  </el-radio-group>
                </el-form-item>
                
                <el-form-item>
                  <el-button type="primary" @click="startExport" :loading="exporting">
                    开始导出
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <!-- 历史记录 -->
      <el-card style="margin-top: 20px;">
        <template #header>
          <div class="card-header">
            <span>导入导出历史</span>
          </div>
        </template>
        
        <el-table :data="history" style="width: 100%">
          <el-table-column prop="type" label="类型" width="100">
            <template #default="scope">
              <el-tag :type="scope.row.type === 'import' ? 'success' : 'primary'">
                {{ scope.row.type === 'import' ? '导入' : '导出' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="filename" label="文件名" />
          <el-table-column prop="status" label="状态" width="100">
            <template #default="scope">
              <el-tag :type="scope.row.status === 'success' ? 'success' : 'danger'">
                {{ scope.row.status === 'success' ? '成功' : '失败' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="time" label="时间" width="180" />
          <el-table-column prop="details" label="详情" />
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

// 导入选项
const importOptions = reactive({
  deck: '',
  tags: ''
})

// 导出选项
const exportOptions = reactive({
  scope: 'all',
  decks: [],
  tags: [],
  format: 'apkg'
})

// 状态
const importing = ref(false)
const exporting = ref(false)

// 历史记录
const history = ref([
  {
    id: '1',
    type: 'import',
    filename: 'javascript_cards.csv',
    status: 'success',
    time: '2024-01-15 14:30:00',
    details: '导入了 50 张卡片到 JavaScript 学习牌组'
  },
  {
    id: '2',
    type: 'export',
    filename: 'vue_cards.apkg',
    status: 'success',
    time: '2024-01-15 13:45:00',
    details: '导出了 Vue.js 基础牌组，共 67 张卡片'
  },
  {
    id: '3',
    type: 'import',
    filename: 'anki_backup.apkg',
    status: 'success',
    time: '2024-01-15 12:20:00',
    details: '导入了完整的 Anki 备份文件'
  }
])

const handleFileChange = (file: any) => {
  console.log('选择的文件:', file)
  ElMessage.success(`已选择文件: ${file.name}`)
}

const startImport = async () => {
  if (!importOptions.deck) {
    ElMessage.warning('请选择目标牌组')
    return
  }
  
  importing.value = true
  
  // 模拟导入过程
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  importing.value = false
  ElMessage.success('导入完成！')
  
  // 添加历史记录
  history.value.unshift({
    id: Date.now().toString(),
    type: 'import',
    filename: 'imported_file.csv',
    status: 'success',
    time: new Date().toLocaleString(),
    details: `导入了卡片到 ${importOptions.deck} 牌组`
  })
}

const startExport = async () => {
  exporting.value = true
  
  // 模拟导出过程
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  exporting.value = false
  ElMessage.success('导出完成！')
  
  // 添加历史记录
  history.value.unshift({
    id: Date.now().toString(),
    type: 'export',
    filename: `export_${Date.now()}.${exportOptions.format}`,
    status: 'success',
    time: new Date().toLocaleString(),
    details: `导出了 ${exportOptions.scope} 数据`
  })
}
</script>

<style scoped>
.import-view {
  padding: 20px;
}

.page-header {
  margin-bottom: 20px;
}

.page-header h2 {
  margin: 0;
  color: #303133;
}

.import-content {
  background: #fff;
  border-radius: 4px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.import-section,
.export-section {
  margin-bottom: 20px;
}

.import-section h4,
.export-section h4 {
  margin: 0 0 15px 0;
  color: #303133;
}

.import-options {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #ebeef5;
}

.upload-demo {
  width: 100%;
}
</style> 