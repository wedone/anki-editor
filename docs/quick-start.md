# Anki Editor 快速开始指南

## 🎯 项目概述

Anki Editor 是一个基于 Vue 3 + Element Plus 的自定义 Anki 客户端，专注于管理功能。

## 🚀 当前功能

### ✅ 已完成
- **基础布局** - 经典管理后台布局
- **导航系统** - 侧边栏菜单 + 面包屑导航
- **牌组管理** - 表格展示、搜索、创建、删除功能
- **路由系统** - 完整的页面路由配置
- **响应式设计** - 遵循 Element Plus 设计规范
- **AnkiConnect 集成** - 完整的 API 集成和状态管理

### 🚧 开发中
- 卡片浏览模块
- 笔记管理模块
- 标签管理模块
- 导入导出功能
- 统计信息功能

## 📱 界面预览

### 首页
- 欢迎页面
- 进入应用按钮
- 设置说明提示

### 主应用界面
```
┌─────────────────────────────────────────────────────────┐
│                   顶部导航栏                            │
│  Anki Editor                    [已连接]              │
├─────────────┬───────────────────────────────────────────┤
│             │             面包屑导航                    │
│   侧边栏    ├───────────────────────────────────────────┤
│   (菜单)    │                                          │
│             │              主内容区域                   │
│             │                                          │
│             │                                          │
└─────────────┴───────────────────────────────────────────┘
```

## 🎨 设计特色

### Element Plus 规范
- 严格遵循 Element Plus 设计规范
- 使用 Element Plus CSS 变量
- 优先使用组件属性而非自定义 CSS

### 模块化设计
- 清晰的组件结构
- 易于扩展的模块系统
- 统一的状态管理

## 🔧 技术栈

- **前端框架**: Vue 3 (Composition API)
- **UI 组件库**: Element Plus
- **路由管理**: Vue Router 4
- **状态管理**: Pinia
- **构建工具**: Vite
- **开发语言**: JavaScript
- **API 集成**: AnkiConnect

## 📁 项目结构

```
src/
├── components/          # 组件
│   └── MainLayout.vue  # 主布局组件
├── views/              # 页面组件
│   ├── HomeView.vue    # 首页
│   ├── DecksManage.vue # 牌组管理
│   ├── CardsBrowse.vue # 卡片浏览
│   ├── NotesManage.vue # 笔记管理
│   ├── TagsManage.vue  # 标签管理
│   ├── ImportExport.vue # 导入导出
│   └── Statistics.vue  # 统计信息
├── stores/             # 状态管理
│   └── ankiStore.js    # Anki 状态管理
├── api/                # API 服务
│   └── ankiConnect.js  # AnkiConnect API
├── router/             # 路由配置
│   └── index.js
├── main.js             # 应用入口
└── App.vue             # 根组件
```

## 🎯 文件命名规范

### 中文功能 → 英文命名
- **管理** → `Manage` (如: `DecksManage.vue`)
- **浏览** → `Browse` (如: `CardsBrowse.vue`)
- **预览** → `Preview` (如: `CardPreview.vue`)

### 命名规则
- 使用 PascalCase 命名组件文件
- 功能描述在前，操作类型在后
- 去掉冗余的 `View` 后缀，保持简洁

## 🎯 下一步计划

### 第三阶段：功能完善
1. 完善卡片浏览功能
2. 实现笔记管理模块
3. 添加标签管理功能
4. 开发导入导出功能
5. 实现统计信息展示

### 第四阶段：优化和扩展
1. 性能优化
2. 用户体验改进
3. 添加更多高级功能
4. 国际化支持

## 💡 使用提示

1. **开发环境**: 确保 Node.js 版本 16+
2. **Anki 准备**: 需要安装 AnkiConnect 插件
3. **浏览器**: 推荐使用 Chrome 或 Edge
4. **开发模式**: 使用 `npm run dev` 启动开发服务器

## 🔗 相关链接

- [AnkiConnect 官方文档](https://git.sr.ht/~foosoft/anki-connect/tree/master/item/README.md)
- [Element Plus 官方文档](https://element-plus.org/zh-CN/component/overview.html)
- [Vue 3 官方文档](https://cn.vuejs.org/) 