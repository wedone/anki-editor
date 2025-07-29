### 31. Empty 空状态
- **用途**: 空状态时的占位提示
- **特点**: 支持自定义图片、描述、操作按钮

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-empty description="暂无数据" />

  <!-- 自定义图片 -->
  <el-empty image="https://shadow.elemecdn.com/app/element/empty.1b7e9f3.svg" />

  <!-- 自定义描述 -->
  <el-empty description="暂无数据，请稍后再试" />

  <!-- 自定义图片尺寸 -->
  <el-empty :image-size="200" />

  <!-- 自定义图片 -->
  <el-empty>
    <template #image>
      <img src="https://shadow.elemecdn.com/app/element/empty.1b7e9f3.svg" />
    </template>
  </el-empty>

  <!-- 带操作按钮 -->
  <el-empty description="暂无数据">
    <el-button type="primary">立即创建</el-button>
  </el-empty>

  <!-- 不同尺寸 -->
  <el-empty size="large" description="大尺寸空状态" />
  <el-empty size="default" description="默认尺寸空状态" />
  <el-empty size="small" description="小尺寸空状态" />

  <!-- 在页面中使用 -->
  <div class="empty-container">
    <h3>搜索结果</h3>
    
    <!-- 搜索无结果 -->
    <div v-if="searchResults.length === 0" class="search-empty">
      <el-empty 
        :image="searchEmptyImage"
        description="没有找到相关结果"
      >
        <template #description>
          <p>抱歉，没有找到与"{{ searchKeyword }}"相关的内容</p>
          <p class="empty-suggestions">建议您：</p>
          <ul class="suggestion-list">
            <li>检查输入的关键词是否正确</li>
            <li>尝试使用更简单的关键词</li>
            <li>使用同义词或相关词汇</li>
          </ul>
        </template>
        <div class="empty-actions">
          <el-button type="primary" @click="clearSearch">清空搜索</el-button>
          <el-button @click="showSuggestions">查看推荐</el-button>
        </div>
      </el-empty>
    </div>

    <!-- 列表无数据 -->
    <div v-else-if="dataList.length === 0" class="list-empty">
      <el-empty 
        :image="listEmptyImage"
        description="暂无数据"
      >
        <template #description>
          <p>当前还没有任何数据</p>
          <p class="empty-tip">点击下方按钮开始创建您的第一个项目</p>
        </template>
        <div class="empty-actions">
          <el-button type="primary" @click="createProject">
            <el-icon><Plus /></el-icon>
            创建项目
          </el-button>
          <el-button @click="importData">
            <el-icon><Upload /></el-icon>
            导入数据
          </el-button>
        </div>
      </el-empty>
    </div>

    <!-- 网络错误 -->
    <div v-else-if="networkError" class="error-empty">
      <el-empty 
        :image="errorImage"
        description="网络连接失败"
      >
        <template #description>
          <p>无法连接到服务器，请检查网络连接</p>
          <p class="error-code">错误代码：{{ errorCode }}</p>
        </template>
        <div class="empty-actions">
          <el-button type="primary" @click="retryConnection">重试连接</el-button>
          <el-button @click="checkNetwork">检查网络</el-button>
        </div>
      </el-empty>
    </div>

    <!-- 权限不足 -->
    <div v-else-if="permissionDenied" class="permission-empty">
      <el-empty 
        :image="permissionImage"
        description="权限不足"
      >
        <template #description>
          <p>您没有访问此内容的权限</p>
          <p class="permission-tip">请联系管理员获取相应权限</p>
        </template>
        <div class="empty-actions">
          <el-button type="primary" @click="requestPermission">申请权限</el-button>
          <el-button @click="contactAdmin">联系管理员</el-button>
        </div>
      </el-empty>
    </div>

    <!-- 正常数据显示 -->
    <div v-else class="data-content">
      <el-table :data="dataList" style="width: 100%">
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="status" label="状态" />
        <el-table-column prop="createTime" label="创建时间" />
      </el-table>
    </div>

    <!-- 状态切换按钮 -->
    <div class="demo-controls">
      <h4>演示控制：</h4>
      <el-button-group>
        <el-button size="small" @click="showSearchEmpty">搜索无结果</el-button>
        <el-button size="small" @click="showListEmpty">列表无数据</el-button>
        <el-button size="small" @click="showNetworkError">网络错误</el-button>
        <el-button size="small" @click="showPermissionDenied">权限不足</el-button>
        <el-button size="small" @click="showNormalData">正常数据</el-button>
      </el-button-group>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Plus, Upload } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

