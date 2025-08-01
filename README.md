# Anki Editor

一个基于 Vue3 + Vite + Element Plus 的自定义 Anki 客户端，专注于卡片字段内容的修改和卡片效果预览。

## 🚀 功能特性

### 核心功能
- **牌组管理** - 连接 AnkiConnect，浏览和选择牌组
- **卡片列表** - 显示牌组中的卡片，支持搜索和分页
- **字段编辑** - 编辑卡片字段内容，支持文本和HTML格式
- **预览模式** - 预览卡片的学习效果（正面/背面/完整）
- **设置面板** - 应用配置和连接状态管理

### 技术特性
- **模块化设计** - 组件化架构，便于扩展
- **响应式界面** - 基于 Element Plus 的现代化UI
- **实时预览** - HTML字段的实时预览功能
- **智能导航** - 自动跳转和状态管理
- **错误处理** - 完善的错误提示和重连机制

## 📋 系统要求

- Node.js 16+
- Anki 桌面应用
- AnkiConnect 插件

## 🛠️ 安装和运行

### 1. 安装依赖
```bash
npm install
```

### 2. 启动开发服务器
```bash
npm run dev
```

### 3. 构建生产版本
```bash
npm run build
```

## 🔧 AnkiConnect 设置

### 1. 安装 AnkiConnect 插件
1. 启动 Anki 桌面应用
2. 工具 → 附加组件 → 获取附加组件
3. 搜索 "AnkiConnect" 并安装（插件代码：2055492159）
4. 重启 Anki

### 2. 验证连接
1. 确保 Anki 正在运行
2. 访问应用，查看连接状态
3. 如果未连接，点击"重新连接"按钮

## 🎯 使用流程

### 基本操作流程
1. **连接 AnkiConnect** → 在牌组管理页面查看连接状态
2. **选择牌组** → 从牌组列表中选择要编辑的牌组
3. **浏览卡片** → 在卡片列表中搜索和选择卡片
4. **编辑字段** → 修改卡片字段内容并保存
5. **预览效果** → 查看卡片的学习效果预览

### 详细功能说明

#### 牌组管理
- 显示所有可用牌组
- 连接状态检查和重连
- 详细的设置说明

#### 卡片列表
- 显示当前牌组的卡片
- 实时搜索功能
- 分页显示
- 卡片内容预览

#### 字段编辑
- 支持文本和HTML字段
- 实时HTML预览
- 更改检测和保存
- 重置功能

#### 预览模式
- 正面/背面/完整预览
- 模拟 Anki 学习界面
- 响应式设计

#### 设置面板
- 连接状态管理
- 界面配置选项
- 应用信息

## 🏗️ 项目结构

```
src/
├── components/          # Vue 组件
│   ├── Header.vue      # 头部组件
│   ├── Sidebar.vue     # 侧边栏导航
│   ├── DeckManager.vue # 牌组管理
│   ├── CardList.vue    # 卡片列表
│   ├── FieldEditor.vue # 字段编辑
│   ├── Preview.vue     # 预览模式
│   └── Settings.vue    # 设置面板
├── services/           # 服务层
│   └── ankiConnect.js # AnkiConnect API
├── App.vue            # 主应用
└── main.js           # 入口文件
```

## 🔌 AnkiConnect API

项目使用 AnkiConnect API 与 Anki 进行通信：

- `checkConnection()` - 检测连接状态
- `getDeckList()` - 获取牌组列表
- `getCardsInDeck()` - 获取牌组中的卡片
- `getCardFields()` - 获取卡片字段
- `updateCardFields()` - 更新卡片字段

## 🎨 界面设计

- **Element Plus 规范** - 严格遵循 Element Plus 设计规范
- **模块化布局** - Header + Sidebar + Main Content
- **响应式设计** - 适配不同屏幕尺寸
- **状态指示** - 清晰的状态提示和反馈

## 🚀 开发计划

### 已完成功能
- ✅ 基础布局和导航
- ✅ AnkiConnect 连接
- ✅ 牌组管理
- ✅ 卡片列表
- ✅ 字段编辑
- ✅ 预览模式
- ✅ 设置面板

### 未来计划
- 🔄 批量编辑功能
- 🔄 卡片模板管理
- 🔄 导入/导出功能
- 🔄 主题定制
- 🔄 快捷键支持

## 📝 技术栈

- **前端框架**: Vue 3
- **构建工具**: Vite
- **UI 组件库**: Element Plus
- **API 通信**: AnkiConnect
- **开发语言**: JavaScript

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 🔗 相关链接

- [AnkiConnect 文档](https://git.sr.ht/~foosoft/anki-connect)
- [Element Plus 文档](https://element-plus.org)
- [Vue 3 文档](https://vuejs.org)
- [Vite 文档](https://vitejs.dev) 