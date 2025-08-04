# 更新日志

## [1.2.0] - 2024-01-XX

### 🎉 新增功能

#### 完整的 AnkiConnect 卡片操作功能封装
- **基础查询功能**：
  - `getCardsInDeck(deckName)` - 获取指定牌组中的所有卡片
  - `findCards(query)` - 根据查询条件查找卡片
  - `getCardInfo(cards)` - 获取卡片的详细信息
  - `cardsToNotes(cards)` - 将卡片ID转换为笔记ID
  - `getCardFields(cardId)` - 获取单张卡片的字段信息

- **易度因子管理**：
  - `getEaseFactors(cards)` - 获取卡片的易度因子
  - `setEaseFactors(cards, easeFactors)` - 设置卡片的易度因子

- **卡片状态管理**：
  - `suspendCards(cards)` - 暂停卡片
  - `unsuspendCards(cards)` - 恢复暂停的卡片
  - `isCardSuspended(card)` - 检查单张卡片是否暂停
  - `areCardsSuspended(cards)` - 检查多张卡片是否暂停
  - `areCardsDue(cards)` - 检查卡片是否到期

- **卡片学习管理**：
  - `getCardIntervals(cards, complete)` - 获取卡片间隔信息
  - `forgetCards(cards)` - 忘记卡片（重置为新卡片）
  - `relearnCards(cards)` - 重新学习卡片
  - `answerCard(cardId, ease)` - 回答单张卡片
  - `answerCards(answers)` - 批量回答卡片

- **到期日期管理**：
  - `setDueDate(cards, days)` - 设置卡片到期日期
  - `setCardDueTime(cardId, dueTime)` - 设置卡片到期时间

- **高级功能**：
  - `setSpecificValueOfCard(card, keys, newValues, warningCheck)` - 设置卡片特定值
  - `getCardsModTime(cards)` - 获取卡片修改时间
  - `setCardFlag(cardId, flag)` - 设置卡片标志

#### 便捷方法
- `answerCard(cardId, ease)` - 回答单张卡片的便捷方法
- `setCardFlag(cardId, flag)` - 设置卡片标志的便捷方法
- `setCardDueTime(cardId, dueTime)` - 设置卡片到期时间的便捷方法

#### API 测试工具完善
- **完整的 API 列表**：补充了所有 AnkiConnect 卡片操作 API
  - 新增 15+ 个卡片操作 API（易度因子、暂停/恢复、间隔、回答卡片等）
  - 新增 5+ 个笔记操作 API（更新笔记、获取修改时间等）
  - 新增 5+ 个标签操作 API（全局替换标签等）
  - 新增 8+ 个模型操作 API（通过ID操作模型等）
  - 修正了牌组操作 API 的参数配置

- **API 分类优化**：
  - 卡片操作：从 5 个 API 扩展到 20+ 个 API
  - 笔记操作：从 7 个 API 扩展到 12+ 个 API
  - 标签操作：从 5 个 API 扩展到 6 个 API
  - 模型操作：从 12 个 API 扩展到 20+ 个 API

- **参数配置完善**：
  - 修正了 `getDecks` API 的参数（从 `cards` 改为 `decks`）
  - 修正了 `cloneDeckConfigId` API 的参数（从 `deck, configId` 改为 `name`）
  - 修正了 `removeDeckConfigId` API 的参数（从 `deck` 改为 `configId`）
  - 添加了所有新 API 的详细参数说明

### 🔧 技术改进

#### 完整的错误处理机制
- 所有函数都包含 try-catch 错误处理
- 详细的错误日志记录
- 统一的错误信息格式

#### 性能优化
- 使用 `getCardsModTime()` 替代 `getCardInfo()` 获取修改时间，性能提升约15倍
- 批量操作支持，提高处理效率
- 合理的查询条件使用，减少数据传输量

#### 模块化设计
- 功能按类别分组，便于维护和扩展
- 清晰的函数命名和参数设计
- 完整的 JSDoc 注释

#### API 测试工具增强
- **完整的 API 覆盖**：现在支持 80+ 个 AnkiConnect API
- **准确的参数配置**：所有 API 参数都经过验证和修正
- **详细的描述说明**：每个 API 都有清晰的功能描述和参数说明
- **分类管理**：按功能类别组织 API，便于查找和使用

### 🐛 修复问题

