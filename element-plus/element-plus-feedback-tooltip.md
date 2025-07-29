### 9. Tooltip 文字提示
- **用途**: 文字提示
- **特点**: 支持多种位置、自定义内容

#### 详细用法
```vue
<template>
  <div>
    <!-- 基础用法 -->
    <el-tooltip content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
      <el-button>hover 激活</el-button>
    </el-tooltip>

    <!-- 不同位置 -->
    <el-tooltip content="上左" placement="top-start">
      <el-button>上左</el-button>
    </el-tooltip>

    <el-tooltip content="上边" placement="top">
      <el-button>上边</el-button>
    </el-tooltip>

    <el-tooltip content="上右" placement="top-end">
      <el-button>上右</el-button>
    </el-tooltip>

    <el-tooltip content="左上" placement="left-start">
      <el-button>左上</el-button>
    </el-tooltip>

    <el-tooltip content="左边" placement="left">
      <el-button>左边</el-button>
    </el-tooltip>

    <el-tooltip content="左下" placement="left-end">
      <el-button>左下</el-button>
    </el-tooltip>

    <el-tooltip content="右上" placement="right-start">
      <el-button>右上</el-button>
    </el-tooltip>

    <el-tooltip content="右边" placement="right">
      <el-button>右边</el-button>
    </el-tooltip>

    <el-tooltip content="右下" placement="right-end">
      <el-button>右下</el-button>
    </el-tooltip>

    <el-tooltip content="下左" placement="bottom-start">
      <el-button>下左</el-button>
    </el-tooltip>

    <el-tooltip content="下边" placement="bottom">
      <el-button>下边</el-button>
    </el-tooltip>

    <el-tooltip content="下右" placement="bottom-end">
      <el-button>下右</el-button>
    </el-tooltip>

    <!-- 不同主题 -->
    <el-tooltip content="默认主题" placement="top">
      <el-button>默认主题</el-button>
    </el-tooltip>

    <el-tooltip content="深色主题" placement="top" effect="dark">
      <el-button>深色主题</el-button>
    </el-tooltip>

    <el-tooltip content="浅色主题" placement="top" effect="light">
      <el-button>浅色主题</el-button>
    </el-tooltip>

    <!-- 自定义内容 -->
    <el-tooltip placement="top">
      <template #content>
        <div>
          <p>这是一段内容,这是一段内容,这是一段内容,这是一段内容。</p>
          <p>这是一段内容,这是一段内容,这是一段内容,这是一段内容。</p>
        </div>
      </template>
      <el-button>自定义内容</el-button>
    </el-tooltip>

    <!-- 带图标 -->
    <el-tooltip content="带图标的提示" placement="top">
      <el-button>
        <el-icon><InfoFilled /></el-icon>
        带图标
      </el-button>
    </el-tooltip>

    <!-- 禁用状态 -->
    <el-tooltip content="禁用状态" placement="top" :disabled="true">
      <el-button>禁用状态</el-button>
    </el-tooltip>

    <!-- 手动控制 -->
    <el-tooltip content="手动控制" placement="top" v-model:visible="visible">
      <el-button @click="visible = !visible">手动控制</el-button>
    </el-tooltip>

    <!-- 延迟显示 -->
    <el-tooltip content="延迟显示" placement="top" :show-after="1000">
      <el-button>延迟显示</el-button>
    </el-tooltip>

    <!-- 延迟隐藏 -->
    <el-tooltip content="延迟隐藏" placement="top" :hide-after="2000">
      <el-button>延迟隐藏</el-button>
    </el-tooltip>

    <!-- 自定义样式 -->
    <el-tooltip content="自定义样式" placement="top" popper-class="custom-tooltip">
      <el-button>自定义样式</el-button>
    </el-tooltip>

    <!-- 箭头样式 -->
    <el-tooltip content="箭头样式" placement="top" :show-arrow="true">
      <el-button>显示箭头</el-button>
    </el-tooltip>

    <el-tooltip content="箭头样式" placement="top" :show-arrow="false">
      <el-button>隐藏箭头</el-button>
    </el-tooltip>

    <!-- 偏移量 -->
    <el-tooltip content="偏移量" placement="top" :offset="20">
      <el-button>偏移量</el-button>
    </el-tooltip>

    <!-- 进入动画 -->
    <el-tooltip content="进入动画" placement="top" transition="el-fade-in-linear">
      <el-button>进入动画</el-button>
    </el-tooltip>

    <!-- 多个 Tooltip -->
    <el-tooltip content="第一个 Tooltip" placement="top">
      <el-button>Tooltip 1</el-button>
    </el-tooltip>

    <el-tooltip content="第二个 Tooltip" placement="top">
      <el-button>Tooltip 2</el-button>
    </el-tooltip>

    <!-- 响应式 Tooltip -->
    <el-tooltip content="响应式 Tooltip" placement="top" popper-class="responsive-tooltip">
      <el-button>响应式</el-button>
    </el-tooltip>

    <!-- 长文本 -->
    <el-tooltip 
      content="这是一段很长的文本内容，用来测试 Tooltip 组件在长文本情况下的显示效果。这是一段很长的文本内容，用来测试 Tooltip 组件在长文本情况下的显示效果。" 
      placement="top"
      :max-width="300"
    >
      <el-button>长文本</el-button>
    </el-tooltip>

    <!-- HTML 内容 -->
    <el-tooltip placement="top" :raw-content="true">
      <template #content>
        <div>
          <strong>HTML 内容</strong>
          <br>
          <span style="color: #409eff;">这是带样式的文本</span>
          <br>
          <el-icon><SuccessFilled /></el-icon>
          <span>带图标的文本</span>
        </div>
      </template>
      <el-button>HTML 内容</el-button>
    </el-tooltip>

    <!-- 表单验证提示 -->
    <el-tooltip content="请输入有效的邮箱地址" placement="top" effect="dark">
      <el-input placeholder="邮箱" style="width: 200px;" />
    </el-tooltip>

    <!-- 按钮组提示 -->
    <el-button-group>
      <el-tooltip content="新建" placement="top">
        <el-button :icon="Plus" />
      </el-tooltip>
      <el-tooltip content="编辑" placement="top">
        <el-button :icon="Edit" />
      </el-tooltip>
      <el-tooltip content="删除" placement="top">
        <el-button :icon="Delete" />
      </el-tooltip>
    </el-button-group>

    <!-- 表格行提示 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180" />
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column prop="address" label="地址">
        <template #default="scope">
          <el-tooltip :content="scope.row.address" placement="top">
            <span>{{ scope.row.address.substring(0, 20) }}...</span>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { InfoFilled, SuccessFilled, Plus, Edit, Delete } from '@element-plus/icons-vue'

const visible = ref(false)

const tableData = ref([
  {
    date: '2023-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles, CA 90036, United States'
  },
  {
    date: '2023-05-02',
    name: 'Jerry',
    address: 'No. 190, Grove St, Los Angeles, CA 90036, United States'
  },
  {
    date: '2023-05-01',
    name: 'Spike',
    address: 'No. 191, Grove St, Los Angeles, CA 90036, United States'
  }
])
</script>

<style scoped>
.custom-tooltip {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
}

.custom-tooltip .el-tooltip__content {
  color: white;
}

/* 响应式 Tooltip */
@media (max-width: 768px) {
  .responsive-tooltip {
    max-width: 200px;
    font-size: 12px;
  }
}
</style>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| effect | 默认提供的主题 | string | dark / light | dark |
| content | 显示的内容，也可以通过 slot#content 传入 DOM | string | — | — |
| raw-content | 是否将 content 属性作为 HTML 字符串处理 | boolean | — | false |
| placement | Tooltip 的出现位置 | string | top / top-start / top-end / bottom / bottom-start / bottom-end / left / left-start / left-end / right / right-start / right-end | bottom |
| visible / v-model:visible | 是否显示 Tooltip | boolean | — | false |
| disabled | Tooltip 是否可用 | boolean | — | false |
| offset | 出现位置的偏移量 | number | — | 0 |
| transition | 定义渐变动画 | string | — | el-fade-in-linear |
| popper-options | popper.js 参数 | object | — | {} |
| popper-class | 为 popper 添加类名 | string | — | — |
| popper-style | 为 popper 添加样式 | object | — | {} |
| show-after | 延迟出现，单位毫秒 | number | — | 0 |
| hide-after | 延迟隐藏，单位毫秒 | number | — | 200 |
| auto-close | 是否自动关闭 | number | — | 0 |
| show-arrow | 是否显示箭头 | boolean | — | true |
| persistent | 当 tooltip 组件被触发时，是否在点击窗口其他部分后关闭 tooltip | boolean | — | true |
| enterable | 鼠标是否可进入到 tooltip 中 | boolean | — | true |
| tabindex | Tooltip 组件的 tabindex | number | — | 0 |
| teleported | 是否将 tooltip 的下拉列表插入至 body 元素 | boolean | — | true |
| trigger | 触发方式 | string | hover / click / focus / manual | hover |
| virtual-triggering | 虚拟触发 | boolean | — | false |
| virtual-ref | 虚拟触发的引用元素 | HTMLElement | — | — |
| gpu-acceleration | 是否启用 GPU 加速 | boolean | — | true |
| fallback-placements | 当 placement 为 auto 时，popper.js 将尝试的 placement 列表 | string[] | — | — |
| hide-after | 延迟隐藏，单位毫秒 | number | — | 200 |
| max-width | 最大宽度 | string / number | — | — |

#### 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| show | 显示时触发 | — |
| hide | 隐藏时触发 | — |
| before-show | 显示前触发 | — |
| before-hide | 隐藏前触发 | — |

#### 插槽
| 插槽名 | 说明 |
|--------|------|
| — | 触发 Tooltip 显示的 HTML 元素 |
| content | 自定义内容 |

#### 使用示例
```vue
<!-- 基础用法 -->
<el-tooltip content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
  <el-button>hover 激活</el-button>
