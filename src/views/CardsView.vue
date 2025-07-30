<template>
  <div class="cards-view">
    <div class="page-header">
      <h2>卡片管理</h2>
      <div class="header-actions">
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

      <!-- 搜索和筛选区域 -->
      <div v-if="ankiStore.isConnected" class="filter-section">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-select v-model="selectedDeck" placeholder="选择牌组" style="width: 100%;">
              <el-option label="全部牌组" value="" />
              <el-option 
                v-for="deck in ankiStore.decks" 
                :key="deck.name" 
                :label="deck.name" 
                :value="deck.name" 
              />
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select v-model="selectedModel" placeholder="选择模板" style="width: 100%;">
              <el-option label="全部模板" value="" />
              <el-option 
                v-for="model in ankiStore.models" 
                :key="model.name" 
                :label="model.name" 
                :value="model.name" 
              />
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select v-model="selectedTag" placeholder="选择标签" style="width: 100%;">
              <el-option label="全部标签" value="" />
              <el-option 
                v-for="tag in ankiStore.tags" 
                :key="tag" 
                :label="tag" 
                :value="tag" 
              />
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-input 
              v-model="searchKeyword" 
              placeholder="搜索卡片内容" 
              style="width: 100%;"
              clearable
            >
              <template #prefix>
                <el-icon><Search /></el-icon>
              </template>
            </el-input>
          </el-col>
        </el-row>
        
        <div class="filter-actions">
          <el-button @click="clearFilters">清空筛选</el-button>
          <el-button type="primary" @click="applyFilters">应用筛选</el-button>
        </div>
      </div>

      <!-- 批量操作工具栏 -->
      <div v-if="selectedCards.length > 0" class="batch-toolbar">
        <el-alert
          title="批量操作"
          :description="`已选择 ${selectedCards.length} 张卡片`"
          type="info"
          show-icon
        >
          <template #default>
            <div class="batch-actions">
              <el-button size="small" @click="batchMoveCards">
                <el-icon><FolderOpened /></el-icon>
                移动到牌组
              </el-button>
              <el-button size="small" @click="batchAddTags">
                <el-icon><PriceTag /></el-icon>
                添加标签
              </el-button>
              <el-button size="small" type="danger" @click="batchDeleteCards">
                <el-icon><Delete /></el-icon>
                批量删除
              </el-button>
              <el-button size="small" @click="clearSelection">
                取消选择
              </el-button>
            </div>
          </template>
        </el-alert>
      </div>

      <!-- 加载状态 -->
      <div v-if="loading" class="loading-container">
        <el-skeleton :rows="5" animated />
      </div>

      <!-- 卡片列表 -->
      <div v-else-if="filteredCards.length > 0" class="cards-list">
        <el-table 
          :data="filteredCards" 
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
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
                  <strong>{{ key }}:</strong> 
                  <span v-if="value.length > 100">{{ value.substring(0, 100) }}...</span>
                  <span v-else>{{ value }}</span>
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
          <el-table-column label="操作" width="200" fixed="right">
            <template #default="{ row }">
              <el-button size="small" @click="viewCard(row)">
                <el-icon><View /></el-icon>
                查看
              </el-button>
              <el-button size="small" type="primary" @click="editCard(row)">
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

        <!-- 分页 -->
        <div class="pagination-container">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 50, 100]"
            :total="totalCards"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>

      <!-- 空状态 -->
      <div v-else class="empty-state">
        <el-empty :description="searchKeyword || selectedDeck ? '未找到匹配的卡片' : '暂无卡片'">
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
      width="700px"
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
            <el-input 
              v-model="createForm.fields[field]" 
              :placeholder="`输入${field}`" 
              type="textarea"
              :rows="3"
            />
          </div>
        </el-form-item>
        <el-form-item label="标签">
          <el-select 
            v-model="createForm.tags" 
            multiple 
            filterable 
            allow-create 
            placeholder="输入标签，用逗号分隔"
            style="width: 100%;"
          >
            <el-option 
              v-for="tag in ankiStore.tags" 
              :key="tag" 
              :label="tag" 
              :value="tag" 
            />
          </el-select>
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
      width="700px"
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
            <el-input 
              v-model="editForm.fields[field]" 
              :placeholder="`输入${field}`" 
              type="textarea"
              :rows="3"
            />
          </div>
        </el-form-item>
        <el-form-item label="标签">
          <el-select 
            v-model="editForm.tags" 
            multiple 
            filterable 
            allow-create 
            placeholder="输入标签，用逗号分隔"
            style="width: 100%;"
          >
            <el-option 
              v-for="tag in ankiStore.tags" 
              :key="tag" 
              :label="tag" 
              :value="tag" 
            />
          </el-select>
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

    <!-- 查看卡片对话框 -->
    <el-dialog
      v-model="showViewDialog"
      title="查看卡片"
      width="800px"
    >
      <div v-if="viewingCard" class="card-detail">
        <div class="card-header">
          <h3>卡片详情</h3>
          <div class="card-meta">
            <el-tag size="small">{{ viewingCard.deckName }}</el-tag>
            <el-tag size="small" type="info">{{ viewingCard.modelName }}</el-tag>
            <span class="card-id">ID: {{ viewingCard.id }}</span>
          </div>
        </div>
        
        <div class="card-fields">
          <h4>字段内容</h4>
          <div v-for="(value, key) in viewingCard.fields" :key="key" class="field-detail">
            <label>{{ key }}:</label>
            <div class="field-content">{{ value }}</div>
          </div>
        </div>

        <div class="card-tags">
          <h4>标签</h4>
          <div class="tags-display">
            <el-tag 
              v-for="tag in viewingCard.tags" 
              :key="tag" 
              size="small"
              style="margin-right: 8px; margin-bottom: 8px;"
            >
              {{ tag }}
            </el-tag>
          </div>
        </div>

        <div class="card-info">
          <h4>卡片信息</h4>
          <p><strong>最后修改:</strong> {{ formatDate(viewingCard.lastModified) }}</p>
        </div>
      </div>
    </el-dialog>

    <!-- 批量移动对话框 -->
    <el-dialog
      v-model="showBatchMoveDialog"
      title="批量移动到牌组"
      width="500px"
    >
      <el-form label-width="100px">
        <el-form-item label="目标牌组">
          <el-select v-model="batchMoveTarget" placeholder="选择目标牌组" style="width: 100%;">
            <el-option 
              v-for="deck in ankiStore.decks" 
              :key="deck.name" 
              :label="deck.name" 
              :value="deck.name" 
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showBatchMoveDialog = false">取消</el-button>
          <el-button type="primary" @click="confirmBatchMove" :loading="batchMoving">
            确认移动
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 批量添加标签对话框 -->
    <el-dialog
      v-model="showBatchTagDialog"
      title="批量添加标签"
      width="500px"
    >
      <el-form label-width="100px">
        <el-form-item label="标签">
          <el-select 
            v-model="batchTagTarget" 
            multiple 
            filterable 
            allow-create 
            placeholder="选择或输入标签"
            style="width: 100%;"
          >
            <el-option 
              v-for="tag in ankiStore.tags" 
              :key="tag" 
              :label="tag" 
              :value="tag" 
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showBatchTagDialog = false">取消</el-button>
          <el-button type="primary" @click="confirmBatchAddTags" :loading="batchTagging">
            确认添加
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
const selectedModel = ref('')
const selectedTag = ref('')
const searchKeyword = ref('')
const showCreateDialog = ref(false)
const showEditDialog = ref(false)
const showViewDialog = ref(false)
const showBatchMoveDialog = ref(false)
const showBatchTagDialog = ref(false)
const creating = ref(false)
const editing = ref(false)
const batchMoving = ref(false)
const batchTagging = ref(false)

