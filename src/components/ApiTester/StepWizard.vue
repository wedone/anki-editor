<template>
  <div class="step-wizard">
    <el-card>
      <template #header>
        <div class="wizard-header">
          <el-icon><Connection /></el-icon>
          <span>AnkiConnect API 测试向导</span>
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
      
      <!-- 步骤导航 -->
      <el-steps :active="currentStep" finish-status="success" class="wizard-steps">
        <el-step title="选择操作类型" description="选择要执行的操作类型" />
        <el-step title="选择具体操作" description="选择具体的 API 操作" />
        <el-step title="配置参数" description="配置必要的参数" />
        <el-step title="执行测试" description="执行 API 测试" />
      </el-steps>
      
      <!-- 步骤内容 -->
      <div class="step-content">
        <!-- 步骤 1: 选择操作类型 -->
        <div v-if="currentStep === 0" class="step-panel">
          <h3>选择操作类型</h3>
          <p class="step-description">请选择您要执行的操作类型：</p>
          
          <div class="operation-categories">
            <el-card 
              v-for="category in operationCategories" 
              :key="category.value"
              class="category-card"
              :class="{ 'selected': selectedCategory === category.value }"
              @click="selectCategory(category.value)"
            >
              <div class="category-content">
                <el-icon class="category-icon">
                  <component :is="category.icon" />
                </el-icon>
                <div class="category-info">
                  <h4>{{ category.label }}</h4>
                  <p>{{ category.description }}</p>
                </div>
              </div>
            </el-card>
          </div>
        </div>
        
        <!-- 步骤 2: 选择具体操作 -->
        <div v-if="currentStep === 1" class="step-panel">
          <h3>选择具体操作</h3>
          <p class="step-description">请选择要执行的具体操作：</p>
          
          <div class="operation-list">
            <el-card 
              v-for="operation in filteredOperations" 
              :key="operation.action"
              class="operation-card"
              :class="{ 'selected': selectedOperation === operation.action }"
              @click="selectOperation(operation.action)"
            >
              <div class="operation-content">
                <div class="operation-info">
                  <h4>{{ operation.label }}</h4>
                  <p>{{ operation.description }}</p>
                  <el-tag size="small" type="info">{{ operation.action }}</el-tag>
                </div>
              </div>
            </el-card>
          </div>
        </div>
        
        <!-- 步骤 3: 配置参数 -->
        <div v-if="currentStep === 2" class="step-panel">
          <h3>配置参数</h3>
          <p class="step-description">配置必要的参数：</p>
          
          <div v-if="selectedOperationInfo" class="parameter-config">
            <div class="operation-summary">
              <h4>{{ selectedOperationInfo.label }}</h4>
              <p>{{ selectedOperationInfo.description }}</p>
            </div>
            
            <el-form :model="parameters" label-width="120px" class="parameter-form">
              <el-form-item 
                v-for="param in selectedOperationInfo.parameters" 
                :key="param.name"
                :label="param.name"
              >
                <el-input
                  v-model="parameters[param.name]"
                  :placeholder="param.description"
                />
              </el-form-item>
            </el-form>
          </div>
        </div>
        
        <!-- 步骤 4: 执行测试 -->
        <div v-if="currentStep === 3" class="step-panel">
          <h3>执行测试</h3>
          <p class="step-description">确认并执行 API 测试：</p>
          
          <div class="test-summary">
            <el-descriptions title="测试摘要" :column="1" border>
              <el-descriptions-item label="操作类型">
                {{ getCategoryLabel(selectedCategory) }}
              </el-descriptions-item>
              <el-descriptions-item label="具体操作">
                {{ selectedOperationInfo?.label }}
              </el-descriptions-item>
              <el-descriptions-item label="API 方法">
                {{ selectedOperationInfo?.action }}
              </el-descriptions-item>
            </el-descriptions>
            
            <div class="test-actions">
              <el-button 
                type="primary" 
                size="large"
                @click="executeTest"
                :loading="loading"
              >
                <el-icon><Right /></el-icon>
                执行测试
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
      
      <!-- 步骤导航按钮 -->
      <div class="step-actions">
        <el-button 
          v-if="currentStep > 0" 
          @click="prevStep"
        >
          上一步
        </el-button>
        <el-button 
          v-if="currentStep < 3" 
          type="primary" 
          @click="nextStep"
          :disabled="!canProceed"
        >
          下一步
        </el-button>
        <el-button 
          v-if="currentStep === 3" 
          type="success" 
          @click="finishWizard"
        >
          完成
        </el-button>
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
  Refresh,
  Collection,
  Document,
  Edit,
  Setting,
  DataAnalysis,
  Picture,
  More
} from '@element-plus/icons-vue'
import { checkConnection } from '../../services/ankiConnect/index.js'
import { apiList } from './ApiList.js'

