### 8. Popover 弹出框
- **用途**: 弹出提示
- **特点**: 支持多种触发方式

#### 详细用法
```vue
<template>
  <div>
    <!-- 基础用法 -->
    <el-popover
      placement="top"
      title="标题"
      :width="200"
      trigger="hover"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
    >
      <template #reference>
        <el-button>hover 激活</el-button>
      </template>
    </el-popover>

    <!-- 不同触发方式 -->
    <el-popover
      placement="top"
      title="标题"
      :width="200"
      trigger="click"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
    >
      <template #reference>
        <el-button>click 激活</el-button>
      </template>
    </el-popover>

    <el-popover
      placement="top"
      title="标题"
      :width="200"
      trigger="focus"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
    >
      <template #reference>
        <el-button>focus 激活</el-button>
      </template>
    </el-popover>

    <el-popover
      placement="top"
      title="标题"
      :width="200"
      trigger="manual"
      v-model:visible="visible"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
    >
      <template #reference>
        <el-button @click="visible = !visible">manual 激活</el-button>
      </template>
    </el-popover>

    <!-- 不同位置 -->
    <el-popover
      placement="top-start"
      title="标题"
      :width="200"
      trigger="hover"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
    >
      <template #reference>
        <el-button>上左</el-button>
      </template>
    </el-popover>

    <el-popover
      placement="top"
      title="标题"
      :width="200"
      trigger="hover"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
    >
      <template #reference>
        <el-button>上边</el-button>
      </template>
    </el-popover>

    <el-popover
      placement="top-end"
      title="标题"
      :width="200"
      trigger="hover"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
    >
      <template #reference>
        <el-button>上右</el-button>
      </template>
    </el-popover>

    <el-popover
      placement="left-start"
      title="标题"
      :width="200"
      trigger="hover"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
    >
      <template #reference>
        <el-button>左上</el-button>
      </template>
    </el-popover>

    <el-popover
      placement="left"
      title="标题"
      :width="200"
      trigger="hover"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
    >
      <template #reference>
        <el-button>左边</el-button>
      </template>
    </el-popover>

    <el-popover
      placement="left-end"
      title="标题"
      :width="200"
      trigger="hover"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
    >
      <template #reference>
        <el-button>左下</el-button>
      </template>
    </el-popover>

    <el-popover
      placement="right-start"
      title="标题"
      :width="200"
      trigger="hover"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
    >
      <template #reference>
        <el-button>右上</el-button>
      </template>
    </el-popover>

    <el-popover
      placement="right"
      title="标题"
      :width="200"
      trigger="hover"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
    >
      <template #reference>
        <el-button>右边</el-button>
      </template>
    </el-popover>

    <el-popover
      placement="right-end"
      title="标题"
      :width="200"
      trigger="hover"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
    >
      <template #reference>
        <el-button>右下</el-button>
      </template>
    </el-popover>

    <el-popover
      placement="bottom-start"
      title="标题"
      :width="200"
      trigger="hover"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
    >
      <template #reference>
        <el-button>下左</el-button>
      </template>
    </el-popover>

    <el-popover
      placement="bottom"
      title="标题"
      :width="200"
      trigger="hover"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
    >
      <template #reference>
        <el-button>下边</el-button>
      </template>
    </el-popover>

    <el-popover
      placement="bottom-end"
      title="标题"
      :width="200"
      trigger="hover"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
    >
      <template #reference>
        <el-button>下右</el-button>
      </template>
    </el-popover>

    <!-- 自定义内容 -->
    <el-popover
      placement="right"
      title="标题"
      :width="400"
      trigger="click"
    >
      <template #reference>
        <el-button>自定义内容</el-button>
      </template>
      <template #default>
        <div>
          <p>这是一段内容,这是一段内容,这是一段内容,这是一段内容。</p>
          <p>这是一段内容,这是一段内容,这是一段内容,这是一段内容。</p>
          <el-button size="small" type="primary">确定</el-button>
          <el-button size="small">取消</el-button>
        </div>
      </template>
    </el-popover>

    <!-- 嵌套内容 -->
    <el-popover
      placement="right"
      title="标题"
      :width="400"
      trigger="click"
    >
      <template #reference>
        <el-button>嵌套内容</el-button>
      </template>
      <template #default>
        <div>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="日期" width="180" />
            <el-table-column prop="name" label="姓名" width="180" />
            <el-table-column prop="address" label="地址" />
          </el-table>
        </div>
      </template>
    </el-popover>

    <!-- 表单内容 -->
    <el-popover
      placement="right"
      title="标题"
      :width="400"
      trigger="click"
    >
      <template #reference>
        <el-button>表单内容</el-button>
      </template>
      <template #default>
        <div>
          <el-form :model="form" label-width="80px">
            <el-form-item label="用户名">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="form.email" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">提交</el-button>
              <el-button @click="onCancel">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </template>
    </el-popover>

    <!-- 自定义样式 -->
    <el-popover
      placement="top"
      title="自定义样式"
      :width="200"
      trigger="hover"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
      popper-class="custom-popover"
    >
      <template #reference>
        <el-button>自定义样式</el-button>
      </template>
    </el-popover>

    <!-- 禁用状态 -->
    <el-popover
      placement="top"
      title="标题"
      :width="200"
      trigger="hover"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
      :disabled="true"
    >
      <template #reference>
        <el-button>禁用状态</el-button>
      </template>
    </el-popover>

    <!-- 带图标 -->
    <el-popover
      placement="top"
      title="标题"
      :width="200"
      trigger="hover"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
    >
      <template #reference>
        <el-button>
          <el-icon><InfoFilled /></el-icon>
          带图标
        </el-button>
      </template>
    </el-popover>

    <!-- 多个 Popover -->
    <el-popover
      placement="top"
      title="标题1"
      :width="200"
      trigger="hover"
      content="这是第一个 Popover 的内容。"
    >
      <template #reference>
        <el-button>Popover 1</el-button>
      </template>
    </el-popover>

    <el-popover
      placement="top"
      title="标题2"
      :width="200"
      trigger="hover"
      content="这是第二个 Popover 的内容。"
    >
      <template #reference>
        <el-button>Popover 2</el-button>
      </template>
    </el-popover>

    <!-- 响应式 Popover -->
    <el-popover
      placement="top"
      title="响应式 Popover"
      :width="200"
      trigger="hover"
      content="这是一个响应式的 Popover，在不同屏幕尺寸下会有不同的表现。"
      popper-class="responsive-popover"
    >
      <template #reference>
        <el-button>响应式</el-button>
      </template>
    </el-popover>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { InfoFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const visible = ref(false)

const tableData = ref([
  {
    date: '2023-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2023-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2023-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
])

const form = reactive({
  name: '',
  email: ''
})

const onSubmit = () => {
  ElMessage.success('提交成功!')
}

const onCancel = () => {
  form.name = ''
  form.email = ''
}
</script>

<style scoped>
.custom-popover {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
}

.custom-popover .el-popover__title {
  color: white;
  font-weight: bold;
}

.custom-popover .el-popover__content {
  color: rgba(255, 255, 255, 0.9);
}

/* 响应式 Popover */
@media (max-width: 768px) {
  .responsive-popover {
    width: 90% !important;
    max-width: 300px;
  }
}
</style>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| trigger | 触发方式 | string | click / focus / hover / manual | click |
| title | 标题 | string | — | — |
| content | 显示的内容，也可以通过 slot 传入 DOM | string | — | — |
| width | 宽度 | string / number | — | 150 |
| placement | 出现位置 | string | top / top-start / top-end / bottom / bottom-start / bottom-end / left / left-start / left-end / right / right-start / right-end | bottom |
| disabled | Popover 是否可用 | boolean | — | false |
| visible / v-model:visible | 是否显示 Popover | boolean | — | false |
| offset | 出现位置的偏移量 | number | — | 0 |
| transition | 定义渐变动画 | string | — | el-fade-in-linear |
| popper-options | popper.js 参数 | object | — | {} |
| popper-class | 为 popper 添加类名 | string | — | — |
| popper-style | 为 popper 添加样式 | object | — | {} |
| show-arrow | 是否显示箭头 | boolean | — | true |
| hide-after | 延迟出现，单位毫秒 | number | — | 0 |
| auto-close | 是否自动关闭 | number | — | 0 |
| show-after | 延迟出现，单位毫秒 | number | — | 0 |
| enterable | 鼠标是否可进入到 popover 中 | boolean | — | true |
| tabindex | Popover 组件的 tabindex | number | — | 0 |
| teleported | 是否将 popover 的下拉列表插入至 body 元素 | boolean | — | true |
| persistent | 当 popover 组件被触发时，是否在点击窗口其他部分后关闭 popover | boolean | — | true |

#### 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| show | 显示时触发 | — |
| after-enter | 显示动画播放完毕后触发 | — |
| hide | 隐藏时触发 | — |
| after-leave | 隐藏动画播放完毕后触发 | — |

#### 插槽
| 插槽名 | 说明 |
|--------|------|
| — | Popover 的内容 |
| reference | 触发 Popover 显示的 HTML 元素 |

#### 使用示例
```vue
<!-- 基础用法 -->
<el-popover
  placement="top"
  title="标题"
  :width="200"
  trigger="hover"
  content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
