### 14. Cascader 级联选择器
- **用途**: 级联选择
- **特点**: 支持多级数据选择

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-cascader
    v-model="value"
    :options="options"
    @change="handleChange"
  />

  <!-- 禁用选项 -->
  <el-cascader
    v-model="value"
    :options="options"
    :props="props"
  />

  <!-- 可清空选项 -->
  <el-cascader
    v-model="value"
    :options="options"
    :props="props"
    clearable
  />

  <!-- 仅显示最后一级 -->
  <el-cascader
    v-model="value"
    :options="options"
    :props="props"
    :show-all-levels="false"
  />

  <!-- 多选 -->
  <el-cascader
    v-model="value"
    :options="options"
    :props="props"
    multiple
  />

  <!-- 动态加载 -->
  <el-cascader
    v-model="value"
    :options="options"
    :props="props"
    @change="handleChange"
  />

  <!-- 可搜索 -->
  <el-cascader
    v-model="value"
    :options="options"
    :props="props"
    filterable
  />

  <!-- 自定义节点内容 -->
  <el-cascader
    v-model="value"
    :options="options"
    :props="props"
  >
    <template #default="{ node, data }">
      <span>{{ data.label }}</span>
      <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
    </template>
  </el-cascader>
</template>

<script setup>
import { ref } from 'vue'

const value = ref([])

const options = ref([
  {
    value: 'zhinan',
    label: '指南',
    children: [
      {
        value: 'shejiyuanze',
        label: '设计原则',
        children: [
          {
            value: 'yizhi',
            label: '一致'
          },
          {
            value: 'fankui',
            label: '反馈'
          },
          {
            value: 'xiaolv',
            label: '效率'
          },
          {
            value: 'kekong',
            label: '可控'
          }
        ]
      },
      {
        value: 'daohang',
        label: '导航',
        children: [
          {
            value: 'cexiangdaohang',
            label: '侧向导航'
          },
          {
            value: 'dingbudaohang',
            label: '顶部导航'
          }
        ]
      }
    ]
  },
  {
    value: 'zujian',
    label: '组件',
    children: [
      {
        value: 'basic',
        label: 'Basic',
        children: [
          {
            value: 'layout',
            label: 'Layout 布局'
          },
          {
            value: 'color',
            label: 'Color 色彩'
          },
          {
            value: 'typography',
            label: 'Typography 字体'
          },
          {
            value: 'icon',
            label: 'Icon 图标'
          },
          {
            value: 'button',
            label: 'Button 按钮'
          }
        ]
      },
      {
        value: 'form',
        label: 'Form',
        children: [
          {
            value: 'radio',
            label: 'Radio 单选框'
          },
          {
            value: 'checkbox',
            label: 'Checkbox 多选框'
          },
          {
            value: 'input',
            label: 'Input 输入框'
          },
          {
            value: 'input-number',
            label: 'InputNumber 计数器'
          },
          {
            value: 'select',
            label: 'Select 选择器'
          },
          {
            value: 'cascader',
            label: 'Cascader 级联选择器'
          },
          {
            value: 'switch',
            label: 'Switch 开关'
          },
          {
            value: 'slider',
            label: 'Slider 滑块'
          },
          {
            value: 'time-picker',
            label: 'TimePicker 时间选择器'
          },
          {
            value: 'date-picker',
            label: 'DatePicker 日期选择器'
          },
          {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器'
          },
          {
            value: 'upload',
            label: 'Upload 上传'
          },
          {
            value: 'rate',
            label: 'Rate 评分'
          },
          {
            value: 'color-picker',
            label: 'ColorPicker 颜色选择器'
          },
          {
            value: 'transfer',
            label: 'Transfer 穿梭框'
          },
          {
            value: 'form',
            label: 'Form 表单'
          }
        ]
      },
      {
        value: 'data',
        label: 'Data',
        children: [
          {
            value: 'table',
            label: 'Table 表格'
          },
          {
            value: 'tag',
            label: 'Tag 标签'
          },
          {
            value: 'progress',
            label: 'Progress 进度条'
          },
          {
            value: 'tree',
            label: 'Tree 树形控件'
          },
          {
            value: 'pagination',
            label: 'Pagination 分页'
          },
          {
            value: 'badge',
            label: 'Badge 标记'
          },
          {
            value: 'avatar',
            label: 'Avatar 头像'
          },
          {
            value: 'skeleton',
            label: 'Skeleton 骨架屏'
          }
        ]
      },
      {
        value: 'notice',
        label: 'Notice',
        children: [
          {
            value: 'alert',
            label: 'Alert 警告'
          },
          {
            value: 'loading',
            label: 'Loading 加载'
          },
          {
            value: 'message',
            label: 'Message 消息提示'
          },
          {
            value: 'message-box',
            label: 'MessageBox 弹框'
          },
          {
            value: 'notification',
            label: 'Notification 通知'
          }
        ]
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'menu',
            label: 'NavMenu 导航菜单'
          },
          {
            value: 'tabs',
            label: 'Tabs 标签页'
          },
          {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
          },
          {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
          },
          {
            value: 'steps',
            label: 'Steps 步骤条'
          }
        ]
      },
      {
        value: 'others',
        label: 'Others',
        children: [
          {
            value: 'dialog',
            label: 'Dialog 对话框'
          },
          {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
          },
          {
            value: 'popover',
            label: 'Popover 弹出框'
          },
          {
            value: 'card',
            label: 'Card 卡片'
          },
          {
            value: 'carousel',
            label: 'Carousel 走马灯'
          },
          {
            value: 'collapse',
            label: 'Collapse 折叠面板'
          }
        ]
      }
    ]
  },
  {
    value: 'ziyuan',
    label: '资源',
    children: [
      {
        value: 'axure',
        label: 'Axure Components'
      },
      {
        value: 'sketch',
        label: 'Sketch Templates'
      },
      {
        value: 'jiaohu',
        label: '组件交互文档'
      }
    ]
  }
])

