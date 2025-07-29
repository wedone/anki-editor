### 24. Tree 树形控件
- **用途**: 树形数据展示
- **特点**: 支持多级数据展示、选择、编辑

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-tree
    :data="data1"
    :props="defaultProps"
    @node-click="handleNodeClick"
  />

  <!-- 可选择 -->
  <el-tree
    :data="data2"
    :props="defaultProps"
    show-checkbox
    @check="handleCheck"
  />

  <!-- 手风琴模式 -->
  <el-tree
    :data="data3"
    :props="defaultProps"
    :accordion="true"
    @node-click="handleNodeClick"
  />

  <!-- 可拖拽 -->
  <el-tree
    :data="data4"
    :props="defaultProps"
    draggable
    @node-drag-start="handleDragStart"
    @node-drag-enter="handleDragEnter"
    @node-drag-leave="handleDragLeave"
    @node-drag-end="handleDragEnd"
    @node-drop="handleDrop"
  />

  <!-- 可编辑 -->
  <el-tree
    :data="data5"
    :props="defaultProps"
    :expand-on-click-node="false"
    default-expand-all
    node-key="id"
    highlight-current
    :allow-drop="allowDrop"
    :allow-drag="allowDrag"
  >
    <template #default="{ node, data }">
      <span class="custom-tree-node">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            type="text"
            size="small"
            @click="() => append(data)"
          >
            Append
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="() => remove(node, data)"
          >
            Delete
          </el-button>
        </span>
      </span>
    </template>
  </el-tree>

  <!-- 懒加载 -->
  <el-tree
    :props="lazyProps"
    :load="loadNode"
    lazy
    show-checkbox
  />

  <!-- 可搜索 -->
  <el-tree
    :data="data6"
    :props="defaultProps"
    :filter-node-method="filterNode"
    ref="tree"
  />

  <!-- 不同尺寸 -->
  <el-tree
    :data="data7"
    :props="defaultProps"
    size="large"
  />
  <el-tree
    :data="data7"
    :props="defaultProps"
    size="default"
  />
  <el-tree
    :data="data7"
    :props="defaultProps"
    size="small"
  />

  <!-- 在页面中使用 -->
  <div class="tree-container">
    <el-tree
      :data="fileData"
      :props="fileProps"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
      @check="handleFileCheck"
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
        </span>
      </template>
    </el-tree>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import { Folder, Document } from '@element-plus/icons-vue'