#### 导入错误修复
- **修复 `addNotes` 函数缺失**：在 `notes.js` 中添加了 `addNotes` 函数
- **修复 `getCards` 函数缺失**：在 `cards.js` 中添加了 `getCards`、`getCard`、`updateCard`、`updateCards` 函数
- **修复 `getDeckNamesAndIds` 函数缺失**：在 `decks.js` 中添加了 `getDeckNamesAndIds`、`getDecks`、`saveDeckConfig` 函数
- **修复 `cardReviews` 函数缺失**：在 `statistics.js` 中添加了 `cardReviews` 别名导出
- **修复 `checkConnection` 导出方式**：将 `connection.js` 中的默认导出改为命名导出
- **修复 `notesInfo` 和 `notesModTime` 别名**：在 `notes.js` 中添加了相应的别名导出
- **修复 `updateCardFields` 函数缺失**：在 `cards.js` 中添加了 `updateCardFields` 函数
- **修复 `index.js` 导入错误**：将 `index.js` 中的默认导入改为命名导入，匹配 `connection.js` 的导出方式

#### 模块导入完整性
- 确保所有 `all.js` 中导入的函数都在对应的模块中存在
- 添加了缺失的函数实现和别名导出
- 统一了导出方式，确保模块间的一致性
- 修复了所有导入/导出不匹配的问题

### 📁 文件结构更新

```
src/services/ankiConnect/
├── cards.js                    # 卡片操作功能实现
├── examples/
│   └── cardActionsExample.js   # 使用示例
└── README.md                   # 详细文档
```

### 📚 文档更新

- **新增文档**：
  - `src/services/ankiConnect/README.md` - 卡片操作功能详细文档
  - `src/services/ankiConnect/examples/cardActionsExample.js` - 完整的使用示例

#### 文档内容包括：
- 功能概览和分类说明
- 详细的使用示例和代码片段
- 查询语法参考
- 错误处理指南
- 性能优化建议
- 注意事项和最佳实践

### 🎯 使用示例

```javascript
// 基础查询
const cards = await getCardsInDeck('Default')
const dueCards = await findCards('is:due')

// 易度因子管理
const easeFactors = await getEaseFactors(cardIds)
await setEaseFactors(cardIds, [4200, 4000])

// 卡片状态管理
await suspendCards(cardIds)
const suspendedStatus = await areCardsSuspended(cardIds)

// 回答卡片
await answerCard(1483959291685, 2) // Good

// 设置到期日期
await setDueDate(cardIds, '3-7') // 3-7天后随机到期
```

## [1.1.0] - 2024-01-XX

### 🎉 新增功能

#### 傻瓜化 API 测试工具
- **步骤向导模式**：4步简单流程，适合新手用户
  - 选择操作类型 → 选择具体操作 → 配置参数 → 执行测试
  - 可视化卡片选择界面
  - 清晰的步骤导航
  - 自动参数配置

- **智能助手模式**：分类选择 + 智能参数建议
  - 按功能分类的操作选择器
  - 智能参数助手组件
  - 快速操作按钮
  - 实时参数预览

- **高级模式**：完整的 API 测试功能
  - 完整的 API 列表（56+ 个 API）
  - 手动参数配置
  - 批量测试功能
  - 历史记录管理

#### 智能功能
- **智能参数建议**：根据参数类型自动提供常用值建议
  - 查询参数：`deck:*`, `is:due`, `is:new` 等
  - 牌组参数：默认牌组、英语词汇、数学公式等
  - 模型参数：Basic、Cloze 等笔记类型
  - JSON 模板：笔记模板、字段模板等

- **快速操作按钮**：根据操作类型提供快速设置
  - 查找卡片：查找所有卡片、查找到期卡片等
  - 添加笔记：基础笔记模板、带标签笔记模板
  - 牌组操作：包含子牌组、不包含子牌组
  - 统计操作：包含整个集合、仅当前牌组

- **模板预设**：提供常用操作的模板
  - 基础笔记模板
  - 带标签笔记模板
  - 基础字段模板
  - 问答字段模板

### 🔧 技术改进

#### 模块化重构
- **功能拆分**：将大型组件拆分为多个小文件
  - `SimpleApiTester.vue` - 傻瓜化主界面
  - `StepWizard.vue` - 步骤向导组件
  - `ParameterHelper.vue` - 智能参数助手
  - `SmartInput.vue` - 智能输入组件
  - `ApiTester.vue` - 高级模式组件

- **API 配置分离**：
  - `ApiList.js` - API 列表配置（769 行）
  - `PresetTests.js` - 预设测试用例（32 行）

- **对话框组件**：
  - `BatchTestDialog.vue` - 批量测试对话框（219 行）
  - `ErrorDiagnosisDialog.vue` - 错误诊断对话框（183 行）

#### 用户体验优化
- **减少认知负担**：
  - 分类清晰的操作类型
  - 直观的图标设计
  - 详细的描述说明

- **减少操作步骤**：
  - 一键设置快速操作
  - 智能建议自动填充
  - 模板预设快速应用

- **提供反馈**：
  - 实时预览参数变化
  - 状态提示和错误处理
  - 结构化的测试结果

### 📁 文件结构更新

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

### 📚 文档更新

