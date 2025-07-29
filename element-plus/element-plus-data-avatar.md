### 4. Avatar 头像
- **用途**: 用户头像
- **特点**: 支持图片、文字、图标头像

#### 详细用法
```vue
<template>
  <div>
    <!-- 基础用法 -->
    <el-avatar :size="50" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />

    <!-- 不同尺寸 -->
    <el-avatar :size="100" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    <el-avatar :size="50" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    <el-avatar :size="30" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />

    <!-- 文字头像 -->
    <el-avatar>用户</el-avatar>
    <el-avatar>张三</el-avatar>
    <el-avatar>李四</el-avatar>

    <!-- 图标头像 -->
    <el-avatar :icon="UserFilled" />
    <el-avatar :icon="User" />

    <!-- 不同形状 -->
    <el-avatar shape="square" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    <el-avatar shape="circle" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />

    <!-- 适应容器尺寸 -->
    <el-avatar fit="fill" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    <el-avatar fit="contain" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    <el-avatar fit="cover" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    <el-avatar fit="none" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    <el-avatar fit="scale-down" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />

    <!-- 头像组 -->
    <el-avatar-group :size="40">
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    </el-avatar-group>

    <!-- 头像组最大显示数量 -->
    <el-avatar-group :max="2" :size="40">
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    </el-avatar-group>

    <!-- 头像组间距 -->
    <el-avatar-group :spacing="20" :size="40">
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    </el-avatar-group>

    <!-- 头像组形状 -->
    <el-avatar-group shape="square" :size="40">
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    </el-avatar-group>

    <!-- 头像组触发方式 -->
    <el-avatar-group trigger="hover" :size="40">
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    </el-avatar-group>

    <!-- 头像组自定义 -->
    <el-avatar-group :size="40">
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    </el-avatar-group>

    <!-- 头像组自定义显示 -->
    <el-avatar-group :max="3" :size="40">
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      <template #extra>
        <el-avatar>+2</el-avatar>
      </template>
    </el-avatar-group>

    <!-- 头像组事件 -->
    <el-avatar-group :size="40" @click="handleAvatarClick">
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    </el-avatar-group>

    <!-- 头像组自定义样式 -->
    <el-avatar-group :size="40" class="custom-avatar-group">
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    </el-avatar-group>

    <!-- 头像组响应式 -->
    <el-avatar-group :size="40" class="responsive-avatar-group">
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    </el-avatar-group>

    <!-- 头像组在表格中的应用 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column prop="avatar" label="头像" width="180">
        <template #default="scope">
          <el-avatar :size="40" :src="scope.row.avatar" />
        </template>
      </el-table-column>
      <el-table-column prop="team" label="团队成员" width="300">
        <template #default="scope">
          <el-avatar-group :size="30" :max="3">
            <el-avatar v-for="member in scope.row.team" :key="member.id" :src="member.avatar" />
            <template #extra>
              <el-avatar>+{{ scope.row.team.length - 3 }}</el-avatar>
            </template>
          </el-avatar-group>
        </template>
      </el-table-column>
    </el-table>

    <!-- 头像组在卡片中的应用 -->
    <el-card style="width: 300px">
      <template #header>
        <div class="card-header">
          <span>项目成员</span>
          <el-avatar-group :size="30" :max="5">
            <el-avatar v-for="member in projectMembers" :key="member.id" :src="member.avatar" />
          </el-avatar-group>
        </div>
      </template>
      <div class="text item">
        项目共有 {{ projectMembers.length }} 名成员
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { UserFilled, User } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const tableData = ref([
  {
    name: '张三',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    team: [
      { id: 1, avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' },
      { id: 2, avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' },
      { id: 3, avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' },
      { id: 4, avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' },
      { id: 5, avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' }
    ]
  },
  {
    name: '李四',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    team: [
      { id: 1, avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' },
      { id: 2, avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' },
      { id: 3, avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' }
    ]
  }
])

const projectMembers = ref([
  { id: 1, avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' },
  { id: 2, avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' },
  { id: 3, avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' },
  { id: 4, avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' },
  { id: 5, avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' },
  { id: 6, avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' },
  { id: 7, avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' }
])

const handleAvatarClick = () => {
  ElMessage.success('点击了头像组!')
}
</script>

<style scoped>
.custom-avatar-group {
  border: 2px solid #409eff;
  border-radius: 8px;
  padding: 5px;
}

.responsive-avatar-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text.item {
  margin-bottom: 18px;
}

/* 响应式头像组 */
@media (max-width: 768px) {
  .responsive-avatar-group {
    gap: 5px;
  }
  
  .el-avatar-group {
    --el-avatar-size: 30px;
  }
}
</style>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| size | 设置头像的大小 | number / string | number / large / default / small | default |
| shape | 设置头像的形状 | string | circle / square | circle |
| src | 图片头像的资源地址 | string | — | — |
| icon | 设置头像的图标类型 | string / Component | — | — |
| fit | 当展示类型为图片时，设置图片如何适应容器 | string | fill / contain / cover / none / scale-down | cover |
| alt | 描述图像的替代文本 | string | — | — |

#### Avatar Group 属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| max | 最多显示的头像数量 | number | — | — |
| size | 头像的大小 | number / string | number / large / default / small | default |
| shape | 头像的形状 | string | circle / square | circle |
| spacing | 头像之间的间距 | number | — | 4 |
| trigger | 头像组的触发方式 | string | hover / click | hover |

#### 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| error | 图片类头像加载失败时触发 | (e: Event) |

#### Avatar Group 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击头像组时触发 | (e: MouseEvent) |

#### 插槽
| 插槽名 | 说明 |
|--------|------|
| — | 自定义头像展示内容 |

#### Avatar Group 插槽
| 插槽名 | 说明 |
|--------|------|
| — | 头像组的内容 |
| extra | 超出 max 属性时显示的内容 |

#### 使用示例
```vue
<!-- 基础用法 -->
<el-avatar :size="50" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />

