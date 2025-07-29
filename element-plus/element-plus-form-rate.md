### 19. Rate 评分
- **用途**: 评分组件
- **特点**: 支持自定义图标、半星评分

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-rate v-model="value1" />

  <!-- 显示辅助文字 -->
  <el-rate
    v-model="value2"
    show-text
    :texts="['oops', 'disappointed', 'normal', 'good', 'great']"
  />

  <!-- 显示分数 -->
  <el-rate
    v-model="value3"
    show-score
    text-color="#ff9900"
  />

  <!-- 半星评分 -->
  <el-rate
    v-model="value4"
    allow-half
  />

  <!-- 只读评分 -->
  <el-rate
    v-model="value5"
    disabled
    show-score
    text-color="#ff9900"
  />

  <!-- 自定义图标 -->
  <el-rate
    v-model="value6"
    :icon-classes="iconClasses"
    void-icon-class="el-icon-star-off"
    :colors="colors"
  />

  <!-- 不同尺寸 -->
  <el-rate
    v-model="value7"
    size="large"
  />
  <el-rate
    v-model="value7"
    size="default"
  />
  <el-rate
    v-model="value7"
    size="small"
  />

  <!-- 事件处理 -->
  <el-rate
    v-model="value8"
    @change="handleChange"
  />

  <!-- 在表单中使用 -->
  <el-form :model="form" label-width="120px">
    <el-form-item label="服务评分">
      <el-rate
        v-model="form.serviceRating"
        show-text
        :texts="['很差', '较差', '一般', '较好', '很好']"
      />
    </el-form-item>
    <el-form-item label="产品质量">
      <el-rate
        v-model="form.qualityRating"
        allow-half
        show-score
      />
    </el-form-item>
    <el-form-item label="性价比">
      <el-rate
        v-model="form.valueRating"
        :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
      />
    </el-form-item>
  </el-form>

  <!-- 自定义模板 -->
  <el-rate
    v-model="value9"
    :max="5"
  >
    <template #default="{ index }">
      <el-icon v-if="index < value9" class="star-filled">
        <StarFilled />
      </el-icon>
      <el-icon v-else class="star-empty">
        <Star />
      </el-icon>
    </template>
  </el-rate>
</template>

<script setup>
import { ref } from 'vue'
import { StarFilled, Star } from '@element-plus/icons-vue'

const value1 = ref(null)
const value2 = ref(null)
const value3 = ref(3.7)
const value4 = ref(3.5)
const value5 = ref(4.2)
const value6 = ref(3.7)
const value7 = ref(3.7)
const value8 = ref(3.7)
const value9 = ref(3.7)

const iconClasses = ref(['el-icon-star-on', 'el-icon-star-on', 'el-icon-star-on'])
const colors = ref(['#99A9BF', '#F7BA2A', '#FF9900'])

const form = ref({
  serviceRating: 4,
  qualityRating: 4.5,
  valueRating: 3.5
})

const handleChange = (value) => {
  console.log('评分改变:', value)
}
</script>

<style scoped>
.star-filled {
  color: #ff9900;
}

.star-empty {
  color: #c6d1de;
}
</style>

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| model-value / v-model | 绑定值 | number | — | 0 |
| max | 最大分值 | number | — | 5 |
| disabled | 是否为只读 | boolean | — | false |
| allow-half | 是否允许半选 | boolean | — | false |
| low-threshold | 低分和中等分数的界限值，值本身被划分在低分中 | number | — | 2 |
| high-threshold | 高分和中等分数的界限值，值本身被划分在高分中 | number | — | 4 |
| colors | icon 的颜色。若传入数组，共有 3 个元素，为 3 个分段所对应的颜色；若传入对象，可自定义分段，键名为分段的界限值，键值为对应的颜色 | array / object | — | ['#F7BA2A', '#F7BA2A', '#F7BA2A'] |
| void-color | 未选中 icon 的颜色 | string | — | #C6D1DE |
| disabled-void-color | 只读时未选中 icon 的颜色 | string | — | #EFF2F7 |
| icon-classes | icon 的类名。若传入数组，共有 3 个元素，为 3 个分段所对应的类名；若传入对象，可自定义分段，键名为分段的界限值，键值为对应的类名 | array / object | — | ['el-icon-star-on', 'el-icon-star-on', 'el-icon-star-on'] |
| void-icon-class | 未选中 icon 的类名 | string | — | el-icon-star-off |
| disabled-void-icon-class | 只读时未选中 icon 的类名 | string | — | el-icon-star-on |
| show-text | 是否显示辅助文字，若为真，则会从 texts 数组中选取当前分数对应的文字内容 | boolean | — | false |
| show-score | 是否显示当前分数，show-score 和 show-text 不能同时为真 | boolean | — | false |
| text-color | 辅助文字的颜色 | string | — | #1F2D3D |
| texts | 辅助文字数组 | array | — | ['极差', '失望', '一般', '满意', '惊喜'] |
| score-template | 分数显示模板 | string | — | {value} |

#### 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 分值改变时触发 | 改变后的分值 |

#### 插槽
| 插槽名 | 说明 |
|--------|------|
| default | 自定义图标，参数为 { index } |

#### 使用场景
1. **商品评价**: 电商平台的商品评分
2. **服务评价**: 服务质量的用户评价
3. **内容评分**: 文章、视频等内容评分
4. **应用评分**: 应用商店的应用评分
5. **酒店评分**: 酒店、餐厅等服务评分
6. **课程评价**: 在线教育平台的课程评分
7. **员工评价**: 企业内部员工绩效评价 