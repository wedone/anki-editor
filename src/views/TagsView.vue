<template>
  <div class="tags-view">
    <div class="page-header">
      <h2>标签管理</h2>
      <div class="header-actions">
        <el-button type="primary" @click="createTag">
          <el-icon><Plus /></el-icon>
          新建标签
        </el-button>
      </div>
    </div>

    <div class="tags-content">
      <el-table :data="tags" style="width: 100%">
        <el-table-column prop="name" label="标签名称" />
        <el-table-column prop="color" label="颜色" width="100">
          <template #default="scope">
            <el-tag :color="scope.row.color" effect="dark">{{ scope.row.name }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="cardCount" label="卡片数量" width="120" />
        <el-table-column prop="createdTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button size="small" @click="editTag(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="deleteTag(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 新建标签对话框 -->
    <el-dialog v-model="createDialogVisible" title="新建标签" width="500px">
      <el-form :model="newTag" label-width="80px">
        <el-form-item label="标签名称">
          <el-input v-model="newTag.name" placeholder="请输入标签名称" />
        </el-form-item>
        <el-form-item label="标签颜色">
          <el-color-picker v-model="newTag.color" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input 
            v-model="newTag.description" 
            type="textarea" 
            placeholder="请输入标签描述"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="createDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmCreateTag">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// 标签数据
const tags = ref([
  {
    id: '1',
    name: '学习',
    color: '#409eff',
    cardCount: 150,
    createdTime: '2024-01-01 10:00:00',
    description: '学习相关的卡片'
  },
  {
    id: '2',
    name: '工作',
    color: '#67c23a',
    cardCount: 89,
    createdTime: '2024-01-10 09:00:00',
    description: '工作相关的卡片'
  },
  {
    id: '3',
    name: 'javascript',
    color: '#e6a23c',
    cardCount: 67,
    createdTime: '2024-01-12 11:00:00',
    description: 'JavaScript 相关的卡片'
  },
  {
    id: '4',
    name: 'vue',
    color: '#f56c6c',
    cardCount: 45,
    createdTime: '2024-01-15 14:30:00',
    description: 'Vue.js 相关的卡片'
  }
])

// 新建标签对话框
const createDialogVisible = ref(false)
const newTag = reactive({
  name: '',
  color: '#409eff',
  description: ''
})

const createTag = () => {
  createDialogVisible.value = true
  newTag.name = ''
  newTag.color = '#409eff'
  newTag.description = ''
}

const confirmCreateTag = () => {
  if (!newTag.name.trim()) {
    ElMessage.warning('请输入标签名称')
    return
  }
  
  // 这里将来会调用 AnkiConnect API
  tags.value.push({
    id: Date.now().toString(),
    name: newTag.name,
    color: newTag.color,
    cardCount: 0,
    createdTime: new Date().toLocaleString(),
    description: newTag.description
  })
  
  createDialogVisible.value = false
  ElMessage.success('标签创建成功')
}

const editTag = (tag: any) => {
  ElMessage.info(`编辑标签: ${tag.name}`)
}

const deleteTag = async (tag: any) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除标签 "${tag.name}" 吗？`,
      '确认删除',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    
    const index = tags.value.findIndex(t => t.id === tag.id)
    if (index > -1) {
      tags.value.splice(index, 1)
      ElMessage.success('标签删除成功')
    }
  } catch {
    // 用户取消删除
  }
}
</script>

<style scoped>
.tags-view {
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

.tags-content {
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