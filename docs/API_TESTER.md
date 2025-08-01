# API 测试工具技术文档

## 概述

API 测试工具是 Anki Editor 项目中的一个核心组件，提供了完整的 AnkiConnect API 测试和调试功能。该工具采用 Vue 3 Composition API 开发，使用 Element Plus 组件库构建用户界面。

## 技术架构

### 技术栈
- **前端框架**: Vue 3 (Composition API)
- **UI 组件库**: Element Plus
- **状态管理**: Vue 3 Reactive API
- **HTTP 客户端**: Fetch API
- **构建工具**: Vite

### 组件结构
```
ApiTester.vue
├── 模板部分 (Template)
│   ├── 连接状态检测
│   ├── API 选择器
│   ├── 参数配置表单
│   ├── 请求/响应显示
│   ├── 测试历史记录
│   └── 预设测试用例
├── 脚本部分 (Script)
│   ├── 状态管理
│   ├── 方法实现
│   ├── 生命周期
│   └── 返回值
└── 样式部分 (Style)
    ├── 布局样式
    ├── 组件样式
    └── 响应式设计
```

## 核心功能实现

### 1. 连接状态管理

**状态定义**
```javascript
const connectionStatus = reactive({
  connected: false,
  error: null,
  version: null
})
```

**连接检测方法**
```javascript
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
```

**UI 显示**
```vue
<el-alert
  :title="connectionStatus.connected ? '已连接到 AnkiConnect' : '未连接到 AnkiConnect'"
  :type="connectionStatus.connected ? 'success' : 'error'"
  :description="connectionStatus.error || '请确保 Anki 已启动并安装了 AnkiConnect 插件'"
  show-icon
  :closable="false"
/>
```

### 2. API 方法选择

**API 列表定义**
```javascript
const apiList = [
  {
    action: 'version',
    label: '获取版本',
    description: '获取 AnkiConnect 版本信息',
    parameters: []
  },
  {
    action: 'deckNames',
    label: '获取牌组列表',
    description: '获取所有牌组名称',
    parameters: []
  },
  // ... 更多 API 定义
]
```

**动态选择器**
```vue
<el-select 
  v-model="selectedApi" 
  placeholder="选择要测试的 API"
  style="width: 100%"
  @change="onApiChange"
>
  <el-option
    v-for="api in apiList"
    :key="api.action"
    :label="api.label"
    :value="api.action"
  />
</el-select>
```

### 3. 参数配置系统

**参数类型支持**
```javascript
// 字符串参数
{
  name: 'deck',
  type: 'string',
  description: '牌组名称'
}

// 数字参数
{
  name: 'limit',
  type: 'number',
  description: '限制数量'
}

// 选择参数
{
  name: 'includeSched',
  type: 'select',
  description: '是否包含学习进度',
  options: [
    { label: '是', value: true },
    { label: '否', value: false }
  ]
}

// 文本域参数
{
  name: 'note',
  type: 'textarea',
  description: '笔记对象，JSON格式'
}
```

**动态表单生成**
```vue
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
```

### 4. 请求发送机制

**请求构建**
```javascript
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
    
    // 添加到历史记录
    const historyItem = {
      timestamp: Date.now(),
      action: selectedApi.value,
      status: result.error ? 'error' : 'success',
      message: result.error || '请求成功',
      request: request,
      response: result
    }
    
    history.value.unshift(historyItem)
    
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
    
    // 添加到历史记录
    const historyItem = {
      timestamp: Date.now(),
      action: selectedApi.value,
      status: 'error',
      message: error.message,
      request: requestData.value,
      response: { error: error.message }
    }
    
    history.value.unshift(historyItem)
  } finally {
    loading.value = false
  }
}
```

### 5. 预设测试用例

**预设定义**
```javascript
const presetTests = [
  { name: '获取版本', action: 'version', params: {} },
  { name: '获取牌组列表', action: 'deckNames', params: {} },
  { name: '获取模型名称', action: 'getModelNames', params: {} },
  { name: '获取集合统计', action: 'getCollectionStats', params: {} },
  { name: '同步', action: 'sync', params: {} }
]
```

**预设加载**
```javascript
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
  responseData.value = '' // 预设测试用例没有响应数据，清空
  
  ElMessage.success(`已加载预设测试用例: ${preset.name}`)
}
```

