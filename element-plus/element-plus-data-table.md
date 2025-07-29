### 1. Table 表格
- **用途**: 数据表格
- **特点**: 支持排序、筛选、分页、选择

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>

  <!-- 带斑马纹表格 -->
  <el-table
    :data="tableData"
    stripe
    style="width: 100%"
  >
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>

  <!-- 带边框表格 -->
  <el-table
    :data="tableData"
    border
    style="width: 100%"
  >
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>

  <!-- 固定列 -->
  <el-table :data="tableData" style="width: 100%">
    <el-table-column fixed prop="date" label="Date" width="150" />
    <el-table-column prop="name" label="Name" width="120" />
    <el-table-column prop="state" label="State" width="120" />
    <el-table-column prop="city" label="City" width="120" />
    <el-table-column prop="address" label="Address" width="300" />
    <el-table-column prop="zip" label="Zip" width="120" />
    <el-table-column fixed="right" label="Operations" width="120">
      <template #default="scope">
        <el-button link type="primary" size="small" @click="handleClick">
          Detail
        </el-button>
        <el-button link type="primary" size="small">Edit</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 多选表格 -->
  <el-table
    ref="multipleTableRef"
    :data="tableData"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>
  <div style="margin-top: 20px">
    <el-button @click="toggleSelection(tableData[1])">Toggle second row</el-button>
    <el-button @click="toggleSelection()">Clear selection</el-button>
  </div>

  <!-- 排序表格 -->
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
    <el-table-column prop="tag" label="Tag" width="100">
      <template #default="scope">
        <el-tag
          :type="scope.row.tag === 'Home' ? '' : 'success'"
          disable-transitions
        >
          {{ scope.row.tag }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>

  <!-- 筛选表格 -->
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
    <el-table-column prop="tag" label="Tag" width="100" :filters="[
      { text: 'Home', value: 'Home' },
      { text: 'Office', value: 'Office' }
    ]" :filter-method="filterTag" filter-placement="bottom-end">
      <template #default="scope">
        <el-tag
          :type="scope.row.tag === 'Home' ? '' : 'success'"
          disable-transitions
        >
          {{ scope.row.tag }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>

  <!-- 展开行 -->
  <el-table :data="tableData" style="width: 100%">
    <el-table-column type="expand">
      <template #default="props">
        <p style="margin: 0">This is expand content</p>
        <p style="margin: 0">Row name: {{ props.row.name }}</p>
      </template>
    </el-table-column>
    <el-table-column label="Date" prop="date" />
    <el-table-column label="Name" prop="name" />
  </el-table>

  <!-- 树形数据 -->
  <el-table
    :data="tableData"
    row-key="id"
    border
    default-expand-all
    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
  >
    <el-table-column prop="date" label="date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
  </el-table>
</template>

<script setup>
import { ref } from 'vue'

const tableData = ref([
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    tag: 'Home'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    tag: 'Office'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    tag: 'Home'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    tag: 'Office'
  }
])

// 多选表格
const multipleTableRef = ref()
const multipleSelection = ref([])

const handleSelectionChange = (val) => {
  multipleSelection.value = val
}

const toggleSelection = (row) => {
  if (row) {
    multipleTableRef.value.toggleRowSelection(row, undefined)
  } else {
    multipleTableRef.value.clearSelection()
  }
}

// 筛选
const filterTag = (value, row) => {
  return row.tag === value
}

