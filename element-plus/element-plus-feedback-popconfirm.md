### 10. Popconfirm 气泡确认框
- **用途**: 确认提示
- **特点**: 支持自定义确认操作

#### 详细用法
```vue
<template>
  <div>
    <!-- 基础用法 -->
    <el-popconfirm
      title="这是一段内容确定删除吗？"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    >
      <template #reference>
        <el-button>删除</el-button>
      </template>
    </el-popconfirm>

    <!-- 自定义图标 -->
    <el-popconfirm
      title="这是一段内容确定删除吗？"
      confirm-button-text="确定"
      cancel-button-text="取消"
      icon="Warning"
      icon-color="#E6A23C"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    >
      <template #reference>
        <el-button>自定义图标</el-button>
      </template>
    </el-popconfirm>

    <!-- 不同位置 -->
    <el-popconfirm
      title="这是一段内容确定删除吗？"
      placement="top"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    >
      <template #reference>
        <el-button>上边</el-button>
      </template>
    </el-popconfirm>

    <el-popconfirm
      title="这是一段内容确定删除吗？"
      placement="bottom"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    >
      <template #reference>
        <el-button>下边</el-button>
      </template>
    </el-popconfirm>

    <el-popconfirm
      title="这是一段内容确定删除吗？"
      placement="left"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    >
      <template #reference>
        <el-button>左边</el-button>
      </template>
    </el-popconfirm>

    <el-popconfirm
      title="这是一段内容确定删除吗？"
      placement="right"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    >
      <template #reference>
        <el-button>右边</el-button>
      </template>
    </el-popconfirm>

    <!-- 自定义按钮文本 -->
    <el-popconfirm
      title="这是一段内容确定删除吗？"
      confirm-button-text="好的"
      cancel-button-text="算了"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    >
      <template #reference>
        <el-button>自定义按钮文本</el-button>
      </template>
    </el-popconfirm>

    <!-- 自定义按钮类型 -->
    <el-popconfirm
      title="这是一段内容确定删除吗？"
      confirm-button-type="danger"
      cancel-button-type="info"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    >
      <template #reference>
        <el-button>自定义按钮类型</el-button>
      </template>
    </el-popconfirm>

    <!-- 隐藏取消按钮 -->
    <el-popconfirm
      title="这是一段内容确定删除吗？"
      :show-cancel-button="false"
      @confirm="handleConfirm"
    >
      <template #reference>
        <el-button>隐藏取消按钮</el-button>
      </template>
    </el-popconfirm>

    <!-- 自定义内容 -->
    <el-popconfirm
      @confirm="handleConfirm"
      @cancel="handleCancel"
    >
      <template #reference>
        <el-button>自定义内容</el-button>
      </template>
      <template #default>
        <div>
          <p>这是一段自定义内容</p>
          <p>可以包含任何 HTML 元素</p>
          <el-icon><Warning /></el-icon>
          <span>警告信息</span>
        </div>
      </template>
    </el-popconfirm>

    <!-- 异步确认 -->
    <el-popconfirm
      title="这是一段内容确定删除吗？"
      @confirm="handleAsyncConfirm"
      @cancel="handleCancel"
    >
      <template #reference>
        <el-button>异步确认</el-button>
      </template>
    </el-popconfirm>

    <!-- 表单验证 -->
    <el-popconfirm
      title="确定要提交表单吗？"
      @confirm="handleFormSubmit"
      @cancel="handleCancel"
    >
      <template #reference>
        <el-button type="primary">提交表单</el-button>
      </template>
    </el-popconfirm>

    <!-- 批量操作 -->
    <el-popconfirm
      title="确定要批量删除选中的项目吗？"
      @confirm="handleBatchDelete"
      @cancel="handleCancel"
    >
      <template #reference>
        <el-button type="danger" :disabled="!hasSelection">批量删除</el-button>
      </template>
    </el-popconfirm>

    <!-- 自定义样式 -->
    <el-popconfirm
      title="这是一段内容确定删除吗？"
      popper-class="custom-popconfirm"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    >
      <template #reference>
        <el-button>自定义样式</el-button>
      </template>
    </el-popconfirm>

    <!-- 禁用状态 -->
    <el-popconfirm
      title="这是一段内容确定删除吗？"
      :disabled="true"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    >
      <template #reference>
        <el-button>禁用状态</el-button>
      </template>
    </el-popconfirm>

    <!-- 手动控制 -->
    <el-popconfirm
      title="这是一段内容确定删除吗？"
      v-model:visible="visible"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    >
      <template #reference>
        <el-button @click="visible = !visible">手动控制</el-button>
      </template>
    </el-popconfirm>

    <!-- 延迟显示 -->
    <el-popconfirm
      title="这是一段内容确定删除吗？"
      :show-after="1000"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    >
      <template #reference>
        <el-button>延迟显示</el-button>
      </template>
    </el-popconfirm>

    <!-- 不同尺寸 -->
    <el-popconfirm
      title="这是一段内容确定删除吗？"
      size="large"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    >
      <template #reference>
        <el-button size="large">大尺寸</el-button>
      </template>
    </el-popconfirm>

    <el-popconfirm
      title="这是一段内容确定删除吗？"
      size="small"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    >
      <template #reference>
        <el-button size="small">小尺寸</el-button>
      </template>
    </el-popconfirm>

    <!-- 表格行操作 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180" />
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column prop="address" label="地址" />
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-popconfirm
            title="确定要删除这条记录吗？"
            @confirm="handleDeleteRow(scope.$index, scope.row)"
            @cancel="handleCancel"
          >
            <template #reference>
              <el-button size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- 多个 Popconfirm -->
    <el-popconfirm
      title="第一个确认框"
      @confirm="handleConfirm1"
      @cancel="handleCancel"
    >
      <template #reference>
        <el-button>确认框 1</el-button>
      </template>
    </el-popconfirm>

    <el-popconfirm
      title="第二个确认框"
      @confirm="handleConfirm2"
      @cancel="handleCancel"
    >
      <template #reference>
        <el-button>确认框 2</el-button>
      </template>
    </el-popconfirm>

    <!-- 响应式 Popconfirm -->
    <el-popconfirm
      title="响应式确认框"
      popper-class="responsive-popconfirm"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    >
      <template #reference>
        <el-button>响应式</el-button>
      </template>
    </el-popconfirm>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Warning } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const visible = ref(false)
const hasSelection = ref(true)

const tableData = ref([
  {
    date: '2023-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2023-05-02',
    name: 'Jerry',
    address: 'No. 190, Grove St, Los Angeles'
  },
  {
    date: '2023-05-01',
    name: 'Spike',
    address: 'No. 191, Grove St, Los Angeles'
  }
])

const handleConfirm = () => {
  ElMessage.success('确认操作成功!')
}

const handleCancel = () => {
  ElMessage.info('取消操作')
}

const handleAsyncConfirm = () => {
  ElMessage.info('正在处理...')
  setTimeout(() => {
    ElMessage.success('异步操作完成!')
  }, 2000)
}

const handleFormSubmit = () => {
  ElMessage.success('表单提交成功!')
}

const handleBatchDelete = () => {
  ElMessage.success('批量删除成功!')
}

const handleDeleteRow = (index, row) => {
  tableData.value.splice(index, 1)
  ElMessage.success(`删除 ${row.name} 成功!`)
}

const handleConfirm1 = () => {
  ElMessage.success('第一个确认框操作成功!')
}

const handleConfirm2 = () => {
  ElMessage.success('第二个确认框操作成功!')
}
</script>

<style scoped>
.custom-popconfirm {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
}

.custom-popconfirm .el-popconfirm__main {
  color: white;
}

.custom-popconfirm .el-popconfirm__action {
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

/* 响应式 Popconfirm */
@media (max-width: 768px) {
  .responsive-popconfirm {
    max-width: 250px;
    font-size: 12px;
  }
}
</style>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| title | 标题 | string | — | — |
| confirm-button-text | 确认按钮文字 | string | — | 确定 |
| cancel-button-text | 取消按钮文字 | string | — | 取消 |
| confirm-button-type | 确认按钮类型 | string | primary / success / warning / danger / info | primary |
| cancel-button-type | 取消按钮类型 | string | primary / success / warning / danger / info | info |
| icon | 图标 | string / Component | — | Warning |
| icon-color | 图标颜色 | string | — | #E6A23C |
| hide-icon | 是否隐藏图标 | boolean | — | false |
| placement | 出现位置 | string | top / top-start / top-end / bottom / bottom-start / bottom-end / left / left-start / left-end / right / right-start / right-end | top |
| visible / v-model:visible | 是否显示 Popconfirm | boolean | — | false |
| disabled | Popconfirm 是否可用 | boolean | — | false |
| width | 宽度 | string / number | — | 150 |
| offset | 出现位置的偏移量 | number | — | 0 |
| transition | 定义渐变动画 | string | — | el-fade-in-linear |
| popper-options | popper.js 参数 | object | — | {} |
| popper-class | 为 popper 添加类名 | string | — | — |
| popper-style | 为 popper 添加样式 | object | — | {} |
| show-arrow | 是否显示箭头 | boolean | — | true |
| hide-after | 延迟出现，单位毫秒 | number | — | 0 |
| auto-close | 是否自动关闭 | number | — | 0 |
| show-after | 延迟出现，单位毫秒 | number | — | 0 |
| enterable | 鼠标是否可进入到 popconfirm 中 | boolean | — | true |
| tabindex | Popconfirm 组件的 tabindex | number | — | 0 |
| teleported | 是否将 popconfirm 的下拉列表插入至 body 元素 | boolean | — | true |
| trigger | 触发方式 | string | hover / click / focus / manual | click |
| persistent | 当 popconfirm 组件被触发时，是否在点击窗口其他部分后关闭 popconfirm | boolean | — | true |
| show-cancel-button | 是否显示取消按钮 | boolean | — | true |
| size | 尺寸 | string | large / default / small | default |

#### 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| confirm | 点击确认按钮时触发 | — |
| cancel | 点击取消按钮时触发 | — |
| show | 显示时触发 | — |
| hide | 隐藏时触发 | — |

#### 插槽
| 插槽名 | 说明 |
|--------|------|
| — | 触发 Popconfirm 显示的 HTML 元素 |
| default | 自定义内容 |

#### 使用示例
```vue
<!-- 基础用法 -->
<el-popconfirm
  title="这是一段内容确定删除吗？"
  @confirm="handleConfirm"
  @cancel="handleCancel"
