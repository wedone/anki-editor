<template>
  <div class="card-manager">
    <!-- 筛选栏 -->
    <el-card class="filter-card" shadow="never">
      <template #header>
        <div class="filter-header">
          <span>筛选条件</span>
          <div class="filter-actions">
            <el-button 
              size="small" 
              @click="applyFilters" 
              type="primary"
            >
              <el-icon><Search /></el-icon>
              应用筛选
            </el-button>
            <el-button 
              size="small" 
              @click="clearFilters"
            >
              清除筛选
            </el-button>
            <el-button 
              size="small" 
              @click="refreshData" 
              :loading="isLoading"
              type="success"
            >
              <el-icon><Refresh /></el-icon>
              刷新
            </el-button>
          </div>
        </div>
      </template>
      
      <el-form :model="filters" label-width="80px" size="small">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="筛选类型">
              <el-select 
                v-model="filters.type" 
                placeholder="选择筛选类型" 
                style="width: 100%;"
                @change="onFilterTypeChange"
              >
                <el-option label="全部" value="" />
                <el-option label="按牌组筛选" value="deck" />
                <el-option label="按模板筛选" value="model" />
                <el-option label="按标签筛选" value="tag" />
                <el-option label="按内容搜索" value="search" />
              </el-select>
            </el-form-item>
          </el-col>
          
          <el-col :span="8">
            <el-form-item label="筛选值">
              <!-- 牌组选择 -->
              <el-select 
                v-if="filters.type === 'deck'"
                v-model="filters.value" 
                placeholder="选择牌组" 
                clearable
                style="width: 100%;"
              >
                <el-option 
                  v-for="deck in availableDecks" 
                  :key="deck.name" 
                  :label="deck.name" 
                  :value="deck.name" 
                />
              </el-select>
              
              <!-- 模板选择 -->
              <el-select 
                v-else-if="filters.type === 'model'"
                v-model="filters.value" 
                placeholder="选择模板" 
                clearable
                style="width: 100%;"
              >
                <el-option 
                  v-for="model in availableModels" 
                  :key="model.name" 
                  :label="model.name" 
                  :value="model.name" 
                />
              </el-select>
              
              <!-- 标签选择 -->
              <el-select 
                v-else-if="filters.type === 'tag'"
                v-model="filters.value" 
                placeholder="选择标签" 
                clearable
                style="width: 100%;"
              >
                <el-option 
                  v-for="tag in availableTags" 
                  :key="tag" 
                  :label="tag" 
                  :value="tag" 
                />
              </el-select>
              
              <!-- 内容搜索 -->
              <el-input 
                v-else-if="filters.type === 'search'"
                v-model="filters.value" 
                placeholder="搜索卡片内容" 
                clearable
                style="width: 100%;"
              />
              
              <!-- 默认显示 -->
              <el-input 
                v-else
                v-model="filters.value" 
                placeholder="请先选择筛选类型" 
                disabled
                style="width: 100%;"
              />
            </el-form-item>
          </el-col>
          
          <el-col :span="8">
            <el-form-item label="操作">
              <el-button 
                type="primary" 
                size="small"
                @click="applyFilters" 
                :disabled="!filters.type || !filters.value"
              >
                <el-icon><Search /></el-icon>
                应用筛选
              </el-button>
              <el-button 
                size="small" 
                @click="clearFilters"
              >
                清除
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      
      <div class="filter-result">
        <el-tag type="info">筛选结果: 共 {{ filteredCards.length }} 张卡片</el-tag>
        <el-tag v-if="activeFilters.type && getActiveFilterValue()" type="primary">
          {{ getFilterTypeLabel(activeFilters.type) }}: {{ getActiveFilterValue() }}
        </el-tag>
        <el-tag v-if="isLoading" type="warning" class="loading-tag">
          <el-icon class="is-loading"><Loading /></el-icon>
          加载中...
        </el-tag>
      </div>
    </el-card>

    <!-- 主要内容区域 -->
    <div class="card-manager-content">
      <!-- 左侧卡片列表 -->
      <el-card class="cards-list-card" shadow="never">
        <template #header>
          <div class="panel-header">
            <span>卡片列表</span>
            <el-button size="small" type="primary" @click="createNewCard">
              <el-icon><Plus /></el-icon>
              新建卡片
            </el-button>
          </div>
        </template>
        
        <div class="cards-list">
          <el-empty v-if="filteredCards.length === 0" description="暂无卡片" />
          <div 
            v-else
            v-for="card in filteredCards" 
            :key="card.id"
            class="card-item"
            :class="{ active: selectedCard?.id === card.id }"
            @click="selectCard(card)"
          >
            <div class="card-preview">
              <div class="card-content-preview">
                {{ getCardPreview(card) }}
              </div>
              <div class="card-meta">
                <el-tag size="small" type="info">{{ card.modelName }}</el-tag>
                <span class="card-id">#{{ card.id }}</span>
              </div>
            </div>
          </div>
        </div>
      </el-card>

      <!-- 右侧编辑面板 -->
      <el-card v-if="selectedCard" class="edit-card" shadow="never">
        <template #header>
          <div class="panel-header">
            <span>编辑卡片 #{{ selectedCard.id }}</span>
            <div class="panel-actions">
              <el-button size="small" @click="saveCardChanges" :loading="saving">
                保存
              </el-button>
              <el-button size="small" @click="previewCard">
                预览
              </el-button>
            </div>
          </div>
        </template>

        <el-form :model="editingCard" label-width="80px" size="small">
          <!-- 字段编辑 -->
          <el-form-item label="字段内容">
            <div class="fields-editor">
              <div v-for="(value, field) in editingCard.fields" :key="field" class="field-editor">
                <el-form-item :label="field">
                  <el-input 
                    v-model="editingCard.fields[field]" 
                    type="textarea" 
                    :rows="3"
                    :placeholder="`输入${field}内容`"
                  />
                </el-form-item>
              </div>
            </div>
          </el-form-item>

          <!-- 标签编辑 -->
          <el-form-item label="标签">
            <el-select 
              v-model="editingCard.tags" 
              multiple 
              filterable 
              allow-create 
              placeholder="输入标签"
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

          <!-- 简单预览 -->
          <el-form-item v-if="showPreview" label="卡片预览">
            <el-card class="preview-card" shadow="never">
              <template #header>
                <span>预览</span>
              </template>
              <div class="preview-content">
                <div class="preview-front">
                  <strong>正面:</strong>
                  <div class="preview-text">{{ getPreviewText('front') }}</div>
                </div>
                <div class="preview-back">
                  <strong>背面:</strong>
                  <div class="preview-text">{{ getPreviewText('back') }}</div>
                </div>
              </div>
            </el-card>
          </el-form-item>
        </el-form>
      </el-card>

      <!-- 未选择卡片时的提示 -->
      <el-card v-else class="no-selection-card" shadow="never">
        <el-empty description="请选择一张卡片进行编辑" />
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Refresh, Loading, Search } from '@element-plus/icons-vue'
import { useAnkiStore } from '@/stores/ankiStore'
import type { Note, Model, Deck } from '@/api/ankiConnect'

