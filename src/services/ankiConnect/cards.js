// AnkiConnect 卡片操作方法
import { invoke } from './core.js'

// 获取牌组中的卡片
export async function getCardsInDeck(deckName) {
  try {
    console.log(`获取牌组 "${deckName}" 中的卡片...`)
    
    const cardIds = await invoke('findCards', 6, { query: `deck:"${deckName}"` })
    console.log(`找到 ${cardIds.length} 张卡片`)
    
    if (cardIds.length === 0) {
      return []
    }

    const cardsInfo = await invoke('cardsInfo', 6, { cards: cardIds })
    console.log('卡片信息:', cardsInfo)
    return cardsInfo
  } catch (error) {
    console.error('获取卡片列表失败:', error)
    throw error
  }
}

// 查找卡片
export async function findCards(query) {
  return await invoke('findCards', 6, { query })
}

// 获取卡片信息
export async function getCardInfo(cards) {
  return await invoke('cardsInfo', 6, { cards })
}

// 卡片转笔记
export async function cardsToNotes(cards) {
  return await invoke('cardsToNotes', 6, { cards })
}

// 获取卡片字段
export async function getCardFields(cardId) {
  try {
    const cardInfo = await invoke('cardsInfo', 6, { cards: [cardId] })
    if (cardInfo.length > 0) {
      return cardInfo[0].fields
    }
    return {}
  } catch (error) {
    console.error('获取卡片字段失败:', error)
    throw error
  }
} 