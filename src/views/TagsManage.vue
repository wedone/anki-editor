<template>
  <div class="tags-manage">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>标签管理</span>
          <div class="header-actions">
            <el-button type="primary" @click="createTag" :disabled="!ankiStore.isConnected">
              <el-icon><Plus /></el-icon>
              创建标签
            </el-button>
            <el-button type="success" @click="batchManage" :disabled="!ankiStore.isConnected">
              <el-icon><EditPen /></el-icon>
              批量管理
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

      <!-- 标签统计 -->
      <div class="tags-stats" style="margin-bottom: 20px;">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-card shadow="hover" class="stat-card">
              <div class="stat-content">
                <div class="stat-number">{{ totalTags }}</div>
                <div class="stat-label">总标签数</div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover" class="stat-card">
              <div class="stat-content">
                <div class="stat-number">{{ totalCards }}</div>
                <div class="stat-label">总卡片数</div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover" class="stat-card">
              <div class="stat-content">
                <div class="stat-number">{{ mostUsedTag }}</div>
                <div class="stat-label">最常用标签</div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover" class="stat-card">
              <div class="stat-content">
                <div class="stat-number">{{ averageCardsPerTag }}</div>
                <div class="stat-label">平均卡片/标签</div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <!-- 标签筛选 -->
      <div class="filter-section" style="margin-bottom: 20px;">
        <el-input
          v-model="searchQuery"
          placeholder="搜索标签..."
          style="width: 300px; margin-right: 10px;"
          clearable
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
        <el-select
          v-model="sortBy"
          placeholder="排序方式"
          style="width: 150px; margin-right: 10px;"
        >
          <el-option label="按名称" value="name" />
          <el-option label="按使用次数" value="usage" />
          <el-option label="按创建时间" value="created" />
        </el-select>
        <el-button type="primary" @click="applyFilters" :loading="loading">
          应用筛选
        </el-button>
      </div>

      <!-- 标签列表 -->
      <el-table
        :data="filteredTags"
        style="width: 100%"
        v-loading="loading"
        empty-text="暂无标签数据"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="name" label="标签名称" min-width="200">
          <template #default="{ row }">
            <el-tag
              :type="getTagType(row.usage)"
              size="large"
              effect="light"
            >
              {{ row.name }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="usage" label="使用次数" width="120" align="center">
          <template #default="{ row }">
            <el-tag type="info">{{ row.usage }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="描述" min-width="200">
          <template #default="{ row }">
            {{ row.description || '暂无描述' }}
          </template>
        </el-table-column>
        <el-table-column prop="created" label="创建时间" width="180" align="center">
          <template #default="{ row }">
            {{ formatDate(row.created) }}
          </template>
        </el-table-column>
        <el-table-column prop="lastUsed" label="最后使用" width="180" align="center">
          <template #default="{ row }">
            {{ formatDate(row.lastUsed) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template #default="{ row }">
            <el-button type="text" size="small" @click="editTag(row)">
              编辑
            </el-button>
            <el-button type="text" size="small" @click="viewTagDetails(row)">
              详情
            </el-button>
            <el-button 
              type="text" 
              size="small" 
              @click="deleteTag(row)" 
              style="color: #f56c6c;"
              :disabled="!ankiStore.isConnected"
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
          :total="totalTags"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 创建标签对话框 -->
    <el-dialog
      v-model="createDialogVisible"
      title="创建标签"
      width="500px"
    >
      <el-form :model="newTag" label-width="80px">
        <el-form-item label="标签名称" required>
          <el-input v-model="newTag.name" placeholder="请输入标签名称" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="newTag.description"
            type="textarea"
            placeholder="请输入标签描述（可选）"
            :rows="3"
          />
        </el-form-item>
        <el-form-item label="颜色">
          <el-color-picker v-model="newTag.color" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="createDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmCreateTag" :loading="creating">
            创建
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 编辑标签对话框 -->
    <el-dialog
      v-model="editDialogVisible"
      title="编辑标签"
      width="500px"
    >
      <el-form :model="editingTag" label-width="80px">
        <el-form-item label="标签名称" required>
          <el-input v-model="editingTag.name" placeholder="请输入标签名称" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="editingTag.description"
            type="textarea"
            placeholder="请输入标签描述（可选）"
            :rows="3"
          />
        </el-form-item>
        <el-form-item label="颜色">
          <el-color-picker v-model="editingTag.color" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmEditTag" :loading="editing">
            保存
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 标签详情对话框 -->
    <el-dialog
      v-model="detailsDialogVisible"
      title="标签详情"
      width="800px"
    >
      <div class="tag-details">
        <div class="details-header">
          <el-tag
            :type="getTagType(detailTag.usage)"
            size="large"
            effect="light"
            style="margin-bottom: 10px;"
          >
            {{ detailTag.name }}
          </el-tag>
          <p>{{ detailTag.description || '暂无描述' }}</p>
        </div>
        <div class="details-stats">
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="detail-stat">
                <div class="stat-number">{{ detailTag.usage }}</div>
                <div class="stat-label">使用次数</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="detail-stat">
                <div class="stat-number">{{ detailTag.cardCount }}</div>
                <div class="stat-label">关联卡片</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="detail-stat">
                <div class="stat-number">{{ detailTag.deckCount }}</div>
                <div class="stat-label">涉及牌组</div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="details-cards">
          <h4>关联卡片</h4>
          <el-table :data="detailTag.cards" style="width: 100%">
            <el-table-column prop="id" label="卡片ID" width="100" />
            <el-table-column prop="deck" label="牌组" width="150" />
            <el-table-column prop="front" label="正面内容" min-width="200" />
            <el-table-column prop="back" label="背面内容" min-width="200" />
          </el-table>
        </div>
      </div>
    </el-dialog>

    <!-- 批量管理对话框 -->
    <el-dialog
      v-model="batchDialogVisible"
      title="批量管理标签"
      width="600px"
    >
      <div class="batch-management">
        <div class="batch-header">
          <p>已选择 {{ selectedTags.length }} 个标签</p>
        </div>
        <div class="batch-actions">
          <el-button type="primary" @click="batchRename">
            批量重命名
          </el-button>
          <el-button type="warning" @click="batchMerge">
            合并标签
          </el-button>
          <el-button type="danger" @click="batchDelete">
            批量删除
          </el-button>
        </div>
        <div class="selected-tags">
          <h4>选中的标签：</h4>
          <el-tag
            v-for="tag in selectedTags"
            :key="tag.id"
            style="margin: 4px;"
            closable
            @close="removeFromSelection(tag)"
          >
            {{ tag.name }}
          </el-tag>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useAnkiStore } from '../stores/ankiStore.js'
import { Plus, EditPen, Search } from '@element-plus/icons-vue'

const ankiStore = useAnkiStore()

// 响应式数据
const loading = ref(false)
const creating = ref(false)
const editing = ref(false)
const createDialogVisible = ref(false)
const editDialogVisible = ref(false)
const detailsDialogVisible = ref(false)
const batchDialogVisible = ref(false)
const searchQuery = ref('')
const sortBy = ref('name')
const currentPage = ref(1)
const pageSize = ref(20)
const selectedTags = ref([])
const detailTag = ref({})

const newTag = ref({
  name: '',
  description: '',
  color: '#409EFF'
})

const editingTag = ref({
  name: '',
  description: '',
  color: '#409EFF'
})

// 模拟标签数据
const tags = ref([
  {
    id: 1,
    name: 'vue',
    description: 'Vue.js 相关标签',
    usage: 45,
    cardCount: 45,
    deckCount: 3,
    created: new Date('2024-01-10'),
    lastUsed: new Date('2024-01-25'),
    color: '#42b883',
    cards: [
      { id: 1, deck: '前端开发', front: '什么是 Vue.js？', back: 'Vue.js 是一个渐进式 JavaScript 框架' },
      { id: 2, deck: '前端开发', front: 'Vue 的响应式原理', back: 'Vue 使用 Object.defineProperty 实现响应式' }
    ]
  },
  {
    id: 2,
    name: 'javascript',
    description: 'JavaScript 相关标签',
    usage: 38,
    cardCount: 38,
    deckCount: 2,
    created: new Date('2024-01-08'),
    lastUsed: new Date('2024-01-24'),
    color: '#f7df1e',
    cards: [
      { id: 3, deck: '编程语言', front: 'JavaScript 是什么？', back: 'JavaScript 是一种脚本语言' },
      { id: 4, deck: '编程语言', front: '闭包的概念', back: '闭包是函数和其词法环境的组合' }
    ]
  },
  {
    id: 3,
    name: '英语',
    description: '英语学习相关标签',
    usage: 120,
    cardCount: 120,
    deckCount: 5,
    created: new Date('2024-01-05'),
    lastUsed: new Date('2024-01-26'),
    color: '#1890ff',
    cards: [
      { id: 5, deck: '英语词汇', front: 'apple', back: '苹果' },
      { id: 6, deck: '英语词汇', front: 'computer', back: '计算机' }
    ]
  },
  {
    id: 4,
    name: '数学',
    description: '数学相关标签',
    usage: 25,
    cardCount: 25,
    deckCount: 2,
    created: new Date('2024-01-12'),
    lastUsed: new Date('2024-01-23'),
    color: '#52c41a',
    cards: [
      { id: 7, deck: '数学公式', front: '勾股定理', back: 'a² + b² = c²' },
      { id: 8, deck: '数学公式', front: '平方差公式', back: 'a² - b² = (a+b)(a-b)' }
    ]
  }
])

// 计算属性
const totalTags = computed(() => tags.value.length)
const totalCards = computed(() => tags.value.reduce((sum, tag) => sum + tag.cardCount, 0))
const mostUsedTag = computed(() => {
  const maxUsage = Math.max(...tags.value.map(tag => tag.usage))
  const tag = tags.value.find(tag => tag.usage === maxUsage)
  return tag ? tag.name : '无'
})
const averageCardsPerTag = computed(() => {
  if (tags.value.length === 0) return 0
  return Math.round(totalCards.value / tags.value.length)
})

const filteredTags = computed(() => {
  let filtered = tags.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(tag => 
      tag.name.toLowerCase().includes(query) ||
      (tag.description && tag.description.toLowerCase().includes(query))
    )
  }

  // 排序
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'usage':
        return b.usage - a.usage
      case 'created':
        return new Date(b.created) - new Date(a.created)
      default:
        return 0
    }
  })

  return filtered
})