const props = ref({
  expandTrigger: 'hover'
})

const handleChange = (value) => {
  console.log(value)
}
</script>

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| model-value / v-model | 绑定值 | array | — | — |
| options | 可选项数据源，键名可通过 props 属性配置 | array | — | — |
| props | 配置选项，具体见下表 | object | — | — |
| size | 尺寸 | string | large / default / small | default |
| placeholder | 输入框占位文本 | string | — | 请选择 |
| disabled | 是否禁用 | boolean | — | false |
| clearable | 是否支持清空选项 | boolean | — | false |
| show-all-levels | 输入框中是否显示选中值的完整路径 | boolean | — | true |
| collapse-tags | 多选模式下是否折叠标签 | boolean | — | false |
| collapse-tags-tooltip | 多选模式下折叠标签的提示文字 | boolean | — | false |
| separator | 选项分隔符 | string | — | / |
| filterable | 是否可搜索选项 | boolean | — | false |
| filter-method | 自定义搜索逻辑，第一个参数是节点，第二个参数是搜索关键词，通过返回布尔值表示是否命中 | function(node, keyword) | — | — |
| debounce | 搜索关键词输入的去抖延时，毫秒 | number | — | 300 |
| before-filter | 过滤函数调用之前的钩子，参数为 value。若返回 false 或者返回 Promise 且被 reject，则停止过滤 | function(value) | — | — |
| popper-class | 自定义浮层类名 | string | — | — |
| teleported | 是否将下拉列表插入至 body 元素 | boolean | — | true |
| tag-type | 标签类型 | string | success / info / warning / danger | — |
| validate-event | 输入时是否触发表单的校验 | boolean | — | true |

#### Props 配置项
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| expandTrigger | 次级菜单的展开方式 | string | click / hover | click |
| multiple | 是否多选 | boolean | — | false |
| checkStrictly | 是否严格的遵守父子节点不互相关联 | boolean | — | false |
| emitPath | 在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组，若设置 false，则只返回该节点的值 | boolean | — | true |
| lazy | 是否动态加载子节点，需与 lazyLoad 方法结合使用 | boolean | — | false |
| lazyLoad | 加载动态数据的方法，仅在 lazy 为 true 时有效 | function(node, resolve) | — | — |
| value | 指定选项的值为选项对象的某个属性值 | string | — | value |
| label | 指定选项标签为选项对象的某个属性值 | string | — | label |
| children | 指定选项的子选项为选项对象的某个属性值 | string | — | children |
| disabled | 指定选项的禁用为选项对象的某个属性值 | string | — | disabled |
| leaf | 指定选项的叶子节点的标志位为选项对象的某个属性值 | string | — | leaf |

#### 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 当绑定值变化时触发的事件 | value |
| expand-change | 当展开节点发生变化时触发 | 各父级选项值组成的数组 |

#### 插槽
| 插槽名 | 说明 |
|--------|------|
| default | 自定义节点内容，参数为 { node, data } |

#### 使用场景
1. **地区选择**: 省市区三级联动选择
2. **分类选择**: 商品分类、文件分类等
3. **组织架构**: 公司部门、学校院系等
4. **权限管理**: 菜单权限、功能权限等
5. **数据筛选**: 多维度数据筛选
6. **导航菜单**: 多级导航菜单
7. **配置管理**: 系统配置项选择 