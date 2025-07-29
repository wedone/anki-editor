### 8. Pagination 分页
- **用途**: 分页组件
- **特点**: 支持多种分页模式

#### 详细用法
```vue
<template>
  <div>
    <!-- 基础用法 -->
    <el-pagination
      v-model:current-page="currentPage1"
      :page-size="10"
      :page-sizes="[10, 20, 30, 40]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="1000"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <!-- 更多功能 -->
    <el-pagination
      v-model:current-page="currentPage2"
      :page-size="10"
      :page-sizes="[10, 20, 30, 40]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="sizes, prev, pager, next, jumper, ->, total"
      :total="1000"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <!-- 小型分页 -->
    <el-pagination
      v-model:current-page="currentPage3"
      :page-size="10"
      :small="true"
      layout="prev, pager, next"
      :total="50"
      @current-change="handleCurrentChange"
    />

    <!-- 带背景色的分页 -->
    <el-pagination
      v-model:current-page="currentPage4"
      :page-size="10"
      :background="true"
      layout="prev, pager, next"
      :total="1000"
      @current-change="handleCurrentChange"
    />

    <!-- 禁用状态 -->
    <el-pagination
      v-model:current-page="currentPage5"
      :page-size="10"
      :disabled="true"
      layout="prev, pager, next"
      :total="1000"
      @current-change="handleCurrentChange"
    />

    <!-- 隐藏总数 -->
    <el-pagination
      v-model:current-page="currentPage6"
      :page-size="10"
      layout="sizes, prev, pager, next, jumper"
      :total="1000"
      :hide-on-single-page="true"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <!-- 完整功能 -->
    <el-pagination
      v-model:current-page="currentPage7"
      :page-size="pageSize"
      :page-sizes="[10, 20, 30, 40, 50]"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper, ->, slot"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
      <template #default>
        <el-button type="primary" size="small">确定</el-button>
      </template>
    </el-pagination>

    <!-- 简单分页 -->
    <el-pagination
      v-model:current-page="currentPage8"
      :page-size="10"
      layout="prev, pager, next"
      :total="1000"
      @current-change="handleCurrentChange"
    />

    <!-- 带跳转的分页 -->
    <el-pagination
      v-model:current-page="currentPage9"
      :page-size="10"
      layout="prev, pager, next, jumper"
      :total="1000"
      @current-change="handleCurrentChange"
    />

    <!-- 带每页条数的分页 -->
    <el-pagination
      v-model:current-page="currentPage10"
      :page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      layout="sizes, prev, pager, next"
      :total="1000"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <!-- 带总数的分页 -->
    <el-pagination
      v-model:current-page="currentPage11"
      :page-size="10"
      layout="total, prev, pager, next"
      :total="1000"
      @current-change="handleCurrentChange"
    />

    <!-- 完整布局 -->
    <el-pagination
      v-model:current-page="currentPage12"
      :page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="1000"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <!-- 在表格中使用 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180" />
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column prop="address" label="地址" />
    </el-table>
    
    <el-pagination
      v-model:current-page="tableCurrentPage"
      v-model:page-size="tablePageSize"
      :page-sizes="[10, 20, 30, 40]"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableTotal"
      @size-change="handleTableSizeChange"
      @current-change="handleTableCurrentChange"
    />

    <!-- 在卡片中使用 -->
    <el-card style="width: 100%">
      <template #header>
        <div class="card-header">
          <span>数据列表</span>
          <el-button type="primary" size="small">新增</el-button>
        </div>
      </template>
      
      <el-table :data="cardTableData" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="名称" width="180" />
        <el-table-column prop="status" label="状态" width="120">
          <template #default="scope">
            <el-tag :type="scope.row.status === 'active' ? 'success' : 'danger'">
              {{ scope.row.status === 'active' ? '激活' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" />
      </el-table>
      
      <div style="margin-top: 20px; text-align: right;">
        <el-pagination
          v-model:current-page="cardCurrentPage"
          v-model:page-size="cardPageSize"
          :page-sizes="[5, 10, 20]"
          :background="true"
          layout="total, sizes, prev, pager, next"
          :total="cardTotal"
          @size-change="handleCardSizeChange"
          @current-change="handleCardCurrentChange"
        />
      </div>
    </el-card>

    <!-- 响应式分页 -->
    <el-pagination
      v-model:current-page="responsiveCurrentPage"
      :page-size="responsivePageSize"
      :page-sizes="[5, 10, 20]"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="responsiveTotal"
      class="responsive-pagination"
      @size-change="handleResponsiveSizeChange"
      @current-change="handleResponsiveCurrentChange"
    />

    <!-- 自定义分页 -->
    <el-pagination
      v-model:current-page="customCurrentPage"
      :page-size="customPageSize"
      :page-sizes="[10, 20, 30]"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="customTotal"
      class="custom-pagination"
      @size-change="handleCustomSizeChange"
      @current-change="handleCustomCurrentChange"
    />

    <!-- 分页组 -->
    <div class="pagination-group">
      <el-pagination
        v-model:current-page="groupCurrentPage1"
        :page-size="10"
        layout="prev, pager, next"
        :total="100"
        @current-change="handleGroupCurrentChange1"
      />
      
      <el-pagination
        v-model:current-page="groupCurrentPage2"
        :page-size="10"
        layout="prev, pager, next"
        :total="200"
        @current-change="handleGroupCurrentChange2"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'

// 基础分页
const currentPage1 = ref(1)
const currentPage2 = ref(1)
const currentPage3 = ref(1)
const currentPage4 = ref(1)
const currentPage5 = ref(1)
const currentPage6 = ref(1)
const currentPage7 = ref(1)
const currentPage8 = ref(1)
const currentPage9 = ref(1)
const currentPage10 = ref(1)
const currentPage11 = ref(1)
const currentPage12 = ref(1)

// 表格分页
const tableCurrentPage = ref(1)
const tablePageSize = ref(10)
const tableTotal = ref(1000)

// 卡片分页
const cardCurrentPage = ref(1)
const cardPageSize = ref(10)
const cardTotal = ref(500)

// 响应式分页
const responsiveCurrentPage = ref(1)
const responsivePageSize = ref(10)
const responsiveTotal = ref(300)

// 自定义分页
const customCurrentPage = ref(1)
const customPageSize = ref(10)
const customTotal = ref(800)

// 分页组
const groupCurrentPage1 = ref(1)
const groupCurrentPage2 = ref(1)

// 控制选项
const small = ref(false)
const disabled = ref(false)
const background = ref(true)
const pageSize = ref(10)
const total = ref(1000)

// 模拟数据
const tableData = computed(() => {
  const start = (tableCurrentPage.value - 1) * tablePageSize.value
  const end = start + tablePageSize.value
  return generateData(tableTotal.value).slice(start, end)
})

const cardTableData = computed(() => {
  const start = (cardCurrentPage.value - 1) * cardPageSize.value
  const end = start + cardPageSize.value
  return generateCardData(cardTotal.value).slice(start, end)
})

// 生成模拟数据
const generateData = (total) => {
  const data = []
  for (let i = 1; i <= total; i++) {
    data.push({
      date: `2023-05-${String(i % 30 + 1).padStart(2, '0')}`,
      name: `用户${i}`,
      address: `地址${i}`
    })
  }
  return data
}

const generateCardData = (total) => {
  const data = []
  for (let i = 1; i <= total; i++) {
    data.push({
      id: i,
      name: `项目${i}`,
      status: i % 3 === 0 ? 'active' : 'inactive',
      createTime: `2023-05-${String(i % 30 + 1).padStart(2, '0')} 10:00:00`
    })
  }
  return data
}

// 事件处理
const handleSizeChange = (val) => {
  ElMessage.success(`每页 ${val} 条`)
}

const handleCurrentChange = (val) => {
  ElMessage.success(`当前页: ${val}`)
}

const handleTableSizeChange = (val) => {
  tablePageSize.value = val
  tableCurrentPage.value = 1
  ElMessage.success(`表格每页 ${val} 条`)
}

const handleTableCurrentChange = (val) => {
  tableCurrentPage.value = val
  ElMessage.success(`表格当前页: ${val}`)
}

const handleCardSizeChange = (val) => {
  cardPageSize.value = val
  cardCurrentPage.value = 1
  ElMessage.success(`卡片每页 ${val} 条`)
}

const handleCardCurrentChange = (val) => {
  cardCurrentPage.value = val
  ElMessage.success(`卡片当前页: ${val}`)
}

const handleResponsiveSizeChange = (val) => {
  responsivePageSize.value = val
  responsiveCurrentPage.value = 1
}

const handleResponsiveCurrentChange = (val) => {
  responsiveCurrentPage.value = val
}

const handleCustomSizeChange = (val) => {
  customPageSize.value = val
  customCurrentPage.value = 1
}

const handleCustomCurrentChange = (val) => {
  customCurrentPage.value = val
}

const handleGroupCurrentChange1 = (val) => {
  groupCurrentPage1.value = val
}

const handleGroupCurrentChange2 = (val) => {
  groupCurrentPage2.value = val
}
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pagination-group {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

/* 响应式分页 */
@media (max-width: 768px) {
  .responsive-pagination {
    font-size: 12px;
  }
  
  .responsive-pagination .el-pagination__sizes {
    display: none;
  }
  
  .responsive-pagination .el-pagination__jump {
    display: none;
  }
}

/* 自定义分页样式 */
.custom-pagination .el-pagination__total {
  color: #409eff;
  font-weight: bold;
}

.custom-pagination .el-pagination__sizes .el-select .el-input {
  width: 120px;
}

.custom-pagination .el-pagination__jump .el-input {
  width: 60px;
}

.custom-pagination .el-pagination__jump .el-input__inner {
  text-align: center;
}

/* 分页动画 */
.el-pagination .el-pager li {
  transition: all 0.3s ease;
}

.el-pagination .el-pager li:hover {
  transform: scale(1.1);
}

.el-pagination .el-pager li.is-active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
}

/* 分页组样式 */
.pagination-group .el-pagination {
  margin: 0;
}

.pagination-group .el-pagination .el-pagination__total {
  margin-right: 10px;
}
</style>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| small | 是否使用小型分页 | boolean | — | false |
| background | 是否为分页按钮添加背景色 | boolean | — | false |
| page-size / v-model:page-size | 每页显示条目个数 | number | — | 10 |
| page-sizes | 每页显示条目个数的选择器选项设置 | number[] | — | [10, 20, 30, 40, 50, 100] |
| popper-class | 每页显示条目个数的选择器的下拉框类名 | string | — | — |
| prev-text | 替代图标显示的上一页文字 | string | — | — |
| next-text | 替代图标显示的下一页文字 | string | — | — |
| layout | 组件布局，子组件名用逗号分隔 | string | sizes / prev / pager / next / jumper / -> / total / slot | prev, pager, next, jumper, ->, total |
| total | 总条目数 | number | — | — |
| page-count | 总页数，total 和 page-count 设置任意一个就可以达到显示页码的功能；如果要支持 page-sizes 的更改，则需要使用 total 属性 | number | — | — |
| pager-count | 设置最大页码按钮数。 页码按钮的数量，当总页数超过该值时会折叠 | number | 5 到 21 之间的奇数 | 7 |
| current-page / v-model:current-page | 当前页数，支持 v-model 双向绑定 | number | — | 1 |
| default-current-page | 默认的当前页数 | number | — | 1 |
| default-page-size | 默认的每页条数 | number | — | 10 |
| hide-on-single-page | 只有一页时是否隐藏 | boolean | — | false |
| teleported | 是否将下拉列表插入至 body 元素 | boolean | — | true |

#### 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| size-change | page-size 改变时触发 | 新的 page-size |
| current-change | current-page 改变时触发 | 新的 current-page |
| prev-click | 用户点击上一页按钮改变当前页时触发 | 新的 current-page |
| next-click | 用户点击下一页按钮改变当前页时触发 | 新的 current-page |

#### 插槽
| 插槽名 | 说明 |
|--------|------|
| — | 自定义内容，当 layout 包含 'slot' 时有效 |

#### 使用示例
```vue
<!-- 基础用法 -->
<el-pagination
  v-model:current-page="currentPage"
  :page-size="10"
  :page-sizes="[10, 20, 30, 40]"
  layout="total, sizes, prev, pager, next, jumper"
  :total="1000"
  @size-change="handleSizeChange"
  @current-change="handleCurrentChange"
