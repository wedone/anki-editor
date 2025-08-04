// API 测试示例 - 展示如何使用各种 AnkiConnect API
import ankiConnect from '../all.js'

// 基础连接测试
export async function testBasicConnection() {
  try {
    console.log('=== 基础连接测试 ===')
    
    // 测试连接
    const connection = await ankiConnect.checkConnection()
    console.log('连接状态:', connection)
    
    // 获取版本
    const version = await ankiConnect.getVersion()
    console.log('AnkiConnect 版本:', version)
    
    return { connection, version }
  } catch (error) {
    console.error('基础连接测试失败:', error)
    throw error
  }
}

// 牌组操作测试
export async function testDeckOperations() {
  try {
    console.log('=== 牌组操作测试 ===')
    
    // 获取牌组列表
    const deckList = await ankiConnect.getDeckList()
    console.log('牌组列表:', deckList)
    
    // 获取牌组名称和ID
    const deckNamesAndIds = await ankiConnect.getDeckNamesAndIds()
    console.log('牌组名称和ID:', deckNamesAndIds)
    
    // 获取指定牌组信息
    if (deckList.length > 0) {
      const deckInfo = await ankiConnect.getDecks([deckList[0].name])
      console.log('牌组信息:', deckInfo)
    }
    
    return { deckList, deckNamesAndIds }
  } catch (error) {
    console.error('牌组操作测试失败:', error)
    throw error
  }
}

// 卡片查询测试
export async function testCardQueries() {
  try {
    console.log('=== 卡片查询测试 ===')
    
    // 查找所有卡片
    const allCards = await ankiConnect.findCards('deck:*')
    console.log('所有卡片数量:', allCards.length)
    
    // 查找今天到期的卡片
    const dueCards = await ankiConnect.findCards('is:due')
    console.log('今天到期的卡片:', dueCards)
    
    // 查找暂停的卡片
    const suspendedCards = await ankiConnect.findCards('is:suspended')
    console.log('暂停的卡片:', suspendedCards)
    
    // 获取卡片详细信息
    if (allCards.length > 0) {
      const cardInfo = await ankiConnect.getCardInfo(allCards.slice(0, 3))
      console.log('卡片详细信息:', cardInfo)
    }
    
    return { allCards, dueCards, suspendedCards }
  } catch (error) {
    console.error('卡片查询测试失败:', error)
    throw error
  }
}

// 卡片状态管理测试
export async function testCardStatusManagement() {
  try {
    console.log('=== 卡片状态管理测试 ===')
    
    // 查找一些卡片进行测试
    const testCards = await ankiConnect.findCards('deck:Default limit:5')
    if (testCards.length === 0) {
      console.log('没有找到测试卡片')
      return { message: '没有找到测试卡片' }
    }
    
    console.log('测试卡片:', testCards)
    
    // 检查卡片暂停状态
    const suspendedStatus = await ankiConnect.areCardsSuspended(testCards)
    console.log('暂停状态:', suspendedStatus)
    
    // 检查卡片到期状态
    const dueStatus = await ankiConnect.areCardsDue(testCards)
    console.log('到期状态:', dueStatus)
    
    // 获取易度因子
    const easeFactors = await ankiConnect.getEaseFactors(testCards)
    console.log('易度因子:', easeFactors)
    
    // 获取间隔信息
    const intervals = await ankiConnect.getCardIntervals(testCards)
    console.log('间隔信息:', intervals)
    
    // 获取修改时间
    const modTimes = await ankiConnect.getCardsModTime(testCards)
    console.log('修改时间:', modTimes)
    
    return {
      testCards,
      suspendedStatus,
      dueStatus,
      easeFactors,
      intervals,
      modTimes
    }
  } catch (error) {
    console.error('卡片状态管理测试失败:', error)
    throw error
  }
}

// 卡片操作测试
export async function testCardOperations() {
  try {
    console.log('=== 卡片操作测试 ===')
    
    // 查找一些卡片进行测试
    const testCards = await ankiConnect.findCards('deck:Default limit:3')
    if (testCards.length === 0) {
      console.log('没有找到测试卡片')
      return { message: '没有找到测试卡片' }
    }
    
    console.log('测试卡片:', testCards)
    
    // 设置卡片标志
    const flagResult = await ankiConnect.setSpecificValueOfCard(
      testCards[0],
      ['flags'],
      ['1']
    )
    console.log('设置标志结果:', flagResult)
    
    // 设置到期时间（明天）
    const tomorrow = Math.floor(Date.now() / 1000) + 86400
    const dueTimeResult = await ankiConnect.setSpecificValueOfCard(
      testCards[0],
      ['odue'],
      [tomorrow.toString()]
    )
    console.log('设置到期时间结果:', dueTimeResult)
    
    // 设置易度因子
    const easeResult = await ankiConnect.setEaseFactors(
      testCards.slice(0, 2),
      [2500, 2400]
    )
    console.log('设置易度因子结果:', easeResult)
    
    return {
      testCards,
      flagResult,
      dueTimeResult,
      easeResult
    }
  } catch (error) {
    console.error('卡片操作测试失败:', error)
    throw error
  }
}

