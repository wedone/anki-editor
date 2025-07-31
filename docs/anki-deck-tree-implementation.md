# Anki 牌组树形结构实现文档

## 概述

本文档详细说明了如何将 Anki 牌组数据转换为 Element Plus 的 `el-tree` 树形结构，实现父子节点的层级显示。

## 1. 数据源分析

### 1.1 Anki 牌组命名规则

Anki 牌组使用 `::` 分隔符来表示层级关系：

```javascript
// 示例牌组名称
"[化学]::[元素周期律与方"
"[化学]::[基础概念&会考"
"*Lexical Ladder::List 01"
"*Quizify by 廖央 @chehil::格"
"[Forum]::ClozeAdv"
```

### 1.2 数据结构

```typescript
interface Deck {
  name: string;  // 完整的牌组名称，包含 :: 分隔符
  // 其他属性...
}
```

## 2. 树形结构构建算法

### 2.1 核心实现

```typescript
const deckTreeData = computed(() => {
  const deckMap = new Map<string, any>()
  const rootNodes: any[] = []
  
  // 处理所有牌组，构建树形结构
  ankiStore.decks.forEach(deck => {
    const deckName = deck.name
    const parts = deckName.split('::').filter(part => part.trim() !== '')
    
    if (parts.length === 0) return
    
    let currentPath = ''
    let parentNode: any = null
    
    parts.forEach((part, index) => {
      const isLeaf = index === parts.length - 1
      const fullPath = currentPath ? `${currentPath}::${part}` : part
      
      // 检查节点是否已存在
      if (!deckMap.has(fullPath)) {
        const node = {
          id: fullPath,
          name: part.trim(),
          type: isLeaf ? 'deck' : 'folder',
          children: [],
          fullName: fullPath
        }
        deckMap.set(fullPath, node)
        
        // 添加到父节点或根节点
        if (parentNode) {
          parentNode.children.push(node)
        } else {
          rootNodes.push(node)
        }
      }
      
      parentNode = deckMap.get(fullPath)
      currentPath = fullPath
    })
  })
  
  return rootNodes
})
```

### 2.2 算法步骤详解

1. **初始化数据结构**
   - `deckMap`: 用于存储已创建的节点，避免重复
   - `rootNodes`: 存储根节点数组

2. **遍历牌组数据**
   - 对每个牌组名称进行 `::` 分割
   - 过滤空字符串部分
   - 跳过完全空的牌组名称

3. **构建节点层级**
   - 逐级创建节点
   - 判断是否为叶子节点（最后一个部分）
   - 建立父子关系

4. **节点属性设置**
   - `id`: 完整路径作为唯一标识
   - `name`: 当前层级的名称
   - `type`: 'deck'（叶子节点）或 'folder'（中间节点）
   - `children`: 子节点数组（叶子节点为空数组或undefined）
   - `fullName`: 完整路径

## 3. Element Plus Tree 组件配置

### 3.1 基础配置

```vue
<el-tree
  :data="deckTreeData"
  :props="treeProps"
  node-key="id"
  :expand-on-click-node="true"
  :check-on-click-node="true"
  :highlight-current="true"
  accordion
  @node-click="handleDeckClick"
>
  <template #default="{ node, data }">
    <span class="tree-node">
      <el-icon v-if="data.type === 'folder'"><Folder /></el-icon>
      <el-icon v-else-if="data.type === 'deck'"><Document /></el-icon>
      <el-icon v-else><Folder /></el-icon>
      {{ node.label }}
    </span>
  </template>
</el-tree>
```

### 3.2 属性说明

| 属性 | 值 | 说明 |
|------|----|----|
| `data` | `deckTreeData` | 树形数据源 |
| `props` | `treeProps` | 节点属性配置 |
| `node-key` | `"id"` | 节点唯一标识字段 |
| `expand-on-click-node` | `true` | 点击节点时展开/收起 |
| `check-on-click-node` | `true` | 点击节点时选中/取消选中 |
| `highlight-current` | `true` | 高亮当前选中节点 |
| `accordion` | `true` | 手风琴模式，同时只能展开一个父节点 |

### 3.3 节点属性配置

```typescript
const treeProps = {
  children: 'children',
  label: 'name'
}
```

