# API 测试工具使用示例

## 快速开始

### 1. 启动应用
```bash
npm run dev
```

### 2. 访问 API 测试页面
打开浏览器访问 `http://localhost:3001`，点击侧边栏的"API 测试"菜单项。

### 3. 测试连接
首先使用预设测试用例验证 AnkiConnect 连接：

1. 点击"获取版本"按钮
2. 查看连接状态
3. 确认显示"已连接到 AnkiConnect"

## 常用测试场景

### 场景 1: 验证 AnkiConnect 连接

**步骤**:
1. 选择 API 方法: `version`
2. 点击"发送请求"
3. 查看响应数据

**预期结果**:
```json
{
  "result": 6,
  "error": null
}
```

### 场景 2: 获取牌组列表

**步骤**:
1. 选择 API 方法: `deckNames`
2. 点击"发送请求"
3. 查看响应数据

**预期结果**:
```json
{
  "result": [
    "Default",
    "英语词汇",
    "数学公式"
  ],
  "error": null
}
```

### 场景 3: 查找特定牌组的卡片

**步骤**:
1. 选择 API 方法: `findCards`
2. 在参数中输入: `deck:"英语词汇"`
3. 点击"发送请求"
4. 查看响应数据

**预期结果**:
```json
{
  "result": [123456, 789012, 345678],
  "error": null
}
```

### 场景 4: 获取卡片详细信息

**步骤**:
1. 选择 API 方法: `cardsInfo`
2. 在参数中输入: `[123456]`
3. 点击"发送请求"
4. 查看响应数据

**预期结果**:
```json
{
  "result": [
    {
      "cardId": 123456,
      "noteId": 654321,
      "deckName": "英语词汇",
      "modelName": "Basic",
      "fields": {
        "Front": {
          "value": "Hello",
          "order": 0
        },
        "Back": {
          "value": "你好",
          "order": 1
        }
      }
    }
  ],
  "error": null
}
```

### 场景 5: 更新笔记字段

**步骤**:
1. 选择 API 方法: `updateNoteFields`
2. 在参数中输入:
```json
{
  "id": 654321,
  "fields": {
    "Front": "Hello World",
    "Back": "你好世界"
  }
}
```
3. 点击"发送请求"
4. 查看响应数据

**预期结果**:
```json
{
  "result": null,
  "error": null
}
```

## 预设测试用例详解

### 1. 获取版本 (version)
- **用途**: 验证 AnkiConnect 连接状态
- **参数**: 无
- **返回值**: AnkiConnect 版本号
- **使用场景**: 连接测试、版本检查

### 2. 获取牌组列表 (deckNames)
- **用途**: 获取所有可用牌组
- **参数**: 无
- **返回值**: 牌组名称数组
- **使用场景**: 牌组管理、数据统计

### 3. 获取模型名称 (getModelNames)
- **用途**: 获取所有笔记类型
- **参数**: 无
- **返回值**: 模型名称数组
- **使用场景**: 笔记类型管理

### 4. 获取集合统计 (getCollectionStats)
- **用途**: 获取整个集合的统计信息
- **参数**: 无
- **返回值**: 统计信息对象
- **使用场景**: 数据统计、性能监控

### 5. 同步 (sync)
- **用途**: 同步 Anki 集合
- **参数**: 无
- **返回值**: 同步结果
- **使用场景**: 数据同步、备份

## 参数配置示例

### 字符串参数
```javascript
// 牌组名称
{
  name: 'deck',
  type: 'string',
  description: '牌组名称'
}

// 使用示例
deck: "英语词汇"
```

### 数字参数
```javascript
// 限制数量
{
  name: 'limit',
  type: 'number',
  description: '限制数量'
}

// 使用示例
limit: 10
```

### 选择参数
```javascript
// 是否包含学习进度
{
  name: 'includeSched',
  type: 'select',
  description: '是否包含学习进度',
  options: [
    { label: '是', value: true },
    { label: '否', value: false }
  ]
}

// 使用示例
includeSched: true
```

### 文本域参数
```javascript
// 笔记对象
{
  name: 'note',
  type: 'textarea',
  description: '笔记对象，JSON格式'
}

// 使用示例
note: {
  "id": 654321,
  "fields": {
    "Front": "Hello",
    "Back": "你好"
  }
}
```

## 错误处理示例

