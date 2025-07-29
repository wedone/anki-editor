### 15. Color Picker 取色器
- **用途**: 颜色选择
- **特点**: 支持多种颜色格式

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-color-picker v-model="color1" />

  <!-- 支持透明度 -->
  <el-color-picker v-model="color2" show-alpha />

  <!-- 预定义颜色 -->
  <el-color-picker
    v-model="color3"
    :predefine="predefineColors"
  />

  <!-- 不同尺寸 -->
  <el-color-picker v-model="color4" size="large" />
  <el-color-picker v-model="color4" size="default" />
  <el-color-picker v-model="color4" size="small" />

  <!-- 禁用状态 -->
  <el-color-picker v-model="color5" disabled />

  <!-- 只读模式 -->
  <el-color-picker v-model="color6" readonly />

  <!-- 触发方式 -->
  <el-color-picker
    v-model="color7"
    trigger="hover"
  />

  <!-- 自定义格式 -->
  <el-color-picker
    v-model="color8"
    color-format="hsl"
  />

  <!-- 事件处理 -->
  <el-color-picker
    v-model="color9"
    @change="handleChange"
    @active-change="handleActiveChange"
  />

  <!-- 在表单中使用 -->
  <el-form :model="form" label-width="120px">
    <el-form-item label="主题色">
      <el-color-picker v-model="form.themeColor" />
    </el-form-item>
    <el-form-item label="背景色">
      <el-color-picker v-model="form.bgColor" show-alpha />
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref } from 'vue'

const color1 = ref('#409EFF')
const color2 = ref('rgba(64, 158, 255, 0.8)')
const color3 = ref('#409EFF')
const color4 = ref('#409EFF')
const color5 = ref('#409EFF')
const color6 = ref('#409EFF')
const color7 = ref('#409EFF')
const color8 = ref('hsl(210, 100%, 62%)')
const color9 = ref('#409EFF')

const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577'
])

const form = ref({
  themeColor: '#409EFF',
  bgColor: 'rgba(64, 158, 255, 0.8)'
})

const handleChange = (color) => {
  console.log('颜色改变:', color)
}

const handleActiveChange = (color) => {
  console.log('激活颜色改变:', color)
}
</script>

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| model-value / v-model | 绑定值 | string | — | — |
| disabled | 是否禁用 | boolean | — | false |
| size | 尺寸 | string | large / default / small | default |
| show-alpha | 是否支持透明度选择 | boolean | — | false |
| color-format | 写入 v-model 的颜色格式 | string | hsl / hsv / hex / rgb | hex (show-alpha 为 false) / rgb (show-alpha 为 true) |
| popper-class | 自定义类名 | string | — | — |
| predefine | 预定义颜色 | array | — | — |
| validate-event | 输入时是否触发表单的校验 | boolean | — | true |
| tabindex | 设置 ColorPicker 的 tabindex | string / number | — | 0 |
| label | 为屏幕阅读器准备的标签 | string | — | — |
| trigger | 触发方式 | string | hover / click | click |
| readonly | 是否只读 | boolean | — | false |
| id | 原生 id 属性 | string | — | — |
| name | 原生 name 属性 | string | — | — |

#### 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 当绑定值变化时触发 | 当前值 |
| active-change | 面板中当前显示的颜色发生改变时触发 | 当前显示的颜色值 |

#### 插槽
| 插槽名 | 说明 |
|--------|------|
| default | 触发 ColorPicker 显示的 HTML 元素 |

#### 使用场景
1. **主题配置**: 网站主题色选择
2. **设计工具**: 图形设计、UI设计工具
3. **表单输入**: 颜色相关的表单字段
4. **样式编辑器**: CSS样式编辑器
5. **品牌管理**: 品牌色彩管理
6. **数据可视化**: 图表颜色配置
7. **个性化设置**: 用户个性化颜色设置 