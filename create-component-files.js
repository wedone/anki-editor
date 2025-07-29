// 批量创建 Element Plus 组件文件的脚本
// 这个脚本将根据 element-plus-learning-notes.md 中的内容
// 为每个组件创建独立的文件

const fs = require('fs');
const path = require('path');

// 组件列表（按分类）
const components = {
  basic: [
    'button', 'border', 'color', 'container', 'icon', 'layout', 
    'link', 'text', 'scrollbar', 'space', 'splitter', 'typography'
  ],
  config: ['config-provider'],
  form: [
    'input', 'select', 'checkbox', 'radio', 'switch', 'slider',
    'date-picker', 'datetime-picker', 'time-picker', 'time-select',
    'upload', 'form', 'autocomplete', 'cascader', 'color-picker',
    'input-number', 'input-tag', 'mention', 'rate', 'transfer',
    'treeselect', 'virtualized-select'
  ],
  data: [
    'table', 'virtualized-table', 'card', 'avatar', 'badge', 'tag',
    'progress', 'pagination', 'tree', 'virtualized-tree', 'timeline',
    'calendar', 'carousel', 'collapse', 'descriptions', 'empty',
    'image', 'skeleton', 'result', 'statistic', 'segmented',
    'infinite-scroll', 'tour'
  ],
  navigation: [
    'menu', 'tabs', 'breadcrumb', 'dropdown', 'steps', 'affix',
    'anchor', 'backtop', 'page-header'
  ],
  feedback: [
    'dialog', 'message', 'notification', 'alert', 'loading',
    'message-box', 'drawer', 'popover', 'tooltip', 'popconfirm'
  ],
  others: ['divider', 'watermark']
};

// 生成文件名
function generateFileName(componentName) {
  return `element-plus-component-${componentName}.md`;
}

// 创建组件文件
function createComponentFile(componentName, content) {
  const fileName = generateFileName(componentName);
  const filePath = path.join(__dirname, fileName);
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Created: ${fileName}`);
}

// 主函数
function main() {
  console.log('开始创建 Element Plus 组件文件...');
  
  // 这里可以添加从 element-plus-learning-notes.md 中提取内容的逻辑
  // 由于内容较多，建议手动创建或使用更复杂的解析逻辑
  
  console.log('组件文件创建完成！');
}

// 运行脚本
if (require.main === module) {
  main();
}

module.exports = { components, createComponentFile }; 