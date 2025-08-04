// 卡片操作功能使用示例
import {
  getCardsInDeck,
  findCards,
  getCardInfo,
  getEaseFactors,
  setEaseFactors,
  suspendCards,
  unsuspendCards,
  isCardSuspended,
  areCardsSuspended,
  areCardsDue,
  getCardIntervals,
  forgetCards,
  relearnCards,
  answerCard,
  answerCards,
  setDueDate,
  setCardFlag,
  setCardDueTime
} from '../cards.js'

// 示例：获取牌组中的卡片
export async function exampleGetCardsInDeck() {
  try {
    const cards = await getCardsInDeck('Default')
    console.log('牌组中的卡片:', cards)
    return cards
  } catch (error) {
    console.error('获取牌组卡片失败:', error)
  }
}

// 示例：查找特定条件的卡片
export async function exampleFindCards() {
  try {
    // 查找今天到期的卡片
    const dueCards = await findCards('is:due')
    console.log('今天到期的卡片:', dueCards)
    
    // 查找暂停的卡片
    const suspendedCards = await findCards('is:suspended')
    console.log('暂停的卡片:', suspendedCards)
    
    // 查找新卡片
    const newCards = await findCards('is:new')
    console.log('新卡片:', newCards)
    
    return { dueCards, suspendedCards, newCards }
  } catch (error) {
    console.error('查找卡片失败:', error)
  }
}

// 示例：获取和设置易度因子
export async function exampleEaseFactors() {
  try {
    const cardIds = [1483959291685, 1483959293217]
    
    // 获取易度因子
    const easeFactors = await getEaseFactors(cardIds)
    console.log('当前易度因子:', easeFactors)
    
    // 设置新的易度因子
    const newEaseFactors = [4200, 4000]
    const result = await setEaseFactors(cardIds, newEaseFactors)
    console.log('设置易度因子结果:', result)
    
    return { easeFactors, newEaseFactors, result }
  } catch (error) {
    console.error('易度因子操作失败:', error)
  }
}

// 示例：暂停和恢复卡片
export async function exampleSuspendCards() {
  try {
    const cardIds = [1483959291685, 1483959293217]
    
    // 检查卡片暂停状态
    const suspendedStatus = await areCardsSuspended(cardIds)
    console.log('暂停状态:', suspendedStatus)
    
    // 暂停卡片
    const suspendResult = await suspendCards(cardIds)
    console.log('暂停结果:', suspendResult)
    
    // 再次检查状态
    const newSuspendedStatus = await areCardsSuspended(cardIds)
    console.log('新的暂停状态:', newSuspendedStatus)
    
    // 恢复卡片
    const unsuspendResult = await unsuspendCards(cardIds)
    console.log('恢复结果:', unsuspendResult)
    
    return { suspendedStatus, suspendResult, newSuspendedStatus, unsuspendResult }
  } catch (error) {
    console.error('暂停卡片操作失败:', error)
  }
}

// 示例：检查卡片状态
export async function exampleCheckCardStatus() {
  try {
    const cardIds = [1483959291685, 1483959293217]
    
    // 检查是否到期
    const dueStatus = await areCardsDue(cardIds)
    console.log('到期状态:', dueStatus)
    
    // 检查是否暂停
    const suspendedStatus = await areCardsSuspended(cardIds)
    console.log('暂停状态:', suspendedStatus)
    
    // 获取间隔信息
    const intervals = await getCardIntervals(cardIds)
    console.log('间隔信息:', intervals)
    
    // 获取完整间隔历史
    const completeIntervals = await getCardIntervals(cardIds, true)
    console.log('完整间隔历史:', completeIntervals)
    
    return { dueStatus, suspendedStatus, intervals, completeIntervals }
  } catch (error) {
    console.error('检查卡片状态失败:', error)
  }
}

