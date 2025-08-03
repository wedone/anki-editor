<template>
  <div class="api-tester">
    <el-card>
      <template #header>
        <div class="card-header">
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
          <el-button 
            size="small" 
            type="info"
            @click="showConnectionHelp"
          >
            <el-icon><QuestionFilled /></el-icon>
            连接帮助
          </el-button>
        </div>
      </div>
      
      <!-- API 测试区域 -->
      <div class="api-test-area">
        <el-row :gutter="20">
          <!-- 左侧：API 选择 -->
          <el-col :span="8">
            <div class="api-selector">
              <h3>选择 API 方法</h3>
              
              <!-- API 搜索 -->
              <el-input
                v-model="apiSearchKeyword"
                placeholder="搜索 API 方法..."
                prefix-icon="Search"
                clearable
                style="margin-bottom: 12px"
              />
              
              <!-- API 分类选择 -->
              <el-select
                v-model="selectedCategory"
                placeholder="选择 API 分类"
                style="width: 100%; margin-bottom: 12px"
                @change="onCategoryChange"
              >
                <el-option
                  v-for="category in apiCategories"
                  :key="category.value"
                  :label="category.label"
                  :value="category.value"
                />
              </el-select>
              
              <el-select 
                v-model="selectedApi" 
                placeholder="选择要测试的 API"
                style="width: 100%"
                @change="onApiChange"
                filterable
              >
                <el-option
                  v-for="api in filteredApiList"
                  :key="api.action"
                  :label="`${api.label} (${api.action})`"
                  :value="api.action"
                >
                  <div class="api-option">
                    <div class="api-option-content">
                      <div class="api-option-label">{{ api.label }}</div>
                      <div class="api-option-action">{{ api.action }}</div>
                    </div>
                    <el-tag size="small" type="info">{{ api.category }}</el-tag>
                  </div>
                </el-option>
              </el-select>
              
              <div v-if="selectedApiInfo" class="api-info">
                <h4>{{ selectedApiInfo.label }}</h4>
                <p>{{ selectedApiInfo.description }}</p>
                <el-tag size="small" type="info">{{ selectedApiInfo.action }}</el-tag>
              </div>
              
              <!-- 预设测试用例 -->
              <div class="preset-tests">
                <h4>快速测试</h4>
                <el-button 
                  v-for="preset in presetTests" 
                  :key="preset.name"
                  size="small"
                  type="info"
                  @click="loadPreset(preset)"
                  style="margin: 4px"
                >
                  {{ preset.name }}
                </el-button>
              </div>
            </div>
          </el-col>
          
          <!-- 右侧：参数配置 -->
          <el-col :span="16">
            <div class="parameter-config">
              <h3>参数配置</h3>
              
              <!-- 表单模式 -->
              <div v-if="selectedApiInfo && selectedApiInfo.parameters" class="params-form">
                <el-form :model="requestParams" label-width="120px">
                  <el-form-item 
                    v-for="param in selectedApiInfo.parameters" 
                    :key="param.name"
                    :label="param.name"
                  >
                    <el-input
                      v-if="param.type === 'string'"
                      v-model="requestParams[param.name]"
                      :placeholder="param.description"
                    />
                    <el-input-number
                      v-else-if="param.type === 'number'"
                      v-model="requestParams[param.name]"
                      :placeholder="param.description"
                    />
                    <el-select
                      v-else-if="param.type === 'select'"
                      v-model="requestParams[param.name]"
                      :placeholder="param.description"
                    >
                      <el-option
                        v-for="option in param.options"
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
                      />
                    </el-select>
                    <el-input
                      v-else
                      v-model="requestParams[param.name]"
                      type="textarea"
                      :rows="3"
                      :placeholder="param.description"
                    />
                  </el-form-item>
                </el-form>
              </div>
              
              <div class="action-buttons">
                <el-button 
                  type="primary" 
                  @click="sendRequest"
                  :loading="loading"
                  :disabled="!selectedApi"
                >
                  <el-icon><Right /></el-icon>
                  发送请求
                </el-button>
                <el-button @click="clearResponse">
                  <el-icon><Delete /></el-icon>
                  清除响应
                </el-button>
                <el-button 
                  type="success" 
                  @click="showBatchTest"
                  :disabled="!connectionStatus.connected"
                >
                  <el-icon><Document /></el-icon>
                  批量测试
                </el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      
      <!-- 请求和响应显示 -->
      <div v-if="requestData || responseData" class="data-display">
        <el-row :gutter="20">
          <!-- 请求数据 -->
          <el-col :span="12">
            <div class="data-panel">
              <div class="data-panel-header">
                <h3>请求数据</h3>
                <el-button size="small" @click="copyRequestData">
                  <el-icon><CopyDocument /></el-icon>
                  复制
                </el-button>
              </div>
              <el-input
                v-model="requestData"
                type="textarea"
                :rows="10"
                readonly
                placeholder="请求数据将在这里显示..."
              />
            </div>
          </el-col>
          
          <!-- 响应数据 -->
          <el-col :span="12">
            <div class="data-panel">
              <div class="data-panel-header">
                <h3>响应数据</h3>
                <div class="data-panel-actions">
                  <el-button size="small" @click="copyResponseData">
                    <el-icon><CopyDocument /></el-icon>
                    复制
                  </el-button>
                  <el-button size="small" @click="formatResponse">
                    <el-icon><Operation /></el-icon>
                    格式化
                  </el-button>
                </div>
              </div>
              <el-input
                v-model="responseData"
                type="textarea"
                :rows="10"
                readonly
                placeholder="响应数据将在这里显示..."
              />
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
    
    <!-- 批量测试对话框 -->
    <BatchTestDialog 
      v-model="batchTestVisible"
    />
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
  QuestionFilled, 
  Document,
  CopyDocument,
  Operation,
  Search
} from '@element-plus/icons-vue'
import { checkConnection } from '../../services/ankiConnect/index.js'
import { apiList, apiCategories } from './ApiList.js'
import { presetTests } from './PresetTests.js'
import BatchTestDialog from './BatchTestDialog.vue'