### 6. 历史记录管理

**历史记录结构**
```javascript
const history = ref([])

// 历史记录项结构
{
  timestamp: Date.now(),
  action: selectedApi.value,
  status: result.error ? 'error' : 'success',
  message: result.error || '请求成功',
  request: request,
  response: result
}
```

**历史记录显示**
```vue
<el-table :data="history" style="width: 100%">
  <el-table-column prop="timestamp" label="时间" width="180">
    <template #default="scope">
      {{ new Date(scope.row.timestamp).toLocaleString() }}
    </template>
  </el-table-column>
  <el-table-column prop="action" label="API" width="150" />
  <el-table-column prop="status" label="状态" width="100">
    <template #default="scope">
      <el-tag :type="scope.row.status === 'success' ? 'success' : 'danger'">
        {{ scope.row.status === 'success' ? '成功' : '失败' }}
      </el-tag>
    </template>
  </el-table-column>
  <el-table-column prop="message" label="消息" />
  <el-table-column label="操作" width="120">
    <template #default="scope">
      <el-button 
        size="small" 
        @click="loadHistoryItem(scope.row)"
      >
        重新加载
      </el-button>
    </template>
  </el-table-column>
</el-table>
```

## 错误处理机制

### 1. 网络错误处理
```javascript
try {
  const response = await fetch('http://localhost:8765', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request)
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const result = await response.json()
  
  if (result.error) {
    throw new Error(result.error)
  }
  
  return result
} catch (error) {
  console.error('API 调用失败:', error)
  throw error
}
```

### 2. 参数验证
```javascript
const validateParams = (api, params) => {
  if (!api.parameters) return true
  
  for (const param of api.parameters) {
    if (param.required && !params[param.name]) {
      throw new Error(`参数 ${param.name} 是必需的`)
    }
  }
  
  return true
}
```

### 3. 用户友好错误提示
```javascript
const showError = (error) => {
  let message = '请求失败'
  
  if (error.message.includes('fetch')) {
    message = '网络连接失败，请检查 AnkiConnect 是否启动'
  } else if (error.message.includes('JSON')) {
    message = '响应数据格式错误'
  } else {
    message = error.message
  }
  
  ElMessage.error(message)
}
```

## 性能优化

### 1. 防抖处理
```javascript
import { debounce } from 'lodash-es'

const debouncedCheckConnection = debounce(checkConnectionStatus, 1000)
```

### 2. 内存管理
```javascript
// 限制历史记录数量
const addToHistory = (item) => {
  history.value.unshift(item)
  if (history.value.length > 50) {
    history.value = history.value.slice(0, 50)
  }
}
```

### 3. 组件卸载清理
```javascript
onUnmounted(() => {
  // 清理定时器
  if (connectionTimer) {
    clearInterval(connectionTimer)
  }
  
  // 清理历史记录
  history.value = []
})
```

## 扩展指南

### 1. 添加新的 API 方法

1. **在 apiList 中添加定义**
```javascript
{
  action: 'newApi',
  label: '新 API 方法',
  description: 'API 功能描述',
  parameters: [
    {
      name: 'param1',
      type: 'string',
      description: '参数描述'
    }
  ]
}
```

2. **添加预设测试（如适用）**
```javascript
{ name: '测试新 API', action: 'newApi', params: {} }
```

### 2. 自定义参数类型

1. **添加新的参数类型**
```javascript
// 在参数配置中添加新类型
{
  name: 'customParam',
  type: 'custom',
  description: '自定义参数',
  component: 'CustomComponent'
}
```

2. **在模板中添加对应的组件**
```vue
<CustomComponent
  v-else-if="param.type === 'custom'"
  v-model="requestParams[param.name]"
  :config="param.config"
/>
```

### 3. 扩展错误处理

1. **添加新的错误类型**
```javascript
const ErrorTypes = {
  NETWORK: 'network',
  API: 'api',
  PARAMETER: 'parameter',
  CUSTOM: 'custom'
}
```

2. **实现错误处理器**
```javascript
const handleError = (error, type) => {
  switch (type) {
    case ErrorTypes.NETWORK:
      // 网络错误处理
      break
    case ErrorTypes.API:
      // API 错误处理
      break
    case ErrorTypes.PARAMETER:
      // 参数错误处理
      break
    default:
      // 默认错误处理
  }
}
```

