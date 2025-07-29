### 7. Drawer 抽屉
- **用途**: 抽屉组件
- **特点**: 支持多种方向、自定义内容

#### 详细用法
```vue
<template>
  <div>
    <el-button type="primary" @click="drawer = true">
      打开抽屉
    </el-button>

    <el-drawer
      v-model="drawer"
      title="标题"
      direction="rtl"
      size="50%"
    >
      <span>我来啦!</span>
    </el-drawer>

    <!-- 不同方向 -->
    <el-button @click="drawer1 = true">从右边出现</el-button>
    <el-button @click="drawer2 = true">从左边出现</el-button>
    <el-button @click="drawer3 = true">从顶部出现</el-button>
    <el-button @click="drawer4 = true">从底部出现</el-button>

    <el-drawer
      v-model="drawer1"
      title="从右边出现"
      direction="rtl"
    >
      <span>我来啦!</span>
    </el-drawer>

    <el-drawer
      v-model="drawer2"
      title="从左边出现"
      direction="ltr"
    >
      <span>我来啦!</span>
    </el-drawer>

    <el-drawer
      v-model="drawer3"
      title="从顶部出现"
      direction="ttb"
    >
      <span>我来啦!</span>
    </el-drawer>

    <el-drawer
      v-model="drawer4"
      title="从底部出现"
      direction="btt"
    >
      <span>我来啦!</span>
    </el-drawer>

    <!-- 不同尺寸 -->
    <el-button @click="drawer5 = true">30% 宽度</el-button>
    <el-button @click="drawer6 = true">50% 宽度</el-button>
    <el-button @click="drawer7 = true">70% 宽度</el-button>
    <el-button @click="drawer8 = true">100% 宽度</el-button>

    <el-drawer
      v-model="drawer5"
      title="30% 宽度"
      direction="rtl"
      size="30%"
    >
      <span>我来啦!</span>
    </el-drawer>

    <el-drawer
      v-model="drawer6"
      title="50% 宽度"
      direction="rtl"
      size="50%"
    >
      <span>我来啦!</span>
    </el-drawer>

    <el-drawer
      v-model="drawer7"
      title="70% 宽度"
      direction="rtl"
      size="70%"
    >
      <span>我来啦!</span>
    </el-drawer>

    <el-drawer
      v-model="drawer8"
      title="100% 宽度"
      direction="rtl"
      size="100%"
    >
      <span>我来啦!</span>
    </el-drawer>

    <!-- 自定义头部 -->
    <el-button @click="drawer9 = true">自定义头部</el-button>

    <el-drawer
      v-model="drawer9"
      direction="rtl"
      size="50%"
    >
      <template #header="{ close, titleId, titleClass }">
        <h4 :id="titleId" :class="titleClass">
          自定义标题
        </h4>
        <el-button type="text" @click="close">
          <el-icon><Close /></el-icon>
        </el-button>
      </template>
      <span>我来啦!</span>
    </el-drawer>

    <!-- 自定义内容 -->
    <el-button @click="drawer10 = true">自定义内容</el-button>

    <el-drawer
      v-model="drawer10"
      title="自定义内容"
      direction="rtl"
      size="50%"
    >
      <div class="drawer-content">
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
          <el-form-item label="活动时间">
            <el-col :span="11">
              <el-date-picker
                v-model="form.date1"
                type="date"
                placeholder="选择日期"
                style="width: 100%"
              />
            </el-col>
            <el-col class="text-center" :span="2">
              <span class="text-gray-500">-</span>
            </el-col>
            <el-col :span="11">
              <el-time-picker
                v-model="form.date2"
                placeholder="选择时间"
                style="width: 100%"
              />
            </el-col>
          </el-form-item>
          <el-form-item label="即时配送">
            <el-switch v-model="form.delivery" />
          </el-form-item>
          <el-form-item label="活动性质">
            <el-checkbox-group v-model="form.type">
              <el-checkbox label="美食/餐厅线上活动" name="type" />
              <el-checkbox label="地推活动" name="type" />
              <el-checkbox label="线下主题活动" name="type" />
              <el-checkbox label="单纯品牌曝光" name="type" />
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="特殊资源">
            <el-radio-group v-model="form.resource">
              <el-radio label="线上品牌商赞助" />
              <el-radio label="线下场地免费" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="活动形式">
            <el-input v-model="form.desc" type="textarea" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button @click="drawer10 = false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>

    <!-- 嵌套抽屉 -->
    <el-button @click="drawer11 = true">嵌套抽屉</el-button>

    <el-drawer
      v-model="drawer11"
      title="嵌套抽屉"
      direction="rtl"
      size="50%"
    >
      <div>
        <span>我来啦!</span>
        <el-button @click="drawer12 = true">打开第二个抽屉</el-button>
      </div>

      <el-drawer
        v-model="drawer12"
        title="嵌套抽屉"
        direction="rtl"
        size="50%"
        append-to-body
      >
        <span>我来啦!</span>
      </el-drawer>
    </el-drawer>

    <!-- 带遮罩的抽屉 -->
    <el-button @click="drawer13 = true">带遮罩的抽屉</el-button>

    <el-drawer
      v-model="drawer13"
      title="带遮罩的抽屉"
      direction="rtl"
      size="50%"
      :modal="true"
    >
      <span>我来啦!</span>
    </el-drawer>

    <!-- 不带遮罩的抽屉 -->
    <el-button @click="drawer14 = true">不带遮罩的抽屉</el-button>

    <el-drawer
      v-model="drawer14"
      title="不带遮罩的抽屉"
      direction="rtl"
      size="50%"
      :modal="false"
    >
      <span>我来啦!</span>
    </el-drawer>

    <!-- 自定义样式 -->
    <el-button @click="drawer15 = true">自定义样式</el-button>

    <el-drawer
      v-model="drawer15"
      title="自定义样式"
      direction="rtl"
      size="50%"
      custom-class="custom-drawer"
    >
      <span>我来啦!</span>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Close } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const drawer = ref(false)
const drawer1 = ref(false)
const drawer2 = ref(false)
const drawer3 = ref(false)
const drawer4 = ref(false)
const drawer5 = ref(false)
const drawer6 = ref(false)
const drawer7 = ref(false)
const drawer8 = ref(false)
const drawer9 = ref(false)
const drawer10 = ref(false)
const drawer11 = ref(false)
const drawer12 = ref(false)
const drawer13 = ref(false)
const drawer14 = ref(false)
const drawer15 = ref(false)

const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: ''
})

const onSubmit = () => {
  ElMessage.success('提交成功!')
  drawer10.value = false
}
</script>

<style scoped>
.drawer-content {
  padding: 20px;
}

.custom-drawer {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.custom-drawer .el-drawer__header {
  background-color: rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.custom-drawer .el-drawer__title {
  color: white;
  font-weight: bold;
}

.custom-drawer .el-drawer__body {
  color: rgba(255, 255, 255, 0.9);
}

.custom-drawer .el-drawer__close-btn {
  color: white;
}

.custom-drawer .el-drawer__close-btn:hover {
  color: rgba(255, 255, 255, 0.8);
}

/* 响应式抽屉 */
@media (max-width: 768px) {
  .el-drawer {
    width: 100% !important;
  }
}
</style>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| model-value / v-model | 是否显示 Drawer | boolean | — | false |
| title | Drawer 的标题，也可通过具名 slot （见下表）传入 | string | — | — |
| direction | Drawer 打开的方向 | string | rtl / ltr / ttb / btt | rtl |
| size | Drawer 窗体的大小, 当使用 number 类型时, 以像素为单位, 当使用 string 类型时, 请传入 x%, 如 30%, 表示 30% 的宽度 | string / number | — | 30% |
| with-header | 设置是否显示头部 | boolean | — | true |
| modal | 是否需要遮罩层 | boolean | — | true |
| append-to-body | 设置 Drawer 的挂载位置 | boolean | — | false |
| lock-scroll | 是否在 Drawer 出现时将 body 滚动锁定 | boolean | — | true |
| close-on-click-modal | 是否可以通过点击 modal 关闭 Drawer | boolean | — | true |
| close-on-press-escape | 是否可以通过按下 ESC 关闭 Drawer | boolean | — | true |
| show-close | 是否显示关闭按钮 | boolean | — | true |
| destroy-on-close | 控制是否在关闭 Drawer 之后将子元素全部销毁 | boolean | — | false |
| before-close | 关闭前的回调，会暂停 Drawer 的关闭 | function(done) | — | — |
| custom-class | 自定义类名 | string | — | — |
| z-index | 设置 z-index | number | — | — |
| open-delay | Drawer 打开的延时时间，单位毫秒 | number | — | 0 |
| close-delay | Drawer 关闭的延时时间，单位毫秒 | number | — | 0 |
| focus-trap | 是否启用焦点陷阱 | boolean | — | false |
| trap-focus | 是否启用焦点陷阱 | boolean | — | false |
| close-icon | 自定义关闭图标 | string / Component | — | Close |
| close-icon-class | 自定义关闭图标的类名 | string | — | — |

#### 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| open | Drawer 打开的回调 | — |
| opened | Drawer 打开动画结束时的回调 | — |
| close | Drawer 关闭的回调 | — |
| closed | Drawer 关闭动画结束时的回调 | — |

#### 插槽
| 插槽名 | 说明 |
|--------|------|
| — | Drawer 的内容 |
| header | 自定义标题内容；参数为 { close, titleId, titleClass } |

#### 使用示例
```vue
<!-- 基础用法 -->
<el-button type="primary" @click="drawer = true">
  打开抽屉
