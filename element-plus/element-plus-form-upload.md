### 11. Upload 上传
- **用途**: 文件上传
- **特点**: 支持拖拽、多文件、进度显示

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-upload
    class="upload-demo"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    multiple
    :limit="3"
    :on-exceed="handleExceed"
    :file-list="fileList"
  >
    <el-button type="primary">点击上传</el-button>
    <template #tip>
      <div class="el-upload__tip">
        jpg/png 文件且不超过 500kb
      </div>
    </template>
  </el-upload>

  <!-- 拖拽上传 -->
  <el-upload
    class="upload-demo"
    drag
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    multiple
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :file-list="fileList"
    :before-upload="beforeUpload"
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      将文件拖到此处，或<em>点击上传</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        jpg/png 文件且不超过 500kb
      </div>
    </template>
  </el-upload>

  <!-- 图片列表 -->
  <el-upload
    v-model:file-list="fileList"
    list-type="picture-card"
    :auto-upload="false"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
  >
    <el-icon><plus /></el-icon>
  </el-upload>

  <!-- 头像上传 -->
  <el-upload
    class="avatar-uploader"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><plus /></el-icon>
  </el-upload>

  <!-- 手动上传 -->
  <el-upload
    ref="uploadRef"
    class="upload-demo"
    :auto-upload="false"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :on-change="handleChange"
    :file-list="fileList"
  >
    <el-button type="primary">选择文件</el-button>
    <template #tip>
      <div class="el-upload__tip">
        只能上传 jpg/png 文件，且不超过 500kb
      </div>
    </template>
  </el-upload>
  <el-button style="margin-left: 10px" type="success" @click="submitUpload">
    上传到服务器
  </el-button>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, UploadFilled } from '@element-plus/icons-vue'

const fileList = ref([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
  }
])

const imageUrl = ref('')
const uploadRef = ref()

const handleRemove = (file, fileList) => {
  console.log(file, fileList)
}

const handlePreview = (file) => {
  console.log(file)
}

const handleExceed = (files, fileList) => {
  ElMessage.warning(
    `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`
  )
}

const beforeRemove = (file, fileList) => {
  return ElMessageBox.confirm(
    `确定移除 ${file.name}？`
  ).then(
    () => true,
    () => false
  )
}

const beforeUpload = (file) => {
  const isJPG = file.type === 'image/jpeg'
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isJPG) {
    ElMessage.error('上传头像图片只能是 JPG 格式!')
  }
  if (!isLt2M) {
    ElMessage.error('上传头像图片大小不能超过 2MB!')
  }
  return isJPG && isLt2M
}

const handlePictureCardPreview = (file) => {
  imageUrl.value = file.url
  dialogVisible.value = true
}

const handleAvatarSuccess = (response, file) => {
  imageUrl.value = URL.createObjectURL(file.raw)
}

const beforeAvatarUpload = (file) => {
  const isJPG = file.type === 'image/jpeg'
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isJPG) {
    ElMessage.error('上传头像图片只能是 JPG 格式!')
  }
  if (!isLt2M) {
    ElMessage.error('上传头像图片大小不能超过 2MB!')
  }
  return isJPG && isLt2M
}

const handleChange = (file, fileList) => {
  console.log(file, fileList)
}

const submitUpload = () => {
  uploadRef.value.submit()
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| action | 必选参数，上传的地址 | string | — | — |
| headers | 设置上传的请求头部 | object | — | {} |
| method | 设置上传的请求方法 | string | post / put | post |
| multiple | 是否支持多选文件 | boolean | — | false |
| data | 上传时附带的额外参数 | object | — | {} |
| name | 上传的文件字段名 | string | — | file |
| with-credentials | 支持发送 cookie 凭证信息 | boolean | — | false |
| show-file-list | 是否显示已上传文件列表 | boolean | — | true |
| drag | 是否启用拖拽上传 | boolean | — | false |
| accept | 接受上传的文件类型（thumbnail-mode 模式下此参数无效） | string | — | — |
| on-preview | 点击已上传的文件链接时的钩子 | function(file) | — | — |
| on-remove | 文件列表移除文件时的钩子 | function(file, fileList) | — | — |
| on-success | 文件上传成功时的钩子 | function(response, file, fileList) | — | — |
| on-error | 文件上传失败时的钩子 | function(err, file, fileList) | — | — |
| on-progress | 文件上传时的钩子 | function(event, file, fileList) | — | — |
| on-change | 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用 | function(file, fileList) | — | — |
| before-upload | 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传 | function(file) | — | — |
| before-remove | 删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除 | function(file, fileList) | — | — |
| list-type | 文件列表的类型 | string | text / picture / picture-card | text |
| auto-upload | 是否在选取文件后立即进行上传 | boolean | — | true |
| file-list | 上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}] | array | — | [] |
| http-request | 覆盖默认的上传行为，可以自定义上传的实现 | function | — | — |
| disabled | 是否禁用 | boolean | — | false |
| limit | 最大允许上传个数 | number | — | — |
| on-exceed | 文件超出个数限制时的钩子 | function(files, fileList) | — | — |

#### 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 文件状态改变时的钩子 | (file, fileList) |
| remove | 文件列表移除文件时的钩子 | (file, fileList) |
| preview | 点击已上传的文件链接时的钩子 | (file) |
| success | 文件上传成功时的钩子 | (response, file, fileList) |
| error | 文件上传失败时的钩子 | (err, file, fileList) |
| progress | 文件上传时的钩子 | (event, file, fileList) |
| exceed | 文件超出个数限制时的钩子 | (files, fileList) |

#### 插槽
| 插槽名 | 说明 |
|--------|------|
| trigger | 触发文件选择框的内容 |
| tip | 提示说明文字 |

#### 使用场景
1. **文件上传**: 单文件或多文件上传
2. **图片上传**: 头像、图片列表上传
3. **拖拽上传**: 支持拖拽文件到指定区域
4. **手动上传**: 选择文件后手动触发上传
5. **文件预览**: 上传前预览文件内容
6. **进度显示**: 显示上传进度
7. **文件验证**: 上传前验证文件类型和大小 