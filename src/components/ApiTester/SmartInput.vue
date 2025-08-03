<template>
  <div class="smart-input">
    <!-- 字符串输入 -->
    <el-input
      v-if="param.type === 'string'"
      v-model="inputValue"
      :placeholder="param.description"
      @input="handleInput"
    >
      <template #append>
        <el-button @click="showSuggestions = !showSuggestions">
          <el-icon><Search /></el-icon>
        </el-button>
      </template>
    </el-input>
    
    <!-- 数字输入 -->
    <el-input-number
      v-else-if="param.type === 'number'"
      v-model="inputValue"
      :placeholder="param.description"
      @input="handleInput"
    />
    
    <!-- 选择框 -->
    <el-select
      v-else-if="param.type === 'select'"
      v-model="inputValue"
      :placeholder="param.description"
      @change="handleInput"
    >
      <el-option
        v-for="option in param.options"
        :key="option.value"
        :label="option.label"
        :value="option.value"
      />
    </el-select>
    
    <!-- 文本域 -->
    <el-input
      v-else
      v-model="inputValue"
      type="textarea"
      :rows="3"
      :placeholder="param.description"
      @input="handleInput"
    />
    
    <!-- 智能建议面板 -->
    <div v-if="showSuggestions && suggestions.length > 0" class="suggestions-panel">
      <div class="suggestions-header">
        <h6>智能建议</h6>
        <el-button size="small" @click="showSuggestions = false">
          <el-icon><Close /></el-icon>
        </el-button>
      </div>
      <div class="suggestions-list">
        <div 
          v-for="suggestion in suggestions" 
          :key="suggestion.value"
          class="suggestion-item"
          @click="selectSuggestion(suggestion.value)"
        >
          <div class="suggestion-content">
            <div class="suggestion-label">{{ suggestion.label }}</div>
            <div class="suggestion-description">{{ suggestion.description }}</div>
          </div>
          <el-button size="small" type="primary" @click.stop="selectSuggestion(suggestion.value)">
            使用
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { Search, Close } from '@element-plus/icons-vue'

export default {
  name: 'SmartInput',
  components: {
    Search,
    Close
  },
  props: {
    param: {
      type: Object,
      required: true
    },
    modelValue: {
      type: [String, Number, Boolean],
      default: ''
    }
  },
  emits: ['update:modelValue', 'suggestion-selected'],
  setup(props, { emit }) {
    const inputValue = ref(props.modelValue)
    const showSuggestions = ref(false)
    
    // 监听 modelValue 变化
    watch(() => props.modelValue, (newVal) => {
      inputValue.value = newVal
    })
    
    // 监听 inputValue 变化
    watch(inputValue, (newVal) => {
      emit('update:modelValue', newVal)
    })
    
    // 智能建议
    const suggestions = computed(() => {
      const suggestions = []
      
      // 根据参数名称和类型提供建议
      switch (props.param.name) {
        case 'query':
          suggestions.push(
            { value: 'deck:*', label: '所有牌组', description: '查找所有牌组的卡片' },
            { value: 'is:due', label: '到期卡片', description: '查找需要复习的卡片' },
            { value: 'is:new', label: '新卡片', description: '查找新学习的卡片' },
            { value: 'is:review', label: '复习卡片', description: '查找复习中的卡片' },
            { value: 'deck:"默认"', label: '默认牌组', description: '查找默认牌组的卡片' }
          )
          break
        case 'deck':
        case 'deckName':
          suggestions.push(
            { value: '默认', label: '默认牌组', description: '使用默认牌组' },
            { value: '英语词汇', label: '英语词汇', description: '使用英语词汇牌组' },
            { value: '数学公式', label: '数学公式', description: '使用数学公式牌组' }
          )
          break
        case 'modelName':
          suggestions.push(
            { value: 'Basic', label: '基础类型', description: '使用基础笔记类型' },
            { value: 'Basic (and reversed card)', label: '基础双向', description: '使用基础双向笔记类型' },
            { value: 'Cloze', label: '填空题', description: '使用填空题笔记类型' }
          )
          break
        case 'tags':
          suggestions.push(
            { value: '重要', label: '重要标签', description: '标记为重要内容' },
            { value: '复习', label: '复习标签', description: '标记为需要复习' },
            { value: '困难', label: '困难标签', description: '标记为困难内容' }
          )
          break
        case 'cardId':
          suggestions.push(
            { value: '1', label: '卡片ID 1', description: '使用第一个卡片' },
            { value: '100', label: '卡片ID 100', description: '使用第100个卡片' }
          )
          break
        case 'notes':
          suggestions.push(
            { value: '[1, 2, 3]', label: '多个笔记', description: '选择多个笔记ID' },
            { value: '[100, 101, 102]', label: '连续笔记', description: '选择连续的笔记ID' }
          )
          break
        case 'cards':
          suggestions.push(
            { value: '[1, 2, 3]', label: '多个卡片', description: '选择多个卡片ID' },
            { value: '[100, 101, 102]', label: '连续卡片', description: '选择连续的卡片ID' }
          )
          break
        case 'note':
          if (props.param.description.includes('JSON')) {
            suggestions.push(
              { 
                value: JSON.stringify({
                  modelName: "Basic",
                  deckName: "默认",
                  fields: {
                    "Front": "正面内容",
                    "Back": "背面内容"
                  }
                }, null, 2), 
                label: '基础笔记模板', 
                description: '使用基础笔记模板' 
              },
              { 
                value: JSON.stringify({
                  modelName: "Basic",
                  deckName: "默认",
                  fields: {
                    "Front": "正面内容",
                    "Back": "背面内容"
                  },
                  tags: ["标签1", "标签2"]
                }, null, 2), 
                label: '带标签笔记模板', 
                description: '使用带标签的笔记模板' 
              }
            )
          }
          break
        case 'fields':
          suggestions.push(
            { 
              value: JSON.stringify({
                "Front": "正面内容",
                "Back": "背面内容"
              }, null, 2), 
              label: '基础字段', 
              description: '使用基础字段模板' 
            },
            { 
              value: JSON.stringify({
                "Front": "问题",
                "Back": "答案"
              }, null, 2), 
              label: '问答字段', 
              description: '使用问答字段模板' 
            }
          )
          break
      }
      
      return suggestions
    })
    
    // 处理输入
    const handleInput = (value) => {
      inputValue.value = value
    }
    
    // 选择建议
    const selectSuggestion = (value) => {
      inputValue.value = value
      showSuggestions.value = false
      emit('suggestion-selected', props.param.name, value)
      ElMessage.success('已应用建议')
    }
    
    return {
      inputValue,
      showSuggestions,
      suggestions,
      handleInput,
      selectSuggestion
    }
  }
}
</script>

<style scoped>
.smart-input {
  position: relative;
  width: 100%;
}

.suggestions-panel {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1000;
  background: white;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-top: 4px;
}

.suggestions-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-bottom: 1px solid #ebeef5;
  background-color: #f5f7fa;
}

.suggestions-header h6 {
  margin: 0;
  color: #606266;
  font-size: 12px;
}

.suggestions-list {
  max-height: 200px;
  overflow-y: auto;
}

.suggestion-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background-color 0.2s;
}

.suggestion-item:hover {
  background-color: #f5f7fa;
}

.suggestion-item:last-child {
  border-bottom: none;
}

.suggestion-content {
  flex: 1;
}

.suggestion-label {
  font-weight: bold;
  color: #303133;
  font-size: 14px;
  margin-bottom: 2px;
}

.suggestion-description {
  color: #909399;
  font-size: 12px;
}
</style> 