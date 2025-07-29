### 34. Result 结果
- **用途**: 用于反馈一系列操作任务的处理结果
- **特点**: 支持成功、失败、警告等状态，自定义图标和操作按钮

#### 详细用法
```vue
<template>
  <!-- 成功状态 -->
  <el-result
    icon="success"
    title="成功提交"
    sub-title="请根据邮箱提示完成提交"
  >
    <template #extra>
      <el-button type="primary">返回</el-button>
    </template>
  </el-result>

  <!-- 失败状态 -->
  <el-result
    icon="error"
    title="提交失败"
    sub-title="请核对并修改以下信息后，再重新提交。"
  >
    <template #extra>
      <el-button type="primary">返回修改</el-button>
    </template>
  </el-result>

  <!-- 警告状态 -->
  <el-result
    icon="warning"
    title="警告提示"
    sub-title="您的操作可能存在风险，请确认后继续。"
  >
    <template #extra>
      <el-button>取消</el-button>
      <el-button type="primary">确认</el-button>
    </template>
  </el-result>

  <!-- 信息状态 -->
  <el-result
    icon="info"
    title="信息提示"
    sub-title="这是一条信息提示，请查看详细信息。"
  >
    <template #extra>
      <el-button type="primary">查看详情</el-button>
    </template>
  </el-result>

  <!-- 自定义图标 -->
  <el-result
    title="自定义图标"
    sub-title="使用自定义图标的结果页面"
  >
    <template #icon>
      <el-icon style="font-size: 72px; color: #67c23a">
        <CircleCheckFilled />
      </el-icon>
    </template>
    <template #extra>
      <el-button type="primary">确定</el-button>
    </template>
  </el-result>

  <!-- 在页面中使用 -->
  <div class="result-container">
    <h3>操作结果展示</h3>
    
    <!-- 状态切换 -->
    <div class="status-controls">
      <el-button-group>
        <el-button 
          :type="currentStatus === 'success' ? 'primary' : ''"
          @click="showResult('success')"
        >
          成功
        </el-button>
        <el-button 
          :type="currentStatus === 'error' ? 'danger' : ''"
          @click="showResult('error')"
        >
          失败
        </el-button>
        <el-button 
          :type="currentStatus === 'warning' ? 'warning' : ''"
          @click="showResult('warning')"
        >
          警告
        </el-button>
        <el-button 
          :type="currentStatus === 'info' ? 'info' : ''"
          @click="showResult('info')"
        >
          信息
        </el-button>
      </el-button-group>
    </div>

    <!-- 结果展示 -->
    <div class="result-display">
      <!-- 成功结果 -->
      <el-result
        v-if="currentStatus === 'success'"
        icon="success"
        :title="resultData.title"
        :sub-title="resultData.subTitle"
      >
        <template #extra>
          <div class="result-actions">
            <el-button @click="goBack">返回列表</el-button>
            <el-button type="primary" @click="viewDetails">查看详情</el-button>
            <el-button type="success" @click="continueOperation">继续操作</el-button>
          </div>
        </template>
      </el-result>

      <!-- 失败结果 -->
      <el-result
        v-else-if="currentStatus === 'error'"
        icon="error"
        :title="resultData.title"
        :sub-title="resultData.subTitle"
      >
        <template #extra>
          <div class="result-actions">
            <el-button @click="goBack">返回列表</el-button>
            <el-button type="primary" @click="retryOperation">重试</el-button>
            <el-button type="warning" @click="contactSupport">联系客服</el-button>
          </div>
        </template>
      </el-result>

      <!-- 警告结果 -->
      <el-result
        v-else-if="currentStatus === 'warning'"
        icon="warning"
        :title="resultData.title"
        :sub-title="resultData.subTitle"
      >
        <template #extra>
          <div class="result-actions">
            <el-button @click="cancelOperation">取消</el-button>
            <el-button type="warning" @click="confirmOperation">确认操作</el-button>
          </div>
        </template>
      </el-result>

      <!-- 信息结果 -->
      <el-result
        v-else-if="currentStatus === 'info'"
        icon="info"
        :title="resultData.title"
        :sub-title="resultData.subTitle"
      >
        <template #extra>
          <div class="result-actions">
            <el-button @click="goBack">返回</el-button>
            <el-button type="primary" @click="viewDetails">查看详情</el-button>
          </div>
        </template>
      </el-result>
    </div>

    <!-- 订单结果示例 -->
    <div class="order-result-demo">
      <h4>订单支付结果</h4>
      <el-result
        icon="success"
        title="支付成功"
        sub-title="您的订单已支付成功，商家将尽快为您发货"
      >
        <template #extra>
          <div class="order-info">
            <div class="order-detail">
              <span class="label">订单号：</span>
              <span class="value">{{ orderInfo.orderNo }}</span>
            </div>
            <div class="order-detail">
              <span class="label">支付金额：</span>
              <span class="value price">¥{{ orderInfo.amount }}</span>
            </div>
            <div class="order-detail">
              <span class="label">支付时间：</span>
              <span class="value">{{ orderInfo.payTime }}</span>
            </div>
          </div>
          <div class="order-actions">
            <el-button @click="viewOrder">查看订单</el-button>
            <el-button type="primary" @click="continueShopping">继续购物</el-button>
          </div>
        </template>
      </el-result>
    </div>

    <!-- 表单提交结果示例 -->
    <div class="form-result-demo">
      <h4>表单提交结果</h4>
      <el-result
        :icon="formResult.icon"
        :title="formResult.title"
        :sub-title="formResult.subTitle"
      >
        <template #extra>
          <div class="form-actions">
            <el-button @click="resetForm">重新填写</el-button>
            <el-button type="primary" @click="submitAgain" v-if="formResult.type === 'error'">
              重新提交
            </el-button>
            <el-button type="success" @click="viewSubmission" v-if="formResult.type === 'success'">
              查看提交
            </el-button>
          </div>
        </template>
      </el-result>
    </div>

    <!-- 文件上传结果示例 -->
    <div class="upload-result-demo">
      <h4>文件上传结果</h4>
      <el-result
        :icon="uploadResult.icon"
        :title="uploadResult.title"
        :sub-title="uploadResult.subTitle"
      >
        <template #extra>
          <div class="upload-actions">
            <el-button @click="uploadMore">继续上传</el-button>
            <el-button type="primary" @click="viewFiles">查看文件</el-button>
            <el-button type="warning" @click="retryUpload" v-if="uploadResult.type === 'error'">
              重试上传
            </el-button>
          </div>
        </template>
      </el-result>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { CircleCheckFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

// 当前状态
const currentStatus = ref('success')

// 结果数据
const resultData = reactive({
  title: '操作成功',
  subTitle: '您的操作已成功完成，请查看结果。'
})

// 订单信息
const orderInfo = reactive({
  orderNo: 'ORD202401150001',
  amount: '299.00',
  payTime: '2024-01-15 14:30:25'
})

// 表单结果
const formResult = reactive({
  icon: 'success',
  title: '表单提交成功',
  subTitle: '您的信息已成功提交，我们会尽快处理。',
  type: 'success'
})

// 上传结果
const uploadResult = reactive({
  icon: 'success',
  title: '文件上传成功',
  subTitle: '所有文件已成功上传到服务器。',
  type: 'success'
})

// 状态切换函数
const showResult = (status) => {
  currentStatus.value = status
  
  switch (status) {
    case 'success':
      resultData.title = '操作成功'
      resultData.subTitle = '您的操作已成功完成，请查看结果。'
      break
    case 'error':
      resultData.title = '操作失败'
      resultData.subTitle = '操作过程中出现错误，请检查后重试。'
      break
    case 'warning':
      resultData.title = '操作警告'
      resultData.subTitle = '您的操作可能存在风险，请确认后继续。'
      break
    case 'info':
      resultData.title = '操作信息'
      resultData.subTitle = '这是一条重要的操作信息，请仔细查看。'
      break
  }
}

// 操作函数
const goBack = () => {
  ElMessage.info('返回列表')
}

const viewDetails = () => {
  ElMessage.success('查看详情')
}

const continueOperation = () => {
  ElMessage.success('继续操作')
}

const retryOperation = () => {
  ElMessage.warning('重试操作')
}

const contactSupport = () => {
  ElMessage.info('联系客服')
}

const cancelOperation = () => {
  ElMessage.info('取消操作')
}

const confirmOperation = () => {
  ElMessage.success('确认操作')
}

const viewOrder = () => {
  ElMessage.success('查看订单详情')
}

const continueShopping = () => {
  ElMessage.success('继续购物')
}

const resetForm = () => {
  ElMessage.info('重置表单')
}

const submitAgain = () => {
  ElMessage.warning('重新提交表单')
}

const viewSubmission = () => {
  ElMessage.success('查看提交记录')
}

const uploadMore = () => {
  ElMessage.info('继续上传文件')
}

const viewFiles = () => {
  ElMessage.success('查看已上传文件')
}

const retryUpload = () => {
  ElMessage.warning('重试上传')
}

// 模拟表单提交结果切换
const toggleFormResult = () => {
  if (formResult.type === 'success') {
    formResult.icon = 'error'
    formResult.title = '表单提交失败'
    formResult.subTitle = '提交过程中出现错误，请检查后重试。'
    formResult.type = 'error'
  } else {
    formResult.icon = 'success'
    formResult.title = '表单提交成功'
    formResult.subTitle = '您的信息已成功提交，我们会尽快处理。'
    formResult.type = 'success'
  }
}

// 模拟上传结果切换
const toggleUploadResult = () => {
  if (uploadResult.type === 'success') {
    uploadResult.icon = 'error'
    uploadResult.title = '文件上传失败'
    uploadResult.subTitle = '部分文件上传失败，请检查网络连接后重试。'
    uploadResult.type = 'error'
  } else {
    uploadResult.icon = 'success'
    uploadResult.title = '文件上传成功'
    uploadResult.subTitle = '所有文件已成功上传到服务器。'
    uploadResult.type = 'success'
  }
}
</script>

<style scoped>
.result-container {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}

.status-controls {
  margin: 20px 0;
  text-align: center;
  padding: 20px;
  background: #f5f7fa;
  border-radius: 4px;
}

.result-display {
  margin: 30px 0;
  padding: 40px;
  background: #fff;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}

.result-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.order-result-demo,
.form-result-demo,
.upload-result-demo {
  margin: 30px 0;
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}

.order-result-demo h4,
.form-result-demo h4,
.upload-result-demo h4 {
  margin: 0 0 20px 0;
  color: #303133;
  font-size: 16px;
}

.order-info {
  margin-bottom: 20px;
  padding: 15px;
  background: #f5f7fa;
  border-radius: 4px;
}

.order-detail {
  display: flex;
  justify-content: space-between;
  margin: 8px 0;
  font-size: 14px;
}

.order-detail .label {
  color: #606266;
  font-weight: 500;
}

.order-detail .value {
  color: #303133;
}

.order-detail .value.price {
  color: #f56c6c;
  font-weight: bold;
  font-size: 16px;
}

.order-actions,
.form-actions,
.upload-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| icon | 图标类型 | string | success / warning / info / error | info |
| title | 标题 | string | — | — |
| sub-title | 二级标题 | string | — | — |
| status | 结果的状态，决定图标和颜色 | string | success / warning / info / error | info |

#### 插槽
| 插槽名 | 说明 |
|--------|------|
| icon | 自定义图标 |
| title | 自定义标题 |
| sub-title | 自定义二级标题 |
| extra | 操作区的内容 |

#### 使用场景
1. **表单提交结果**: 表单提交成功或失败的结果展示
2. **订单支付结果**: 支付成功或失败的结果页面
3. **文件上传结果**: 文件上传成功或失败的结果展示
4. **操作确认结果**: 重要操作完成后的结果反馈
5. **注册登录结果**: 用户注册或登录的结果页面
6. **申请提交结果**: 各种申请提交后的结果展示
7. **系统操作结果**: 系统级操作的结果反馈 