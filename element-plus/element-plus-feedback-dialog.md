### 1. Dialog 对话框
- **用途**: 弹窗对话框
- **特点**: 支持多种类型、自定义内容

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-button type="text" @click="dialogVisible = true">
    点击打开 Dialog
  </el-button>

  <el-dialog
    v-model="dialogVisible"
    title="提示"
    width="30%"
  >
    <span>这是一段信息</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 自定义内容 -->
  <el-button type="text" @click="dialogVisible2 = true">
    点击打开嵌套表单的 Dialog
  </el-button>

  <el-dialog
    v-model="dialogVisible2"
    title="收货地址"
    width="30%"
  >
    <el-form :model="form">
      <el-form-item label="活动名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="活动区域" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible2 = false">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 居中布局 -->
  <el-button type="text" @click="centerDialogVisible = true">
    点击打开居中布局的 Dialog
  </el-button>

  <el-dialog
    v-model="centerDialogVisible"
    title="提示"
    width="30%"
    center
  >
    <span>需要注意的是内容是默认不居中的</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 关闭前确认 -->
  <el-button type="text" @click="closeOnClickModalVisible = true">
    点击打开关闭前确认的 Dialog
  </el-button>

  <el-dialog
    v-model="closeOnClickModalVisible"
    title="提示"
    width="30%"
    :before-close="handleClose"
  >
    <span>此操作将永久删除该文件, 是否继续?</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeOnClickModalVisible = false">取消</el-button>
        <el-button type="primary" @click="closeOnClickModalVisible = false">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 嵌套的 Dialog -->
  <el-button type="text" @click="outerVisible = true">
    点击打开外层 Dialog
  </el-button>

  <el-dialog v-model="outerVisible" title="外层 Dialog" width="30%">
    <el-dialog
      v-model="innerVisible"
      width="30%"
      title="内层 Dialog"
      append-to-body
    />
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="outerVisible = false">取 消</el-button>
        <el-button type="primary" @click="innerVisible = true">
          打开内层 Dialog
        </el-button>
      </div>
    </template>
  </el-dialog>

  <!-- 可拖拽的 Dialog -->
  <el-button type="text" @click="draggableVisible = true">
    点击打开可拖拽的 Dialog
  </el-button>

  <el-dialog
    v-model="draggableVisible"
    title="可拖拽的 Dialog"
    width="30%"
    draggable
  >
    <span>这是一个可拖拽的对话框</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="draggableVisible = false">取消</el-button>
        <el-button type="primary" @click="draggableVisible = false">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 全屏 Dialog -->
  <el-button type="text" @click="fullscreenVisible = true">
    点击打开全屏的 Dialog
  </el-button>

  <el-dialog
    v-model="fullscreenVisible"
    title="全屏 Dialog"
    fullscreen
    :before-close="handleClose"
  >
    <span>这是一个全屏的对话框</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="fullscreenVisible = false">取消</el-button>
        <el-button type="primary" @click="fullscreenVisible = false">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessageBox } from 'element-plus'

const dialogVisible = ref(false)
const dialogVisible2 = ref(false)
const centerDialogVisible = ref(false)
const closeOnClickModalVisible = ref(false)
const outerVisible = ref(false)
const innerVisible = ref(false)
const draggableVisible = ref(false)
const fullscreenVisible = ref(false)

const form = reactive({
  name: '',
  region: ''
})

const formLabelWidth = '140px'

const handleClose = (done) => {
  ElMessageBox.confirm('确认关闭？')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}
</script>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| model-value / v-model | 是否显示 Dialog | boolean | — | false |
| title | Dialog 的标题，也可通过具名 slot （见下表）传入 | string | — | — |
| width | Dialog 的宽度 | string / number | — | 50% |
| fullscreen | 是否为全屏 Dialog | boolean | — | false |
| top | Dialog CSS 中的 margin-top 值 | string | — | 15vh |
| modal | 是否需要遮罩层 | boolean | — | true |
| append-to-body | Dialog 自身是否插入至 body 元素上。 嵌套的 Dialog 必须指定该属性并赋值为 true | boolean | — | false |
| lock-scroll | 是否在 Dialog 出现时将 body 滚动锁定 | boolean | — | true |
| close-on-click-modal | 是否可以通过点击 modal 关闭 Dialog | boolean | — | true |
| close-on-press-escape | 是否可以通过按下 ESC 关闭 Dialog | boolean | — | true |
| show-close | 是否显示关闭按钮 | boolean | — | true |
| before-close | 关闭前的回调，会暂停 Dialog 的关闭 | function(done)，done 用于关闭 Dialog | — | — |
| center | 是否对头部和底部采用居中布局 | boolean | — | false |
| destroy-on-close | 关闭时销毁 Dialog 内的元素 | boolean | — | false |
| draggable | 为 Dialog 启用可拖拽功能 | boolean | — | false |
| align-center | 是否让 Dialog 的 header 和 footer 水平居中排列 | boolean | — | false |
| open-delay | Dialog 打开的延时时间，单位毫秒 | number | — | 0 |
| close-delay | Dialog 关闭的延时时间，单位毫秒 | number | — | 0 |
| close-on-click-modal | 是否可以通过点击 modal 关闭 Dialog | boolean | — | true |
| close-on-press-escape | 是否可以通过按下 ESC 关闭 Dialog | boolean | — | true |
| show-close | 是否显示关闭按钮 | boolean | — | true |
| before-close | 关闭前的回调，会暂停 Dialog 的关闭 | function(done)，done 用于关闭 Dialog | — | — |
| center | 是否对头部和底部采用居中布局 | boolean | — | false |
| destroy-on-close | 关闭时销毁 Dialog 内的元素 | boolean | — | false |
| draggable | 为 Dialog 启用可拖拽功能 | boolean | — | false |
| align-center | 是否让 Dialog 的 header 和 footer 水平居中排列 | boolean | — | false |
| open-delay | Dialog 打开的延时时间，单位毫秒 | number | — | 0 |
| close-delay | Dialog 关闭的延时时间，单位毫秒 | number | — | 0 |

#### 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| open | Dialog 打开的回调 | — |
| opened | Dialog 打开动画结束时的回调 | — |
| close | Dialog 关闭的回调 | — |
| closed | Dialog 关闭动画结束时的回调 | — |

#### 插槽
| 插槽名 | 说明 |
|--------|------|
| — | Dialog 的内容 |
| header | Dialog 标题区的内容 |
| footer | Dialog 按钮操作区的内容 | 