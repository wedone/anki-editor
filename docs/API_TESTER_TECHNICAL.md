# 傻瓜化 API 测试工具技术文档

## 📋 概述

傻瓜化 API 测试工具是一个专为 AnkiConnect API 设计的可视化测试界面，旨在降低 API 测试的技术门槛，让不同水平的用户都能轻松进行 API 测试。

## 🏗️ 架构设计

### 整体架构
```
SimpleApiTester (主控制器)
├── StepWizard (步骤向导)
├── ParameterHelper (智能助手)
├── SmartInput (智能输入)
├── ApiTester (高级模式)
└── 配置模块
    ├── ApiList.js
    ├── PresetTests.js
    └── index.js
```

### 设计模式
- **策略模式**：三种测试模式可自由切换
- **工厂模式**：根据参数类型动态生成输入组件
- **观察者模式**：组件间通过事件通信
- **模板方法模式**：统一的测试流程

## 🎯 核心组件详解

### 1. SimpleApiTester.vue - 主控制器

**职责**：统一管理三种测试模式，提供模式切换和状态管理

**核心功能**：
```javascript
// 测试模式管理
const testMode = ref('wizard') // 'wizard' | 'helper' | 'advanced'

// 连接状态管理
const connectionStatus = reactive({
  connected: false,
  error: null,
  version: null
})

// 操作选择管理
const selectedOperation = ref('')
const currentParameters = reactive({})
```

**技术特点**：
- 使用 Vue 3 Composition API
- 响应式状态管理
- 组件间事件通信
- 动态组件渲染

### 2. StepWizard.vue - 步骤向导

**职责**：提供 4 步简单流程，适合新手用户

**步骤流程**：
1. **选择操作类型**：9 个主要操作类型
2. **选择具体操作**：根据类型过滤的操作列表
3. **配置参数**：智能参数配置界面
4. **执行测试**：测试执行和结果展示

**技术实现**：
```javascript
// 步骤状态管理
const currentStep = ref(0)
const canProceed = computed(() => {
  switch (currentStep.value) {
    case 0: return selectedCategory.value !== ''
    case 1: return selectedOperation.value !== ''
    case 2: return true
    default: return true
  }
})

// 操作分类配置
const operationCategories = [
  { value: '基础操作', label: '基础操作', icon: 'Setting' },
  { value: '牌组操作', label: '牌组管理', icon: 'Collection' },
  // ... 更多分类
]
```

### 3. ParameterHelper.vue - 智能参数助手

**职责**：提供智能参数配置和快速操作

**核心功能**：
- 智能参数建议
- 快速操作按钮
- 实时参数预览
- 使用建议展示

**技术实现**：
```javascript
// 快速操作配置
const quickActions = computed(() => {
  if (!currentOperation.value) return []
  
  const actions = []
  switch (currentOperation.value.action) {
    case 'findCards':
      actions.push(
        { name: '查找所有卡片', action: () => setParameter('query', 'deck:*') },
        { name: '查找到期卡片', action: () => setParameter('query', 'is:due') }
      )
      break
    // ... 更多操作类型
  }
  return actions
})

// 参数变化处理
const handleParametersChanged = (parameters) => {
  Object.assign(currentParameters, parameters)
}
```

### 4. SmartInput.vue - 智能输入组件

**职责**：根据参数类型提供智能输入界面

**支持的输入类型**：
- 字符串输入（带智能建议）
- 数字输入
- 选择框
- 文本域

**智能建议系统**：
```javascript
const suggestions = computed(() => {
  const suggestions = []
  
  switch (props.param.name) {
    case 'query':
      suggestions.push(
        { value: 'deck:*', label: '所有牌组', description: '查找所有牌组的卡片' },
        { value: 'is:due', label: '到期卡片', description: '查找需要复习的卡片' }
      )
      break
    case 'deck':
      suggestions.push(
        { value: '默认', label: '默认牌组', description: '使用默认牌组' },
        { value: '英语词汇', label: '英语词汇', description: '使用英语词汇牌组' }
      )
      break
    // ... 更多参数类型
  }
  
  return suggestions
})
```

