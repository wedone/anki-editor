### 3. Notification 通知
- **用途**: 通知消息
- **特点**: 支持多种类型、自定义位置

#### 详细用法
```vue
<template>
  <div>
    <el-button :plain="true" @click="open1">默认</el-button>
    <el-button :plain="true" @click="open2">成功</el-button>
    <el-button :plain="true" @click="open3">警告</el-button>
    <el-button :plain="true" @click="open4">错误</el-button>
    <el-button :plain="true" @click="open5">自定义位置</el-button>
    <el-button :plain="true" @click="open6">HTML 片段</el-button>
    <el-button :plain="true" @click="open7">手动关闭</el-button>
    <el-button :plain="true" @click="open8">分组消息</el-button>
  </div>
</template>

<script setup>
import { ElNotification } from 'element-plus'

const open1 = () => {
  ElNotification({
    title: '标题名称',
    message: '这是一条成功的提示消息',
  })
}

const open2 = () => {
  ElNotification({
    title: '成功',
    message: '这是一条成功的提示消息',
    type: 'success',
  })
}

const open3 = () => {
  ElNotification({
    title: '警告',
    message: '这是一条警告的提示消息',
    type: 'warning',
  })
}

const open4 = () => {
  ElNotification.error({
    title: '错误',
    message: '这是一条错误的提示消息',
  })
}

const open5 = () => {
  ElNotification({
    title: '自定义位置',
    message: '这是一条自定义位置的提示消息',
    position: 'bottom-right',
  })
}

const open6 = () => {
  ElNotification({
    title: 'HTML 片段',
    dangerouslyUseHTMLString: true,
    message: '<strong>这是 <i>HTML</i> 片段</strong>',
  })
}

const open7 = () => {
  const notification = ElNotification({
    title: '手动关闭',
    message: '这是一条手动关闭的提示消息',
    duration: 0,
    showClose: true,
  })

  // 3秒后手动关闭
  setTimeout(() => {
    notification.close()
  }, 3000)
}

const open8 = () => {
  ElNotification({
    title: '分组消息',
    message: '这是一条分组消息',
    grouping: true,
    type: 'info'
  })
  ElNotification({
    title: '分组消息',
    message: '这是一条分组消息',
    grouping: true,
    type: 'info'
  })
  ElNotification({
    title: '分组消息',
    message: '这是一条分组消息',
    grouping: true,
    type: 'info'
  })
}

// 全局配置示例
const openWithConfig = () => {
  ElNotification({
    title: '自定义配置',
    message: '这是一条自定义配置的提示消息',
    type: 'success',
    duration: 5000, // 显示时间
    showClose: true, // 显示关闭按钮
    offset: 80, // 距离顶部的偏移量
    customClass: 'my-notification', // 自定义类名
    onClose: () => {
      console.log('通知已关闭')
    }
  })
}

// 不同位置的通知
const openTopLeft = () => {
  ElNotification({
    title: '左上角',
    message: '这是一条左上角的提示消息',
    position: 'top-left'
  })
}

const openTopRight = () => {
  ElNotification({
    title: '右上角',
    message: '这是一条右上角的提示消息',
    position: 'top-right'
  })
}

const openBottomLeft = () => {
  ElNotification({
    title: '左下角',
    message: '这是一条左下角的提示消息',
    position: 'bottom-left'
  })
}

const openBottomRight = () => {
  ElNotification({
    title: '右下角',
    message: '这是一条右下角的提示消息',
    position: 'bottom-right'
  })
}

// 带图标的通知
const openWithIcon = () => {
  ElNotification({
    title: '带图标',
    message: '这是一条带图标的提示消息',
    icon: 'SuccessFilled',
    type: 'success'
  })
}

// 自定义样式的通知
const openCustomStyle = () => {
  ElNotification({
    title: '自定义样式',
    message: '这是一条自定义样式的提示消息',
    customClass: 'custom-notification',
    type: 'info'
  })
}
</script>

<style scoped>
.my-notification {
  background-color: #f0f9ff;
  border-color: #409eff;
}

.custom-notification {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
}

.custom-notification .el-notification__title {
  color: white;
}

.custom-notification .el-notification__content {
  color: rgba(255, 255, 255, 0.9);
}

.custom-notification .el-notification__closeBtn {
  color: white;
}

.custom-notification .el-notification__closeBtn:hover {
  color: rgba(255, 255, 255, 0.8);
}
</style>

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| title | 标题 | string | — | — |
| message | 说明文字 | string / VNode | — | — |
| dangerouslyUseHTMLString | 是否将 message 属性作为 HTML 字符串处理 | boolean | — | false |
| type | 通知类型 | string | success / warning / info / error | — |
| iconClass | 自定义图标的类名，会覆盖 type | string | — | — |
| customClass | 自定义类名 | string | — | — |
| duration | 显示时间, 毫秒。设为 0 则不会自动关闭 | number | — | 4500 |
| position | 自定义弹出位置 | string | top-right / top-left / bottom-right / bottom-left | top-right |
| showClose | 是否显示关闭按钮 | boolean | — | true |
| onClose | 关闭时的回调函数 | function | — | — |
| onClick | 点击 Notification 时的回调函数 | function | — | — |
| offset | 偏移的距离，在同一时刻，所有的 Notification 实例应当具有一个相同的偏移量 | number | — | 0 |
| appendTo | 设置组件的根元素 | string / HTMLElement | — | document.body |
| zIndex | 设置组件的 z-index | number | — | 0 |
| grouping | 合并内容相同的消息，不支持 VNode 类型的消息 | boolean | — | false |

#### 方法
| 方法名 | 说明 | 参数 |
|--------|------|------|
| close | 关闭当前的 Notification | — |

#### 静态方法
| 方法名 | 说明 | 参数 |
|--------|------|------|
| ElNotification(options) | 显示通知 | options / message |
| ElNotification.success(options) | 显示成功通知 | options / message |
| ElNotification.warning(options) | 显示警告通知 | options / message |
| ElNotification.info(options) | 显示通知 | options / message |
| ElNotification.error(options) | 显示错误通知 | options / message |

#### 全局配置
```javascript
// 在 main.js 中配置
import { ElNotification } from 'element-plus'

