### 20. Transfer 穿梭框
- **用途**: 数据穿梭
- **特点**: 支持双向数据转移

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-transfer
    v-model="value1"
    :data="data1"
  />

  <!-- 可搜索 -->
  <el-transfer
    v-model="value2"
    :data="data2"
    filterable
  />

  <!-- 可清空选项 -->
  <el-transfer
    v-model="value3"
    :data="data3"
    filterable
    :left-default-checked="[2, 3]"
    :right-default-checked="[1]"
  />

  <!-- 自定义标题 -->
  <el-transfer
    v-model="value4"
    :data="data4"
    :titles="['Source', 'Target']"
    :button-texts="['To left', 'To right']"
    :format="{
      noChecked: '${total}',
      hasChecked: '${checked}/${total}'
    }"
  />

  <!-- 自定义数据格式 -->
  <el-transfer
    v-model="value5"
    :data="data5"
    :props="{
      key: 'value',
      label: 'desc'
    }"
  />

  <!-- 禁用状态 -->
  <el-transfer
    v-model="value6"
    :data="data6"
    :disabled="true"
  />

  <!-- 不同尺寸 -->
  <el-transfer
    v-model="value7"
    :data="data7"
    size="large"
  />
  <el-transfer
    v-model="value7"
    :data="data7"
    size="default"
  />
  <el-transfer
    v-model="value7"
    :data="data7"
    size="small"
  />

  <!-- 事件处理 -->
  <el-transfer
    v-model="value8"
    :data="data8"
    @change="handleChange"
    @left-check-change="handleLeftCheckChange"
    @right-check-change="handleRightCheckChange"
  />

  <!-- 在表单中使用 -->
  <el-form :model="form" label-width="120px">
    <el-form-item label="权限分配">
      <el-transfer
        v-model="form.permissions"
        :data="permissionData"
        :titles="['可选权限', '已选权限']"
        filterable
      />
    </el-form-item>
    <el-form-item label="用户分配">
      <el-transfer
        v-model="form.users"
        :data="userData"
        :props="{
          key: 'id',
          label: 'name'
        }"
        :titles="['可选用户', '已选用户']"
      />
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref } from 'vue'

const value1 = ref([1, 4])
const value2 = ref([1, 4])
const value3 = ref([1, 4])
const value4 = ref([1, 4])
const value5 = ref([1, 4])
const value6 = ref([1, 4])
const value7 = ref([1, 4])
const value8 = ref([1, 4])

const data1 = ref([
  {
    key: 1,
    label: '备选项1',
    disabled: false
  },
  {
    key: 2,
    label: '备选项2',
    disabled: false
  },
  {
    key: 3,
    label: '备选项3',
    disabled: false
  },
  {
    key: 4,
    label: '备选项4',
    disabled: false
  },
  {
    key: 5,
    label: '备选项5',
    disabled: false
  }
])

const data2 = ref([
  {
    key: 1,
    label: '备选项1',
    disabled: false
  },
  {
    key: 2,
    label: '备选项2',
    disabled: false
  },
  {
    key: 3,
    label: '备选项3',
    disabled: false
  },
  {
    key: 4,
    label: '备选项4',
    disabled: false
  },
  {
    key: 5,
    label: '备选项5',
    disabled: false
  }
])

const data3 = ref([
  {
    key: 1,
    label: '备选项1',
    disabled: false
  },
  {
    key: 2,
    label: '备选项2',
    disabled: false
  },
  {
    key: 3,
    label: '备选项3',
    disabled: false
  },
  {
    key: 4,
    label: '备选项4',
    disabled: false
  },
  {
    key: 5,
    label: '备选项5',
    disabled: false
  }
])

const data4 = ref([
  {
    key: 1,
    label: '备选项1',
    disabled: false
  },
  {
    key: 2,
    label: '备选项2',
    disabled: false
  },
  {
    key: 3,
    label: '备选项3',
    disabled: false
  },
  {
    key: 4,
    label: '备选项4',
    disabled: false
  },
  {
    key: 5,
    label: '备选项5',
    disabled: false
  }
])

const data5 = ref([
  {
    value: 1,
    desc: '备选项1'
  },
  {
    value: 2,
    desc: '备选项2'
  },
  {
    value: 3,
    desc: '备选项3'
  },
  {
    value: 4,
    desc: '备选项4'
  },
  {
    value: 5,
    desc: '备选项5'
  }
])

