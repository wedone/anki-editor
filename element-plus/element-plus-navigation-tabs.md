### 2. Tabs 标签页
- **用途**: 标签页切换
- **特点**: 支持多种标签页样式

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
    <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
    <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
  </el-tabs>

  <!-- 卡片化标签页 -->
  <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
    <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
    <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
    <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
  </el-tabs>

  <!-- 边框卡片标签页 -->
  <el-tabs v-model="activeName3" type="border-card">
    <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
    <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
    <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
  </el-tabs>

  <!-- 自定义标签页 -->
  <el-tabs v-model="activeName4" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane name="first">
      <template #label>
        <span class="custom-tabs-label">
          <el-icon><Calendar /></el-icon>
          <span>我的行程</span>
        </span>
      </template>
      我的行程
    </el-tab-pane>
    <el-tab-pane name="second">
      <template #label>
        <span class="custom-tabs-label">
          <el-icon><Date /></el-icon>
          <span>我的消息</span>
        </span>
      </template>
      我的消息
    </el-tab-pane>
    <el-tab-pane name="third">
      <template #label>
        <span class="custom-tabs-label">
          <el-icon><Document /></el-icon>
          <span>我的文档</span>
        </span>
      </template>
      我的文档
    </el-tab-pane>
  </el-tabs>

  <!-- 可关闭的标签页 -->
  <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
    <el-tab-pane
      v-for="item in editableTabs"
      :key="item.name"
      :label="item.title"
      :name="item.name"
    >
      {{ item.content }}
    </el-tab-pane>
  </el-tabs>

  <!-- 动态添加标签页 -->
  <el-button size="small" @click="addTab(editableTabsValue)">
    add tab
  </el-button>

  <!-- 标签页位置 -->
  <el-tabs v-model="activeName5" tab-position="left" style="height: 200px">
    <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
    <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
    <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
  </el-tabs>

  <!-- 懒加载标签页 -->
  <el-tabs v-model="activeName6" type="border-card">
    <el-tab-pane label="用户管理" name="first" lazy>
      <el-table :data="tableData">
        <el-table-column prop="date" label="日期" width="180" />
        <el-table-column prop="name" label="姓名" width="180" />
        <el-table-column prop="address" label="地址" />
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="配置管理" name="second" lazy>
      <el-form :model="form" label-width="120px">
        <el-form-item label="活动名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>

  <!-- 带徽章的标签页 -->
  <el-tabs v-model="activeName7" type="card">
    <el-tab-pane name="first">
      <template #label>
        用户管理
        <el-badge value="3" class="item" />
      </template>
      用户管理
    </el-tab-pane>
    <el-tab-pane name="second">
      <template #label>
        配置管理
        <el-badge value="99+" class="item" />
      </template>
      配置管理
    </el-tab-pane>
    <el-tab-pane name="third">
      <template #label>
        角色管理
        <el-badge value="new" class="item" />
      </template>
      角色管理
    </el-tab-pane>
  </el-tabs>

  <!-- 响应式标签页 -->
  <el-tabs v-model="activeName8" class="responsive-tabs">
    <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
    <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
    <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
  </el-tabs>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Calendar, Date, Document } from '@element-plus/icons-vue'

const activeName = ref('first')
const activeName2 = ref('first')
const activeName3 = ref('first')
const activeName4 = ref('first')
const activeName5 = ref('first')
const activeName6 = ref('first')
const activeName7 = ref('first')
const activeName8 = ref('first')

const handleClick = (tab, event) => {
  console.log(tab, event)
}

// 可关闭的标签页
const editableTabsValue = ref('2')
const editableTabs = ref([
  {
    title: 'Tab 1',
    name: '1',
    content: 'Tab 1 content'
  },
  {
    title: 'Tab 2',
    name: '2',
    content: 'Tab 2 content'
  }
])

const tabIndex = ref(2)

const addTab = (targetName) => {
  const newTabName = ++tabIndex.value + ''
  editableTabs.value.push({
    title: 'New Tab',
    name: newTabName,
    content: 'New Tab content'
  })
  editableTabsValue.value = newTabName
}

const removeTab = (targetName) => {
  const tabs = editableTabs.value
  let activeName = editableTabsValue.value
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.name === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          activeName = nextTab.name
        }
      }
    })
  }
  editableTabsValue.value = activeName
  editableTabs.value = tabs.filter(tab => tab.name !== targetName)
}

// 懒加载数据
const tableData = ref([
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
])

const form = reactive({
  name: '',
  region: ''
})
</script>