</el-tooltip>

<!-- 不同位置 -->
<el-tooltip content="上左" placement="top-start">
  <el-button>上左</el-button>
</el-tooltip>

<el-tooltip content="上边" placement="top">
  <el-button>上边</el-button>
</el-tooltip>

<el-tooltip content="上右" placement="top-end">
  <el-button>上右</el-button>
</el-tooltip>

<!-- 不同主题 -->
<el-tooltip content="默认主题" placement="top">
  <el-button>默认主题</el-button>
</el-tooltip>

<el-tooltip content="深色主题" placement="top" effect="dark">
  <el-button>深色主题</el-button>
</el-tooltip>

<el-tooltip content="浅色主题" placement="top" effect="light">
  <el-button>浅色主题</el-button>
</el-tooltip>

<!-- 自定义内容 -->
<el-tooltip placement="top">
  <template #content>
    <div>
      <p>这是一段内容,这是一段内容,这是一段内容,这是一段内容。</p>
      <p>这是一段内容,这是一段内容,这是一段内容,这是一段内容。</p>
    </div>
  </template>
  <el-button>自定义内容</el-button>
</el-tooltip>

<!-- 带图标 -->
<el-tooltip content="带图标的提示" placement="top">
  <el-button>
    <el-icon><InfoFilled /></el-icon>
    带图标
  </el-button>
