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
            <el-button type="success" size="large" @click="testConnection">
              测试连接
            </el-button>
          </div>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
import ankiConnect from '../api/ankiConnect.js'

const router = useRouter()

const startApp = () => {
  router.push('/app/decks')
  ElMessage.success('欢迎使用 Anki Editor！')
}

const showSetup = () => {
  ElMessageBox.alert(`
<h3>Anki Editor 设置说明</h3>

<p><strong>前置要求:</strong></p>
<ul>
  <li>Anki 桌面应用 (版本 2.1 或更高)</li>
  <li>AnkiConnect 插件 (版本 6 或更高)</li>
</ul>

<p><strong>安装步骤:</strong></p>
<ol>
  <li>下载并安装 <a href="https://apps.ankiweb.net/" target="_blank">Anki 桌面应用</a></li>
  <li>打开 Anki，进入 <code>工具</code> > <code>附加组件</code></li>
  <li>点击 <code>获取附加组件</code></li>
  <li>输入插件代码: <code>2055492159</code></li>
  <li>重启 Anki 应用</li>
</ol>

<p><strong>使用说明:</strong></p>
<ul>
  <li>确保 Anki 正在运行</li>
  <li>点击"进入应用"开始使用</li>
  <li>在应用中点击连接状态标签测试连接</li>
</ul>

<p><strong>功能特性:</strong></p>
<ul>
  <li>牌组管理 - 创建、编辑、删除牌组</li>
  <li>卡片浏览 - 多维度筛选和预览卡片</li>
  <li>笔记管理 - 管理笔记类型和字段</li>
  <li>标签管理 - 创建、编辑、批量管理标签</li>
  <li>统计信息 - 详细的学习统计和进度分析</li>
</ul>
  `, '设置说明', {
    dangerouslyUseHTMLString: true,
    confirmButtonText: '我知道了',
    customClass: 'setup-guide-dialog'
  })
}

const testConnection = async () => {
  try {
    ElMessage.info('正在测试 AnkiConnect 连接...')
    const connected = await ankiConnect.testConnection()
    
    if (connected) {
      ElMessage.success('连接成功！AnkiConnect 已正确配置。')
      // 可以选择自动进入应用
      ElMessageBox.confirm(
        '连接测试成功！是否立即进入应用？',
        '连接成功',
        {
          confirmButtonText: '进入应用',
          cancelButtonText: '稍后进入',
          type: 'success'
        }
      ).then(() => {
        startApp()
      }).catch(() => {
        // 用户选择稍后进入
      })
    } else {
      ElMessage.error('连接失败，请检查 Anki 是否正在运行且 AnkiConnect 插件已安装。')
    }
  } catch (error) {
    ElMessage.error(`连接测试失败: ${error.message}`)
  }
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