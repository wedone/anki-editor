# 更新日志

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