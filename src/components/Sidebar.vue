<template>
  <div class="sidebar-content">
    <!-- 折叠控制按钮 -->
    <div class="collapse-control">
      <el-button 
        type="text" 
        @click="toggleCollapse"
        class="collapse-btn"
        :title="isCollapsed ? '展开侧边栏' : '折叠侧边栏'"
      >
        <el-icon v-if="!isCollapsed"><Fold /></el-icon>
        <el-icon v-else><Expand /></el-icon>
      </el-button>
      <div class="shortcut-hint" v-if="!isCollapsed">
        <small>Ctrl+B</small>
      </div>
    </div>
    
    <!-- 菜单 -->
    <el-menu
      :default-active="activeMenu"
      class="sidebar-menu"
      :collapse="isCollapsed"
      @select="handleMenuSelect"
    >
      <!-- 牌组管理 -->
      <el-menu-item index="deck-manager">
        <el-icon><Folder /></el-icon>
        <template #title>牌组管理</template>
      </el-menu-item>
      
      <!-- 卡片列表 -->
      <el-menu-item 
        index="card-list"
        :disabled="!currentDeck"
      >
        <el-icon><Document /></el-icon>
        <template #title>卡片列表</template>
      </el-menu-item>
      
      <!-- 字段编辑 -->
      <el-menu-item 
        index="field-editor"
        :disabled="!currentCard"
      >
        <el-icon><Edit /></el-icon>
        <template #title>字段编辑</template>
      </el-menu-item>
      
      <!-- 预览模式 -->
      <el-menu-item 
        index="preview"
        :disabled="!currentCard"
      >
        <el-icon><View /></el-icon>
        <template #title>预览模式</template>
      </el-menu-item>
      
      <!-- 分隔线 -->
      <el-divider />
      
      <!-- 设置 -->
      <el-menu-item index="settings">
        <el-icon><Setting /></el-icon>
        <template #title>设置</template>
      </el-menu-item>
      
      <!-- API 测试 -->
      <el-menu-item index="api-tester">
        <el-icon><Connection /></el-icon>
        <template #title>API 测试</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { Folder, Document, Edit, View, Setting, Fold, Expand, Connection } from '@element-plus/icons-vue'

export default {
  name: 'Sidebar',
  components: {
    Folder,
    Document,
    Edit,
    View,
    Setting,
    Fold,
    Expand,
    Connection
  },
  props: {
    currentDeck: {
      type: Object,
      default: null
    },
    currentCard: {
      type: Object,
      default: null
    },
    activeMenu: {
      type: String,
      default: 'deck-manager'
    },
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  emits: ['menu-select', 'collapse-change'],
  setup(props, { emit }) {
    const isCollapsed = ref(props.collapsed)

    // 监听外部折叠状态变化
    const updateCollapsedState = (newState) => {
      isCollapsed.value = newState
    }

    const handleMenuSelect = (index) => {
      emit('menu-select', index)
    }

    const toggleCollapse = () => {
      isCollapsed.value = !isCollapsed.value
      emit('collapse-change', isCollapsed.value)
    }

    // 监听 props.collapsed 变化
    if (props.collapsed !== isCollapsed.value) {
      isCollapsed.value = props.collapsed
    }

    return {
      isCollapsed,
      handleMenuSelect,
      toggleCollapse
    }
  }
}
</script>

<style scoped>
.sidebar-content {
  background-color: #f5f7fa;
  border-right: 1px solid #e4e7ed;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.collapse-control {
  padding: 12px;
  border-bottom: 1px solid #e4e7ed;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.collapse-btn {
  color: #606266;
  font-size: 16px;
}

.collapse-btn:hover {
  color: #409EFF;
}

.shortcut-hint {
  font-size: 10px;
  color: #909399;
  opacity: 0.8;
}

.sidebar-menu {
  border-right: none;
  flex: 1;
}

.sidebar-menu .el-menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.sidebar-menu .el-menu-item .el-icon {
  margin-right: 0;
}

/* 折叠时的样式调整 */
.sidebar-menu.el-menu--collapse {
  width: 64px;
}

.sidebar-menu.el-menu--collapse .el-menu-item {
  padding: 0 20px;
}

/* 分隔线样式 */
.el-divider {
  margin: 8px 0;
}

/* 禁用状态的菜单项 */
.sidebar-menu .el-menu-item.is-disabled {
  color: #c0c4cc;
  cursor: not-allowed;
}

.sidebar-menu .el-menu-item.is-disabled .el-icon {
  color: #c0c4cc;
}

/* 折叠时的控制按钮样式 */
.sidebar-menu.el-menu--collapse + .collapse-control {
  padding: 8px;
}

.sidebar-menu.el-menu--collapse ~ .collapse-control .shortcut-hint {
  display: none;
}
</style> 