// 配置全局默认值
ElNotification.defaults = {
  duration: 4500,
  showClose: true,
  position: 'top-right',
  offset: 0
}
```

#### 使用示例
```javascript
// 基础用法
ElNotification('这是一条通知消息')

// 成功通知
ElNotification.success('恭喜你，这是一条成功消息')

// 警告通知
ElNotification.warning('警告哦，这是一条警告消息')

// 错误通知
ElNotification.error('错了哦，这是一条错误消息')

// 带配置的通知
ElNotification({
  title: '标题',
  message: '这是一条通知消息',
  type: 'success',
  duration: 5000,
  showClose: true,
  position: 'bottom-right',
  offset: 80,
  customClass: 'my-notification',
  onClose: () => {
    console.log('通知已关闭')
  }
})

// 手动关闭
const notification = ElNotification({
  title: '手动关闭',
  message: '这是一条手动关闭的通知',
  duration: 0,
  showClose: true
})

// 3秒后手动关闭
setTimeout(() => {
  notification.close()
}, 3000)

// HTML 内容
ElNotification({
  title: 'HTML 片段',
  dangerouslyUseHTMLString: true,
  message: '<strong>这是 <i>HTML</i> 片段</strong>'
})

// 分组消息
ElNotification({
  title: '分组消息',
  message: '这是一条分组消息',
  grouping: true,
  type: 'info'
})
```

#### 样式定制
```css
/* 自定义通知样式 */
.custom-notification {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.custom-notification .el-notification__title {
  color: white;
  font-weight: bold;
}

.custom-notification .el-notification__content {
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
}

.custom-notification .el-notification__closeBtn {
  color: white;
  font-size: 16px;
}

.custom-notification .el-notification__closeBtn:hover {
  color: rgba(255, 255, 255, 0.8);
}

/* 响应式通知 */
@media (max-width: 768px) {
  .el-notification {
    width: 90%;
    margin: 10px;
  }
}
```

#### 使用场景
1. **操作反馈**: 用户操作后的成功、失败、警告提示
2. **系统通知**: 系统状态变化、更新提醒等
3. **消息提醒**: 新消息、邮件、任务等提醒
4. **错误提示**: 表单验证错误、网络错误等
5. **进度通知**: 长时间操作的进度提醒

#### 注意事项
1. **自动关闭**: 默认 4.5 秒后自动关闭，可以通过 `duration` 属性设置
2. **手动关闭**: 设置 `duration: 0` 可以禁用自动关闭，然后调用 `close()` 方法手动关闭
3. **HTML 内容**: 使用 `dangerouslyUseHTMLString: true` 可以渲染 HTML 内容，但要注意 XSS 风险
4. **位置控制**: 可以通过 `position` 属性控制通知出现的位置
5. **分组显示**: 使用 `grouping: true` 可以合并相同内容的消息
6. **全局配置**: 可以通过 `ElNotification.defaults` 设置全局默认值
7. **性能考虑**: 避免同时显示过多通知，影响用户体验 