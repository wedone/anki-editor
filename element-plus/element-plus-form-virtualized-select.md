### 22. Virtualized Select 虚拟化选择器
- **用途**: 大数据量选择器
- **特点**: 优化大数据量渲染性能

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-virtualized-select
    v-model="value1"
    :options="options1"
    placeholder="请选择"
  />

  <!-- 多选 -->
  <el-virtualized-select
    v-model="value2"
    :options="options2"
    placeholder="请选择"
    multiple
  />

  <!-- 可搜索 -->
  <el-virtualized-select
    v-model="value3"
    :options="options3"
    placeholder="请选择"
    filterable
  />

  <!-- 自定义高度 -->
  <el-virtualized-select
    v-model="value4"
    :options="options4"
    placeholder="请选择"
    :height="300"
  />

  <!-- 自定义项高度 -->
  <el-virtualized-select
    v-model="value5"
    :options="options5"
    placeholder="请选择"
    :item-height="40"
  />

  <!-- 不同尺寸 -->
  <el-virtualized-select
    v-model="value6"
    :options="options6"
    placeholder="大尺寸"
    size="large"
  />
  <el-virtualized-select
    v-model="value6"
    :options="options6"
    placeholder="默认尺寸"
    size="default"
  />
  <el-virtualized-select
    v-model="value6"
    :options="options6"
    placeholder="小尺寸"
    size="small"
  />

  <!-- 事件处理 -->
  <el-virtualized-select
    v-model="value7"
    :options="options7"
    placeholder="请选择"
    @change="handleChange"
    @visible-change="handleVisibleChange"
  />

  <!-- 在表单中使用 -->
  <el-form :model="form" label-width="120px">
    <el-form-item label="城市选择">
      <el-virtualized-select
        v-model="form.city"
        :options="cityOptions"
        placeholder="请选择城市"
        filterable
        clearable
      />
    </el-form-item>
    <el-form-item label="用户选择">
      <el-virtualized-select
        v-model="form.users"
        :options="userOptions"
        placeholder="请选择用户"
        multiple
        filterable
      />
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref([])
const value3 = ref('')
const value4 = ref('')
const value5 = ref('')
const value6 = ref('')
const value7 = ref('')

// 生成大量数据用于演示虚拟化
const generateOptions = (count) => {
  const options = []
  for (let i = 1; i <= count; i++) {
    options.push({
      value: i,
      label: `选项 ${i}`
    })
  }
  return options
}

const options1 = ref(generateOptions(1000))
const options2 = ref(generateOptions(1000))
const options3 = ref(generateOptions(1000))
const options4 = ref(generateOptions(1000))
const options5 = ref(generateOptions(1000))
const options6 = ref(generateOptions(1000))
const options7 = ref(generateOptions(1000))

// 城市数据
const cityOptions = ref([
  { value: 'beijing', label: '北京' },
  { value: 'shanghai', label: '上海' },
  { value: 'guangzhou', label: '广州' },
  { value: 'shenzhen', label: '深圳' },
  { value: 'hangzhou', label: '杭州' },
  { value: 'nanjing', label: '南京' },
  { value: 'wuhan', label: '武汉' },
  { value: 'chengdu', label: '成都' },
  { value: 'xian', label: '西安' },
  { value: 'tianjin', label: '天津' },
  { value: 'chongqing', label: '重庆' },
  { value: 'suzhou', label: '苏州' },
  { value: 'qingdao', label: '青岛' },
  { value: 'dalian', label: '大连' },
  { value: 'ningbo', label: '宁波' },
  { value: 'xiamen', label: '厦门' },
  { value: 'fuzhou', label: '福州' },
  { value: 'nanchang', label: '南昌' },
  { value: 'changsha', label: '长沙' },
  { value: 'zhengzhou', label: '郑州' },
  { value: 'jinan', label: '济南' },
  { value: 'taiyuan', label: '太原' },
  { value: 'shijiazhuang', label: '石家庄' },
  { value: 'hefei', label: '合肥' },
  { value: 'kunming', label: '昆明' },
  { value: 'guiyang', label: '贵阳' },
  { value: 'nanning', label: '南宁' },
  { value: 'haikou', label: '海口' },
  { value: 'sanya', label: '三亚' },
  { value: 'urumqi', label: '乌鲁木齐' },
  { value: 'lasa', label: '拉萨' },
  { value: 'xining', label: '西宁' },
  { value: 'yinchuan', label: '银川' },
  { value: 'lanzhou', label: '兰州' }
])

