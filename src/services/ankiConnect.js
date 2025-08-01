// AnkiConnect API 服务
const ANKI_CONNECT_URL = 'http://localhost:8765'

// 基础请求方法
async function invoke(action, version = 6, params = {}) {
  try {
    console.log(`AnkiConnect API 调用: ${action}`, params)
    
    const response = await fetch(ANKI_CONNECT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action,
        version,
        params
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    console.log(`AnkiConnect API 响应: ${action}`, result)
    
    if (result.error) {
      throw new Error(result.error)
    }

    return result.result
  } catch (error) {
    console.error(`AnkiConnect API Error (${action}):`, error)
    throw error
  }
}

// 检测连接状态
export async function checkConnection() {
  try {
    const version = await invoke('version')
    console.log('AnkiConnect 版本:', version)
    return { connected: true, error: null, version }
  } catch (error) {
    console.error('AnkiConnect 连接失败:', error)
    return { connected: false, error: error.message }
  }
}

// 获取牌组列表
export async function getDeckList() {
  try {
    const deckNames = await invoke('deckNames')
    console.log('获取到牌组列表:', deckNames)
    return deckNames.map(name => ({
      id: name,
      name: name
    }))
  } catch (error) {
    console.error('获取牌组列表失败:', error)
    throw error
  }
}

// 获取牌组信息
export async function getDeckConfig(deckName) {
  try {
    const config = await invoke('getDeckConfig', 6, { deck: deckName })
    return config
  } catch (error) {
    console.error('获取牌组配置失败:', error)
    throw error
  }
}

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
    const noteId = await invoke('cardsToNotes', 6, { cards: [cardId] })
    if (noteId.length > 0) {
      await invoke('updateNoteFields', 6, {
        note: {
          id: noteId[0],
          fields: fields
        }
      })
      return true
    }
    return false
  } catch (error) {
    console.error('更新卡片字段失败:', error)
    throw error
  }
}

export default {
  checkConnection,
  getDeckList,
  getDeckConfig,
  getCardsInDeck,
  getCardFields,
  updateCardFields
} 