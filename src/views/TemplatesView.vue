<template>
  <div class="templates-view">
    <div class="page-header">
      <h2>模板管理</h2>
      <div class="header-actions">
        <el-button type="primary" @click="createTemplate">
          <el-icon><Plus /></el-icon>
          新建模板
        </el-button>
      </div>
    </div>

    <div class="templates-content">
      <el-table :data="templates" style="width: 100%">
        <el-table-column prop="name" label="模板名称" />
        <el-table-column prop="type" label="类型" width="120" />
        <el-table-column prop="fields" label="字段" width="200" />
        <el-table-column prop="cardCount" label="使用次数" width="120" />
        <el-table-column prop="createdTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button size="small" @click="editTemplate(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="deleteTemplate(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 新建模板对话框 -->
    <el-dialog v-model="createDialogVisible" title="新建模板" width="600px">
      <el-form :model="newTemplate" label-width="80px">
        <el-form-item label="模板名称">
          <el-input v-model="newTemplate.name" placeholder="请输入模板名称" />
        </el-form-item>
        <el-form-item label="模板类型">
          <el-select v-model="newTemplate.type" placeholder="选择模板类型">
            <el-option label="基础" value="基础" />
            <el-option label="填空题" value="填空题" />
            <el-option label="选择题" value="选择题" />
            <el-option label="反向" value="反向" />
          </el-select>
        </el-form-item>
        <el-form-item label="字段配置">
          <div class="fields-config">
            <div v-for="(field, index) in newTemplate.fields" :key="index" class="field-item">
              <el-input v-model="field.name" placeholder="字段名称" style="width: 150px" />
              <el-select v-model="field.type" placeholder="字段类型" style="width: 120px">
                <el-option label="文本" value="text" />
                <el-option label="富文本" value="rich" />
                <el-option label="图片" value="image" />
              </el-select>
              <el-button size="small" type="danger" @click="removeField(index)">删除</el-button>
            </div>
            <el-button size="small" @click="addField">添加字段</el-button>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="createDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmCreateTemplate">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// 模板数据
const templates = ref([
  {
    id: '1',
    name: '基础模板',
    type: '基础',
    fields: '正面,背面',
    cardCount: 150,
    createdTime: '2024-01-01 10:00:00'
  },
  {
    id: '2',
    name: '填空题模板',
    type: '填空题',
    fields: '问题,答案,提示',
    cardCount: 89,
    createdTime: '2024-01-10 09:00:00'
  },
  {
    id: '3',
    name: '选择题模板',
    type: '选择题',
    fields: '问题,选项A,选项B,选项C,选项D,正确答案',
    cardCount: 67,
    createdTime: '2024-01-12 11:00:00'
  }
])

// 新建模板对话框
const createDialogVisible = ref(false)
const newTemplate = reactive({
  name: '',
  type: '',
  fields: [
    { name: '', type: 'text' }
  ]
})

const createTemplate = () => {
  createDialogVisible.value = true
  newTemplate.name = ''
  newTemplate.type = ''
  newTemplate.fields = [{ name: '', type: 'text' }]
}

const addField = () => {
  newTemplate.fields.push({ name: '', type: 'text' })
}

const removeField = (index: number) => {
  if (newTemplate.fields.length > 1) {
    newTemplate.fields.splice(index, 1)
  }
}

const confirmCreateTemplate = () => {
  if (!newTemplate.name.trim()) {
    ElMessage.warning('请输入模板名称')
    return
  }
  
  if (!newTemplate.type) {
    ElMessage.warning('请选择模板类型')
    return
  }
  
  const fieldNames = newTemplate.fields
    .filter(field => field.name.trim())
    .map(field => field.name)
    .join(',')
  
  if (!fieldNames) {
    ElMessage.warning('请至少配置一个字段')
    return
  }
  
  // 这里将来会调用 AnkiConnect API
  templates.value.push({
    id: Date.now().toString(),
    name: newTemplate.name,
    type: newTemplate.type,
    fields: fieldNames,
    cardCount: 0,
    createdTime: new Date().toLocaleString()
  })
  
  createDialogVisible.value = false
  ElMessage.success('模板创建成功')
}

const editTemplate = (template: any) => {
  ElMessage.info(`编辑模板: ${template.name}`)
}

const deleteTemplate = async (template: any) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除模板 "${template.name}" 吗？`,
      '确认删除',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    
    const index = templates.value.findIndex(t => t.id === template.id)
    if (index > -1) {
      templates.value.splice(index, 1)
      ElMessage.success('模板删除成功')
    }
  } catch {
    // 用户取消删除
  }
}
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

.header-actions {
  display: flex;
  gap: 10px;
}

.templates-content {
  background: #fff;
  border-radius: 4px;
  padding: 20px;
}

.fields-config {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 15px;
  background: #f5f7fa;
}

.field-item {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  align-items: center;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style> 