>
  <template #reference>
    <el-button>删除</el-button>
  </template>
</el-popconfirm>

<!-- 自定义图标 -->
<el-popconfirm
  title="这是一段内容确定删除吗？"
  confirm-button-text="确定"
  cancel-button-text="取消"
  icon="Warning"
  icon-color="#E6A23C"
  @confirm="handleConfirm"
  @cancel="handleCancel"
>
  <template #reference>
    <el-button>自定义图标</el-button>
  </template>
</el-popconfirm>

<!-- 不同位置 -->
<el-popconfirm
  title="这是一段内容确定删除吗？"
  placement="top"
  @confirm="handleConfirm"
  @cancel="handleCancel"
>
  <template #reference>
    <el-button>上边</el-button>
  </template>
</el-popconfirm>

<el-popconfirm
  title="这是一段内容确定删除吗？"
  placement="bottom"
  @confirm="handleConfirm"
  @cancel="handleCancel"
>
  <template #reference>
    <el-button>下边</el-button>
  </template>
</el-popconfirm>

<el-popconfirm
  title="这是一段内容确定删除吗？"
  placement="left"
  @confirm="handleConfirm"
  @cancel="handleCancel"
>
  <template #reference>
    <el-button>左边</el-button>
  </template>
</el-popconfirm>