</el-tooltip>

<!-- 禁用状态 -->
<el-tooltip content="禁用状态" placement="top" :disabled="true">
  <el-button>禁用状态</el-button>
</el-tooltip>

<!-- 手动控制 -->
<el-tooltip content="手动控制" placement="top" v-model:visible="visible">
  <el-button @click="visible = !visible">手动控制</el-button>
</el-tooltip>

<!-- 延迟显示 -->
<el-tooltip content="延迟显示" placement="top" :show-after="1000">
  <el-button>延迟显示</el-button>
</el-tooltip>

<!-- 延迟隐藏 -->
<el-tooltip content="延迟隐藏" placement="top" :hide-after="2000">
  <el-button>延迟隐藏</el-button>
</el-tooltip>

<!-- 自定义样式 -->
<el-tooltip content="自定义样式" placement="top" popper-class="custom-tooltip">
  <el-button>自定义样式</el-button>
</el-tooltip>

<!-- 箭头样式 -->
<el-tooltip content="箭头样式" placement="top" :show-arrow="true">
  <el-button>显示箭头</el-button>
</el-tooltip>

<el-tooltip content="箭头样式" placement="top" :show-arrow="false">
  <el-button>隐藏箭头</el-button>
</el-tooltip>

<!-- 偏移量 -->
<el-tooltip content="偏移量" placement="top" :offset="20">
  <el-button>偏移量</el-button>
