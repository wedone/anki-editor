### 17. Input Tag 标签输入框 (2.9.0+)
- **用途**: 标签输入
- **特点**: 支持动态添加删除标签

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-input-tag
    v-model="tags1"
    placeholder="请输入标签"
  />

  <!-- 限制数量 -->
  <el-input-tag
    v-model="tags2"
    :max="3"
    placeholder="最多3个标签"
  />

  <!-- 限制长度 -->
  <el-input-tag
    v-model="tags3"
    :maxlength="10"
    placeholder="标签长度不超过10"
  />

  <!-- 禁用状态 -->
  <el-input-tag
    v-model="tags4"
    disabled
    placeholder="禁用状态"
  />

  <!-- 不同尺寸 -->
  <el-input-tag
    v-model="tags5"
    size="large"
    placeholder="大尺寸"
  />
  <el-input-tag
    v-model="tags5"
    size="default"
    placeholder="默认尺寸"
  />
  <el-input-tag
    v-model="tags5"
    size="small"
    placeholder="小尺寸"
  />

  <!-- 事件处理 -->
  <el-input-tag
    v-model="tags6"
    @change="handleChange"
    @remove="handleRemove"
    @blur="handleBlur"
    @focus="handleFocus"
  />

  <!-- 自定义验证 -->
  <el-input-tag
    v-model="tags7"
    :before-enter="beforeEnter"
    placeholder="输入邮箱地址"
  />

  <!-- 在表单中使用 -->
  <el-form :model="form" label-width="120px">
    <el-form-item label="技能标签">
      <el-input-tag
        v-model="form.skills"
        placeholder="请输入技能标签"
        :max="5"
      />
    </el-form-item>
    <el-form-item label="兴趣爱好">
      <el-input-tag
        v-model="form.hobbies"
        placeholder="请输入兴趣爱好"
        :max="3"
      />
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const tags1 = ref(['标签1', '标签2'])
const tags2 = ref(['标签1', '标签2'])
const tags3 = ref(['标签1', '标签2'])
const tags4 = ref(['标签1', '标签2'])
const tags5 = ref(['标签1', '标签2'])
const tags6 = ref(['标签1', '标签2'])
const tags7 = ref(['example@email.com'])

const form = ref({
  skills: ['JavaScript', 'Vue.js'],
  hobbies: ['阅读', '运动']
})

const handleChange = (value) => {
  console.log('标签改变:', value)
}

const handleRemove = (tag, index) => {
  console.log('删除标签:', tag, '索引:', index)
}

const handleBlur = (event) => {
  console.log('失去焦点:', event)
}

const handleFocus = (event) => {
  console.log('获得焦点:', event)
}

const beforeEnter = (value) => {
  // 邮箱验证
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(value)) {
    ElMessage.error('请输入有效的邮箱地址')
    return false
  }
  return true
}
</script>

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| model-value / v-model | 绑定值 | array | — | [] |
| disabled | 是否禁用 | boolean | — | false |
| size | 输入框尺寸 | string | large / default / small | default |
| placeholder | 输入框占位文本 | string | — | 请输入 |
| max | 最大标签数量 | number | — | — |
| maxlength | 单个标签最大长度 | number | — | — |
| before-enter | 输入标签前的验证函数，返回 false 或者返回 Promise 且被 reject 时，将阻止标签的输入 | function(value) | — | — |
| clearable | 是否可清空 | boolean | — | false |
| readonly | 是否只读 | boolean | — | false |
| name | 原生 name 属性 | string | — | — |
| id | 原生 id 属性 | string | — | — |
| tabindex | 输入框 tabindex | string / number | — | — |
| validate-event | 输入时是否触发表单的校验 | boolean | — | true |

#### 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 当绑定值变化时触发 | 当前值 |
| remove | 当标签被移除时触发 | 被移除的标签值, 标签索引 |
| blur | 在组件 Input 失去焦点时触发 | (event: Event) |
| focus | 在组件 Input 获得焦点时触发 | (event: Event) |

#### 插槽
| 插槽名 | 说明 |
|--------|------|
| prefix | 输入框头部内容 |
| suffix | 输入框尾部内容 |

#### 使用场景
1. **技能标签**: 用户技能、专业标签等
2. **兴趣爱好**: 用户兴趣爱好标签
3. **分类标签**: 文章分类、商品分类等
4. **关键词**: 搜索关键词、标签云等
5. **联系方式**: 邮箱、电话等联系方式
6. **权限管理**: 用户权限标签
7. **数据筛选**: 多维度数据筛选标签 