### 25. Virtualized Tree 虚拟化树形控件
- **用途**: 大数据量树形数据展示
- **特点**: 优化大数据量树形数据渲染性能

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-virtualized-tree
    :data="treeData1"
    :props="defaultProps"
    height="400"
    @node-click="handleNodeClick"
  />

  <!-- 可选择 -->
  <el-virtualized-tree
    :data="treeData2"
    :props="defaultProps"
    height="400"
    show-checkbox
    @check="handleCheck"
  />

  <!-- 可搜索 -->
  <el-virtualized-tree
    :data="treeData3"
    :props="defaultProps"
    height="400"
    :filter-node-method="filterNode"
    ref="virtualizedTree"
  />

  <!-- 懒加载 -->
  <el-virtualized-tree
    :props="lazyProps"
    height="400"
    :load="loadNode"
    lazy
    show-checkbox
  />

  <!-- 可拖拽 -->
  <el-virtualized-tree
    :data="treeData4"
    :props="defaultProps"
    height="400"
    draggable
    @node-drag-start="handleDragStart"
    @node-drag-enter="handleDragEnter"
    @node-drag-leave="handleDragLeave"
    @node-drag-end="handleDragEnd"
    @node-drop="handleDrop"
  />

  <!-- 自定义节点内容 -->
  <el-virtualized-tree
    :data="treeData5"
    :props="defaultProps"
    height="400"
    node-key="id"
    default-expand-all
  >
    <template #default="{ node, data }">
      <span class="custom-tree-node">
        <el-icon v-if="data.type === 'folder'">
          <Folder />
        </el-icon>
        <el-icon v-else>
          <Document />
        </el-icon>
        <span>{{ node.label }}</span>
        <span class="node-info">
          <el-tag size="small" v-if="data.count">{{ data.count }}项</el-tag>
        </span>
      </span>
    </template>
  </el-virtualized-tree>

  <!-- 不同尺寸 -->
  <el-virtualized-tree
    :data="treeData6"
    :props="defaultProps"
    height="400"
    size="large"
  />
  <el-virtualized-tree
    :data="treeData6"
    :props="defaultProps"
    height="400"
    size="default"
  />
  <el-virtualized-tree
    :data="treeData6"
    :props="defaultProps"
    height="400"
    size="small"
  />

  <!-- 在页面中使用 -->
  <div class="tree-container">
    <el-virtualized-tree
      :data="fileSystemData"
      :props="fileProps"
      height="500"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
      :filter-node-method="filterFileNode"
      @check="handleFileCheck"
      @node-click="handleFileNodeClick"
    >
      <template #default="{ node, data }">
        <span class="custom-tree-node">
          <el-icon v-if="data.type === 'folder'">
            <Folder />
          </el-icon>
          <el-icon v-else-if="data.type === 'image'">
            <Picture />
          </el-icon>
          <el-icon v-else-if="data.type === 'document'">
            <Document />
          </el-icon>
          <el-icon v-else>
            <Files />
          </el-icon>
          <span>{{ node.label }}</span>
          <span class="file-info">
            <el-tag size="small" type="info" v-if="data.size">{{ formatFileSize(data.size) }}</el-tag>
          </span>
        </span>
      </template>
    </el-virtualized-tree>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Folder, Document, Picture, Files } from '@element-plus/icons-vue'

// 生成大量树形数据用于演示虚拟化
const generateTreeData = (depth, breadth, count = 0) => {
  const data = []
  const maxCount = 1000 // 限制最大节点数
  
  for (let i = 0; i < breadth && count < maxCount; i++) {
    const node = {
      id: count + 1,
      label: `节点 ${count + 1}`,
      type: depth > 2 ? 'file' : 'folder',
      size: depth > 2 ? Math.floor(Math.random() * 1000000) : null,
      count: depth <= 2 ? Math.floor(Math.random() * 50) : null
    }
    
    if (depth > 1 && count < maxCount) {
      node.children = generateTreeData(depth - 1, Math.floor(breadth * 0.8), count + 1)
      count += node.children.length
    }
    
    data.push(node)
    count++
  }
  
  return data
}

const treeData1 = ref(generateTreeData(4, 10))
const treeData2 = ref(generateTreeData(4, 10))
const treeData3 = ref(generateTreeData(4, 10))
const treeData4 = ref(generateTreeData(4, 10))
const treeData5 = ref(generateTreeData(4, 10))
const treeData6 = ref(generateTreeData(4, 10))

const defaultProps = ref({
  children: 'children',
  label: 'label'
})

const lazyProps = ref({
  children: 'children',
  label: 'label',
  isLeaf: 'leaf'
})

const fileProps = ref({
  children: 'children',
  label: 'label'
})

