### 4. Alert 提示
- **用途**: 警告提示
- **特点**: 支持多种类型、可关闭

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-alert
    title="成功提示的文案"
    type="success"
  />

  <el-alert
    title="消息提示的文案"
    type="info"
  />

  <el-alert
    title="警告提示的文案"
    type="warning"
  />

  <el-alert
    title="错误提示的文案"
    type="error"
  />

  <!-- 可关闭的警告提示 -->
  <el-alert
    v-model:visible="visible"
    title="可关闭的警告提示"
    type="warning"
    closable
  />

  <!-- 带有辅助性文字介绍 -->
  <el-alert
    title="带辅助性文字介绍"
    type="success"
    description="这是一句绕口令：黑灰化肥会挥发发灰黑化肥挥发；灰黑化肥会挥发发黑灰化肥发挥。 黑灰化肥会挥发发灰黑化肥黑灰挥发化为灰……"
    show-icon
  />

  <!-- 带有 icon -->
  <el-alert
    title="成功提示的文案"
    type="success"
    show-icon
  />

  <el-alert
    title="消息提示的文案"
    type="info"
    show-icon
  />

  <el-alert
    title="警告提示的文案"
    type="warning"
    show-icon
  />

  <el-alert
    title="错误提示的文案"
    type="error"
    show-icon
  />

  <!-- 文字居中 -->
  <el-alert
    title="成功提示的文案"
    type="success"
    center
    show-icon
  />

  <!-- 带有辅助性文字介绍 -->
  <el-alert
    title="带辅助性文字介绍"
    type="success"
    description="这是一句绕口令：黑灰化肥会挥发发灰黑化肥挥发；灰黑化肥会挥发发黑灰化肥发挥。 黑灰化肥会挥发发灰黑化肥黑灰挥发化为灰……"
    center
    show-icon
  />

  <!-- 带有 icon 和辅助性文字介绍 -->
  <el-alert
    title="成功提示的文案"
    type="success"
    description="文字说明文字说明文字说明文字说明文字说明文字说明"
    show-icon
    center
  />

  <!-- 自定义关闭按钮 -->
  <el-alert
    v-model:visible="visible2"
    title="自定义关闭按钮"
    type="warning"
    :closable="false"
  >
    <template #default>
      自定义关闭按钮
    </template>
    <template #close="{ close }">
      <el-button size="small" @click="close">知道了</el-button>
    </template>
  </el-alert>

  <!-- 带操作按钮 -->
  <el-alert
    title="带操作按钮的警告提示"
    type="warning"
    show-icon
    :closable="false"
  >
    <template #default>
      带操作按钮的警告提示
    </template>
    <template #close>
      <el-button size="small" type="warning">查看详情</el-button>
      <el-button size="small" type="warning">忽略</el-button>
    </template>
  </el-alert>

  <!-- 不同尺寸 -->
  <el-alert
    title="大型警告提示"
    type="warning"
    size="large"
    show-icon
  />

  <el-alert
    title="默认尺寸警告提示"
    type="warning"
    show-icon
  />

  <el-alert
    title="小型警告提示"
    type="warning"
    size="small"
    show-icon
  />

  <!-- 自定义样式 -->
  <el-alert
    title="自定义样式警告提示"
    type="warning"
    custom-class="custom-alert"
    show-icon
  />

  <!-- 带链接的警告提示 -->
  <el-alert
    title="带链接的警告提示"
    type="warning"
    show-icon
  >
    <template #default>
      带链接的警告提示
      <el-link type="primary" href="https://element-plus.org" target="_blank">
        查看详情
      </el-link>
    </template>
  </el-alert>

  <!-- 动态显示隐藏 -->
  <el-button @click="showAlert = !showAlert">
    {{ showAlert ? '隐藏' : '显示' }}警告提示
  </el-button>

  <el-alert
    v-if="showAlert"
    title="动态显示的警告提示"
    type="warning"
    show-icon
    closable
    @close="showAlert = false"
  />

  <!-- 带进度的警告提示 -->
  <el-alert
    title="带进度的警告提示"
    type="warning"
    show-icon
  >
    <template #default>
      <div>上传进度：{{ progress }}%</div>
      <el-progress :percentage="progress" :stroke-width="8" />
    </template>
  </el-alert>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(true)
const visible2 = ref(true)
const showAlert = ref(false)
const progress = ref(0)

// 模拟进度更新
const updateProgress = () => {
  const timer = setInterval(() => {
    progress.value += 10
    if (progress.value >= 100) {
      clearInterval(timer)
    }
  }, 1000)
}

