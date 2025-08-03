# 傻瓜化 API 测试工具

## 📋 概述

傻瓜化 API 测试工具是为了让用户能够更轻松地测试 AnkiConnect API 而设计的。它提供了三种不同的测试模式，从最简单的步骤向导到高级的完整功能界面，满足不同用户的需求。

## 🎯 设计理念

### 1. 学习 PC 客户端的 GUI 操作流程
- **步骤化操作**：将复杂的 API 调用分解为简单的步骤
- **可视化选择**：通过卡片式界面选择操作类型
- **智能引导**：提供清晰的指引和说明

### 2. 减少用户输入参数
- **智能建议**：根据参数类型提供常用值建议
- **快速操作**：一键设置常用参数组合
- **模板预设**：提供常用操作的模板

### 3. 功能拆分到不同文件
- **模块化设计**：每个功能独立成文件
- **职责分离**：每个组件专注特定功能
- **易于维护**：便于后续扩展和修改

## 🚀 三种测试模式

### 1. 步骤向导模式 (StepWizard)
**适用人群**：完全新手用户

**特点**：
- 4 步简单流程：选择操作类型 → 选择具体操作 → 配置参数 → 执行测试
- 可视化卡片选择界面
- 清晰的步骤导航
- 自动参数配置

**使用流程**：
1. 选择操作类型（如：牌组管理、卡片管理）
2. 选择具体操作（如：获取牌组列表、查找卡片）
3. 配置必要参数（智能建议减少输入）
4. 执行测试并查看结果

### 2. 智能助手模式 (ParameterHelper)
**适用人群**：有一定经验的用户

**特点**：
- 分类选择操作
- 智能参数助手
- 快速操作按钮
- 实时参数预览

**使用流程**：
1. 从分类中选择操作
2. 使用智能助手配置参数
3. 点击快速操作按钮
4. 执行测试

### 3. 高级模式 (ApiTester)
**适用人群**：有经验的开发者

**特点**：
- 完整的 API 列表
- 手动参数配置
- 批量测试功能
- 历史记录管理

## 📁 文件结构

```
src/components/ApiTester/
├── index.js                    # 模块入口
├── SimpleApiTester.vue        # 傻瓜化主界面 (主入口)
├── StepWizard.vue             # 步骤向导组件
├── ParameterHelper.vue         # 智能参数助手
├── SmartInput.vue             # 智能输入组件
├── ApiTester.vue              # 高级模式组件
├── ApiList.js                 # API 配置
├── PresetTests.js             # 预设测试
├── BatchTestDialog.vue        # 批量测试对话框
└── ErrorDiagnosisDialog.vue   # 错误诊断对话框
```

## 🎨 界面设计

### 步骤向导界面
- **操作类型卡片**：9 个主要操作类型，每个都有图标和描述
- **步骤导航**：清晰的进度指示器
- **参数配置**：简化的表单界面
- **测试结果**：结构化的结果显示

### 智能助手界面
- **分类选择器**：按功能分类的下拉选择
- **参数助手**：智能建议和快速操作
- **实时预览**：参数变化实时显示
- **一键执行**：简化的测试执行

## 🧠 智能功能

### 1. 智能参数建议
根据参数类型自动提供建议：

```javascript
// 查询参数建议
case 'query':
  suggestions.push(
    { value: 'deck:*', label: '所有牌组', description: '查找所有牌组的卡片' },
    { value: 'is:due', label: '到期卡片', description: '查找需要复习的卡片' },
    { value: 'is:new', label: '新卡片', description: '查找新学习的卡片' }
  )
```

### 2. 快速操作按钮
根据操作类型提供快速设置：

```javascript
// 查找卡片快速操作
case 'findCards':
  actions.push(
    { name: '查找所有卡片', action: () => setParameter('query', 'deck:*') },
    { name: '查找到期卡片', action: () => setParameter('query', 'is:due') }
  )
```

### 3. 模板预设
提供常用操作的模板：

```javascript
// 笔记模板
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
```

## 🔧 技术实现

### 1. 组件通信
使用 Vue 3 的 Composition API 和事件发射：

```javascript
// 参数变化事件
const handleParametersChanged = (parameters) => {
  Object.assign(currentParameters, parameters)
}

// 发射事件
emit('parameters-changed', { ...parameters })
```

### 2. 响应式数据
使用 `ref` 和 `reactive` 管理状态：

```javascript
const testMode = ref('wizard')
const currentParameters = reactive({})
const connectionStatus = reactive({
  connected: false,
  error: null,
  version: null
})
```

### 3. 计算属性
动态计算相关数据：

```javascript
const selectedOperationInfo = computed(() => {
  return apiList.find(api => api.action === selectedOperation.value)
})

const canProceed = computed(() => {
  switch (currentStep.value) {
    case 0: return selectedCategory.value !== ''
    case 1: return selectedOperation.value !== ''
    default: return true
  }
})
```

## 📊 用户体验优化

### 1. 减少认知负担
- **分类清晰**：按功能分类，便于理解
- **图标直观**：每个操作类型都有对应图标
- **描述详细**：每个操作都有详细说明

### 2. 减少操作步骤
- **一键设置**：快速操作按钮
- **智能建议**：自动提供常用值
- **模板预设**：常用操作模板

### 3. 提供反馈
- **实时预览**：参数变化实时显示
- **状态提示**：连接状态、操作状态
- **结果展示**：结构化的测试结果

## 🎯 使用场景

### 1. 新手用户
**推荐模式**：步骤向导
**使用流程**：
1. 选择"步骤向导"模式
2. 按照提示一步步操作
3. 使用智能建议配置参数
4. 查看测试结果

### 2. 普通用户
**推荐模式**：智能助手
**使用流程**：
1. 选择"智能助手"模式
2. 从分类中选择操作
3. 使用快速操作按钮
4. 执行测试

### 3. 开发者
**推荐模式**：高级模式
**使用流程**：
1. 选择"高级模式"
2. 使用完整的 API 列表
3. 手动配置参数
4. 使用批量测试功能

## 🚀 后续优化

### 1. 功能扩展
- [ ] 添加更多智能建议
- [ ] 支持自定义模板
- [ ] 添加操作历史记录
- [ ] 支持参数验证

### 2. 用户体验
- [ ] 添加操作引导动画
- [ ] 优化移动端适配
- [ ] 添加键盘快捷键
- [ ] 支持操作撤销

### 3. 性能优化
- [ ] 虚拟滚动处理大量数据
- [ ] 懒加载组件
- [ ] 缓存常用操作
- [ ] 优化渲染性能

## 📚 相关文档

- [API 测试工具模块化文档](./API_TESTER_MODULARIZATION.md)
- [AnkiConnect 官方文档](https://git.sr.ht/~foosoft/anki-connect/blob/master/README.md)
- [项目模块化规范](./ANKI_CONNECT_MODULARIZATION.md) 