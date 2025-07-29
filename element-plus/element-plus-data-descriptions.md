### 30. Descriptions 描述列表
- **用途**: 成组展示多个只读字段
- **特点**: 支持响应式布局、自定义标签

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-descriptions title="用户信息" :column="3" border>
    <el-descriptions-item label="用户名">kobayashi</el-descriptions-item>
    <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
    <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
    <el-descriptions-item label="备注">
      <el-tag size="small">学校</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="联系地址">
      江苏省苏州市吴中区吴中大道 1188 号
    </el-descriptions-item>
  </el-descriptions>

  <!-- 不同尺寸 -->
  <el-descriptions title="用户信息" :column="3" border size="large">
    <el-descriptions-item label="用户名">kobayashi</el-descriptions-item>
    <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
    <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
  </el-descriptions>

  <el-descriptions title="用户信息" :column="3" border size="default">
    <el-descriptions-item label="用户名">kobayashi</el-descriptions-item>
    <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
    <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
  </el-descriptions>

  <el-descriptions title="用户信息" :column="3" border size="small">
    <el-descriptions-item label="用户名">kobayashi</el-descriptions-item>
    <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
    <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
  </el-descriptions>

  <!-- 响应式布局 -->
  <el-descriptions title="响应式布局" :column="3" border>
    <el-descriptions-item label="用户名">kobayashi</el-descriptions-item>
    <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
    <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
    <el-descriptions-item label="联系地址">
      江苏省苏州市吴中区吴中大道 1188 号
    </el-descriptions-item>
    <el-descriptions-item label="备注">
      <el-tag size="small">学校</el-tag>
    </el-descriptions-item>
  </el-descriptions>

  <!-- 自定义标签 -->
  <el-descriptions title="自定义标签" :column="3" border>
    <el-descriptions-item label="用户名">
      <template #label>
        <el-icon><User /></el-icon>
        用户名
      </template>
      kobayashi
    </el-descriptions-item>
    <el-descriptions-item label="手机号">
      <template #label>
        <el-icon><Phone /></el-icon>
        手机号
      </template>
      18100000000
    </el-descriptions-item>
    <el-descriptions-item label="居住地">
      <template #label>
        <el-icon><Location /></el-icon>
        居住地
      </template>
      苏州市
    </el-descriptions-item>
  </el-descriptions>

  <!-- 不同方向 -->
  <el-descriptions title="垂直方向" :column="1" border direction="vertical">
    <el-descriptions-item label="用户名">kobayashi</el-descriptions-item>
    <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
    <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
  </el-descriptions>

  <!-- 在页面中使用 -->
  <div class="descriptions-container">
    <h3>产品详情信息</h3>
    <el-descriptions 
      title="产品基本信息" 
      :column="2" 
      border 
      size="large"
      :label-style="{ fontWeight: 'bold', color: '#409eff' }"
    >
      <el-descriptions-item label="产品名称">
        <span class="product-name">{{ productInfo.name }}</span>
      </el-descriptions-item>
      <el-descriptions-item label="产品编号">
        <el-tag type="info">{{ productInfo.code }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="产品分类">
        <el-tag :type="productInfo.categoryType">{{ productInfo.category }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="产品状态">
        <el-tag :type="productInfo.statusType">{{ productInfo.status }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="产品价格">
        <span class="product-price">¥{{ productInfo.price }}</span>
      </el-descriptions-item>
      <el-descriptions-item label="库存数量">
        <span :class="productInfo.stock < 10 ? 'low-stock' : 'normal-stock'">
          {{ productInfo.stock }} 件
        </span>
      </el-descriptions-item>
      <el-descriptions-item label="产品描述" :span="2">
        {{ productInfo.description }}
      </el-descriptions-item>
    </el-descriptions>

    <el-descriptions 
      title="技术规格" 
      :column="3" 
      border 
      size="default"
      class="tech-specs"
    >
      <el-descriptions-item 
        v-for="spec in productInfo.specifications" 
        :key="spec.key"
        :label="spec.label"
      >
        <span v-if="spec.type === 'text'">{{ spec.value }}</span>
        <el-tag 
          v-else-if="spec.type === 'tag'" 
          :type="spec.tagType" 
          size="small"
        >
          {{ spec.value }}
        </el-tag>
        <span 
          v-else-if="spec.type === 'status'" 
          :class="spec.statusClass"
        >
          {{ spec.value }}
        </span>
      </el-descriptions-item>
    </el-descriptions>

    <el-descriptions 
      title="供应商信息" 
      :column="2" 
      border 
      size="small"
      class="supplier-info"
    >
      <el-descriptions-item label="供应商名称">
        {{ productInfo.supplier.name }}
      </el-descriptions-item>
      <el-descriptions-item label="联系人">
        {{ productInfo.supplier.contact }}
      </el-descriptions-item>
      <el-descriptions-item label="联系电话">
        {{ productInfo.supplier.phone }}
      </el-descriptions-item>
      <el-descriptions-item label="邮箱地址">
        {{ productInfo.supplier.email }}
      </el-descriptions-item>
      <el-descriptions-item label="地址" :span="2">
        {{ productInfo.supplier.address }}
      </el-descriptions-item>
    </el-descriptions>

    <!-- 操作按钮 -->
    <div class="action-buttons">
      <el-button type="primary" @click="editProduct">编辑产品</el-button>
      <el-button type="success" @click="copyProduct">复制产品</el-button>
      <el-button type="warning" @click="exportProduct">导出信息</el-button>
      <el-button type="danger" @click="deleteProduct">删除产品</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { User, Phone, Location } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// 产品信息数据
const productInfo = ref({
  name: '智能手机 Pro Max',
  code: 'SPM-2024-001',
  category: '电子产品',
  categoryType: 'primary',
  status: '在售',
  statusType: 'success',
  price: 6999,
  stock: 25,
  description: '最新款智能手机，搭载先进处理器，拥有出色的拍照性能和长续航能力。采用6.7英寸OLED屏幕，支持120Hz刷新率，配备5000mAh大容量电池。',
  specifications: [
    { key: 'screen', label: '屏幕尺寸', value: '6.7英寸', type: 'text' },
    { key: 'resolution', label: '分辨率', value: '2778 x 1284', type: 'text' },
    { key: 'processor', label: '处理器', value: 'A17 Pro', type: 'text' },
    { key: 'memory', label: '内存', value: '8GB', type: 'text' },
    { key: 'storage', label: '存储', value: '256GB', type: 'text' },
    { key: 'camera', label: '摄像头', value: '三摄系统', type: 'tag', tagType: 'info' },
    { key: 'battery', label: '电池容量', value: '5000mAh', type: 'text' },
    { key: 'charging', label: '充电功率', value: '45W', type: 'text' },
    { key: 'os', label: '操作系统', value: 'iOS 17', type: 'tag', tagType: 'success' },
    { key: 'network', label: '网络支持', value: '5G', type: 'tag', tagType: 'warning' },
    { key: 'waterproof', label: '防水等级', value: 'IP68', type: 'tag', tagType: 'primary' },
    { key: 'warranty', label: '保修期', value: '1年', type: 'text' }
  ],
  supplier: {
    name: '苹果科技（中国）有限公司',
    contact: '张经理',
    phone: '400-666-8800',
    email: 'contact@apple.com.cn',
    address: '北京市朝阳区建国门外大街1号国贸大厦1座'
  }
})

// 操作函数
const editProduct = () => {
  ElMessage.info('编辑产品功能')
}

const copyProduct = () => {
  ElMessage.success('产品信息已复制')
}

const exportProduct = () => {
  ElMessage.success('产品信息导出成功')
}

const deleteProduct = async () => {
  try {
    await ElMessageBox.confirm(
      '确定要删除这个产品吗？此操作不可恢复。',
      '确认删除',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
    ElMessage.success('产品删除成功')
  } catch {
    ElMessage.info('已取消删除')
  }
}
</script>

<style scoped>
.descriptions-container {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}

.product-name {
  font-weight: bold;
  color: #303133;
  font-size: 16px;
}

.product-price {
  font-size: 18px;
  font-weight: bold;
  color: #f56c6c;
}

.low-stock {
  color: #f56c6c;
  font-weight: bold;
}

.normal-stock {
  color: #67c23a;
  font-weight: bold;
}

.tech-specs {
  margin-top: 20px;
}

.supplier-info {
  margin-top: 20px;
}

.action-buttons {
  margin-top: 30px;
  text-align: center;
  padding: 20px;
  background: #f5f7fa;
  border-radius: 4px;
}

.action-buttons .el-button {
  margin: 0 10px;
}
</style>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| border | 是否带有边框 | boolean | — | false |
| column | 一行 Descriptions Item 的数量 | number | — | 3 |
| direction | 排列的方向 | string | vertical / horizontal | horizontal |
| size | 列表的尺寸 | string | large / default / small | default |
| title | 标题文本，显示在左上方 | string | — | — |
| extra | 操作区文本，显示在右上方 | string | — | — |
| colon | 是否显示冒号 | boolean | — | true |
| label-style | 自定义标签样式 | object | — | — |
| content-style | 自定义内容样式 | object | — | — |

#### Descriptions Item 属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| label | 标签文本 | string | — | — |
| span | 列的数量 | number | — | 1 |
| min-width | 标签和内容的最小宽度 | string / number | — | — |
| align | 标签和内容的对齐方式 | string | left / center / right | left |
| label-align | 标签的对齐方式 | string | left / center / right | — |
| content-align | 内容的对齐方式 | string | left / center / right | — |

#### 插槽
| 插槽名 | 说明 |
|--------|------|
| default | 描述列表的内容 |
| title | 自定义标题 |
| extra | 自定义操作区 |

#### Descriptions Item 插槽
| 插槽名 | 说明 |
|--------|------|
| default | 描述列表项的内容 |
| label | 自定义标签 |

#### 使用场景
1. **产品详情**: 产品信息展示页面
2. **用户资料**: 用户个人信息展示
3. **订单详情**: 订单信息展示
4. **系统配置**: 系统配置信息展示
5. **数据统计**: 统计数据展示
6. **文档信息**: 文档元信息展示
7. **设备信息**: 设备规格参数展示 