export default {
  name: 'ApiTester',
  components: {
    Connection,
    Right,
    Delete,
    Refresh,
    QuestionFilled,
    Document,
    CopyDocument,
    Operation,
    Search,
    BatchTestDialog
  },
  setup() {
    const connectionStatus = reactive({
      connected: false,
      error: null,
      version: null
    })
    
    const selectedApi = ref('')
    const requestParams = reactive({})
    const loading = ref(false)
    const requestData = ref('')
    const responseData = ref('')
    const checkingConnection = ref(false)

    // 状态变量
    const apiSearchKeyword = ref('')
    const selectedCategory = ref('')
    const batchTestVisible = ref(false)

    // 过滤后的 API 列表
    const filteredApiList = computed(() => {
      let filtered = apiList
      
      // 按分类过滤
      if (selectedCategory.value) {
        filtered = filtered.filter(api => api.category === selectedCategory.value)
      }
      
      // 按搜索关键词过滤
      if (apiSearchKeyword.value) {
        filtered = filtered.filter(api => 
          api.label.toLowerCase().includes(apiSearchKeyword.value.toLowerCase()) ||
          api.action.toLowerCase().includes(apiSearchKeyword.value.toLowerCase()) ||
          api.description.toLowerCase().includes(apiSearchKeyword.value.toLowerCase())
        )
      }
      
      return filtered
    })

    // 当前选中的API信息
    const selectedApiInfo = computed(() => {
      return apiList.find(api => api.action === selectedApi.value)
    })

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

    // API 选择变化
    const onApiChange = () => {
      // 清空参数
      Object.keys(requestParams).forEach(key => {
        delete requestParams[key]
      })
      
      // 设置默认参数
      if (selectedApiInfo.value && selectedApiInfo.value.parameters) {
        selectedApiInfo.value.parameters.forEach(param => {
          requestParams[param.name] = ''
        })
      }
    }

    // 分类变化
    const onCategoryChange = () => {
      apiSearchKeyword.value = ''
      selectedApi.value = ''
      onApiChange()
    }

    // 发送请求
    const sendRequest = async () => {
      if (!selectedApi.value) {
        ElMessage.warning('请先选择要测试的 API')
        return
      }

      if (!connectionStatus.connected) {
        ElMessage.error('未连接到 AnkiConnect')
        return
      }

      try {
        loading.value = true
        
        // 构建请求数据
        const request = {
          action: selectedApi.value,
          version: 6,
          params: { ...requestParams }
        }
        
        // 显示请求数据
        requestData.value = JSON.stringify(request, null, 2)
        
        // 发送请求
        const response = await fetch('http://localhost:8765', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(request)
        })

        const result = await response.json()
        
        // 显示响应数据
        responseData.value = JSON.stringify(result, null, 2)
        
        if (result.error) {
          ElMessage.error(`API 调用失败: ${result.error}`)
        } else {
          ElMessage.success('API 调用成功')
        }
        
      } catch (error) {
        console.error('API 调用失败:', error)
        responseData.value = JSON.stringify({
          error: error.message,
          stack: error.stack
        }, null, 2)
        
        ElMessage.error(`请求失败: ${error.message}`)
      } finally {
        loading.value = false
      }
    }

    // 清除响应
    const clearResponse = () => {
      requestData.value = ''
      responseData.value = ''
    }

    // 加载预设测试用例
    const loadPreset = (preset) => {
      selectedApi.value = preset.action
      onApiChange()
      
      if (preset.params) {
        Object.assign(requestParams, preset.params)
      }
      
      requestData.value = JSON.stringify({
        action: preset.action,
        version: 6,
        params: preset.params
      }, null, 2)
      responseData.value = ''
      
      ElMessage.success(`已加载预设测试用例: ${preset.name}`)
    }

    // 显示连接帮助
    const showConnectionHelp = () => {
      ElMessage.info('请确保 Anki 已启动并安装了 AnkiConnect 插件。\n' +
                      '插件版本至少为 20230220 或更高。\n' +
                      '插件地址：https://github.com/FooSoft/anki-connect/releases')
    }

    // 显示批量测试对话框
    const showBatchTest = () => {
      batchTestVisible.value = true
    }

    // 复制请求数据
    const copyRequestData = () => {
      navigator.clipboard.writeText(requestData.value).then(() => {
        ElMessage.success('请求数据已复制到剪贴板')
      }).catch(() => {
        ElMessage.error('复制请求数据失败')
      })
    }

    // 复制响应数据
    const copyResponseData = () => {
      navigator.clipboard.writeText(responseData.value).then(() => {
        ElMessage.success('响应数据已复制到剪贴板')
      }).catch(() => {
        ElMessage.error('复制响应数据失败')
      })
    }

    // 格式化响应数据
    const formatResponse = () => {
      try {
        const parsed = JSON.parse(responseData.value)
        responseData.value = JSON.stringify(parsed, null, 2)
        ElMessage.success('响应数据已格式化')
      } catch (e) {
        ElMessage.error('响应数据不是有效的 JSON 格式，无法格式化。')
      }
    }

    onMounted(() => {
      checkConnectionStatus()
    })

    return {
      connectionStatus,
      selectedApi,
      selectedApiInfo,
      requestParams,
      loading,
      requestData,
      responseData,
      apiList,
      apiCategories,
      filteredApiList,
      apiSearchKeyword,
      selectedCategory,
      batchTestVisible,
      presetTests,
      onApiChange,
      onCategoryChange,
      sendRequest,
      clearResponse,
      loadPreset,
      checkingConnection,
      showConnectionHelp,
      showBatchTest,
      copyRequestData,
      copyResponseData,
      formatResponse
    }
  }
}
</script>