// 页面加载时开始进度更新
updateProgress()
</script>

<style scoped>
.custom-alert {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
}

.custom-alert .el-alert__title {
  color: white;
  font-weight: bold;
}

.custom-alert .el-alert__description {
  color: rgba(255, 255, 255, 0.9);
}

.custom-alert .el-alert__closebtn {
  color: white;
}

.custom-alert .el-alert__closebtn:hover {
  color: rgba(255, 255, 255, 0.8);
}

/* 响应式警告提示 */
@media (max-width: 768px) {
  .el-alert {
    margin: 10px 0;
  }
  
  .el-alert__content {
    padding: 10px;
  }
}
</style>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| title | 标题，必选参数 | string | — | — |
| type | 主题 | string | success / warning / info / error | info |
| description | 辅助性文字。也可通过默认 slot 传入 | string | — | — |
| closable | 是否可关闭 | boolean | — | true |
| center | 文字是否居中 | boolean | — | false |
| close-text | 关闭按钮自定义文本 | string | — | — |
| show-icon | 是否显示图标 | boolean | — | false |
| effect | 显示效果 | string | light / dark | light |
| size | 尺寸 | string | large / default / small | default |
| custom-class | 自定义类名 | string | — | — |

#### 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| close | 关闭 alert 时触发 | — |

#### 插槽
| 插槽名 | 说明 |
|--------|------|
| — | Alert 的内容 |
| title | 自定义标题内容 |
| close | 自定义关闭按钮内容 |

#### 使用示例
```vue
<!-- 基础警告提示 -->
<el-alert title="成功提示的文案" type="success" />

<!-- 带图标的警告提示 -->
<el-alert title="警告提示的文案" type="warning" show-icon />

<!-- 可关闭的警告提示 -->
<el-alert
  v-model:visible="visible"
  title="可关闭的警告提示"
  type="warning"
  closable
/>

<!-- 带描述的警告提示 -->
<el-alert
  title="带描述的警告提示"
  type="info"
  description="这是一段描述文字"
  show-icon
/>

<!-- 自定义关闭按钮 -->
<el-alert
  v-model:visible="visible"
  title="自定义关闭按钮"
  type="warning"
  :closable="false"
>
  <template #close="{ close }">
    <el-button size="small" @click="close">知道了</el-button>
  </template>
</el-alert>

<!-- 带操作按钮 -->
<el-alert
  title="带操作按钮的警告提示"
  type="warning"
  show-icon
  :closable="false"
>
  <template #close>
    <el-button size="small" type="warning">查看详情</el-button>
    <el-button size="small" type="warning">忽略</el-button>
  </template>
</el-alert>

<!-- 不同尺寸 -->
<el-alert title="大型警告提示" type="warning" size="large" show-icon />
<el-alert title="默认尺寸警告提示" type="warning" show-icon />
<el-alert title="小型警告提示" type="warning" size="small" show-icon />

<!-- 自定义样式 -->
<el-alert
  title="自定义样式警告提示"
  type="warning"
  custom-class="custom-alert"
  show-icon
/>
```

#### 样式定制
```css
/* 自定义警告提示样式 */
.custom-alert {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.custom-alert .el-alert__title {
  color: white;
  font-weight: bold;
}

.custom-alert .el-alert__description {
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
}

.custom-alert .el-alert__closebtn {
  color: white;
  font-size: 16px;
}

.custom-alert .el-alert__closebtn:hover {
  color: rgba(255, 255, 255, 0.8);
}

/* 响应式警告提示 */
@media (max-width: 768px) {
  .el-alert {
    margin: 10px 0;
  }
  
  .el-alert__content {
    padding: 10px;
  }
  
  .el-alert__title {
    font-size: 14px;
  }
  
  .el-alert__description {
    font-size: 12px;
  }
}
```

#### 使用场景
1. **表单验证**: 显示表单验证错误信息
2. **操作反馈**: 用户操作后的成功、失败、警告提示
3. **系统状态**: 显示系统状态变化、维护信息等
4. **重要提醒**: 显示重要的系统通知、更新提醒等
5. **错误提示**: 显示网络错误、权限错误等

#### 注意事项
1. **内容简洁**: 警告提示内容应该简洁明了，避免过长
2. **类型选择**: 根据信息的重要程度选择合适的类型
3. **可关闭性**: 对于重要信息，可以设置不可关闭
4. **响应式设计**: 考虑在不同屏幕尺寸下的显示效果
5. **可访问性**: 确保警告提示对屏幕阅读器友好
6. **性能考虑**: 避免在同一页面显示过多警告提示 