// 预设测试用例配置
export const presetTests = [
  // 基础连接测试
  { name: '获取版本', action: 'version', params: {} },
  { name: '同步集合', action: 'sync', params: {} },
  
  // 牌组管理测试
  { name: '获取牌组列表', action: 'deckNames', params: {} },
  { name: '获取牌组名称', action: 'getDeckNames', params: { includeSubdecks: true } },
  { name: '获取集合统计', action: 'getCollectionStats', params: {} },
  
  // 模型管理测试
  { name: '获取模型名称', action: 'getModelNames', params: {} },
  
  // 统计信息测试
  { name: '获取今日复习数', action: 'getNumCardsReviewedToday', params: {} },
  { name: '获取每日复习数', action: 'getNumCardsReviewedByDay', params: {} },
  { name: '获取集合统计HTML', action: 'getCollectionStatsHTML', params: { wholeCollection: false } },
  
  // 标签管理测试
  { name: '获取所有标签', action: 'getTags', params: {} },
  { name: '清理未使用标签', action: 'clearUnusedTags', params: {} },
  
  // 笔记管理测试
  { name: '移除空笔记', action: 'removeEmptyNotes', params: {} },
  
  // 卡片查询测试
  { name: '查找所有卡片', action: 'findCards', params: { query: 'deck:*' } },
  { name: '查找到期卡片', action: 'findCards', params: { query: 'is:due' } },
  { name: '查找新卡片', action: 'findCards', params: { query: 'is:new' } }
]

export default presetTests 