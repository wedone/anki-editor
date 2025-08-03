# AnkiConnect 模块化拆分指南

## 概述

本文档详细说明了如何将大型的 `ankiConnect.js` 文件进行模块化拆分，以提高代码的可维护性、可扩展性和团队协作效率。

## 拆分原则

### 1. 单一职责原则
每个模块文件只负责一个特定的功能领域，确保高内聚、低耦合。

### 2. 文件大小控制
- 单个文件不超过 1000 行
- 如果超过 1000 行，考虑进一步拆分

### 3. 命名规范
- 目录使用 `kebab-case`：`ankiConnect/`
- 文件使用 `kebab-case`：`core.js`, `decks.js`
- 函数使用 `lowerCamelCase`：`getDeckList()`
- 常量使用 `UPPER_SNAKE_CASE`：`ANKI_CONNECT_URL`

## 模块化结构

### 目录结构
```
src/services/ankiConnect/
├── index.js          # 主入口，统一导出
├── core.js           # 核心请求方法
├── connection.js     # 连接相关
├── basic.js          # 基础操作
├── decks.js          # 牌组操作
├── cards.js          # 卡片操作
├── notes.js          # 笔记操作
├── tags.js           # 标签操作
├── models.js         # 模型操作
├── statistics.js     # 统计操作
├── media.js          # 媒体操作
├── other.js          # 其他操作
└── all.js            # 默认导出
```

### 模块分类说明

#### 1. 核心模块 (`core.js`)
**职责**：提供统一的 HTTP 请求方法
**包含内容**：
- `invoke()` - 基础请求方法
- `ANKI_CONNECT_URL` - 连接地址常量
- 错误处理和日志记录

#### 2. 连接模块 (`connection.js`)
**职责**：处理 AnkiConnect 连接相关功能
**包含内容**：
- `checkConnection()` - 检测连接状态

#### 3. 基础操作模块 (`basic.js`)
**职责**：提供基础的 AnkiConnect 操作
**包含内容**：
- `sync()` - 同步集合
- `getVersion()` - 获取版本

#### 4. 牌组操作模块 (`decks.js`)
**职责**：处理牌组相关的所有操作
**包含内容**：
- `getDeckList()` - 获取牌组列表
- `getDeckNames()` - 获取牌组名称
- `getDeckConfig()` - 获取牌组配置
- `createDeck()` - 创建牌组
- `deleteDecks()` - 删除牌组
- 其他牌组相关操作

#### 5. 卡片操作模块 (`cards.js`)
**职责**：处理卡片相关的所有操作
**包含内容**：
- `getCardsInDeck()` - 获取牌组中的卡片
- `findCards()` - 查找卡片
- `getCardInfo()` - 获取卡片信息
- `cardsToNotes()` - 卡片转笔记
- `getCardFields()` - 获取卡片字段

#### 6. 笔记操作模块 (`notes.js`)
**职责**：处理笔记相关的所有操作
**包含内容**：
- `addNote()` - 添加笔记
- `updateNoteFields()` - 更新笔记字段
- `findNotes()` - 查找笔记
- `deleteNotes()` - 删除笔记
- 其他笔记相关操作

#### 7. 标签操作模块 (`tags.js`)
**职责**：处理标签相关的所有操作
**包含内容**：
- `addTags()` - 添加标签
- `removeTags()` - 移除标签
- `getTags()` - 获取所有标签
- `replaceTags()` - 替换标签
- 其他标签相关操作

#### 8. 模型操作模块 (`models.js`)
**职责**：处理笔记类型（模型）相关的所有操作
**包含内容**：
- `getModelNames()` - 获取模型名称
- `createModel()` - 创建模型
- `updateModel()` - 更新模型
- `deleteModel()` - 删除模型
- 其他模型相关操作

#### 9. 统计操作模块 (`statistics.js`)
**职责**：处理统计相关的所有操作
**包含内容**：
- `getNumCardsReviewedToday()` - 获取今日复习卡片数
- `getCollectionStatsHTML()` - 获取集合统计HTML
- `getCardReviews()` - 获取卡片复习记录
- 其他统计相关操作

#### 10. 媒体操作模块 (`media.js`)
**职责**：处理媒体文件相关的所有操作
**包含内容**：
- `storeMediaFile()` - 存储媒体文件
- `retrieveMediaFile()` - 获取媒体文件
- `deleteMediaFile()` - 删除媒体文件

#### 11. 其他操作模块 (`other.js`)
**职责**：处理其他杂项操作
**包含内容**：
- `getCollectionStats()` - 获取集合统计
- `exportPackage()` - 导出包
- `importPackage()` - 导入包
- `reloadCollection()` - 重新加载集合

## 拆分步骤

