<template>
  <div class="parameter-helper">
    <el-card>
      <template #header>
        <div class="helper-header">
          <el-icon><Setting /></el-icon>
          <span>智能参数助手</span>
        </div>
      </template>
      
      <div class="helper-content">
        <div v-if="currentOperation" class="operation-info">
          <h4>{{ currentOperation.label }}</h4>
          <p>{{ currentOperation.description }}</p>
        </div>
        
        <!-- 参数配置区域 -->
        <div v-if="currentOperation && currentOperation.parameters" class="parameter-section">
          <h5>参数配置</h5>
          
          <el-form :model="parameters" label-width="120px">
            <el-form-item 
              v-for="param in currentOperation.parameters" 
              :key="param.name"
              :label="param.name"
            >
              <!-- 智能输入组件 -->
              <SmartInput 
                :param="param"
                v-model="parameters[param.name]"
                @suggestion-selected="handleSuggestionSelected"
              />
            </el-form-item>
          </el-form>
        </div>
        
        <!-- 快速操作 -->
        <div class="quick-actions">
          <h5>快速操作</h5>
          <div class="action-buttons">
            <el-button 
              v-for="action in quickActions" 
              :key="action.name"
              size="small"
              @click="executeQuickAction(action)"
            >
              {{ action.name }}
            </el-button>
          </div>
        </div>
        
        <!-- 使用建议 -->
        <div v-if="currentOperation && currentOperation.suggestions" class="suggestions">
          <h5>使用建议</h5>
          <ul>
            <li v-for="suggestion in currentOperation.suggestions" :key="suggestion">
              {{ suggestion }}
            </li>
          </ul>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Setting, Close } from '@element-plus/icons-vue'
import SmartInput from './SmartInput.vue'

export default {
  name: 'ParameterHelper',
  components: {
    Setting,
    SmartInput
  },
  props: {
    operation: {
      type: Object,
      default: null
    }
  },
  emits: ['parameters-changed'],
  setup(props, { emit }) {
    const parameters = reactive({})
    
    // 当前操作
    const currentOperation = computed(() => props.operation)
    
    // 快速操作列表
    const quickActions = computed(() => {
      if (!currentOperation.value) return []
      
      const actions = []
      
      // 根据操作类型提供快速操作
      switch (currentOperation.value.action) {
        case 'findCards':
          actions.push(
            { name: '查找所有卡片', action: () => setParameter('query', 'deck:*') },
            { name: '查找到期卡片', action: () => setParameter('query', 'is:due') },
            { name: '查找新卡片', action: () => setParameter('query', 'is:new') },
            { name: '查找复习卡片', action: () => setParameter('query', 'is:review') }
          )
          break
        case 'addNote':
          actions.push(
            { name: '基础笔记模板', action: () => setParameter('note', getBasicNoteTemplate()) },
            { name: '带标签笔记模板', action: () => setParameter('note', getTaggedNoteTemplate()) }
          )
          break
        case 'getDeckNames':
          actions.push(
            { name: '包含子牌组', action: () => setParameter('includeSubdecks', true) },
            { name: '不包含子牌组', action: () => setParameter('includeSubdecks', false) }
          )
          break
        case 'getCollectionStatsHTML':
          actions.push(
            { name: '包含整个集合', action: () => setParameter('wholeCollection', true) },
            { name: '仅当前牌组', action: () => setParameter('wholeCollection', false) }
          )
          break
      }
      
      return actions
    })
    
    // 设置参数
    const setParameter = (name, value) => {
      parameters[name] = value
      emit('parameters-changed', { ...parameters })
      ElMessage.success(`已设置参数: ${name}`)
    }
    
    // 处理建议选择
    const handleSuggestionSelected = (paramName, value) => {
      parameters[paramName] = value
      emit('parameters-changed', { ...parameters })
    }
    
    // 执行快速操作
    const executeQuickAction = (action) => {
      action.action()
    }
    
    // 获取基础笔记模板
    const getBasicNoteTemplate = () => {
      return JSON.stringify({
        modelName: "Basic",
        deckName: "默认",
        fields: {
          "Front": "正面内容",
          "Back": "背面内容"
        }
      }, null, 2)
    }
    
    // 获取带标签笔记模板
    const getTaggedNoteTemplate = () => {
      return JSON.stringify({
        modelName: "Basic",
        deckName: "默认",
        fields: {
          "Front": "正面内容",
          "Back": "背面内容"
        },
        tags: ["标签1", "标签2"]
      }, null, 2)
    }
    
    return {
      parameters,
      currentOperation,
      quickActions,
      setParameter,
      handleSuggestionSelected,
      executeQuickAction
    }
  }
}
</script>

<style scoped>
.parameter-helper {
  padding: 20px;
}

.helper-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
}

.helper-content {
  padding: 20px 0;
}

.operation-info {
  margin-bottom: 20px;
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #e4e7ed;
}

.operation-info h4 {
  margin: 0 0 8px 0;
  color: #409EFF;
}

.operation-info p {
  margin: 0;
  color: #606266;
}

.parameter-section {
  margin-bottom: 20px;
}

.parameter-section h5 {
  margin: 0 0 16px 0;
  color: #303133;
}

.quick-actions {
  margin-bottom: 20px;
}

.quick-actions h5 {
  margin: 0 0 12px 0;
  color: #303133;
}

.action-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.suggestions {
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #e4e7ed;
}

.suggestions h5 {
  margin: 0 0 12px 0;
  color: #606266;
}

.suggestions ul {
  margin: 0;
  padding-left: 20px;
}

.suggestions li {
  margin-bottom: 4px;
  color: #909399;
}
</style> 