</el-tooltip>

<!-- 进入动画 -->
<el-tooltip content="进入动画" placement="top" transition="el-fade-in-linear">
  <el-button>进入动画</el-button>
</el-tooltip>

<!-- 长文本 -->
<el-tooltip 
  content="这是一段很长的文本内容，用来测试 Tooltip 组件在长文本情况下的显示效果。这是一段很长的文本内容，用来测试 Tooltip 组件在长文本情况下的显示效果。" 
  placement="top"
  :max-width="300"
>
  <el-button>长文本</el-button>
</el-tooltip>

<!-- HTML 内容 -->
<el-tooltip placement="top" :raw-content="true">
  <template #content>
    <div>
      <strong>HTML 内容</strong>
      <br>
      <span style="color: #409eff;">这是带样式的文本</span>
      <br>
      <el-icon><SuccessFilled /></el-icon>
      <span>带图标的文本</span>
    </div>
  </template>
  <el-button>HTML 内容</el-button>
</el-tooltip>

<!-- 表单验证提示 -->
<el-tooltip content="请输入有效的邮箱地址" placement="top" effect="dark">
  <el-input placeholder="邮箱" style="width: 200px;" />
</el-tooltip>

<!-- 按钮组提示 -->
<el-button-group>
  <el-tooltip content="新建" placement="top">
    <el-button :icon="Plus" />
  </el-tooltip>
  <el-tooltip content="编辑" placement="top">
    <el-button :icon="Edit" />
  </el-tooltip>
  <el-tooltip content="删除" placement="top">
    <el-button :icon="Delete" />
  </el-tooltip>
</el-button-group>

<!-- 表格行提示 -->
<el-table :data="tableData" style="width: 100%">
  <el-table-column prop="date" label="日期" width="180" />
  <el-table-column prop="name" label="姓名" width="180" />
  <el-table-column prop="address" label="地址">
    <template #default="scope">
      <el-tooltip :content="scope.row.address" placement="top">
        <span>{{ scope.row.address.substring(0, 20) }}...</span>
      </el-tooltip>
    </template>
  </el-table-column>
</el-table>
```

#### 样式定制
```css
/* 自定义 Tooltip 样式 */
.custom-tooltip {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.custom-tooltip .el-tooltip__content {
  color: white;
  line-height: 1.6;
  font-size: 14px;
}

.custom-tooltip .el-tooltip__arrow {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* 响应式 Tooltip */
@media (max-width: 768px) {
  .responsive-tooltip {
    max-width: 200px;
    font-size: 12px;
  }
  
  .el-tooltip {
    font-size: 12px;
  }
  
  .el-tooltip__content {
    padding: 8px 12px;
  }
}

/* 深色主题 */
.el-tooltip--dark {
  background-color: #303133;
  color: #fff;
}

/* 浅色主题 */
.el-tooltip--light {
  background-color: #fff;
  color: #303133;
  border: 1px solid #ebeef5;
}
```

#### 使用场景
1. **按钮提示**: 为按钮提供操作说明
2. **图标提示**: 为图标提供功能说明
3. **表单验证**: 显示表单验证错误信息
4. **文本截断**: 为截断的文本显示完整内容
5. **帮助说明**: 提供帮助信息或使用说明
6. **状态提示**: 显示元素的状态信息

#### 注意事项
1. **触发方式**: 默认使用 hover 触发，适合大多数场景
2. **位置选择**: 根据内容长度和页面布局选择合适的显示位置
3. **内容长度**: 避免内容过长，影响用户体验
4. **响应式设计**: 在移动端考虑 Tooltip 的显示效果
5. **性能优化**: 避免在 Tooltip 中放置过多内容
6. **可访问性**: 确保 Tooltip 对键盘导航和屏幕阅读器友好
7. **延迟设置**: 合理使用延迟显示和隐藏，提升用户体验
8. **HTML 内容**: 使用 `raw-content` 属性可以渲染 HTML 内容，但要注意 XSS 风险 