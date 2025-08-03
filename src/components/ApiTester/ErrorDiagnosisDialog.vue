<template>
  <el-dialog
    v-model="visible"
    title="错误诊断"
    width="60%"
  >
    <div class="error-diagnosis-content">
      <el-alert
        :title="diagnosis.title"
        :description="diagnosis.description"
        :type="diagnosis.type"
        :closable="false"
        style="margin-bottom: 20px"
      />
      
      <div v-if="diagnosis.solutions.length > 0">
        <h4>解决方案</h4>
        <ul>
          <li v-for="solution in diagnosis.solutions" :key="solution">
            {{ solution }}
          </li>
        </ul>
      </div>
      
      <div v-if="diagnosis.code" class="error-code">
        <h4>错误代码</h4>
        <el-input
          v-model="diagnosis.code"
          type="textarea"
          :rows="4"
          readonly
        />
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { ref, reactive, watch } from 'vue'

export default {
  name: 'ErrorDiagnosisDialog',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    responseData: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const visible = ref(props.modelValue)
    const diagnosis = reactive({
      title: '',
      description: '',
      type: 'info',
      solutions: [],
      code: ''
    })

    const analyzeError = () => {
      if (!props.responseData) {
        diagnosis.title = '无响应数据'
        diagnosis.description = '请先发送一个请求以获取响应数据进行诊断'
        diagnosis.type = 'warning'
        diagnosis.solutions = []
        diagnosis.code = ''
        return
      }

      try {
        const response = JSON.parse(props.responseData)
        if (response.error) {
          diagnosis.title = 'API 调用失败'
          diagnosis.description = `错误信息: ${response.error}`
          diagnosis.type = 'error'
          diagnosis.solutions = getErrorSolutions(response.error)
          diagnosis.code = response.error
        } else {
          diagnosis.title = 'API 调用成功'
          diagnosis.description = '响应数据格式正确，没有明显的错误。'
          diagnosis.type = 'success'
          diagnosis.solutions = []
          diagnosis.code = ''
        }
      } catch (e) {
        diagnosis.title = '响应数据格式错误'
        diagnosis.description = '响应数据不是有效的 JSON 格式。'
        diagnosis.type = 'warning'
        diagnosis.solutions = ['请检查响应数据是否包含有效的 JSON 对象。']
        diagnosis.code = e.message
      }
    }

    const getErrorSolutions = (error) => {
      const solutions = []
      
      if (error.includes('connection')) {
        solutions.push('检查 Anki 是否已启动')
        solutions.push('确认 AnkiConnect 插件已安装并启用')
        solutions.push('验证插件版本是否兼容')
      }
      
      if (error.includes('deck')) {
        solutions.push('检查牌组名称是否正确')
        solutions.push('确认牌组是否存在')
      }
      
      if (error.includes('note')) {
        solutions.push('检查笔记格式是否正确')
        solutions.push('确认必填字段是否完整')
      }
      
      if (error.includes('model')) {
        solutions.push('检查笔记类型名称是否正确')
        solutions.push('确认笔记类型是否存在')
      }
      
      if (solutions.length === 0) {
        solutions.push('查看 AnkiConnect 官方文档获取更多信息')
        solutions.push('检查参数格式是否正确')
      }
      
      return solutions
    }

    watch(() => props.modelValue, (newVal) => {
      visible.value = newVal
      if (newVal) {
        analyzeError()
      }
    })

    watch(() => props.responseData, () => {
      if (visible.value) {
        analyzeError()
      }
    })

    watch(visible, (newVal) => {
      emit('update:modelValue', newVal)
    })

    return {
      visible,
      diagnosis
    }
  }
}
</script>

<style scoped>
.error-diagnosis-content {
  padding: 20px;
}

.error-code {
  margin-top: 20px;
}

.error-code h4 {
  margin: 0 0 12px 0;
  color: #f56c6c;
}

.error-code .el-input {
  font-size: 14px;
  line-height: 1.5;
  padding: 8px 12px;
  border: 1px solid #f56c6c;
  border-radius: 4px;
  background-color: #fef0f0;
  color: #f56c6c;
}

.error-code .el-input:focus {
  border-color: #f56c6c;
  outline: none;
}
</style> 