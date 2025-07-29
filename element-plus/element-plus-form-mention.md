### 18. Mention 提及 (2.8.0+)
- **用途**: 提及功能
- **特点**: 支持@提及用户

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-mention
    v-model="value1"
    :suggestions="suggestions"
    placeholder="请输入 @ 提及用户"
  />

  <!-- 自定义触发字符 -->
  <el-mention
    v-model="value2"
    :suggestions="suggestions"
    :trigger="['@', '#']"
    placeholder="请输入 @ 或 # 提及用户"
  />

  <!-- 自定义建议项 -->
  <el-mention
    v-model="value3"
    :suggestions="customSuggestions"
    placeholder="请输入 @ 提及用户"
  >
    <template #suggestion="{ item }">
      <div class="suggestion-item">
        <el-avatar :size="24" :src="item.avatar" />
        <span class="username">{{ item.username }}</span>
        <span class="email">{{ item.email }}</span>
      </div>
    </template>
  </el-mention>

  <!-- 不同尺寸 -->
  <el-mention
    v-model="value4"
    :suggestions="suggestions"
    size="large"
    placeholder="大尺寸"
  />
  <el-mention
    v-model="value4"
    :suggestions="suggestions"
    size="default"
    placeholder="默认尺寸"
  />
  <el-mention
    v-model="value4"
    :suggestions="suggestions"
    size="small"
    placeholder="小尺寸"
  />

  <!-- 禁用状态 -->
  <el-mention
    v-model="value5"
    :suggestions="suggestions"
    disabled
    placeholder="禁用状态"
  />

  <!-- 只读模式 -->
  <el-mention
    v-model="value6"
    :suggestions="suggestions"
    readonly
    placeholder="只读模式"
  />

  <!-- 事件处理 -->
  <el-mention
    v-model="value7"
    :suggestions="suggestions"
    @change="handleChange"
    @select="handleSelect"
    @focus="handleFocus"
    @blur="handleBlur"
  />

  <!-- 在表单中使用 -->
  <el-form :model="form" label-width="120px">
    <el-form-item label="评论内容">
      <el-mention
        v-model="form.comment"
        :suggestions="suggestions"
        placeholder="请输入评论，@ 提及用户"
        type="textarea"
        :rows="3"
      />
    </el-form-item>
    <el-form-item label="任务描述">
      <el-mention
        v-model="form.description"
        :suggestions="suggestions"
        placeholder="请输入任务描述，@ 分配人员"
        type="textarea"
        :rows="4"
      />
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
const value4 = ref('')
const value5 = ref('')
const value6 = ref('')
const value7 = ref('')

const suggestions = ref([
  {
    value: '张三',
    label: '张三',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
  },
  {
    value: '李四',
    label: '李四',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
  },
  {
    value: '王五',
    label: '王五',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
  },
  {
    value: '赵六',
    label: '赵六',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
  }
])

const customSuggestions = ref([
  {
    value: 'zhangsan',
    label: '张三',
    username: '张三',
    email: 'zhangsan@example.com',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
  },
  {
    value: 'lisi',
    label: '李四',
    username: '李四',
    email: 'lisi@example.com',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
  },
  {
    value: 'wangwu',
    label: '王五',
    username: '王五',
    email: 'wangwu@example.com',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
  }
])

const form = ref({
  comment: '',
  description: ''
})

const handleChange = (value) => {
  console.log('内容改变:', value)
}

const handleSelect = (suggestion) => {
  console.log('选择建议:', suggestion)
}

const handleFocus = (event) => {
  console.log('获得焦点:', event)
}

const handleBlur = (event) => {
  console.log('失去焦点:', event)
}
</script>

<style scoped>
.suggestion-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.username {
  font-weight: bold;
}

.email {
  color: #999;
  font-size: 12px;
}
</style>

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| model-value / v-model | 绑定值 | string | — | — |
| suggestions | 建议列表 | array | — | [] |
| trigger | 触发字符 | string / array | — | @ |
| type | 输入框类型 | string | text / textarea | text |
| placeholder | 输入框占位文本 | string | — | — |
| disabled | 是否禁用 | boolean | — | false |
| readonly | 是否只读 | boolean | — | false |
| size | 输入框尺寸 | string | large / default / small | default |
| rows | 输入框行数，只对 type="textarea" 有效 | number | — | 2 |
| maxlength | 最大输入长度 | number | — | — |
| show-word-limit | 是否显示输入字数统计，只在 type = "text" 或 type = "textarea" 时有效 | boolean | — | false |
| clearable | 是否可清空 | boolean | — | false |
| name | 原生 name 属性 | string | — | — |
| id | 原生 id 属性 | string | — | — |
| tabindex | 输入框 tabindex | string / number | — | — |
| validate-event | 输入时是否触发表单的校验 | boolean | — | true |

#### 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 当绑定值变化时触发 | 当前值 |
| select | 当选择建议项时触发 | 选中的建议项 |
| focus | 在组件 Input 获得焦点时触发 | (event: Event) |
| blur | 在组件 Input 失去焦点时触发 | (event: Event) |

#### 插槽
| 插槽名 | 说明 |
|--------|------|
| suggestion | 自定义建议项内容，参数为 { item } |

#### 使用场景
1. **社交评论**: 微博、朋友圈等社交平台的评论功能
2. **团队协作**: 项目管理工具中的任务分配
3. **在线聊天**: 聊天应用中的@提及功能
4. **文档协作**: 在线文档中的协作编辑
5. **论坛讨论**: 论坛帖子中的用户提及
6. **通知系统**: 系统通知中的用户提及
7. **工作流**: 工作流中的审批人员分配 