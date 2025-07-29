### 6. Message Box 消息弹出框
- **用途**: 确认对话框
- **特点**: 支持多种类型、自定义按钮

#### 详细用法
```vue
<template>
  <div>
    <el-button type="text" @click="open">点击打开 Message Box</el-button>
    <el-button type="text" @click="open2">点击打开 Message Box</el-button>
    <el-button type="text" @click="open3">点击打开 Message Box</el-button>
    <el-button type="text" @click="open4">点击打开 Message Box</el-button>
    <el-button type="text" @click="open5">点击打开 Message Box</el-button>
    <el-button type="text" @click="open6">点击打开 Message Box</el-button>
    <el-button type="text" @click="open7">点击打开 Message Box</el-button>
    <el-button type="text" @click="open8">点击打开 Message Box</el-button>
    <el-button type="text" @click="open9">点击打开 Message Box</el-button>
    <el-button type="text" @click="open10">点击打开 Message Box</el-button>
  </div>
</template>

<script setup>
import { ElMessageBox, ElMessage } from 'element-plus'

const open = () => {
  ElMessageBox.alert('这是一段内容', '标题名称', {
    confirmButtonText: '确定',
    callback: (action) => {
      ElMessage({
        type: 'info',
        message: `action: ${action}`,
      })
    },
  })
}

const open2 = () => {
  ElMessageBox.alert('这是一段内容', 'HTML 片段', {
    dangerouslyUseHTMLString: true,
    confirmButtonText: '确定',
    callback: (action) => {
      ElMessage({
        type: 'info',
        message: `action: ${action}`,
      })
    },
  })
}

const open3 = () => {
  ElMessageBox.confirm(
    '此操作将永久删除该文件, 是否继续?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      ElMessage({
        type: 'success',
        message: '删除成功!',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消删除',
      })
    })
}

const open4 = () => {
  ElMessageBox.confirm(
    '检测到未保存的内容，是否在离开页面前保存修改？',
    '确认信息',
    {
      distinguishCancelAndClose: true,
      confirmButtonText: '保存',
      cancelButtonText: '放弃修改',
    }
  )
    .then(() => {
      ElMessage({
        type: 'info',
        message: '保存修改',
      })
    })
    .catch((action) => {
      ElMessage({
        type: 'info',
        message:
          action === 'cancel'
            ? '放弃保存并离开页面'
            : '停留在当前页面',
      })
    })
}

const open5 = () => {
  ElMessageBox.prompt('请输入邮箱', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPattern:
      /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
    inputErrorMessage: '邮箱格式不正确',
  })
    .then(({ value }) => {
      ElMessage({
        type: 'success',
        message: `你的邮箱是:${value}`,
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消输入',
      })
    })
}

const open6 = () => {
  ElMessageBox.prompt('请输入邮箱', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputType: 'textarea',
    inputPlaceholder: '请输入邮箱地址',
  })
    .then(({ value }) => {
      ElMessage({
        type: 'success',
        message: `你的邮箱是:${value}`,
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消输入',
      })
    })
}

const open7 = () => {
  ElMessageBox.msgbox({
    title: '消息',
    message: h('p', null, [
      h('span', null, '内容可以是 '),
      h('i', { style: 'color: teal' }, 'VNode'),
    ]),
    showCancelButton: true,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true
        instance.confirmButtonText = '执行中...'
        setTimeout(() => {
          done()
          setTimeout(() => {
            instance.confirmButtonLoading = false
          }, 300)
        }, 3000)
      } else {
        done()
      }
    },
  }).then((action) => {
    ElMessage({
      type: 'info',
      message: `action: ${action}`,
    })
  })
}

const open8 = () => {
  ElMessageBox.alert('这是一段内容', '标题名称', {
    confirmButtonText: '确定',
    type: 'warning',
    center: true,
  })
}

const open9 = () => {
  ElMessageBox.alert('这是一段内容', '标题名称', {
    confirmButtonText: '确定',
    dangerouslyUseHTMLString: true,
    message: '<strong>这是 <i>HTML</i> 片段</strong>',
  })
}

const open10 = () => {
  ElMessageBox.alert('这是一段内容', '标题名称', {
    confirmButtonText: '确定',
    customClass: 'custom-message-box',
  })
}

// 更多示例
const openConfirm = () => {
  ElMessageBox.confirm(
    '此操作将永久删除该文件, 是否继续?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      ElMessage({
        type: 'success',
        message: '删除成功!',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消删除',
      })
    })
}

const openPrompt = () => {
  ElMessageBox.prompt('请输入邮箱', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
    inputErrorMessage: '邮箱格式不正确',
  })
    .then(({ value }) => {
      ElMessage({
        type: 'success',
        message: `你的邮箱是:${value}`,
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消输入',
      })
    })
}

const openCustom = () => {
  ElMessageBox({
    title: '自定义消息框',
    message: h('div', null, [
      h('p', null, '这是一个自定义的消息框'),
      h('p', null, '可以包含任何内容'),
    ]),
    showCancelButton: true,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true
        instance.confirmButtonText = '执行中...'
        setTimeout(() => {
          done()
          setTimeout(() => {
            instance.confirmButtonLoading = false
          }, 300)
        }, 3000)
      } else {
        done()
      }
    },
  }).then((action) => {
    ElMessage({
      type: 'info',
      message: `action: ${action}`,
    })
  })
}
</script>

<style scoped>
.custom-message-box {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.custom-message-box .el-message-box__header {
  background-color: rgba(255, 255, 255, 0.1);
}

.custom-message-box .el-message-box__title {
  color: white;
}

.custom-message-box .el-message-box__content {
  color: rgba(255, 255, 255, 0.9);
}

.custom-message-box .el-message-box__btns {
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.custom-message-box .el-button {
  background-color: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
  color: white;
}

.custom-message-box .el-button:hover {
  background-color: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.4);
}
</style>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| title | MessageBox 标题 | string | — | — |
| message | MessageBox 消息正文内容 | string / VNode | — | — |
| dangerouslyUseHTMLString | 是否将 message 属性作为 HTML 字符串处理 | boolean | — | false |
| type | 消息类型，用于显示图标 | string | success / info / warning / error | — |
| iconClass | 自定义图标的类名，会覆盖 type | string | — | — |
| customClass | 自定义类名 | string | — | — |
| showCancelButton | 是否显示取消按钮 | boolean | — | false |
| showConfirmButton | 是否显示确定按钮 | boolean | — | true |
| cancelButtonText | 取消按钮的文本内容 | string | — | 取消 |
| confirmButtonText | 确定按钮的文本内容 | string | —| 确定 |
| cancelButtonClass | 取消按钮的自定义类名 | string | — | — |
| confirmButtonClass | 确定按钮的自定义类名 | string | — | — |
| showInput | 是否显示输入框 | boolean | — | false |
| inputPlaceholder | 输入框的占位符 | string | — | — |
| inputType | 输入框的类型 | string | — | text |
| inputValue | 输入框的初始文本 | string | — | — |
| inputPattern | 输入框的校验表达式 | regexp | — | — |
| inputValidator | 输入框的校验函数。可以返回布尔值或字符串，若返回的是字符串，则会被赋值给 inputErrorMessage | function | — | — |
| inputErrorMessage | 校验未通过时的提示文本 | string | — | 输入的数据不合法! |
| showInputPlaceholder | 是否显示输入框占位符 | boolean | — | true |
| center | 是否居中布局 | boolean | — | false |
| distinguishCancelAndClose | 是否将取消（点击取消按钮）与关闭（点击关闭按钮或遮罩层、按下 ESC 键）进行区分 | boolean | — | false |
| beforeClose | 关闭前的回调，会暂停实例的关闭 | function(action, instance, done) | — | — |
| distinguishCancelAndClose | 是否将取消（点击取消按钮）与关闭（点击关闭按钮或遮罩层、按下 ESC 键）进行区分 | boolean | — | false |
| lockScroll | 是否在 MessageBox 出现时将 body 滚动锁定 | boolean | — | true |
| showClose | 是否显示关闭按钮 | boolean | — | true |
| closeOnClickModal | 是否可以通过点击 modal 关闭 MessageBox | boolean | — | true |
| closeOnPressEscape | 是否可以通过按下 ESC 关闭 MessageBox | boolean | — | true |
| closeOnHashChange | 是否在 hashchange 时关闭 MessageBox | boolean | — | true |
| showInputErrorMessage | 是否显示输入框的错误信息 | boolean | — | true |
| roundButton | 是否使用圆角按钮 | boolean | — | false |
| closeIcon | 自定义关闭图标 | string / Component | — | Close |
| closeIconClass | 自定义关闭图标的类名 | string | — | — |
| center | 是否居中布局 | boolean | — | false |
| draggable | 为 MessageBox 启用可拖拽功能 | boolean | — | false |

#### 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| close | 关闭 MessageBox 时触发 | — |

#### 静态方法
| 方法名 | 说明 | 参数 |
|--------|------|------|
| ElMessageBox.alert(message, title, options) | 显示消息提示框 | message, title, options |
| ElMessageBox.confirm(message, title, options) | 显示确认消息框 | message, title, options |
| ElMessageBox.prompt(message, title, options) | 显示输入消息框 | message, title, options |
| ElMessageBox.msgbox(options) | 显示消息框 | options |

#### 使用示例
```javascript
// 基础用法
ElMessageBox.alert('这是一段内容', '标题名称', {
  confirmButtonText: '确定',
  callback: (action) => {
    console.log(action)
  }
})