const handleClick = () => {
  console.log('click')
}
</script>

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| data | 显示的数据 | array | — | — |
| height | Table 的高度，默认为自动高度。 如果 height 为 number 类型，单位 px；如果 height 为 string 类型，则这个值会作为 Table 的 style.height 的值，Table 的高度会受控于外部样式。 | string / number | — | — |
| max-height | Table 的最大高度。 合法的值为数字或者单位为 px 的高度。 | string / number | — | — |
| stripe | 是否为斑马纹 table | boolean | — | false |
| border | 是否带有纵向边框 | boolean | — | false |
| size | Table 的尺寸 | string | large / default / small | default |
| fit | 列的宽度是否自撑开 | boolean | — | true |
| show-header | 是否显示表头 | boolean | — | true |
| highlight-current-row | 是否要高亮当前行 | boolean | — | false |
| current-row-key | 当前行的 key，只写属性 | string / number | — | — |
| row-class-name | 行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className。 | string / function({ row, rowIndex }) | — | — |
| row-style | 行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style。 | object / function({ row, rowIndex }) | — | — |
| cell-class-name | 单元格的 className 的回调方法，也可以使用字符串为所有单元格设置一个固定的 className。 | string / function({ row, column, rowIndex, columnIndex }) | — | — |
| cell-style | 单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style。 | object / function({ row, column, rowIndex, columnIndex }) | — | — |
| header-row-class-name | 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className。 | string / function({ row, rowIndex }) | — | — |
| header-row-style | 表头行的 style 的回调方法，也可以使用一个固定的 Object 为所有表头行设置一样的 Style。 | object / function({ row, rowIndex }) | — | — |
| header-cell-class-name | 表头单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className。 | string / function({ row, column, rowIndex, columnIndex }) | — | — |
| header-cell-style | 表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style。 | object / function({ row, column, rowIndex, columnIndex }) | — | — |
| row-key | 行数据的 Key，用来优化 Table 的渲染；在使用 reserve-selection 功能与显示树形数据时，该属性是必填的。 类型为 String 时，支持多层访问：user.info.id，但不支持 user.info[0].id，此种情况请使用 Function。 | string / function(row) | — | id |
| empty-text | 空数据时显示的文本内容，也可以通过 slot="empty" 设置 | string | — | No Data |
| default-expand-all | 是否默认展开所有行，当 Table 包含展开行存在或者为树形表格时有效 | boolean | — | false |
| expand-row-keys | 可以通过该属性设置 Table 目前的展开行，需要设置 row-key 属性才能使用，该属性为展开行的 keys 数组。 | array | — | — |
| default-sort | 默认的排序列的 prop 和顺序。 它的 prop 属性指定默认的排序的列，order 指定默认排序的顺序 | object | order: ascending, descending | 如果只指定了 prop, 没有指定 order, 则默认顺序是 ascending |
| tooltip-effect | tooltip effect 主题 | string | dark / light | dark |
| show-summary | 是否在表尾显示合计行 | boolean | — | false |
| sum-text | 合计行第一列的文本 | string | — | Sum |
| summary-method | 自定义的合计计算方法 | function({ columns, data }) | — | — |
| span-method | 合并行或列的计算方法 | function({ row, column, rowIndex, columnIndex }) | — | — |
| select-on-indeterminate | 在多选表格中，当仅有部分行被选中时，点击表头的全选框时的行为。 若为 true，则选中所有行；若为 false，则取消选择所有行 | boolean | — | true |
| indent | 展示树形数据时，树节点的缩进 | number | — | 16 |
| lazy | 是否懒加载子节点数据 | boolean | — | false |
| load | 加载子节点数据的方法，仅当 lazy 为 true 时生效 | function(row, treeNode, resolve) | — | — |
| tree-props | 渲染嵌套数据的配置选项 | object | — | { hasChildren: 'hasChildren', children: 'children' } |

#### 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| select | 当用户手动勾选数据行的 Checkbox 时触发的事件 | selection, row |
| select-all | 当用户手动勾选全选 Checkbox 时触发的事件 | selection |
| selection-change | 当选择项发生变化时会触发该事件 | selection |
| cell-mouse-enter | 当单元格 hover 进入时会触发该事件 | row, column, cell, event |
| cell-mouse-leave | 当单元格 hover 退出时会触发该事件 | row, column, cell, event |
| cell-click | 当某个单元格被点击时会触发该事件 | row, column, cell, event |
| cell-dblclick | 当某个单元格被双击击时会触发该事件 | row, column, cell, event |
| row-click | 当某一行被点击时会触发该事件 | row, column, event |
| row-contextmenu | 当某一行被鼠标右键点击时会触发该事件 | row, column, event |
| row-dblclick | 当某一行被双击时会触发该事件 | row, column, event |
| header-click | 当某一列的表头被点击时会触发该事件 | column, event |
| header-contextmenu | 当某一列的表头被鼠标右键点击时会触发该事件 | column, event |
| sort-change | 当表格的排序条件发生变化的时候会触发该事件 | { column, prop, order } |
| filter-change | 当表格的筛选条件发生变化的时候会触发该事件，参数的值是一个对象，对象的 key 是 column 的 columnKey，对应的 value 为用户选择的筛选条件的数组。 | filters |
| current-change | 当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight-current-row 属性 | currentRow, oldCurrentRow |
| header-dragend | 当拖动表头改变了列的宽度的时候会触发该事件 | newWidth, oldWidth, column, event |
| expand-change | 当用户对某一行展开或者关闭的时候会触发该事件（展开行时，回调的第二个参数为 expandedRows；树形表格时，回调的第二个参数为 expanded） | row, (expandedRows \| expanded) |