<el-popconfirm
  title="这是一段内容确定删除吗？"
  placement="right"
  @confirm="handleConfirm"
  @cancel="handleCancel"
>
  <template #reference>
    <el-button>右边</el-button>
  </template>
</el-popconfirm>

<!-- 自定义按钮文本 -->
<el-popconfirm
  title="这是一段内容确定删除吗？"
  confirm-button-text="好的"
  cancel-button-text="算了"
  @confirm="handleConfirm"
  @cancel="handleCancel"
>
  <template #reference>
    <el-button>自定义按钮文本</el-button>
  </template>
</el-popconfirm>

<!-- 自定义按钮类型 -->
<el-popconfirm
  title="这是一段内容确定删除吗？"
  confirm-button-type="danger"
  cancel-button-type="info"
  @confirm="handleConfirm"
  @cancel="handleCancel"
>
  <template #reference>
    <el-button>自定义按钮类型</el-button>
  </template>
</el-popconfirm>

<!-- 隐藏取消按钮 -->
<el-popconfirm
  title="这是一段内容确定删除吗？"
  :show-cancel-button="false"
  @confirm="handleConfirm"
>
  <template #reference>
    <el-button>隐藏取消按钮</el-button>
  </template>
</el-popconfirm>

<!-- 自定义内容 -->
<el-popconfirm
  @confirm="handleConfirm"
  @cancel="handleCancel"
>
  <template #reference>
    <el-button>自定义内容</el-button>
  </template>
  <template #default>
    <div>
      <p>这是一段自定义内容</p>
      <p>可以包含任何 HTML 元素</p>
      <el-icon><Warning /></el-icon>
      <span>警告信息</span>
    </div>
  </template>
</el-popconfirm>

<!-- 异步确认 -->
<el-popconfirm
  title="这是一段内容确定删除吗？"
  @confirm="handleAsyncConfirm"
  @cancel="handleCancel"
>
  <template #reference>
    <el-button>异步确认</el-button>
  </template>
</el-popconfirm>

<!-- 表单验证 -->
<el-popconfirm
  title="确定要提交表单吗？"
  @confirm="handleFormSubmit"
  @cancel="handleCancel"
