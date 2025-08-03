# Anki Editor

一个基于 Vue 3 + Element Plus 的 Anki 卡片编辑器，提供直观的界面来管理和编辑 Anki 卡片。

## 🚀 快速开始

### 环境要求
- Node.js 16+
- Anki 桌面应用
- AnkiConnect 插件

### 安装和运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

### AnkiConnect 设置
1. 启动 Anki 桌面应用
2. 安装 AnkiConnect 插件（插件代码：2055492159）
3. 重启 Anki
4. 启动本应用并测试连接

## 📋 功能特性

### 核心功能
- **牌组管理**：查看和管理 Anki 牌组
- **卡片列表**：浏览和搜索卡片
- **字段编辑**：实时编辑卡片字段内容
- **预览模式**：查看卡片渲染效果
- **设置面板**：连接测试和配置

### 傻瓜化 API 测试工具
- **步骤向导模式**：4步简单流程，适合新手用户
- **智能助手模式**：分类选择 + 智能参数建议
- **高级模式**：完整的 API 测试功能
- **智能建议**：根据参数类型自动提供常用值
- **快速操作**：一键设置常用参数组合
- **模板预设**：提供常用操作的模板

## 🎯 界面设计

### 主要布局
- **响应式设计**：适配不同屏幕尺寸
- **可折叠侧边栏**：支持 Ctrl+B 快捷键切换
- **卡片式界面**：直观的操作选择
- **步骤导航**：清晰的进度指示

### 用户体验优化
- **智能引导**：减少用户输入参数
- **实时预览**：参数变化实时显示
- **状态反馈**：连接状态、操作状态提示
- **错误处理**：友好的错误提示和诊断

## 📁 项目结构

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
│       ├── SimpleApiTester.vue    # 傻瓜化主界面
│       ├── StepWizard.vue         # 步骤向导
│       ├── ParameterHelper.vue     # 智能参数助手
│       ├── SmartInput.vue         # 智能输入组件
│       ├── ApiTester.vue          # 高级模式
│       ├── ApiList.js             # API 配置
│       ├── PresetTests.js         # 预设测试
│       ├── BatchTestDialog.vue    # 批量测试
│       ├── ErrorDiagnosisDialog.vue # 错误诊断
│       └── index.js               # 模块入口
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

## 🧠 模块化开发

项目采用模块化设计，特别是 `src/services/ankiConnect/` 目录展示了如何将大型文件进行模块化拆分：

### 模块化优势
- **高内聚低耦合**：每个模块职责单一，便于维护
- **文件大小控制**：每个文件不超过 1000 行
- **团队协作**：减少代码冲突，便于并行开发
- **可扩展性**：便于添加新功能和 API

### 模块化结构
- `core.js` - 核心请求方法，统一处理 HTTP 请求
- `connection.js` - 连接相关功能
- `basic.js` - 基础操作（同步、获取版本等）
- `decks.js` - 牌组相关操作
- `cards.js` - 卡片相关操作
- `notes.js` - 笔记相关操作
- `tags.js` - 标签相关操作
- `models.js` - 模型相关操作
- `statistics.js` - 统计相关操作
- `media.js` - 媒体相关操作
- `other.js` - 其他杂项操作

### 模块化参考文档
- [AnkiConnect 模块化拆分指南](docs/ANKI_CONNECT_MODULARIZATION.md) - 详细的拆分步骤和最佳实践
- [模块化拆分快速参考模板](docs/MODULARIZATION_TEMPLATE.md) - 快速参考模板，便于其他项目使用

## 🎨 傻瓜化 API 测试工具

### 设计理念
1. **学习 PC 客户端的 GUI 操作流程**
   - 步骤化操作：将复杂的 API 调用分解为简单的步骤
   - 可视化选择：通过卡片式界面选择操作类型
   - 智能引导：提供清晰的指引和说明

2. **减少用户输入参数**
   - 智能建议：根据参数类型提供常用值建议
   - 快速操作：一键设置常用参数组合
   - 模板预设：提供常用操作的模板

3. **功能拆分到不同文件**
   - 模块化设计：每个功能独立成文件
   - 职责分离：每个组件专注特定功能
   - 易于维护：便于后续扩展和修改

### 三种测试模式

#### 1. 步骤向导模式 (StepWizard)
**适用人群**：完全新手用户
- 4 步简单流程：选择操作类型 → 选择具体操作 → 配置参数 → 执行测试
- 可视化卡片选择界面
- 清晰的步骤导航
- 自动参数配置

#### 2. 智能助手模式 (ParameterHelper)
**适用人群**：有一定经验的用户
- 分类选择操作
- 智能参数助手
- 快速操作按钮
- 实时参数预览

#### 3. 高级模式 (ApiTester)
**适用人群**：有经验的开发者
- 完整的 API 列表
- 手动参数配置
- 批量测试功能
- 历史记录管理

### 智能功能
- **智能参数建议**：根据参数类型自动提供建议
- **快速操作按钮**：根据操作类型提供快速设置
- **模板预设**：提供常用操作的模板

## 🔧 技术栈

- **前端框架**：Vue 3 (Composition API)
- **UI 组件库**：Element Plus
- **构建工具**：Vite
- **HTTP 客户端**：Fetch API
- **状态管理**：Vue 3 响应式系统

## 📚 文档

- [API 测试工具使用指南](docs/API_TESTER.md)
- [傻瓜化 API 测试工具文档](docs/SIMPLE_API_TESTER.md)
- [API 测试工具模块化文档](docs/API_TESTER_MODULARIZATION.md)
- [AnkiConnect 模块化拆分指南](docs/ANKI_CONNECT_MODULARIZATION.md)
- [模块化拆分快速参考模板](docs/MODULARIZATION_TEMPLATE.md)
- [模块化拆分示例](docs/MODULARIZATION_EXAMPLE.md)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 开发规范
- 遵循项目模块化规则
- 使用 Element Plus 组件库
- 保持代码简洁和可维护性
- 添加适当的文档和注释

## �� 许可证

MIT License 