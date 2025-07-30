<template>
  <div class="tags-view">
    <div class="page-header">
      <h2>标签管理</h2>
      <div class="header-actions">
        <el-input 
          v-model="searchKeyword" 
          placeholder="搜索标签" 
          style="width: 200px; margin-right: 10px;"
          clearable
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
        <el-button type="primary" @click="showCreateDialog = true">
          <el-icon><Plus /></el-icon>
          新建标签
        </el-button>
      </div>
    </div>

    <div class="tags-content">
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

      <!-- 标签列表 -->
      <div v-else-if="filteredTags.length > 0" class="tags-list">
        <el-row :gutter="20">
          <el-col 
            v-for="tag in filteredTags" 
            :key="tag" 
            :span="6"
            style="margin-bottom: 20px;"
          >
            <el-card class="tag-card" shadow="hover">
              <div class="tag-content">
                <div class="tag-header">
                  <el-icon><PriceTag /></el-icon>
                  <span class="tag-name">{{ tag }}</span>
                </div>
                <div class="tag-actions">
                  <el-button size="small" @click="viewTag(tag)">
                    <el-icon><View /></el-icon>
                    查看
                  </el-button>
                  <el-button size="small" type="danger" @click="deleteTag(tag)">
                    <el-icon><Delete /></el-icon>
                    删除
                  </el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <!-- 空状态 -->
      <div v-else class="empty-state">
        <el-empty :description="searchKeyword ? '未找到匹配的标签' : '暂无标签'">
          <el-button type="primary" @click="showCreateDialog = true">
            创建第一个标签
          </el-button>
        </el-empty>
      </div>
    </div>

    <!-- 创建标签对话框 -->
    <el-dialog
      v-model="showCreateDialog"
      title="新建标签"
      width="500px"
      :close-on-click-modal="false"
    >
      <el-form :model="createForm" :rules="createRules" ref="createFormRef" label-width="100px">
        <el-form-item label="标签名称" prop="name">
          <el-input v-model="createForm.name" placeholder="请输入标签名称" />
        </el-form-item>
        <el-form-item label="标签颜色">
          <el-color-picker v-model="createForm.color" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input 
            v-model="createForm.description" 
            type="textarea" 
            placeholder="可选，输入标签描述"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showCreateDialog = false">取消</el-button>
          <el-button type="primary" @click="handleCreateTag" :loading="creating">
            创建
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 查看标签对话框 -->
    <el-dialog
      v-model="showViewDialog"
      title="标签详情"
      width="600px"
    >
      <div v-if="viewingTag" class="tag-detail">
        <div class="tag-info">
          <h3>{{ viewingTag }}</h3>
          <p>使用此标签的卡片数量：{{ tagUsageCount }}</p>
        </div>
        
        <div class="tag-usage">
          <h4>使用此标签的卡片</h4>
          <div v-if="taggedCards.length > 0" class="cards-list">
            <el-table :data="taggedCards" style="width: 100%">
              <el-table-column prop="id" label="ID" width="80" />
              <el-table-column prop="deckName" label="牌组" width="150">
                <template #default="{ row }">
                  <el-tag size="small">{{ row.deckName }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="内容" min-width="300">
                <template #default="{ row }">
                  <div class="card-content">
                    <div v-for="(value, key) in row.fields" :key="key" class="field">
                      <strong>{{ key }}:</strong> {{ value }}
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="lastModified" label="最后修改" width="180">
                <template #default="{ row }">
                  {{ formatDate(row.lastModified) }}
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-else class="no-cards">
            <el-empty description="暂无使用此标签的卡片" />
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useAnkiStore } from '@/stores/ankiStore'
import { ankiConnect } from '@/api/ankiConnect'
import type { Note } from '@/api/ankiConnect'

const ankiStore = useAnkiStore()

// 状态
const searchKeyword = ref('')
const showCreateDialog = ref(false)
const showViewDialog = ref(false)
const creating = ref(false)

// 表单引用
const createFormRef = ref()

