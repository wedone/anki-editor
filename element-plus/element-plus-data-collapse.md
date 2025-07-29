### 29. Collapse 折叠面板
- **用途**: 可折叠的内容面板
- **特点**: 支持手风琴模式、自定义标题

#### 详细用法
```vue
<template>
  <!-- 基础用法 -->
  <el-collapse v-model="activeNames1" @change="handleChange">
    <el-collapse-item title="一致性 Consistency" name="1">
      <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
      <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
    </el-collapse-item>
    <el-collapse-item title="反馈 Feedback" name="2">
      <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
      <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
    </el-collapse-item>
    <el-collapse-item title="效率 Efficiency" name="3">
      <div>简化流程：设计简洁直观的操作流程；</div>
      <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
      <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
    </el-collapse-item>
    <el-collapse-item title="可控 Controllability" name="4">
      <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
      <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
    </el-collapse-item>
  </el-collapse>

  <!-- 手风琴模式 -->
  <el-collapse v-model="activeNames2" accordion>
    <el-collapse-item title="一致性 Consistency" name="1">
      <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
      <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
    </el-collapse-item>
    <el-collapse-item title="反馈 Feedback" name="2">
      <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
      <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
    </el-collapse-item>
    <el-collapse-item title="效率 Efficiency" name="3">
      <div>简化流程：设计简洁直观的操作流程；</div>
      <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
      <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
    </el-collapse-item>
    <el-collapse-item title="可控 Controllability" name="4">
      <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
      <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
    </el-collapse-item>
  </el-collapse>

  <!-- 自定义面板标题 -->
  <el-collapse v-model="activeNames3">
    <el-collapse-item name="1">
      <template #title>
        <div class="custom-title">
          <el-icon><Warning /></el-icon>
          <span>一致性 Consistency</span>
        </div>
      </template>
      <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
      <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
    </el-collapse-item>
    <el-collapse-item name="2">
      <template #title>
        <div class="custom-title">
          <el-icon><InfoFilled /></el-icon>
          <span>反馈 Feedback</span>
        </div>
      </template>
      <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
      <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
    </el-collapse-item>
    <el-collapse-item name="3">
      <template #title>
        <div class="custom-title">
          <el-icon><SuccessFilled /></el-icon>
          <span>效率 Efficiency</span>
        </div>
      </template>
      <div>简化流程：设计简洁直观的操作流程；</div>
      <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
      <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
    </el-collapse-item>
  </el-collapse>

  <!-- 不同尺寸 -->
  <el-collapse v-model="activeNames4" size="large">
    <el-collapse-item title="大尺寸" name="1">
      <div>这是大尺寸的折叠面板内容</div>
    </el-collapse-item>
  </el-collapse>
  <el-collapse v-model="activeNames5" size="default">
    <el-collapse-item title="默认尺寸" name="1">
      <div>这是默认尺寸的折叠面板内容</div>
    </el-collapse-item>
  </el-collapse>
  <el-collapse v-model="activeNames6" size="small">
    <el-collapse-item title="小尺寸" name="1">
      <div>这是小尺寸的折叠面板内容</div>
    </el-collapse-item>
  </el-collapse>

  <!-- 在页面中使用 -->
  <div class="collapse-container">
    <h3>常见问题解答</h3>
    <el-collapse v-model="faqActiveNames" accordion>
      <el-collapse-item 
        v-for="faq in faqList" 
        :key="faq.id"
        :name="faq.id"
      >
        <template #title>
          <div class="faq-title">
            <el-icon class="faq-icon">
              <QuestionFilled />
            </el-icon>
            <span class="faq-question">{{ faq.question }}</span>
            <el-tag 
              :type="faq.category" 
              size="small" 
              class="faq-category"
            >
              {{ getCategoryText(faq.category) }}
            </el-tag>
          </div>
        </template>
        <div class="faq-content">
          <p>{{ faq.answer }}</p>
          <div v-if="faq.examples" class="faq-examples">
            <h4>示例：</h4>
            <ul>
              <li v-for="example in faq.examples" :key="example">
                {{ example }}
              </li>
            </ul>
          </div>
          <div v-if="faq.related" class="faq-related">
            <h4>相关链接：</h4>
            <el-link 
              v-for="link in faq.related" 
              :key="link.url"
              :href="link.url"
              type="primary"
              target="_blank"
            >
              {{ link.text }}
            </el-link>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>

    <!-- 问题反馈 -->
    <div class="feedback-section">
      <h4>这个回答对您有帮助吗？</h4>
      <el-button-group>
        <el-button 
          size="small" 
          :type="feedback === 'helpful' ? 'primary' : ''"
          @click="submitFeedback('helpful')"
        >
          <el-icon><ThumbsUp /></el-icon>
          有帮助
        </el-button>
        <el-button 
          size="small" 
          :type="feedback === 'unhelpful' ? 'danger' : ''"
          @click="submitFeedback('unhelpful')"
        >
          <el-icon><ThumbsDown /></el-icon>
          没帮助
        </el-button>
      </el-button-group>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  Warning, 
  InfoFilled, 
  SuccessFilled, 
  QuestionFilled,
  ThumbsUp,
  ThumbsDown
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const activeNames1 = ref(['1'])
const activeNames2 = ref('1')
const activeNames3 = ref(['1'])
const activeNames4 = ref(['1'])
const activeNames5 = ref(['1'])
const activeNames6 = ref(['1'])

const faqActiveNames = ref('1')
const feedback = ref('')

// FAQ 数据
const faqList = ref([
  {
    id: '1',
    question: '如何安装 Element Plus？',
    answer: 'Element Plus 可以通过 npm 或 yarn 进行安装。首先确保你的项目已经初始化，然后运行相应的安装命令。',
    category: 'success',
    examples: [
      'npm install element-plus',
      'yarn add element-plus',
      'pnpm add element-plus'
    ],
    related: [
      { text: '快速开始', url: 'https://element-plus.org/zh-CN/guide/quickstart.html' },
      { text: '安装指南', url: 'https://element-plus.org/zh-CN/guide/installation.html' }
    ]
  },
  {
    id: '2',
    question: '如何配置 Element Plus 的主题？',
    answer: 'Element Plus 支持多种主题配置方式，包括 CSS 变量、SCSS 变量和主题生成器。你可以根据项目需求选择合适的配置方式。',
    category: 'warning',
    examples: [
      '使用 CSS 变量自定义主题',
      '使用 SCSS 变量进行深度定制',
      '使用主题生成器生成主题文件'
    ],
    related: [
      { text: '主题配置', url: 'https://element-plus.org/zh-CN/guide/theming.html' },
      { text: '主题生成器', url: 'https://element-plus.org/zh-CN/theme-editor.html' }
    ]
  },
  {
    id: '3',
    question: 'Element Plus 支持哪些浏览器？',
    answer: 'Element Plus 支持所有现代浏览器，包括 Chrome、Firefox、Safari、Edge 等。对于 IE 浏览器，建议使用 Element Plus 1.x 版本。',
    category: 'info',
    examples: [
      'Chrome >= 87',
      'Firefox >= 78',
      'Safari >= 14',
      'Edge >= 88'
    ],
    related: [
      { text: '浏览器兼容性', url: 'https://element-plus.org/zh-CN/guide/browser-support.html' }
    ]
  },
  {
    id: '4',
    question: '如何处理 Element Plus 组件的国际化？',
    answer: 'Element Plus 提供了完整的国际化解决方案，支持多种语言。你可以通过配置语言包和日期格式来实现国际化。',
    category: 'primary',
    examples: [
      '配置语言包',
      '设置日期格式',
      '自定义翻译文本'
    ],
    related: [
      { text: '国际化指南', url: 'https://element-plus.org/zh-CN/guide/i18n.html' },
      { text: '语言包下载', url: 'https://element-plus.org/zh-CN/guide/i18n.html#language-packs' }
    ]
  },
  {
    id: '5',
    question: 'Element Plus 的性能如何？',
    answer: 'Element Plus 经过精心优化，具有出色的性能表现。支持按需引入、Tree Shaking 等优化技术，可以有效减少打包体积。',
    category: 'success',
    examples: [
      '按需引入减少打包体积',
      'Tree Shaking 优化',
      '虚拟滚动提升大数据渲染性能'
    ],
    related: [
      { text: '性能优化', url: 'https://element-plus.org/zh-CN/guide/performance.html' },
      { text: '按需引入', url: 'https://element-plus.org/zh-CN/guide/import.html' }
    ]
  }
])

// 事件处理函数
const handleChange = (val) => {
  console.log('折叠面板变化:', val)
}

const getCategoryText = (category) => {
  const categoryMap = {
    primary: '基础',
    success: '安装',
    warning: '配置',
    danger: '错误',
    info: '兼容性'
  }
  return categoryMap[category] || '其他'
}

const submitFeedback = (type) => {
  feedback.value = type
  const message = type === 'helpful' ? '感谢您的反馈！' : '我们会继续改进！'
  ElMessage.success(message)
}
</script>

<style scoped>
.collapse-container {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}

.custom-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.faq-title {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
}

.faq-icon {
  color: #409eff;
  font-size: 16px;
}

.faq-question {
  flex: 1;
  font-weight: 500;
  color: #303133;
}

.faq-category {
  margin-left: auto;
}

.faq-content {
  line-height: 1.6;
  color: #606266;
}

.faq-content p {
  margin: 0 0 15px 0;
}

.faq-examples {
  margin: 15px 0;
  padding: 15px;
  background: #f5f7fa;
  border-radius: 4px;
}

.faq-examples h4 {
  margin: 0 0 10px 0;
  color: #303133;
  font-size: 14px;
}

.faq-examples ul {
  margin: 0;
  padding-left: 20px;
}

.faq-examples li {
  margin: 5px 0;
  color: #606266;
}

.faq-related {
  margin: 15px 0;
  padding: 15px;
  background: #f0f9ff;
  border-radius: 4px;
  border-left: 4px solid #409eff;
}

.faq-related h4 {
  margin: 0 0 10px 0;
  color: #303133;
  font-size: 14px;
}

.faq-related .el-link {
  display: block;
  margin: 5px 0;
}

.feedback-section {
  margin-top: 30px;
  padding: 20px;
  background: #f5f7fa;
  border-radius: 4px;
  text-align: center;
}

.feedback-section h4 {
  margin: 0 0 15px 0;
  color: #303133;
}
</style>
```

#### 主要属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| model-value / v-model | 当前激活的面板(如果是手风琴模式，绑定值类型需要为string，否则为array) | string (手风琴模式) / array (非手风琴模式) | — | — |
| accordion | 是否手风琴模式 | boolean | — | false |

#### Collapse Item 属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| name | 唯一标志符 | string / number | — | — |
| title | 面板标题 | string | — | — |
| disabled | 是否禁用 | boolean | — | false |

#### 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 当前激活面板改变时触发 | (activeNames: array / string) |

#### 插槽
| 插槽名 | 说明 |
|--------|------|
| default | 面板内容 |
| title | 自定义面板标题 |

#### 使用场景
1. **FAQ 页面**: 常见问题解答页面
2. **帮助文档**: 产品帮助文档的章节折叠
3. **设置面板**: 系统设置的分组展示
4. **表单分组**: 复杂表单的分组展示
5. **内容展示**: 长内容的折叠展示
6. **导航菜单**: 多级导航菜单的折叠
7. **配置面板**: 系统配置的分组管理 