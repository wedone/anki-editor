<template>
  <div class="templates-view">
    <div class="page-header">
      <h2>模板管理</h2>
      <el-button type="primary" @click="showCreateDialog = true">
        <el-icon><Plus /></el-icon>
        新建模板
      </el-button>
    </div>

    <div class="templates-content">
      <!-- 连接状态提示 -->
      <el-alert
        v-if="!ankiStore.isConnected"
        title="未连接到 Anki"
        description="请先在设置中配置 AnkiConnect 连接"
        type="warning"
        show-icon
        style="margin-bottom: 20px;"
      />

      <!-- 加载状态 -->
      <div v-if="ankiStore.isLoading" class="loading-container">
        <el-skeleton :rows="5" animated />
      </div>

      <!-- 模板列表 -->
      <div v-else-if="ankiStore.models.length > 0" class="templates-list">
        <el-table :data="ankiStore.models" style="width: 100%">
          <el-table-column prop="name" label="模板名称" min-width="200">
            <template #default="{ row }">
              <div class="template-name">
                <el-icon><Files /></el-icon>
                <span>{{ row.name }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="字段" min-width="300">
            <template #default="{ row }">
              <div class="fields-container">
                <el-tag 
                  v-for="field in row.fields" 
                  :key="field" 
                  size="small" 
                  style="margin-right: 4px; margin-bottom: 4px;"
                >
                  {{ field }}
                </el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="templates" label="卡片模板" width="120">
            <template #default="{ row }">
              <el-tag size="small" type="info">{{ row.templates.length }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200" fixed="right">
            <template #default="{ row }">
              <el-button size="small" @click="viewTemplate(row)">
                <el-icon><View /></el-icon>
                查看
              </el-button>
              <el-button size="small" type="primary" @click="editTemplate(row)">
                <el-icon><Edit /></el-icon>
                编辑
              </el-button>
              <el-button size="small" type="danger" @click="deleteTemplate(row)">
                <el-icon><Delete /></el-icon>
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 空状态 -->
      <div v-else class="empty-state">
        <el-empty description="暂无模板">
          <el-button type="primary" @click="showCreateDialog = true">
            创建第一个模板
          </el-button>
        </el-empty>
      </div>
    </div>

    <!-- 创建模板对话框 -->
    <el-dialog
      v-model="showCreateDialog"
      title="新建模板"
      width="700px"
      :close-on-click-modal="false"
    >
      <el-form :model="createForm" :rules="createRules" ref="createFormRef" label-width="100px">
        <el-form-item label="模板名称" prop="name">
          <el-input v-model="createForm.name" placeholder="请输入模板名称" />
        </el-form-item>
        <el-form-item label="字段">
          <div class="fields-editor">
            <div v-for="(field, index) in createForm.fields" :key="index" class="field-item">
              <el-input v-model="createForm.fields[index]" placeholder="字段名称" />
              <el-button type="danger" size="small" @click="removeField(index)">
                <el-icon><Delete /></el-icon>
              </el-button>
            </div>
            <el-button type="primary" size="small" @click="addField">
              <el-icon><Plus /></el-icon>
              添加字段
            </el-button>
          </div>
        </el-form-item>
        <el-form-item label="卡片模板">
          <div class="templates-editor">
            <div v-for="(template, index) in createForm.templates" :key="index" class="template-item">
              <div class="template-header">
                <span>模板 {{ index + 1 }}</span>
                <el-button type="danger" size="small" @click="removeTemplate(index)">
                  <el-icon><Delete /></el-icon>
                </el-button>
              </div>
              <el-input 
                v-model="createForm.templates[index]" 
                type="textarea" 
                :rows="4"
                placeholder="输入模板内容，使用 {{字段名}} 引用字段"
              />
            </div>
            <el-button type="primary" size="small" @click="addTemplate">
              <el-icon><Plus /></el-icon>
              添加模板
            </el-button>
          </div>
        </el-form-item>
        <el-form-item label="CSS 样式">
          <el-input 
            v-model="createForm.css" 
            type="textarea" 
            :rows="6"
            placeholder="输入 CSS 样式（可选）"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showCreateDialog = false">取消</el-button>
          <el-button type="primary" @click="handleCreateTemplate" :loading="creating">
            创建
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 编辑模板对话框 -->
    <el-dialog
      v-model="showEditDialog"
      title="编辑模板"
      width="700px"
      :close-on-click-modal="false"
    >
      <el-form :model="editForm" :rules="editRules" ref="editFormRef" label-width="100px">
        <el-form-item label="模板名称" prop="name">
          <el-input v-model="editForm.name" placeholder="请输入模板名称" />
        </el-form-item>
        <el-form-item label="字段">
          <div class="fields-editor">
            <div v-for="(field, index) in editForm.fields" :key="index" class="field-item">
              <el-input v-model="editForm.fields[index]" placeholder="字段名称" />
              <el-button type="danger" size="small" @click="removeEditField(index)">
                <el-icon><Delete /></el-icon>
              </el-button>
            </div>
            <el-button type="primary" size="small" @click="addEditField">
              <el-icon><Plus /></el-icon>
              添加字段
            </el-button>
          </div>
        </el-form-item>
        <el-form-item label="卡片模板">
          <div class="templates-editor">
            <div v-for="(template, index) in editForm.templates" :key="index" class="template-item">
              <div class="template-header">
                <span>模板 {{ index + 1 }}</span>
                <el-button type="danger" size="small" @click="removeEditTemplate(index)">
                  <el-icon><Delete /></el-icon>
                </el-button>
              </div>
              <el-input 
                v-model="editForm.templates[index]" 
                type="textarea" 
                :rows="4"
                placeholder="输入模板内容，使用 {{字段名}} 引用字段"
              />
            </div>
            <el-button type="primary" size="small" @click="addEditTemplate">
              <el-icon><Plus /></el-icon>
              添加模板
            </el-button>
          </div>
        </el-form-item>
        <el-form-item label="CSS 样式">
          <el-input 
            v-model="editForm.css" 
            type="textarea" 
            :rows="6"
            placeholder="输入 CSS 样式（可选）"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showEditDialog = false">取消</el-button>
          <el-button type="primary" @click="handleEditTemplate" :loading="editing">
            保存
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 查看模板对话框 -->
    <el-dialog
      v-model="showViewDialog"
      title="查看模板"
      width="800px"
    >
      <div v-if="viewingTemplate" class="template-detail">
        <h3>{{ viewingTemplate.name }}</h3>
        
        <div class="detail-section">
          <h4>字段</h4>
          <div class="fields-display">
            <el-tag 
              v-for="field in viewingTemplate.fields" 
              :key="field" 
              size="small" 
              style="margin-right: 8px; margin-bottom: 8px;"
            >
              {{ field }}
            </el-tag>
          </div>
        </div>

        <div class="detail-section">
          <h4>卡片模板</h4>
          <div v-for="(template, index) in viewingTemplate.templates" :key="index" class="template-display">
            <h5>模板 {{ index + 1 }}</h5>
            <pre>{{ template }}</pre>
          </div>
        </div>

        <div v-if="viewingTemplate.css" class="detail-section">
          <h4>CSS 样式</h4>
          <pre>{{ viewingTemplate.css }}</pre>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useAnkiStore } from '@/stores/ankiStore'
import type { Model } from '@/api/ankiConnect'

const ankiStore = useAnkiStore()

// 对话框状态
const showCreateDialog = ref(false)
const showEditDialog = ref(false)
const showViewDialog = ref(false)

// 加载状态
const creating = ref(false)
const editing = ref(false)

// 表单引用
const createFormRef = ref()
const editFormRef = ref()

// 查看的模板
const viewingTemplate = ref<Model | null>(null)

// 创建表单
const createForm = reactive({
  name: '',
  fields: [''] as string[],
  templates: [''] as string[],
  css: ''
})

// 编辑表单
const editForm = reactive({
  name: '',
  fields: [''] as string[],
  templates: [''] as string[],
  css: ''
})

// 表单验证规则
const createRules = {
  name: [
    { required: true, message: '请输入模板名称', trigger: 'blur' },
    { min: 1, max: 50, message: '模板名称长度在 1 到 50 个字符', trigger: 'blur' }
  ]
}

const editRules = {
  name: [
    { required: true, message: '请输入模板名称', trigger: 'blur' },
    { min: 1, max: 50, message: '模板名称长度在 1 到 50 个字符', trigger: 'blur' }
  ]
}

// 添加字段
const addField = () => {
  createForm.fields.push('')
}

// 删除字段
const removeField = (index: number) => {
  createForm.fields.splice(index, 1)
}

// 添加模板
const addTemplate = () => {
  createForm.templates.push('')
}

// 删除模板
const removeTemplate = (index: number) => {
  createForm.templates.splice(index, 1)
}

// 编辑表单的字段操作
const addEditField = () => {
  editForm.fields.push('')
}

const removeEditField = (index: number) => {
  editForm.fields.splice(index, 1)
}

const addEditTemplate = () => {
  editForm.templates.push('')
}

const removeEditTemplate = (index: number) => {
  editForm.templates.splice(index, 1)
}

// 查看模板
const viewTemplate = (template: Model) => {
  viewingTemplate.value = template
  showViewDialog.value = true
}

// 编辑模板
const editTemplate = (template: Model) => {
  editForm.name = template.name
  editForm.fields = [...template.fields]
  editForm.templates = template.templates.map((t: any) => t.qfmt || t)
  editForm.css = template.css
  showEditDialog.value = true
}

// 删除模板
const deleteTemplate = async (template: Model) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除模板 "${template.name}" 吗？此操作不可恢复。`,
      '确认删除',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )

    // Anki 不支持直接删除模板，这里显示提示
    ElMessage.info('Anki 不支持直接删除模板，请手动在 Anki 中删除')
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('删除模板失败')
    }
  }
}

// 创建模板
const handleCreateTemplate = async () => {
  if (!createFormRef.value) return

  try {
    await createFormRef.value.validate()
    creating.value = true

    // 过滤空字段
    const fields = createForm.fields.filter(f => f.trim())
    const templates = createForm.templates.filter(t => t.trim())
    
    if (fields.length === 0) {
      ElMessage.error('请至少添加一个字段')
      return
    }

    if (templates.length === 0) {
      ElMessage.error('请至少添加一个卡片模板')
      return
    }

    // 构建模板数据
    const cardTemplates = templates.map(template => ({
      qfmt: template,
      afmt: template
    }))

    await ankiStore.createModel(createForm.name, fields, cardTemplates, createForm.css)
    
    ElMessage.success('模板创建成功')
    showCreateDialog.value = false
    
    // 重置表单
    createForm.name = ''
    createForm.fields = ['']
    createForm.templates = ['']
    createForm.css = ''
  } catch (error) {
    if (error !== false) {
      ElMessage.error('创建模板失败')
    }
  } finally {
    creating.value = false
  }
}

// 编辑模板
const handleEditTemplate = async () => {
  if (!editFormRef.value) return

  try {
    await editFormRef.value.validate()
    editing.value = true

    // Anki 不支持直接编辑模板，这里显示提示
    ElMessage.info('Anki 不支持直接编辑模板，请删除后重新创建')
    showEditDialog.value = false
  } catch (error) {
    if (error !== false) {
      ElMessage.error('编辑模板失败')
    }
  } finally {
    editing.value = false
  }
}

// 页面加载时刷新数据
onMounted(async () => {
  if (ankiStore.isConnected) {
    await ankiStore.loadModels()
  }
})
</script>

<style scoped>
.templates-view {
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

.templates-content {
  background: #fff;
  border-radius: 4px;
  padding: 20px;
}

.loading-container {
  padding: 20px;
}

.templates-list {
  margin-top: 20px;
}

.template-name {
  display: flex;
  align-items: center;
  gap: 8px;
}

.fields-container {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.fields-editor {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 10px;
}

.field-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.field-item .el-input {
  flex: 1;
}

.templates-editor {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 10px;
}

.template-item {
  margin-bottom: 15px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  padding: 10px;
}

.template-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.template-header span {
  font-weight: bold;
  color: #303133;
}

.template-detail h3 {
  margin: 0 0 20px 0;
  color: #303133;
}

.detail-section {
  margin-bottom: 20px;
}

.detail-section h4 {
  margin: 0 0 10px 0;
  color: #303133;
  font-size: 16px;
}

.fields-display {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.template-display {
  margin-bottom: 15px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  padding: 10px;
}

.template-display h5 {
  margin: 0 0 10px 0;
  color: #303133;
}

.template-display pre {
  background: #f5f7fa;
  padding: 10px;
  border-radius: 4px;
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style> 