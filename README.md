# Anki Editor

一个基于 Vue3 + Vite + Element Plus 的自定义 Anki 客户端，专注于卡片字段内容的修改和卡片整体效果的预览。

## 功能特性

- 🎯 **牌组管理**: 连接 AnkiConnect，浏览和管理牌组
- 📝 **字段编辑**: 实时编辑卡片字段内容，支持文本和 HTML 格式
- 👀 **卡片预览**: 实时预览卡片效果，支持正面、背面和完整模式
- 🔄 **卡片导航**: 在卡片间快速切换，支持上一张/下一张功能
- 🧪 **API 测试**: 内置 AnkiConnect API 测试工具，方便调试和开发
- 📱 **响应式设计**: 适配不同屏幕尺寸，支持侧边栏折叠

## 技术栈

- **前端框架**: Vue 3 (Composition API)
- **构建工具**: Vite
- **UI 组件库**: Element Plus
- **API 接口**: AnkiConnect
- **开发语言**: JavaScript

## 快速开始

### 环境要求

- Node.js 16+ 
- Anki 桌面版
- AnkiConnect 插件

### 安装 AnkiConnect

1. 打开 Anki
2. 进入 `工具` > `附加组件`
3. 点击 `获取附加组件`
4. 输入代码: `2055492159`
5. 重启 Anki

### 项目设置

```bash
# 克隆项目
git clone <repository-url>
cd anki-editor

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 连接 Anki

1. 确保 Anki 已启动
2. 确保已安装 AnkiConnect 插件
3. 打开浏览器访问 `http://localhost:3000`
4. 在"牌组管理"页面测试连接

## 功能说明

### 牌组管理
- 显示所有可用牌组
- 测试 AnkiConnect 连接状态
- 选择要编辑的牌组

### 卡片列表
- 显示选定牌组中的所有卡片
- 支持搜索和分页
- 点击卡片进入编辑模式

### 字段编辑
- 实时编辑卡片字段内容
- 支持文本和 HTML 格式
- 左右分栏布局：2/3 编辑区域，1/3 预览区域
- 卡片导航：上一张/下一张
- 自动保存提示

### 卡片预览
- 实时预览卡片效果
- 支持正面、背面、完整三种模式
- 与编辑界面同步显示

### API 测试工具

#### 功能概述
API 测试工具是一个内置的 AnkiConnect API 调试界面，提供了完整的 API 测试和调试功能。

#### 核心特性

**1. 连接状态管理**
- 实时检测 AnkiConnect 连接状态
- 自动重连机制
- 连接状态可视化显示
- 连接帮助信息

**2. API 方法选择**
- 支持 9 个常用 AnkiConnect API
- 动态参数配置表单
- API 信息详细说明
- 智能参数类型识别

**3. 预设测试用例**
- 快速测试常用 API
- 一键加载预设参数
- 常用场景覆盖

**4. 请求/响应显示**
- JSON 格式美化显示
- 请求和响应数据分栏
- 实时数据更新
- 错误信息详细展示

**5. 测试历史记录**
- 自动保存测试记录
- 支持重新加载历史
- 状态标签显示
- 时间戳记录

#### 支持的 API 方法

| API 方法 | 功能描述 | 参数类型 |
|---------|---------|---------|
| `version` | 获取 AnkiConnect 版本信息 | 无参数 |
| `deckNames` | 获取所有牌组名称 | 无参数 |
| `getDeckConfig` | 获取指定牌组配置 | 字符串参数 |
| `findCards` | 根据查询条件查找卡片 | 字符串参数 |
| `cardsInfo` | 获取指定卡片详细信息 | JSON 数组参数 |
| `updateNoteFields` | 更新笔记字段内容 | JSON 对象参数 |
| `getModelNames` | 获取所有笔记类型名称 | 无参数 |
| `getCollectionStats` | 获取集合统计信息 | 无参数 |
| `sync` | 同步 Anki 集合 | 无参数 |

#### 参数类型支持

**字符串参数**
```javascript
{
  name: 'deck',
  type: 'string',
  description: '牌组名称'
}
```

