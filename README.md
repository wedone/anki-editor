# Anki Editor

一个基于 Vue 3 和 Element Plus 的现代化 Anki 客户端，提供直观的界面来管理您的 Anki 卡片和牌组。

## 🚀 功能特性

### 📚 核心功能
- **牌组管理** - 创建、编辑、删除牌组，支持层级结构
- **卡片浏览** - 多维度筛选卡片，支持内容搜索和预览
- **笔记管理** - 管理笔记类型和字段，支持模板预览
- **标签管理** - 创建、编辑、批量管理标签
- **导入导出** - 支持多种格式的数据备份和恢复
- **统计信息** - 详细的学习统计和进度分析

### 🔗 真实数据集成
- **AnkiConnect API** - 完全集成 AnkiConnect 插件，基于官方文档实现
- **智能批处理** - 分批加载数据，避免超时问题
- **错误恢复** - 完善的错误处理和容错机制
- **配置化管理** - 支持自定义连接参数和批处理设置
- **实时数据同步** - 与 Anki 桌面应用实时同步
- **错误处理** - 完善的连接错误处理和用户提示
- **性能优化** - 并行数据加载和缓存机制

### 🎨 用户界面
- **现代化设计** - 基于 Element Plus 的美观界面
- **响应式布局** - 适配不同屏幕尺寸
- **中文界面** - 完整的中文用户界面
- **直观操作** - 简洁明了的操作流程

## 📋 系统要求

### 必需软件
- **Node.js** (版本 16 或更高)
- **Anki 桌面应用** (版本 2.1 或更高)
- **AnkiConnect 插件** (版本 6 或更高)

### 推荐配置
- **操作系统**: Windows 10/11, macOS 10.15+, Linux
- **内存**: 4GB 或更高
- **存储**: 100MB 可用空间

## 🛠️ 安装和设置

### 1. 克隆项目
```bash
git clone https://github.com/your-username/anki-editor.git
cd anki-editor
```

### 2. 安装依赖
```bash
npm install
```

### 3. 安装 AnkiConnect 插件
1. 打开 Anki 桌面应用
2. 进入 `工具` > `附加组件`
3. 点击 `获取附加组件`
4. 输入代码 `2055492159` 安装 AnkiConnect
5. 重启 Anki

### 4. 启动开发服务器
```bash
npm run dev
```

### 5. 访问应用
打开浏览器访问 `http://localhost:3000`

## 🔧 使用指南

### 连接 Anki
1. 确保 Anki 桌面应用正在运行
2. 确保 AnkiConnect 插件已启用
3. 在应用中点击连接状态标签测试连接
4. 连接成功后即可开始使用

### 牌组管理
- **查看牌组**: 在左侧菜单选择"牌组管理"
- **创建牌组**: 点击"创建牌组"按钮
- **删除牌组**: 在牌组列表中选择要删除的牌组

### 卡片浏览
- **筛选卡片**: 使用牌组、笔记类型、内容搜索筛选
- **预览卡片**: 点击"预览"按钮查看卡片详情
- **删除卡片**: 点击"删除"按钮移除卡片

### 统计信息
- **总体统计**: 查看卡片总数、牌组数、今日复习等
- **牌组统计**: 查看各牌组的详细统计信息
- **学习记录**: 查看历史学习记录和进度

## 🏗️ 技术架构

### 前端技术栈
- **Vue 3** - 渐进式 JavaScript 框架
- **Vite** - 快速构建工具
- **Element Plus** - Vue 3 组件库
- **Pinia** - 状态管理
- **Vue Router** - 路由管理

### 后端集成
- **AnkiConnect** - Anki 插件 API
- **HTTP API** - RESTful API 通信
- **JSON** - 数据交换格式

### 项目结构
```
src/
├── api/              # API 服务
│   └── ankiConnect.js
├── components/       # 公共组件
│   └── MainLayout.vue
├── stores/          # 状态管理
│   └── ankiStore.js
├── views/           # 页面组件
│   ├── DecksManage.vue
│   ├── CardsBrowse.vue
│   ├── NotesManage.vue
│   ├── TagsManage.vue
│   ├── ImportExport.vue
│   └── Statistics.vue
├── router/          # 路由配置
│   └── index.js
└── main.js         # 应用入口
```

## 🔌 API 功能