/>

<!-- 小型分页 -->
<el-pagination
  v-model:current-page="currentPage"
  :page-size="10"
  :small="true"
  layout="prev, pager, next"
  :total="50"
  @current-change="handleCurrentChange"
/>

<!-- 带背景色的分页 -->
<el-pagination
  v-model:current-page="currentPage"
  :page-size="10"
  :background="true"
  layout="prev, pager, next"
  :total="1000"
  @current-change="handleCurrentChange"
/>

<!-- 完整功能 -->
<el-pagination
  v-model:current-page="currentPage"
  :page-size="pageSize"
  :page-sizes="[10, 20, 30, 40, 50]"
  :background="true"
  layout="total, sizes, prev, pager, next, jumper, ->, slot"
  :total="total"
  @size-change="handleSizeChange"
  @current-change="handleCurrentChange"
>
  <template #default>
    <el-button type="primary" size="small">确定</el-button>
  </template>
</el-pagination>

<!-- 在表格中使用 -->
<el-table :data="tableData" style="width: 100%">
  <el-table-column prop="date" label="日期" width="180" />
  <el-table-column prop="name" label="姓名" width="180" />
  <el-table-column prop="address" label="地址" />
</el-table>

<el-pagination
  v-model:current-page="tableCurrentPage"
  v-model:page-size="tablePageSize"
  :page-sizes="[10, 20, 30, 40]"
  :background="true"
  layout="total, sizes, prev, pager, next, jumper"
  :total="tableTotal"
  @size-change="handleTableSizeChange"
  @current-change="handleTableCurrentChange"
