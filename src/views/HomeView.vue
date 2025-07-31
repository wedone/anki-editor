<template>
  <div class="home">
    <el-container>
      <el-header>
        <h1>Anki Editor</h1>
      </el-header>
      <el-main>
        <el-card>
          <template #header>
            <span>欢迎使用 Anki Editor</span>
          </template>
          <p>这是一个自定义的 Anki 客户端，使用 Vue 3 + Element Plus 构建。</p>
          <div class="action-buttons">
            <el-button type="primary" size="large" @click="startApp">
              进入应用
            </el-button>
            <el-button size="large" @click="showSetup">
              查看设置说明
            </el-button>
          </div>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()

const startApp = () => {
  router.push('/app/decks')
  ElMessage.success('欢迎使用 Anki Editor！')
}

const showSetup = () => {
  ElMessage.info('请确保 Anki 正在运行且已安装 AnkiConnect 插件')
}
</script>

<style scoped>
.home {
  height: 100vh;
}

.el-header {
  background-color: #409eff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.el-header h1 {
  margin: 0;
  font-size: 24px;
}

.el-main {
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-card {
  max-width: 500px;
  text-align: center;
}

.el-card p {
  margin: 20px 0;
  color: #606266;
}

.action-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 20px;
}
</style> 