<template>
  <div class="card-renderer">
    <div class="card-front">
      <h4>正面</h4>
      <div v-html="renderedFront" class="card-content"></div>
    </div>
    <div class="card-back">
      <h4>背面</h4>
      <div v-html="renderedBack" class="card-content"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  front: string
  back: string
  css: string
  fields: Record<string, string>
}>()

const renderedFront = ref('')
const renderedBack = ref('')
const styleElement = ref<HTMLStyleElement | null>(null)

// 渲染卡片内容
const renderCard = () => {
  let front = props.front
  let back = props.back
  
  // 替换字段占位符
  Object.entries(props.fields).forEach(([field, value]) => {
    const placeholder = `{{${field}}}`
    const regex = new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')
    front = front.replace(regex, value || '')
    back = back.replace(regex, value || '')
  })
  
  // 处理JavaScript代码
  front = processJavaScript(front)
  back = processJavaScript(back)
  
  // 防止无限循环更新
  if (renderedFront.value !== front) {
    renderedFront.value = front
  }
  if (renderedBack.value !== back) {
    renderedBack.value = back
  }
}

// 处理JavaScript代码
const processJavaScript = (content: string): string => {
  // 查找并执行JavaScript代码块
  const jsRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi
  let processedContent = content
  
  processedContent = processedContent.replace(jsRegex, (match, scriptContent) => {
    try {
      // 创建一个安全的执行环境
      const sandbox = {
        fields: props.fields,
        // 添加一些常用的工具函数
        format: (text: string) => text,
        highlight: (text: string) => `<mark>${text}</mark>`,
        bold: (text: string) => `<strong>${text}</strong>`,
        italic: (text: string) => `<em>${text}</em>`,
        // 数学函数
        Math: Math,
        // 字符串函数
        String: String,
        // 数组函数
        Array: Array
      }
      
      // 执行JavaScript代码
      const result = new Function('fields', 'format', 'highlight', 'bold', 'italic', 'Math', 'String', 'Array', scriptContent)
      const output = result(
        sandbox.fields,
        sandbox.format,
        sandbox.highlight,
        sandbox.bold,
        sandbox.italic,
        sandbox.Math,
        sandbox.String,
        sandbox.Array
      )
      
      return output || ''
    } catch (error) {
      console.error('JavaScript执行错误:', error)
      return `<span style="color: red;">JavaScript错误: ${error instanceof Error ? error.message : '未知错误'}</span>`
    }
  })
  
  return processedContent
}

// 应用CSS样式
const applyCSS = () => {
  // 移除之前的样式
  if (styleElement.value) {
    try {
      document.head.removeChild(styleElement.value)
    } catch (error) {
      // 忽略移除错误
    }
  }
  
  // 创建新的样式元素
  styleElement.value = document.createElement('style')
  styleElement.value.textContent = props.css
  styleElement.value.setAttribute('data-card-renderer', 'true')
  document.head.appendChild(styleElement.value)
}

// 使用防抖的监听器
let renderTimeout: number | null = null
let cssTimeout: number | null = null

// 监听属性变化
watch(() => [props.front, props.back, props.fields], () => {
  if (renderTimeout) {
    clearTimeout(renderTimeout)
  }
  renderTimeout = setTimeout(() => {
    renderCard()
  }, 100) // 100ms 防抖
}, { deep: true })

watch(() => props.css, () => {
  if (cssTimeout) {
    clearTimeout(cssTimeout)
  }
  cssTimeout = setTimeout(() => {
    applyCSS()
  }, 100) // 100ms 防抖
})

// 组件挂载时初始化
onMounted(() => {
  renderCard()
  applyCSS()
})

// 组件卸载时清理
onUnmounted(() => {
  if (renderTimeout) {
    clearTimeout(renderTimeout)
  }
  if (cssTimeout) {
    clearTimeout(cssTimeout)
  }
  if (styleElement.value) {
    try {
      document.head.removeChild(styleElement.value)
    } catch (error) {
      // 忽略移除错误
    }
  }
})
</script>

<style scoped>
.card-renderer {
  background: #fff;
  border: 1px solid #ebeef5;
  border-radius: 6px;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  font-size: 14px;
  line-height: 1.6;
  color: #333;
}

.card-front,
.card-back {
  margin-bottom: 20px;
}

.card-front h4,
.card-back h4 {
  margin: 0 0 10px 0;
  color: #303133;
  font-size: 16px;
  font-weight: 600;
  padding-bottom: 5px;
  border-bottom: 2px solid #409eff;
}

.card-content {
  min-height: 50px;
}

/* 默认卡片样式 */
.card-content :deep(h1),
.card-content :deep(h2),
.card-content :deep(h3),
.card-content :deep(h4),
.card-content :deep(h5),
.card-content :deep(h6) {
  margin: 0 0 10px 0;
  color: #1f2d3d;
}

.card-content :deep(p) {
  margin: 0 0 10px 0;
  text-align: justify;
}

.card-content :deep(ul),
.card-content :deep(ol) {
  padding-left: 20px;
  margin: 0 0 10px 0;
}

.card-content :deep(li) {
  margin-bottom: 5px;
}

.card-content :deep(strong) {
  color: #409eff;
  font-weight: 600;
}

.card-content :deep(em) {
  font-style: italic;
}

.card-content :deep(code) {
  background-color: #f4f4f4;
  padding: 2px 4px;
  border-radius: 3px;
  font-size: 0.9em;
  font-family: 'Courier New', monospace;
}

.card-content :deep(pre) {
  background-color: #f4f4f4;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 0.9em;
  font-family: 'Courier New', monospace;
}

.card-content :deep(blockquote) {
  border-left: 4px solid #409eff;
  padding-left: 10px;
  margin: 0 0 10px 0;
  color: #555;
}

.card-content :deep(hr) {
  border: none;
  border-top: 1px dashed #eee;
  margin: 15px 0;
}

.card-content :deep(table) {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 10px;
}

.card-content :deep(th) {
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.card-content :deep(td) {
  border: 1px solid #ddd;
  padding: 8px;
}

.card-content :deep(img) {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 10px 0;
  border-radius: 4px;
}

.card-content :deep(a) {
  color: #409eff;
  text-decoration: none;
}

.card-content :deep(a:hover) {
  text-decoration: underline;
}

.card-content :deep(mark) {
  background-color: #ffeb3b;
  padding: 2px 4px;
  border-radius: 2px;
}
</style> 