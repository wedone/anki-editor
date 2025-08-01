<template>
  <div id="app">
    <el-container class="app-container">
      <!-- Header -->
      <el-header class="app-header">
        <Header 
          :current-deck="currentDeck"
          :connection-status="connectionStatus"
        />
      </el-header>
      
      <el-container>
        <!-- Sidebar -->
        <el-aside :width="sidebarWidth">
          <Sidebar 
            :current-deck="currentDeck"
            :current-card="currentCard"
            :active-menu="activeMenu"
            :collapsed="isSidebarCollapsed"
            @menu-select="handleMenuSelect"
            @collapse-change="handleCollapseChange"
          />
        </el-aside>
        
        <!-- Main Content -->
        <el-main class="app-main">
          <!-- 牌组管理 -->
          <DeckManager 
            v-if="activeMenu === 'deck-manager'"
            :current-deck="currentDeck"
            @deck-select="handleDeckSelect"
          />
          
          <!-- 卡片列表 -->
          <CardList 
            v-else-if="activeMenu === 'card-list'"
            :current-deck="currentDeck"
            :current-card="currentCard"
            @card-select="handleCardSelect"
            @preview-card="handlePreviewCard"
            @card-list-updated="updateCardList"
          />
          
          <!-- 字段编辑 -->
          <FieldEditor 
            v-else-if="activeMenu === 'field-editor'"
            :current-deck="currentDeck"
            :current-card="currentCard"
            :card-list="cardList"
            :current-card-index="currentCardIndex"
            @card-updated="handleCardUpdated"
            @navigate-card="handleNavigateCard"
          />
          
          <!-- 预览模式 -->
          <Preview 
            v-else-if="activeMenu === 'preview'"
            :current-deck="currentDeck"
            :current-card="currentCard"
          />
          
          <!-- 设置 -->
          <Settings 
            v-else-if="activeMenu === 'settings'"
          />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import DeckManager from './components/DeckManager.vue'
import CardList from './components/CardList.vue'
import FieldEditor from './components/FieldEditor.vue'
import Preview from './components/Preview.vue'
import Settings from './components/Settings.vue'

export default {
  name: 'App',
  components: {
    Header,
    Sidebar,
    DeckManager,
    CardList,
    FieldEditor,
    Preview,
    Settings
  },
  setup() {
    const activeMenu = ref('deck-manager')
    const currentDeck = ref(null)
    const currentCard = ref(null)
    const cardList = ref([])
    const currentCardIndex = ref(0)
    const isSidebarCollapsed = ref(false)
    const connectionStatus = reactive({
      connected: false,
      error: null
    })

    // 计算侧边栏宽度
    const sidebarWidth = computed(() => {
      return isSidebarCollapsed.value ? '64px' : '200px'
    })

    // 处理菜单选择
    const handleMenuSelect = (menuIndex) => {
      activeMenu.value = menuIndex
    }

    // 处理折叠状态变化
    const handleCollapseChange = (collapsed) => {
      isSidebarCollapsed.value = collapsed
    }

    // 切换侧边栏折叠状态
    const toggleSidebar = () => {
      isSidebarCollapsed.value = !isSidebarCollapsed.value
      ElMessage.success(isSidebarCollapsed.value ? '侧边栏已折叠' : '侧边栏已展开')
    }

    // 键盘事件处理
    const handleKeydown = (event) => {
      // Ctrl+B 切换侧边栏
      if (event.ctrlKey && event.key === 'b') {
        event.preventDefault()
        toggleSidebar()
      }
    }

    // 处理牌组选择
    const handleDeckSelect = (deck) => {
      currentDeck.value = deck
      currentCard.value = null // 清空当前卡片
      cardList.value = [] // 清空卡片列表
      currentCardIndex.value = 0 // 重置索引
      ElMessage.success(`已选择牌组: ${deck.name}`)
      
      // 自动切换到卡片列表
      activeMenu.value = 'card-list'
    }

    // 处理卡片选择
    const handleCardSelect = (card) => {
      currentCard.value = card
      // 找到卡片在列表中的索引
      const index = cardList.value.findIndex(c => c.cardId === card.cardId)
      currentCardIndex.value = index >= 0 ? index : 0
      ElMessage.success(`已选择卡片: ${card.cardId}`)
      
      // 自动切换到字段编辑
      activeMenu.value = 'field-editor'
    }

    // 处理预览卡片
    const handlePreviewCard = (card) => {
      currentCard.value = card
      activeMenu.value = 'preview'
    }

    // 处理卡片更新
    const handleCardUpdated = (card) => {
      ElMessage.success('卡片已更新')
      // 可以在这里添加额外的更新逻辑
    }

    // 处理卡片导航
    const handleNavigateCard = (newIndex) => {
      if (newIndex >= 0 && newIndex < cardList.value.length) {
        currentCardIndex.value = newIndex
        currentCard.value = cardList.value[newIndex]
        ElMessage.success(`已切换到卡片: ${currentCard.value.cardId}`)
      }
    }

    // 更新卡片列表（从 CardList 组件接收）
    const updateCardList = (cards) => {
      cardList.value = cards
    }

    // 生命周期钩子
    onMounted(() => {
      document.addEventListener('keydown', handleKeydown)
    })

    onUnmounted(() => {
      document.removeEventListener('keydown', handleKeydown)
    })

    return {
      activeMenu,
      currentDeck,
      currentCard,
      cardList,
      currentCardIndex,
      isSidebarCollapsed,
      sidebarWidth,
      connectionStatus,
      handleMenuSelect,
      handleCollapseChange,
      toggleSidebar,
      handleDeckSelect,
      handleCardSelect,
      handlePreviewCard,
      handleCardUpdated,
      handleNavigateCard,
      updateCardList
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
  margin: 0;
  padding: 0;
}

.app-container {
  height: 100vh;
}

.app-header {
  padding: 0;
  height: auto;
}

.app-main {
  background-color: #f5f7fa;
  padding: 0;
}

/* 侧边栏过渡动画 */
.el-aside {
  transition: width 0.3s ease;
}
</style> 