<template>
  <el-dialog
    v-model="visible"
    title="批量 API 测试"
    width="80%"
    :before-close="handleClose"
  >
    <div class="batch-test-content">
      <el-alert
        title="批量测试说明"
        description="选择要批量测试的 API 方法，系统将自动执行并生成测试报告"
        type="info"
        :closable="false"
        style="margin-bottom: 20px"
      />
      
      <el-form :model="config" label-width="120px">
        <el-form-item label="测试 API">
          <el-select
            v-model="config.selectedApis"
            multiple
            placeholder="选择要测试的 API"
            style="width: 100%"
          >
            <el-option
              v-for="api in apiList"
              :key="api.action"
              :label="api.label"
              :value="api.action"
            />
          </el-select>
        </el-form-item>
        
        <el-form-item label="测试间隔">
          <el-input-number
            v-model="config.interval"
            :min="100"
            :max="5000"
            :step="100"
          />
          <span style="margin-left: 8px">毫秒</span>
        </el-form-item>
      </el-form>
      
      <div class="batch-test-actions">
        <el-button 
          type="primary" 
          @click="startBatchTest"
          :loading="running"
          :disabled="config.selectedApis.length === 0"
        >
          开始批量测试
        </el-button>
        <el-button @click="handleClose">取消</el-button>
      </div>
      
      <div v-if="results.length > 0" class="batch-test-results">
        <h4>测试结果</h4>
        <el-table :data="results" style="width: 100%">
          <el-table-column prop="action" label="API" width="150" />
          <el-table-column prop="status" label="状态" width="100">
            <template #default="scope">
              <el-tag :type="scope.row.status === 'success' ? 'success' : 'danger'">
                {{ scope.row.status === 'success' ? '成功' : '失败' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="message" label="消息" />
          <el-table-column prop="duration" label="耗时" width="100">
            <template #default="scope">
              {{ scope.row.duration }}ms
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { apiList } from './ApiList.js'
import { presetTests } from './PresetTests.js'

export default {
  name: 'BatchTestDialog',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const visible = ref(props.modelValue)
    const running = ref(false)
    const results = ref([])
    
    const config = reactive({
      selectedApis: [],
      interval: 1000
    })

    const startBatchTest = async () => {
      if (config.selectedApis.length === 0) {
        ElMessage.warning('请选择要批量测试的 API')
        return
      }
      
      running.value = true
      results.value = []
      
      for (const apiAction of config.selectedApis) {
        const apiInfo = apiList.find(api => api.action === apiAction)
        if (!apiInfo) {
          ElMessage.error(`API 方法 "${apiAction}" 未找到`)
          results.value.push({ 
            action: apiAction, 
            status: 'error', 
            message: `API 方法 "${apiAction}" 未找到`,
            duration: 0
          })
          continue
        }

        const params = {}
        if (apiInfo.parameters && apiInfo.parameters.length > 0) {
          // 尝试从预设中获取参数，如果没有则使用空对象
          const preset = presetTests.find(preset => preset.action === apiAction)
          if (preset && preset.params) {
            Object.assign(params, preset.params)
          }
        }

        try {
          const request = {
            action: apiAction,
            version: 6,
            params: params
          }
          const startTime = Date.now()
          const response = await fetch('http://localhost:8765', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(request)
          })
          const result = await response.json()
          const duration = Date.now() - startTime
          results.value.push({ 
            action: apiAction, 
            status: 'success', 
            message: result.error || '请求成功', 
            duration: duration 
          })
        } catch (error) {
          const startTime = Date.now()
          const duration = Date.now() - startTime
          results.value.push({ 
            action: apiAction, 
            status: 'error', 
            message: error.message, 
            duration: duration 
          })
        }
        await new Promise(resolve => setTimeout(resolve, config.interval))
      }
      
      running.value = false
      ElMessage.success('批量测试完成！')
    }

    const handleClose = () => {
      visible.value = false
      emit('update:modelValue', false)
      config.selectedApis = []
      config.interval = 1000
      results.value = []
    }

    return {
      visible,
      running,
      results,
      config,
      apiList,
      startBatchTest,
      handleClose
    }
  }
}
</script>

<style scoped>
.batch-test-content {
  padding: 20px;
}

.batch-test-content .el-alert {
  margin-bottom: 20px;
}

.batch-test-results {
  margin-top: 20px;
}

.batch-test-results h4 {
  margin: 0 0 12px 0;
  color: #303133;
}

.batch-test-actions {
  margin-top: 20px;
  display: flex;
  gap: 12px;
}
</style> 