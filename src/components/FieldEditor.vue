<template>
  <div class="field-editor">
    <!-- 导航控制栏 -->
    <div v-if="currentCard" class="navigation-controls">
      <el-row justify="space-between" align="middle">
        <el-col :span="8">
          <el-button 
            type="primary" 
            :disabled="!hasPreviousCard"
            @click="goToPreviousCard"
          >
            <el-icon><ArrowLeft /></el-icon>
            上一张
          </el-button>
        </el-col>
        
        <el-col :span="8" style="text-align: center">
          <span class="card-counter">
            {{ currentCardIndex + 1 }} / {{ totalCards }}
          </span>
        </el-col>
        
        <el-col :span="8" style="text-align: right">
          <el-button 
            type="primary" 
            :disabled="!hasNextCard"
            @click="goToNextCard"
          >
            下一张
            <el-icon><ArrowRight /></el-icon>
          </el-button>
        </el-col>
      </el-row>
    </div>

    <!-- 主要内容区域 -->
    <div class="editor-container">
      <!-- 左侧：字段编辑区域 (2/3) -->
      <div class="editor-panel">
        <el-card>
          <template #header>
            <div class="card-header">
              <el-icon><Edit /></el-icon>
              <span>字段编辑 - 卡片 {{ currentCard?.cardId }}</span>
            </div>
          </template>
          
          <!-- 卡片信息 -->
          <div v-if="currentCard" class="card-info">
            <el-descriptions :column="2" border>
              <el-descriptions-item label="卡片ID">{{ currentCard.cardId }}</el-descriptions-item>
              <el-descriptions-item label="牌组">{{ currentDeck?.name }}</el-descriptions-item>
              <el-descriptions-item label="笔记类型">{{ currentCard.modelName }}</el-descriptions-item>
              <el-descriptions-item label="字段数量">{{ Object.keys(currentCard.fields).length }}</el-descriptions-item>
            </el-descriptions>
          </div>
          
          <!-- 字段编辑区域 -->
          <div v-if="currentCard && fields.length > 0" class="fields-editor">
            <div class="editor-header">
              <h3>编辑字段内容</h3>
              <div class="editor-actions">
                <el-button 
                  type="success" 
                  @click="saveChanges"
                  :loading="saving"
                  :disabled="!hasChanges"
                >
                  <el-icon><Check /></el-icon>
                  保存更改
                </el-button>
                <el-button 
                  @click="resetChanges"
                  :disabled="!hasChanges"
                >
                  <el-icon><RefreshLeft /></el-icon>
                  重置
                </el-button>
              </div>
            </div>
            
            <!-- 字段列表 -->
            <div class="fields-list">
              <div 
                v-for="field in fields" 
                :key="field.name" 
                class="field-item"
              >
                <div class="field-header">
                  <el-tag size="small" type="info">{{ field.name }}</el-tag>
                  <span class="field-type">{{ field.type }}</span>
                </div>
                
                <div class="field-content">
                  <!-- 文本字段 -->
                  <el-input
                    v-if="field.type === 'text'"
                    v-model="field.value"
                    type="textarea"
                    :rows="4"
                    placeholder="请输入字段内容..."
                    @input="markAsChanged"
                  />
                  
                  <!-- 富文本字段 -->
                  <div v-else-if="field.type === 'html'" class="html-editor">
                    <el-input
                      v-model="field.value"
                      type="textarea"
                      :rows="6"
                      placeholder="请输入HTML内容..."
                      @input="markAsChanged"
                    />
                  </div>
                  
                  <!-- 其他类型字段 -->
                  <el-input
                    v-else
                    v-model="field.value"
                    :placeholder="`请输入${field.name}内容...`"
                    @input="markAsChanged"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <!-- 空状态 -->
          <div v-else-if="currentCard" class="empty-state">
            <el-empty description="该卡片没有可编辑的字段" />
          </div>
          
          <!-- 未选择卡片 -->
          <div v-else class="no-card-selected">
            <el-empty description="请先选择一个卡片进行编辑" />
          </div>
        </el-card>
      </div>
      
      <!-- 右侧：卡片预览区域 (1/3) -->
      <div class="preview-panel">
        <el-card>
          <template #header>
            <div class="card-header">
              <el-icon><View /></el-icon>
              <span>卡片预览</span>
            </div>
          </template>
          
          <div v-if="currentCard" class="preview-content">
            <!-- 预览模式选择 -->
            <div class="preview-controls">
              <el-button-group>
                <el-button 
                  :type="previewMode === 'front' ? 'primary' : ''"
                  @click="previewMode = 'front'"
                  size="small"
                >
                  正面
                </el-button>
                <el-button 
                  :type="previewMode === 'back' ? 'primary' : ''"
                  @click="previewMode = 'back'"
                  size="small"
                >
                  背面
                </el-button>
                <el-button 
                  :type="previewMode === 'full' ? 'primary' : ''"
                  @click="previewMode = 'full'"
                  size="small"
                >
                  完整
                </el-button>
              </el-button-group>
            </div>
            
            <!-- 卡片预览 -->
            <div class="card-preview">
              <!-- 正面预览 -->
              <div v-if="previewMode === 'front' || previewMode === 'full'" class="card-side front">
                <div class="card-side-header">
                  <h4>正面</h4>
                </div>
                <div class="card-side-content" v-html="getFrontContent()"></div>
              </div>
              
              <!-- 背面预览 -->
              <div v-if="previewMode === 'back' || previewMode === 'full'" class="card-side back">
                <div class="card-side-header">
                  <h4>背面</h4>
                </div>
                <div class="card-side-content" v-html="getBackContent()"></div>
              </div>
            </div>
          </div>
          
          <!-- 未选择卡片 -->
          <div v-else class="no-card-selected">
            <el-empty description="请先选择一个卡片进行编辑" />
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Edit, Check, RefreshLeft, ArrowLeft, ArrowRight, View } from '@element-plus/icons-vue'
import { updateCardFields } from '../services/ankiConnect/index.js'

