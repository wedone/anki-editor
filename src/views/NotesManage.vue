<template>
  <div class="notes-manage">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>笔记管理</span>
          <div class="header-actions">
            <el-button type="primary" @click="createModel" :disabled="!ankiStore.isConnected">
              <el-icon><Plus /></el-icon>
              创建模板
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

      <!-- 笔记模板列表 -->
      <el-table
        :data="models"
        style="width: 100%"
        v-loading="loading"
        empty-text="暂无笔记模板"
      >
        <el-table-column prop="name" label="模板名称" min-width="150">
          <template #default="{ row }">
            <el-button type="text" @click="viewModel(row)">
              {{ row.name }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="fieldCount" label="字段数量" width="100" align="center">
          <template #default="{ row }">
            <el-tag type="info">{{ row.fieldCount || 0 }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="cardCount" label="卡片数量" width="100" align="center">
          <template #default="{ row }">
            <el-tag type="success">{{ row.cardCount || 0 }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="lastModified" label="最后修改" width="180" align="center">
          <template #default="{ row }">
            {{ formatDate(row.lastModified) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250" align="center">
          <template #default="{ row }">
            <el-button type="text" size="small" @click="editModel(row)">
              编辑
            </el-button>
            <el-button type="text" size="small" @click="previewModel(row)">
              预览
            </el-button>
            <el-button type="text" size="small" @click="manageFields(row)">
              字段管理
            </el-button>
            <el-button 
              type="text" 
              size="small" 
              @click="deleteModel(row)" 
              style="color: #f56c6c;"
              :disabled="!ankiStore.isConnected"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 创建模板对话框 -->
    <el-dialog
      v-model="createDialogVisible"
      title="创建笔记模板"
      width="600px"
    >
      <el-form :model="newModel" label-width="100px">
        <el-form-item label="模板名称" required>
          <el-input v-model="newModel.name" placeholder="请输入模板名称" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="newModel.description"
            type="textarea"
            placeholder="请输入模板描述（可选）"
            :rows="3"
          />
        </el-form-item>
        <el-form-item label="字段">
          <div class="fields-container">
            <div
              v-for="(field, index) in newModel.fields"
              :key="index"
              class="field-item"
            >
              <el-input
                v-model="field.name"
                placeholder="字段名称"
                style="width: 200px; margin-right: 10px;"
              />
              <el-select
                v-model="field.type"
                placeholder="字段类型"
                style="width: 120px; margin-right: 10px;"
              >
                <el-option label="文本" value="text" />
                <el-option label="富文本" value="rich" />
                <el-option label="图片" value="image" />
                <el-option label="音频" value="audio" />
              </el-select>
              <el-button
                type="danger"
                size="small"
                @click="removeField(index)"
                :disabled="newModel.fields.length <= 1"
              >
                删除
              </el-button>
            </div>
            <el-button type="primary" size="small" @click="addField">
              添加字段
            </el-button>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="createDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmCreateModel" :loading="creating">
            创建
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 模板预览对话框 -->
    <el-dialog
      v-model="previewDialogVisible"
      title="模板预览"
      width="800px"
    >
      <div class="model-preview">
        <div class="preview-header">
          <h3>{{ previewModelData.name }}</h3>
          <p>{{ previewModelData.description }}</p>
        </div>
        <div class="preview-fields">
          <h4>字段列表</h4>
          <el-table :data="previewModelData.fields" style="width: 100%">
            <el-table-column prop="name" label="字段名称" width="200" />
            <el-table-column prop="type" label="字段类型" width="120" />
            <el-table-column prop="description" label="描述" />
          </el-table>
        </div>
        <div class="preview-template">
          <h4>模板预览</h4>
          <div class="template-preview">
            <div class="template-front">
              <h5>正面模板</h5>
              <div class="template-content" v-html="previewModelData.frontTemplate"></div>
            </div>
            <div class="template-back">
              <h5>背面模板</h5>
              <div class="template-content" v-html="previewModelData.backTemplate"></div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>

    <!-- 字段管理对话框 -->
    <el-dialog
      v-model="fieldsDialogVisible"
      title="字段管理"
      width="700px"
    >
      <div class="fields-management">
        <div class="fields-header">
          <h4>{{ selectedModel.name }} - 字段管理</h4>
          <el-button type="primary" size="small" @click="addFieldToModel">
            添加字段
          </el-button>
        </div>
        <el-table :data="selectedModel.fields" style="width: 100%">
          <el-table-column prop="name" label="字段名称" width="200">
            <template #default="{ row, $index }">
              <el-input
                v-model="row.name"
                size="small"
                @blur="updateFieldName($index, row.name)"
              />
            </template>
          </el-table-column>
          <el-table-column prop="type" label="字段类型" width="150">
            <template #default="{ row, $index }">
              <el-select
                v-model="row.type"
                size="small"
                @change="updateFieldType($index, row.type)"
              >
                <el-option label="文本" value="text" />
                <el-option label="富文本" value="rich" />
                <el-option label="图片" value="image" />
                <el-option label="音频" value="audio" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="description" label="描述">
            <template #default="{ row, $index }">
              <el-input
                v-model="row.description"
                size="small"
                placeholder="字段描述"
                @blur="updateFieldDescription($index, row.description)"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100" align="center">
            <template #default="{ $index }">
              <el-button
                type="danger"
                size="small"
                @click="removeFieldFromModel($index)"
                :disabled="selectedModel.fields.length <= 1"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="fieldsDialogVisible = false">关闭</el-button>
          <el-button type="primary" @click="saveFieldsChanges">
            保存更改
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
import { Plus } from '@element-plus/icons-vue'

const ankiStore = useAnkiStore()

// 响应式数据
const loading = ref(false)
const creating = ref(false)
const createDialogVisible = ref(false)
const previewDialogVisible = ref(false)
const fieldsDialogVisible = ref(false)
const selectedModel = ref({})
const previewModelData = ref({})

const newModel = ref({
  name: '',
  description: '',
  fields: [
    { name: 'Front', type: 'text', description: '正面内容' },
    { name: 'Back', type: 'text', description: '背面内容' }
  ]
})

// 模拟笔记模板数据
const models = ref([
  {
    id: 1,
    name: 'Basic',
    description: '基础笔记类型，包含正面和背面',
    fieldCount: 2,
    cardCount: 150,
    lastModified: new Date('2024-01-15'),
    fields: [
      { name: 'Front', type: 'text', description: '正面内容' },
      { name: 'Back', type: 'text', description: '背面内容' }
    ],
    frontTemplate: '{{Front}}',
    backTemplate: '{{Front}}<hr>{{Back}}'
  },
  {
    id: 2,
    name: 'Basic (and reversed card)',
    description: '基础笔记类型，包含正反面卡片',
    fieldCount: 2,
    cardCount: 85,
    lastModified: new Date('2024-01-20'),
    fields: [
      { name: 'Front', type: 'text', description: '正面内容' },
      { name: 'Back', type: 'text', description: '背面内容' }
    ],
    frontTemplate: '{{Front}}',
    backTemplate: '{{Front}}<hr>{{Back}}'
  },
  {
    id: 3,
    name: 'Cloze',
    description: '填空题笔记类型',
    fieldCount: 1,
    cardCount: 45,
    lastModified: new Date('2024-01-18'),
    fields: [
      { name: 'Text', type: 'rich', description: '包含填空的文本' }
    ],
    frontTemplate: '{{cloze:Text}}',
    backTemplate: '{{cloze:Text}}<br><br>{{Back}}'
  }
])

// 方法
const formatDate = (date) => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('zh-CN')
}

const createModel = () => {
  if (!ankiStore.isConnected) {
    ElMessage.warning('请先连接到 Anki')
    return
  }
  createDialogVisible.value = true
  newModel.value = {
    name: '',
    description: '',
    fields: [
      { name: 'Front', type: 'text', description: '正面内容' },
      { name: 'Back', type: 'text', description: '背面内容' }
    ]
  }
}

const confirmCreateModel = async () => {
  if (!newModel.value.name.trim()) {
    ElMessage.warning('请输入模板名称')
    return
  }
  
  creating.value = true
  try {
    // 这里后续会集成真实的 AnkiConnect API 调用
    const model = {
      id: Date.now(),
      name: newModel.value.name,
      description: newModel.value.description,
      fieldCount: newModel.value.fields.length,
      cardCount: 0,
      lastModified: new Date(),
      fields: [...newModel.value.fields],
      frontTemplate: '{{Front}}',
      backTemplate: '{{Front}}<hr>{{Back}}'
    }
    
    models.value.push(model)
    createDialogVisible.value = false
    ElMessage.success('模板创建成功！')
  } catch (error) {
    ElMessage.error(`创建失败: ${error.message}`)
  } finally {
    creating.value = false
  }
}

const addField = () => {
  newModel.value.fields.push({
    name: '',
    type: 'text',
    description: ''
  })
}

const removeField = (index) => {
  newModel.value.fields.splice(index, 1)
}

const viewModel = (model) => {
  ElMessage.info(`查看模板: ${model.name}`)
}

const editModel = (model) => {
  ElMessage.info(`编辑模板: ${model.name}`)
}

const previewModel = (model) => {
  previewModelData.value = { ...model }
  previewDialogVisible.value = true
}

const deleteModel = async (model) => {
  if (!ankiStore.isConnected) {
    ElMessage.warning('请先连接到 Anki')
    return
  }

  try {
    await ElMessageBox.confirm(
      `确定要删除模板 "${model.name}" 吗？此操作不可恢复。`,
      '确认删除',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
    
    const index = models.value.findIndex(m => m.id === model.id)
    if (index > -1) {
      models.value.splice(index, 1)
      ElMessage.success('模板删除成功！')
    }
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(`删除失败: ${error.message}`)
    }
  }
}

const manageFields = (model) => {
  selectedModel.value = { ...model }
  fieldsDialogVisible.value = true
}

const addFieldToModel = () => {
  selectedModel.value.fields.push({
    name: '新字段',
    type: 'text',
    description: ''
  })
}

const removeFieldFromModel = (index) => {
  selectedModel.value.fields.splice(index, 1)
}

const updateFieldName = (index, name) => {
  selectedModel.value.fields[index].name = name
}

const updateFieldType = (index, type) => {
  selectedModel.value.fields[index].type = type
}

const updateFieldDescription = (index, description) => {
  selectedModel.value.fields[index].description = description
}

const saveFieldsChanges = async () => {
  try {
    // 更新原始数据
    const index = models.value.findIndex(m => m.id === selectedModel.value.id)
    if (index > -1) {
      models.value[index] = { ...selectedModel.value }
      models.value[index].fieldCount = selectedModel.value.fields.length
      models.value[index].lastModified = new Date()
    }
    
    fieldsDialogVisible.value = false
    ElMessage.success('字段更改保存成功！')
  } catch (error) {
    ElMessage.error(`保存失败: ${error.message}`)
  }
}

// 生命周期
onMounted(async () => {
  loading.value = true
  try {
    // 如果已连接，加载数据
    if (ankiStore.isConnected) {
      await ankiStore.loadModels()
    }
  } catch (error) {
    console.error('加载数据失败:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.notes-manage {
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
}

.fields-container {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 10px;
  background-color: #fafafa;
}

.field-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.model-preview {
  max-height: 600px;
  overflow-y: auto;
}

.preview-header {
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ebeef5;
}

.preview-header h3 {
  margin: 0 0 10px 0;
  color: #303133;
}

.preview-header p {
  margin: 0;
  color: #606266;
}

.preview-fields,
.preview-template {
  margin-bottom: 20px;
}

.preview-fields h4,
.preview-template h4 {
  margin-bottom: 10px;
  color: #303133;
}

.template-preview {
  display: flex;
  gap: 20px;
}

.template-front,
.template-back {
  flex: 1;
}

.template-front h5,
.template-back h5 {
  margin-bottom: 10px;
  color: #606266;
}

.template-content {
  padding: 10px;
  background-color: #f5f7fa;
  border-radius: 4px;
  min-height: 60px;
  border: 1px solid #dcdfe6;
}

.fields-management {
  max-height: 500px;
  overflow-y: auto;
}

.fields-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ebeef5;
}

.fields-header h4 {
  margin: 0;
  color: #303133;
}
</style> 