<template>
  <div class="simple-api-tester">
    <el-card>
      <template #header>
        <div class="tester-header">
          <el-icon><Connection /></el-icon>
          <span>AnkiConnect API 测试工具</span>
          <el-tag v-if="connectionStatus.connected" type="success" size="small">
            已连接 v{{ connectionStatus.version }}
          </el-tag>
        </div>
      </template>
      
      <!-- 连接状态 -->
      <div class="connection-status">
        <el-alert
          :title="connectionStatus.connected ? '已连接到 AnkiConnect' : '未连接到 AnkiConnect'"
          :type="connectionStatus.connected ? 'success' : 'error'"
          :description="connectionStatus.error || '请确保 Anki 已启动并安装了 AnkiConnect 插件'"
          show-icon
          :closable="false"
        />
        <div class="connection-actions">
          <el-button 
            size="small" 
            @click="checkConnectionStatus"
            :loading="checkingConnection"
          >
            <el-icon><Refresh /></el-icon>
            重新检查连接
          </el-button>
        </div>
      </div>
      
      <!-- 测试模式选择 -->
      <div class="mode-selection">
        <h3>选择测试模式</h3>
        <div class="mode-cards">
          <el-card 
            class="mode-card"
            :class="{ 'selected': testMode === 'wizard' }"
            @click="selectMode('wizard')"
          >
            <div class="mode-content">
              <el-icon class="mode-icon"><Document /></el-icon>
              <div class="mode-info">
                <h4>步骤向导</h4>
                <p>通过简单的步骤向导，一步步选择操作类型和具体功能</p>
              </div>
            </div>
          </el-card>
          
          <el-card 
            class="mode-card"
            :class="{ 'selected': testMode === 'helper' }"
            @click="selectMode('helper')"
          >
            <div class="mode-content">
              <el-icon class="mode-icon"><Setting /></el-icon>
              <div class="mode-info">
                <h4>智能助手</h4>
                <p>使用智能参数助手，减少手动输入，快速配置参数</p>
              </div>
            </div>
          </el-card>
          
          <el-card 
            class="mode-card"
            :class="{ 'selected': testMode === 'advanced' }"
            @click="selectMode('advanced')"
          >
            <div class="mode-content">
              <el-icon class="mode-icon"><Setting /></el-icon>
              <div class="mode-info">
                <h4>高级模式</h4>
                <p>使用完整的 API 测试界面，适合有经验的用户</p>
              </div>
            </div>
          </el-card>
        </div>
      </div>
      
      <!-- 测试内容区域 -->
      <div class="test-content">
        <!-- 步骤向导模式 -->
        <StepWizard 
          v-if="testMode === 'wizard'"
        />
        
        <!-- 智能助手模式 -->
        <div v-else-if="testMode === 'helper'" class="helper-mode">
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="operation-selector">
                <h3>选择操作</h3>
                <el-select 
                  v-model="selectedOperation" 
                  placeholder="选择要测试的操作"
                  style="width: 100%"
                  @change="onOperationChange"
                >
                  <el-option-group
                    v-for="category in operationCategories"
                    :key="category.value"
                    :label="category.label"
                  >
                    <el-option
                      v-for="operation in getOperationsByCategory(category.value)"
                      :key="operation.action"
                      :label="operation.label"
                      :value="operation.action"
                    >
                      <div class="operation-option">
                        <div class="operation-label">{{ operation.label }}</div>
                        <div class="operation-action">{{ operation.action }}</div>
                      </div>
                    </el-option>
                  </el-option-group>
                </el-select>
              </div>
            </el-col>
            
            <el-col :span="12">
              <ParameterHelper 
                v-if="selectedOperationInfo"
                :operation="selectedOperationInfo"
                @parameters-changed="handleParametersChanged"
              />
            </el-col>
          </el-row>
          
          <!-- 执行测试 -->
          <div v-if="selectedOperationInfo" class="test-execution">
            <el-divider />
            <div class="execution-summary">
              <h4>测试摘要</h4>
              <el-descriptions :column="2" border>
                <el-descriptions-item label="操作">
                  {{ selectedOperationInfo.label }}
                </el-descriptions-item>
                <el-descriptions-item label="API 方法">
                  {{ selectedOperationInfo.action }}
                </el-descriptions-item>
                <el-descriptions-item label="参数数量">
                  {{ Object.keys(currentParameters).length }}
                </el-descriptions-item>
                <el-descriptions-item label="状态">
                  <el-tag :type="connectionStatus.connected ? 'success' : 'danger'">
                    {{ connectionStatus.connected ? '已连接' : '未连接' }}
                  </el-tag>
                </el-descriptions-item>
              </el-descriptions>
              
              <div class="execution-actions">
                <el-button 
                  type="primary" 
                  size="large"
                  @click="executeTest"
                  :loading="loading"
                  :disabled="!connectionStatus.connected"
                >
                  <el-icon><Right /></el-icon>
                  执行测试
                </el-button>
                <el-button @click="clearTest">
                  <el-icon><Delete /></el-icon>
                  清除
                </el-button>
              </div>
            </div>
            
            <!-- 测试结果 -->
            <div v-if="testResult" class="test-result">
              <h4>测试结果</h4>
              <el-alert
                :title="testResult.success ? '测试成功' : '测试失败'"
                :type="testResult.success ? 'success' : 'error'"
                :description="testResult.message"
                show-icon
                :closable="false"
              />
              
              <div class="result-details">
                <el-tabs>
                  <el-tab-pane label="请求数据">
                    <el-input
                      v-model="testResult.request"
                      type="textarea"
                      :rows="8"
                      readonly
                    />
                  </el-tab-pane>
                  <el-tab-pane label="响应数据">
                    <el-input
                      v-model="testResult.response"
                      type="textarea"
                      :rows="8"
                      readonly
                    />
                  </el-tab-pane>
                </el-tabs>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 高级模式 -->
        <ApiTester 
          v-else-if="testMode === 'advanced'"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { 
  Connection, 
  Right, 
  Delete, 
  Refresh,
  Document,
  Setting
} from '@element-plus/icons-vue'
import { checkConnection } from '../../services/ankiConnect/index.js'
import { apiList } from './ApiList.js'
import StepWizard from './StepWizard.vue'
import ParameterHelper from './ParameterHelper.vue'
import ApiTester from './ApiTester.vue'