export default {
  name: 'FieldEditor',
  components: {
    Edit,
    Check,
    RefreshLeft,
    ArrowLeft,
    ArrowRight,
    View
  },
  props: {
    currentDeck: {
      type: Object,
      default: null
    },
    currentCard: {
      type: Object,
      default: null
    },
    cardList: {
      type: Array,
      default: () => []
    },
    currentCardIndex: {
      type: Number,
      default: 0
    }
  },
  emits: ['card-updated', 'navigate-card'],
  setup(props, { emit }) {
    const fields = ref([])
    const originalFields = ref({})
    const saving = ref(false)
    const hasChanges = ref(false)
    const previewMode = ref('front')

    // 计算属性
    const totalCards = computed(() => props.cardList.length)
    const hasPreviousCard = computed(() => props.currentCardIndex > 0)
    const hasNextCard = computed(() => props.currentCardIndex < totalCards.value - 1)

    // 处理字段数据
    const processFields = (card) => {
      if (!card || !card.fields) return []
      
      return Object.entries(card.fields).map(([name, field]) => ({
        name,
        value: field.value || '',
        type: field.value && field.value.includes('<') ? 'html' : 'text',
        originalValue: field.value || ''
      }))
    }

    // 加载卡片字段
    const loadCardFields = () => {
      if (!props.currentCard) return
      
      fields.value = processFields(props.currentCard)
      originalFields.value = {}
      
      // 保存原始值用于比较
      fields.value.forEach(field => {
        originalFields.value[field.name] = field.originalValue
      })
      
      hasChanges.value = false
    }

    // 标记为已更改
    const markAsChanged = () => {
      hasChanges.value = fields.value.some(field => 
        field.value !== originalFields.value[field.name]
      )
    }

    // 保存更改
    const saveChanges = async () => {
      if (!props.currentCard || !hasChanges.value) return
      
      try {
        saving.value = true
        
        // 构建字段对象
        const fieldsToUpdate = {}
        fields.value.forEach(field => {
          fieldsToUpdate[field.name] = field.value
        })
        
        // 调用API保存
        const success = await updateCardFields(props.currentCard.cardId, fieldsToUpdate)
        
        if (success) {
          ElMessage.success('卡片字段保存成功')
          // 更新原始值
          fields.value.forEach(field => {
            originalFields.value[field.name] = field.value
          })
          hasChanges.value = false
          
          // 通知父组件卡片已更新
          emit('card-updated', props.currentCard)
        } else {
          ElMessage.error('保存失败')
        }
      } catch (error) {
        console.error('保存卡片字段失败:', error)
        ElMessage.error('保存失败: ' + error.message)
      } finally {
        saving.value = false
      }
    }

    // 重置更改
    const resetChanges = async () => {
      try {
        await ElMessageBox.confirm(
          '确定要重置所有更改吗？这将丢失所有未保存的修改。',
          '确认重置',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        )
        
        // 重置字段值
        fields.value.forEach(field => {
          field.value = originalFields.value[field.name]
        })
        
        hasChanges.value = false
        ElMessage.info('已重置所有更改')
      } catch {
        // 用户取消
      }
    }

    // 导航到上一张卡片
    const goToPreviousCard = async () => {
      if (hasChanges.value) {
        try {
          await ElMessageBox.confirm(
            '当前卡片有未保存的更改，是否保存后继续？',
            '确认导航',
            {
              confirmButtonText: '保存并继续',
              cancelButtonText: '不保存',
              distinguishCancelAndClose: true,
              type: 'warning'
            }
          )
          // 用户选择保存
          await saveChanges()
        } catch (action) {
          if (action === 'cancel') {
            // 用户选择不保存，直接导航
          } else {
            // 用户取消导航
            return
          }
        }
      }
      
      emit('navigate-card', props.currentCardIndex - 1)
    }

    // 导航到下一张卡片
    const goToNextCard = async () => {
      if (hasChanges.value) {
        try {
          await ElMessageBox.confirm(
            '当前卡片有未保存的更改，是否保存后继续？',
            '确认导航',
            {
              confirmButtonText: '保存并继续',
              cancelButtonText: '不保存',
              distinguishCancelAndClose: true,
              type: 'warning'
            }
          )
          // 用户选择保存
          await saveChanges()
        } catch (action) {
          if (action === 'cancel') {
            // 用户选择不保存，直接导航
          } else {
            // 用户取消导航
            return
          }
        }
      }
      
      emit('navigate-card', props.currentCardIndex + 1)
    }

    // 获取正面内容
    const getFrontContent = () => {
      if (!props.currentCard || !props.currentCard.fields) return ''
      
      // 这里可以根据卡片模板来确定哪些字段显示在正面
      // 简单示例：显示第一个字段
      const fields = Object.values(props.currentCard.fields)
      return fields.length > 0 ? fields[0].value : ''
    }

    // 获取背面内容
    const getBackContent = () => {
      if (!props.currentCard || !props.currentCard.fields) return ''
      
      // 这里可以根据卡片模板来确定哪些字段显示在背面
      // 简单示例：显示除第一个字段外的其他字段
      const fields = Object.values(props.currentCard.fields)
      if (fields.length <= 1) return ''
      
      return fields.slice(1).map(field => field.value).join('<br>')
    }

    // 监听卡片变化
    watch(() => props.currentCard, (newCard) => {
      if (newCard) {
        loadCardFields()
        previewMode.value = 'front' // 重置预览模式
      }
    }, { immediate: true })

    return {
      fields,
      saving,
      hasChanges,
      totalCards,
      hasPreviousCard,
      hasNextCard,
      previewMode,
      loadCardFields,
      markAsChanged,
      saveChanges,
      resetChanges,
      goToPreviousCard,
      goToNextCard,
      getFrontContent,
      getBackContent
    }
  }
}
</script>

