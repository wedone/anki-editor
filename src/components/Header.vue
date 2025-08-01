<template>
  <div class="header-content">
    <el-row justify="space-between" align="middle" style="height: 100%">
      <!-- 左侧：应用标题 -->
      <el-col :span="12">
        <div class="app-title">
          <el-icon><Document /></el-icon>
          <span>Anki Editor</span>
        </div>
      </el-col>
      
      <!-- 右侧：连接状态和当前牌组 -->
      <el-col :span="12">
        <div class="header-right">
          <!-- 连接状态 -->
          <el-tag 
            :type="connectionStatus.connected ? 'success' : 'danger'"
            size="small"
            class="connection-status"
          >
            <el-icon v-if="connectionStatus.connected"><CircleCheck /></el-icon>
            <el-icon v-else><CircleClose /></el-icon>
            {{ connectionStatus.connected ? '已连接' : '未连接' }}
          </el-tag>
          
          <!-- 当前牌组 -->
          <el-tag 
            v-if="currentDeck"
            type="info" 
            size="small"
            class="current-deck"
          >
            <el-icon><Folder /></el-icon>
            {{ currentDeck.name }}
          </el-tag>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { Document, CircleCheck, CircleClose, Folder } from '@element-plus/icons-vue'

export default {
  name: 'Header',
  components: {
    Document,
    CircleCheck,
    CircleClose,
    Folder
  },
  props: {
    currentDeck: {
      type: Object,
      default: null
    }
  },
  setup() {
    const connectionStatus = reactive({
      connected: false,
      error: null
    })

    return {
      connectionStatus
    }
  }
}
</script>

<style scoped>
.header-content {
  background-color: #409EFF;
  color: white;
  padding: 0 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 60px;
  display: flex;
  align-items: center;
}

.app-title {
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
}

.app-title .el-icon {
  margin-right: 8px;
  font-size: 20px;
}

.header-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
}

.connection-status {
  display: flex;
  align-items: center;
  gap: 4px;
}

.current-deck {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style> 