### 28. Carousel 走马灯
- **用途**: 轮播图展示
- **特点**: 支持自动播放、指示器、切换按钮

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-carousel height="400px">
    <el-carousel-item v-for="item in carouselItems1" :key="item.id">
      <h3 class="carousel-title">{{ item.title }}</h3>
      <div class="carousel-content" :style="{ backgroundColor: item.color }">
        {{ item.content }}
      </div>
    </el-carousel-item>
  </el-carousel>

  <!-- 指示器 -->
  <el-carousel height="400px" :indicator-position="'outside'">
    <el-carousel-item v-for="item in carouselItems2" :key="item.id">
      <h3 class="carousel-title">{{ item.title }}</h3>
      <div class="carousel-content" :style="{ backgroundColor: item.color }">
        {{ item.content }}
      </div>
    </el-carousel-item>
  </el-carousel>

  <!-- 切换箭头 -->
  <el-carousel height="400px" :arrow="'always'">
    <el-carousel-item v-for="item in carouselItems3" :key="item.id">
      <h3 class="carousel-title">{{ item.title }}</h3>
      <div class="carousel-content" :style="{ backgroundColor: item.color }">
        {{ item.content }}
      </div>
    </el-carousel-item>
  </el-carousel>

  <!-- 卡片模式 -->
  <el-carousel height="400px" :type="'card'" :interval="4000">
    <el-carousel-item v-for="item in carouselItems4" :key="item.id">
      <h3 class="carousel-title">{{ item.title }}</h3>
      <div class="carousel-content" :style="{ backgroundColor: item.color }">
        {{ item.content }}
      </div>
    </el-carousel-item>
  </el-carousel>

  <!-- 自动播放控制 -->
  <el-carousel 
    height="400px" 
    :autoplay="autoplay"
    :interval="3000"
    @change="handleChange"
  >
    <el-carousel-item v-for="item in carouselItems5" :key="item.id">
      <h3 class="carousel-title">{{ item.title }}</h3>
      <div class="carousel-content" :style="{ backgroundColor: item.color }">
        {{ item.content }}
      </div>
    </el-carousel-item>
  </el-carousel>
  <div class="carousel-controls">
    <el-button @click="autoplay = !autoplay">
      {{ autoplay ? '暂停' : '播放' }}
    </el-button>
  </div>

  <!-- 不同高度 -->
  <el-carousel height="200px">
    <el-carousel-item v-for="item in carouselItems6" :key="item.id">
      <h3 class="carousel-title">{{ item.title }}</h3>
      <div class="carousel-content" :style="{ backgroundColor: item.color }">
        {{ item.content }}
      </div>
    </el-carousel-item>
  </el-carousel>

  <!-- 在页面中使用 -->
  <div class="carousel-container">
    <h3>产品展示轮播</h3>
    <el-carousel 
      ref="productCarousel"
      height="500px" 
      :interval="5000"
      :autoplay="true"
      :indicator-position="'outside'"
      :arrow="'hover'"
      @change="handleProductChange"
    >
      <el-carousel-item v-for="product in productItems" :key="product.id">
        <div class="product-slide">
          <div class="product-image">
            <img :src="product.image" :alt="product.name" />
          </div>
          <div class="product-info">
            <h2 class="product-name">{{ product.name }}</h2>
            <p class="product-description">{{ product.description }}</p>
            <div class="product-features">
              <el-tag 
                v-for="feature in product.features" 
                :key="feature"
                size="small"
                class="feature-tag"
              >
                {{ feature }}
              </el-tag>
            </div>
            <div class="product-price">
              <span class="price-label">价格:</span>
              <span class="price-value">¥{{ product.price }}</span>
            </div>
            <el-button type="primary" size="large" @click="viewProduct(product)">
              查看详情
            </el-button>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>

    <!-- 产品详情弹窗 -->
    <el-dialog
      v-model="productDialogVisible"
      :title="selectedProduct?.name"
      width="600px"
    >
      <div v-if="selectedProduct" class="product-detail">
        <div class="detail-image">
          <img :src="selectedProduct.image" :alt="selectedProduct.name" />
        </div>
        <div class="detail-info">
          <h3>{{ selectedProduct.name }}</h3>
          <p>{{ selectedProduct.description }}</p>
          <div class="detail-features">
            <h4>产品特点:</h4>
            <ul>
              <li v-for="feature in selectedProduct.features" :key="feature">
                {{ feature }}
              </li>
            </ul>
          </div>
          <div class="detail-price">
            <span class="price-label">价格:</span>
            <span class="price-value">¥{{ selectedProduct.price }}</span>
          </div>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="productDialogVisible = false">关闭</el-button>
          <el-button type="primary" @click="addToCart">加入购物车</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const autoplay = ref(true)