const data6 = ref([
  {
    key: 1,
    label: '备选项1',
    disabled: false
  },
  {
    key: 2,
    label: '备选项2',
    disabled: false
  },
  {
    key: 3,
    label: '备选项3',
    disabled: false
  },
  {
    key: 4,
    label: '备选项4',
    disabled: false
  },
  {
    key: 5,
    label: '备选项5',
    disabled: false
  }
])

const data7 = ref([
  {
    key: 1,
    label: '备选项1',
    disabled: false
  },
  {
    key: 2,
    label: '备选项2',
    disabled: false
  },
  {
    key: 3,
    label: '备选项3',
    disabled: false
  },
  {
    key: 4,
    label: '备选项4',
    disabled: false
  },
  {
    key: 5,
    label: '备选项5',
    disabled: false
  }
])

const data8 = ref([
  {
    key: 1,
    label: '备选项1',
    disabled: false
  },
  {
    key: 2,
    label: '备选项2',
    disabled: false
  },
  {
    key: 3,
    label: '备选项3',
    disabled: false
  },
  {
    key: 4,
    label: '备选项4',
    disabled: false
  },
  {
    key: 5,
    label: '备选项5',
    disabled: false
  }
])

const permissionData = ref([
  { key: 1, label: '用户管理' },
  { key: 2, label: '角色管理' },
  { key: 3, label: '权限管理' },
  { key: 4, label: '系统设置' },
  { key: 5, label: '日志查看' }
])

const userData = ref([
  { id: 1, name: '张三' },
  { id: 2, name: '李四' },
  { id: 3, name: '王五' },
  { id: 4, name: '赵六' },
  { id: 5, name: '钱七' }
])

const form = ref({
  permissions: [1, 3],
  users: [1, 2]
})

const handleChange = (value, direction, movedKeys) => {
  console.log('数据改变:', value, direction, movedKeys)
}

const handleLeftCheckChange = (value, movedKeys) => {
  console.log('左侧选中改变:', value, movedKeys)
}

const handleRightCheckChange = (value, movedKeys) => {
  console.log('右侧选中改变:', value, movedKeys)
}
</script>

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| model-value / v-model | 绑定值 | array | — | [] |
| data | Transfer 的数据源 | array | — | [] |
| filterable | 是否可搜索 | boolean | — | false |
| filter-placeholder | 搜索框占位符 | string | — | 请输入搜索内容 |
| filter-method | 自定义搜索方法 | function | — | — |
| target-order | 右侧列表元素的排序策略：若为 original，则保持与数据源相同的顺序；若为 push，则新加入的元素排在最后；若为 unshift，则新加入的元素排在最前 | string | original / push / unshift | original |
| titles | 自定义列表标题 | array | — | ['列表 1', '列表 2'] |
| button-texts | 自定义按钮文案 | array | — | [] |
| render-content | 自定义数据项渲染函数 | function(h, option) | — | — |
| format | 列表顶部勾选状态文案 | object | — | { noChecked: '${checked}/${total}', hasChecked: '${checked}/${total}' } |
| props | 数据源的字段别名 | object | — | — |
| left-default-checked | 左侧列表默认勾选的项的 key 数组 | array | — | [] |
| right-default-checked | 右侧列表默认勾选的项的 key 数组 | array | — | [] |
| disabled | 是否禁用 | boolean | — | false |
| clearable | 是否显示清空按钮 | boolean | — | false |
| size | 组件大小 | string | large / default / small | default |

#### 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 右侧列表元素变化时触发 | 当前值、数据移动方向（'left' / 'right'）、发生移动的数据 key 数组 |
| left-check-change | 左侧列表元素被勾选时触发 | 当前被勾选项的 key 数组、勾选状态发生变化的项的 key 数组 |
| right-check-change | 右侧列表元素被勾选时触发 | 当前被勾选项的 key 数组、勾选状态发生变化的项的 key 数组 |

#### 插槽
| 插槽名 | 说明 |
|--------|------|
| left-footer | 左侧列表底部的内容 |
| right-footer | 右侧列表底部的内容 |

#### 使用场景
1. **权限管理**: 用户权限分配
2. **用户管理**: 用户角色分配
3. **数据筛选**: 多维度数据筛选
4. **配置管理**: 系统配置项选择
5. **文件管理**: 文件分类整理
6. **标签管理**: 标签分类管理
7. **工作流**: 审批流程人员分配 