// 文件系统数据
const fileSystemData = ref([
  {
    id: 1,
    label: '系统盘 (C:)',
    type: 'folder',
    children: [
      {
        id: 2,
        label: 'Program Files',
        type: 'folder',
        children: [
          {
            id: 3,
            label: 'Microsoft',
            type: 'folder',
            children: [
              {
                id: 4,
                label: 'Office',
                type: 'folder',
                children: [
                  { id: 5, label: 'Word.exe', type: 'file', size: 2048576 },
                  { id: 6, label: 'Excel.exe', type: 'file', size: 1536000 },
                  { id: 7, label: 'PowerPoint.exe', type: 'file', size: 1792000 }
                ]
              }
            ]
          },
          {
            id: 8,
            label: 'Google',
            type: 'folder',
            children: [
              { id: 9, label: 'Chrome.exe', type: 'file', size: 52428800 }
            ]
          }
        ]
      },
      {
        id: 10,
        label: 'Users',
        type: 'folder',
        children: [
          {
            id: 11,
            label: 'Administrator',
            type: 'folder',
            children: [
              {
                id: 12,
                label: 'Documents',
                type: 'folder',
                children: [
                  { id: 13, label: '工作文档.docx', type: 'document', size: 102400 },
                  { id: 14, label: '会议记录.docx', type: 'document', size: 51200 }
                ]
              },
              {
                id: 15,
                label: 'Pictures',
                type: 'folder',
                children: [
                  { id: 16, label: '头像.jpg', type: 'image', size: 204800 },
                  { id: 17, label: '背景.png', type: 'image', size: 1536000 }
                ]
              },
              {
                id: 18,
                label: 'Downloads',
                type: 'folder',
                children: [
                  { id: 19, label: '软件安装包.exe', type: 'file', size: 104857600 }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 20,
        label: 'Windows',
        type: 'folder',
        children: [
          { id: 21, label: 'explorer.exe', type: 'file', size: 4096000 },
          { id: 22, label: 'notepad.exe', type: 'file', size: 102400 }
        ]
      }
    ]
  },
  {
    id: 23,
    label: '数据盘 (D:)',
    type: 'folder',
    children: [
      {
        id: 24,
        label: '项目文件',
        type: 'folder',
        children: [
          { id: 25, label: '项目A', type: 'folder', children: [] },
          { id: 26, label: '项目B', type: 'folder', children: [] }
        ]
      },
      {
        id: 27,
        label: '备份文件',
        type: 'folder',
        children: []
      }
    ]
  }
])

const virtualizedTree = ref()

// 事件处理函数
const handleNodeClick = (data) => {
  console.log('节点点击:', data)
}

const handleCheck = (data, checked) => {
  console.log('节点选中:', data, checked)
}

const handleDragStart = (node, ev) => {
  console.log('拖拽开始:', node, ev)
}

const handleDragEnter = (draggingNode, dropNode, ev) => {
  console.log('拖拽进入:', draggingNode, dropNode, ev)
}

const handleDragLeave = (draggingNode, dropNode, ev) => {
  console.log('拖拽离开:', draggingNode, dropNode, ev)
}

const handleDragEnd = (draggingNode, dropNode, dropType, ev) => {
  console.log('拖拽结束:', draggingNode, dropNode, dropType, ev)
}

const handleDrop = (draggingNode, dropNode, dropType, ev) => {
  console.log('拖拽放置:', draggingNode, dropNode, dropType, ev)
}

const handleFileCheck = (data, checked) => {
  console.log('文件选中:', data, checked)
}

const handleFileNodeClick = (data) => {
  console.log('文件节点点击:', data)
}

// 懒加载函数
const loadNode = (node, resolve) => {
  if (node.level === 0) {
    resolve([
      { id: 1, label: '一级 1', leaf: false },
      { id: 2, label: '一级 2', leaf: false },
      { id: 3, label: '一级 3', leaf: false }
    ])
  } else if (node.level === 1) {
    resolve([
      { id: 4, label: '二级 1-1', leaf: true },
      { id: 5, label: '二级 1-2', leaf: true },
      { id: 6, label: '二级 1-3', leaf: true }
    ])
  } else {
    resolve([])
  }
}

// 搜索过滤函数
const filterNode = (value, data) => {
  if (!value) return true
  return data.label.indexOf(value) !== -1
}

// 文件搜索过滤函数
const filterFileNode = (value, data) => {
  if (!value) return true
  return data.label.toLowerCase().includes(value.toLowerCase())
}

// 文件大小格式化
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
</script>

<style scoped>
.tree-container {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.custom-tree-node .el-icon {
  margin-right: 8px;
}

.node-info {
  margin-left: auto;
}

.file-info {
  margin-left: auto;
}
</style>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| data | 展示数据 | array | — | [] |
| props | 配置选项，具体看下表 | object | — | — |
| height | 树的高度 | string / number | — | 400 |
| width | 树的宽度 | string / number | — | 100% |
| node-key | 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的 | string | — | id |
| empty-text | 内容为空的时候展示的文本 | string | — | 暂无数据 |
| render-after-expand | 是否在第一次展开某个树节点后才渲染其子节点 | boolean | — | true |
| load | 加载子节点数据的方法，仅当 lazy 为 true 时生效 | function(node, resolve) | — | — |
| render-content | 树节点的内容区的渲染 Function | Function(h, { node, data, store }) | — | — |
| highlight-current | 是否高亮当前选中节点，默认值是 false | boolean | — | false |
| default-expand-all | 是否默认展开所有节点 | boolean | — | false |
| expand-on-click-node | 是否在点击节点的时候展开或者收缩节点 | boolean | — | true |
| check-on-click-node | 是否在点击节点的时候选中节点 | boolean | — | false |
| auto-expand-parent | 展开子节点的时候是否自动展开父节点 | boolean | — | true |
| default-expanded-keys | 默认展开的节点的 key 的数组 | array | — | [] |
| show-checkbox | 节点是否可被选择 | boolean | — | false |
| check-strictly | 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法 | boolean | — | false |
| default-checked-keys | 默认勾选的节点的 key 的数组 | array | — | [] |
| current-node-key | 当前选中的节点 | string / number | — | — |
| filter-node-method | 对树节点进行筛选时执行的方法 | Function(value, data, node) | — | — |
| accordion | 是否每次只打开一个同级树节点 | boolean | — | false |
| indent | 相邻级节点间的水平缩进，单位为像素 | number | — | 16 |
| icon-class | 自定义树节点的图标 | string | — | — |
| lazy | 是否懒加载子节点数据 | boolean | — | false |
| draggable | 是否开启拖拽节点功能 | boolean | — | false |
| allow-drag | 判断节点能否被拖拽 | Function(node) | — | — |
| allow-drop | 拖拽时判定目标节点能否成为拖动目标位置 | Function(draggingNode, dropNode, type) | — | — |
| size | 树的大小 | string | large / default / small | default |
| row-height | 行高 | number | — | 40 |

#### Props 配置项
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| label | 指定节点标签为节点对象的某个属性值 | string, function(data, node) | — | — |
| children | 指定子树为节点对象的某个属性值 | string | — | — |
| disabled | 指定节点选择框是否禁用为节点对象的某个属性值 | string, function(data, node) | — | — |
| isLeaf | 指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效 | string, function(data, node) | — | — |

#### 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| node-click | 当节点被点击的时候触发 | 共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、事件对象 |
| node-contextmenu | 当某一节点被鼠标右键点击时会触发该事件 | 共四个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、事件对象 |
| check-change | 当复选框被点击的时候触发 | 共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、树目前的选中状态对象、事件对象 |
| check | 当复选框被点击的时候触发 | 共两个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、树目前的选中状态对象 |
| current-change | 当前选中节点变化时触发的事件 | 共两个参数，依次为：当前节点的数据，当前节点的 Node 对象 |
| node-expand | 节点被展开时触发的事件 | 共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、事件对象 |
| node-collapse | 节点被关闭时触发的事件 | 共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、事件对象 |
| node-drag-start | 节点开始拖拽时触发的事件 | 共两个参数，依次为：被拖拽节点对应的 Node、event |
| node-drag-enter | 拖拽进入其他节点时触发的事件 | 共三个参数，依次为：被拖拽节点对应的 Node、所进入节点对应的 Node、event |
| node-drag-leave | 拖拽离开某节点时触发的事件 | 共三个参数，依次为：被拖拽节点对应的 Node、所离开节点对应的 Node、event |
| node-drag-end | 拖拽结束时（可能未成功）触发的事件 | 共四个参数，依次为：被拖拽节点对应的 Node、结束拖拽时最后进入的节点（可能为空）、被拖拽节点的放置位置（before、after、inner）、event |
| node-drop | 拖拽成功完成时触发的事件 | 共四个参数，依次为：被拖拽节点对应的 Node、结束拖拽时最后进入的节点、被拖拽节点的放置位置（before、after、inner）、event |

#### 插槽
| 插槽名 | 说明 |
|--------|------|
| default | 自定义树节点的内容，参数为 { node, data } |

#### 使用场景
1. **大型文件系统**: 大量文件和文件夹的树形展示
2. **组织架构管理**: 大型企业的部门架构展示
3. **数据分类管理**: 大量数据的分类树展示
4. **权限管理系统**: 复杂的权限树展示
5. **产品目录**: 大型电商平台的产品分类
6. **知识库管理**: 大量文档的目录结构
7. **系统配置**: 复杂的系统配置项树形展示 