// 状态控制
const searchResults = ref([])
const dataList = ref([])
const networkError = ref(false)
const permissionDenied = ref(false)
const searchKeyword = ref('')
const errorCode = ref('404')

// 图片资源
const searchEmptyImage = ref('https://shadow.elemecdn.com/app/element/empty.1b7e9f3.svg')
const listEmptyImage = ref('https://shadow.elemecdn.com/app/element/empty.1b7e9f3.svg')
const errorImage = ref('https://shadow.elemecdn.com/app/element/empty.1b7e9f3.svg')
const permissionImage = ref('https://shadow.elemecdn.com/app/element/empty.1b7e9f3.svg')

// 演示数据
const demoData = ref([
  { name: '项目A', status: '进行中', createTime: '2024-01-15' },
  { name: '项目B', status: '已完成', createTime: '2024-01-20' },
  { name: '项目C', status: '待开始', createTime: '2024-01-25' }
])

// 状态切换函数
const showSearchEmpty = () => {
  searchResults.value = []
  dataList.value = demoData.value
  networkError.value = false
  permissionDenied.value = false
  searchKeyword.value = '不存在的关键词'
}

const showListEmpty = () => {
  searchResults.value = demoData.value
  dataList.value = []
  networkError.value = false
  permissionDenied.value = false
  searchKeyword.value = ''
}

const showNetworkError = () => {
  searchResults.value = demoData.value
  dataList.value = demoData.value
  networkError.value = true
  permissionDenied.value = false
  searchKeyword.value = ''
}

const showPermissionDenied = () => {
  searchResults.value = demoData.value
  dataList.value = demoData.value
  networkError.value = false
  permissionDenied.value = true
  searchKeyword.value = ''
}

const showNormalData = () => {
  searchResults.value = demoData.value
  dataList.value = demoData.value
  networkError.value = false
  permissionDenied.value = false
  searchKeyword.value = ''
}

// 操作函数
const clearSearch = () => {
  searchKeyword.value = ''
  ElMessage.success('搜索已清空')
}

const showSuggestions = () => {
  ElMessage.info('显示推荐内容')
}

const createProject = () => {
  ElMessage.success('创建项目功能')
}

const importData = () => {
  ElMessage.info('导入数据功能')
}

const retryConnection = () => {
  ElMessage.success('正在重试连接...')
  setTimeout(() => {
    showNormalData()
    ElMessage.success('连接成功')
  }, 2000)
}

const checkNetwork = () => {
  ElMessage.info('检查网络连接')
}

const requestPermission = () => {
  ElMessage.info('权限申请功能')
}

const contactAdmin = () => {
  ElMessage.info('联系管理员功能')
}

// 初始化显示正常数据
showNormalData()
</script>

<style scoped>
.empty-container {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}

.search-empty,
.list-empty,
.error-empty,
.permission-empty {
  padding: 40px 0;
}

.empty-suggestions {
  margin: 10px 0 5px 0;
  font-weight: bold;
  color: #606266;
}

.suggestion-list {
  margin: 0;
  padding-left: 20px;
  color: #909399;
}

.suggestion-list li {
  margin: 5px 0;
}

.empty-tip {
  color: #909399;
  font-size: 14px;
  margin: 5px 0;
}

.error-code {
  color: #f56c6c;
  font-size: 12px;
  margin: 5px 0;
}

.permission-tip {
  color: #e6a23c;
  font-size: 14px;
  margin: 5px 0;
}

.empty-actions {
  margin-top: 20px;
}

.empty-actions .el-button {
  margin: 0 10px;
}

.demo-controls {
  margin-top: 30px;
  padding: 20px;
  background: #f5f7fa;
  border-radius: 4px;
}

.demo-controls h4 {
  margin: 0 0 15px 0;
  color: #303133;
}

.data-content {
  margin: 20px 0;
}
</style>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| image | 图片地址 | string | — | — |
| image-size | 图片大小（宽度） | number | — | — |
| description | 描述文字 | string | — | 暂无数据 |

#### 插槽
| 插槽名 | 说明 |
|--------|------|
| default | 自定义底部内容 |
| image | 自定义图片 |
| description | 自定义描述 |

#### 使用场景
1. **搜索无结果**: 搜索结果为空时的提示
2. **列表无数据**: 数据列表为空时的提示
3. **网络错误**: 网络连接失败时的提示
4. **权限不足**: 用户权限不足时的提示
5. **加载失败**: 数据加载失败时的提示
6. **空状态引导**: 引导用户进行下一步操作
7. **错误状态**: 各种错误状态的友好提示 