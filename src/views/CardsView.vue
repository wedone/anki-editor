<template>
  <div class="cards-view">
    <div class="page-header">
      <h2>卡片管理</h2>
      <div class="header-actions">
        <el-select v-model="selectedDeck" placeholder="选择牌组" style="width: 200px; margin-right: 10px;">
          <el-option label="全部牌组" value="" />
          <el-option 
            v-for="deck in ankiStore.decks" 
            :key="deck.name" 
            :label="deck.name" 
            :value="deck.name" 
          />
        </el-select>
        <el-button type="primary" @click="showCreateDialog = true">
          <el-icon><Plus /></el-icon>
          新建卡片
        </el-button>
      </div>
    </div>

    <div class="cards-content">
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
      <div v-if="loading" class="loading-container">
        <el-skeleton :rows="5" animated />
      </div>

      <!-- 卡片列表 -->
      <div v-else-if="ankiStore.notes.length > 0" class="cards-list">
        <el-table :data="ankiStore.notes" style="width: 100%">
          <el-table-column prop="id" label="ID" width="80" />
          <el-table-column prop="deckName" label="牌组" width="150">
            <template #default="{ row }">
              <el-tag size="small">{{ row.deckName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="modelName" label="模板" width="120">
            <template #default="{ row }">
              <el-tag size="small" type="info">{{ row.modelName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="内容" min-width="300">
            <template #default="{ row }">
              <div class="card-content">
                <div v-for="(value, key) in row.fields" :key="key" class="field">
                  <strong>{{ key }}:</strong> {{ value }}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="tags" label="标签" width="150">
            <template #default="{ row }">
              <div class="tags-container">
                <el-tag 
                  v-for="tag in row.tags" 
                  :key="tag" 
                  size="small" 
                  style="margin-right: 4px;"
                >
                  {{ tag }}
                </el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="lastModified" label="最后修改" width="180">
            <template #default="{ row }">
              {{ formatDate(row.lastModified) }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" fixed="right">
            <template #default="{ row }">
              <el-button size="small" @click="editCard(row)">
                <el-icon><Edit /></el-icon>
                编辑
              </el-button>
              <el-button size="small" type="danger" @click="deleteCard(row)">
                <el-icon><Delete /></el-icon>
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 空状态 -->
      <div v-else class="empty-state">
        <el-empty description="暂无卡片">
          <el-button type="primary" @click="showCreateDialog = true">
            创建第一张卡片
          </el-button>
        </el-empty>
      </div>
    </div>

    <!-- 创建卡片对话框 -->
    <el-dialog
      v-model="showCreateDialog"
      title="新建卡片"
      width="600px"
      :close-on-click-modal="false"
    >
      <el-form :model="createForm" :rules="createRules" ref="createFormRef" label-width="100px">
        <el-form-item label="牌组" prop="deckName">
          <el-select v-model="createForm.deckName" placeholder="选择牌组">
            <el-option 
              v-for="deck in ankiStore.decks" 
              :key="deck.name" 
              :label="deck.name" 
              :value="deck.name" 
            />
          </el-select>
        </el-form-item>
        <el-form-item label="模板" prop="modelName">
          <el-select v-model="createForm.modelName" placeholder="选择模板">
            <el-option 
              v-for="model in ankiStore.models" 
              :key="model.name" 
              :label="model.name" 
              :value="model.name" 
            />
          </el-select>
        </el-form-item>
        <el-form-item label="字段">
          <div v-for="field in selectedModelFields" :key="field" class="field-input">
            <label>{{ field }}:</label>
            <el-input v-model="createForm.fields[field]" :placeholder="`输入${field}`" />
          </div>
        </el-form-item>
        <el-form-item label="标签">
          <el-input v-model="createForm.tags" placeholder="输入标签，用逗号分隔" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showCreateDialog = false">取消</el-button>
          <el-button type="primary" @click="handleCreateCard" :loading="creating">
            创建
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 编辑卡片对话框 -->
    <el-dialog
      v-model="showEditDialog"
      title="编辑卡片"
      width="600px"
      :close-on-click-modal="false"
    >
      <el-form :model="editForm" :rules="editRules" ref="editFormRef" label-width="100px">
        <el-form-item label="牌组" prop="deckName">
          <el-select v-model="editForm.deckName" placeholder="选择牌组">
            <el-option 
              v-for="deck in ankiStore.decks" 
              :key="deck.name" 
              :label="deck.name" 
              :value="deck.name" 
            />
          </el-select>
        </el-form-item>
        <el-form-item label="模板" prop="modelName">
          <el-select v-model="editForm.modelName" placeholder="选择模板">
            <el-option 
              v-for="model in ankiStore.models" 
              :key="model.name" 
              :label="model.name" 
              :value="model.name" 
            />
          </el-select>
        </el-form-item>
        <el-form-item label="字段">
          <div v-for="field in selectedEditModelFields" :key="field" class="field-input">
            <label>{{ field }}:</label>
            <el-input v-model="editForm.fields[field]" :placeholder="`输入${field}`" />
          </div>
        </el-form-item>
        <el-form-item label="标签">
          <el-input v-model="editForm.tags" placeholder="输入标签，用逗号分隔" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showEditDialog = false">取消</el-button>
          <el-button type="primary" @click="handleEditCard" :loading="editing">
            保存
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useAnkiStore } from '@/stores/ankiStore'
import type { Note, Model } from '@/api/ankiConnect'

const ankiStore = useAnkiStore()

// 状态
const loading = ref(false)
const selectedDeck = ref('')
const showCreateDialog = ref(false)
const showEditDialog = ref(false)
const creating = ref(false)
const editing = ref(false)

// 表单引用
const createFormRef = ref()
const editFormRef = ref()

// 创建表单
const createForm = reactive({
  deckName: '',
  modelName: '',
  fields: {} as Record<string, string>,
  tags: ''
})

// 编辑表单
const editForm = reactive({
  id: 0,
  deckName: '',
  modelName: '',
  fields: {} as Record<string, string>,
  tags: ''
})

// 表单验证规则
const createRules = {
  deckName: [
    { required: true, message: '请选择牌组', trigger: 'change' }
  ],
  modelName: [
    { required: true, message: '请选择模板', trigger: 'change' }
  ]
}

const editRules = {
  deckName: [
    { required: true, message: '请选择牌组', trigger: 'change' }
  ],
  modelName: [
    { required: true, message: '请选择模板', trigger: 'change' }
  ]
}

// 计算属性
const selectedModelFields = computed(() => {
  const model = ankiStore.models.find(m => m.name === createForm.modelName)
  return model?.fields || []
})

const selectedEditModelFields = computed(() => {
  const model = ankiStore.models.find(m => m.name === editForm.modelName)
  return model?.fields || []
})

// 格式化日期
const formatDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleString('zh-CN')
}

// 加载卡片数据
const loadCards = async () => {
  if (!ankiStore.isConnected) return
  
  loading.value = true
  try {
    await ankiStore.loadNotes(selectedDeck.value || undefined)
  } catch (error) {
    ElMessage.error('加载卡片失败')
  } finally {
    loading.value = false
  }
}

// 监听牌组选择变化
watch(selectedDeck, () => {
  loadCards()
})

// 编辑卡片
const editCard = (card: Note) => {
  editForm.id = card.id
  editForm.deckName = card.deckName
  editForm.modelName = card.modelName
  editForm.fields = { ...card.fields }
  editForm.tags = card.tags.join(', ')
  showEditDialog.value = true
}

// 删除卡片
const deleteCard = async (card: Note) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除这张卡片吗？此操作不可恢复。`,
      '确认删除',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )

    await ankiStore.deleteNotes([card.id])
    ElMessage.success('卡片删除成功')
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('删除卡片失败')
    }
  }
}

// 创建卡片
const handleCreateCard = async () => {
  if (!createFormRef.value) return

  try {
    await createFormRef.value.validate()
    creating.value = true

    const tags = createForm.tags ? createForm.tags.split(',').map(t => t.trim()) : []
    
    await ankiStore.addNote(
      createForm.deckName,
      createForm.modelName,
      createForm.fields,
      tags
    )
    
    ElMessage.success('卡片创建成功')
    showCreateDialog.value = false
    
    // 重置表单
    createForm.deckName = ''
    createForm.modelName = ''
    createForm.fields = {}
    createForm.tags = ''
  } catch (error) {
    if (error !== false) {
      ElMessage.error('创建卡片失败')
    }
  } finally {
    creating.value = false
  }
}

// 编辑卡片
const handleEditCard = async () => {
  if (!editFormRef.value) return

  try {
    await editFormRef.value.validate()
    editing.value = true

    const tags = editForm.tags ? editForm.tags.split(',').map(t => t.trim()) : []
    
    await ankiStore.updateNote(editForm.id, editForm.fields, tags)
    
    ElMessage.success('卡片更新成功')
    showEditDialog.value = false
  } catch (error) {
    if (error !== false) {
      ElMessage.error('更新卡片失败')
    }
  } finally {
    editing.value = false
  }
}

// 页面加载时初始化
onMounted(async () => {
  if (ankiStore.isConnected) {
    await loadCards()
  }
})
</script>

<style scoped>
.cards-view {
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

.cards-content {
  background: #fff;
  border-radius: 4px;
  padding: 20px;
}

.loading-container {
  padding: 20px;
}

.cards-list {
  margin-top: 20px;
}

.card-content {
  max-height: 100px;
  overflow-y: auto;
}

.field {
  margin-bottom: 4px;
  font-size: 12px;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.field-input {
  margin-bottom: 10px;
}

.field-input label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style> 