</el-button>

<el-drawer
  v-model="drawer"
  title="标题"
  direction="rtl"
  size="50%"
>
  <span>我来啦!</span>
</el-drawer>

<!-- 不同方向 -->
<el-drawer v-model="drawer" title="从右边出现" direction="rtl">
  <span>我来啦!</span>
</el-drawer>

<el-drawer v-model="drawer" title="从左边出现" direction="ltr">
  <span>我来啦!</span>
</el-drawer>

<el-drawer v-model="drawer" title="从顶部出现" direction="ttb">
  <span>我来啦!</span>
</el-drawer>

<el-drawer v-model="drawer" title="从底部出现" direction="btt">
  <span>我来啦!</span>
</el-drawer>

<!-- 不同尺寸 -->
<el-drawer v-model="drawer" title="30% 宽度" direction="rtl" size="30%">
  <span>我来啦!</span>
</el-drawer>

<el-drawer v-model="drawer" title="50% 宽度" direction="rtl" size="50%">
  <span>我来啦!</span>
</el-drawer>

<el-drawer v-model="drawer" title="70% 宽度" direction="rtl" size="70%">
  <span>我来啦!</span>
</el-drawer>

<el-drawer v-model="drawer" title="100% 宽度" direction="rtl" size="100%">
  <span>我来啦!</span>
