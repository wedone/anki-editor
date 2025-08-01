<template>
  <div class="preview">
    <el-card>
      <template #header>
        <div class="card-header">
          <el-icon><View /></el-icon>
          <span>预览模式 - 卡片 {{ currentCard?.cardId }}</span>
        </div>
      </template>
      
      <!-- 预览控制 -->
      <div v-if="currentCard" class="preview-controls">
        <el-row :gutter="16">
          <el-col :span="8">
            <el-select v-model="previewMode" placeholder="选择预览模式">
              <el-option label="正面" value="front" />
              <el-option label="背面" value="back" />
              <el-option label="完整卡片" value="full" />
            </el-select>
          </el-col>
          <el-col :span="8">
            <el-button-group>
              <el-button 
                :type="previewMode === 'front' ? 'primary' : ''"
                @click="previewMode = 'front'"
              >
                正面
              </el-button>
              <el-button 
                :type="previewMode === 'back' ? 'primary' : ''"
                @click="previewMode = 'back'"
              >
                背面
              </el-button>
              <el-button 
                :type="previewMode === 'full' ? 'primary' : ''"
                @click="previewMode = 'full'"
              >
                完整
              </el-button>
            </el-button-group>
          </el-col>
          <el-col :span="8">
            <el-button @click="refreshPreview">
              <el-icon><Refresh /></el-icon>
              刷新预览
            </el-button>
          </el-col>
        </el-row>
      </div>
      
      <!-- 卡片预览 -->
      <div v-if="currentCard" class="card-preview">
        <div class="preview-container">
          <!-- 正面预览 -->
          <div v-if="previewMode === 'front' || previewMode === 'full'" class="card-side front">
            <div class="card-header">
              <h3>正面</h3>
            </div>
            <div class="card-content" v-html="getFrontContent()"></div>
          </div>
          
          <!-- 背面预览 -->
          <div v-if="previewMode === 'back' || previewMode === 'full'" class="card-side back">
            <div class="card-header">
              <h3>背面</h3>
            </div>
            <div class="card-content" v-html="getBackContent()"></div>
          </div>
        </div>
      </div>
      
      <!-- 卡片信息 -->
      <div v-if="currentCard" class="card-info">
        <el-descriptions :column="3" border>
          <el-descriptions-item label="卡片ID">{{ currentCard.cardId }}</el-descriptions-item>
          <el-descriptions-item label="牌组">{{ currentDeck?.name }}</el-descriptions-item>
          <el-descriptions-item label="笔记类型">{{ currentCard.modelName }}</el-descriptions-item>
          <el-descriptions-item label="字段数量">{{ Object.keys(currentCard.fields).length }}</el-descriptions-item>
          <el-descriptions-item label="预览模式">{{ getPreviewModeText() }}</el-descriptions-item>
          <el-descriptions-item label="更新时间">{{ new Date().toLocaleString() }}</el-descriptions-item>
        </el-descriptions>
      </div>
      
      <!-- 未选择卡片 -->
      <div v-else class="no-card-selected">
        <el-empty description="请先选择一个卡片进行预览" />
      </div>
    </el-card>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { View, Refresh } from '@element-plus/icons-vue'

export default {
  name: 'Preview',
  components: {
    View,
    Refresh
  },
  props: {
    currentDeck: {
      type: Object,
      default: null
    },
    currentCard: {
      type: Object,
      default: null
    }
  },
  setup(props) {
    const previewMode = ref('front')

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

    // 获取预览模式文本
    const getPreviewModeText = () => {
      const modeMap = {
        front: '正面',
        back: '背面',
        full: '完整卡片'
      }
      return modeMap[previewMode.value] || '正面'
    }

    // 刷新预览
    const refreshPreview = () => {
      ElMessage.success('预览已刷新')
    }

    // 监听卡片变化，重置预览模式
    watch(() => props.currentCard, () => {
      previewMode.value = 'front'
    })

    return {
      previewMode,
      getFrontContent,
      getBackContent,
      getPreviewModeText,
      refreshPreview
    }
  }
}
</script>

<style scoped>
.preview {
  padding: 20px;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
}

.preview-controls {
  margin-bottom: 20px;
}

.card-preview {
  margin-bottom: 20px;
}

.preview-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.card-side {
  border: 2px solid #e4e7ed;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card-side.front {
  border-color: #409EFF;
}

.card-side.back {
  border-color: #67C23A;
}

.card-side .card-header {
  background-color: #f5f7fa;
  padding: 12px 16px;
  border-bottom: 1px solid #e4e7ed;
  border-radius: 6px 6px 0 0;
}

.card-side .card-header h3 {
  margin: 0;
  color: #303133;
  font-size: 16px;
}

.card-side.front .card-header {
  background-color: #ecf5ff;
  color: #409EFF;
}

.card-side.back .card-header {
  background-color: #f0f9ff;
  color: #67C23A;
}

.card-content {
  padding: 20px;
  min-height: 120px;
  line-height: 1.6;
  font-size: 16px;
}

.card-info {
  margin-top: 20px;
}

.no-card-selected {
  padding: 40px 0;
  text-align: center;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .preview-controls .el-row {
    flex-direction: column;
  }
  
  .preview-controls .el-col {
    margin-bottom: 12px;
  }
}
</style> 