// 方法
const formatDate = (date) => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('zh-CN')
}

const getTagType = (usage) => {
  if (usage >= 100) return 'danger'
  if (usage >= 50) return 'warning'
  if (usage >= 20) return 'success'
  return 'info'
}

const createTag = () => {
  if (!ankiStore.isConnected) {
    ElMessage.warning('请先连接到 Anki')
    return
  }
  createDialogVisible.value = true
  newTag.value = {
    name: '',
    description: '',
    color: '#409EFF'
  }
}

const confirmCreateTag = async () => {
  if (!newTag.value.name.trim()) {
    ElMessage.warning('请输入标签名称')
    return
  }
  
  creating.value = true
  try {
    const tag = {
      id: Date.now(),
      name: newTag.value.name,
      description: newTag.value.description,
      usage: 0,
      cardCount: 0,
      deckCount: 0,
      created: new Date(),
      lastUsed: null,
      color: newTag.value.color,
      cards: []
    }
    
    tags.value.push(tag)
    createDialogVisible.value = false
    ElMessage.success('标签创建成功！')
  } catch (error) {
    ElMessage.error(`创建失败: ${error.message}`)
  } finally {
    creating.value = false
  }
}

const editTag = (tag) => {
  editingTag.value = { ...tag }
  editDialogVisible.value = true
}