**数字参数**
```javascript
{
  name: 'limit',
  type: 'number',
  description: '限制数量'
}
```

**选择参数**
```javascript
{
  name: 'includeSched',
  type: 'select',
  description: '是否包含学习进度',
  options: [
    { label: '是', value: true },
    { label: '否', value: false }
  ]
}
```

**文本域参数**
```javascript
{
  name: 'note',
  type: 'textarea',
  description: '笔记对象，JSON格式'
}
```

#### 预设测试用例

| 测试用例 | API 方法 | 描述 |
|---------|---------|------|
| 获取版本 | `version` | 验证 AnkiConnect 连接 |
| 获取牌组列表 | `deckNames` | 获取所有可用牌组 |
| 获取模型名称 | `getModelNames` | 获取笔记类型列表 |
| 获取集合统计 | `getCollectionStats` | 查看集合统计信息 |
| 同步 | `sync` | 同步 Anki 数据 |

#### 错误处理机制

**网络错误**
- 连接超时处理
- 网络异常提示
- 自动重试机制

**API 错误**
- 详细错误信息显示
- 错误分类处理
- 用户友好提示

**参数错误**
- 参数验证
- 格式检查
- 实时错误提示

#### 使用流程

1. **启动应用**
   ```bash
   npm run dev
   ```

2. **访问 API 测试页面**
   - 打开浏览器访问 `http://localhost:3001`
   - 点击侧边栏"API 测试"菜单

3. **测试连接**
   - 查看连接状态
   - 点击"重新检查连接"按钮
   - 确认 AnkiConnect 正常工作

4. **选择 API 方法**
   - 从下拉列表选择要测试的 API
   - 查看 API 描述和参数要求
   - 配置必要参数

5. **发送请求**
   - 点击"发送请求"按钮
   - 查看请求和响应数据
   - 分析测试结果

6. **使用预设测试**
   - 点击预设测试按钮
   - 快速验证常用 API
   - 检查连接状态

#### 技术实现

**组件结构**
```
ApiTester.vue
├── 连接状态检测
├── API 选择器
├── 参数配置表单
├── 请求/响应显示
├── 测试历史记录
└── 预设测试用例
```

**核心方法**
```javascript
// 检查连接状态
const checkConnectionStatus = async () => {
  // 实现连接检测逻辑
}

// 发送 API 请求
const sendRequest = async () => {
  // 实现请求发送逻辑
}

// 加载预设测试
const loadPreset = (preset) => {
  // 实现预设加载逻辑
}
```

**状态管理**
```javascript
// 连接状态
const connectionStatus = reactive({
  connected: false,
  error: null,
  version: null
})

// API 选择状态
const selectedApi = ref('')
const requestParams = reactive({})

// 请求状态
const loading = ref(false)
const requestData = ref('')
const responseData = ref('')

// 历史记录
const history = ref([])
```

#### 开发指南

**添加新的 API 方法**

1. 在 `apiList` 数组中添加新项：
```javascript
{
  action: 'newApi',
  label: '新 API 方法',
  description: 'API 功能描述',
  parameters: [
    {
      name: 'param1',
      type: 'string',
      description: '参数描述'
    }
  ]
}
```

2. 在 `presetTests` 中添加预设（如适用）：
```javascript
{ name: '测试新 API', action: 'newApi', params: {} }
```

**自定义参数类型**

1. 在参数配置中添加新的类型支持
2. 在模板中添加对应的表单组件
3. 实现参数验证逻辑

**扩展错误处理**

1. 添加新的错误类型
2. 实现自定义错误处理逻辑
3. 更新用户提示信息

#### 最佳实践

**API 测试流程**
1. 先使用预设测试验证连接
2. 测试无参数 API 方法
3. 逐步测试带参数的 API
4. 记录成功的测试用例

**错误排查**
1. 检查 Anki 是否启动
2. 确认 AnkiConnect 插件已安装
3. 验证插件版本兼容性
4. 检查网络连接状态

