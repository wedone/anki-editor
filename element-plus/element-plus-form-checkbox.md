### 3. Checkbox 多选框
- **用途**: 多选组件
- **特点**: 支持单个和组选择

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-checkbox v-model="checked">选项1</el-checkbox>

  <!-- 禁用状态 -->
  <el-checkbox v-model="checked1" disabled>禁用</el-checkbox>
  <el-checkbox v-model="checked2" disabled>选中且禁用</el-checkbox>

  <!-- 多选框组 -->
  <el-checkbox-group v-model="checkList">
    <el-checkbox label="选项 A" />
    <el-checkbox label="选项 B" />
    <el-checkbox label="选项 C" />
  </el-checkbox-group>

  <!-- 带有边框 -->
  <el-checkbox-group v-model="checkList1" size="large">
    <el-checkbox label="选项 A" border />
    <el-checkbox label="选项 B" border />
  </el-checkbox-group>

  <!-- 按钮样式 -->
  <el-checkbox-group v-model="checkList2">
    <el-checkbox-button label="上海" />
    <el-checkbox-button label="北京" />
    <el-checkbox-button label="广州" />
    <el-checkbox-button label="深圳" />
  </el-checkbox-group>

  <!-- 限制数量 -->
  <el-checkbox-group v-model="checkedCities" :min="1" :max="2">
    <el-checkbox label="上海" />
    <el-checkbox label="北京" />
    <el-checkbox label="广州" />
    <el-checkbox label="深圳" />
  </el-checkbox-group>

  <!-- 中间状态 -->
  <el-checkbox
    v-model="checkAll"
    :indeterminate="isIndeterminate"
    @change="handleCheckAllChange"
  >
    全选
  </el-checkbox>
  <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
    <el-checkbox label="上海" />
    <el-checkbox label="北京" />
    <el-checkbox label="广州" />
    <el-checkbox label="深圳" />
  </el-checkbox-group>
</template>

<script setup>
import { ref } from 'vue'

const checked = ref(false)
const checked1 = ref(false)
const checked2 = ref(true)
const checkList = ref(['选中且禁用', '复选框 A'])
const checkList1 = ref(['选项 A'])
const checkList2 = ref(['上海'])
const checkedCities = ref(['上海', '北京'])
const checkAll = ref(false)
const isIndeterminate = ref(true)

const handleCheckAllChange = (val) => {
  checkedCities.value = val ? cityOptions : []
  isIndeterminate.value = false
}

const handleCheckedCitiesChange = (value) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === cityOptions.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < cityOptions.length
}

const cityOptions = ['上海', '北京', '广州', '深圳']
</script>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| model-value / v-model | 绑定值 | string / number / boolean | — | — |
| label | 选中状态的值（只有在checkbox-group或者绑定对象类型为array时有效） | string / number / boolean | — | — |
| true-label | 选中时的值 | string / number | — | — |
| false-label | 没有选中时的值 | string / number | — | — |
| disabled | 是否禁用 | boolean | — | false |
| border | 是否显示边框 | boolean | — | false |
| size | Checkbox 的尺寸，仅在 border 为真时有效 | string | large / default / small | default |
| name | 原生 name 属性 | string | — | — |
| checked | 当前是否勾选 | boolean | — | false |
| indeterminate | 设置 indeterminate 状态，只负责样式控制 | boolean | — | false |

#### 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 当绑定值变化时触发的事件 | 更新后的值 |

#### Checkbox Group 属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| model-value / v-model | 绑定值 | array | — | [] |
| min | 可被勾选的最小数量 | number | — | — |
| max | 可被勾选的最大数量 | number | — | — |
| disabled | 是否禁用 | boolean | — | false |
| size | 多选框组尺寸，仅对按钮形式的 Checkbox 或带有边框的 Checkbox 有效 | string | large / default / small | default |
| text-color | 按钮形式的 Checkbox 激活时的文字颜色 | string | — | #ffffff |
| fill | 按钮形式的 Checkbox 激活时的填充色和边框色 | string | — | #409eff |
| tag | 原生 tag 属性 | string | — | div |

#### Checkbox Group 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 当绑定值变化时触发的事件 | 更新后的值 |

#### Checkbox Button 属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| label | 选中状态的值（只有在checkbox-group或者绑定对象类型为array时有效） | string / number / boolean | — | — |
| true-label | 选中时的值 | string / number | — | — |
| false-label | 没有选中时的值 | string / number | — | — |
| disabled | 是否禁用 | boolean | — | false |
| name | 原生 name 属性 | string | — | — |
| checked | 当前是否勾选 | boolean | — | false | 