- **新增文档**：
  - `docs/SIMPLE_API_TESTER.md` - 傻瓜化 API 测试工具详细文档
  - `docs/API_TESTER_MODULARIZATION.md` - API 测试工具模块化文档

- **更新文档**：
  - `README.md` - 添加傻瓜化功能说明
  - `CHANGELOG.md` - 记录本次重大更新

### 🎯 设计理念

#### 学习 PC 客户端的 GUI 操作流程
- **步骤化操作**：将复杂的 API 调用分解为简单的步骤
- **可视化选择**：通过卡片式界面选择操作类型
- **智能引导**：提供清晰的指引和说明

#### 减少用户输入参数
- **智能建议**：根据参数类型提供常用值建议
- **快速操作**：一键设置常用参数组合
- **模板预设**：提供常用操作的模板

#### 功能拆分到不同文件
- **模块化设计**：每个功能独立成文件
- **职责分离**：每个组件专注特定功能
- **易于维护**：便于后续扩展和修改

### 🔄 向后兼容性

- 保留了原有的高级模式 API 测试功能
- 所有现有功能保持不变
- 新增功能作为可选模式提供

### 🚀 性能优化

- 组件按需加载
- 智能建议缓存
- 响应式数据优化
- 渲染性能提升

---

## [1.0.0] - 2024-01-XX

### 🎉 初始版本

#### 核心功能
- **牌组管理**：连接 AnkiConnect，浏览和管理牌组
- **卡片列表**：显示选定牌组中的所有卡片，支持搜索和分页
- **字段编辑**：实时编辑卡片字段内容，支持文本和 HTML 格式
- **卡片预览**：实时预览卡片效果，支持正面、背面和完整模式
- **卡片导航**：在卡片间快速切换，支持上一张/下一张功能

#### 界面特性
- **响应式设计**：适配不同屏幕尺寸
- **可折叠侧边栏**：支持 Ctrl+B 快捷键切换
- **左右分栏布局**：2/3 编辑区域，1/3 预览区域

#### API 测试工具
- **连接状态管理**：实时检测 AnkiConnect 连接状态
- **API 方法选择**：支持 9 个常用 AnkiConnect API
- **参数配置**：动态参数配置表单
- **预设测试用例**：快速测试常用 API
- **请求/响应显示**：JSON 格式美化显示

#### 技术栈
- **前端框架**：Vue 3 (Composition API)
- **构建工具**：Vite
- **UI 组件库**：Element Plus
- **API 接口**：AnkiConnect
- **开发语言**：JavaScript

#### 模块化开发
- **AnkiConnect 服务模块化**：将大型文件拆分为多个小模块
- **高内聚低耦合**：每个模块职责单一，便于维护
- **文件大小控制**：每个文件不超过 1000 行
- **团队协作**：减少代码冲突，便于并行开发

### 📁 项目结构

```
src/
├── components/                 # Vue 组件
│   ├── Header.vue            # 应用头部
│   ├── Sidebar.vue           # 侧边栏导航
│   ├── DeckManager.vue       # 牌组管理
│   ├── CardList.vue          # 卡片列表
│   ├── FieldEditor.vue       # 字段编辑器
│   ├── Preview.vue           # 预览组件
│   ├── Settings.vue          # 设置面板
│   └── ApiTester/            # API 测试工具
│       ├── ApiTester.vue     # API 测试组件
│       ├── ApiList.js        # API 配置
│       ├── PresetTests.js    # 预设测试
│       ├── BatchTestDialog.vue # 批量测试
│       ├── ErrorDiagnosisDialog.vue # 错误诊断
│       └── index.js          # 模块入口
├── services/                 # 服务层
│   └── ankiConnect/         # AnkiConnect API 服务
│       ├── core.js          # 核心请求方法
│       ├── connection.js    # 连接相关
│       ├── basic.js         # 基础操作
│       ├── decks.js         # 牌组操作
│       ├── cards.js         # 卡片操作
│       ├── notes.js         # 笔记操作
│       ├── tags.js          # 标签操作
│       ├── models.js        # 模型操作
│       ├── statistics.js    # 统计操作
│       ├── media.js         # 媒体操作
│       ├── other.js         # 其他操作
│       ├── all.js           # 默认导出
│       └── index.js         # 模块入口
├── App.vue                  # 主应用组件
└── main.js                  # 应用入口
```

### 📚 文档

- [API 测试工具使用指南](docs/API_TESTER.md)
- [API 测试工具模块化文档](docs/API_TESTER_MODULARIZATION.md)
- [AnkiConnect 模块化拆分指南](docs/ANKI_CONNECT_MODULARIZATION.md)
- [模块化拆分快速参考模板](docs/MODULARIZATION_TEMPLATE.md)
- [模块化拆分示例](docs/MODULARIZATION_EXAMPLE.md) 