const props = defineProps<{
  deckName: string
  cards: Note[]
}>()

const emit = defineEmits<{
  'update:cards': [cards: Note[]]
}>()

const ankiStore = useAnkiStore()

// 本地缓存状态
const localCards = ref<Note[]>([])
const isLoading = ref(false)

// 筛选状态
const filters = reactive({
  type: '', // 'deck', 'model', 'tag', 'search'
  value: ''
})

// 实际应用的筛选条件
const activeFilters = reactive({
  type: '', // 'deck', 'model', 'tag', 'search'
  deck: '',
  model: '',
  tag: '',
  search: ''
})

// 编辑状态
const selectedCard = ref<Note | null>(null)
const editingCard = reactive({
  id: 0,
  fields: {} as Record<string, string>,
  tags: [] as string[]
})
const saving = ref(false)
const showPreview = ref(false)

// 计算属性
const availableDecks = computed(() => ankiStore.decks)
const availableModels = computed(() => ankiStore.models)
const availableTags = computed(() => ankiStore.tags)

// 筛选后的卡片列表
const filteredCards = computed(() => {
  let result = localCards.value

  // 根据筛选类型进行筛选
  if (activeFilters.type === 'deck' && activeFilters.deck) {
    result = result.filter(card => card.deckName === activeFilters.deck)
  } else if (activeFilters.type === 'model' && activeFilters.model) {
    result = result.filter(card => card.modelName === activeFilters.model)
  } else if (activeFilters.type === 'tag' && activeFilters.tag) {
    result = result.filter(card => card.tags.includes(activeFilters.tag))
  } else if (activeFilters.type === 'search' && activeFilters.search) {
    const searchText = activeFilters.search.toLowerCase()
    result = result.filter(card => {
      return Object.values(card.fields).some(field => 
        field.toLowerCase().includes(searchText)
      )
    })
  }

  return result
})