// 用户数据
const userOptions = ref(generateOptions(5000).map(item => ({
  value: item.value,
  label: `用户${item.value}`
})))

const form = ref({
  city: '',
  users: []
})

const handleChange = (value) => {
  console.log('选择改变:', value)
}

const handleVisibleChange = (visible) => {
  console.log('下拉框显示状态改变:', visible)
}
</script>

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| model-value / v-model | 绑定值 | string / number / array | — | — |
| options | 选项数据 | array | — | [] |
| multiple | 是否多选 | boolean | — | false |
| disabled | 是否禁用 | boolean | — | false |
| size | 尺寸 | string | large / default / small | default |
| clearable | 是否可以清空选项 | boolean | — | false |
| collapse-tags | 多选时是否将选中值按文字的形式展示 | boolean | — | false |
| collapse-tags-tooltip | 当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签。 要使用此功能，collapse-tags 属性必须设定为 true | boolean | — | false |
| multiple-limit | 多选时用户最多可以选择的项目数，为 0 则不限制 | number | — | 0 |
| name | 选择器原生 name 属性 | string | — | — |
| id | 选择器原生 id 属性 | string | — | — |
| placeholder | 占位符 | string | — | 请选择 |
| filterable | 是否可搜索 | boolean | — | false |
| reserve-keyword | 多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词 | boolean | — | false |
| no-data-text | 无数据时显示的文本内容 | string | — | 无数据 |
| no-match-text | 搜索无匹配时显示的文本内容，也可以使用 slot="empty" 设置 | string | — | 无匹配数据 |
| popper-class | 下拉菜单的类名 | string | — | — |
| teleported | 是否将下拉列表插入至 body 元素 | boolean | — | true |
| persistent | 当下拉选择器未被激活并且persistent设置为false，选择器会被删除 | boolean | — | true |
| automatic-dropdown | 对于不可搜索的 Select，是否在输入框获得焦点后自动弹出选项菜单 | boolean | — | false |
| clear-icon | 自定义清除图标 | string / Component | — | Close |
| fit-input-width | 下拉框的宽度是否与输入框相同 | boolean | — | false |
| suffix-icon | 自定义后缀图标 | string / Component | — | ArrowDown |
| tag-type | 标签类型 | string | success / info / warning / danger | — |
| validate-event | 输入时是否触发表单的校验 | boolean | — | true |
| height | 下拉框高度 | number | — | 274 |
| item-height | 选项高度 | number | — | 34 |

#### 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 当绑定值变化时触发的事件 | 目前的选中值 |
| visible-change | 下拉框出现/隐藏时触发 | 出现则为 true，隐藏则为 false |
| remove-tag | 多选模式下移除tag时触发 | 移除的tag值 |
| clear | 可清空的单选模式下用户点击清空按钮时触发 | — |
| blur | 当 input 失去焦点时触发 | (event: Event) |
| focus | 当 input 获得焦点时触发 | (event: Event) |

#### 插槽
| 插槽名 | 说明 |
|--------|------|
| prefix | Select 组件头部内容 |
| empty | 无选项时的列表内容 |

#### 使用场景
1. **大数据量选择**: 城市列表、用户列表等大量数据选择
2. **性能优化**: 需要渲染大量选项时的性能优化
3. **数据筛选**: 从大量数据中快速筛选
4. **用户管理**: 大量用户的选择和管理
5. **商品选择**: 电商平台大量商品的选择
6. **文件管理**: 大量文件的选择和管理
7. **数据导入**: 大量数据的导入和选择 