<style scoped>
.api-tester {
  padding: 20px;
}

.card-header {
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

.api-test-area {
  margin-bottom: 20px;
}

.api-selector h3,
.parameter-config h3 {
  margin: 0 0 16px 0;
  color: #303133;
}

.api-info {
  margin-top: 16px;
  padding: 12px;
  background-color: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #e4e7ed;
}

.api-info h4 {
  margin: 0 0 8px 0;
  color: #409EFF;
}

.api-info p {
  margin: 0 0 8px 0;
  color: #606266;
  font-size: 14px;
}

.params-form {
  margin-bottom: 16px;
}

.action-buttons {
  display: flex;
  gap: 12px;
}

.preset-tests {
  margin-top: 20px;
}

.preset-tests h4 {
  margin: 0 0 12px 0;
  color: #303133;
}

.data-display {
  margin-bottom: 20px;
}

.data-panel {
  position: relative;
}

.data-panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #ebeef5;
}

.data-panel-header h3 {
  margin: 0;
  color: #303133;
}

.data-panel-actions {
  display: flex;
  gap: 10px;
}

.api-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.api-option:hover {
  background-color: #ecf5ff;
}

.api-option-content {
  flex-grow: 1;
}

.api-option-label {
  font-weight: bold;
  color: #303133;
}

.api-option-action {
  font-size: 12px;
  color: #909399;
}
</style> 