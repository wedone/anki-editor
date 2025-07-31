<template>
  <div class="cards-browse">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>卡片浏览</span>
          <div class="header-actions">
            <el-select
              v-model="selectedDeck"
              placeholder="选择牌组"
              style="width: 200px; margin-right: 10px;"
              clearable
            >
              <el-option
                v-for="deck in ankiStore.decks"
                :key="deck.name"
                :label="deck.name"
                :value="deck.name"
              />
            </el-select>
            <el-select
              v-model="selectedModel"
              placeholder="选择笔记类型"
              style="width: 150px; margin-right: 10px;"
              clearable
            >
              <el-option
                v-for="model in ankiStore.models"
                :key="model.name"
                :label="model.name"
                :value="model.name"
              />
            </el-select>
            <el-input
              v-model="searchQuery"
              placeholder="搜索卡片内容..."
              style="width: 200px; margin-right: 10px;"
              clearable
            >
              <template #prefix>
                <el-icon><Search /></el-icon>
              </template>
            </el-input>
            <el-button type="primary" @click="applyFilters" :loading="loading">
              应用筛选
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

      <!-- 筛选条件显示 -->
      <div v-if="hasActiveFilters" class="filter-tags" style="margin-bottom: 20px;">
        <el-tag
          v-if="selectedDeck"
          closable
          @close="selectedDeck = ''"
          style="margin-right: 8px;"
        >
          牌组: {{ selectedDeck }}
        </el-tag>
        <el-tag
          v-if="selectedModel"
          closable
          @close="selectedModel = ''"
          style="margin-right: 8px;"
        >
          笔记类型: {{ selectedModel }}
        </el-tag>
        <el-tag
          v-if="searchQuery"
          closable
          @close="searchQuery = ''"
          style="margin-right: 8px;"
        >
          搜索: {{ searchQuery }}
        </el-tag>
        <el-button type="link" @click="clearFilters" size="small">
          清除所有筛选
        </el-button>
      </div>

      <!-- 卡片表格 -->
      <el-table
        :data="filteredCards"
        style="width: 100%"
        v-loading="loading"
        empty-text="暂无卡片数据"
        height="500"
      >
        <el-table-column prop="id" label="卡片ID" width="120" align="center">
          <template #default="{ row }">
            <el-tag size="small">{{ row.id }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="deck" label="牌组" width="150">
          <template #default="{ row }">
            {{ row.deck }}
          </template>
        </el-table-column>
        <el-table-column prop="model" label="笔记类型" width="120">
          <template #default="{ row }">
            {{ row.model }}
          </template>
        </el-table-column>
        <el-table-column prop="front" label="正面内容" min-width="200">
          <template #default="{ row }">
            <div class="card-content" v-html="row.front"></div>
          </template>
        </el-table-column>
        <el-table-column prop="back" label="背面内容" min-width="200">
          <template #default="{ row }">
            <div class="card-content" v-html="row.back"></div>
          </template>
        </el-table-column>
        <el-table-column prop="tags" label="标签" width="150">
          <template #default="{ row }">
            <el-tag
              v-for="tag in row.tags"
              :key="tag"
              size="small"
              style="margin-right: 4px; margin-bottom: 4px;"
            >
              {{ tag }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template #default="{ row }">
            <el-button type="link" size="small" @click="editCard(row)">
              编辑
            </el-button>
            <el-button type="link" size="small" @click="previewCard(row)">
              预览
            </el-button>
            <el-button 
              type="link" 
              size="small" 
              @click="deleteCard(row)" 
              style="color: #f56c6c;"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container" style="margin-top: 20px; text-align: center;">
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
    </el-card>

    <!-- 卡片预览对话框 -->
    <el-dialog
      v-model="previewDialogVisible"
      title="卡片预览"
      width="800px"
    >
      <div class="card-preview">
        <div class="preview-section">
          <h4>正面</h4>
          <div class="preview-content" v-html="previewCardData.front"></div>
        </div>
        <div class="preview-section">
          <h4>背面</h4>
          <div class="preview-content" v-html="previewCardData.back"></div>
        </div>
        <div class="preview-section">
          <h4>标签</h4>
          <div class="preview-tags">
            <el-tag
              v-for="tag in previewCardData.tags"
              :key="tag"
              size="small"
              style="margin-right: 8px; margin-bottom: 8px;"
            >
              {{ tag }}
            </el-tag>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useAnkiStore } from '../stores/ankiStore.js'
import { Search } from '@element-plus/icons-vue'

const ankiStore = useAnkiStore()

// 响应式数据
const loading = ref(false)
const selectedDeck = ref('')
const selectedModel = ref('')
const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = ref(20)
const totalCards = ref(0)
const previewDialogVisible = ref(false)
const previewCardData = ref({})

// 使用真实数据
const cards = computed(() => {
  return ankiStore.cards.map(card => ({
    id: card.id,
    deck: card.deck,
    model: card.model,
    front: card.fields?.Front || '无内容',
    back: card.fields?.Back || '无内容',
    tags: card.tags || []
  }))
})

// 计算属性
const hasActiveFilters = computed(() => {
  return selectedDeck.value || selectedModel.value || searchQuery.value
})

const filteredCards = computed(() => {
  let filtered = cards.value

  if (selectedDeck.value) {
    filtered = filtered.filter(card => card.deck === selectedDeck.value)
  }

  if (selectedModel.value) {
    filtered = filtered.filter(card => card.model === selectedModel.value)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(card => 
      card.front.toLowerCase().includes(query) ||
      card.back.toLowerCase().includes(query)
    )
  }

  return filtered
})

// 方法
const applyFilters = async () => {
  loading.value = true
  try {
    // 重新加载卡片数据
    await ankiStore.loadCards()
    totalCards.value = filteredCards.value.length
    currentPage.value = 1
    ElMessage.success('筛选应用成功！')
  } catch (error) {
    ElMessage.error(`筛选失败: ${error.message}`)
  } finally {
    loading.value = false
  }
}

const clearFilters = () => {
  selectedDeck.value = ''
  selectedModel.value = ''
  searchQuery.value = ''
  currentPage.value = 1
}

const editCard = (card) => {
  ElMessage.info(`编辑卡片: ${card.id}`)
}

const previewCard = (card) => {
  previewCardData.value = { ...card }
  previewDialogVisible.value = true
}

const deleteCard = async (card) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除卡片 "${card.front}" 吗？此操作不可恢复。`,
      '确认删除',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
    
    // 删除笔记（卡片是基于笔记的）
    await ankiStore.deleteNotes([card.id])
    ElMessage.success('卡片删除成功！')
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(`删除失败: ${error.message}`)
    }
  }
}

const handleSizeChange = (val) => {
  pageSize.value = val
  currentPage.value = 1
}

const handleCurrentChange = (val) => {
  currentPage.value = val
}

// 生命周期
onMounted(async () => {
  loading.value = true
  try {
    // 如果已连接，加载数据
    if (ankiStore.isConnected) {
      await ankiStore.loadCards()
      await ankiStore.loadModels()
      await ankiStore.loadDecks()
    }
    totalCards.value = cards.value.length
  } catch (error) {
    console.error('加载数据失败:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.cards-browse {
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

.filter-tags {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.card-content {
  max-height: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.pagination-container {
  margin-top: 20px;
}

.card-preview {
  max-height: 500px;
  overflow-y: auto;
}

.preview-section {
  margin-bottom: 20px;
}

.preview-section h4 {
  margin-bottom: 10px;
  color: #606266;
  font-size: 14px;
}

.preview-content {
  padding: 10px;
  background-color: #f5f7fa;
  border-radius: 4px;
  min-height: 40px;
}

.preview-tags {
  display: flex;
  flex-wrap: wrap;
}
</style> 