/>
```

#### 样式定制
```css
/* 自定义分页样式 */
.custom-pagination .el-pagination__total {
  color: #409eff;
  font-weight: bold;
}

.custom-pagination .el-pagination__sizes .el-select .el-input {
  width: 120px;
}

.custom-pagination .el-pagination__jump .el-input {
  width: 60px;
}

.custom-pagination .el-pagination__jump .el-input__inner {
  text-align: center;
}

/* 分页动画 */
.el-pagination .el-pager li {
  transition: all 0.3s ease;
}

.el-pagination .el-pager li:hover {
  transform: scale(1.1);
}

.el-pagination .el-pager li.is-active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
}

/* 响应式分页 */
@media (max-width: 768px) {
  .responsive-pagination {
    font-size: 12px;
  }
  
  .responsive-pagination .el-pagination__sizes {
    display: none;
  }
  
  .responsive-pagination .el-pagination__jump {
    display: none;
  }
  
  .el-pagination {
    justify-content: center;
  }
}

/* 分页组样式 */
.pagination-group {
  display: flex;
  gap: 20px;
  align-items: center;
}

.pagination-group .el-pagination {
  margin: 0;
}

/* 分页按钮样式 */
.el-pagination .btn-prev,
.el-pagination .btn-next {
  border-radius: 4px;
  transition: all 0.3s ease;
}

