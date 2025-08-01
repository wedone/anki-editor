<template>
  <div class="card-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <el-icon><Document /></el-icon>
          <span>卡片列表 - {{ currentDeck?.name }}</span>
        </div>
      </template>
      
      <!-- 搜索和操作栏 -->
      <div class="search-bar">
        <el-row :gutter="16">
          <el-col :span="8">
            <el-input
              v-model="searchQuery"
              placeholder="搜索卡片内容..."
              clearable
              @input="handleSearch"
            >
              <template #prefix>
                <el-icon><Search /></el-icon>
              </template>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button 
              type="primary" 
              @click="loadCards"
              :loading="loading"
            >
              <el-icon><Refresh /></el-icon>
              刷新
            </el-button>
          </el-col>
        </el-row>
      </div>
      
      <!-- 卡片列表 -->
      <el-table 
        :data="filteredCards" 
        style="width: 100%"
        @row-click="handleCardSelect"
        :row-class-name="getRowClassName"
        v-loading="loading"
      >
        <el-table-column prop="cardId" label="卡片ID" width="100" />
        <el-table-column label="卡片内容" min-width="300">
          <template #default="scope">
            <div class="card-content">
              <div v-for="(value, field) in scope.row.fields" :key="field" class="field-preview">
                <strong>{{ field }}:</strong> 
                <span v-html="getFieldPreview(value.value)"></span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button 
              type="primary" 
              size="small"
              @click.stop="handleCardSelect(scope.row)"
            >
              编辑
            </el-button>
            <el-button 
              type="info" 
              size="small"
              @click.stop="handlePreview(scope.row)"
            >
              预览
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <!-- 分页 -->
      <div class="pagination-wrapper">
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
      
      <!-- 空状态 -->
      <div v-if="!loading && filteredCards.length === 0" class="empty-state">
        <el-empty 
          :description="searchQuery ? '没有找到匹配的卡片' : '该牌组暂无卡片'" 
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Document, Search, Refresh } from '@element-plus/icons-vue'
import { getCardsInDeck } from '../services/ankiConnect.js'

export default {
  name: 'CardList',
  components: {
    Document,
    Search,
    Refresh
  },
  props: {
    currentDeck: {
      type: Object,
      required: true
    },
    currentCard: {
      type: Object,
      default: null
    }
  },
  emits: ['card-select', 'preview-card', 'card-list-updated'],
  setup(props, { emit }) {
    const cards = ref([])
    const filteredCards = ref([])
    const searchQuery = ref('')
    const loading = ref(false)
    const currentPage = ref(1)
    const pageSize = ref(20)
    const totalCards = ref(0)

    // 加载卡片列表
    const loadCards = async () => {
      if (!props.currentDeck) return
      
      try {
        loading.value = true
        cards.value = await getCardsInDeck(props.currentDeck.name)
        totalCards.value = cards.value.length
        filterCards()
        
        // 通知父组件卡片列表已更新
        emit('card-list-updated', cards.value)
      } catch (error) {
        console.error('加载卡片列表失败:', error)
        ElMessage.error('加载卡片列表失败')
      } finally {
        loading.value = false
      }
    }

    // 过滤卡片
    const filterCards = () => {
      if (!searchQuery.value) {
        filteredCards.value = cards.value
      } else {
        filteredCards.value = cards.value.filter(card => {
          return Object.values(card.fields).some(field => 
            field.value.toLowerCase().includes(searchQuery.value.toLowerCase())
          )
        })
      }
      totalCards.value = filteredCards.value.length
      currentPage.value = 1
    }

    // 处理搜索
    const handleSearch = () => {
      filterCards()
    }

    // 选择卡片
    const handleCardSelect = (card) => {
      emit('card-select', card)
    }

    // 预览卡片
    const handlePreview = (card) => {
      emit('preview-card', card)
    }

    // 获取字段预览
    const getFieldPreview = (value) => {
      if (!value) return ''
      // 移除HTML标签，只显示纯文本
      return value.replace(/<[^>]*>/g, '').substring(0, 100) + (value.length > 100 ? '...' : '')
    }

    // 获取行样式
    const getRowClassName = ({ row }) => {
      if (props.currentCard && row.cardId === props.currentCard.cardId) {
        return 'selected-row'
      }
      return ''
    }

    // 分页处理
    const handleSizeChange = (size) => {
      pageSize.value = size
      currentPage.value = 1
    }

    const handleCurrentChange = (page) => {
      currentPage.value = page
    }

    // 监听牌组变化
    watch(() => props.currentDeck, (newDeck) => {
      if (newDeck) {
        loadCards()
      }
    }, { immediate: true })

    onMounted(() => {
      if (props.currentDeck) {
        loadCards()
      }
    })

    return {
      cards,
      filteredCards,
      searchQuery,
      loading,
      currentPage,
      pageSize,
      totalCards,
      loadCards,
      handleSearch,
      handleCardSelect,
      handlePreview,
      getFieldPreview,
      getRowClassName,
      handleSizeChange,
      handleCurrentChange
    }
  }
}
</script>

<style scoped>
.card-list {
  padding: 20px;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
}

.search-bar {
  margin-bottom: 16px;
}

.card-content {
  max-height: 80px;
  overflow: hidden;
}

.field-preview {
  margin-bottom: 4px;
  font-size: 12px;
  line-height: 1.4;
}

.field-preview strong {
  color: #606266;
  margin-right: 4px;
}

.pagination-wrapper {
  margin-top: 16px;
  display: flex;
  justify-content: center;
}

.empty-state {
  padding: 40px 0;
  text-align: center;
}

:deep(.selected-row) {
  background-color: #f0f9ff !important;
}

:deep(.selected-row td) {
  background-color: #f0f9ff !important;
}
</style> 