>
  <template #reference>
    <el-button type="primary">提交表单</el-button>
  </template>
</el-popconfirm>

<!-- 批量操作 -->
<el-popconfirm
  title="确定要批量删除选中的项目吗？"
  @confirm="handleBatchDelete"
  @cancel="handleCancel"
>
  <template #reference>
    <el-button type="danger" :disabled="!hasSelection">批量删除</el-button>
  </template>
</el-popconfirm>

<!-- 自定义样式 -->
<el-popconfirm
  title="这是一段内容确定删除吗？"
  popper-class="custom-popconfirm"
  @confirm="handleConfirm"
  @cancel="handleCancel"
>
  <template #reference>
    <el-button>自定义样式</el-button>
  </template>
</el-popconfirm>

<!-- 禁用状态 -->
<el-popconfirm
  title="这是一段内容确定删除吗？"
  :disabled="true"
  @confirm="handleConfirm"
  @cancel="handleCancel"
>
  <template #reference>
    <el-button>禁用状态</el-button>
  </template>
</el-popconfirm>

<!-- 手动控制 -->
<el-popconfirm
  title="这是一段内容确定删除吗？"
  v-model:visible="visible"
  @confirm="handleConfirm"
  @cancel="handleCancel"
>
  <template #reference>
    <el-button @click="visible = !visible">手动控制</el-button>
  </template>
</el-popconfirm>

<!-- 延迟显示 -->
<el-popconfirm
  title="这是一段内容确定删除吗？"
  :show-after="1000"
  @confirm="handleConfirm"
  @cancel="handleCancel"
>
  <template #reference>
    <el-button>延迟显示</el-button>
  </template>
</el-popconfirm>

<!-- 不同尺寸 -->
<el-popconfirm
  title="这是一段内容确定删除吗？"
  size="large"
  @confirm="handleConfirm"
  @cancel="handleCancel"
>
  <template #reference>
    <el-button size="large">大尺寸</el-button>
  </template>
</el-popconfirm>

<el-popconfirm
  title="这是一段内容确定删除吗？"
  size="small"
  @confirm="handleConfirm"
  @cancel="handleCancel"
>
  <template #reference>
    <el-button size="small">小尺寸</el-button>
  </template>
</el-popconfirm>

<!-- 表格行操作 -->
<el-table :data="tableData" style="width: 100%">
  <el-table-column prop="date" label="日期" width="180" />
  <el-table-column prop="name" label="姓名" width="180" />
  <el-table-column prop="address" label="地址" />
  <el-table-column label="操作" width="200">
    <template #default="scope">
      <el-popconfirm
        title="确定要删除这条记录吗？"
        @confirm="handleDeleteRow(scope.$index, scope.row)"
        @cancel="handleCancel"
      >
        <template #reference>
          <el-button size="small" type="danger">删除</el-button>
        </template>
      </el-popconfirm>
    </template>
  </el-table-column>
</el-table>
```

#### 样式定制
```css
/* 自定义 Popconfirm 样式 */
.custom-popconfirm {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.custom-popconfirm .el-popconfirm__main {
  color: white;
  line-height: 1.6;
  font-size: 14px;
}

.custom-popconfirm .el-popconfirm__action {
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding: 10px 20px;
}

.custom-popconfirm .el-popconfirm__arrow {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* 响应式 Popconfirm */
@media (max-width: 768px) {
  .responsive-popconfirm {
    max-width: 250px;
    font-size: 12px;
  }
  
  .el-popconfirm {
    font-size: 12px;
  }
  
  .el-popconfirm__main {
    padding: 10px 15px;
  }
  
  .el-popconfirm__action {
    padding: 8px 15px;
  }
}
```

#### 使用场景
1. **删除确认**: 删除操作前的确认提示
2. **表单提交**: 表单提交前的确认
3. **批量操作**: 批量删除、批量修改等操作确认
4. **重要操作**: 重要操作前的确认提示
5. **数据修改**: 数据修改前的确认
6. **权限操作**: 需要权限的操作确认

#### 注意事项
1. **触发方式**: 默认使用 click 触发，适合确认操作
2. **位置选择**: 根据页面布局选择合适的显示位置
3. **按钮文案**: 使用清晰的按钮文案，让用户明确操作结果
4. **异步操作**: 在异步操作中合理使用确认框
5. **响应式设计**: 在移动端考虑确认框的显示效果
6. **可访问性**: 确保确认框对键盘导航和屏幕阅读器友好
7. **用户体验**: 避免过度使用确认框，影响用户体验
8. **图标选择**: 根据操作类型选择合适的图标和颜色 