const confirmEditTag = async () => {
  if (!editingTag.value.name.trim()) {
    ElMessage.warning('请输入标签名称')
    return
  }
  
  editing.value = true
  try {
    const index = tags.value.findIndex(t => t.id === editingTag.value.id)
    if (index > -1) {
      tags.value[index] = { ...editingTag.value }
      ElMessage.success('标签更新成功！')
    }
    editDialogVisible.value = false
  } catch (error) {
    ElMessage.error(`更新失败: ${error.message}`)
  } finally {
    editing.value = false
  }
}

const viewTagDetails = (tag) => {
  detailTag.value = { ...tag }
  detailsDialogVisible.value = true
}

const deleteTag = async (tag) => {
  if (!ankiStore.isConnected) {
    ElMessage.warning('请先连接到 Anki')
    return
  }

  try {
    await ElMessageBox.confirm(
      `确定要删除标签 "${tag.name}" 吗？此操作不可恢复。`,
      '确认删除',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
    
    const index = tags.value.findIndex(t => t.id === tag.id)
    if (index > -1) {
      tags.value.splice(index, 1)
      ElMessage.success('标签删除成功！')
    }
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(`删除失败: ${error.message}`)
    }
  }
}

const applyFilters = async () => {
  loading.value = true
  try {
    // 这里后续会集成真实的 AnkiConnect API 调用
    await new Promise(resolve => setTimeout(resolve, 500))
    ElMessage.success('筛选应用成功！')
  } catch (error) {
    ElMessage.error(`筛选失败: ${error.message}`)
  } finally {
    loading.value = false
  }
}