### 基础连接
- `testConnection()` - 测试 AnkiConnect 连接
- `getDeckNames()` - 获取牌组列表
- `getModelNames()` - 获取笔记类型列表
- `getTags()` - 获取标签列表

### 数据操作
- `createDeck()` - 创建牌组
- `deleteDeck()` - 删除牌组
- `addNote()` - 添加笔记
- `updateNoteFields()` - 更新笔记字段
- `deleteNotes()` - 删除笔记

### 统计信息
- `getDeckStats()` - 获取牌组统计
- `getCardStatusStats()` - 获取卡片状态统计
- `getReviewHistory()` - 获取学习记录
- `getNumCardsReviewedToday()` - 获取今日复习数量

## 🚀 开发命令

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview

# 代码检查
npm run lint
```

## 🐛 故障排除

### 连接问题

#### 1. 检查 Anki 是否运行
- 确保 Anki 桌面应用正在运行
- 检查 Anki 版本是否支持 AnkiConnect (需要 2.1 或更高版本)
- 确保 Anki 没有在后台被系统休眠

#### 2. 检查 AnkiConnect 插件
1. **安装插件**:
   - 在 Anki 中进入 `工具` > `附加组件`
   - 点击 `获取附加组件`
   - 输入代码 `2055492159` 安装 AnkiConnect
   - 重启 Anki 应用

2. **验证插件状态**:
   - 在 Anki 中进入 `工具` > `附加组件`
   - 确保 AnkiConnect 显示为"已启用"
   - 如果没有显示，请重新安装插件

3. **检查插件版本**:
   - AnkiConnect 需要版本 6 或更高
   - 在插件列表中查看版本号

#### 3. 检查网络连接
- 确保应用可以访问 `http://localhost:8765`
- 检查防火墙设置，确保端口 8765 没有被阻止
- 某些杀毒软件可能会阻止连接，请添加例外

#### 4. 端口冲突
- 确保端口 8765 没有被其他程序占用
- 在命令行中运行 `netstat -an | findstr 8765` (Windows) 或 `lsof -i :8765` (Mac/Linux) 检查

#### 5. 测试连接
- 在应用首页点击"测试连接"按钮
- 在应用中点击连接状态标签测试连接
- 如果显示"已连接"，说明配置成功

### 数据加载问题

#### 1. 刷新数据
- 点击应用中的"刷新"按钮
- 重新连接 Anki

#### 2. 检查 Anki 数据
- 确保 Anki 中有牌组和卡片
- 检查牌组名称是否正确
- 确保笔记类型存在且有效

#### 3. 权限问题
- 确保 Anki 有足够的权限访问数据文件
- 检查 Anki 数据目录的读写权限

### 常见错误信息

#### "请求超时"
- Anki 应用未运行
- AnkiConnect 插件未启用
- 防火墙阻止连接
- 端口被占用

#### "无法连接到 Anki"
- Anki 应用未运行
- AnkiConnect 插件未安装
- 网络连接问题
- 防火墙设置

#### "HTTP error"
- AnkiConnect 插件版本过低
- Anki 版本不兼容
- 插件配置错误

### 获取帮助

如果问题仍然存在，请：

1. **检查日志**: 查看浏览器控制台的错误信息
2. **重启应用**: 重启 Anki 和 Anki Editor
3. **重新安装**: 重新安装 AnkiConnect 插件
4. **联系支持**: 在 GitHub 上创建 Issue

## 🤝 贡献指南

### 开发环境设置
1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

### 代码规范
- 使用 ESLint 进行代码检查
- 遵循 Vue 3 组合式 API 规范
- 使用 Element Plus 组件库
- 保持代码注释和文档更新

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Anki](https://apps.ankiweb.net/) - 优秀的间隔重复学习软件
- [AnkiConnect](https://github.com/FooSoft/anki-connect) - Anki 插件 API
- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Element Plus](https://element-plus.org/) - Vue 3 组件库

## 📞 支持

如果您遇到问题或有建议，请：

1. 查看 [故障排除](#故障排除) 部分
2. 在 GitHub 上创建 [Issue](https://github.com/your-username/anki-editor/issues)
3. 联系开发团队

---

**注意**: 这是一个开发中的项目，功能可能会发生变化。请确保在使用前备份您的 Anki 数据。 