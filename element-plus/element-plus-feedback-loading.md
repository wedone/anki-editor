### 5. Loading 加载
- **用途**: 加载状态
- **特点**: 支持全屏、局部加载

#### 详细用法
```vue
<template>
  <div>
    <!-- 基础用法 -->
    <el-button type="primary" @click="openFullScreen1" v-loading.fullscreen.lock="fullscreenLoading">
      指令方式
    </el-button>
    <el-button type="primary" @click="openFullScreen2">
      服务方式
    </el-button>

    <!-- 局部加载 -->
    <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>

    <!-- 自定义加载文案 -->
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>

    <!-- 整页加载 -->
    <div v-loading="fullscreenLoading" element-loading-text="拼命加载中..." element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
      </el-table>
    </div>

    <!-- 自定义加载图标 -->
    <el-table
      v-loading="loading"
      element-loading-spinner="el-icon-loading"
      element-loading-text="加载中..."
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>

    <!-- 按钮加载状态 -->
    <el-button type="primary" :loading="buttonLoading" @click="handleButtonClick">
      {{ buttonLoading ? '加载中' : '点击加载' }}
    </el-button>

    <!-- 卡片加载状态 -->
    <el-card v-loading="cardLoading" style="width: 300px; margin: 20px 0;">
      <template #header>
        <span>卡片标题</span>
      </template>
      <div>卡片内容</div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElLoading } from 'element-plus'

const loading = ref(false)
const fullscreenLoading = ref(false)
const buttonLoading = ref(false)
const cardLoading = ref(false)

const tableData = ref([
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
])

// 指令方式全屏加载
const openFullScreen1 = () => {
  fullscreenLoading.value = true
  setTimeout(() => {
    fullscreenLoading.value = false
  }, 2000)
}

// 服务方式全屏加载
const openFullScreen2 = () => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  setTimeout(() => {
    loading.close()
  }, 2000)
}

// 按钮加载
const handleButtonClick = () => {
  buttonLoading.value = true
  setTimeout(() => {
    buttonLoading.value = false
  }, 2000)
}

// 模拟数据加载
const loadData = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}

// 卡片加载
const loadCardData = () => {
  cardLoading.value = true
  setTimeout(() => {
    cardLoading.value = false
  }, 2000)
}

// 自定义加载服务
const openCustomLoading = () => {
  const loading = ElLoading.service({
    lock: true,
    text: '自定义加载文案...',
    background: 'rgba(0, 0, 0, 0.8)',
    customClass: 'custom-loading'
  })
  
  setTimeout(() => {
    loading.close()
  }, 3000)
}

// 局部加载服务
const openLocalLoading = () => {
  const loading = ElLoading.service({
    target: '.el-table',
    text: '局部加载中...',
    background: 'rgba(255, 255, 255, 0.8)'
  })
  
  setTimeout(() => {
    loading.close()
  }, 2000)
}
</script>

<style scoped>
.custom-loading .el-loading-spinner .el-loading-text {
  color: #409eff;
  font-size: 16px;
}

.custom-loading .el-loading-spinner .path {
  stroke: #409eff;
}
</style>
```

#### 指令用法
```vue
<template>
  <!-- 基础用法 -->
  <div v-loading="loading">
    加载内容
  </div>

  <!-- 自定义文案 -->
  <div v-loading="loading" element-loading-text="拼命加载中...">
    加载内容
  </div>

  <!-- 自定义图标 -->
  <div v-loading="loading" element-loading-spinner="el-icon-loading">
    加载内容
  </div>

  <!-- 自定义背景 -->
  <div v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    加载内容
  </div>

  <!-- 全屏加载 -->
  <div v-loading.fullscreen.lock="fullscreenLoading">
    全屏加载内容
  </div>

  <!-- 指定容器 -->
  <div v-loading="loading" element-loading-text="加载中..." element-loading-target=".loading-container">
    <div class="loading-container">
      指定容器加载内容
    </div>
  </div>
</template>
```

#### 服务用法
```javascript
import { ElLoading } from 'element-plus'

// 全屏加载
const loading = ElLoading.service({
  lock: true,
  text: 'Loading',
  background: 'rgba(0, 0, 0, 0.7)',
})

// 关闭加载
loading.close()

// 局部加载
const loading = ElLoading.service({
  target: '.el-table',
  text: '局部加载中...',
  background: 'rgba(255, 255, 255, 0.8)'
})

// 自定义配置
const loading = ElLoading.service({
  lock: true,
  text: '自定义加载文案...',
  background: 'rgba(0, 0, 0, 0.8)',
  customClass: 'custom-loading',
  spinner: 'el-icon-loading',
  target: document.body
})
```

#### 指令参数
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| v-loading | 是否显示加载动画 | boolean | — | false |
| element-loading-text | 显示在加载图标下方的加载文案 | string | — | — |
| element-loading-spinner | 自定义加载图标类名 | string | — | — |
| element-loading-background | 遮罩背景色 | string | — | — |
| element-loading-custom-class | 遮罩的自定义类名 | string | — | — |
| element-loading-target | Loading 需要覆盖的 DOM 节点。可传入一个 DOM 对象或者字符串；若传入字符串，则会将其作为参数传入 document.querySelector以获取到对应 DOM 节点 | object / string | — | document.body |
| element-loading-body | 同 v-loading 指令中的 element-loading-body 属性 | boolean | — | false |
| element-loading-fullscreen | 同 v-loading 指令中的 element-loading-fullscreen 属性 | boolean | — | false |
| element-loading-lock | 同 v-loading 指令中的 element-loading-lock 属性 | boolean | — | false |

#### 服务配置项
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| target | Loading 需要覆盖的 DOM 节点。可传入一个 DOM 对象或者字符串；若传入字符串，则会将其作为参数传入 document.querySelector以获取到对应 DOM 节点 | object / string | — | document.body |
| body | 同 v-loading 指令中的 element-loading-body 属性 | boolean | — | false |
| fullscreen | 同 v-loading 指令中的 element-loading-fullscreen 属性 | boolean | — | true |
| lock | 同 v-loading 指令中的 element-loading-lock 属性 | boolean | — | false |
| text | 显示在加载图标下方的加载文案 | string | — | — |
| spinner | 自定义加载图标类名 | string | — | — |
| background | 遮罩背景色 | string | — | — |
| customClass | 遮罩的自定义类名 | string | — | — |

#### 方法
| 方法名 | 说明 | 参数 |
|--------|------|------|
| close | 关闭 Loading 实例 | — |

#### 全局配置
```javascript
// 在 main.js 中配置
import { ElLoading } from 'element-plus'

// 配置全局默认值
ElLoading.defaults = {
  lock: true,
  text: 'Loading',
  background: 'rgba(0, 0, 0, 0.7)',
  customClass: ''
}
```

#### 使用场景
1. **页面初始化加载**: 在页面首次加载数据时显示
2. **表单提交**: 在表单提交过程中显示
3. **数据刷新**: 在刷新数据时显示
4. **文件上传**: 在文件上传过程中显示
5. **异步操作**: 在任何异步操作过程中显示

#### 注意事项
1. **性能考虑**: 避免在短时间内频繁显示/隐藏 Loading
2. **用户体验**: 合理设置加载时间，避免用户等待过久
3. **文案设计**: 提供有意义的加载文案，让用户了解当前状态
4. **样式定制**: 可以通过 CSS 自定义 Loading 的样式
5. **全屏锁定**: 使用 `lock: true` 可以防止用户在加载期间进行其他操作 