## 🔧 技术实现细节

### 1. 响应式数据管理

**状态管理策略**：
```javascript
// 全局状态
const connectionStatus = reactive({
  connected: false,
  error: null,
  version: null
})

// 局部状态
const testMode = ref('wizard')
const selectedOperation = ref('')
const currentParameters = reactive({})

// 计算属性
const selectedOperationInfo = computed(() => {
  return apiList.find(api => api.action === selectedOperation.value)
})
```

### 2. 组件通信机制

**事件发射**：
```javascript
// 参数变化事件
emit('parameters-changed', { ...parameters })

// 建议选择事件
emit('suggestion-selected', props.param.name, value)
```

**事件监听**：
```javascript
// 参数变化处理
const handleParametersChanged = (parameters) => {
  Object.assign(currentParameters, parameters)
}

// 建议选择处理
const handleSuggestionSelected = (paramName, value) => {
  parameters[paramName] = value
  emit('parameters-changed', { ...parameters })
}
```

### 3. 动态组件渲染

**条件渲染**：
```vue
<!-- 步骤向导模式 -->
<StepWizard v-if="testMode === 'wizard'" />

<!-- 智能助手模式 -->
<div v-else-if="testMode === 'helper'" class="helper-mode">
  <!-- 助手模式内容 -->
</div>

<!-- 高级模式 -->
<ApiTester v-else-if="testMode === 'advanced'" />
```

**动态输入组件**：
```vue
<!-- 字符串输入 -->
<el-input v-if="param.type === 'string'" />

<!-- 数字输入 -->
<el-input-number v-else-if="param.type === 'number'" />

<!-- 选择框 -->
<el-select v-else-if="param.type === 'select'">
  <el-option v-for="option in param.options" />
</el-select>

<!-- 文本域 -->
<el-input v-else type="textarea" />
```

## 🎨 用户界面设计

### 1. 视觉层次

**卡片式设计**：
- 操作类型卡片：直观的分类展示
- 操作选择卡片：清晰的功能描述
- 参数配置卡片：结构化的表单布局

**色彩系统**：
- 主色调：#409EFF（Element Plus 蓝）
- 成功色：#67C23A
- 警告色：#E6A23C
- 错误色：#F56C6C

### 2. 交互设计

**状态反馈**：
- 连接状态：实时显示连接状态
- 操作状态：加载状态和进度提示
- 结果状态：成功/失败状态展示

**操作引导**：
- 步骤导航：清晰的进度指示
- 智能建议：上下文相关的建议
- 快速操作：一键设置常用参数

### 3. 响应式布局

**断点设计**：
- 桌面端：≥1200px，三列布局
- 平板端：768px-1199px，两列布局
- 移动端：<768px，单列布局

**自适应组件**：
```css
.operation-categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
}
```

## 🔍 智能功能详解

### 1. 智能参数建议

**建议生成逻辑**：
```javascript
// 根据参数名称和类型生成建议
switch (props.param.name) {
  case 'query':
    // 查询参数建议
    suggestions.push(
      { value: 'deck:*', label: '所有牌组', description: '查找所有牌组的卡片' },
      { value: 'is:due', label: '到期卡片', description: '查找需要复习的卡片' }
    )
    break
  case 'deck':
    // 牌组参数建议
    suggestions.push(
      { value: '默认', label: '默认牌组', description: '使用默认牌组' },
      { value: '英语词汇', label: '英语词汇', description: '使用英语词汇牌组' }
    )
    break
  // ... 更多参数类型
}
```

**建议展示界面**：
- 下拉面板设计
- 建议项包含标签和描述
- 一键应用建议功能

### 2. 快速操作按钮