const productCarousel = ref()
const productDialogVisible = ref(false)
const selectedProduct = ref(null)

// 基础轮播数据
const carouselItems1 = ref([
  {
    id: 1,
    title: '第一页',
    content: '这是第一页的内容',
    color: '#d3dce6'
  },
  {
    id: 2,
    title: '第二页',
    content: '这是第二页的内容',
    color: '#d3dce6'
  },
  {
    id: 3,
    title: '第三页',
    content: '这是第三页的内容',
    color: '#d3dce6'
  },
  {
    id: 4,
    title: '第四页',
    content: '这是第四页的内容',
    color: '#d3dce6'
  }
])

const carouselItems2 = ref([
  {
    id: 1,
    title: '指示器外置',
    content: '指示器在轮播图外部',
    color: '#d3dce6'
  },
  {
    id: 2,
    title: '第二页',
    content: '这是第二页的内容',
    color: '#d3dce6'
  },
  {
    id: 3,
    title: '第三页',
    content: '这是第三页的内容',
    color: '#d3dce6'
  },
  {
    id: 4,
    title: '第四页',
    content: '这是第四页的内容',
    color: '#d3dce6'
  }
])

const carouselItems3 = ref([
  {
    id: 1,
    title: '始终显示箭头',
    content: '切换箭头始终显示',
    color: '#d3dce6'
  },
  {
    id: 2,
    title: '第二页',
    content: '这是第二页的内容',
    color: '#d3dce6'
  },
  {
    id: 3,
    title: '第三页',
    content: '这是第三页的内容',
    color: '#d3dce6'
  },
  {
    id: 4,
    title: '第四页',
    content: '这是第四页的内容',
    color: '#d3dce6'
  }
])

const carouselItems4 = ref([
  {
    id: 1,
    title: '卡片模式',
    content: '卡片式轮播图',
    color: '#d3dce6'
  },
  {
    id: 2,
    title: '第二页',
    content: '这是第二页的内容',
    color: '#d3dce6'
  },
  {
    id: 3,
    title: '第三页',
    content: '这是第三页的内容',
    color: '#d3dce6'
  },
  {
    id: 4,
    title: '第四页',
    content: '这是第四页的内容',
    color: '#d3dce6'
  }
])

const carouselItems5 = ref([
  {
    id: 1,
    title: '自动播放控制',
    content: '可以控制自动播放',
    color: '#d3dce6'
  },
  {
    id: 2,
    title: '第二页',
    content: '这是第二页的内容',
    color: '#d3dce6'
  },
  {
    id: 3,
    title: '第三页',
    content: '这是第三页的内容',
    color: '#d3dce6'
  },
  {
    id: 4,
    title: '第四页',
    content: '这是第四页的内容',
    color: '#d3dce6'
  }
])

const carouselItems6 = ref([
  {
    id: 1,
    title: '小高度',
    content: '200px高度',
    color: '#d3dce6'
  },
  {
    id: 2,
    title: '第二页',
    content: '这是第二页的内容',
    color: '#d3dce6'
  },
  {
    id: 3,
    title: '第三页',
    content: '这是第三页的内容',
    color: '#d3dce6'
  },
  {
    id: 4,
    title: '第四页',
    content: '这是第四页的内容',
    color: '#d3dce6'
  }
])

