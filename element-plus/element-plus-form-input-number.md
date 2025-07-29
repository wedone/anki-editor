### 16. Input Number 数字输入框
- **用途**: 数字输入
- **特点**: 支持步长、范围限制

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-input-number v-model="num1" :min="1" :max="10" />

  <!-- 禁用状态 -->
  <el-input-number v-model="num2" :disabled="true" />

  <!-- 步长 -->
  <el-input-number
    v-model="num3"
    :step="2"
    step-strictly
  />

  <!-- 精度 -->
  <el-input-number
    v-model="num4"
    :precision="2"
    :step="0.1"
    :max="10"
  />

  <!-- 尺寸 -->
  <el-input-number
    v-model="num5"
    :min="1"
    :max="10"
    size="large"
  />
  <el-input-number
    v-model="num5"
    :min="1"
    :max="10"
    size="default"
  />
  <el-input-number
    v-model="num5"
    :min="1"
    :max="10"
    size="small"
  />

  <!-- 控制按钮位置 -->
  <el-input-number
    v-model="num6"
    :min="1"
    :max="10"
    controls-position="right"
  />

  <!-- 事件处理 -->
  <el-input-number
    v-model="num7"
    :min="1"
    :max="10"
    @change="handleChange"
  />

  <!-- 格式化显示 -->
  <el-input-number
    v-model="num8"
    :min="1"
    :max="10"
    :formatter="value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
    :parser="value => value.replace(/\$\s?|(,*)/g, '')"
  />

  <!-- 在表单中使用 -->
  <el-form :model="form" label-width="120px">
    <el-form-item label="数量">
      <el-input-number v-model="form.quantity" :min="1" />
    </el-form-item>
    <el-form-item label="价格">
      <el-input-number
        v-model="form.price"
        :precision="2"
        :step="0.1"
        :min="0"
      />
    </el-form-item>
    <el-form-item label="评分">
      <el-input-number
        v-model="form.rating"
        :min="0"
        :max="5"
        :precision="1"
        :step="0.5"
      />
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref } from 'vue'

const num1 = ref(1)
const num2 = ref(1)
const num3 = ref(5)
const num4 = ref(5.555)
const num5 = ref(1)
const num6 = ref(1)
const num7 = ref(1)
const num8 = ref(1234)

const form = ref({
  quantity: 1,
  price: 99.99,
  rating: 4.5
})

const handleChange = (value) => {
  console.log('数值改变:', value)
}
</script>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| model-value / v-model | 绑定值 | number | — | — |
| min | 设置计数器允许的最小值 | number | — | -Infinity |
| max | 设置计数器允许的最大值 | number | — | Infinity |
| step | 计数器步长 | number | — | 1 |
| step-strictly | 是否只能输入 step 的倍数 | boolean | — | false |
| precision | 数值精度 | number | — | — |
| size | 计数器尺寸 | string | large / default / small | default |
| disabled | 是否禁用计数器 | boolean | — | false |
| controls | 是否显示控制按钮 | boolean | — | true |
| controls-position | 控制按钮位置 | string | right | — |
| name | 原生 name 属性 | string | — | — |
| label | 输入框关联的 label 文字 | string | — | — |
| placeholder | 输入框默认 placeholder | string | — | — |
| id | 输入框 id | string | — | — |
| controls-at-right | 控制按钮是否显示在右侧 | boolean | — | false |
| validate-event | 输入时是否触发表单的校验 | boolean | — | true |
| clearable | 是否可清空 | boolean | — | false |
| readonly | 原生 readonly 属性，是否只读 | boolean | — | false |
| tabindex | 输入框 tabindex | string / number | — | — |
| formatter | 指定输入值的格式。(只有当 value 为 string 时才会生效) | function | — | — |
| parser | 指定从 formatter 里转换回数字的方式，和 formatter 搭配使用 | function | — | — |

#### 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 当绑定值变化时触发 | 当前值 |
| blur | 在组件 Input 失去焦点时触发 | (event: Event) |
| focus | 在组件 Input 获得焦点时触发 | (event: Event) |

#### 插槽
| 插槽名 | 说明 |
|--------|------|
| prefix | 输入框头部内容 |
| suffix | 输入框尾部内容 |

#### 使用场景
1. **数量输入**: 商品数量、库存数量等
2. **价格输入**: 商品价格、金额等
3. **评分输入**: 用户评分、星级等
4. **配置参数**: 系统配置参数
5. **表单验证**: 数字范围验证
6. **数据统计**: 统计数据显示
7. **计算器**: 简单计算功能 