// 分页
const currentPage = ref(1)
const pageSize = ref(20)
const totalCards = ref(0)

// 选择
const selectedCards = ref<Note[]>([])

// 表单引用
const createFormRef = ref()
const editFormRef = ref()

// 查看的卡片
const viewingCard = ref<Note | null>(null)

// 批量操作
const batchMoveTarget = ref('')
const batchTagTarget = ref<string[]>([])

// 创建表单
const createForm = reactive({
  deckName: '',
  modelName: '',
  fields: {} as Record<string, string>,
  tags: [] as string[]
})

// 编辑表单
const editForm = reactive({
  id: 0,
  deckName: '',
  modelName: '',
  fields: {} as Record<string, string>,
  tags: [] as string[]
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

const filteredCards = computed(() => {
  let cards = ankiStore.notes

  // 牌组筛选
  if (selectedDeck.value) {
    cards = cards.filter(card => card.deckName === selectedDeck.value)
  }

  // 模板筛选
  if (selectedModel.value) {
    cards = cards.filter(card => card.modelName === selectedModel.value)
  }

  // 标签筛选
  if (selectedTag.value) {
    cards = cards.filter(card => card.tags.includes(selectedTag.value))
  }

  // 关键词搜索
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    cards = cards.filter(card => {
      return Object.values(card.fields).some(value => 
        value.toLowerCase().includes(keyword)
      ) || card.tags.some(tag => 
        tag.toLowerCase().includes(keyword)
      )
    })
  }

  totalCards.value = cards.length
  return cards
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

// 清空筛选
const clearFilters = () => {
  selectedDeck.value = ''
  selectedModel.value = ''
  selectedTag.value = ''
  searchKeyword.value = ''
}

// 应用筛选
const applyFilters = () => {
  currentPage.value = 1
  loadCards()
}

// 处理选择变化
const handleSelectionChange = (selection: Note[]) => {
  selectedCards.value = selection
}

// 清空选择
const clearSelection = () => {
  selectedCards.value = []
}

// 查看卡片
const viewCard = (card: Note) => {
  viewingCard.value = card
  showViewDialog.value = true
}

// 编辑卡片
const editCard = (card: Note) => {
  editForm.id = card.id
  editForm.deckName = card.deckName
  editForm.modelName = card.modelName
  editForm.fields = { ...card.fields }
  editForm.tags = [...card.tags]
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

    await ankiStore.addNote(
      createForm.deckName,
      createForm.modelName,
      createForm.fields,
      createForm.tags
    )
    
    ElMessage.success('卡片创建成功')
    showCreateDialog.value = false
    
    // 重置表单
    createForm.deckName = ''
    createForm.modelName = ''
    createForm.fields = {}
    createForm.tags = []
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

    await ankiStore.updateNote(editForm.id, editForm.fields, editForm.tags)
    
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

// 批量移动卡片
const batchMoveCards = () => {
  if (selectedCards.value.length === 0) {
    ElMessage.warning('请先选择要移动的卡片')
    return
  }
  showBatchMoveDialog.value = true
}

// 确认批量移动
const confirmBatchMove = async () => {
  if (!batchMoveTarget.value) {
    ElMessage.warning('请选择目标牌组')
    return
  }

  batchMoving.value = true
  try {
    // 这里需要实现批量移动逻辑
    ElMessage.success(`成功移动 ${selectedCards.value.length} 张卡片到 ${batchMoveTarget.value}`)
    showBatchMoveDialog.value = false
    selectedCards.value = []
  } catch (error) {
    ElMessage.error('批量移动失败')
  } finally {
    batchMoving.value = false
  }
}

// 批量添加标签
const batchAddTags = () => {
  if (selectedCards.value.length === 0) {
    ElMessage.warning('请先选择要添加标签的卡片')
    return
  }
  showBatchTagDialog.value = true
}

// 确认批量添加标签
const confirmBatchAddTags = async () => {
  if (batchTagTarget.value.length === 0) {
    ElMessage.warning('请选择要添加的标签')
    return
  }

  batchTagging.value = true
  try {
    // 这里需要实现批量添加标签逻辑
    ElMessage.success(`成功为 ${selectedCards.value.length} 张卡片添加标签`)
    showBatchTagDialog.value = false
    selectedCards.value = []
  } catch (error) {
    ElMessage.error('批量添加标签失败')
  } finally {
    batchTagging.value = false
  }
}

// 批量删除卡片
const batchDeleteCards = async () => {
  if (selectedCards.value.length === 0) {
    ElMessage.warning('请先选择要删除的卡片')
    return
  }

  try {
    await ElMessageBox.confirm(
      `确定要删除选中的 ${selectedCards.value.length} 张卡片吗？此操作不可恢复。`,
      '确认删除',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )

    const cardIds = selectedCards.value.map(card => card.id)
    await ankiStore.deleteNotes(cardIds)
    ElMessage.success('批量删除成功')
    selectedCards.value = []
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('批量删除失败')
    }
  }
}

// 分页处理
const handleSizeChange = (size: number) => {
  pageSize.value = size
  currentPage.value = 1
}

const handleCurrentChange = (page: number) => {
  currentPage.value = page
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

.filter-section {
  margin-bottom: 20px;
  padding: 20px;
  background: #f5f7fa;
  border-radius: 4px;
}

.filter-actions {
  margin-top: 15px;
  display: flex;
  gap: 10px;
}

.batch-toolbar {
  margin-bottom: 20px;
}

.batch-actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
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
  margin-bottom: 15px;
}

.field-input label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.card-detail h3 {
  margin: 0 0 15px 0;
  color: #303133;
}

.card-header {
  margin-bottom: 20px;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

.card-id {
  color: #909399;
  font-size: 12px;
}

.card-fields {
  margin-bottom: 20px;
}

.card-fields h4 {
  margin: 0 0 15px 0;
  color: #303133;
}

.field-detail {
  margin-bottom: 15px;
}

.field-detail label {
  font-weight: bold;
  color: #606266;
  display: block;
  margin-bottom: 5px;
}

.field-content {
  background: #f5f7fa;
  padding: 10px;
  border-radius: 4px;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.card-tags {
  margin-bottom: 20px;
}

.card-tags h4 {
  margin: 0 0 15px 0;
  color: #303133;
}

.tags-display {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.card-info {
  margin-bottom: 20px;
}

.card-info h4 {
  margin: 0 0 15px 0;
  color: #303133;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style> 