// 产品轮播数据
const productItems = ref([
  {
    id: 1,
    name: '智能手机 Pro',
    description: '最新款智能手机，搭载先进处理器，拥有出色的拍照性能和长续航能力',
    image: 'https://via.placeholder.com/400x300/409EFF/ffffff?text=Smartphone+Pro',
    price: 5999,
    features: ['6.7英寸屏幕', '5000mAh电池', '1亿像素相机', '5G网络']
  },
  {
    id: 2,
    name: '笔记本电脑 Air',
    description: '轻薄便携的笔记本电脑，适合商务办公和日常使用',
    image: 'https://via.placeholder.com/400x300/67C23A/ffffff?text=Laptop+Air',
    price: 8999,
    features: ['13.3英寸屏幕', '8GB内存', '512GB SSD', '指纹识别']
  },
  {
    id: 3,
    name: '无线耳机 Max',
    description: '高品质无线耳机，支持主动降噪，音质出色',
    image: 'https://via.placeholder.com/400x300/E6A23C/ffffff?text=Headphones+Max',
    price: 2499,
    features: ['主动降噪', '30小时续航', '快速充电', '蓝牙5.0']
  },
  {
    id: 4,
    name: '智能手表 Sport',
    description: '运动型智能手表，支持多种运动模式，健康监测功能完善',
    image: 'https://via.placeholder.com/400x300/F56C6C/ffffff?text=Smartwatch+Sport',
    price: 1899,
    features: ['心率监测', 'GPS定位', '防水设计', '7天续航']
  }
])

// 事件处理函数
const handleChange = (index) => {
  console.log('轮播图切换到:', index)
}

const handleProductChange = (index) => {
  console.log('产品轮播切换到:', index, productItems.value[index])
}

const viewProduct = (product) => {
  selectedProduct.value = product
  productDialogVisible.value = true
}

const addToCart = () => {
  ElMessage.success(`已将 ${selectedProduct.value.name} 加入购物车`)
  productDialogVisible.value = false
}
</script>

<style scoped>
.carousel-container {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}

.carousel-title {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  text-align: center;
}

.carousel-content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #475669;
}

.carousel-controls {
  margin-top: 20px;
  text-align: center;
}

.product-slide {
  display: flex;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.product-image {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.product-image img {
  max-width: 100%;
  max-height: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
}

.product-name {
  font-size: 32px;
  margin: 0 0 20px 0;
  font-weight: bold;
}

.product-description {
  font-size: 16px;
  line-height: 1.6;
  margin: 0 0 20px 0;
  opacity: 0.9;
}

.product-features {
  margin: 20px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.feature-tag {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
}

.product-price {
  margin: 20px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.price-label {
  font-size: 16px;
  opacity: 0.8;
}

.price-value {
  font-size: 24px;
  font-weight: bold;
  color: #ffd700;
}

.product-detail {
  display: flex;
  gap: 20px;
}

.detail-image {
  flex: 1;
  text-align: center;
}

.detail-image img {
  max-width: 100%;
  border-radius: 8px;
}

.detail-info {
  flex: 1;
}

.detail-info h3 {
  margin: 0 0 15px 0;
  color: #303133;
}

.detail-info p {
  margin: 0 0 20px 0;
  line-height: 1.6;
  color: #606266;
}

.detail-features h4 {
  margin: 0 0 10px 0;
  color: #303133;
}

.detail-features ul {
  margin: 0;
  padding-left: 20px;
  color: #606266;
}

.detail-features li {
  margin: 5px 0;
}

.detail-price {
  margin: 20px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.detail-price .price-value {
  font-size: 20px;
  font-weight: bold;
  color: #f56c6c;
}
</style>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| height | 走马灯的高度 | string | — | — |
| initial-index | 初始激活幻灯片的索引，从 0 开始 | number | — | 0 |
| trigger | 指示器的触发方式 | string | hover / click | hover |
| autoplay | 是否自动切换 | boolean | — | true |
| interval | 自动切换的时间间隔，单位为毫秒 | number | — | 3000 |
| indicator-position | 指示器的位置 | string | outside / none | — |
| arrow | 切换箭头的显示时机 | string | always / hover / never | hover |
| type | 走马灯的类型 | string | card | — |
| loop | 是否循环显示 | boolean | — | true |
| direction | 走马灯显示的方向 | string | horizontal / vertical | horizontal |

#### 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 幻灯片切换时触发 | 目前激活的幻灯片的索引，原幻灯片的索引 |

#### 插槽
| 插槽名 | 说明 |
|--------|------|
| default | 走马灯的内容 |

#### 使用场景
1. **产品展示**: 电商网站的产品轮播图
2. **广告宣传**: 网站首页的广告轮播
3. **图片展示**: 图片画廊的轮播展示
4. **新闻轮播**: 新闻网站的新闻轮播
5. **活动推广**: 活动宣传的轮播展示
6. **品牌展示**: 品牌介绍的多媒体展示
7. **数据可视化**: 数据图表的轮播展示 