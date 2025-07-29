### 2. Message 消息提示
- **用途**: 消息提示
- **特点**: 支持多种类型、自动关闭

#### 详细用法
```vue
<template>
  <div>
    <el-button :plain="true" @click="open1">显示消息提示</el-button>
    <el-button :plain="true" @click="open2">显示成功提示</el-button>
    <el-button :plain="true" @click="open3">显示警告提示</el-button>
    <el-button :plain="true" @click="open4">显示错误提示</el-button>
    <el-button :plain="true" @click="open5">显示 VNode</el-button>
    <el-button :plain="true" @click="open6">显示 HTML</el-button>
    <el-button :plain="true" @click="open7">显示分组消息</el-button>
  </div>
</template>

<script setup>
import { h } from 'vue'
import { ElMessage } from 'element-plus'

const open1 = () => {
  ElMessage('这是一条消息提示')
}

const open2 = () => {
  ElMessage({
    message: '恭喜你，这是一条成功消息',
    type: 'success',
  })
}

const open3 = () => {
  ElMessage({
    message: '警告哦，这是一条警告消息',
    type: 'warning',
  })
}

const open4 = () => {
  ElMessage.error('错了哦，这是一条错误消息')
}

const open5 = () => {
  ElMessage({
    message: h('p', null, [
      h('span', null, '内容可以是 '),
      h('i', { style: 'color: teal' }, 'VNode')
    ]),
  })
}

const open6 = () => {
  ElMessage({
    dangerouslyUseHTMLString: true,
    message: '<strong>这是 <i>HTML</i> 片段</strong>'
  })
}

const open7 = () => {
  ElMessage({
    message: '这是一条消息提示',
    grouping: true,
    type: 'info'
  })
  ElMessage({
    message: '这是一条消息提示',
    grouping: true,
    type: 'info'
  })
  ElMessage({
    message: '这是一条消息提示',
    grouping: true,
    type: 'info'
  })
}

// 全局配置
const openWithConfig = () => {
  ElMessage({
    message: '这是一条消息提示',
    type: 'success',
    duration: 5000, // 显示时间
    showClose: true, // 显示关闭按钮
    center: true, // 居中显示
    offset: 80, // 距离顶部的偏移量
    customClass: 'my-message', // 自定义类名
    onClose: () => {
      console.log('消息已关闭')
    }
  })
}

// 手动关闭
const openManualClose = () => {
  const message = ElMessage({
    message: '这是一条消息提示',
    type: 'info',
    duration: 0, // 不自动关闭
    showClose: true
  })
  
  // 3秒后手动关闭
  setTimeout(() => {
    message.close()
  }, 3000)
}
</script>

<style scoped>
.my-message {
  background-color: #f0f9ff;
  border-color: #409eff;
}
</style>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| message | 消息文字 | string / VNode | — | — |
| type | 消息类型 | string | success / warning / info / error | info |
| iconClass | 自定义图标的类名，会覆盖 type | string | — | — |
| dangerouslyUseHTMLString | 是否将 message 属性作为 HTML 字符串处理 | boolean | — | false |
| customClass | 自定义类名 | string | — | — |
| duration | 显示时间, 毫秒。设为 0 则不会自动关闭 | number | — | 3000 |
| showClose | 是否显示关闭按钮 | boolean | — | false |
| center | 文字是否居中 | boolean | — | false |
| onClose | 关闭时的回调函数, 参数为被关闭的 message 实例 | function | — | — |
| offset | Message 距离窗口顶部的偏移量 | number | — | 20 |
| appendTo | 设置组件的根元素 | string / HTMLElement | — | document.body |
| grouping | 合并内容相同的消息，不支持 VNode 类型的消息 | boolean | — | false |

#### 方法
| 方法名 | 说明 | 参数 |
|--------|------|------|
| close | 关闭当前的 Message | — |

#### 静态方法
| 方法名 | 说明 | 参数 |
|--------|------|------|
| ElMessage(options) | 显示消息提示 | options / message |
| ElMessage.success(options) | 显示成功消息提示 | options / message |
| ElMessage.warning(options) | 显示警告消息提示 | options / message |
| ElMessage.info(options) | 显示消息提示 | options / message |
| ElMessage.error(options) | 显示错误消息提示 | options / message |

#### 全局配置
```javascript
// 在 main.js 中配置
import { ElMessage } from 'element-plus'

// 配置全局默认值
ElMessage.defaults = {
  duration: 3000,
  showClose: false,
  center: false,
  offset: 20
}
```

#### 使用示例
```javascript
// 基础用法
ElMessage('这是一条消息提示')

// 成功消息
ElMessage.success('恭喜你，这是一条成功消息')

// 警告消息
ElMessage.warning('警告哦，这是一条警告消息')

// 错误消息
ElMessage.error('错了哦，这是一条错误消息')

// 带配置的消息
ElMessage({
  message: '这是一条消息提示',
  type: 'success',
  duration: 5000,
  showClose: true,
  center: true,
  offset: 80,
  customClass: 'my-message',
  onClose: () => {
    console.log('消息已关闭')
  }
})

// 手动关闭
const message = ElMessage({
  message: '这是一条消息提示',
  type: 'info',
  duration: 0,
  showClose: true
})

// 3秒后手动关闭
setTimeout(() => {
  message.close()
}, 3000)
```

#### 注意事项
1. **自动关闭**: 默认 3 秒后自动关闭，可以通过 `duration` 属性设置
2. **手动关闭**: 设置 `duration: 0` 可以禁用自动关闭，然后调用 `close()` 方法手动关闭
3. **HTML 内容**: 使用 `dangerouslyUseHTMLString: true` 可以渲染 HTML 内容，但要注意 XSS 风险
4. **VNode 支持**: 可以直接传入 VNode 作为消息内容
5. **分组显示**: 使用 `grouping: true` 可以合并相同内容的消息
6. **全局配置**: 可以通过 `ElMessage.defaults` 设置全局默认值 