export default {
  name: 'StepWizard',
  components: {
    Connection,
    Right,
    Refresh,
    Collection,
    Document,
    Edit,
    Setting,
    DataAnalysis,
    Picture,
    More
  },
  setup() {
    const currentStep = ref(0)
    const selectedCategory = ref('')
    const selectedOperation = ref('')
    const parameters = reactive({})
    const loading = ref(false)
    const checkingConnection = ref(false)
    const testResult = ref(null)
    
    const connectionStatus = reactive({
      connected: false,
      error: null,
      version: null
    })

    // 操作类型分类
    const operationCategories = [
      {
        value: '基础操作',
        label: '基础操作',
        description: '获取版本、同步等基础功能',
        icon: 'Setting'
      },
      {
        value: '牌组操作',
        label: '牌组管理',
        description: '创建、删除、查询牌组',
        icon: 'Collection'
      },
      {
        value: '卡片操作',
        label: '卡片管理',
        description: '查找、获取、更新卡片',
        icon: 'Document'
      },
      {
        value: '笔记操作',
        label: '笔记管理',
        description: '添加、更新、删除笔记',
        icon: 'Edit'
      },
      {
        value: '标签操作',
        label: '标签管理',
        description: '添加、删除、替换标签',
        icon: 'More'
      },
      {
        value: '模型操作',
        label: '模型管理',
        description: '创建、更新笔记类型',
        icon: 'Setting'
      },
      {
        value: '统计操作',
        label: '统计分析',
        description: '获取学习统计信息',
        icon: 'DataAnalysis'
      },
      {
        value: '媒体操作',
        label: '媒体文件',
        description: '上传、下载媒体文件',
        icon: 'Picture'
      },
      {
        value: '其他操作',
        label: '其他功能',
        description: '导入导出、集合管理等',
        icon: 'More'
      }
    ]

    // 过滤后的操作列表
    const filteredOperations = computed(() => {
      if (!selectedCategory.value) return []
      return apiList.filter(api => api.category === selectedCategory.value)
    })

    // 当前选中的操作信息
    const selectedOperationInfo = computed(() => {
      return apiList.find(api => api.action === selectedOperation.value)
    })

    // 是否可以进入下一步
    const canProceed = computed(() => {
      switch (currentStep.value) {
        case 0:
          return selectedCategory.value !== ''
        case 1:
          return selectedOperation.value !== ''
        case 2:
          return true
        default:
          return true
      }
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

    // 选择操作类型
    const selectCategory = (category) => {
      selectedCategory.value = category
      selectedOperation.value = ''
      Object.keys(parameters).forEach(key => {
        delete parameters[key]
      })
    }

    // 选择具体操作
    const selectOperation = (operation) => {
      selectedOperation.value = operation
      // 清空参数
      Object.keys(parameters).forEach(key => {
        delete parameters[key]
      })
      // 设置默认参数
      if (selectedOperationInfo.value && selectedOperationInfo.value.parameters) {
        selectedOperationInfo.value.parameters.forEach(param => {
          parameters[param.name] = ''
        })
      }
    }

    // 获取分类标签
    const getCategoryLabel = (category) => {
      const found = operationCategories.find(c => c.value === category)
      return found ? found.label : category
    }

    // 下一步
    const nextStep = () => {
      if (canProceed.value && currentStep.value < 3) {
        currentStep.value++
      }
    }

    // 上一步
    const prevStep = () => {
      if (currentStep.value > 0) {
        currentStep.value--
      }
    }

    // 执行测试
    const executeTest = async () => {
      if (!connectionStatus.connected) {
        ElMessage.error('未连接到 AnkiConnect')
        return
      }

      try {
        loading.value = true
        
        const request = {
          action: selectedOperation.value,
          version: 6,
          params: { ...parameters }
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

    // 完成向导
    const finishWizard = () => {
      currentStep.value = 0
      selectedCategory.value = ''
      selectedOperation.value = ''
      Object.keys(parameters).forEach(key => {
        delete parameters[key]
      })
      testResult.value = null
      ElMessage.success('向导已完成，可以开始新的测试')
    }

    onMounted(() => {
      checkConnectionStatus()
    })

    return {
      currentStep,
      selectedCategory,
      selectedOperation,
      parameters,
      loading,
      checkingConnection,
      testResult,
      connectionStatus,
      operationCategories,
      filteredOperations,
      selectedOperationInfo,
      canProceed,
      checkConnectionStatus,
      selectCategory,
      selectOperation,
      getCategoryLabel,
      nextStep,
      prevStep,
      executeTest,
      finishWizard
    }
  }
}
</script>

<style scoped>
.step-wizard {
  padding: 20px;
}

.wizard-header {
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

.wizard-steps {
  margin-bottom: 30px;
}

.step-content {
  min-height: 400px;
}

.step-panel {
  padding: 20px 0;
}

.step-description {
  color: #606266;
  margin-bottom: 20px;
}

.operation-categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
}

.category-card {
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.category-card.selected {
  border-color: #409EFF;
  background-color: #ecf5ff;
}

.category-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.category-icon {
  font-size: 24px;
  color: #409EFF;
}

.category-info h4 {
  margin: 0 0 4px 0;
  color: #303133;
}

.category-info p {
  margin: 0;
  color: #606266;
  font-size: 14px;
}

.operation-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 16px;
}

.operation-card {
  cursor: pointer;
  transition: all 0.3s ease;
}

.operation-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.operation-card.selected {
  border-color: #409EFF;
  background-color: #ecf5ff;
}

.operation-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.operation-info h4 {
  margin: 0 0 8px 0;
  color: #303133;
}

.operation-info p {
  margin: 0 0 8px 0;
  color: #606266;
  font-size: 14px;
}

.parameter-config {
  max-width: 600px;
}

.operation-summary {
  margin-bottom: 20px;
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #e4e7ed;
}

.operation-summary h4 {
  margin: 0 0 8px 0;
  color: #409EFF;
}

.operation-summary p {
  margin: 0;
  color: #606266;
}

.parameter-form {
  margin-bottom: 20px;
}

.test-summary {
  margin-bottom: 20px;
}

.test-actions {
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

.step-actions {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
}
</style> 