### 网络连接错误
```json
{
  "error": "Failed to fetch",
  "message": "网络连接失败，请检查 AnkiConnect 是否启动"
}
```

### API 参数错误
```json
{
  "error": "Invalid parameter",
  "message": "参数格式错误，请检查输入"
}
```

### 权限错误
```json
{
  "error": "Permission denied",
  "message": "权限不足，请检查 AnkiConnect 配置"
}
```

## 历史记录使用

### 查看历史记录
1. 在页面底部查看"测试历史"表格
2. 查看时间、API、状态、消息等信息
3. 点击"重新加载"按钮恢复历史测试

### 历史记录结构
```javascript
{
  timestamp: 1703123456789,
  action: 'version',
  status: 'success',
  message: '请求成功',
  request: { action: 'version', version: 6, params: {} },
  response: { result: 6, error: null }
}
```

## 调试技巧

### 1. 使用浏览器控制台
```javascript
// 查看当前状态
console.log(window.apiTesterDebug)

// 手动发送请求
fetch('http://localhost:8765', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    action: 'version',
    version: 6,
    params: {}
  })
}).then(r => r.json()).then(console.log)
```

### 2. 检查网络请求
1. 打开浏览器开发者工具
2. 切换到 Network 标签
3. 发送 API 请求
4. 查看请求和响应详情

### 3. 验证 AnkiConnect 状态
```bash
# 使用 curl 测试连接
curl -X POST http://localhost:8765 \
  -H "Content-Type: application/json" \
  -d '{"action":"version","version":6,"params":{}}'
```

## 性能优化建议

### 1. 合理使用预设测试
- 优先使用预设测试验证连接
- 避免重复测试相同 API
- 及时清理历史记录

### 2. 参数优化
- 使用精确的查询条件
- 限制返回数据量
- 避免不必要的参数

### 3. 错误处理
- 及时处理错误响应
- 记录错误日志
- 实现重试机制

## 常见问题解决

### Q: 无法连接到 AnkiConnect
**A**: 
1. 确认 Anki 已启动
2. 检查 AnkiConnect 插件是否已安装
3. 验证插件版本 (至少 20230220)
4. 检查防火墙设置

### Q: API 请求返回错误
**A**:
1. 检查参数格式是否正确
2. 验证 API 方法名称
3. 查看错误日志
4. 尝试预设测试用例

### Q: 界面无响应
**A**:
1. 检查浏览器控制台错误
2. 刷新页面
3. 清除浏览器缓存
4. 检查网络连接

### Q: 历史记录丢失
**A**:
1. 历史记录仅在当前会话中保存
2. 刷新页面会清空历史记录
3. 建议及时导出重要数据

## 扩展使用

### 1. 自定义 API 测试
```javascript
// 添加自定义 API 方法
const customApi = {
  action: 'customAction',
  label: '自定义 API',
  description: '自定义 API 描述',
  parameters: [
    {
      name: 'customParam',
      type: 'string',
      description: '自定义参数'
    }
  ]
}
```

### 2. 批量测试脚本
```javascript
// 批量测试多个 API
const batchTest = async () => {
  const apis = ['version', 'deckNames', 'getModelNames']
  
  for (const api of apis) {
    try {
      const response = await fetch('http://localhost:8765', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: api,
          version: 6,
          params: {}
        })
      })
      const result = await response.json()
      console.log(`${api}:`, result)
    } catch (error) {
      console.error(`${api} 失败:`, error)
    }
  }
}
```

### 3. 自动化测试
```javascript
// 自动化测试脚本
const runTests = async () => {
  const tests = [
    { name: '版本测试', action: 'version', expected: 'number' },
    { name: '牌组测试', action: 'deckNames', expected: 'array' },
    { name: '模型测试', action: 'getModelNames', expected: 'array' }
  ]
  
  for (const test of tests) {
    try {
      const response = await fetch('http://localhost:8765', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: test.action,
          version: 6,
          params: {}
        })
      })
      const result = await response.json()
      
      if (result.error) {
        console.error(`${test.name} 失败:`, result.error)
      } else {
        console.log(`${test.name} 成功:`, result.result)
      }
    } catch (error) {
      console.error(`${test.name} 异常:`, error)
    }
  }
}
```

这些示例涵盖了 API 测试工具的主要使用场景，可以帮助您快速上手并充分利用该工具的功能。 