### 步骤 1：创建目录结构
```bash
mkdir -p src/services/ankiConnect
```

### 步骤 2：创建核心模块
```javascript
// src/services/ankiConnect/core.js
const ANKI_CONNECT_URL = 'http://localhost:8765'

export async function invoke(action, version = 6, params = {}) {
  // 基础请求方法实现
}
```

### 步骤 3：按功能分类拆分
将原文件中的函数按功能分类，分配到对应的模块文件中。

### 步骤 4：创建主入口文件
```javascript
// src/services/ankiConnect/index.js
export { default as checkConnection } from './connection.js'
export { sync, getVersion } from './basic.js'
// ... 其他导出
```

### 步骤 5：创建默认导出文件
```javascript
// src/services/ankiConnect/all.js
import checkConnection from './connection.js'
import { sync, getVersion } from './basic.js'
// ... 导入所有方法

export default {
  // 导出所有方法
}
```

### 步骤 6：更新引用
将所有引用原文件的地方更新为新的模块路径：
```javascript
// 更新前
import { checkConnection } from '../services/ankiConnect.js'

// 更新后
import { checkConnection } from '../services/ankiConnect/index.js'
```

## 模块化优势

### 1. 可维护性
- 每个文件职责单一，便于理解和维护
- 修改特定功能时只需关注对应文件
- 减少代码冲突

### 2. 可扩展性
- 新增 API 时只需在对应模块文件中添加
- 便于添加新功能模块
- 支持按需导入

### 3. 团队协作
- 不同开发者可以并行开发不同模块
- 减少代码合并冲突
- 便于代码审查

### 4. 性能优化
- 支持按需加载
- 减少打包体积
- 提高加载速度

## 最佳实践

### 1. 模块设计原则
- **高内聚**：相关功能放在同一模块
- **低耦合**：模块间依赖最小化
- **单一职责**：每个模块只负责一个功能领域

### 2. 命名规范
- 文件名使用 `kebab-case`
- 函数名使用 `lowerCamelCase`
- 常量名使用 `UPPER_SNAKE_CASE`

### 3. 导出规范
- 使用命名导出：`export { functionName }`
- 使用默认导出：`export default functionName`
- 在主入口统一重新导出

### 4. 错误处理
- 在核心模块统一处理错误
- 提供详细的错误信息
- 记录调试日志

### 5. 文档维护
- 每个模块添加详细注释
- 说明模块职责和用法
- 提供使用示例

## 扩展指南

### 添加新的 API 方法

1. **确定功能分类**
   ```javascript
   // 如果是牌组相关，添加到 decks.js
   export async function newDeckFunction() {
     return await invoke('newAction', 6, { params })
   }
   ```

2. **在主入口导出**
   ```javascript
   // src/services/ankiConnect/index.js
   export {
     // ... 现有导出
     newDeckFunction
   } from './decks.js'
   ```

3. **更新默认导出**
   ```javascript
   // src/services/ankiConnect/all.js
   import { newDeckFunction } from './decks.js'
   
   export default {
     // ... 现有导出
     newDeckFunction
   }
   ```

### 创建新的功能模块

1. **创建模块文件**
   ```javascript
   // src/services/ankiConnect/newModule.js
   import { invoke } from './core.js'
   
   export async function newFunction() {
     return await invoke('newAction', 6, { params })
   }
   ```

2. **在主入口导出**
   ```javascript
   // src/services/ankiConnect/index.js
   export {
     newFunction
   } from './newModule.js'
   ```

3. **更新默认导出**
   ```javascript
   // src/services/ankiConnect/all.js
   import { newFunction } from './newModule.js'
   
   export default {
     // ... 现有导出
     newFunction
   }
   ```

## 测试和维护

### 1. 单元测试
```javascript
// tests/services/ankiConnect/core.test.js
describe('AnkiConnect Core', () => {
  it('should invoke API correctly', async () => {
    // 测试实现
  })
})
```

### 2. 集成测试
```javascript
// tests/services/ankiConnect/integration.test.js
describe('AnkiConnect Integration', () => {
  it('should work with all modules', async () => {
    // 测试实现
  })
})
```

### 3. 性能监控
```javascript
// 添加性能监控
const performanceMonitor = {
  start: (name) => performance.mark(`${name}-start`),
  end: (name) => {
    performance.mark(`${name}-end`)
    performance.measure(name, `${name}-start`, `${name}-end`)
  }
}
```

## 总结

通过模块化拆分，我们实现了：

1. **更好的代码组织** - 按功能分类，结构清晰
2. **更高的可维护性** - 每个文件职责单一
3. **更强的可扩展性** - 便于添加新功能
4. **更优的团队协作** - 减少代码冲突

这种模块化方式可以作为其他大型文件拆分的参考模板，确保项目代码质量和可维护性。 