**操作配置**：
```javascript
// 根据操作类型提供快速设置
switch (currentOperation.value.action) {
  case 'findCards':
    actions.push(
      { name: '查找所有卡片', action: () => setParameter('query', 'deck:*') },
      { name: '查找到期卡片', action: () => setParameter('query', 'is:due') }
    )
    break
  case 'addNote':
    actions.push(
      { name: '基础笔记模板', action: () => setParameter('note', getBasicNoteTemplate()) },
      { name: '带标签笔记模板', action: () => setParameter('note', getTaggedNoteTemplate()) }
    )
    break
}
```

### 3. 模板预设系统

**模板生成函数**：
```javascript
// 基础笔记模板
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

// 带标签笔记模板
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
```

## 🔧 错误处理机制

### 1. 连接错误处理

**连接状态检测**：
```javascript
const checkConnectionStatus = async () => {
  try {
    const result = await checkConnection()
    connectionStatus.connected = result.connected
    connectionStatus.error = result.error
    connectionStatus.version = result.version
  } catch (error) {
    connectionStatus.connected = false
    connectionStatus.error = error.message
  }
}
```

### 2. API 错误处理

**请求错误处理**：
```javascript
const executeTest = async () => {
  try {
    const response = await fetch('http://localhost:8765', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    })
    
    const result = await response.json()
    
    if (result.error) {
      ElMessage.error(`API 调用失败: ${result.error}`)
    } else {
      ElMessage.success('API 调用成功')
    }
  } catch (error) {
    console.error('测试失败:', error)
    ElMessage.error(`请求失败: ${error.message}`)
  }
}
```

## 📚 最佳实践

### 1. 代码组织

**文件结构**：
```
src/components/ApiTester/
├── index.js                    # 模块入口
├── SimpleApiTester.vue        # 主控制器
├── StepWizard.vue             # 步骤向导
├── ParameterHelper.vue         # 智能助手
├── SmartInput.vue             # 智能输入
├── ApiTester.vue              # 高级模式
├── ApiList.js                 # API 配置
├── PresetTests.js             # 预设测试
└── utils/                     # 工具函数
    ├── validation.js          # 参数验证
    ├── templates.js           # 模板生成
    └── suggestions.js         # 建议生成
```

### 2. 命名规范

**组件命名**：
- 使用 PascalCase：`SimpleApiTester`
- 描述性名称：`ParameterHelper`
- 功能明确：`SmartInput`

**变量命名**：
- 使用 camelCase：`selectedOperation`
- 布尔值使用 is 前缀：`isConnected`
- 常量使用 UPPER_SNAKE_CASE：`API_BASE_URL`

### 3. 注释规范

**代码注释**：
```javascript
/**
 * 智能参数建议生成器
 * @param {Object} param - 参数配置对象
 * @param {string} param.name - 参数名称
 * @param {string} param.type - 参数类型
 * @returns {Array} 建议列表
 */
const generateSuggestions = (param) => {
  // 实现逻辑
}
```

## 🚀 未来规划

### 1. 功能扩展

- [ ] 支持自定义 API 定义
- [ ] 添加操作历史记录
- [ ] 支持参数验证规则
- [ ] 添加批量测试功能
- [ ] 支持测试报告导出

### 2. 性能优化

- [ ] 虚拟滚动处理大量数据
- [ ] 智能建议缓存优化
- [ ] 组件懒加载优化
- [ ] 渲染性能提升

### 3. 用户体验

- [ ] 添加操作引导动画
- [ ] 优化移动端适配
- [ ] 添加键盘快捷键
- [ ] 支持操作撤销

## 📚 相关文档

- [API 测试工具使用指南](./API_TESTER.md)
- [傻瓜化 API 测试工具文档](./SIMPLE_API_TESTER.md)
- [API 测试工具模块化文档](./API_TESTER_MODULARIZATION.md)
- [AnkiConnect 官方文档](https://git.sr.ht/~foosoft/anki-connect/blob/master/README.md) 