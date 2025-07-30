# Anki Editor

一个基于 AnkiConnect 的自定义 Anki 客户端，使用 Vue 3 + TypeScript + Element Plus 构建。

## 🚀 功能特性

- **牌组管理** - 创建、编辑、删除牌组
- **卡片管理** - 添加、编辑、删除卡片
- **模板管理** - 管理笔记模板和字段
- **标签管理** - 组织和管理标签
- **导入导出** - 支持多种格式的数据导入导出
- **数据统计** - 学习进度和数据分析
- **设置管理** - 连接配置和界面设置

## 🛠️ 技术栈

- **前端框架**: Vue 3 + TypeScript
- **构建工具**: Vite
- **UI 组件库**: Element Plus
- **状态管理**: Pinia
- **路由管理**: Vue Router
- **API 集成**: AnkiConnect

## 📦 安装和运行

### 前置要求

1. **Node.js** (版本 16 或更高)
2. **Anki** 桌面应用
3. **AnkiConnect** 插件

### 安装 AnkiConnect

1. 打开 Anki
2. 进入 `工具` > `附加组件`
3. 点击 `获取附加组件`
4. 搜索 `AnkiConnect` 并安装
5. 重启 Anki

### 安装和运行项目

```bash
# 克隆项目
git clone <repository-url>
cd anki-editor

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 `http://localhost:5173` 查看应用。

## 🔧 配置

### 连接设置

1. 确保 Anki 正在运行
2. 在应用设置中配置 AnkiConnect 连接参数：
   - **地址**: localhost (默认)
   - **端口**: 8765 (默认)
   - **API 密钥**: 可选，如果 AnkiConnect 配置了密钥
   - **连接超时**: 5000ms (默认)

### 首次使用

1. 启动应用后，点击右上角的连接状态标签
2. 进入设置页面，配置 AnkiConnect 连接参数
3. 点击"测试连接"验证连接
4. 连接成功后，侧边栏会显示您的牌组、模板和标签

## 📖 使用指南

### 牌组管理

- **查看牌组**: 在侧边栏点击"牌组"展开树形结构
- **创建牌组**: 在牌组管理页面点击"新建牌组"
- **编辑牌组**: 在牌组列表中选择牌组进行编辑
- **删除牌组**: 在牌组列表中选择牌组进行删除

### 卡片管理

- **查看卡片**: 在卡片管理页面查看所有卡片
- **创建卡片**: 点击"新建卡片"添加新卡片
- **编辑卡片**: 在卡片列表中选择卡片进行编辑
- **删除卡片**: 在卡片列表中选择卡片进行删除

### 模板管理

- **查看模板**: 在侧边栏点击"模板"查看所有模板
- **创建模板**: 在模板管理页面创建新模板
- **配置字段**: 为模板配置字段和类型
- **编辑模板**: 修改现有模板的配置

### 导入导出

- **导入数据**: 支持 .apkg、.csv、.txt 格式文件
- **导出数据**: 支持多种格式的数据导出
- **历史记录**: 查看导入导出历史

### 数据统计

- **概览统计**: 查看总卡片数、今日学习等
- **牌组统计**: 查看各牌组的详细统计
- **标签统计**: 查看标签使用情况
- **学习历史**: 查看学习活动记录

## 🏗️ 项目结构

```
src/
├── api/                 # API 服务
│   └── ankiConnect.ts  # AnkiConnect API
├── components/          # 组件
│   └── Layout/         # 布局组件
├── stores/             # 状态管理
│   └── ankiStore.ts    # Anki 状态管理
├── views/              # 页面组件
│   ├── HomeView.vue    # 首页
│   ├── DecksView.vue   # 牌组管理
│   ├── CardsView.vue   # 卡片管理
│   ├── TemplatesView.vue # 模板管理
│   ├── TagsView.vue    # 标签管理
│   ├── ImportView.vue  # 导入导出
│   ├── StatsView.vue   # 数据统计
│   └── SettingsView.vue # 设置
├── router/             # 路由配置
├── assets/             # 静态资源
└── main.ts             # 应用入口
```

## 🔌 AnkiConnect API

本项目使用 AnkiConnect 作为后端 API，支持以下主要功能：

- **牌组操作**: 创建、删除、获取牌组列表
- **笔记操作**: 添加、更新、删除、查找笔记
- **模板操作**: 创建、获取模板信息
- **标签操作**: 获取标签列表
- **统计信息**: 获取学习统计和集合信息

## 🚧 开发计划

### 已完成
- ✅ 基础界面布局
- ✅ 所有核心模块页面
- ✅ AnkiConnect API 集成
- ✅ 状态管理
- ✅ 连接配置

### 进行中
- 🔄 实际数据集成
- 🔄 错误处理优化

### 计划中
- 📋 图表可视化
- 📋 响应式设计
- 📋 主题切换
- 📋 快捷键支持
- 📋 批量操作
- 📋 数据备份

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 🔗 相关链接

- [Anki 官网](https://apps.ankiweb.net/)
- [AnkiConnect 文档](https://git.sr.ht/~foosoft/anki-connect/tree/master/item/README.md)
- [Element Plus 文档](https://element-plus.org/zh-CN/)
- [Vue 3 文档](https://vuejs.org/)