export default {
  name: 'SimpleApiTester',
  components: {
    Connection,
    Right,
    Delete,
    Refresh,
    Document,
    Setting,
    StepWizard,
    ParameterHelper,
    ApiTester
  },
  setup() {
    const testMode = ref('wizard')
    const selectedOperation = ref('')
    const currentParameters = reactive({})
    const loading = ref(false)
    const checkingConnection = ref(false)
    const testResult = ref(null)
    
    const connectionStatus = reactive({
      connected: false,
      error: null,
      version: null
    })

    // 操作分类
    const operationCategories = [
      { value: '基础操作', label: '基础操作' },
      { value: '牌组操作', label: '牌组管理' },
      { value: '卡片操作', label: '卡片管理' },
      { value: '笔记操作', label: '笔记管理' },
      { value: '标签操作', label: '标签管理' },
      { value: '模型操作', label: '模型管理' },
      { value: '统计操作', label: '统计分析' },
      { value: '媒体操作', label: '媒体文件' },
      { value: '其他操作', label: '其他功能' }
    ]

    // 当前选中的操作信息
    const selectedOperationInfo = computed(() => {
      return apiList.find(api => api.action === selectedOperation.value)
    })

    // 根据分类获取操作列表
    const getOperationsByCategory = (category) => {
      return apiList.filter(api => api.category === category)
    }

    // 检查连接状态
    const checkConnectionStatus = async () => {
      checkingConnection.value = true
      try {
        const result = await checkConnection()
        connectionStatus.connected = result.connected
        connectionStatus.error = result.error
        connectionStatus.version = result.version
      } catch (error) {
        connectionStatus.connected = false
        connectionStatus.error = error.message
      } finally {
        checkingConnection.value = false
      }
    }

    // 选择测试模式
    const selectMode = (mode) => {
      testMode.value = mode
      selectedOperation.value = ''
      Object.keys(currentParameters).forEach(key => {
        delete currentParameters[key]
      })
      testResult.value = null
    }

    // 操作变化
    const onOperationChange = () => {
      Object.keys(currentParameters).forEach(key => {
        delete currentParameters[key]
      })
      testResult.value = null
    }

    // 参数变化
    const handleParametersChanged = (parameters) => {
      Object.assign(currentParameters, parameters)
    }

    // 执行测试
    const executeTest = async () => {
      if (!selectedOperation.value) {
        ElMessage.warning('请先选择要测试的操作')
        return
      }

      if (!connectionStatus.connected) {
        ElMessage.error('未连接到 AnkiConnect')
        return
      }

      try {
        loading.value = true
        
        const request = {
          action: selectedOperation.value,
          version: 6,
          params: { ...currentParameters }
        }
        
        const response = await fetch('http://localhost:8765', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(request)
        })

        const result = await response.json()
        
        testResult.value = {
          success: !result.error,
          message: result.error || '测试成功',
          request: JSON.stringify(request, null, 2),
          response: JSON.stringify(result, null, 2)
        }
        
        if (result.error) {
          ElMessage.error(`测试失败: ${result.error}`)
        } else {
          ElMessage.success('测试成功')
        }
        
      } catch (error) {
        console.error('测试失败:', error)
        testResult.value = {
          success: false,
          message: error.message,
          request: JSON.stringify(request, null, 2),
          response: JSON.stringify({ error: error.message }, null, 2)
        }
        ElMessage.error(`测试失败: ${error.message}`)
      } finally {
        loading.value = false
      }
    }

    // 清除测试
    const clearTest = () => {
      selectedOperation.value = ''
      Object.keys(currentParameters).forEach(key => {
        delete currentParameters[key]
      })
      testResult.value = null
      ElMessage.success('已清除测试数据')
    }

    onMounted(() => {
      checkConnectionStatus()
    })

    return {
      testMode,
      selectedOperation,
      currentParameters,
      loading,
      checkingConnection,
      testResult,
      connectionStatus,
      operationCategories,
      selectedOperationInfo,
      getOperationsByCategory,
      checkConnectionStatus,
      selectMode,
      onOperationChange,
      handleParametersChanged,
      executeTest,
      clearTest
    }
  }
}
</script>