.el-pagination .btn-prev:hover,
.el-pagination .btn-next:hover {
  background-color: #409eff;
  color: white;
}

/* 页码按钮样式 */
.el-pagination .el-pager li {
  border-radius: 4px;
  margin: 0 2px;
}

.el-pagination .el-pager li.is-active {
  background-color: #409eff;
  color: white;
  border: none;
}

.el-pagination .el-pager li:hover {
  background-color: #ecf5ff;
  color: #409eff;
}
```

#### 使用场景
1. **数据列表**: 在表格、列表等数据展示组件中使用
2. **搜索结果**: 在搜索结果页面中分页显示
3. **文章列表**: 在博客、新闻等文章列表中使用
4. **商品展示**: 在电商网站的商品列表中使用
5. **用户管理**: 在用户管理系统中分页显示用户列表
6. **文件管理**: 在文件管理系统中分页显示文件列表
7. **评论系统**: 在评论系统中分页显示评论

#### 注意事项
1. **数据加载**: 分页切换时需要重新加载数据
2. **性能优化**: 大数据量时考虑使用虚拟滚动
3. **用户体验**: 合理设置每页显示数量
4. **响应式设计**: 在移动端考虑分页组件的显示效果
5. **状态保持**: 分页状态在页面刷新后需要保持
6. **URL 同步**: 分页状态可以同步到 URL 参数
7. **样式一致性**: 保持与整体设计风格一致 