### 21. TreeSelect 树形选择 (2.1.8+)
- **用途**: 树形选择器
- **特点**: 支持树形结构数据选择

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-tree-select
    v-model="value1"
    :data="data1"
    placeholder="请选择"
  />

  <!-- 可清空选择 -->
  <el-tree-select
    v-model="value2"
    :data="data2"
    placeholder="请选择"
    clearable
  />

  <!-- 多选 -->
  <el-tree-select
    v-model="value3"
    :data="data3"
    placeholder="请选择"
    multiple
  />

  <!-- 可搜索 -->
  <el-tree-select
    v-model="value4"
    :data="data4"
    placeholder="请选择"
    filterable
  />

  <!-- 自定义数据格式 -->
  <el-tree-select
    v-model="value5"
    :data="data5"
    :props="{
      children: 'children',
      label: 'name',
      value: 'id'
    }"
    placeholder="请选择"
  />

  <!-- 禁用状态 -->
  <el-tree-select
    v-model="value6"
    :data="data6"
    placeholder="请选择"
    disabled
  />

  <!-- 不同尺寸 -->
  <el-tree-select
    v-model="value7"
    :data="data7"
    placeholder="大尺寸"
    size="large"
  />
  <el-tree-select
    v-model="value7"
    :data="data7"
    placeholder="默认尺寸"
    size="default"
  />
  <el-tree-select
    v-model="value7"
    :data="data7"
    placeholder="小尺寸"
    size="small"
  />

  <!-- 事件处理 -->
  <el-tree-select
    v-model="value8"
    :data="data8"
    placeholder="请选择"
    @change="handleChange"
    @visible-change="handleVisibleChange"
  />

  <!-- 在表单中使用 -->
  <el-form :model="form" label-width="120px">
    <el-form-item label="部门选择">
      <el-tree-select
        v-model="form.department"
        :data="departmentData"
        placeholder="请选择部门"
        clearable
      />
    </el-form-item>
    <el-form-item label="权限选择">
      <el-tree-select
        v-model="form.permissions"
        :data="permissionData"
        placeholder="请选择权限"
        multiple
        filterable
      />
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')
const value3 = ref([])
const value4 = ref('')
const value5 = ref('')
const value6 = ref('')
const value7 = ref('')
const value8 = ref('')

const data1 = ref([
  {
    value: '1',
    label: '一级 1',
    children: [
      {
        value: '1-1',
        label: '二级 1-1',
        children: [
          {
            value: '1-1-1',
            label: '三级 1-1-1'
          }
        ]
      }
    ]
  },
  {
    value: '2',
    label: '一级 2',
    children: [
      {
        value: '2-1',
        label: '二级 2-1',
        children: [
          {
            value: '2-1-1',
            label: '三级 2-1-1'
          }
        ]
      },
      {
        value: '2-2',
        label: '二级 2-2',
        children: [
          {
            value: '2-2-1',
            label: '三级 2-2-1'
          }
        ]
      }
    ]
  },
  {
    value: '3',
    label: '一级 3',
    children: [
      {
        value: '3-1',
        label: '二级 3-1',
        children: [
          {
            value: '3-1-1',
            label: '三级 3-1-1'
          }
        ]
      },
      {
        value: '3-2',
        label: '二级 3-2',
        children: [
          {
            value: '3-2-1',
            label: '三级 3-2-1'
          }
        ]
      }
    ]
  }
])

const data2 = ref([
  {
    value: '1',
    label: '一级 1',
    children: [
      {
        value: '1-1',
        label: '二级 1-1',
        children: [
          {
            value: '1-1-1',
            label: '三级 1-1-1'
          }
        ]
      }
    ]
  },
  {
    value: '2',
    label: '一级 2',
    children: [
      {
        value: '2-1',
        label: '二级 2-1',
        children: [
          {
            value: '2-1-1',
            label: '三级 2-1-1'
          }
        ]
      },
      {
        value: '2-2',
        label: '二级 2-2',
        children: [
          {
            value: '2-2-1',
            label: '三级 2-2-1'
          }
        ]
      }
    ]
  },
  {
    value: '3',
    label: '一级 3',
    children: [
      {
        value: '3-1',
        label: '二级 3-1',
        children: [
          {
            value: '3-1-1',
            label: '三级 3-1-1'
          }
        ]
      },
      {
        value: '3-2',
        label: '二级 3-2',
        children: [
          {
            value: '3-2-1',
            label: '三级 3-2-1'
          }
        ]
      }
    ]
  }
])

