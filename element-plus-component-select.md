### 2. Select 选择器
- **用途**: 下拉选择
- **特点**: 支持单选、多选、搜索、分组

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-select v-model="value" placeholder="请选择">
    <el-option label="选项1" value="1" />
    <el-option label="选项2" value="2" />
    <el-option label="选项3" value="3" />
  </el-select>

  <!-- 禁用状态 -->
  <el-select v-model="value" disabled placeholder="禁用状态">
    <el-option label="选项1" value="1" />
  </el-select>

  <!-- 可清空选项 -->
  <el-select v-model="value" clearable placeholder="请选择">
    <el-option label="选项1" value="1" />
    <el-option label="选项2" value="2" />
  </el-select>

  <!-- 多选 -->
  <el-select v-model="value1" multiple placeholder="请选择">
    <el-option label="选项1" value="1" />
    <el-option label="选项2" value="2" />
    <el-option label="选项3" value="3" />
  </el-select>

  <!-- 自定义模板 -->
  <el-select v-model="value" placeholder="请选择">
    <el-option label="选项1" value="1">
      <span style="float: left">选项1</span>
      <span style="float: right; color: #8492a6; font-size: 13px">选项1</span>
    </el-option>
    <el-option label="选项2" value="2">
      <span style="float: left">选项2</span>
      <span style="float: right; color: #8492a6; font-size: 13px">选项2</span>
    </el-option>
  </el-select>

  <!-- 分组 -->
  <el-select v-model="value" placeholder="请选择">
    <el-option-group label="热门城市">
      <el-option label="上海" value="shanghai" />
      <el-option label="北京" value="beijing" />
    </el-option-group>
    <el-option-group label="城市名">
      <el-option label="成都" value="chengdu" />
      <el-option label="深圳" value="shenzhen" />
    </el-option-group>
  </el-select>

  <!-- 可搜索 -->
  <el-select v-model="value" filterable placeholder="请选择">
    <el-option label="选项1" value="1" />
    <el-option label="选项2" value="2" />
    <el-option label="选项3" value="3" />
  </el-select>

  <!-- 远程搜索 -->
  <el-select
    v-model="value"
    filterable
    remote
    reserve-keyword
    placeholder="请输入关键词"
    :remote-method="remoteMethod"
    :loading="loading"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
const value1 = ref([])
const loading = ref(false)
const options = ref([])

const remoteMethod = (query) => {
  if (query !== '') {
    loading.value = true
    setTimeout(() => {
      loading.value = false
      options.value = [
        { value: query, label: query },
        { value: query + query, label: query + query }
      ]
    }, 2000)
  } else {
    options.value = []
  }
}
</script>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| model-value / v-model | 绑定值 | boolean / string / number | — | — |
| multiple | 是否多选 | boolean | — | false |
| disabled | 是否禁用 | boolean | — | false |
| value-key | 作为 value 唯一标识的键名，绑定值为对象类型时必填 | string | — | value |
| size | 输入框尺寸 | string | large / default / small | default |
| clearable | 是否可以清空选项 | boolean | — | false |
| collapse-tags | 多选时是否将选中值按文字的形式展示 | boolean | — | false |
| collapse-tags-tooltip | 当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签 | boolean | — | false |
| multiple-limit | 多选时用户最多可以选择的项目数，为 0 则不限制 | number | — | 0 |
| name | select input 的 name 属性 | string | — | — |
| effect | Tooltip 主题，内置了 dark / light 两种 | string | dark / light | light |
| id | select input 的 id 属性 | string | — | — |
| autocomplete | select input 的 autocomplete 属性 | string | — | off |
| placeholder | 占位符 | string | — | Select |
| filterable | 是否可搜索 | boolean | — | false |
| allow-create | 是否允许用户创建新条目 | boolean | — | false |
| filter-method | 自定义搜索方法 | function | — | — |
| remote | 是否为远程搜索 | boolean | — | false |
| remote-method | 远程搜索方法 | function | — | — |
| loading | 是否正在从远程获取数据 | boolean | — | false |
| loading-text | 远程加载时显示的文字 | string | — | Loading |
| no-match-text | 搜索条件无匹配时显示的文字 | string | — | No matching data |
| no-data-text | 选项为空时显示的文字 | string | — | No data |
| popper-class | 下拉框的类名 | string | — | — |
| reserve-keyword | 多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词 | boolean | — | true |
| default-first-option | 在输入新标签时，按下回车键是否默认选中第一个选项 | boolean | — | false |
| teleported | 是否将下拉列表插入至 body 元素 | boolean | — | true |
| persistent | 当下拉选择器未被激活并且persistent设置为false，选择器会被删除 | boolean | — | true |
| clear-icon | 自定义清除图标 | string / Component | — | Close |
| fit-input-width | 下拉框的宽度是否与输入框相同 | boolean | — | false |
| suffix-icon | 自定义后缀图标 | string / Component | — | ArrowDown |
| tag-type | 标签类型 | string | success / info / warning / danger | — |
| validate-event | 输入时是否触发表单的校验 | boolean | — | true |

#### 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 选中值发生变化时触发 | 目前的选中值 |
| visible-change | 下拉框出现/隐藏时触发 | 出现则为 true，隐藏则为 false |
| remove-tag | 多选模式下移除tag时触发 | 移除的tag值 |
| clear | 可清空的单选模式下用户点击清空按钮时触发 | — |
| blur | 当 input 失去焦点时触发 | (event: Event) |
| focus | 当 input 获得焦点时触发 | (event: Event) |

#### 插槽
| 插槽名 | 说明 |
|--------|------|
| — | Option 组件列表 |
| prefix | Select 组件头部内容 |
| empty | 无选项时的列表 | 