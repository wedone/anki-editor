### 3. Card 卡片
- **用途**: 卡片容器
- **特点**: 支持头部、内容、操作区域

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>卡片名称</span>
        <el-button class="button" text>操作按钮</el-button>
      </div>
    </template>
    <div v-for="o in 4" :key="o" class="text item">
      {{ '列表内容 ' + o }}
    </div>
  </el-card>

  <!-- 简单卡片 -->
  <el-card class="box-card">
    <div v-for="o in 4" :key="o" class="text item">
      {{ '列表内容 ' + o }}
    </div>
  </el-card>

  <!-- 带图片的卡片 -->
  <el-card :body-style="{ padding: '0px' }">
    <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image" />
    <div style="padding: 14px">
      <span>好吃的汉堡</span>
      <div class="bottom">
        <time class="time">{{ currentDate }}</time>
        <el-button class="button" text type="primary">操作</el-button>
      </div>
    </div>
  </el-card>

  <!-- 带阴影的卡片 -->
  <el-card class="box-card" shadow="hover">
    <template #header>
      <div class="card-header">
        <span>卡片名称</span>
        <el-button class="button" text>操作按钮</el-button>
      </div>
    </template>
    <div v-for="o in 4" :key="o" class="text item">
      {{ '列表内容 ' + o }}
    </div>
  </el-card>

  <!-- 不同尺寸的卡片 -->
  <el-card class="box-card" size="large">
    <template #header>
      <div class="card-header">
        <span>大尺寸卡片</span>
      </div>
    </template>
    <div>卡片内容</div>
  </el-card>

  <el-card class="box-card" size="default">
    <template #header>
      <div class="card-header">
        <span>默认尺寸卡片</span>
      </div>
    </template>
    <div>卡片内容</div>
  </el-card>

  <el-card class="box-card" size="small">
    <template #header>
      <div class="card-header">
        <span>小尺寸卡片</span>
      </div>
    </template>
    <div>卡片内容</div>
  </el-card>

  <!-- 带操作区域的卡片 -->
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>卡片名称</span>
        <el-button class="button" text>操作按钮</el-button>
      </div>
    </template>
    <div v-for="o in 4" :key="o" class="text item">
      {{ '列表内容 ' + o }}
    </div>
    <template #footer>
      <div class="card-footer">
        <el-button type="primary">主要操作</el-button>
        <el-button>次要操作</el-button>
      </div>
    </template>
  </el-card>

  <!-- 可折叠的卡片 -->
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>可折叠卡片</span>
        <el-button class="button" text @click="collapsed = !collapsed">
          {{ collapsed ? '展开' : '收起' }}
        </el-button>
      </div>
    </template>
    <div v-show="!collapsed">
      <div v-for="o in 4" :key="o" class="text item">
        {{ '列表内容 ' + o }}
      </div>
    </div>
  </el-card>

  <!-- 带图标的卡片 -->
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <el-icon><Document /></el-icon>
        <span>带图标的卡片</span>
      </div>
    </template>
    <div>卡片内容</div>
  </el-card>

  <!-- 自定义样式的卡片 -->
  <el-card class="custom-card" shadow="hover">
    <template #header>
      <div class="custom-header">
        <span>自定义样式卡片</span>
      </div>
    </template>
    <div class="custom-content">
      <p>这是一个自定义样式的卡片</p>
      <p>可以添加任何内容</p>
    </div>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'
import { Document } from '@element-plus/icons-vue'

const currentDate = ref(new Date().toLocaleDateString())
const collapsed = ref(false)
</script>

<style scoped>
.box-card {
  width: 480px;
  margin: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card .item:not(:last-child) {
  border-bottom: 1px solid #ebeef5;
}

.box-card .item:last-child {
  border-bottom: none;
}

.box-card .item:hover {
  background-color: #f5f7fa;
}

.image {
  width: 100%;
  display: block;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.card-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.custom-card {
  width: 480px;
  margin: 20px;
  border-radius: 8px;
}

.custom-header {
  color: #409eff;
  font-weight: bold;
}

.custom-content {
  padding: 20px 0;
  color: #606266;
}

.custom-content p {
  margin: 10px 0;
  line-height: 1.6;
}
</style>

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| header | 设置 header，也可以通过 slot#header 传入 DOM | string | — | — |
| body-style | 设置 body 的样式 | object | — | { padding: '20px' } |
| shadow | 设置阴影显示时机 | string | always / hover / never | always |
| size | 设置组件的尺寸 | string | large / default / small | default |

#### 插槽
| 插槽名 | 说明 |
|--------|------|
| — | 自定义默认内容 |
| header | 自定义 header 内容 |
| footer | 自定义 footer 内容 |

#### 使用示例
```vue
<!-- 基础卡片 -->
<el-card>
  <div>卡片内容</div>
</el-card>

<!-- 带标题的卡片 -->
<el-card header="卡片标题">
  <div>卡片内容</div>
</el-card>

<!-- 自定义头部 -->
<el-card>
  <template #header>
    <div class="card-header">
      <span>自定义标题</span>
      <el-button text>操作</el-button>
    </div>
  </template>
  <div>卡片内容</div>
</el-card>

<!-- 带底部操作区域 -->
<el-card>
  <div>卡片内容</div>
  <template #footer>
    <div class="card-footer">
      <el-button type="primary">确定</el-button>
      <el-button>取消</el-button>
    </div>
  </template>
</el-card>

<!-- 悬停阴影 -->
<el-card shadow="hover">
  <div>悬停时显示阴影</div>
</el-card>

<!-- 自定义样式 -->
<el-card :body-style="{ padding: '10px' }" shadow="never">
  <div>无阴影，小内边距</div>
</el-card>
```

#### 样式定制
```css
/* 自定义卡片样式 */
.custom-card {
  border-radius: 8px;
  border: 1px solid #e4e7ed;
}

.custom-card .el-card__header {
  background-color: #f5f7fa;
  border-bottom: 1px solid #e4e7ed;
}

.custom-card .el-card__body {
  padding: 20px;
}

/* 响应式卡片 */
.responsive-card {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .responsive-card {
    margin: 10px;
  }
}
```

#### 使用场景
1. **信息展示**: 展示文章、产品信息等
2. **数据统计**: 展示统计数据、图表等
3. **操作面板**: 包含操作按钮的功能区域
4. **列表容器**: 包装列表内容
5. **表单容器**: 包装表单内容

#### 注意事项
1. **内容布局**: 合理使用 header 和 footer 插槽组织内容
2. **阴影效果**: 根据设计需求选择合适的阴影显示时机
3. **响应式设计**: 考虑在不同屏幕尺寸下的显示效果
4. **性能优化**: 避免在卡片中放置过多内容影响性能
5. **可访问性**: 确保卡片内容对屏幕阅读器友好 