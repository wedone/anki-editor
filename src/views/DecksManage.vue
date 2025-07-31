<template>
  <div class="decks-manage">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>牌组管理</span>
          <div class="header-actions">
            <el-input
              v-model="searchQuery"
              placeholder="搜索牌组..."
              style="width: 200px; margin-right: 10px;"
              clearable
            >
              <template #prefix>
                <el-icon><Search /></el-icon>
              </template>
            </el-input>
            <el-button type="primary" @click="createDeck" :disabled="!ankiStore.isConnected">
              <el-icon><Plus /></el-icon>
              创建牌组
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

      <!-- 牌组表格 -->
      <el-table
        :data="filteredDecks"
        style="width: 100%"
        v-loading="loading"
        empty-text="暂无牌组数据"
      >
        <el-table-column prop="name" label="牌组名称" min-width="200">
          <template #default="{ row }">
            <el-button type="text" @click="viewDeck(row)">
              {{ row.name }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="cardCount" label="卡片数量" width="120" align="center">
          <template #default="{ row }">
            <el-tag type="info">{{ row.cardCount || 0 }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="lastModified" label="最后修改" width="180" align="center">
          <template #default="{ row }">
            {{ formatDate(row.lastModified) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template #default="{ row }">
            <el-button type="text" size="small" @click="editDeck(row)">
              编辑
            </el-button>
            <el-button type="text" size="small" @click="browseCards(row)">
              浏览卡片
            </el-button>
            <el-button 
              type="text" 
              size="small" 
              @click="deleteDeck(row)" 
              style="color: #f56c6c;"
              :disabled="!ankiStore.isConnected"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 创建牌组对话框 -->
    <el-dialog
      v-model="createDialogVisible"
      title="创建牌组"
      width="500px"
    >
      <el-form :model="newDeck" label-width="80px">
        <el-form-item label="牌组名称" required>
          <el-input v-model="newDeck.name" placeholder="请输入牌组名称" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="newDeck.description"
            type="textarea"
            placeholder="请输入牌组描述（可选）"
            :rows="3"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="createDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmCreateDeck" :loading="creating">
            创建
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
import { Search, Plus } from '@element-plus/icons-vue'

const ankiStore = useAnkiStore()

// 响应式数据
const loading = ref(false)
const creating = ref(false)
const searchQuery = ref('')
const createDialogVisible = ref(false)
const newDeck = ref({
  name: '',
  description: ''
})

// 计算属性
const filteredDecks = computed(() => {
  if (!searchQuery.value) return ankiStore.decks
  return ankiStore.decks.filter(deck => 
    deck.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// 方法
const formatDate = (date) => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('zh-CN')
}

const createDeck = () => {
  if (!ankiStore.isConnected) {
    ElMessage.warning('请先连接到 Anki')
    return
  }
  createDialogVisible.value = true
  newDeck.value = { name: '', description: '' }
}

const confirmCreateDeck = async () => {
  if (!newDeck.value.name.trim()) {
    ElMessage.warning('请输入牌组名称')
    return
  }
  
  creating.value = true
  try {
    await ankiStore.createDeck(newDeck.value.name)
    createDialogVisible.value = false
    ElMessage.success('牌组创建成功！')
  } catch (error) {
    ElMessage.error(`创建失败: ${error.message}`)
  } finally {
    creating.value = false
  }
}

const viewDeck = (deck) => {
  ElMessage.info(`查看牌组: ${deck.name}`)
}

const editDeck = (deck) => {
  ElMessage.info(`编辑牌组: ${deck.name}`)
}

const browseCards = (deck) => {
  ElMessage.info(`浏览卡片: ${deck.name}`)
}

const deleteDeck = async (deck) => {
  if (!ankiStore.isConnected) {
    ElMessage.warning('请先连接到 Anki')
    return
  }

  try {
    await ElMessageBox.confirm(
      `确定要删除牌组 "${deck.name}" 吗？此操作不可恢复。`,
      '确认删除',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
    
    await ankiStore.deleteDeck(deck.name)
    ElMessage.success('牌组删除成功！')
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(`删除失败: ${error.message}`)
    }
  }
}

// 生命周期
onMounted(async () => {
  loading.value = true
  try {
    // 如果已连接，刷新数据
    if (ankiStore.isConnected) {
      await ankiStore.loadDecks()
    }
  } catch (error) {
    console.error('加载牌组失败:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.decks-manage {
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

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style> 