#### 方法
| 方法名 | 说明 | 参数 |
|--------|------|------|
| clearSelection | 用于多选表格，清空用户的选择 | — |
| toggleRowSelection | 用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中） | row, selected |
| toggleAllSelection | 用于多选表格，切换全选和全不选 | — |
| setCurrentRow | 用于单选表格，设定某一行为选中行，如果调用时不加参数，则会取消目前高亮行的选中状态。 | row |
| clearSort | 用于清空排序条件，数据会恢复成未排序的状态 | — |
| clearFilter | 用于清空过滤条件，数据会恢复成未过滤的状态 | columnKeys |
| doLayout | 对 Table 进行重新布局。 当 Table 或其祖先元素由隐藏切换为显示时，可能需要调用此方法 | — |
| sort | 手动排序表格。 参数 prop 属性指定排序列，order 指定排序顺序。 | prop: string, order: string |

#### Table Column 属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| type | 对应列的类型。 如果设置了 selection 则显示多选框；如果设置了 index 则显示该行的索引（从 1 开始计算）；如果设置了 expand 则显示为一个可展开的按钮 | string | selection / index / expand | — |
| index | 如果设置了 type=index，可以通过传递 index 属性来自定义索引 | number / function(index) | — | — |
| column-key | column 的 key，如果需要使用 filter-change 事件，则需要此属性标识是哪个 column 的筛选条件 | string | — | — |
| label | 显示的标题 | string | — | — |
| prop | 对应列内容的字段名，也可以使用 property 属性 | string | — | — |
| width | 对应列的宽度 | string / number | — | — |
| min-width | 对应列的最小宽度，与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给设置了 min-width 的列 | string / number | — | — |
| fixed | 列是否固定在左侧或者右侧，true 表示固定在左侧 | string / boolean | true / left / right | — |
| render-header | 列标题 Label 区域渲染使用的 Function | function(h, { column, $index }) | — | — |
| sortable | 对应列是否可以排序，如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件 | boolean / string | true / false / 'custom' | false |
| sort-method | 对数据进行排序的时候使用的方法，仅当 sortable 设置为 true 的时候有效，需返回一个数字，对于 sort-method，参考 Array.sort | function(a, b) | — | — |
| sort-by | 指定数据按照哪个属性进行排序，仅当 sortable 设置为 true 且没有设置 sort-method 的时候有效。 如果 sort-by 为数组，则先按照第 1 个属性排序，如果第 1 个属性相等则按照第 2 个属性排序，以此类推 | String / Array / function(row, index) | — | — |
| sort-orders | 数据在排序时所使用排序策略的轮转顺序，仅当 sortable 为 true 时有效。 需传入一个数组，随着用户点击表头，该列依次按照数组中元素的顺序进行排序 | array | 数组中的元素需为以下三者之一：ascending 表示升序，descending 表示降序，null 表示还原为原始顺序 | ['ascending', 'descending', null] |
| resizable | 对应列是否可以通过拖动来改变宽度（需要在 el-table 上设置 border 属性为真） | boolean | — | true |
| formatter | 用来格式化内容 | function(row, column, cellValue, index) | — | — |
| show-overflow-tooltip | 当内容过长被隐藏时显示 tooltip | boolean | — | false |
| align | 对齐方式 | string | left / center / right | left |
| header-align | 表头对齐方式，若不设置该项，则使用表格的对齐方式 | string | left / center / right | — |
| class-name | 列的 className | string | — | — |
| label-class-name | 当前列标题的自定义类名 | string | — | — |
| selectable | 仅对 type=selection 的列有效，类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否可以勾选 | function(row, index) | — | — |
| reserve-selection | 仅对 type=selection 的列有效，类型为 Boolean，为 true 则会在数据更新之后保留之前选中的数据（需指定 row-key） | boolean | — | false |
| filters | 数据过滤的选项，数组格式，数组中的元素需要有 text 和 value 属性。 | array[{ text, value }] | — | — |
| filter-placement | 过滤弹出框的定位 | string | top / top-start / top-end / bottom / bottom-start / bottom-end / left / left-start / left-end / right / right-start / right-end | — |
| filter-multiple | 数据过滤的选项是否多选 | boolean | — | true |
| filter-method | 数据过滤使用的方法，如果是多选的筛选项，对每一条数据会执行多次，任意一次返回 true 就会显示。 | function(value, row, column) | — | — |
| filtered-value | 选中的数据过滤项，如果需要自定义表头过滤的渲染方式，可能会需要此属性。 | array | — | — | 