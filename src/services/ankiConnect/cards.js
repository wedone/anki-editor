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

// 更新卡片字段
export async function updateCardFields(cardId, fields) {
  try {
    console.log(`更新卡片 ${cardId} 的字段...`)
    const noteId = await invoke('cardsToNotes', 6, { cards: [cardId] })
    if (noteId.length > 0) {
      await invoke('updateNoteFields', 6, {
        note: {
          id: noteId[0],
          fields: fields
        }
      })
      console.log('字段更新成功')
      return true
    }
    console.log('未找到对应的笔记')
    return false
  } catch (error) {
    console.error('更新卡片字段失败:', error)
    throw error
  }
}

// 获取卡片易度因子
export async function getEaseFactors(cards) {
  try {
    console.log(`获取 ${cards.length} 张卡片的易度因子...`)
    const easeFactors = await invoke('getEaseFactors', 6, { cards })
    console.log('易度因子:', easeFactors)
    return easeFactors
  } catch (error) {
    console.error('获取易度因子失败:', error)
    throw error
  }
}

// 设置卡片易度因子
export async function setEaseFactors(cards, easeFactors) {
  try {
    console.log(`设置 ${cards.length} 张卡片的易度因子...`)
    const result = await invoke('setEaseFactors', 6, { cards, easeFactors })
    console.log('设置结果:', result)
    return result
  } catch (error) {
    console.error('设置易度因子失败:', error)
    throw error
  }
}

// 设置卡片特定值
export async function setSpecificValueOfCard(card, keys, newValues, warningCheck = false) {
  try {
    console.log(`设置卡片 ${card} 的特定值...`)
    const params = { card, keys, newValues }
    if (warningCheck) {
      params.warning_check = true
    }
    const result = await invoke('setSpecificValueOfCard', 6, params)
    console.log('设置结果:', result)
    return result
  } catch (error) {
    console.error('设置卡片特定值失败:', error)
    throw error
  }
}

// 暂停卡片
export async function suspendCards(cards) {
  try {
    console.log(`暂停 ${cards.length} 张卡片...`)
    const result = await invoke('suspend', 6, { cards })
    console.log('暂停结果:', result)
    return result
  } catch (error) {
    console.error('暂停卡片失败:', error)
    throw error
  }
}

// 恢复卡片
export async function unsuspendCards(cards) {
  try {
    console.log(`恢复 ${cards.length} 张卡片...`)
    const result = await invoke('unsuspend', 6, { cards })
    console.log('恢复结果:', result)
    return result
  } catch (error) {
    console.error('恢复卡片失败:', error)
    throw error
  }
}

// 检查单张卡片是否暂停
export async function isCardSuspended(card) {
  try {
    const result = await invoke('suspended', 6, { card })
    return result
  } catch (error) {
    console.error('检查卡片暂停状态失败:', error)
    throw error
  }
}

// 检查多张卡片是否暂停
export async function areCardsSuspended(cards) {
  try {
    console.log(`检查 ${cards.length} 张卡片的暂停状态...`)
    const result = await invoke('areSuspended', 6, { cards })
    console.log('暂停状态:', result)
    return result
  } catch (error) {
    console.error('检查卡片暂停状态失败:', error)
    throw error
  }
}

// 检查卡片是否到期
export async function areCardsDue(cards) {
  try {
    console.log(`检查 ${cards.length} 张卡片的到期状态...`)
    const result = await invoke('areDue', 6, { cards })
    console.log('到期状态:', result)
    return result
  } catch (error) {
    console.error('检查卡片到期状态失败:', error)
    throw error
  }
}

// 获取卡片间隔
export async function getCardIntervals(cards, complete = false) {
  try {
    console.log(`获取 ${cards.length} 张卡片的间隔信息...`)
    const params = { cards }
    if (complete) {
      params.complete = true
    }
    const result = await invoke('getIntervals', 6, params)
    console.log('间隔信息:', result)
    return result
  } catch (error) {
    console.error('获取卡片间隔失败:', error)
    throw error
  }
}

// 获取卡片修改时间
export async function getCardsModTime(cards) {
  try {
    console.log(`获取 ${cards.length} 张卡片的修改时间...`)
    const result = await invoke('cardsModTime', 6, { cards })
    console.log('修改时间:', result)
    return result
  } catch (error) {
    console.error('获取卡片修改时间失败:', error)
    throw error
  }
}

// 忘记卡片（重置为新卡片）
export async function forgetCards(cards) {
  try {
    console.log(`忘记 ${cards.length} 张卡片...`)
    const result = await invoke('forgetCards', 6, { cards })
    console.log('忘记结果:', result)
    return result
  } catch (error) {
    console.error('忘记卡片失败:', error)
    throw error
  }
}

// 重新学习卡片
export async function relearnCards(cards) {
  try {
    console.log(`重新学习 ${cards.length} 张卡片...`)
    const result = await invoke('relearnCards', 6, { cards })
    console.log('重新学习结果:', result)
    return result
  } catch (error) {
    console.error('重新学习卡片失败:', error)
    throw error
  }
}

// 回答卡片
export async function answerCards(answers) {
  try {
    console.log(`回答 ${answers.length} 张卡片...`)
    const result = await invoke('answerCards', 6, { answers })
    console.log('回答结果:', result)
    return result
  } catch (error) {
    console.error('回答卡片失败:', error)
    throw error
  }
}

// 设置卡片到期日期
export async function setDueDate(cards, days) {
  try {
    console.log(`设置 ${cards.length} 张卡片的到期日期为 ${days}...`)
    const result = await invoke('setDueDate', 6, { cards, days })
    console.log('设置到期日期结果:', result)
    return result
  } catch (error) {
    console.error('设置到期日期失败:', error)
    throw error
  }
}

// 便捷方法：回答单张卡片
export async function answerCard(cardId, ease) {
  return await answerCards([{ cardId, ease }])
}

// 便捷方法：设置卡片标志
export async function setCardFlag(cardId, flag) {
  return await setSpecificValueOfCard(cardId, ['flags'], [flag.toString()])
}

// 便捷方法：设置卡片到期时间
export async function setCardDueTime(cardId, dueTime) {
  return await setSpecificValueOfCard(cardId, ['odue'], [dueTime.toString()])
}

// 获取卡片（别名）
export async function getCards(query) {
  if (typeof query === 'string') {
    const cardIds = await findCards(query)
    return await getCardInfo(cardIds)
  }
  return await getCardInfo(query)
}

// 获取单张卡片
export async function getCard(cardId) {
  const cardsInfo = await getCardInfo([cardId])
  return cardsInfo.length > 0 ? cardsInfo[0] : null
}

// 更新卡片
export async function updateCard(cardId, updates) {
  try {
    console.log(`更新卡片 ${cardId}...`)
    const result = await invoke('updateCard', 6, { card: cardId, ...updates })
    console.log('更新结果:', result)
    return result
  } catch (error) {
    console.error('更新卡片失败:', error)
    throw error
  }
}

// 更新多张卡片
export async function updateCards(cards) {
  try {
    console.log(`更新 ${cards.length} 张卡片...`)
    const results = []
    for (const card of cards) {
      const result = await updateCard(card.id, card.updates)
      results.push(result)
    }
    console.log('批量更新结果:', results)
    return results
  } catch (error) {
    console.error('批量更新卡片失败:', error)
    throw error
  }
} 