const data3 = ref([
  {
    value: '1',
    label: '一级 1',
    children: [
      {
        value: '1-1',
        label: '二级 1-1',
        children: [
          {
            value: '1-1-1',
            label: '三级 1-1-1'
          }
        ]
      }
    ]
  },
  {
    value: '2',
    label: '一级 2',
    children: [
      {
        value: '2-1',
        label: '二级 2-1',
        children: [
          {
            value: '2-1-1',
            label: '三级 2-1-1'
          }
        ]
      },
      {
        value: '2-2',
        label: '二级 2-2',
        children: [
          {
            value: '2-2-1',
            label: '三级 2-2-1'
          }
        ]
      }
    ]
  },
  {
    value: '3',
    label: '一级 3',
    children: [
      {
        value: '3-1',
        label: '二级 3-1',
        children: [
          {
            value: '3-1-1',
            label: '三级 3-1-1'
          }
        ]
      },
      {
        value: '3-2',
        label: '二级 3-2',
        children: [
          {
            value: '3-2-1',
            label: '三级 3-2-1'
          }
        ]
      }
    ]
  }
])

const data4 = ref([
  {
    value: '1',
    label: '一级 1',
    children: [
      {
        value: '1-1',
        label: '二级 1-1',
        children: [
          {
            value: '1-1-1',
            label: '三级 1-1-1'
          }
        ]
      }
    ]
  },
  {
    value: '2',
    label: '一级 2',
    children: [
      {
        value: '2-1',
        label: '二级 2-1',
        children: [
          {
            value: '2-1-1',
            label: '三级 2-1-1'
          }
        ]
      },
      {
        value: '2-2',
        label: '二级 2-2',
        children: [
          {
            value: '2-2-1',
            label: '三级 2-2-1'
          }
        ]
      }
    ]
  },
  {
    value: '3',
    label: '一级 3',
    children: [
      {
        value: '3-1',
        label: '二级 3-1',
        children: [
          {
            value: '3-1-1',
            label: '三级 3-1-1'
          }
        ]
      },
      {
        value: '3-2',
        label: '二级 3-2',
        children: [
          {
            value: '3-2-1',
            label: '三级 3-2-1'
          }
        ]
      }
    ]
  }
])