<style scoped>
.simple-api-tester {
  padding: 20px;
}

.tester-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
}

.connection-status {
  margin-bottom: 20px;
}

.connection-actions {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}

.mode-selection {
  margin-bottom: 30px;
}

.mode-selection h3 {
  margin: 0 0 16px 0;
  color: #303133;
}

.mode-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
}

.mode-card {
  cursor: pointer;
  transition: all 0.3s ease;
}

.mode-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.mode-card.selected {
  border-color: #409EFF;
  background-color: #ecf5ff;
}

.mode-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.mode-icon {
  font-size: 24px;
  color: #409EFF;
}

.mode-info h4 {
  margin: 0 0 4px 0;
  color: #303133;
}

.mode-info p {
  margin: 0;
  color: #606266;
  font-size: 14px;
}

.test-content {
  margin-top: 20px;
}

.helper-mode {
  padding: 20px 0;
}

.operation-selector h3 {
  margin: 0 0 16px 0;
  color: #303133;
}

.operation-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.operation-label {
  font-weight: bold;
  color: #303133;
}

.operation-action {
  font-size: 12px;
  color: #909399;
}

.test-execution {
  margin-top: 30px;
}

.execution-summary h4 {
  margin: 0 0 16px 0;
  color: #303133;
}

.execution-actions {
  margin-top: 20px;
  display: flex;
  gap: 12px;
}

.test-result {
  margin-top: 20px;
}

.result-details {
  margin-top: 20px;
}
</style> 