<style scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.custom-tabs-label {
  display: flex;
  align-items: center;
  gap: 8px;
}

.item {
  margin-top: 10px;
  margin-right: 40px;
}

.responsive-tabs {
  max-width: 100%;
}

@media (max-width: 768px) {
  .responsive-tabs .el-tabs__header {
    flex-wrap: wrap;
  }
  
  .responsive-tabs .el-tabs__item {
    flex: 1;
    min-width: 0;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
</style>

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| model-value / v-model | 绑定值，选中标签的 name | string | — | 第一个标签的 name |
| type | 风格类型 | string | card / border-card | — |
| closable | 标签是否可关闭 | boolean | — | false |
| addable | 标签是否可增加 | boolean | — | false |
| editable | 标签是否同时可增加和关闭 | boolean | — | false |
| tab-position | 选项卡所在位置 | string | top / right / bottom / left | top |
| stretch | 标签的宽度是否自撑开 | boolean | — | false |
| before-leave | 切换标签之前的钩子，若返回 false 或者返回 Promise 且被 reject，则阻止切换。 | function(activeName, oldActiveName) | — | — |
| lazy | 标签是否延迟渲染 | boolean | — | false |

#### 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| tab-click | tab 被选中时触发 | (pane: object, event: Event) |
| tab-remove | 点击 tab 移除按钮后触发 | (name: string) |
| tab-add | 点击 tabs 的新增按钮后触发 | — |
| edit | 点击 tabs 的新增或删除按钮后触发 | (targetName: string, action: 'remove' \| 'add') |

#### Tab Pane 属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| label | 选项卡标题 | string | — | — |
| disabled | 是否禁用 | boolean | — | false |
| name | 与选项卡绑定值 value 对应的标识符，表示选项卡别名 | string | — | 该选项卡在选项卡列表中的顺序值，如第一个选项卡则为 '1' |
| closable | 标签是否可关闭 | boolean | — | false |
| lazy | 标签是否延迟渲染 | boolean | — | false |

#### 插槽
| 插槽名 | 说明 |
|--------|------|
| — | Tab Pane 的内容 |
| label | 自定义标签页标题内容 |

#### 使用示例
```vue
<!-- 基础标签页 -->
<el-tabs v-model="activeName">
  <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
  <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
</el-tabs>

<!-- 卡片化标签页 -->
<el-tabs v-model="activeName" type="card">
  <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
  <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
</el-tabs>

<!-- 可关闭的标签页 -->
<el-tabs v-model="activeName" type="card" closable @tab-remove="removeTab">
  <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
  <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
</el-tabs>

<!-- 自定义标签页标题 -->
<el-tabs v-model="activeName">
  <el-tab-pane name="first">
    <template #label>
      <span class="custom-label">
        <el-icon><Calendar /></el-icon>
        用户管理
      </span>
    </template>
    用户管理
  </el-tab-pane>
</el-tabs>

<!-- 懒加载标签页 -->
<el-tabs v-model="activeName">
  <el-tab-pane label="用户管理" name="first" lazy>
    <el-table :data="tableData">
      <!-- 表格内容 -->
    </el-table>
  </el-tab-pane>
</el-tabs>
```

#### 样式定制
```css
/* 自定义标签页样式 */
.custom-tabs .el-tabs__header {
  background-color: #f5f7fa;
  border-radius: 4px;
}

.custom-tabs .el-tabs__item {
  border-radius: 4px;
  margin: 4px;
}

.custom-tabs .el-tabs__item.is-active {
  background-color: #409eff;
  color: white;
}

/* 响应式标签页 */
@media (max-width: 768px) {
  .el-tabs__header {
    flex-wrap: wrap;
  }
  
  .el-tabs__item {
    flex: 1;
    min-width: 0;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
```

#### 使用场景
1. **内容分类**: 将不同类型的内容分页展示
2. **表单分组**: 将复杂的表单分成多个步骤
3. **数据展示**: 展示不同类型的数据视图
4. **设置面板**: 系统设置的不同配置项
5. **文档结构**: 文档的不同章节或部分

#### 注意事项
1. **性能优化**: 使用 `lazy` 属性可以延迟渲染标签页内容
2. **动态标签页**: 可以通过数组动态生成标签页
3. **路由集成**: 可以将标签页与路由状态绑定
4. **响应式设计**: 考虑在不同屏幕尺寸下的显示效果
5. **可访问性**: 确保标签页对键盘导航和屏幕阅读器友好 