const data5 = ref([
  {
    id: '1',
    name: '一级 1',
    children: [
      {
        id: '1-1',
        name: '二级 1-1',
        children: [
          {
            id: '1-1-1',
            name: '三级 1-1-1'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: '一级 2',
    children: [
      {
        id: '2-1',
        name: '二级 2-1',
        children: [
          {
            id: '2-1-1',
            name: '三级 2-1-1'
          }
        ]
      },
      {
        id: '2-2',
        name: '二级 2-2',
        children: [
          {
            id: '2-2-1',
            name: '三级 2-2-1'
          }
        ]
      }
    ]
  },
  {
    id: '3',
    name: '一级 3',
    children: [
      {
        id: '3-1',
        name: '二级 3-1',
        children: [
          {
            id: '3-1-1',
            name: '三级 3-1-1'
          }
        ]
      },
      {
        id: '3-2',
        name: '二级 3-2',
        children: [
          {
            id: '3-2-1',
            name: '三级 3-2-1'
          }
        ]
      }
    ]
  }
])

const data6 = ref([
  {
    value: '1',
    label: '一级 1',
    children: [
      {
        value: '1-1',
        label: '二级 1-1',
        children: [
          {
            value: '1-1-1',
            label: '三级 1-1-1'
          }
        ]
      }
    ]
  },
  {
    value: '2',
    label: '一级 2',
    children: [
      {
        value: '2-1',
        label: '二级 2-1',
        children: [
          {
            value: '2-1-1',
            label: '三级 2-1-1'
          }
        ]
      },
      {
        value: '2-2',
        label: '二级 2-2',
        children: [
          {
            value: '2-2-1',
            label: '三级 2-2-1'
          }
        ]
      }
    ]
  },
  {
    value: '3',
    label: '一级 3',
    children: [
      {
        value: '3-1',
        label: '二级 3-1',
        children: [
          {
            value: '3-1-1',
            label: '三级 3-1-1'
          }
        ]
      },
      {
        value: '3-2',
        label: '二级 3-2',
        children: [
          {
            value: '3-2-1',
            label: '三级 3-2-1'
          }
        ]
      }
    ]
  }
])

const data7 = ref([
  {
    value: '1',
    label: '一级 1',
    children: [
      {
        value: '1-1',
        label: '二级 1-1',
        children: [
          {
            value: '1-1-1',
            label: '三级 1-1-1'
          }
        ]
      }
    ]
  },
  {
    value: '2',
    label: '一级 2',
    children: [
      {
        value: '2-1',
        label: '二级 2-1',
        children: [
          {
            value: '2-1-1',
            label: '三级 2-1-1'
          }
        ]
      },
      {
        value: '2-2',
        label: '二级 2-2',
        children: [
          {
            value: '2-2-1',
            label: '三级 2-2-1'
          }
        ]
      }
    ]
  },
  {
    value: '3',
    label: '一级 3',
    children: [
      {
        value: '3-1',
        label: '二级 3-1',
        children: [
          {
            value: '3-1-1',
            label: '三级 3-1-1'
          }
        ]
      },
      {
        value: '3-2',
        label: '二级 3-2',
        children: [
          {
            value: '3-2-1',
            label: '三级 3-2-1'
          }
        ]
      }
    ]
  }
])

const data8 = ref([
  {
    value: '1',
    label: '一级 1',
    children: [
      {
        value: '1-1',
        label: '二级 1-1',
        children: [
          {
            value: '1-1-1',
            label: '三级 1-1-1'
          }
        ]
      }
    ]
  },
  {
    value: '2',
    label: '一级 2',
    children: [
      {
        value: '2-1',
        label: '二级 2-1',
        children: [
          {
            value: '2-1-1',
            label: '三级 2-1-1'
          }
        ]
      },
      {
        value: '2-2',
        label: '二级 2-2',
        children: [
          {
            value: '2-2-1',
            label: '三级 2-2-1'
          }
        ]
      }
    ]
  },
  {
    value: '3',
    label: '一级 3',
    children: [
      {
        value: '3-1',
        label: '二级 3-1',
        children: [
          {
            value: '3-1-1',
            label: '三级 3-1-1'
          }
        ]
      },
      {
        value: '3-2',
        label: '二级 3-2',
        children: [
          {
            value: '3-2-1',
            label: '三级 3-2-1'
          }
        ]
      }
    ]
  }
])

const departmentData = ref([
  {
    value: '1',
    label: '技术部',
    children: [
      {
        value: '1-1',
        label: '前端组'
      },
      {
        value: '1-2',
        label: '后端组'
      },
      {
        value: '1-3',
        label: '测试组'
      }
    ]
  },
  {
    value: '2',
    label: '产品部',
    children: [
      {
        value: '2-1',
        label: '产品组'
      },
      {
        value: '2-2',
        label: '设计组'
      }
    ]
  },
  {
    value: '3',
    label: '运营部',
    children: [
      {
        value: '3-1',
        label: '市场组'
      },
      {
        value: '3-2',
        label: '客服组'
      }
    ]
  }
])

const permissionData = ref([
  {
    value: '1',
    label: '系统管理',
    children: [
      {
        value: '1-1',
        label: '用户管理'
      },
      {
        value: '1-2',
        label: '角色管理'
      },
      {
        value: '1-3',
        label: '权限管理'
      }
    ]
  },
  {
    value: '2',
    label: '内容管理',
    children: [
      {
        value: '2-1',
        label: '文章管理'
      },
      {
        value: '2-2',
        label: '分类管理'
      }
    ]
  },
  {
    value: '3',
    label: '数据管理',
    children: [
      {
        value: '3-1',
        label: '数据统计'
      },
      {
        value: '3-2',
        label: '日志查看'
      }
    ]
  }
])

const form = ref({
  department: '',
  permissions: []
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
| data | 展示数据 | array | — | [] |
| props | 配置选项，具体见下表 | object | — | — |
| multiple | 是否多选 | boolean | — | false |
| disabled | 是否禁用 | boolean | — | false |
| size | 尺寸 | string | large / default / small | default |
| clearable | 是否可以清空选项 | boolean | — | false |
| collapse-tags | 多选时是否将选中值按文字的形式展示 | boolean | — | false |
| collapse-tags-tooltip | 当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签。 要使用此功能，collapse-tags 属性必须设定为 true | boolean | — | false |
| multiple-limit | 多选时用户最多可以选择的项目数，为 0 则不限制 | number | — | 0 |
| name | 选择器原生 name 属性 | string | — | — |
| id | 选择器原生 id 属性 | string | — | — |
| unlink-panels | 在展开节点时，是否自动展开父节点 | boolean | — | false |
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
1. **组织架构**: 公司部门、学校院系等层级结构选择
2. **权限管理**: 菜单权限、功能权限等树形权限选择
3. **分类管理**: 商品分类、文件分类等层级分类选择
4. **地区选择**: 省市区等行政区域选择
5. **数据筛选**: 多维度数据筛选
6. **配置管理**: 系统配置项选择
7. **导航菜单**: 多级导航菜单选择 