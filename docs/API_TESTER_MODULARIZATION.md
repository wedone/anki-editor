# API 测试工具模块化文档

## 📋 概述

本文档记录了 API 测试工具 (`ApiTester.vue`) 的模块化改进过程，包括补充缺失的卡片操作 API 和代码重构。

## 🔧 问题分析

### 1. 卡片操作 API 不完整
**问题**：原 API 测试工具中卡片操作只有 3 个 API，缺少了很多常用的 actions。

**解决方案**：参考 AnkiConnect 官方文档，补充了以下卡片操作 API：
- `getCardsInDeck` - 获取牌组中的卡片
- `getCardFields` - 获取卡片字段
- `updateCardFields` - 更新卡片字段

### 2. 代码量超过项目规则
**问题**：`ApiTester.vue` 文件超过 2000 行，违反了项目规则（单文件不超过 1000 行）。

**解决方案**：将单个大文件拆分为模块化结构。

## 📁 模块化结构

### 目录结构
```
src/components/ApiTester/
├── index.js                    # 模块入口文件
├── ApiTester.vue              # 主组件 (607 行)
├── ApiList.js                 # API 列表配置 (769 行)
├── PresetTests.js             # 预设测试用例 (32 行)
├── BatchTestDialog.vue        # 批量测试对话框 (219 行)
└── ErrorDiagnosisDialog.vue   # 错误诊断对话框 (183 行)
```

### 模块职责

#### 1. `index.js` - 模块入口
**职责**：统一导出所有子模块
```javascript
export { default as ApiTester } from './ApiTester.vue'
export { default as ApiList } from './ApiList.js'
export { default as PresetTests } from './PresetTests.js'
export { default as BatchTestDialog } from './BatchTestDialog.vue'
export { default as ErrorDiagnosisDialog } from './ErrorDiagnosisDialog.vue'
```

#### 2. `ApiTester.vue` - 主组件
**职责**：核心测试界面和逻辑
- 连接状态管理
- API 选择和参数配置
- 请求发送和响应显示
- 基础功能集成

#### 3. `ApiList.js` - API 配置
**职责**：完整的 AnkiConnect API 列表
- 按功能分类的 API 定义
- 参数配置和类型定义
- 智能参数建议
- 分类标签

#### 4. `PresetTests.js` - 预设测试
**职责**：常用测试用例配置
- 基础连接测试
- 牌组管理测试
- 统计信息测试
- 卡片查询测试

#### 5. `BatchTestDialog.vue` - 批量测试
**职责**：批量 API 测试功能
- 多 API 选择
- 测试间隔配置
- 结果展示和统计

#### 6. `ErrorDiagnosisDialog.vue` - 错误诊断
**职责**：错误分析和建议
- 错误类型识别
- 解决方案建议
- 错误代码展示

## 📊 改进效果

### 代码量控制
| 文件 | 行数 | 状态 |
|------|------|------|
| ApiTester.vue | 607 | ✅ 符合规则 |
| ApiList.js | 769 | ✅ 符合规则 |
| PresetTests.js | 32 | ✅ 符合规则 |
| BatchTestDialog.vue | 219 | ✅ 符合规则 |
| ErrorDiagnosisDialog.vue | 183 | ✅ 符合规则 |

### API 覆盖度提升
| 分类 | 原数量 | 现数量 | 增加 |
|------|--------|--------|------|
| 基础操作 | 2 | 2 | 0 |
| 牌组操作 | 11 | 11 | 0 |
| **卡片操作** | **3** | **6** | **+3** |
| 笔记操作 | 9 | 9 | 0 |
| 标签操作 | 6 | 6 | 0 |
| 模型操作 | 11 | 11 | 0 |
| 统计操作 | 7 | 7 | 0 |
| 媒体操作 | 3 | 3 | 0 |
| 其他操作 | 4 | 4 | 0 |
| **总计** | **53** | **56** | **+3** |

### 新增卡片操作 API
1. **`getCardsInDeck`** - 获取牌组中的卡片
   - 参数：`deckName` (牌组名称)
   - 功能：获取指定牌组中的所有卡片信息

2. **`getCardFields`** - 获取卡片字段
   - 参数：`cardId` (卡片ID)
   - 功能：获取指定卡片的字段内容

3. **`updateCardFields`** - 更新卡片字段
   - 参数：`cardId` (卡片ID), `fields` (字段内容)
   - 功能：更新指定卡片的字段内容
   - 智能建议：包含使用示例和注意事项

## 🎯 优势对比

### 模块化前
- ❌ 单文件 2000+ 行，违反项目规则
- ❌ 卡片操作 API 不完整
- ❌ 代码维护困难
- ❌ 功能耦合度高

### 模块化后
- ✅ 单文件控制在 1000 行以内
- ✅ 卡片操作 API 完整
- ✅ 代码结构清晰，易于维护
- ✅ 功能模块化，职责分离
- ✅ 便于扩展和测试

## 🔄 使用方式

### 导入方式
```javascript
// 导入主组件
import ApiTester from './components/ApiTester/ApiTester.vue'

// 导入配置
import { apiList, apiCategories } from './components/ApiTester/ApiList.js'
import { presetTests } from './components/ApiTester/PresetTests.js'

// 导入子组件
import BatchTestDialog from './components/ApiTester/BatchTestDialog.vue'
import ErrorDiagnosisDialog from './components/ApiTester/ErrorDiagnosisDialog.vue'
```

### 功能使用
1. **API 测试**：选择分类 → 选择 API → 配置参数 → 发送请求
2. **批量测试**：选择多个 API → 设置间隔 → 执行批量测试
3. **错误诊断**：发送请求后 → 点击错误诊断 → 查看解决方案
4. **预设测试**：点击预设按钮 → 快速加载常用测试用例

## 📝 维护指南

### 添加新 API
1. 在 `ApiList.js` 中添加 API 定义
2. 确保包含 `action`、`label`、`description`、`category`、`parameters`
3. 可选添加 `suggestions` 提供使用建议

### 添加预设测试
1. 在 `PresetTests.js` 中添加测试用例
2. 包含 `name`、`action`、`params`

### 扩展功能
1. 创建新的子组件
2. 在 `index.js` 中导出
3. 在主组件中集成

## 🚀 后续优化建议

1. **性能优化**：考虑使用虚拟滚动处理大量 API 列表
2. **用户体验**：添加 API 使用频率统计
3. **功能扩展**：支持自定义 API 定义
4. **测试覆盖**：为每个模块添加单元测试
5. **文档完善**：为每个 API 添加详细的使用文档

## 📚 相关文档

- [AnkiConnect 官方文档](https://git.sr.ht/~foosoft/anki-connect/blob/master/README.md)
- [项目模块化规范](../ANKI_CONNECT_MODULARIZATION.md)
- [API 测试工具使用指南](../API_TESTER.md) 