</el-drawer>

<!-- 自定义头部 -->
<el-drawer v-model="drawer" direction="rtl" size="50%">
  <template #header="{ close, titleId, titleClass }">
    <h4 :id="titleId" :class="titleClass">
      自定义标题
    </h4>
    <el-button type="text" @click="close">
      <el-icon><Close /></el-icon>
    </el-button>
  </template>
  <span>我来啦!</span>
</el-drawer>

<!-- 嵌套抽屉 -->
<el-drawer v-model="drawer1" title="嵌套抽屉" direction="rtl" size="50%">
  <div>
    <span>我来啦!</span>
    <el-button @click="drawer2 = true">打开第二个抽屉</el-button>
  </div>

  <el-drawer
    v-model="drawer2"
    title="嵌套抽屉"
    direction="rtl"
    size="50%"
    append-to-body
  >
    <span>我来啦!</span>
  </el-drawer>
</el-drawer>

<!-- 带遮罩的抽屉 -->
<el-drawer v-model="drawer" title="带遮罩的抽屉" direction="rtl" size="50%" :modal="true">
  <span>我来啦!</span>
</el-drawer>

<!-- 不带遮罩的抽屉 -->
<el-drawer v-model="drawer" title="不带遮罩的抽屉" direction="rtl" size="50%" :modal="false">
  <span>我来啦!</span>
</el-drawer>

<!-- 自定义样式 -->
<el-drawer v-model="drawer" title="自定义样式" direction="rtl" size="50%" custom-class="custom-drawer">
  <span>我来啦!</span>
</el-drawer>
```

#### 样式定制
```css
/* 自定义抽屉样式 */
.custom-drawer {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.custom-drawer .el-drawer__header {
  background-color: rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 20px;
}

.custom-drawer .el-drawer__title {
  color: white;
  font-weight: bold;
  font-size: 18px;
}

.custom-drawer .el-drawer__body {
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  padding: 20px;
}

.custom-drawer .el-drawer__close-btn {
  color: white;
  font-size: 18px;
}

.custom-drawer .el-drawer__close-btn:hover {
  color: rgba(255, 255, 255, 0.8);
}

/* 响应式抽屉 */
@media (max-width: 768px) {
  .el-drawer {
    width: 100% !important;
  }
  
  .el-drawer__header {
    padding: 15px;
  }
  
  .el-drawer__body {
    padding: 15px;
  }
}
```

#### 使用场景
1. **侧边栏导航**: 移动端的侧边栏菜单
2. **设置面板**: 用户设置、配置面板
3. **详情展示**: 展示详细信息或表单
4. **购物车**: 电商网站的购物车面板
5. **聊天窗口**: 聊天应用的聊天窗口
6. **文件预览**: 文件预览或编辑面板

#### 注意事项
1. **方向选择**: 根据内容和使用场景选择合适的打开方向
2. **尺寸设置**: 合理设置抽屉的尺寸，避免内容显示不全
3. **嵌套使用**: 嵌套抽屉时需要使用 `append-to-body` 属性
4. **遮罩控制**: 根据交互需求决定是否显示遮罩层
5. **响应式设计**: 在移动端考虑抽屉的显示效果
6. **性能优化**: 使用 `destroy-on-close` 属性控制组件的销毁
7. **可访问性**: 确保抽屉对键盘导航和屏幕阅读器友好 