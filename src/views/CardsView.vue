<template>
  <div class="cards-view">
    <div class="page-header">
      <h2>卡片管理</h2>
      <div class="header-actions">
        <el-button type="primary" @click="createCard">
          <el-icon><Plus /></el-icon>
          新建卡片
        </el-button>
        <el-button @click="importCards">
          <el-icon><Upload /></el-icon>
          导入卡片
        </el-button>
      </div>
    </div>

    <div class="cards-content">
      <el-table :data="cards" style="width: 100%">
        <el-table-column prop="front" label="正面" />
        <el-table-column prop="back" label="背面" />
        <el-table-column prop="deck" label="所属牌组" width="120" />
        <el-table-column prop="tags" label="标签" width="150" />
        <el-table-column prop="createdTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button size="small" @click="editCard(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="deleteCard(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 新建卡片对话框 -->
    <el-dialog v-model="createDialogVisible" title="新建卡片" width="600px">
      <el-form :model="newCard" label-width="80px">
        <el-form-item label="正面">
          <el-input 
            v-model="newCard.front" 
            type="textarea" 
            :rows="3"
            placeholder="请输入卡片正面内容"
          />
        </el-form-item>
        <el-form-item label="背面">
          <el-input 
            v-model="newCard.back" 
            type="textarea" 
            :rows="3"
            placeholder="请输入卡片背面内容"
          />
        </el-form-item>
        <el-form-item label="牌组">
          <el-select v-model="newCard.deck" placeholder="选择牌组">
            <el-option label="默认牌组" value="默认牌组" />
            <el-option label="JavaScript 学习" value="JavaScript 学习" />
            <el-option label="Vue.js 基础" value="Vue.js 基础" />
          </el-select>
        </el-form-item>
        <el-form-item label="标签">
          <el-input v-model="newCard.tags" placeholder="请输入标签，用逗号分隔" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="createDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmCreateCard">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// 卡片数据
const cards = ref([
  {
    id: '1',
    front: '什么是 Vue.js？',
    back: 'Vue.js 是一个渐进式 JavaScript 框架，用于构建用户界面。',
    deck: 'Vue.js 基础',
    tags: 'vue,前端',
    createdTime: '2024-01-15 14:30:00'
  },
  {
    id: '2',
    front: 'JavaScript 中的 let 和 var 有什么区别？',
    back: 'let 是块级作用域，var 是函数作用域。let 不会变量提升，var 会。',
    deck: 'JavaScript 学习',
    tags: 'javascript,变量',
    createdTime: '2024-01-15 13:45:00'
  },
  {
    id: '3',
    front: '什么是 Anki？',
    back: 'Anki 是一个基于间隔重复算法的记忆软件，帮助用户高效学习。',
    deck: '默认牌组',
    tags: 'anki,学习',
    createdTime: '2024-01-15 12:20:00'
  }
])

// 新建卡片对话框
const createDialogVisible = ref(false)
const newCard = reactive({
  front: '',
  back: '',
  deck: '',
  tags: ''
})

const createCard = () => {
  createDialogVisible.value = true
  newCard.front = ''
  newCard.back = ''
  newCard.deck = ''
  newCard.tags = ''
}

const confirmCreateCard = () => {
  if (!newCard.front.trim() || !newCard.back.trim()) {
    ElMessage.warning('请输入卡片正面和背面内容')
    return
  }
  
  if (!newCard.deck) {
    ElMessage.warning('请选择牌组')
    return
  }
  
  // 这里将来会调用 AnkiConnect API
  cards.value.push({
    id: Date.now().toString(),
    front: newCard.front,
    back: newCard.back,
    deck: newCard.deck,
    tags: newCard.tags,
    createdTime: new Date().toLocaleString()
  })
  
  createDialogVisible.value = false
  ElMessage.success('卡片创建成功')
}

const editCard = (card: any) => {
  ElMessage.info(`编辑卡片: ${card.front}`)
}

const deleteCard = async (card: any) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除这张卡片吗？`,
      '确认删除',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    
    const index = cards.value.findIndex(c => c.id === card.id)
    if (index > -1) {
      cards.value.splice(index, 1)
      ElMessage.success('卡片删除成功')
    }
  } catch {
    // 用户取消删除
  }
}

const importCards = () => {
  ElMessage.info('导入卡片功能开发中...')
}
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
  gap: 10px;
}

.cards-content {
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