>
  <template #reference>
    <el-button>hover 激活</el-button>
  </template>
</el-popover>

<!-- 不同触发方式 -->
<el-popover
  placement="top"
  title="标题"
  :width="200"
  trigger="click"
  content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
>
  <template #reference>
    <el-button>click 激活</el-button>
  </template>
</el-popover>

<el-popover
  placement="top"
  title="标题"
  :width="200"
  trigger="focus"
  content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
>
  <template #reference>
    <el-button>focus 激活</el-button>
  </template>
</el-popover>

<el-popover
  placement="top"
  title="标题"
  :width="200"
  trigger="manual"
  v-model:visible="visible"
  content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
>
  <template #reference>
    <el-button @click="visible = !visible">manual 激活</el-button>
  </template>
</el-popover>

<!-- 不同位置 -->
<el-popover placement="top-start" title="标题" :width="200" trigger="hover">
  <template #reference>
    <el-button>上左</el-button>
  </template>
  <template #default>
    这是一段内容,这是一段内容,这是一段内容,这是一段内容。
  </template>
</el-popover>

<el-popover placement="top" title="标题" :width="200" trigger="hover">
  <template #reference>
    <el-button>上边</el-button>
  </template>
  <template #default>
    这是一段内容,这是一段内容,这是一段内容,这是一段内容。
  </template>