// 本地存储相关方法
const CACHE_KEY = 'anki_cards_cache'
const CACHE_TIMESTAMP_KEY = 'anki_cards_cache_timestamp'
const CACHE_DURATION = 5 * 60 * 1000 // 5分钟缓存

const saveToLocalStorage = (cards: Note[]) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cards))
    localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString())
  } catch (error) {
    console.error('保存到本地存储失败:', error)
  }
}

const loadFromLocalStorage = (): Note[] | null => {
  try {
    const cached = localStorage.getItem(CACHE_KEY)
    const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY)
    
    if (!cached || !timestamp) return null
    
    const cacheTime = parseInt(timestamp)
    const now = Date.now()
    
    // 检查缓存是否过期
    if (now - cacheTime > CACHE_DURATION) {
      localStorage.removeItem(CACHE_KEY)
      localStorage.removeItem(CACHE_TIMESTAMP_KEY)
      return null
    }
    
    return JSON.parse(cached)
  } catch (error) {
    console.error('从本地存储加载失败:', error)
    return null
  }
}

const clearLocalCache = () => {
  try {
    localStorage.removeItem(CACHE_KEY)
    localStorage.removeItem(CACHE_TIMESTAMP_KEY)
  } catch (error) {
    console.error('清除本地缓存失败:', error)
  }
}

// 初始化数据
const initializeData = async () => {
  isLoading.value = true
  
  try {
    // 先尝试从本地加载
    const cachedCards = loadFromLocalStorage()
    
    if (cachedCards && cachedCards.length > 0) {
      localCards.value = cachedCards
      ElMessage.success(`从本地缓存加载了 ${cachedCards.length} 张卡片`)
    } else {
      // 本地没有缓存，从API加载
      await loadCardsFromAPI()
    }
  } catch (error) {
    ElMessage.error('加载卡片数据失败')
    console.error('加载卡片数据失败:', error)
  } finally {
    isLoading.value = false
  }
}

// 从API加载数据
const loadCardsFromAPI = async () => {
  try {
    // 加载所有必要的数据
    await Promise.all([
      ankiStore.loadDecks(),
      ankiStore.loadModels(),
      ankiStore.loadTags()
    ])
    
    // 加载所有卡片
    const allCards: Note[] = []
    
    // 遍历所有牌组加载卡片
    for (const deck of ankiStore.decks) {
      try {
        await ankiStore.loadNotes(deck.name)
        const deckCards = ankiStore.notes.filter(note => note.deckName === deck.name)
        allCards.push(...deckCards)
      } catch (error) {
        console.error(`加载牌组 ${deck.name} 的卡片失败:`, error)
      }
    }
    
    localCards.value = allCards
    saveToLocalStorage(allCards)
    
    ElMessage.success(`成功加载 ${allCards.length} 张卡片`)
  } catch (error) {
    throw error
  }
}

// 刷新数据
const refreshData = async () => {
  clearLocalCache()
  await loadCardsFromAPI()
}

// 获取卡片预览内容
const getCardPreview = (card: Note) => {
  const fields = Object.values(card.fields)
  if (fields.length === 0) return '无内容'
  
  const firstField = fields[0]
  if (!firstField || firstField.trim() === '') return '无内容'
  
  // 只显示前50个字符，超过则显示省略号
  const preview = firstField.trim()
  return preview.length > 50 ? preview.substring(0, 50) + '...' : preview
}

// 选择卡片
const selectCard = (card: Note) => {
  if (selectedCard.value?.id === card.id) return
  
  selectedCard.value = card
  editingCard.id = card.id
  editingCard.fields = { ...card.fields }
  editingCard.tags = [...card.tags]
  showPreview.value = false
}

// 应用筛选
const applyFilters = () => {
  activeFilters.type = filters.type
  // 根据筛选类型设置对应的值
  if (filters.type === 'deck') {
    activeFilters.deck = filters.value
  } else if (filters.type === 'model') {
    activeFilters.model = filters.value
  } else if (filters.type === 'tag') {
    activeFilters.tag = filters.value
  } else if (filters.type === 'search') {
    activeFilters.search = filters.value
  }
  ElMessage.success('筛选条件已应用')
}

// 清除筛选
const clearFilters = () => {
  filters.type = ''
  filters.value = ''
  activeFilters.type = ''
  activeFilters.deck = ''
  activeFilters.model = ''
  activeFilters.tag = ''
  activeFilters.search = ''
  ElMessage.success('筛选条件已清除')
}

