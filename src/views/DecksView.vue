<template>
  <div class="decks-view">
    <div class="page-header">
      <h2>牌组管理</h2>
      <el-button type="primary" @click="showCreateDialog = true">
        <el-icon><Plus /></el-icon>
        新建牌组
      </el-button>
    </div>

    <div class="decks-content">
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

      <!-- 牌组列表 -->
      <div v-else-if="ankiStore.decks.length > 0" class="decks-list">
        <el-table :data="ankiStore.decks" style="width: 100%">
          <el-table-column prop="name" label="牌组名称" min-width="200">
            <template #default="{ row }">
              <div class="deck-name">
                <el-icon><Folder /></el-icon>
                <span>{{ row.name }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="cardCount" label="卡片数量" width="120">
            <template #default="{ row }">
              <el-tag size="small">{{ row.cardCount }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="lastModified" label="最后修改" width="180">
            <template #default="{ row }">
              {{ formatDate(row.lastModified) }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200" fixed="right">
            <template #default="{ row }">
              <el-button size="small" @click="viewDeck(row)">
                <el-icon><View /></el-icon>
                查看
              </el-button>
              <el-button size="small" type="primary" @click="editDeck(row)">
                <el-icon><Edit /></el-icon>
                编辑
              </el-button>
              <el-button size="small" type="danger" @click="deleteDeck(row)">
                <el-icon><Delete /></el-icon>
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 空状态 -->
      <div v-else class="empty-state">
        <el-empty description="暂无牌组">
          <el-button type="primary" @click="showCreateDialog = true">
            创建第一个牌组
          </el-button>
        </el-empty>
      </div>
    </div>

    <!-- 创建牌组对话框 -->
    <el-dialog
      v-model="showCreateDialog"
      title="新建牌组"
      width="500px"
      :close-on-click-modal="false"
    >
      <el-form :model="createForm" :rules="createRules" ref="createFormRef" label-width="100px">
        <el-form-item label="牌组名称" prop="name">
          <el-input v-model="createForm.name" placeholder="请输入牌组名称" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="createForm.description" type="textarea" placeholder="可选，输入牌组描述" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showCreateDialog = false">取消</el-button>
          <el-button type="primary" @click="handleCreateDeck" :loading="creating">
            创建
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 编辑牌组对话框 -->
    <el-dialog
      v-model="showEditDialog"
      title="编辑牌组"
      width="500px"
      :close-on-click-modal="false"
    >
      <el-form :model="editForm" :rules="editRules" ref="editFormRef" label-width="100px">
        <el-form-item label="牌组名称" prop="name">
          <el-input v-model="editForm.name" placeholder="请输入牌组名称" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="editForm.description" type="textarea" placeholder="可选，输入牌组描述" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showEditDialog = false">取消</el-button>
          <el-button type="primary" @click="handleEditDeck" :loading="editing">
            保存
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useAnkiStore } from '@/stores/ankiStore'
import type { Deck } from '@/api/ankiConnect'

const ankiStore = useAnkiStore()

// 对话框状态
const showCreateDialog = ref(false)
const showEditDialog = ref(false)

// 加载状态
const creating = ref(false)
const editing = ref(false)

// 表单引用
const createFormRef = ref()
const editFormRef = ref()

// 创建表单
const createForm = reactive({
  name: '',
  description: ''
})

// 编辑表单
const editForm = reactive({
  name: '',
  description: ''
})

// 表单验证规则
const createRules = {
  name: [
    { required: true, message: '请输入牌组名称', trigger: 'blur' },
    { min: 1, max: 50, message: '牌组名称长度在 1 到 50 个字符', trigger: 'blur' }
  ]
}

const editRules = {
  name: [
    { required: true, message: '请输入牌组名称', trigger: 'blur' },
    { min: 1, max: 50, message: '牌组名称长度在 1 到 50 个字符', trigger: 'blur' }
  ]
}

// 格式化日期
const formatDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleString('zh-CN')
}

// 查看牌组
const viewDeck = (deck: Deck) => {
  ElMessage.info(`查看牌组: ${deck.name}`)
  // TODO: 跳转到牌组详情页面
}

// 编辑牌组
const editDeck = (deck: Deck) => {
  editForm.name = deck.name
  editForm.description = '' // Anki 不存储牌组描述，这里留空
  showEditDialog.value = true
}

// 删除牌组
const deleteDeck = async (deck: Deck) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除牌组 "${deck.name}" 吗？此操作将删除牌组中的所有卡片，且不可恢复。`,
      '确认删除',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )

    await ankiStore.deleteDeck(deck.name)
    ElMessage.success('牌组删除成功')
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('删除牌组失败')
    }
  }
}

// 创建牌组
const handleCreateDeck = async () => {
  if (!createFormRef.value) return

  try {
    await createFormRef.value.validate()
    creating.value = true

    await ankiStore.createDeck(createForm.name)
    
    ElMessage.success('牌组创建成功')
    showCreateDialog.value = false
    
    // 重置表单
    createForm.name = ''
    createForm.description = ''
  } catch (error) {
    if (error !== false) { // 不是表单验证错误
      ElMessage.error('创建牌组失败')
    }
  } finally {
    creating.value = false
  }
}

// 编辑牌组
const handleEditDeck = async () => {
  if (!editFormRef.value) return

  try {
    await editFormRef.value.validate()
    editing.value = true

    // Anki 不支持直接重命名牌组，这里需要特殊处理
    // 暂时显示提示信息
    ElMessage.info('Anki 不支持直接重命名牌组，请删除后重新创建')
    showEditDialog.value = false
  } catch (error) {
    if (error !== false) {
      ElMessage.error('编辑牌组失败')
    }
  } finally {
    editing.value = false
  }
}

// 页面加载时刷新数据
onMounted(async () => {
  if (ankiStore.isConnected) {
    await ankiStore.loadDecks()
  }
})
</script>

<style scoped>
.decks-view {
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

.decks-content {
  background: #fff;
  border-radius: 4px;
  padding: 20px;
}

.loading-container {
  padding: 20px;
}

.decks-list {
  margin-top: 20px;
}

.deck-name {
  display: flex;
  align-items: center;
  gap: 8px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style> 