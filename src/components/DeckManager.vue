<template>
  <div class="deck-manager">
    <el-card>
      <template #header>
        <div class="card-header">
          <el-icon><Folder /></el-icon>
          <span>牌组管理</span>
        </div>
      </template>
      
      <!-- 连接状态检查 -->
      <div v-if="!connectionStatus.connected" class="connection-error">
        <el-alert
          title="无法连接到 AnkiConnect"
          type="error"
          :description="connectionStatus.error || '请确保 Anki 已启动并安装了 AnkiConnect 插件'"
          show-icon
          :closable="false"
        />
        
        <!-- AnkiConnect 设置说明 -->
        <el-card style="margin-top: 16px;">
          <template #header>
            <div class="setup-header">
              <el-icon><InfoFilled /></el-icon>
              <span>AnkiConnect 设置说明</span>
            </div>
          </template>
          
          <div class="setup-steps">
            <ol>
              <li>
                <strong>启动 Anki 桌面应用</strong>
                <p>确保 Anki 正在运行</p>
              </li>
              <li>
                <strong>安装 AnkiConnect 插件</strong>
                <p>在 Anki 中：工具 → 附加组件 → 获取附加组件</p>
                <p>搜索 "AnkiConnect" 并安装（插件代码：2055492159）</p>
              </li>
              <li>
                <strong>重启 Anki</strong>
                <p>安装完成后重启 Anki 应用</p>
              </li>
              <li>
                <strong>验证连接</strong>
                <p>点击下方"重新连接"按钮测试连接</p>
              </li>
            </ol>
          </div>
        </el-card>
        
        <el-button 
          type="primary" 
          @click="checkConnection"
          style="margin-top: 16px"
        >
          重新连接
        </el-button>
      </div>
      
      <!-- 牌组列表 -->
      <div v-else>
        <div class="deck-list-header">
          <h3>选择牌组</h3>
          <div class="header-actions">
            <el-tag type="success" size="small">
              <el-icon><CircleCheck /></el-icon>
              已连接 ({{ connectionStatus.version }})
            </el-tag>
            <el-button 
              type="primary" 
              size="small"
              @click="refreshDeckList"
              :loading="loading"
            >
              <el-icon><Refresh /></el-icon>
              刷新
            </el-button>
          </div>
        </div>
        
        <el-table 
          :data="deckList" 
          style="width: 100%"
          @row-click="handleDeckSelect"
          :row-class-name="getRowClassName"
        >
          <el-table-column prop="name" label="牌组名称" />
          <el-table-column label="操作" width="120">
            <template #default="scope">
              <el-button 
                type="primary" 
                size="small"
                @click.stop="handleDeckSelect(scope.row)"
              >
                选择
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        
        <div v-if="deckList.length === 0" class="empty-state">
          <el-empty description="暂无牌组" />
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { Folder, Refresh, InfoFilled, CircleCheck } from '@element-plus/icons-vue'
import { checkConnection, getDeckList } from '../services/ankiConnect/index.js'

export default {
  name: 'DeckManager',
  components: {
    Folder,
    Refresh,
    InfoFilled,
    CircleCheck
  },
  props: {
    currentDeck: {
      type: Object,
      default: null
    }
  },
  emits: ['deck-select'],
  setup(props, { emit }) {
    const connectionStatus = reactive({
      connected: false,
      error: null,
      version: null
    })
    
    const deckList = ref([])
    const loading = ref(false)

    // 检查连接状态
    const checkConnectionStatus = async () => {
      try {
        const result = await checkConnection()
        connectionStatus.connected = result.connected
        connectionStatus.error = result.error
        connectionStatus.version = result.version
        
        if (result.connected) {
          await loadDeckList()
        }
      } catch (error) {
        connectionStatus.connected = false
        connectionStatus.error = error.message
      }
    }

    // 加载牌组列表
    const loadDeckList = async () => {
      try {
        loading.value = true
        deckList.value = await getDeckList()
      } catch (error) {
        console.error('加载牌组列表失败:', error)
        ElMessage.error('加载牌组列表失败')
      } finally {
        loading.value = false
      }
    }

    // 刷新牌组列表
    const refreshDeckList = async () => {
      await checkConnectionStatus()
    }

    // 选择牌组
    const handleDeckSelect = (deck) => {
      emit('deck-select', deck)
    }

    // 获取行样式
    const getRowClassName = ({ row }) => {
      if (props.currentDeck && row.id === props.currentDeck.id) {
        return 'selected-row'
      }
      return ''
    }

    onMounted(() => {
      checkConnectionStatus()
    })

    return {
      connectionStatus,
      deckList,
      loading,
      checkConnection: checkConnectionStatus,
      refreshDeckList,
      handleDeckSelect,
      getRowClassName
    }
  }
}
</script>

<style scoped>
.deck-manager {
  padding: 20px;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
}

.connection-error {
  text-align: center;
  padding: 20px;
}

.setup-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
}

.setup-steps {
  text-align: left;
  padding: 16px 0;
}

.setup-steps ol {
  margin: 0;
  padding-left: 20px;
}

.setup-steps li {
  margin-bottom: 12px;
}

.setup-steps strong {
  color: #409EFF;
}

.setup-steps p {
  margin: 4px 0 0 0;
  color: #606266;
  font-size: 14px;
}

.deck-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.deck-list-header h3 {
  margin: 0;
  color: #303133;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.empty-state {
  padding: 40px 0;
  text-align: center;
}

:deep(.selected-row) {
  background-color: #f0f9ff !important;
}

:deep(.selected-row td) {
  background-color: #f0f9ff !important;
}
</style> 