</el-popover>

<el-popover placement="top-end" title="标题" :width="200" trigger="hover">
  <template #reference>
    <el-button>上右</el-button>
  </template>
  <template #default>
    这是一段内容,这是一段内容,这是一段内容,这是一段内容。
  </template>
</el-popover>

<!-- 自定义内容 -->
<el-popover
  placement="right"
  title="标题"
  :width="400"
  trigger="click"
>
  <template #reference>
    <el-button>自定义内容</el-button>
  </template>
  <template #default>
    <div>
      <p>这是一段内容,这是一段内容,这是一段内容,这是一段内容。</p>
      <p>这是一段内容,这是一段内容,这是一段内容,这是一段内容。</p>
      <el-button size="small" type="primary">确定</el-button>
      <el-button size="small">取消</el-button>
    </div>
  </template>
</el-popover>

<!-- 嵌套内容 -->
<el-popover
  placement="right"
  title="标题"
  :width="400"
  trigger="click"
>
  <template #reference>
    <el-button>嵌套内容</el-button>
  </template>
  <template #default>
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180" />
        <el-table-column prop="name" label="姓名" width="180" />
        <el-table-column prop="address" label="地址" />
      </el-table>
    </div>
  </template>
</el-popover>

<!-- 表单内容 -->
<el-popover
  placement="right"
  title="标题"
  :width="400"
  trigger="click"
>
  <template #reference>
    <el-button>表单内容</el-button>
  </template>
  <template #default>
    <div>
      <el-form :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
</el-popover>

<!-- 自定义样式 -->
<el-popover
  placement="top"
  title="自定义样式"
  :width="200"
  trigger="hover"
  content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
  popper-class="custom-popover"
>
  <template #reference>
    <el-button>自定义样式</el-button>
  </template>
</el-popover>

<!-- 禁用状态 -->
<el-popover
  placement="top"
  title="标题"
  :width="200"
  trigger="hover"
  content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
  :disabled="true"
>
  <template #reference>
    <el-button>禁用状态</el-button>
  </template>
</el-popover>

<!-- 带图标 -->
<el-popover
  placement="top"
  title="标题"
  :width="200"
  trigger="hover"
  content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
>
  <template #reference>
    <el-button>
      <el-icon><InfoFilled /></el-icon>
      带图标
    </el-button>
  </template>
</el-popover>
```

#### 样式定制
```css
/* 自定义 Popover 样式 */
.custom-popover {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.custom-popover .el-popover__title {
  color: white;
  font-weight: bold;
  font-size: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.custom-popover .el-popover__content {
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
}

.custom-popover .el-popover__arrow {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* 响应式 Popover */
@media (max-width: 768px) {
  .responsive-popover {
    width: 90% !important;
    max-width: 300px;
  }
  
  .el-popover {
    font-size: 14px;
  }
  
  .el-popover__title {
    font-size: 16px;
  }
}
```

#### 使用场景
1. **提示信息**: 显示额外的提示信息或说明
2. **操作确认**: 显示操作确认信息
3. **详细信息**: 显示详细的信息或数据
4. **表单验证**: 显示表单验证错误信息
5. **帮助说明**: 显示帮助信息或使用说明
6. **快捷操作**: 显示快捷操作按钮或菜单

#### 注意事项
1. **触发方式**: 根据交互需求选择合适的触发方式
2. **位置选择**: 根据内容长度和页面布局选择合适的显示位置
3. **内容长度**: 避免内容过长，影响用户体验
4. **响应式设计**: 在移动端考虑 Popover 的显示效果
5. **性能优化**: 避免在 Popover 中放置过多内容
6. **可访问性**: 确保 Popover 对键盘导航和屏幕阅读器友好
7. **自动关闭**: 合理使用自动关闭功能，避免用户误操作 