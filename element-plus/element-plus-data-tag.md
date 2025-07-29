### 6. Tag 标签
- **用途**: 标签组件
- **特点**: 支持多种类型、可关闭

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-tag>标签一</el-tag>
  <el-tag type="success">标签二</el-tag>
  <el-tag type="info">标签三</el-tag>
  <el-tag type="warning">标签四</el-tag>
  <el-tag type="danger">标签五</el-tag>

  <!-- 可移除标签 -->
  <el-tag
    v-for="tag in tags"
    :key="tag"
    closable
    :disable-transitions="false"
    @close="handleClose(tag)"
  >
    {{ tag }}
  </el-tag>

  <!-- 不同尺寸 -->
  <el-tag size="large">大型标签</el-tag>
  <el-tag>默认标签</el-tag>
  <el-tag size="small">小型标签</el-tag>

  <!-- 不同主题 -->
  <el-tag>默认</el-tag>
  <el-tag type="success">成功</el-tag>
  <el-tag type="info">信息</el-tag>
  <el-tag type="warning">警告</el-tag>
  <el-tag type="danger">危险</el-tag>

  <!-- 可编辑标签 -->
  <el-tag
    v-for="tag in dynamicTags"
    :key="tag"
    closable
    :disable-transitions="false"
    @close="handleClose(tag)"
  >
    {{ tag }}
  </el-tag>
  <el-input
    v-if="inputVisible"
    ref="InputRef"
    v-model="inputValue"
    class="ml-1 w-20"
    size="small"
    @keyup.enter="handleInputConfirm"
    @blur="handleInputConfirm"
  />
  <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
    + New Tag
  </el-button>

  <!-- 带图标的标签 -->
  <el-tag icon="Edit" type="success">编辑</el-tag>
  <el-tag icon="Share" type="info">分享</el-tag>
  <el-tag icon="Delete" type="danger">删除</el-tag>

  <!-- 圆角标签 -->
  <el-tag round>圆角标签</el-tag>
  <el-tag type="success" round>成功标签</el-tag>
  <el-tag type="info" round>信息标签</el-tag>
  <el-tag type="warning" round>警告标签</el-tag>
  <el-tag type="danger" round>危险标签</el-tag>

  <!-- 带边框的标签 -->
  <el-tag effect="plain">朴素标签</el-tag>
  <el-tag type="success" effect="plain">成功标签</el-tag>
  <el-tag type="info" effect="plain">信息标签</el-tag>
  <el-tag type="warning" effect="plain">警告标签</el-tag>
  <el-tag type="danger" effect="plain">危险标签</el-tag>

  <!-- 深色主题 -->
  <el-tag effect="dark">深色标签</el-tag>
  <el-tag type="success" effect="dark">成功标签</el-tag>
  <el-tag type="info" effect="dark">信息标签</el-tag>
  <el-tag type="warning" effect="dark">警告标签</el-tag>
  <el-tag type="danger" effect="dark">危险标签</el-tag>

  <!-- 自定义颜色 -->
  <el-tag color="#f56c6c">红色标签</el-tag>
  <el-tag color="#e6a23c">橙色标签</el-tag>
  <el-tag color="#67c23a">绿色标签</el-tag>
  <el-tag color="#409eff">蓝色标签</el-tag>
  <el-tag color="#909399">灰色标签</el-tag>

  <!-- 带文本颜色的标签 -->
  <el-tag color="#f56c6c" text-color="#ffffff">白色文字</el-tag>
  <el-tag color="#e6a23c" text-color="#ffffff">白色文字</el-tag>
  <el-tag color="#67c23a" text-color="#ffffff">白色文字</el-tag>
  <el-tag color="#409eff" text-color="#ffffff">白色文字</el-tag>
  <el-tag color="#909399" text-color="#ffffff">白色文字</el-tag>

  <!-- 可点击的标签 -->
  <el-tag
    v-for="tag in clickableTags"
    :key="tag"
    :type="tag.type"
    effect="plain"
    @click="handleClick(tag)"
  >
    {{ tag.name }}
  </el-tag>

  <!-- 带徽章的标签 -->
  <el-tag>
    标签
    <el-badge value="3" class="item" />
  </el-tag>

  <!-- 状态标签 -->
  <el-tag type="success">已发布</el-tag>
  <el-tag type="warning">待审核</el-tag>
  <el-tag type="danger">已拒绝</el-tag>
  <el-tag type="info">草稿</el-tag>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { ElMessage } from 'element-plus'

