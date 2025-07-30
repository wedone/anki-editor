<template>
  <div class="decks-view">
    <div class="page-header">
      <h2>牌组管理</h2>
      <div class="header-actions">
        <el-button type="primary" @click="createDeck">
          <el-icon><Plus /></el-icon>
          新建牌组
        </el-button>
        <el-button @click="importDeck">
          <el-icon><Upload /></el-icon>
          导入牌组
        </el-button>
      </div>
    </div>

    <div class="decks-content">
      <el-table :data="decks" style="width: 100%">
        <el-table-column prop="name" label="牌组名称" />
        <el-table-column prop="cardCount" label="卡片数量" width="120" />
        <el-table-column prop="createdTime" label="创建时间" width="180" />
        <el-table-column prop="lastModified" label="最后修改" width="180" />
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button size="small" @click="editDeck(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="deleteDeck(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 新建牌组对话框 -->
    <el-dialog v-model="createDialogVisible" title="新建牌组" width="500px">
      <el-form :model="newDeck" label-width="80px">
        <el-form-item label="牌组名称">
          <el-input v-model="newDeck.name" placeholder="请输入牌组名称" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input 
            v-model="newDeck.description" 
            type="textarea" 
            placeholder="请输入牌组描述"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="createDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmCreateDeck">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// 牌组数据
const decks = ref([
  {
    id: '1',
    name: '默认牌组',
    cardCount: 150,
    createdTime: '2024-01-01 10:00:00',
    lastModified: '2024-01-15 14:30:00'
  },
  {
    id: '2',
    name: 'JavaScript 学习',
    cardCount: 89,
    createdTime: '2024-01-10 09:00:00',
    lastModified: '2024-01-15 13:45:00'
  },
  {
    id: '3',
    name: 'Vue.js 基础',
    cardCount: 67,
    createdTime: '2024-01-12 11:00:00',
    lastModified: '2024-01-15 12:20:00'
  }
])

// 新建牌组对话框
const createDialogVisible = ref(false)
const newDeck = reactive({
  name: '',
  description: ''
})

const createDeck = () => {
  createDialogVisible.value = true
  newDeck.name = ''
  newDeck.description = ''
}

const confirmCreateDeck = () => {
  if (!newDeck.name.trim()) {
    ElMessage.warning('请输入牌组名称')
    return
  }
  
  // 这里将来会调用 AnkiConnect API
  decks.value.push({
    id: Date.now().toString(),
    name: newDeck.name,
    cardCount: 0,
    createdTime: new Date().toLocaleString(),
    lastModified: new Date().toLocaleString()
  })
  
  createDialogVisible.value = false
  ElMessage.success('牌组创建成功')
}

const editDeck = (deck: any) => {
  ElMessage.info(`编辑牌组: ${deck.name}`)
}

const deleteDeck = async (deck: any) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除牌组 "${deck.name}" 吗？`,
      '确认删除',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    
    const index = decks.value.findIndex(d => d.id === deck.id)
    if (index > -1) {
      decks.value.splice(index, 1)
      ElMessage.success('牌组删除成功')
    }
  } catch {
    // 用户取消删除
  }
}

const importDeck = () => {
  ElMessage.info('导入牌组功能开发中...')
}
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

.header-actions {
  display: flex;
  gap: 10px;
}

.decks-content {
  background: #fff;
  border-radius: 4px;
  padding: 20px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style> 