## 测试指南

### 1. 单元测试
```javascript
// 测试连接状态检测
describe('checkConnectionStatus', () => {
  it('should update connection status on success', async () => {
    // 测试实现
  })
  
  it('should handle connection errors', async () => {
    // 测试实现
  })
})
```

### 2. 集成测试
```javascript
// 测试 API 请求发送
describe('sendRequest', () => {
  it('should send request with correct parameters', async () => {
    // 测试实现
  })
  
  it('should handle API errors', async () => {
    // 测试实现
  })
})
```

### 3. 端到端测试
```javascript
// 测试完整的用户流程
describe('API Tester E2E', () => {
  it('should complete full API testing workflow', async () => {
    // 测试实现
  })
})
```

## 部署说明

### 1. 构建配置
```javascript
// vite.config.js
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'element-plus': ['element-plus'],
          'icons': ['@element-plus/icons-vue']
        }
      }
    }
  }
})
```

### 2. 环境变量
```javascript
// .env
VITE_ANKI_CONNECT_URL=http://localhost:8765
VITE_API_VERSION=6
```

### 3. 生产环境优化
```javascript
// 生产环境配置
const isProduction = process.env.NODE_ENV === 'production'

if (isProduction) {
  // 禁用开发工具
  // 启用性能监控
  // 配置错误上报
}
```

## 维护指南

### 1. 日志记录
```javascript
const logger = {
  info: (message, data) => {
    console.log(`[API Tester] ${message}`, data)
  },
  error: (message, error) => {
    console.error(`[API Tester] ${message}`, error)
  },
  warn: (message, data) => {
    console.warn(`[API Tester] ${message}`, data)
  }
}
```

### 2. 监控指标
```javascript
const metrics = {
  requestCount: 0,
  successCount: 0,
  errorCount: 0,
  averageResponseTime: 0
}

const updateMetrics = (success, responseTime) => {
  metrics.requestCount++
  if (success) {
    metrics.successCount++
  } else {
    metrics.errorCount++
  }
  metrics.averageResponseTime = 
    (metrics.averageResponseTime + responseTime) / 2
}
```

### 3. 版本管理
```javascript
const VERSION = '1.0.0'

const checkForUpdates = async () => {
  try {
    const response = await fetch('/api/version')
    const latestVersion = await response.json()
    
    if (latestVersion.version !== VERSION) {
      ElMessage.info('发现新版本，请更新应用')
    }
  } catch (error) {
    console.warn('无法检查更新:', error)
  }
}
```

## 故障排除

### 1. 常见问题

**问题**: 无法连接到 AnkiConnect
**解决方案**:
1. 确认 Anki 已启动
2. 检查 AnkiConnect 插件是否已安装
3. 验证插件版本兼容性
4. 检查防火墙设置

**问题**: API 请求失败
**解决方案**:
1. 检查请求参数格式
2. 验证 API 方法名称
3. 查看错误日志
4. 尝试预设测试用例

**问题**: 界面无响应
**解决方案**:
1. 检查浏览器控制台错误
2. 刷新页面
3. 清除浏览器缓存
4. 检查网络连接

### 2. 调试工具

**启用调试模式**
```javascript
const DEBUG = process.env.NODE_ENV === 'development'

if (DEBUG) {
  console.log('API Tester Debug Mode Enabled')
  window.apiTesterDebug = {
    connectionStatus,
    selectedApi,
    requestParams,
    history
  }
}
```

**性能监控**
```javascript
const performanceMonitor = {
  start: (name) => {
    performance.mark(`${name}-start`)
  },
  end: (name) => {
    performance.mark(`${name}-end`)
    performance.measure(name, `${name}-start`, `${name}-end`)
    const measure = performance.getEntriesByName(name)[0]
    console.log(`${name}: ${measure.duration}ms`)
  }
}
```

## 更新日志

### v1.0.0 (2024-01-XX)
- 初始版本发布
- 实现基础 API 测试功能
- 支持 9 个常用 AnkiConnect API
- 添加预设测试用例
- 实现历史记录功能
- 完善错误处理机制

### 计划功能
- 批量测试功能
- 结果导出功能
- 更多 API 方法支持
- 性能优化
- 单元测试覆盖 