// 笔记操作测试
export async function testNoteOperations() {
  try {
    console.log('=== 笔记操作测试 ===')
    
    // 查找一些笔记
    const noteIds = await ankiConnect.findNotes('deck:Default limit:3')
    if (noteIds.length === 0) {
      console.log('没有找到测试笔记')
      return { message: '没有找到测试笔记' }
    }
    
    console.log('测试笔记ID:', noteIds)
    
    // 获取笔记信息
    const noteInfo = await ankiConnect.getNotesInfo(noteIds)
    console.log('笔记信息:', noteInfo)
    
    // 获取笔记修改时间
    const noteModTimes = await ankiConnect.getNotesModTime(noteIds)
    console.log('笔记修改时间:', noteModTimes)
    
    // 卡片转笔记
    const cardIds = await ankiConnect.findCards('deck:Default limit:3')
    if (cardIds.length > 0) {
      const noteIdsFromCards = await ankiConnect.cardsToNotes(cardIds)
      console.log('从卡片转换的笔记ID:', noteIdsFromCards)
    }
    
    return {
      noteIds,
      noteInfo,
      noteModTimes
    }
  } catch (error) {
    console.error('笔记操作测试失败:', error)
    throw error
  }
}

// 标签操作测试
export async function testTagOperations() {
  try {
    console.log('=== 标签操作测试 ===')
    
    // 获取所有标签
    const tags = await ankiConnect.getTags()
    console.log('所有标签:', tags)
    
    // 查找一些笔记进行标签测试
    const noteIds = await ankiConnect.findNotes('deck:Default limit:3')
    if (noteIds.length > 0) {
      // 添加标签
      const addResult = await ankiConnect.addTags(noteIds, ['test-tag'])
      console.log('添加标签结果:', addResult)
      
      // 移除标签
      const removeResult = await ankiConnect.removeTags(noteIds, ['test-tag'])
      console.log('移除标签结果:', removeResult)
    }
    
    return { tags }
  } catch (error) {
    console.error('标签操作测试失败:', error)
    throw error
  }
}

// 模型操作测试
export async function testModelOperations() {
  try {
    console.log('=== 模型操作测试 ===')
    
    // 获取所有模型名称
    const modelNames = await ankiConnect.getModelNames()
    console.log('模型名称:', modelNames)
    
    if (modelNames.length > 0) {
      const modelName = modelNames[0]
      
      // 获取模型字段名称
      const fieldNames = await ankiConnect.getModelFieldNames(modelName)
      console.log('字段名称:', fieldNames)
      
      // 获取模型字段类型
      const fieldTypes = await ankiConnect.getModelFieldTypes(modelName)
      console.log('字段类型:', fieldTypes)
      
      // 获取模型样式
      const styling = await ankiConnect.getModelStyling(modelName)
      console.log('模型样式:', styling)
      
      // 获取模型模板
      const templates = await ankiConnect.getModelTemplates(modelName)
      console.log('模型模板:', templates)
      
      // 获取模型ID
      const modelId = await ankiConnect.getModelID(modelName)
      console.log('模型ID:', modelId)
      
      return {
        modelNames,
        fieldNames,
        fieldTypes,
        styling,
        templates,
        modelId
      }
    }
    
    return { modelNames }
  } catch (error) {
    console.error('模型操作测试失败:', error)
    throw error
  }
}

// 统计操作测试
export async function testStatisticsOperations() {
  try {
    console.log('=== 统计操作测试 ===')
    
    // 获取今日复习卡片数
    const todayReviewed = await ankiConnect.getNumCardsReviewedToday()
    console.log('今日复习卡片数:', todayReviewed)
    
    // 获取每日复习卡片数
    const dailyReviewed = await ankiConnect.getNumCardsReviewedByDay()
    console.log('每日复习卡片数:', dailyReviewed)
    
    // 获取集合统计HTML
    const statsHTML = await ankiConnect.getCollectionStatsHTML(false)
    console.log('集合统计HTML长度:', statsHTML.length)
    
    // 获取集合统计
    const collectionStats = await ankiConnect.getCollectionStats()
    console.log('集合统计:', collectionStats)
    
    return {
      todayReviewed,
      dailyReviewed,
      statsHTML: statsHTML.substring(0, 100) + '...',
      collectionStats
    }
  } catch (error) {
    console.error('统计操作测试失败:', error)
    throw error
  }
}

// 综合测试
export async function runAllTests() {
  try {
    console.log('开始运行所有 API 测试...')
    
    const results = {
      basic: await testBasicConnection(),
      decks: await testDeckOperations(),
      cardQueries: await testCardQueries(),
      cardStatus: await testCardStatusManagement(),
      cardOps: await testCardOperations(),
      notes: await testNoteOperations(),
      tags: await testTagOperations(),
      models: await testModelOperations(),
      stats: await testStatisticsOperations()
    }
    
    console.log('所有测试完成！')
    return results
  } catch (error) {
    console.error('综合测试失败:', error)
    throw error
  }
}

// 导出所有测试函数
export {
  testBasicConnection,
  testDeckOperations,
  testCardQueries,
  testCardStatusManagement,
  testCardOperations,
  testNoteOperations,
  testTagOperations,
  testModelOperations,
  testStatisticsOperations,
  runAllTests
} 