const data1 = ref([
  {
    id: 1,
    label: '一级 1',
    children: [
      {
        id: 4,
        label: '二级 1-1',
        children: [
          {
            id: 9,
            label: '三级 1-1-1'
          },
          {
            id: 10,
            label: '三级 1-1-2'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    label: '一级 2',
    children: [
      {
        id: 5,
        label: '二级 2-1'
      },
      {
        id: 6,
        label: '二级 2-2'
      }
    ]
  },
  {
    id: 3,
    label: '一级 3',
    children: [
      {
        id: 7,
        label: '二级 3-1'
      },
      {
        id: 8,
        label: '二级 3-2'
      }
    ]
  }
])

const data2 = ref([
  {
    id: 1,
    label: '一级 1',
    children: [
      {
        id: 4,
        label: '二级 1-1',
        children: [
          {
            id: 9,
            label: '三级 1-1-1'
          },
          {
            id: 10,
            label: '三级 1-1-2'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    label: '一级 2',
    children: [
      {
        id: 5,
        label: '二级 2-1'
      },
      {
        id: 6,
        label: '二级 2-2'
      }
    ]
  },
  {
    id: 3,
    label: '一级 3',
    children: [
      {
        id: 7,
        label: '二级 3-1'
      },
      {
        id: 8,
        label: '二级 3-2'
      }
    ]
  }
])

const data3 = ref([
  {
    id: 1,
    label: '一级 1',
    children: [
      {
        id: 4,
        label: '二级 1-1',
        children: [
          {
            id: 9,
            label: '三级 1-1-1'
          },
          {
            id: 10,
            label: '三级 1-1-2'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    label: '一级 2',
    children: [
      {
        id: 5,
        label: '二级 2-1'
      },
      {
        id: 6,
        label: '二级 2-2'
      }
    ]
  },
  {
    id: 3,
    label: '一级 3',
    children: [
      {
        id: 7,
        label: '二级 3-1'
      },
      {
        id: 8,
        label: '二级 3-2'
      }
    ]
  }
])

const data4 = ref([
  {
    id: 1,
    label: '一级 1',
    children: [
      {
        id: 4,
        label: '二级 1-1',
        children: [
          {
            id: 9,
            label: '三级 1-1-1'
          },
          {
            id: 10,
            label: '三级 1-1-2'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    label: '一级 2',
    children: [
      {
        id: 5,
        label: '二级 2-1'
      },
      {
        id: 6,
        label: '二级 2-2'
      }
    ]
  },
  {
    id: 3,
    label: '一级 3',
    children: [
      {
        id: 7,
        label: '二级 3-1'
      },
      {
        id: 8,
        label: '二级 3-2'
      }
    ]
  }
])

const data5 = ref([
  {
    id: 1,
    label: '一级 1',
    children: [
      {
        id: 4,
        label: '二级 1-1',
        children: [
          {
            id: 9,
            label: '三级 1-1-1'
          },
          {
            id: 10,
            label: '三级 1-1-2'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    label: '一级 2',
    children: [
      {
        id: 5,
        label: '二级 2-1'
      },
      {
        id: 6,
        label: '二级 2-2'
      }
    ]
  },
  {
    id: 3,
    label: '一级 3',
    children: [
      {
        id: 7,
        label: '二级 3-1'
      },
      {
        id: 8,
        label: '二级 3-2'
      }
    ]
  }
])

const data6 = ref([
  {
    id: 1,
    label: '一级 1',
    children: [
      {
        id: 4,
        label: '二级 1-1',
        children: [
          {
            id: 9,
            label: '三级 1-1-1'
          },
          {
            id: 10,
            label: '三级 1-1-2'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    label: '一级 2',
    children: [
      {
        id: 5,
        label: '二级 2-1'
      },
      {
        id: 6,
        label: '二级 2-2'
      }
    ]
  },
  {
    id: 3,
    label: '一级 3',
    children: [
      {
        id: 7,
        label: '二级 3-1'
      },
      {
        id: 8,
        label: '二级 3-2'
      }
    ]
  }
])

const data7 = ref([
  {
    id: 1,
    label: '一级 1',
    children: [
      {
        id: 4,
        label: '二级 1-1',
        children: [
          {
            id: 9,
            label: '三级 1-1-1'
          },
          {
            id: 10,
            label: '三级 1-1-2'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    label: '一级 2',
    children: [
      {
        id: 5,
        label: '二级 2-1'
      },
      {
        id: 6,
        label: '二级 2-2'
      }
    ]
  },
  {
    id: 3,
    label: '一级 3',
    children: [
      {
        id: 7,
        label: '二级 3-1'
      },
      {
        id: 8,
        label: '二级 3-2'
      }
    ]
  }
])

const defaultProps = ref({
  children: 'children',
  label: 'label'
})

const lazyProps = ref({
  children: 'children',
  label: 'label',
  isLeaf: 'leaf'
})

const fileData = ref([
  {
    id: 1,
    label: '文档',
    type: 'folder',
    children: [
      {
        id: 2,
        label: '工作文档',
        type: 'folder',
        children: [
          {
            id: 3,
            label: '项目计划.docx',
            type: 'file'
          },
          {
            id: 4,
            label: '会议记录.docx',
            type: 'file'
          }
        ]
      },
      {
        id: 5,
        label: '个人文档',
        type: 'folder',
        children: [
          {
            id: 6,
            label: '简历.pdf',
            type: 'file'
          },
          {
            id: 7,
            label: '照片',
            type: 'folder',
            children: [
              {
                id: 8,
                label: '头像.jpg',
                type: 'file'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 9,
    label: '下载',
    type: 'folder',
    children: [
      {
        id: 10,
        label: '软件',
        type: 'folder',
        children: []
      }
    ]
  }
])

const fileProps = ref({
  children: 'children',
  label: 'label'
})

const tree = ref()

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

// 懒加载函数
const loadNode = (node, resolve) => {
  if (node.level === 0) {
    resolve([
      { id: 1, label: '一级 1', leaf: false },
      { id: 2, label: '一级 2', leaf: false }
    ])
  } else if (node.level === 1) {
    resolve([
      { id: 3, label: '二级 1-1', leaf: true },
      { id: 4, label: '二级 1-2', leaf: true }
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

// 编辑相关函数
const append = (data) => {
  const newChild = { id: Date.now(), label: '新节点', children: [] }
  if (!data.children) {
    data.children = []
  }
  data.children.push(newChild)
}

const remove = (node, data) => {
  const parent = node.parent
  const children = parent.data.children || parent.data
  const index = children.findIndex(d => d.id === data.id)
  children.splice(index, 1)
}

const allowDrop = (draggingNode, dropNode, type) => {
  return true
}

const allowDrag = (draggingNode) => {
  return true
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
</style>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| data | 展示数据 | array | — | — |
| empty-text | 内容为空的时候展示的文本 | string | — | 暂无数据 |
| node-key | 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的 | string | — | id |
| props | 配置选项，具体看下表 | object | — | — |
| render-after-expand | 是否在第一次展开某个树节点后才渲染其子节点 | boolean | — | true |
| load | 加载子节点数据的方法，仅当 lazy 为 true 时生效 | function(node, resolve) | — | — |
| render-content | 树节点的内容区的渲染 Function | Function(h, { node, data, store }) | — | — |
| highlight-current | 是否高亮当前选中节点，默认值是 false | boolean | — | false |
| default-expand-all | 是否默认展开所有节点 | boolean | — | false |
| expand-on-click-node | 是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点 | boolean | — | true |
| check-on-click-node | 是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点 | boolean | — | false |
| auto-expand-parent | 展开子节点的时候是否自动展开父节点 | boolean | — | true |
| default-expanded-keys | 默认展开的节点的 key 的数组 | array | — | — |
| show-checkbox | 节点是否可被选择 | boolean | — | false |
| check-strictly | 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false | boolean | — | false |
| default-checked-keys | 默认勾选的节点的 key 的数组 | array | — | — |
| current-node-key | 当前选中的节点 | string / number | — | — |
| filter-node-method | 对树节点进行筛选时执行的方法，返回 true 表示这个节点可以显示，返回 false 则表示这个节点会被隐藏 | Function(value, data, node) | — | — |
| accordion | 是否每次只打开一个同级树节点 | boolean | — | false |
| indent | 相邻级节点间的水平缩进，单位为像素 | number | — | 16 |
| icon-class | 自定义树节点的图标 | string | - | - |
| lazy | 是否懒加载子节点数据 | boolean | — | false |
| draggable | 是否开启拖拽节点功能 | boolean | — | false |
| allow-drag | 判断节点能否被拖拽 | Function(node) | — | — |
| allow-drop | 拖拽时判定目标节点能否成为拖动目标位置。 若返回 false ，则不能被放置到目标节点。type 参数有三种情况：'prev'、'inner' 和 'next'，分别表示放置在目标节点前、插入至目标节点和放置在目标节点后 | Function(draggingNode, dropNode, type) | — | — |

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
1. **文件管理**: 文件目录树展示
2. **组织架构**: 公司部门、学校院系等
3. **分类管理**: 商品分类、文章分类等
4. **权限管理**: 菜单权限、功能权限等
5. **数据筛选**: 多维度数据筛选
6. **导航菜单**: 多级导航菜单
7. **配置管理**: 系统配置项选择 