// 可移除标签
const tags = ref(['标签一', '标签二', '标签三'])

const handleClose = (tag) => {
  tags.value.splice(tags.value.indexOf(tag), 1)
  ElMessage.success('标签已移除')
}

// 可编辑标签
const dynamicTags = ref(['标签一', '标签二', '标签三'])
const inputVisible = ref(false)
const inputValue = ref('')
const InputRef = ref()

const handleClose = (tag) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}

const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value.input.focus()
  })
}

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}

// 可点击标签
const clickableTags = ref([
  { name: '标签一', type: '' },
  { name: '标签二', type: 'success' },
  { name: '标签三', type: 'info' },
  { name: '标签四', type: 'warning' },
  { name: '标签五', type: 'danger' }
])

const handleClick = (tag) => {
  ElMessage.success(`点击了 ${tag.name}`)
}
</script>

<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

.ml-1 {
  margin-left: 10px;
}

.w-20 {
  width: 90px;
}

.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| type | 类型 | string | success / info / warning / danger | — |
| closable | 是否可关闭 | boolean | — | false |
| disable-transitions | 是否禁用渐变动画 | boolean | — | false |
| hit | 是否有边框描边 | boolean | — | false |
| color | 背景色 | string | — | — |
| size | 尺寸 | string | large / default / small | default |
| effect | 主题 | string | dark / light / plain | light |
| round | 是否圆角 | boolean | — | false |
| text-color | 文字颜色（该属性会覆盖 type 的默认文字颜色） | string | — | — |

#### 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击 Tag 时触发的事件 | (event: Event) |
| close | 关闭 Tag 时触发的事件 | (event: Event) |

#### 插槽
| 插槽名 | 说明 |
|--------|------|
| — | Tag 的内容 |
| icon | 自定义图标 |

#### 使用示例
```vue
<!-- 基础标签 -->
<el-tag>默认标签</el-tag>

<!-- 不同类型 -->
<el-tag type="success">成功标签</el-tag>
<el-tag type="warning">警告标签</el-tag>
<el-tag type="danger">危险标签</el-tag>

<!-- 可关闭标签 -->
<el-tag closable @close="handleClose">可关闭标签</el-tag>

<!-- 不同尺寸 -->
<el-tag size="large">大型标签</el-tag>
<el-tag size="small">小型标签</el-tag>

<!-- 不同主题 -->
<el-tag effect="dark">深色主题</el-tag>
<el-tag effect="plain">朴素主题</el-tag>

<!-- 圆角标签 -->
<el-tag round>圆角标签</el-tag>

<!-- 自定义颜色 -->
<el-tag color="#f56c6c">自定义颜色</el-tag>

<!-- 带图标 -->
<el-tag icon="Edit">编辑</el-tag>
```

#### 样式定制
```css
/* 自定义标签样式 */
.custom-tag {
  border-radius: 12px;
  font-weight: bold;
}

.custom-tag.el-tag--success {
  background-color: #f0f9ff;
  border-color: #409eff;
  color: #409eff;
}

.custom-tag.el-tag--warning {
  background-color: #fdf6ec;
  border-color: #e6a23c;
  color: #e6a23c;
}

/* 响应式标签 */
.responsive-tag {
  margin: 5px;
}

@media (max-width: 768px) {
  .responsive-tag {
    margin: 3px;
    font-size: 12px;
  }
}
```

#### 使用场景
1. **状态标识**: 显示任务状态、订单状态等
2. **分类标签**: 文章分类、产品分类等
3. **筛选条件**: 搜索筛选、条件选择等
4. **用户标签**: 用户兴趣、技能标签等
5. **版本标识**: 版本号、环境标识等

#### 注意事项
1. **颜色搭配**: 确保文字颜色与背景色有足够的对比度
2. **数量控制**: 避免在一个区域放置过多标签
3. **交互反馈**: 为可点击标签提供适当的交互反馈
4. **可访问性**: 确保标签对屏幕阅读器友好
5. **响应式设计**: 考虑在不同屏幕尺寸下的显示效果 