// 确认对话框
ElMessageBox.confirm(
  '此操作将永久删除该文件, 是否继续?',
  '提示',
  {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }
)
  .then(() => {
    ElMessage({
      type: 'success',
      message: '删除成功!',
    })
  })
  .catch(() => {
    ElMessage({
      type: 'info',
      message: '已取消删除',
    })
  })

// 输入对话框
ElMessageBox.prompt('请输入邮箱', '提示', {
  confirmButtonText: '确定',
  cancelButtonText: '取消',
  inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
  inputErrorMessage: '邮箱格式不正确',
})
  .then(({ value }) => {
    ElMessage({
      type: 'success',
      message: `你的邮箱是:${value}`,
    })
  })
  .catch(() => {
    ElMessage({
      type: 'info',
      message: '取消输入',
    })
  })

// 自定义消息框
ElMessageBox({
  title: '自定义消息框',
  message: h('div', null, [
    h('p', null, '这是一个自定义的消息框'),
    h('p', null, '可以包含任何内容'),
  ]),
  showCancelButton: true,
  confirmButtonText: '确定',
  cancelButtonText: '取消',
  beforeClose: (action, instance, done) => {
    if (action === 'confirm') {
      instance.confirmButtonLoading = true
      instance.confirmButtonText = '执行中...'
      setTimeout(() => {
        done()
        setTimeout(() => {
          instance.confirmButtonLoading = false
        }, 300)
      }, 3000)
    } else {
      done()
    }
  },
}).then((action) => {
  ElMessage({
    type: 'info',
    message: `action: ${action}`,
  })
})
```

#### 样式定制
```css
/* 自定义消息框样式 */
.custom-message-box {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.custom-message-box .el-message-box__header {
  background-color: rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.custom-message-box .el-message-box__title {
  color: white;
  font-weight: bold;
}

.custom-message-box .el-message-box__content {
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
}

.custom-message-box .el-message-box__btns {
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding: 15px 20px;
}

.custom-message-box .el-button {
  background-color: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
  color: white;
  border-radius: 4px;
}

.custom-message-box .el-button:hover {
  background-color: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.4);
}

/* 响应式消息框 */
@media (max-width: 768px) {
  .el-message-box {
    width: 90%;
    margin: 20px auto;
  }
}
```

#### 使用场景
1. **确认操作**: 删除、保存等重要操作的确认
2. **输入验证**: 需要用户输入信息的场景
3. **警告提示**: 显示重要的警告信息
4. **自定义对话框**: 复杂的交互对话框
5. **表单确认**: 表单提交前的确认

#### 注意事项
1. **用户体验**: 合理使用确认对话框，避免过度使用
2. **按钮文案**: 使用清晰的按钮文案，让用户明确操作结果
3. **输入验证**: 对用户输入进行适当的验证
4. **异步操作**: 在异步操作中使用 `beforeClose` 回调
5. **可访问性**: 确保消息框对键盘导航和屏幕阅读器友好
6. **性能考虑**: 避免在短时间内频繁显示消息框 