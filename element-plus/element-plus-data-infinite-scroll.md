### 37. Infinite Scroll 无限滚动
- **用途**: 在有限容器内无限滚动加载数据
- **特点**: 支持自动加载、手动触发、自定义距离、禁用状态

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <ul 
    v-infinite-scroll="load" 
    class="infinite-list" 
    style="overflow: auto"
  >
    <li v-for="i in count" :key="i" class="infinite-list-item">
      {{ i }}
    </li>
  </ul>

  <!-- 禁用状态 -->
  <ul 
    v-infinite-scroll="load" 
    :infinite-scroll-disabled="disabled"
    class="infinite-list" 
    style="overflow: auto"
  >
    <li v-for="i in count" :key="i" class="infinite-list-item">
      {{ i }}
    </li>
  </ul>

  <!-- 自定义距离 -->
  <ul 
    v-infinite-scroll="load" 
    :infinite-scroll-distance="10"
    class="infinite-list" 
    style="overflow: auto"
  >
    <li v-for="i in count" :key="i" class="infinite-list-item">
      {{ i }}
    </li>
  </ul>

  <!-- 延迟加载 -->
  <ul 
    v-infinite-scroll="load" 
    :infinite-scroll-delay="1000"
    class="infinite-list" 
    style="overflow: auto"
  >
    <li v-for="i in count" :key="i" class="infinite-list-item">
      {{ i }}
    </li>
  </ul>

  <!-- 在页面中使用 -->
  <div class="infinite-scroll-container">
    <h3>无限滚动示例</h3>
    
    <!-- 控制面板 -->
    <div class="control-panel">
      <el-button @click="resetData">重置数据</el-button>
      <el-button @click="toggleLoading" :loading="loading">
        {{ loading ? '停止加载' : '开始加载' }}
      </el-button>
      <el-switch v-model="autoLoad" active-text="自动加载" />
      <el-input-number 
        v-model="loadDistance" 
        :min="1" 
        :max="100" 
        label="触发距离"
      />
    </div>

    <!-- 图片列表 -->
    <div class="image-gallery">
      <h4>图片画廊</h4>
      <div 
        v-infinite-scroll="loadImages"
        :infinite-scroll-disabled="!autoLoad || loading"
        :infinite-scroll-distance="loadDistance"
        :infinite-scroll-delay="500"
        class="gallery-container"
        style="overflow: auto; height: 400px;"
      >
        <div 
          v-for="image in imageList" 
          :key="image.id"
          class="image-item"
        >
          <el-image 
            :src="image.url" 
            :alt="image.title"
            fit="cover"
            loading="lazy"
          />
          <div class="image-info">
            <h5>{{ image.title }}</h5>
            <p>{{ image.description }}</p>
          </div>
        </div>
        
        <!-- 加载状态 -->
        <div v-if="loading" class="loading-more">
          <el-icon class="is-loading"><Loading /></el-icon>
          <span>加载中...</span>
        </div>
        
        <!-- 没有更多数据 -->
        <div v-if="noMore" class="no-more">
          <span>没有更多数据了</span>
        </div>
      </div>
    </div>

    <!-- 文章列表 -->
    <div class="article-list">
      <h4>文章列表</h4>
      <div 
        v-infinite-scroll="loadArticles"
        :infinite-scroll-disabled="!autoLoad || articleLoading"
        :infinite-scroll-distance="loadDistance"
        class="article-container"
        style="overflow: auto; height: 500px;"
      >
        <el-card 
          v-for="article in articleList" 
          :key="article.id"
          class="article-item"
        >
          <template #header>
            <div class="article-header">
              <h5>{{ article.title }}</h5>
              <el-tag size="small" :type="article.categoryType">
                {{ article.category }}
              </el-tag>
            </div>
          </template>
          <div class="article-content">
            <p>{{ article.summary }}</p>
            <div class="article-meta">
              <span>作者: {{ article.author }}</span>
              <span>发布时间: {{ article.publishTime }}</span>
              <span>阅读量: {{ article.views }}</span>
            </div>
          </div>
        </el-card>
        
        <!-- 加载状态 -->
        <div v-if="articleLoading" class="loading-more">
          <el-icon class="is-loading"><Loading /></el-icon>
          <span>加载更多文章...</span>
        </div>
        
        <!-- 没有更多数据 -->
        <div v-if="articleNoMore" class="no-more">
          <span>已加载全部文章</span>
        </div>
      </div>
    </div>

    <!-- 评论列表 -->
    <div class="comment-list">
      <h4>评论列表</h4>
      <div 
        v-infinite-scroll="loadComments"
        :infinite-scroll-disabled="!autoLoad || commentLoading"
        :infinite-scroll-distance="loadDistance"
        class="comment-container"
        style="overflow: auto; height: 400px;"
      >
        <div 
          v-for="comment in commentList" 
          :key="comment.id"
          class="comment-item"
        >
          <div class="comment-avatar">
            <el-avatar :src="comment.avatar" :size="40">
              {{ comment.username.charAt(0) }}
            </el-avatar>
          </div>
          <div class="comment-content">
            <div class="comment-header">
              <span class="username">{{ comment.username }}</span>
              <span class="time">{{ comment.time }}</span>
            </div>
            <div class="comment-text">{{ comment.content }}</div>
            <div class="comment-actions">
              <el-button size="small" type="text">回复</el-button>
              <el-button size="small" type="text">点赞</el-button>
            </div>
          </div>
        </div>
        
        <!-- 加载状态 -->
        <div v-if="commentLoading" class="loading-more">
          <el-icon class="is-loading"><Loading /></el-icon>
          <span>加载更多评论...</span>
        </div>
        
        <!-- 没有更多数据 -->
        <div v-if="commentNoMore" class="no-more">
          <span>已加载全部评论</span>
        </div>
      </div>
    </div>

    <!-- 数据统计 -->
    <div class="data-stats">
      <el-card>
        <template #header>
          <div class="card-header">
            <span>数据统计</span>
          </div>
        </template>
        <div class="stats-content">
          <div class="stat-item">
            <span class="stat-label">图片数量:</span>
            <span class="stat-value">{{ imageList.length }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">文章数量:</span>
            <span class="stat-value">{{ articleList.length }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">评论数量:</span>
            <span class="stat-value">{{ commentList.length }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">加载状态:</span>
            <span class="stat-value" :class="loading ? 'loading' : 'idle'">
              {{ loading ? '加载中' : '空闲' }}
            </span>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Loading } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

// 基础数据
const count = ref(0)
const disabled = ref(false)

// 控制面板
const loading = ref(false)
const autoLoad = ref(true)
const loadDistance = ref(10)

// 图片列表
const imageList = ref([])
const imagePage = ref(1)
const noMore = ref(false)

// 文章列表
const articleList = ref([])
const articlePage = ref(1)
const articleLoading = ref(false)
const articleNoMore = ref(false)

// 评论列表
const commentList = ref([])
const commentPage = ref(1)
const commentLoading = ref(false)
const commentNoMore = ref(false)

// 基础加载函数
const load = () => {
  count.value += 2
}

// 图片加载函数
const loadImages = async () => {
  if (loading.value || noMore.value) return
  
  loading.value = true
  
  // 模拟异步加载
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // 模拟数据
  const newImages = []
  for (let i = 0; i < 10; i++) {
    const id = imageList.value.length + i + 1
    newImages.push({
      id,
      url: `https://picsum.photos/300/200?random=${id}`,
      title: `图片 ${id}`,
      description: `这是第 ${id} 张图片的描述信息`
    })
  }
  
  imageList.value.push(...newImages)
  imagePage.value++
  
  // 模拟数据加载完毕
  if (imagePage.value > 5) {
    noMore.value = true
  }
  
  loading.value = false
  ElMessage.success(`加载了 ${newImages.length} 张图片`)
}

// 文章加载函数
const loadArticles = async () => {
  if (articleLoading.value || articleNoMore.value) return
  
  articleLoading.value = true
  
  // 模拟异步加载
  await new Promise(resolve => setTimeout(resolve, 800))
  
  // 模拟数据
  const categories = ['技术', '生活', '娱乐', '科技']
  const categoryTypes = ['primary', 'success', 'warning', 'info']
  
  const newArticles = []
  for (let i = 0; i < 8; i++) {
    const id = articleList.value.length + i + 1
    const categoryIndex = Math.floor(Math.random() * categories.length)
    newArticles.push({
      id,
      title: `文章标题 ${id}`,
      category: categories[categoryIndex],
      categoryType: categoryTypes[categoryIndex],
      summary: `这是第 ${id} 篇文章的摘要内容，包含了文章的主要信息和要点...`,
      author: `作者${id}`,
      publishTime: `2024-01-${String(id % 30 + 1).padStart(2, '0')}`,
      views: Math.floor(Math.random() * 10000) + 100
    })
  }
  
  articleList.value.push(...newArticles)
  articlePage.value++
  
  // 模拟数据加载完毕
  if (articlePage.value > 4) {
    articleNoMore.value = true
  }
  
  articleLoading.value = false
  ElMessage.success(`加载了 ${newArticles.length} 篇文章`)
}

// 评论加载函数
const loadComments = async () => {
  if (commentLoading.value || commentNoMore.value) return
  
  commentLoading.value = true
  
  // 模拟异步加载
  await new Promise(resolve => setTimeout(resolve, 600))
  
  // 模拟数据
  const usernames = ['张三', '李四', '王五', '赵六', '钱七', '孙八']
  const comments = [
    '这篇文章写得很好，很有启发性！',
    '感谢分享，学到了很多知识。',
    '内容很实用，期待更多类似的文章。',
    '分析得很透彻，点赞！',
    '这个观点很新颖，值得思考。',
    '写得非常详细，对初学者很有帮助。'
  ]
  
  const newComments = []
  for (let i = 0; i < 6; i++) {
    const id = commentList.value.length + i + 1
    const username = usernames[Math.floor(Math.random() * usernames.length)]
    const comment = comments[Math.floor(Math.random() * comments.length)]
    newComments.push({
      id,
      username,
      avatar: `https://picsum.photos/40/40?random=${id}`,
      content: comment,
      time: `2024-01-${String(id % 30 + 1).padStart(2, '0')} ${String(id % 24).padStart(2, '0')}:${String(id % 60).padStart(2, '0')}`
    })
  }
  
  commentList.value.push(...newComments)
  commentPage.value++
  
  // 模拟数据加载完毕
  if (commentPage.value > 3) {
    commentNoMore.value = true
  }
  
  commentLoading.value = false
  ElMessage.success(`加载了 ${newComments.length} 条评论`)
}

// 控制函数
const resetData = () => {
  imageList.value = []
  articleList.value = []
  commentList.value = []
  imagePage.value = 1
  articlePage.value = 1
  commentPage.value = 1
  noMore.value = false
  articleNoMore.value = false
  commentNoMore.value = false
  loading.value = false
  articleLoading.value = false
  commentLoading.value = false
  ElMessage.success('数据已重置')
}

const toggleLoading = () => {
  if (loading.value) {
    loading.value = false
    ElMessage.info('已停止加载')
  } else {
    loading.value = true
    loadImages()
  }
}

// 初始化加载
loadImages()
loadArticles()
loadComments()
</script>

<style scoped>
.infinite-scroll-container {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}

.infinite-list {
  height: 300px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: #fff6e7;
  color: #ff9a23;
  margin: 10px;
  border-radius: 4px;
}

.control-panel {
  margin: 20px 0;
  padding: 20px;
  background: #f5f7fa;
  border-radius: 4px;
  display: flex;
  gap: 15px;
  align-items: center;
  flex-wrap: wrap;
}

.image-gallery,
.article-list,
.comment-list {
  margin: 30px 0;
}

.image-gallery h4,
.article-list h4,
.comment-list h4 {
  margin: 0 0 15px 0;
  color: #303133;
}

.gallery-container {
  border: 1px solid #ebeef5;
  border-radius: 4px;
  padding: 15px;
}

.image-item {
  display: inline-block;
  width: 200px;
  margin: 10px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  overflow: hidden;
}

.image-item .el-image {
  width: 100%;
  height: 150px;
}

.image-info {
  padding: 10px;
}

.image-info h5 {
  margin: 0 0 5px 0;
  color: #303133;
  font-size: 14px;
}

.image-info p {
  margin: 0;
  color: #606266;
  font-size: 12px;
}

.article-container {
  border: 1px solid #ebeef5;
  border-radius: 4px;
  padding: 15px;
}

.article-item {
  margin-bottom: 15px;
}

.article-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.article-header h5 {
  margin: 0;
  color: #303133;
}

.article-content p {
  margin: 0 0 10px 0;
  color: #606266;
  line-height: 1.6;
}

.article-meta {
  display: flex;
  gap: 20px;
  font-size: 12px;
  color: #909399;
}

.comment-container {
  border: 1px solid #ebeef5;
  border-radius: 4px;
  padding: 15px;
}

.comment-item {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  background: #fff;
}

.comment-content {
  flex: 1;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.username {
  font-weight: bold;
  color: #303133;
}

.time {
  font-size: 12px;
  color: #909399;
}

.comment-text {
  color: #606266;
  line-height: 1.6;
  margin-bottom: 10px;
}

.comment-actions {
  display: flex;
  gap: 15px;
}

.loading-more,
.no-more {
  text-align: center;
  padding: 20px;
  color: #909399;
  font-size: 14px;
}

.loading-more .el-icon {
  margin-right: 8px;
  font-size: 16px;
}

.data-stats {
  margin: 30px 0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stats-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #f5f7fa;
  border-radius: 4px;
}

.stat-label {
  color: #606266;
  font-size: 14px;
}

.stat-value {
  font-weight: bold;
  color: #303133;
}

.stat-value.loading {
  color: #409eff;
}

.stat-value.idle {
  color: #67c23a;
}
</style>

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| infinite-scroll-disabled | 是否禁用 | boolean | — | false |
| infinite-scroll-delay | 节流时延，单位为毫秒 | number | — | 200 |
| infinite-scroll-distance | 触发加载的距离阈值，单位为像素 | number | — | 0 |
| infinite-scroll-immediate | 是否立即执行加载方法，以防初始状态下内容无法撑满容器 | boolean | — | true |

#### 使用场景
1. **图片画廊**: 无限加载图片列表
2. **文章列表**: 分页加载文章内容
3. **评论列表**: 无限加载评论数据
4. **商品列表**: 电商网站的商品展示
5. **社交动态**: 社交媒体信息流
6. **搜索结果**: 搜索结果的无限加载
7. **数据表格**: 大数据量的表格展示 