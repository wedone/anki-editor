### 32. Image 图片
- **用途**: 图片展示和预览
- **特点**: 支持懒加载、预览、占位符、错误处理

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-image 
    style="width: 100px; height: 100px"
    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
    fit="cover"
  />

  <!-- 不同填充模式 -->
  <div class="image-demo">
    <div v-for="fit in fits" :key="fit" class="image-item">
      <span class="image-label">{{ fit }}</span>
      <el-image 
        style="width: 100px; height: 100px"
        src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        :fit="fit"
      />
    </div>
  </div>

  <!-- 懒加载 -->
  <el-image 
    style="width: 300px; height: 200px"
    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
    lazy
  />

  <!-- 占位符 -->
  <el-image 
    style="width: 300px; height: 200px"
    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
  >
    <template #placeholder>
      <div class="image-slot">
        <el-icon><Loading /></el-icon>
      </div>
    </template>
  </el-image>

  <!-- 错误处理 -->
  <el-image 
    style="width: 300px; height: 200px"
    src="https://example.com/error-image.jpg"
  >
    <template #error>
      <div class="image-slot">
        <el-icon><Picture /></el-icon>
      </div>
    </template>
  </el-image>

  <!-- 预览功能 -->
  <el-image 
    style="width: 100px; height: 100px"
    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
    :preview-src-list="srcList"
    :initial-index="4"
    fit="cover"
  />

  <!-- 禁用预览 -->
  <el-image 
    style="width: 100px; height: 100px"
    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
    :preview-src-list="[]"
  />

  <!-- 自定义预览 -->
  <el-image 
    style="width: 100px; height: 100px"
    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
    :preview-src-list="srcList"
    :hide-on-click-modal="false"
  />

  <!-- 不同尺寸 -->
  <el-image 
    size="large"
    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
  />
  <el-image 
    size="default"
    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
  />
  <el-image 
    size="small"
    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
  />

  <!-- 在页面中使用 -->
  <div class="image-container">
    <h3>产品图片展示</h3>
    
    <!-- 产品图片网格 -->
    <div class="product-gallery">
      <div 
        v-for="(image, index) in productImages" 
        :key="index"
        class="gallery-item"
      >
        <el-image 
          :src="image.url"
          :alt="image.alt"
          fit="cover"
          :preview-src-list="productImageUrls"
          :initial-index="index"
          class="product-image"
          @load="handleImageLoad(index)"
          @error="handleImageError(index)"
        >
          <template #placeholder>
            <div class="image-placeholder">
              <el-icon class="is-loading"><Loading /></el-icon>
              <span>加载中...</span>
            </div>
          </template>
          <template #error>
            <div class="image-error">
              <el-icon><Picture /></el-icon>
              <span>加载失败</span>
            </div>
          </template>
        </el-image>
        
        <!-- 图片信息 -->
        <div class="image-info">
          <span class="image-name">{{ image.name }}</span>
          <div class="image-actions">
            <el-button 
              size="small" 
              type="primary" 
              @click="downloadImage(image)"
            >
              <el-icon><Download /></el-icon>
              下载
            </el-button>
            <el-button 
              size="small" 
              @click="editImage(image)"
            >
              <el-icon><Edit /></el-icon>
              编辑
            </el-button>
            <el-button 
              size="small" 
              type="danger" 
              @click="deleteImage(index)"
            >
              <el-icon><Delete /></el-icon>
              删除
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 图片上传 -->
    <div class="upload-section">
      <h4>上传新图片</h4>
      <el-upload
        action="#"
        list-type="picture-card"
        :auto-upload="false"
        :on-change="handleFileChange"
        :on-remove="handleFileRemove"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>
    </div>

    <!-- 图片统计 -->
    <div class="image-stats">
      <el-card>
        <template #header>
          <div class="card-header">
            <span>图片统计</span>
          </div>
        </template>
        <div class="stats-content">
          <div class="stat-item">
            <span class="stat-label">总图片数:</span>
            <span class="stat-value">{{ productImages.length }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">已加载:</span>
            <span class="stat-value success">{{ loadedCount }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">加载失败:</span>
            <span class="stat-value error">{{ errorCount }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">总大小:</span>
            <span class="stat-value">{{ totalSize }}</span>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { 
  Loading, 
  Picture, 
  Download, 
  Edit, 
  Delete, 
  Plus 
} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// 填充模式
const fits = ref(['fill', 'contain', 'cover', 'none', 'scale-down'])

// 预览图片列表
const srcList = ref([
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
  'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
  'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
  'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
  'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
  'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
])

// 产品图片数据
const productImages = ref([
  {
    url: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
    alt: '产品主图',
    name: '主图.jpg',
    size: '2.3MB',
    status: 'loaded'
  },
  {
    url: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
    alt: '产品细节图1',
    name: '细节图1.jpg',
    size: '1.8MB',
    status: 'loaded'
  },
  {
    url: 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
    alt: '产品细节图2',
    name: '细节图2.jpg',
    size: '2.1MB',
    status: 'loaded'
  },
  {
    url: 'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
    alt: '产品包装图',
    name: '包装图.jpg',
    size: '1.5MB',
    status: 'loaded'
  },
  {
    url: 'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
    alt: '产品使用图',
    name: '使用图.jpg',
    size: '2.7MB',
    status: 'loaded'
  }
])

// 计算属性
const productImageUrls = computed(() => {
  return productImages.value.map(img => img.url)
})

const loadedCount = computed(() => {
  return productImages.value.filter(img => img.status === 'loaded').length
})

const errorCount = computed(() => {
  return productImages.value.filter(img => img.status === 'error').length
})

const totalSize = computed(() => {
  const total = productImages.value.reduce((sum, img) => {
    return sum + parseFloat(img.size.replace('MB', ''))
  }, 0)
  return total.toFixed(1) + 'MB'
})

// 事件处理函数
const handleImageLoad = (index) => {
  productImages.value[index].status = 'loaded'
  ElMessage.success(`图片 ${productImages.value[index].name} 加载成功`)
}

const handleImageError = (index) => {
  productImages.value[index].status = 'error'
  ElMessage.error(`图片 ${productImages.value[index].name} 加载失败`)
}

const downloadImage = (image) => {
  ElMessage.success(`开始下载 ${image.name}`)
  // 实际下载逻辑
  const link = document.createElement('a')
  link.href = image.url
  link.download = image.name
  link.click()
}

const editImage = (image) => {
  ElMessage.info(`编辑图片: ${image.name}`)
}

const deleteImage = async (index) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除图片 "${productImages.value[index].name}" 吗？`,
      '确认删除',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
    productImages.value.splice(index, 1)
    ElMessage.success('图片删除成功')
  } catch {
    ElMessage.info('已取消删除')
  }
}

const handleFileChange = (file) => {
  ElMessage.success(`文件 ${file.name} 已选择`)
}

const handleFileRemove = (file) => {
  ElMessage.info(`文件 ${file.name} 已移除`)
}
</script>

<style scoped>
.image-container {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}

.image-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 20px 0;
}

.image-item {
  text-align: center;
}

.image-label {
  display: block;
  margin-bottom: 10px;
  font-size: 14px;
  color: #606266;
}

.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #f5f7fa;
  color: #909399;
  font-size: 14px;
}

.image-slot .el-icon {
  font-size: 20px;
  margin-right: 5px;
}

.product-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.gallery-item {
  border: 1px solid #ebeef5;
  border-radius: 4px;
  overflow: hidden;
  transition: box-shadow 0.3s;
}

.gallery-item:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 100%;
  height: 200px;
  display: block;
}

.image-placeholder,
.image-error {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #f5f7fa;
  color: #909399;
  font-size: 14px;
}

.image-placeholder .el-icon,
.image-error .el-icon {
  font-size: 24px;
  margin-bottom: 8px;
}

.image-info {
  padding: 15px;
  background: #fff;
}

.image-name {
  display: block;
  font-weight: bold;
  color: #303133;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.image-actions {
  display: flex;
  gap: 8px;
}

.upload-section {
  margin: 30px 0;
  padding: 20px;
  background: #f5f7fa;
  border-radius: 4px;
}

.upload-section h4 {
  margin: 0 0 15px 0;
  color: #303133;
}

.image-stats {
  margin-top: 30px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stats-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
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

.stat-value.success {
  color: #67c23a;
}

.stat-value.error {
  color: #f56c6c;
}
</style>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| src | 图片源地址 | string | — | — |
| fit | 确定图片如何适应容器框，同原生 object-fit | string | fill / contain / cover / none / scale-down | — |
| lazy | 是否开启懒加载 | boolean | — | false |
| scroll-container | 开启懒加载后，监听 scroll 事件的容器 | string / HTMLElement | — | — |
| preview-src-list | 开启图片预览功能 | array | — | [] |
| preview-teleported | 图片预览的 z-index | boolean | — | false |
| initial-index | 初始预览图像索引，当 preview-src-list 开启的时候有效 | number | — | 0 |
| close-on-press-escape | 是否可以通过按下 ESC 关闭预览 | boolean | — | true |
| preview | 是否可以预览 | boolean | — | true |
| hide-on-click-modal | 是否可以通过点击遮罩层关闭预览 | boolean | — | false |
| z-index | 设置图片预览的 z-index | number | — | 2000 |

#### 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| load | 图片加载成功触发 | (e: Event) |
| error | 图片加载失败触发 | (e: Error) |
| switch | 切换图像时触发 | (index: number) |
| close | 当点击 X 按钮或者在 hide-on-click-modal 为 true 时点击遮罩层时触发 | — |

#### 插槽
| 插槽名 | 说明 |
|--------|------|
| placeholder | 当图像尚未加载时自定义的占位内容 |
| error | 当加载失败时自定义的内容 |
| viewer | 当开启预览功能时，自定义预览的内容 |

#### 使用场景
1. **产品展示**: 电商网站的产品图片展示
2. **图片画廊**: 图片浏览和预览功能
3. **头像显示**: 用户头像和用户信息展示
4. **文档预览**: 文档缩略图预览
5. **媒体管理**: 图片上传和管理系统
6. **相册应用**: 个人相册和图片收藏
7. **内容展示**: 文章和内容的配图展示 