// 查看的标签
const viewingTag = ref('')
const taggedCards = ref<Note[]>([])

// 创建表单
const createForm = reactive({
  name: '',
  color: '#409eff',
  description: ''
})

// 表单验证规则
const createRules = {
  name: [
    { required: true, message: '请输入标签名称', trigger: 'blur' },
    { min: 1, max: 50, message: '标签名称长度在 1 到 50 个字符', trigger: 'blur' }
  ]
}

// 过滤后的标签
const filteredTags = computed(() => {
  if (!searchKeyword.value) {
    return ankiStore.tags
  }
  return ankiStore.tags.filter(tag => 
    tag.toLowerCase().includes(searchKeyword.value.toLowerCase())
  )
})

// 标签使用数量
const tagUsageCount = computed(() => {
  if (!viewingTag.value) return 0
  return ankiStore.notes.filter(note => 
    note.tags.includes(viewingTag.value)
  ).length
})

// 格式化日期
const formatDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleString('zh-CN')
}

// 查看标签
const viewTag = async (tag: string) => {
  viewingTag.value = tag
  
  // 加载使用此标签的卡片
  try {
    const query = `tag:${tag}`
    const noteIds = await ankiConnect.findNotes(query)
    
    if (noteIds.length > 0) {
      taggedCards.value = await ankiConnect.getNotesInfo(noteIds)
    } else {
      taggedCards.value = []
    }
  } catch (error) {
    console.error('加载标签卡片失败:', error)
    taggedCards.value = []
  }
  
  showViewDialog.value = true
}

// 删除标签
const deleteTag = async (tag: string) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除标签 "${tag}" 吗？此操作将从所有使用此标签的卡片中移除该标签。`,
      '确认删除',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )

    // 从所有使用此标签的卡片中移除该标签
    const cardsWithTag = ankiStore.notes.filter(note => note.tags.includes(tag))
    
    for (const card of cardsWithTag) {
      const updatedTags = card.tags.filter(t => t !== tag)
      await ankiStore.updateNote(card.id, card.fields, updatedTags)
    }
    
    ElMessage.success('标签删除成功')
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('删除标签失败')
    }
  }
}

// 创建标签
const handleCreateTag = async () => {
  if (!createFormRef.value) return

  try {
    await createFormRef.value.validate()
    creating.value = true

    // Anki 的标签是在创建卡片时自动生成的，这里显示提示
    ElMessage.info('标签会在创建卡片时自动生成，请先创建使用该标签的卡片')
    showCreateDialog.value = false
    
    // 重置表单
    createForm.name = ''
    createForm.color = '#409eff'
    createForm.description = ''
  } catch (error) {
    if (error !== false) {
      ElMessage.error('创建标签失败')
    }
  } finally {
    creating.value = false
  }
}

// 页面加载时刷新数据
onMounted(async () => {
  if (ankiStore.isConnected) {
    await ankiStore.loadTags()
  }
})
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
  align-items: center;
}

.tags-content {
  background: #fff;
  border-radius: 4px;
  padding: 20px;
}

.loading-container {
  padding: 20px;
}

.tags-list {
  margin-top: 20px;
}

.tag-card {
  height: 120px;
  cursor: pointer;
  transition: all 0.3s;
}

.tag-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.tag-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.tag-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.tag-name {
  font-weight: bold;
  color: #303133;
  font-size: 16px;
}

.tag-actions {
  display: flex;
  gap: 8px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.tag-detail h3 {
  margin: 0 0 10px 0;
  color: #303133;
}

.tag-info p {
  color: #606266;
  margin: 0 0 20px 0;
}

.tag-usage h4 {
  margin: 0 0 15px 0;
  color: #303133;
}

.cards-list {
  margin-top: 15px;
}

.card-content {
  max-height: 100px;
  overflow-y: auto;
}

.field {
  margin-bottom: 4px;
  font-size: 12px;
}

.no-cards {
  text-align: center;
  padding: 40px 20px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style> 