const batchManage = () => {
  if (!ankiStore.isConnected) {
    ElMessage.warning('请先连接到 Anki')
    return
  }
  batchDialogVisible.value = true
}

const handleSelectionChange = (selection) => {
  selectedTags.value = selection
}

const removeFromSelection = (tag) => {
  const index = selectedTags.value.findIndex(t => t.id === tag.id)
  if (index > -1) {
    selectedTags.value.splice(index, 1)
  }
}

const batchRename = () => {
  ElMessage.info('批量重命名功能开发中...')
}

const batchMerge = () => {
  ElMessage.info('合并标签功能开发中...')
}

const batchDelete = async () => {
  if (selectedTags.value.length === 0) {
    ElMessage.warning('请先选择要删除的标签')
    return
  }

  try {
    await ElMessageBox.confirm(
      `确定要删除选中的 ${selectedTags.value.length} 个标签吗？此操作不可恢复。`,
      '确认删除',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
    
    // 删除选中的标签
    selectedTags.value.forEach(tag => {
      const index = tags.value.findIndex(t => t.id === tag.id)
      if (index > -1) {
        tags.value.splice(index, 1)
      }
    })
    
    selectedTags.value = []
    batchDialogVisible.value = false
    ElMessage.success('批量删除成功！')
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
      await ankiStore.loadTags()
    }
  } catch (error) {
    console.error('加载数据失败:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.tags-manage {
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
  gap: 10px;
}

.tags-stats {
  margin-bottom: 20px;
}

.stat-card {
  text-align: center;
}

.stat-content {
  padding: 10px;
}

.stat-number {
  font-size: 24px;
  font-weight: bold;
  color: #409EFF;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 14px;
  color: #606266;
}

.filter-section {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.pagination-container {
  margin-top: 20px;
}

.tag-details {
  max-height: 600px;
  overflow-y: auto;
}

.details-header {
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ebeef5;
}

.details-header p {
  margin: 10px 0 0 0;
  color: #606266;
}

.details-stats {
  margin-bottom: 20px;
}

.detail-stat {
  text-align: center;
  padding: 15px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.detail-stat .stat-number {
  font-size: 20px;
  font-weight: bold;
  color: #409EFF;
  margin-bottom: 5px;
}

.detail-stat .stat-label {
  font-size: 12px;
  color: #606266;
}

.details-cards {
  margin-top: 20px;
}

.details-cards h4 {
  margin-bottom: 10px;
  color: #303133;
}

.batch-management {
  max-height: 500px;
  overflow-y: auto;
}

.batch-header {
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ebeef5;
}

.batch-header p {
  margin: 0;
  color: #606266;
}

.batch-actions {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

.selected-tags {
  margin-top: 20px;
}

.selected-tags h4 {
  margin-bottom: 10px;
  color: #303133;
}
</style> 