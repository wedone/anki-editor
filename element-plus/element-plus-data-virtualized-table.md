### 23. Virtualized Table 虚拟化表格
- **用途**: 大数据量表格
- **特点**: 优化大数据量渲染性能

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-virtualized-table
    :data="tableData1"
    :columns="columns1"
    height="400"
  />

  <!-- 固定列 -->
  <el-virtualized-table
    :data="tableData2"
    :columns="columns2"
    height="400"
    :fixed="true"
  />

  <!-- 可排序 -->
  <el-virtualized-table
    :data="tableData3"
    :columns="columns3"
    height="400"
    :sortable="true"
    @sort-change="handleSortChange"
  />

  <!-- 可筛选 -->
  <el-virtualized-table
    :data="tableData4"
    :columns="columns4"
    height="400"
    :filterable="true"
    @filter-change="handleFilterChange"
  />

  <!-- 可编辑 -->
  <el-virtualized-table
    :data="tableData5"
    :columns="columns5"
    height="400"
    :editable="true"
    @cell-change="handleCellChange"
  />

  <!-- 自定义列宽 -->
  <el-virtualized-table
    :data="tableData6"
    :columns="columns6"
    height="400"
    :column-width="200"
  />

  <!-- 事件处理 -->
  <el-virtualized-table
    :data="tableData7"
    :columns="columns7"
    height="400"
    @row-click="handleRowClick"
    @cell-click="handleCellClick"
  />

  <!-- 在页面中使用 -->
  <div class="table-container">
    <el-virtualized-table
      :data="userData"
      :columns="userColumns"
      height="500"
      :fixed="true"
      :sortable="true"
      :filterable="true"
      @sort-change="handleUserSortChange"
      @filter-change="handleUserFilterChange"
      @row-click="handleUserRowClick"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 生成大量数据用于演示虚拟化
const generateTableData = (count) => {
  const data = []
  for (let i = 1; i <= count; i++) {
    data.push({
      id: i,
      name: `用户${i}`,
      email: `user${i}@example.com`,
      phone: `138${String(i).padStart(8, '0')}`,
      department: ['技术部', '产品部', '运营部', '市场部'][i % 4],
      position: ['工程师', '产品经理', '运营专员', '市场专员'][i % 4],
      salary: Math.floor(Math.random() * 50000) + 10000,
      status: ['在职', '离职', '试用期'][i % 3],
      createTime: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toLocaleDateString()
    })
  }
  return data
}

const tableData1 = ref(generateTableData(1000))
const tableData2 = ref(generateTableData(1000))
const tableData3 = ref(generateTableData(1000))
const tableData4 = ref(generateTableData(1000))
const tableData5 = ref(generateTableData(1000))
const tableData6 = ref(generateTableData(1000))
const tableData7 = ref(generateTableData(1000))

// 基础列配置
const columns1 = ref([
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'email', label: '邮箱', width: 200 },
  { prop: 'phone', label: '电话', width: 150 },
  { prop: 'department', label: '部门', width: 120 },
  { prop: 'position', label: '职位', width: 120 },
  { prop: 'salary', label: '薪资', width: 100 },
  { prop: 'status', label: '状态', width: 100 },
  { prop: 'createTime', label: '创建时间', width: 150 }
])

// 固定列配置
const columns2 = ref([
  { prop: 'id', label: 'ID', width: 80, fixed: 'left' },
  { prop: 'name', label: '姓名', width: 120, fixed: 'left' },
  { prop: 'email', label: '邮箱', width: 200 },
  { prop: 'phone', label: '电话', width: 150 },
  { prop: 'department', label: '部门', width: 120 },
  { prop: 'position', label: '职位', width: 120 },
  { prop: 'salary', label: '薪资', width: 100 },
  { prop: 'status', label: '状态', width: 100, fixed: 'right' },
  { prop: 'createTime', label: '创建时间', width: 150, fixed: 'right' }
])

// 可排序列配置
const columns3 = ref([
  { prop: 'id', label: 'ID', width: 80, sortable: true },
  { prop: 'name', label: '姓名', width: 120, sortable: true },
  { prop: 'email', label: '邮箱', width: 200 },
  { prop: 'phone', label: '电话', width: 150 },
  { prop: 'department', label: '部门', width: 120, sortable: true },
  { prop: 'position', label: '职位', width: 120 },
  { prop: 'salary', label: '薪资', width: 100, sortable: true },
  { prop: 'status', label: '状态', width: 100, sortable: true },
  { prop: 'createTime', label: '创建时间', width: 150, sortable: true }
])

// 可筛选列配置
const columns4 = ref([
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120, filterable: true },
  { prop: 'email', label: '邮箱', width: 200, filterable: true },
  { prop: 'phone', label: '电话', width: 150 },
  { prop: 'department', label: '部门', width: 120, filterable: true },
  { prop: 'position', label: '职位', width: 120, filterable: true },
  { prop: 'salary', label: '薪资', width: 100 },
  { prop: 'status', label: '状态', width: 100, filterable: true },
  { prop: 'createTime', label: '创建时间', width: 150 }
])

// 可编辑列配置
const columns5 = ref([
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120, editable: true },
  { prop: 'email', label: '邮箱', width: 200, editable: true },
  { prop: 'phone', label: '电话', width: 150, editable: true },
  { prop: 'department', label: '部门', width: 120, editable: true },
  { prop: 'position', label: '职位', width: 120, editable: true },
  { prop: 'salary', label: '薪资', width: 100, editable: true },
  { prop: 'status', label: '状态', width: 100, editable: true },
  { prop: 'createTime', label: '创建时间', width: 150 }
])

