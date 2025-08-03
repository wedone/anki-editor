# 模块化拆分快速参考模板

## 快速开始

### 1. 创建目录结构
```bash
mkdir -p src/services/[serviceName]
```

### 2. 创建核心模块
```javascript
// src/services/[serviceName]/core.js
const API_URL = 'http://localhost:8765'

export async function invoke(action, version = 6, params = {}) {
  try {
    console.log(`API 调用: ${action}`, params)
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action,
        version,
        params
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    console.log(`API 响应: ${action}`, result)
    
    if (result.error) {
      throw new Error(result.error)
    }

    return result.result
  } catch (error) {
    console.error(`API Error (${action}):`, error)
    throw error
  }
}
```

### 3. 创建功能模块
```javascript
// src/services/[serviceName]/[moduleName].js
import { invoke } from './core.js'

// 功能描述
export async function functionName(param1, param2) {
  return await invoke('actionName', 6, { param1, param2 })
}

// 带错误处理的功能
export async function functionWithErrorHandling(param) {
  try {
    const result = await invoke('actionName', 6, { param })
    console.log('操作成功:', result)
    return result
  } catch (error) {
    console.error('操作失败:', error)
    throw error
  }
}
```

### 4. 创建主入口文件
```javascript
// src/services/[serviceName]/index.js
export { default as checkConnection } from './connection.js'
export { sync, getVersion } from './basic.js'

// 模块1操作
export {
  function1,
  function2,
  function3
} from './module1.js'

// 模块2操作
export {
  function4,
  function5,
  function6
} from './module2.js'

// 默认导出所有方法
export { default } from './all.js'
```

### 5. 创建默认导出文件
```javascript
// src/services/[serviceName]/all.js
import checkConnection from './connection.js'
import { sync, getVersion } from './basic.js'
import { function1, function2, function3 } from './module1.js'
import { function4, function5, function6 } from './module2.js'

export default {
  // 基础操作
  checkConnection,
  sync,
  getVersion,
  
  // 模块1操作
  function1,
  function2,
  function3,
  
  // 模块2操作
  function4,
  function5,
  function6
}
```

## 标准模块分类

### 基础模块
- `core.js` - 核心请求方法
- `connection.js` - 连接相关
- `basic.js` - 基础操作

### 业务模块
- `[entity1].js` - 实体1相关操作
- `[entity2].js` - 实体2相关操作
- `[entity3].js` - 实体3相关操作

### 工具模块
- `statistics.js` - 统计相关
- `media.js` - 媒体相关
- `other.js` - 其他操作

## 命名规范

### 文件命名
```javascript
// 使用 kebab-case
core.js
connection.js
basic.js
decks.js
cards.js
notes.js
tags.js
models.js
statistics.js
media.js
other.js
```

### 函数命名
```javascript
// 使用 lowerCamelCase
export async function getDeckList() {}
export async function createDeck() {}
export async function updateCardFields() {}
export async function findNotes() {}
```

### 常量命名
```javascript
// 使用 UPPER_SNAKE_CASE
const API_URL = 'http://localhost:8765'
const DEFAULT_VERSION = 6
const MAX_RETRY_COUNT = 3
```

## 更新引用

### 更新前
```javascript
import { functionName } from '../services/oldFile.js'
```

### 更新后
```javascript
import { functionName } from '../services/[serviceName]/index.js'
```

## 测试模板

### 单元测试
```javascript
// tests/services/[serviceName]/[moduleName].test.js
import { functionName } from '../../src/services/[serviceName]/[moduleName].js'

describe('[ModuleName]', () => {
  it('should work correctly', async () => {
    const result = await functionName(params)
    expect(result).toBeDefined()
  })
})
```

### 集成测试
```javascript
// tests/services/[serviceName]/integration.test.js
import { function1, function2 } from '../../src/services/[serviceName]/index.js'

describe('[ServiceName] Integration', () => {
  it('should work with all modules', async () => {
    const result1 = await function1()
    const result2 = await function2()
    expect(result1).toBeDefined()
    expect(result2).toBeDefined()
  })
})
```

## 性能监控模板

```javascript
// src/services/[serviceName]/core.js
const performanceMonitor = {
  start: (name) => performance.mark(`${name}-start`),
  end: (name) => {
    performance.mark(`${name}-end`)
    performance.measure(name, `${name}-start`, `${name}-end`)
    const measure = performance.getEntriesByName(name)[0]
    console.log(`${name}: ${measure.duration}ms`)
  }
}

export async function invoke(action, version = 6, params = {}) {
  performanceMonitor.start(action)
  try {
    // 原有实现
    const result = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, version, params })
    })
    return result
  } finally {
    performanceMonitor.end(action)
  }
}
```

## 错误处理模板

```javascript
// src/services/[serviceName]/core.js
const logger = {
  info: (message, data) => console.log(`[${serviceName}] ${message}`, data),
  error: (message, error) => console.error(`[${serviceName}] ${message}`, error),
  warn: (message, data) => console.warn(`[${serviceName}] ${message}`, data)
}

export async function invoke(action, version = 6, params = {}) {
  try {
    logger.info(`API 调用: ${action}`, params)
    // 实现
    logger.info(`API 响应: ${action}`, result)
    return result
  } catch (error) {
    logger.error(`API Error (${action}):`, error)
    throw error
  }
}
```

## 快速检查清单

- [ ] 创建目录结构
- [ ] 创建核心模块 (`core.js`)
- [ ] 按功能分类创建模块文件
- [ ] 创建主入口文件 (`index.js`)
- [ ] 创建默认导出文件 (`all.js`)
- [ ] 更新所有引用路径
- [ ] **验证导入导出类型匹配**
- [ ] **测试命名导入和默认导入**
- [ ] 添加单元测试
- [ ] 添加集成测试
- [ ] 添加性能监控
- [ ] 添加错误处理
- [ ] 更新文档

## 注意事项

1. **文件大小控制**：每个文件不超过 1000 行
2. **单一职责**：每个模块只负责一个功能领域
3. **命名规范**：严格遵循项目的命名规范
4. **导入导出验证**：确保导入导出类型匹配（命名导出 vs 默认导出）
5. **错误处理**：在核心模块统一处理错误
6. **日志记录**：添加适当的调试日志
7. **文档维护**：及时更新相关文档 