<style scoped>
.field-editor {
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.navigation-controls {
  margin-bottom: 20px;
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e4e7ed;
}

.card-counter {
  font-size: 16px;
  font-weight: bold;
  color: #409EFF;
}

.editor-container {
  flex: 1;
  display: flex;
  gap: 20px;
  min-height: 0;
}

.editor-panel {
  flex: 2;
  display: flex;
  flex-direction: column;
}

.preview-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
}

.card-info {
  margin-bottom: 20px;
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.editor-header h3 {
  margin: 0;
  color: #303133;
}

.editor-actions {
  display: flex;
  gap: 12px;
}

.fields-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
  flex: 1;
}

.field-item {
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  padding: 16px;
  background-color: #fafafa;
}

.field-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.field-type {
  font-size: 12px;
  color: #909399;
}

.field-content {
  width: 100%;
}

.html-editor {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.empty-state,
.no-card-selected {
  padding: 40px 0;
  text-align: center;
}

/* 预览区域样式 */
.preview-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.preview-controls {
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
}

.card-preview {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.card-side {
  border: 2px solid #e4e7ed;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-side.front {
  border-color: #409EFF;
}

.card-side.back {
  border-color: #67C23A;
}

.card-side-header {
  background-color: #f5f7fa;
  padding: 8px 12px;
  border-bottom: 1px solid #e4e7ed;
  border-radius: 6px 6px 0 0;
}

.card-side-header h4 {
  margin: 0;
  color: #303133;
  font-size: 14px;
}

.card-side.front .card-side-header {
  background-color: #ecf5ff;
  color: #409EFF;
}

.card-side.back .card-side-header {
  background-color: #f0f9ff;
  color: #67C23A;
}

.card-side-content {
  padding: 12px;
  flex: 1;
  line-height: 1.6;
  font-size: 14px;
  overflow-y: auto;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .editor-container {
    flex-direction: column;
  }
  
  .editor-panel,
  .preview-panel {
    flex: none;
  }
}
</style> 