**性能优化**
1. 避免频繁的 API 调用
2. 合理使用预设测试
3. 及时清理历史记录
4. 监控连接状态变化

## 开发指南

### 项目结构

```
src/
├── components/          # Vue 组件
│   ├── Header.vue      # 应用头部
│   ├── Sidebar.vue     # 侧边栏导航
│   ├── DeckManager.vue # 牌组管理
│   ├── CardList.vue    # 卡片列表
│   ├── FieldEditor.vue # 字段编辑
│   ├── Preview.vue     # 卡片预览
│   ├── Settings.vue    # 设置页面
│   └── ApiTester.vue   # API 测试工具
├── services/           # 服务层
│   └── ankiConnect/    # AnkiConnect API 模块化封装
│       ├── index.js    # 主入口
│       ├── core.js     # 核心请求方法
│       ├── connection.js # 连接相关
│       ├── basic.js    # 基础操作
│       ├── decks.js    # 牌组操作
│       ├── cards.js    # 卡片操作
│       ├── notes.js    # 笔记操作
│       ├── tags.js     # 标签操作
│       ├── models.js   # 模型操作
│       ├── statistics.js # 统计操作
│       ├── media.js    # 媒体操作
│       ├── other.js    # 其他操作
│       └── all.js      # 默认导出
├── App.vue            # 根组件
└── main.js           # 应用入口
```

### 模块化开发

项目采用模块化设计，特别是 `src/services/ankiConnect/` 目录展示了如何将大型文件进行模块化拆分：

#### 模块化优势
- **高内聚低耦合**：每个模块职责单一，便于维护
- **文件大小控制**：每个文件不超过 100 行
- **团队协作**：减少代码冲突，便于并行开发
- **可扩展性**：便于添加新功能和 API

#### 模块化结构
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

#### 模块化参考文档
- [AnkiConnect 模块化拆分指南](docs/ANKI_CONNECT_MODULARIZATION.md) - 详细的拆分步骤和最佳实践
- [模块化拆分快速参考模板](docs/MODULARIZATION_TEMPLATE.md) - 快速参考模板，便于其他项目使用

### 添加新功能

1. 在 `src/components/` 创建新组件
2. 在 `src/App.vue` 中注册组件
3. 在 `src/components/Sidebar.vue` 添加菜单项
4. 更新路由逻辑

### API 开发

使用内置的 API 测试工具进行开发和调试：

1. 进入"API 测试"页面
2. 选择要测试的 API 方法
3. 配置参数（如有）
4. 发送请求并查看结果
5. 使用预设测试功能验证多个 API

### 模块化开发最佳实践

#### 1. 文件拆分原则
- 单个文件超过 1000 行时考虑拆分
- 按功能领域进行模块划分
- 保持高内聚、低耦合

#### 2. 命名规范
- 目录使用 `kebab-case`：`ankiConnect/`
- 文件使用 `kebab-case`：`core.js`, `decks.js`
- 函数使用 `lowerCamelCase`：`getDeckList()`
- 常量使用 `UPPER_SNAKE_CASE`：`ANKI_CONNECT_URL`

#### 3. 导出规范
- 使用命名导出：`export { functionName }`
- 使用默认导出：`export default functionName`
- 在主入口统一重新导出
- **重要**：确保导入导出类型匹配

#### 4. 错误处理
- 在核心模块统一处理错误
- 提供详细的错误信息
- 记录调试日志

#### 5. 导入导出验证
- 检查所有模块的导出类型
- 验证主入口文件的导入语句
- 确保 `all.js` 文件正确导入所有函数
- 测试命名导入和默认导入两种方式

#### 6. 性能优化
- 支持按需加载
- 添加性能监控
- 优化打包体积

## 快捷键

- `Ctrl + B`: 切换侧边栏折叠状态

## 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 许可证

MIT License

## 相关链接

- [AnkiConnect 官方文档](https://github.com/FooSoft/anki-connect)
- [Element Plus 组件库](https://element-plus.org/)
- [Vue 3 文档](https://vuejs.org/)
- [Vite 文档](https://vitejs.dev/) 