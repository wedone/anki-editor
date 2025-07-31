# AnkiConnect 安装和设置指南

## 📋 概述

AnkiConnect 是一个 Anki 插件，允许外部应用程序通过 HTTP API 与 Anki 进行通信。本指南将帮助您安装和配置 AnkiConnect。

## 🔧 安装步骤

### 1. 安装 AnkiConnect 插件

1. **打开 Anki**
   - 启动 Anki 桌面应用程序

2. **进入插件管理**
   - 点击菜单栏：`工具` → `插件` → `获取插件...`

3. **输入插件代码**
   - 在代码输入框中输入：`2055492159`
   - 点击 `确定` 按钮

4. **重启 Anki**
   - 按照提示重启 Anki 以完成安装

### 2. 验证安装

1. **检查插件列表**
   - 进入：`工具` → `插件`
   - 确认列表中包含 "AnkiConnect"

2. **测试连接**
   - 打开浏览器，访问：`http://localhost:8765`
   - 如果看到 "AnkiConnect" 字样，说明安装成功

## ⚙️ 配置选项

### 基本配置

AnkiConnect 默认配置通常足够使用，但您可以根据需要进行调整：

1. **访问配置**
   - 进入：`工具` → `插件` → `AnkiConnect` → `配置`
   - 默认绑定地址：`127.0.0.1`
   - 默认端口：`8765`

2. **网络访问（可选）**
   - 如果需要从其他设备访问，可以将绑定地址改为：`0.0.0.0`
   - **注意**：这会允许网络中的其他设备访问您的 Anki

### 高级配置

```json
{
  "apiKey": null,
  "webBindAddress": "127.0.0.1",
  "webBindPort": 8765
}
```

## 🚨 常见问题

### 1. 防火墙警告（Windows）

**问题**：启动 Anki 时出现防火墙警告
**解决**：允许 Anki 通过防火墙，这是正常的，因为 AnkiConnect 需要运行本地服务器

### 2. 连接失败

**问题**：Anki Editor 显示"未连接"
**检查清单**：
- ✅ Anki 是否正在运行
- ✅ AnkiConnect 插件是否已安装
- ✅ 浏览器能否访问 `http://localhost:8765`
- ✅ 防火墙是否阻止了连接

### 3. 端口被占用

**问题**：8765 端口被其他程序占用
**解决**：
1. 修改 AnkiConnect 配置中的端口号
2. 同时更新 Anki Editor 中的端口配置

## 🔒 安全注意事项

1. **本地访问**：默认配置只允许本地访问，相对安全
2. **网络访问**：如果配置为 `0.0.0.0`，请确保网络安全
3. **API 密钥**：可以设置 API 密钥增加安全性

## 📱 在 Anki Editor 中使用

### 连接状态

- **已连接**：绿色标签，表示可以正常使用
- **未连接**：红色标签，需要检查 Anki 状态
- **连接中**：蓝色标签，正在测试连接

### 功能测试

1. **测试连接**：点击顶部导航栏的连接状态标签
2. **刷新数据**：点击刷新按钮重新加载数据
3. **创建牌组**：在牌组管理页面创建新牌组

## 🛠️ 故障排除

### 检查 Anki 状态

```bash
# 检查 Anki 进程
tasklist | findstr anki

# 检查端口占用
netstat -an | findstr 8765
```

### 重置 AnkiConnect

1. 删除 AnkiConnect 插件
2. 重新安装插件
3. 重启 Anki

### 日志查看

- Anki 日志：`工具` → `插件` → `AnkiConnect` → `查看日志`
- 浏览器控制台：F12 查看网络请求

## 📞 获取帮助

- **AnkiConnect 官方文档**：https://git.sr.ht/~foosoft/anki-connect/tree/master/item/README.md
- **Anki 官方论坛**：https://forums.ankiweb.net/
- **GitHub Issues**：https://github.com/FooSoft/anki-connect/issues

## 🎯 下一步

安装并配置好 AnkiConnect 后，您就可以：

1. 在 Anki Editor 中管理牌组
2. 浏览和编辑卡片
3. 管理笔记模板
4. 处理标签系统
5. 导入导出数据
6. 查看学习统计

祝您使用愉快！🎉 