// 示例：回答卡片
export async function exampleAnswerCards() {
  try {
    // 回答单张卡片
    const singleResult = await answerCard(1483959291685, 2) // 2 = Good
    console.log('单张卡片回答结果:', singleResult)
    
    // 回答多张卡片
    const answers = [
      { cardId: 1483959291685, ease: 1 }, // Again
      { cardId: 1483959293217, ease: 3 }, // Easy
      { cardId: 1483959294000, ease: 2 }  // Good
    ]
    const multiResult = await answerCards(answers)
    console.log('多张卡片回答结果:', multiResult)
    
    return { singleResult, multiResult }
  } catch (error) {
    console.error('回答卡片失败:', error)
  }
}

// 示例：设置到期日期
export async function exampleSetDueDate() {
  try {
    const cardIds = [1483959291685, 1483959293217]
    
    // 设置为今天到期
    const todayResult = await setDueDate(cardIds, 0)
    console.log('设置为今天到期:', todayResult)
    
    // 设置为明天到期
    const tomorrowResult = await setDueDate(cardIds, 1)
    console.log('设置为明天到期:', tomorrowResult)
    
    // 设置为3-7天后随机到期
    const randomResult = await setDueDate(cardIds, '3-7')
    console.log('设置为随机到期:', randomResult)
    
    return { todayResult, tomorrowResult, randomResult }
  } catch (error) {
    console.error('设置到期日期失败:', error)
  }
}

// 示例：忘记和重新学习卡片
export async function exampleForgetAndRelearn() {
  try {
    const cardIds = [1483959291685, 1483959293217]
    
    // 忘记卡片（重置为新卡片）
    const forgetResult = await forgetCards(cardIds)
    console.log('忘记卡片结果:', forgetResult)
    
    // 重新学习卡片
    const relearnResult = await relearnCards(cardIds)
    console.log('重新学习结果:', relearnResult)
    
    return { forgetResult, relearnResult }
  } catch (error) {
    console.error('忘记和重新学习操作失败:', error)
  }
}

// 示例：设置卡片标志和到期时间
export async function exampleSetCardProperties() {
  try {
    const cardId = 1483959291685
    
    // 设置卡片标志
    const flagResult = await setCardFlag(cardId, 1)
    console.log('设置标志结果:', flagResult)
    
    // 设置卡片到期时间
    const dueTime = Math.floor(Date.now() / 1000) + 86400 // 明天
    const dueTimeResult = await setCardDueTime(cardId, dueTime)
    console.log('设置到期时间结果:', dueTimeResult)
    
    return { flagResult, dueTimeResult }
  } catch (error) {
    console.error('设置卡片属性失败:', error)
  }
}

// 综合示例：批量处理卡片
export async function exampleBatchProcessCards() {
  try {
    // 1. 查找所有暂停的卡片
    const suspendedCardIds = await findCards('is:suspended')
    console.log('找到暂停的卡片:', suspendedCardIds)
    
    if (suspendedCardIds.length > 0) {
      // 2. 恢复这些卡片
      const unsuspendResult = await unsuspendCards(suspendedCardIds)
      console.log('恢复卡片结果:', unsuspendResult)
      
      // 3. 获取卡片信息
      const cardsInfo = await getCardInfo(suspendedCardIds)
      console.log('卡片详细信息:', cardsInfo)
      
      // 4. 检查哪些卡片今天到期
      const dueStatus = await areCardsDue(suspendedCardIds)
      console.log('到期状态:', dueStatus)
      
      // 5. 为到期的卡片设置新的到期日期
      const dueCards = suspendedCardIds.filter((_, index) => dueStatus[index])
      if (dueCards.length > 0) {
        const setDueResult = await setDueDate(dueCards, '3-7')
        console.log('设置新到期日期结果:', setDueResult)
      }
      
      return {
        suspendedCardIds,
        unsuspendResult,
        cardsInfo,
        dueStatus,
        dueCards
      }
    }
    
    return { message: '没有找到暂停的卡片' }
  } catch (error) {
    console.error('批量处理卡片失败:', error)
  }
} 