## 4. 交互处理

### 4.1 点击事件处理

```typescript
const handleDeckClick = (data: any, node: any) => {
  console.log('点击牌组:', data)
  
  // 使用Element Plus标准方式判断叶子节点
  if (!data.children || data.children.length === 0) {
    currentModule.value = '牌组管理'
    router.push('/decks')
  }
}
```

### 4.2 Element Plus 事件参数说明

`el-tree` 的 `node-click` 事件提供以下参数：

- `data`: 当前节点的数据对象
- `node`: 当前节点的 Node 对象，包含更多节点信息

**判断叶子节点的标准方式**：
```typescript
// 方式1：检查children属性
if (!data.children || data.children.length === 0) {
  // 这是叶子节点
}

// 方式2：使用node对象的isLeaf属性
if (node.isLeaf) {
  // 这是叶子节点
}
```

## 5. 样式设计

### 5.1 CSS 变量使用

遵循 Element Plus 设计规范，使用 CSS 变量：

```css
.tree-node {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  color: var(--el-text-color-regular);
  transition: var(--el-transition-duration);
  padding: 2px 0;
}

.tree-node:hover {
  color: var(--el-color-primary);
}

.tree-node .el-icon {
  font-size: 14px;
  transition: var(--el-transition-duration);
}

.tree-node:hover .el-icon {
  transform: scale(1.1);
}
```

### 5.2 图标区分

- **文件夹节点**: `<Folder />` 图标
- **牌组节点**: `<Document />` 图标

## 6. 数据结构示例

### 6.1 输入数据

```javascript
const ankiDecks = [
  { name: "[化学]::[元素周期律与方" },
  { name: "[化学]::[基础概念&会考" },
  { name: "*Lexical Ladder::List 01" },
  { name: "*Quizify by 廖央 @chehil::格" },
  { name: "[Forum]::ClozeAdv" }
]
```

### 6.2 输出树形结构

```javascript
const treeData = [
  {
    id: "[化学]",
    name: "[化学]",
    type: "folder",
    children: [
      {
        id: "[化学]::[元素周期律与方",
        name: "[元素周期律与方",
        type: "deck",
        fullName: "[化学]::[元素周期律与方"
      },
      {
        id: "[化学]::[基础概念&会考",
        name: "[基础概念&会考",
        type: "deck",
        fullName: "[化学]::[基础概念&会考"
      }
    ]
  },
  {
    id: "*Lexical Ladder",
    name: "*Lexical Ladder",
    type: "folder",
    children: [
      {
        id: "*Lexical Ladder::List 01",
        name: "List 01",
        type: "deck",
        fullName: "*Lexical Ladder::List 01"
      }
    ]
  }
  // ... 其他节点
]
```

## 7. 性能优化

### 7.1 计算属性缓存

使用 `computed` 属性确保数据变化时自动更新：

```typescript
const deckTreeData = computed(() => {
  // 树形结构构建逻辑
})
```

### 7.2 事件处理优化

直接使用 Element Plus 的事件处理机制，无需额外的防抖处理：

```typescript
const handleDeckClick = (data: any, node: any) => {
  // 处理逻辑
}
```

## 8. 扩展功能

### 8.1 牌组数量统计

```vue
<template #title>
  <div class="collapse-title">
    <el-icon><Folder /></el-icon>
    <span>牌组管理</span>
    <el-tag size="small" type="info" class="deck-count">
      {{ ankiStore.decks.length }}
    </el-tag>
  </div>
</template>
```

### 8.2 搜索功能

可以扩展添加搜索功能，过滤显示特定牌组。

## 9. 最佳实践

1. **数据验证**: 过滤空字符串，处理特殊字符
2. **性能优化**: 使用计算属性缓存
3. **用户体验**: 清晰的视觉反馈，直观的交互
4. **设计规范**: 遵循 Element Plus 设计规范
5. **可维护性**: 清晰的代码结构，详细的注释

## 10. 总结

通过这个实现，我们成功地将 Anki 的扁平牌组数据转换为具有层级关系的树形结构，提供了更好的用户体验和更清晰的数据展示。整个实现遵循了 Element Plus 的设计规范，具有良好的性能和可维护性。 