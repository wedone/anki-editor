### 12. Form 表单
- **用途**: 表单容器
- **特点**: 支持验证、布局、提交处理

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-form :model="form" label-width="120px">
    <el-form-item label="活动名称">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="活动区域">
      <el-select v-model="form.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai" />
        <el-option label="区域二" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>

  <!-- 表单验证 -->
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    status-icon
  >
    <el-form-item label="活动名称" prop="name">
      <el-input v-model="ruleForm.name" />
    </el-form-item>
    <el-form-item label="活动区域" prop="region">
      <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai" />
        <el-option label="区域二" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item label="活动时间" required>
      <el-col :span="11">
        <el-form-item prop="date1">
          <el-date-picker
            v-model="ruleForm.date1"
            type="date"
            label="Pick a date"
            placeholder="Pick a date"
            style="width: 100%"
          />
        </el-form-item>
      </el-col>
      <el-col class="text-center" :span="2">
        <span class="text-gray-500">-</span>
      </el-col>
      <el-col :span="11">
        <el-form-item prop="date2">
          <el-time-picker
            v-model="ruleForm.date2"
            label="Pick a time"
            placeholder="Pick a time"
            style="width: 100%"
          />
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="即时配送" prop="delivery">
      <el-switch v-model="ruleForm.delivery" />
    </el-form-item>
    <el-form-item label="活动性质" prop="type">
      <el-checkbox-group v-model="ruleForm.type">
        <el-checkbox label="美食/餐厅线上活动" name="type" />
        <el-checkbox label="地推活动" name="type" />
        <el-checkbox label="线下主题活动" name="type" />
        <el-checkbox label="单纯品牌曝光" name="type" />
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="特殊资源" prop="resource">
      <el-radio-group v-model="ruleForm.resource">
        <el-radio label="线上品牌商赞助" />
        <el-radio label="线下场地免费" />
      </el-radio-group>
    </el-form-item>
    <el-form-item label="活动形式" prop="desc">
      <el-input v-model="ruleForm.desc" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">立即创建</el-button>
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
  </el-form>

  <!-- 行内表单 -->
  <el-form :inline="true" :model="inlineForm" class="demo-form-inline">
    <el-form-item label="审批人">
      <el-input v-model="inlineForm.user" placeholder="审批人" />
    </el-form-item>
    <el-form-item label="活动区域">
      <el-select v-model="inlineForm.region" placeholder="活动区域">
        <el-option label="区域一" value="shanghai" />
        <el-option label="区域二" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>

  <!-- 对齐方式 -->
  <el-form
    :model="alignmentForm"
    label-width="auto"
    style="max-width: 600px"
  >
    <el-form-item label="左对齐">
      <el-input v-model="alignmentForm.name" />
    </el-form-item>
    <el-form-item label="右对齐" label-width="80px">
      <el-input v-model="alignmentForm.name" />
    </el-form-item>
    <el-form-item label="顶部对齐" label-position="top">
      <el-input v-model="alignmentForm.name" />
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, reactive } from 'vue'

// 基础表单
const form = reactive({
  name: '',
  region: ''
})

const onSubmit = () => {
  console.log('submit!')
}

// 表单验证
const ruleFormRef = ref()
const ruleForm = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: ''
})

const rules = reactive({
  name: [
    { required: true, message: '请输入活动名称', trigger: 'blur' },
    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
  ],
  region: [
    { required: true, message: '请选择活动区域', trigger: 'change' }
  ],
  date1: [
    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
  ],
  date2: [
    { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
  ],
  type: [
    { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
  ],
  resource: [
    { required: true, message: '请选择活动资源', trigger: 'change' }
  ],
  desc: [
    { required: true, message: '请填写活动形式', trigger: 'blur' }
  ]
})

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}

// 行内表单
const inlineForm = reactive({
  user: '',
  region: ''
})

// 对齐方式
const alignmentForm = reactive({
  name: ''
})
</script>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| model | 表单数据对象 | object | — | — |
| rules | 表单验证规则 | object | — | — |
| inline | 行内表单模式 | boolean | — | false |
| label-position | 表单域标签的位置，如果值为 left 或者 right 时，则需要设置 label-width | string | right / left / top | right |
| label-width | 表单域标签的宽度，例如 '50px'。 作为 Form 直接子元素的 form-item 会继承该值。 可以使用 auto。 | string / number | — | — |
| label-suffix | 表单域标签的后缀 | string | — | — |
| hide-required-asterisk | 是否显示必填字段的标签旁边的红色星号 | boolean | — | false |
| require-asterisk-position | 必填星号的位置 | string | right / left | right |
| show-message | 是否显示校验错误信息 | boolean | — | true |
| inline-message | 是否以行内形式展示校验信息 | boolean | — | false |
| status-icon | 是否在输入框中显示校验结果反馈图标 | boolean | — | false |
| validate-on-rule-change | 是否在 rules 属性改变后立即触发一次验证 | boolean | — | true |
| size | 用于控制该表单内组件的尺寸 | string | large / default / small | default |
| disabled | 是否禁用该表单内的所有组件。 若设置为 true，则表单内组件上的 disabled 属性不再生效 | boolean | — | false |
| scroll-to-error | 当校验失败时，滚动到第一个错误表单项 | boolean | — | false |
| scroll-into-view-options | 当 scroll-to-error 为 true 时，滚动到错误表单项的配置项 | object | — | — |

#### 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| validate | 任一表单项被校验后触发 | 被校验的表单项 prop 值，校验是否通过，错误消息（如果存在） |
| submit | 表单提交事件 | — |

#### 方法
| 方法名 | 说明 | 参数 |
|--------|------|------|
| validate | 验证表单 | callback(boolean, object) |
| validateField | 验证表单中的某个字段 | props(array / string), callback(boolean, string) |
| resetFields | 重置表单 | props(array) |
| scrollToField | 滚动到指定的字段 | prop(string) |
| clearValidate | 清理校验结果 | props(array / string) |

#### Form Item 属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| prop | 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 | string | 传入 Form 组件的 model 中的字段 | — |
| label | 标签文本 | string | — | — |
| label-width | 标签宽度，例如 '50px'。 可以使用 auto。 | string / number | — | — |
| required | 是否必填，如不设置，则会根据校验规则自动生成 | boolean | — | false |
| rules | 表单验证规则 | object / array | — | — |
| error | 表单域验证错误信息, 设置该值会使表单域状态变为 error，并显示该错误信息 | string | — | — |
| show-message | 是否显示校验错误信息 | boolean | — | true |
| inline-message | 以行内形式展示校验信息 | boolean | — | false |
| size | 用于控制该表单域下组件的尺寸 | string | large / default / small | — |

#### Form Item 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| validate | 验证表单域时触发 | 验证结果，错误信息（如果存在） | 