// 预览卡片
const previewCard = () => {
  if (!selectedCard.value) {
    ElMessage.warning('请先选择一张卡片')
    return
  }
  showPreview.value = !showPreview.value
}

// 获取预览文本
const getPreviewText = (side: 'front' | 'back') => {
  if (!selectedCard.value) return ''
  
  const model = ankiStore.models.find(m => m.name === selectedCard.value!.modelName)
  if (!model || !model.templates[0]) return ''
  
  let template = side === 'front' ? model.templates[0].front : model.templates[0].back
  
  // 简单的字段替换
  Object.entries(editingCard.fields).forEach(([field, value]) => {
    const placeholder = `{{${field}}}`
    template = template.replace(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), value || '')
  })
  
  return template
}

// 保存卡片更改
const saveCardChanges = async () => {
  if (!selectedCard.value) return
  if (!ankiStore.isConnected) {
    ElMessage.error('未连接到 Anki，无法保存卡片')
    return
  }

  try {
    saving.value = true
    await ankiStore.updateNote(selectedCard.value.id, editingCard.fields, editingCard.tags)
    ElMessage.success('卡片保存成功')
    
    // 更新本地卡片数据
    const updatedCards = localCards.value.map(card => 
      card.id === selectedCard.value!.id 
        ? { ...card, fields: { ...editingCard.fields }, tags: [...editingCard.tags] }
        : card
    )
    localCards.value = updatedCards
    saveToLocalStorage(updatedCards)
    emit('update:cards', updatedCards)
  } catch (error) {
    ElMessage.error('保存卡片失败')
  } finally {
    saving.value = false
  }
}

// 创建新卡片
const createNewCard = () => {
  selectedCard.value = null
  editingCard.id = 0
  editingCard.fields = {}
  editingCard.tags = []
  showPreview.value = false
}

// 筛选类型变化时触发
const onFilterTypeChange = () => {
  // 当筛选类型改变时，清除筛选值
  filters.value = ''
}

// 获取筛选类型标签
const getFilterTypeLabel = (type: string) => {
  switch (type) {
    case 'deck':
      return '牌组'
    case 'model':
      return '模板'
    case 'tag':
      return '标签'
    case 'search':
      return '内容搜索'
    default:
      return '全部'
  }
}

// 获取当前筛选值
const getActiveFilterValue = () => {
  switch (activeFilters.type) {
    case 'deck':
      return activeFilters.deck
    case 'model':
      return activeFilters.model
    case 'tag':
      return activeFilters.tag
    case 'search':
      return activeFilters.search
    default:
      return ''
  }
}

// 组件挂载时初始化数据
onMounted(() => {
  initializeData()
})
</script>

<style scoped>
.card-manager {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card-manager-content {
  display: flex;
  flex: 1;
  gap: 15px;
  min-height: 500px;
}

.cards-list-card,
.edit-card,
.no-selection-card {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.panel-actions {
  display: flex;
  gap: 8px;
}

.cards-list {
  flex: 1;
  overflow-y: auto;
}

.card-item {
  padding: 12px;
  border: 1px solid #ebeef5;
  border-radius: 6px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #fff;
}

.card-item:hover {
  background-color: #f5f7fa;
  border-color: #c0c4cc;
}

.card-item.active {
  border-color: #409eff;
  background-color: #ecf5ff;
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.2);
}

.card-preview {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card-content-preview {
  font-size: 14px;
  color: #606266;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-word;
  max-height: 2.8em;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #909399;
}

.card-id {
  font-weight: bold;
  color: #409eff;
}

.fields-editor {
  margin-bottom: 15px;
}

.field-editor {
  margin-bottom: 15px;
}

.preview-card {
  margin-top: 10px;
}

.preview-content {
  background: #f9f9f9;
  border-radius: 6px;
  padding: 15px;
}

.preview-front,
.preview-back {
  margin-bottom: 15px;
}

.preview-front strong,
.preview-back strong {
  color: #303133;
  font-size: 14px;
}

.preview-text {
  margin-top: 8px;
  padding: 10px;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  font-size: 14px;
  line-height: 1.5;
  color: #606266;
  min-height: 40px;
}

.filter-result {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 15px;
  padding: 10px;
  background: #f5f7fa;
  border-radius: 4px;
}

.loading-tag {
  margin-left: auto;
}

.filter-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filter-header span {
  font-weight: 600;
  color: #303133;
}
</style> 