<!-- 文字头像 -->
<el-avatar>用户</el-avatar>

<!-- 图标头像 -->
<el-avatar :icon="UserFilled" />

<!-- 不同形状 -->
<el-avatar shape="square" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />

<!-- 适应容器尺寸 -->
<el-avatar fit="cover" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />

<!-- 头像组 -->
<el-avatar-group :size="40">
  <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
  <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
  <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
</el-avatar-group>

<!-- 头像组最大显示数量 -->
<el-avatar-group :max="2" :size="40">
  <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
  <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
  <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
  <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
</el-avatar-group>

<!-- 头像组自定义显示 -->
<el-avatar-group :max="3" :size="40">
  <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
  <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
  <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
  <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
  <template #extra>
    <el-avatar>+2</el-avatar>
  </template>
</el-avatar-group>
```

#### 样式定制
```css
/* 自定义头像样式 */
.el-avatar {
  border: 2px solid #409eff;
  transition: all 0.3s ease;
}

.el-avatar:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
}

/* 自定义头像组样式 */
.custom-avatar-group {
  border: 2px solid #409eff;
  border-radius: 8px;
  padding: 5px;
  background: rgba(64, 158, 255, 0.1);
}

.custom-avatar-group .el-avatar {
  border: 1px solid #fff;
}

/* 响应式头像组 */
@media (max-width: 768px) {
  .responsive-avatar-group {
    gap: 5px;
  }
  
  .el-avatar-group {
    --el-avatar-size: 30px;
  }
  
  .el-avatar {
    font-size: 12px;
  }
}

/* 头像组动画 */
.el-avatar-group .el-avatar {
  transition: all 0.3s ease;
}

.el-avatar-group .el-avatar:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

/* 头像形状样式 */
.el-avatar--square {
  border-radius: 4px;
}

.el-avatar--circle {
  border-radius: 50%;
}

/* 头像尺寸样式 */
.el-avatar--large {
  width: 40px;
  height: 40px;
  line-height: 40px;
}

.el-avatar--default {
  width: 32px;
  height: 32px;
  line-height: 32px;
}

.el-avatar--small {
  width: 24px;
  height: 24px;
  line-height: 24px;
}
```

#### 使用场景
1. **用户头像**: 显示用户个人头像
2. **团队展示**: 显示团队成员头像组
3. **联系人列表**: 在联系人列表中显示头像
4. **评论系统**: 在评论中显示用户头像
5. **社交应用**: 在社交应用中显示用户头像
6. **项目管理**: 在项目中显示成员头像

#### 注意事项
1. **图片加载**: 确保图片地址有效，避免加载失败
2. **尺寸设置**: 根据使用场景合理设置头像尺寸
3. **头像组数量**: 避免在头像组中显示过多头像，影响视觉效果
4. **响应式设计**: 在移动端考虑头像的显示效果
5. **性能优化**: 大量头像时考虑使用懒加载
6. **可访问性**: 为图片头像提供 alt 属性
7. **样式定制**: 合理使用自定义样式，保持与整体设计风格一致 