// 自定义列宽配置
const columns6 = ref([
  { prop: 'id', label: 'ID' },
  { prop: 'name', label: '姓名' },
  { prop: 'email', label: '邮箱' },
  { prop: 'phone', label: '电话' },
  { prop: 'department', label: '部门' },
  { prop: 'position', label: '职位' },
  { prop: 'salary', label: '薪资' },
  { prop: 'status', label: '状态' },
  { prop: 'createTime', label: '创建时间' }
])

// 事件处理列配置
const columns7 = ref([
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'email', label: '邮箱', width: 200 },
  { prop: 'phone', label: '电话', width: 150 },
  { prop: 'department', label: '部门', width: 120 },
  { prop: 'position', label: '职位', width: 120 },
  { prop: 'salary', label: '薪资', width: 100 },
  { prop: 'status', label: '状态', width: 100 },
  { prop: 'createTime', label: '创建时间', width: 150 }
])

// 用户数据
const userData = ref(generateTableData(5000))

// 用户列配置
const userColumns = ref([
  { prop: 'id', label: 'ID', width: 80, fixed: 'left' },
  { prop: 'name', label: '姓名', width: 120, fixed: 'left', sortable: true, filterable: true },
  { prop: 'email', label: '邮箱', width: 200, filterable: true },
  { prop: 'phone', label: '电话', width: 150 },
  { prop: 'department', label: '部门', width: 120, sortable: true, filterable: true },
  { prop: 'position', label: '职位', width: 120, filterable: true },
  { prop: 'salary', label: '薪资', width: 100, sortable: true },
  { prop: 'status', label: '状态', width: 100, sortable: true, filterable: true },
  { prop: 'createTime', label: '创建时间', width: 150, sortable: true, fixed: 'right' }
])

// 事件处理函数
const handleSortChange = (column, prop, order) => {
  console.log('排序改变:', column, prop, order)
}

const handleFilterChange = (filters) => {
  console.log('筛选改变:', filters)
}

const handleCellChange = (row, column, value) => {
  console.log('单元格改变:', row, column, value)
}

const handleRowClick = (row, column, event) => {
  console.log('行点击:', row, column, event)
}

const handleCellClick = (row, column, cell, event) => {
  console.log('单元格点击:', row, column, cell, event)
}

const handleUserSortChange = (column, prop, order) => {
  console.log('用户排序改变:', column, prop, order)
}

const handleUserFilterChange = (filters) => {
  console.log('用户筛选改变:', filters)
}

const handleUserRowClick = (row, column, event) => {
  console.log('用户行点击:', row, column, event)
}
</script>

<style scoped>
.table-container {
  margin: 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}
</style>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| data | 表格数据 | array | — | [] |
| columns | 列配置 | array | — | [] |
| height | 表格高度 | string / number | — | 400 |
| width | 表格宽度 | string / number | — | 100% |
| fixed | 是否固定列 | boolean | — | false |
| sortable | 是否可排序 | boolean | — | false |
| filterable | 是否可筛选 | boolean | — | false |
| editable | 是否可编辑 | boolean | — | false |
| column-width | 默认列宽 | number | — | 150 |
| row-height | 行高 | number | — | 40 |
| header-height | 表头高度 | number | — | 40 |
| stripe | 是否为斑马纹表格 | boolean | — | false |
| border | 是否带有纵向边框 | boolean | — | false |
| show-header | 是否显示表头 | boolean | — | true |
| highlight-current-row | 是否要高亮当前行 | boolean | — | false |
| row-class-name | 行的 className 的回调方法 | function | — | — |
| cell-class-name | 单元格的 className 的回调方法 | function | — | — |
| header-row-class-name | 表头行的 className 的回调方法 | function | — | — |
| header-cell-class-name | 表头单元格的 className 的回调方法 | function | — | — |

#### 列配置项
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| prop | 对应列内容的字段名 | string | — | — |
| label | 显示的标题 | string | — | — |
| width | 对应列的宽度 | number | — | — |
| fixed | 列是否固定在左侧或者右侧 | string / boolean | true / left / right | — |
| sortable | 对应列是否可以排序 | boolean | — | false |
| filterable | 对应列是否可以筛选 | boolean | — | false |
| editable | 对应列是否可以编辑 | boolean | — | false |
| formatter | 用来格式化内容 | function(row, column, cellValue, index) | — | — |
| render | 渲染函数 | function(h, { row, column, $index }) | — | — |

#### 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| sort-change | 当排序条件发生变化的时候会触发该事件 | column, prop, order |
| filter-change | 当筛选条件发生变化的时候会触发该事件 | filters |
| cell-change | 当单元格内容发生变化的时候会触发该事件 | row, column, value |
| row-click | 当某一行被点击时会触发该事件 | row, column, event |
| cell-click | 当某个单元格被点击时会触发该事件 | row, column, cell, event |
| row-dblclick | 当某一行被双击时会触发该事件 | row, column, event |
| cell-dblclick | 当某个单元格被双击时会触发该事件 | row, column, cell, event |

#### 插槽
| 插槽名 | 说明 |
|--------|------|
| empty | 当数据为空时自定义的内容 |

#### 使用场景
1. **大数据量展示**: 用户列表、订单列表等大量数据展示
2. **性能优化**: 需要渲染大量数据时的性能优化
3. **数据管理**: 后台管理系统的数据表格
4. **报表展示**: 数据报表的表格展示
5. **数据分析**: 数据分析结果的表格展示
6. **文件管理**: 大量文件信息的表格展示
7. **日志查看**: 系统日志的表格展示 