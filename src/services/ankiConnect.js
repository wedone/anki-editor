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

// 基础操作
export async function sync() {
  return await invoke('sync')
}

export async function getVersion() {
  return await invoke('version')
}

// 牌组操作
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

export async function getDeckNames(includeSubdecks = false) {
  return await invoke('getDeckNames', 6, { includeSubdecks })
}

export async function getDeckConfig(deckName) {
  try {
    const config = await invoke('getDeckConfig', 6, { deck: deckName })
    return config
  } catch (error) {
    console.error('获取牌组配置失败:', error)
    throw error
  }
}

export async function setDeckConfigId(deck, configId) {
  return await invoke('setDeckConfigId', 6, { deck, configId })
}

export async function cloneDeckConfigId(name) {
  return await invoke('cloneDeckConfigId', 6, { name })
}

export async function removeDeckConfigId(configId) {
  return await invoke('removeDeckConfigId', 6, { configId })
}

export async function setDeckConfig(config) {
  return await invoke('setDeckConfig', 6, { config })
}

export async function getDeckConfigById(configId) {
  return await invoke('getDeckConfig', 6, { configId })
}

export async function createDeck(deck) {
  return await invoke('createDeck', 6, { deck })
}

export async function deleteDecks(decks, cardsToo = false) {
  return await invoke('deleteDecks', 6, { decks, cardsToo })
}

export async function getDeckStudyInfo(deck) {
  return await invoke('getDeckStudyInfo', 6, { deck })
}

// 卡片操作
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

export async function findCards(query) {
  return await invoke('findCards', 6, { query })
}

export async function getCardInfo(cards) {
  return await invoke('cardsInfo', 6, { cards })
}

export async function cardsToNotes(cards) {
  return await invoke('cardsToNotes', 6, { cards })
}

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

// 笔记操作
export async function addNote(note) {
  return await invoke('addNote', 6, { note })
}

export async function canAddNotes(notes) {
  return await invoke('canAddNotes', 6, { notes })
}

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

export async function updateNoteFields(note) {
  return await invoke('updateNoteFields', 6, { note })
}

export async function updateNote(note) {
  return await invoke('updateNote', 6, { note })
}

export async function findNotes(query) {
  return await invoke('findNotes', 6, { query })
}

export async function getNotesInfo(notes) {
  return await invoke('notesInfo', 6, { notes })
}

export async function getNotesModTime(notes) {
  return await invoke('notesModTime', 6, { notes })
}

export async function deleteNotes(notes) {
  return await invoke('deleteNotes', 6, { notes })
}

export async function removeEmptyNotes() {
  return await invoke('removeEmptyNotes', 6)
}

// 标签操作
export async function addTags(notes, tags) {
  return await invoke('addTags', 6, { notes, tags })
}

export async function removeTags(notes, tags) {
  return await invoke('removeTags', 6, { notes, tags })
}

export async function getTags() {
  return await invoke('getTags', 6)
}

export async function clearUnusedTags() {
  return await invoke('clearUnusedTags', 6)
}

export async function replaceTags(notes, tagToReplace, replaceWithTag) {
  return await invoke('replaceTags', 6, { 
    notes, 
    tag_to_replace: tagToReplace, 
    replace_with_tag: replaceWithTag 
  })
}

export async function replaceTagsInAllNotes(tagToReplace, replaceWithTag) {
  return await invoke('replaceTagsInAllNotes', 6, { 
    tag_to_replace: tagToReplace, 
    replace_with_tag: replaceWithTag 
  })
}

// 模型操作
export async function getModelNames() {
  return await invoke('getModelNames', 6)
}

export async function getModelFieldNames(modelName) {
  return await invoke('getModelFieldNames', 6, { modelName })
}

export async function getModelFieldTypes(modelName) {
  return await invoke('getModelFieldTypes', 6, { modelName })
}

export async function getModelStyling(modelName) {
  return await invoke('getModelStyling', 6, { modelName })
}

export async function getModelTemplates(modelName) {
  return await invoke('getModelTemplates', 6, { modelName })
}

export async function createModel(modelName, inOrderFields, css, cardTemplates) {
  return await invoke('createModel', 6, { 
    modelName, 
    inOrderFields, 
    css, 
    cardTemplates 
  })
}

export async function updateModelTemplates(model) {
  return await invoke('updateModelTemplates', 6, { model })
}

export async function updateModelStyling(model) {
  return await invoke('updateModelStyling', 6, { model })
}

export async function updateModelFields(model) {
  return await invoke('updateModelFields', 6, { model })
}

export async function updateModel(model) {
  return await invoke('updateModel', 6, { model })
}

export async function deleteModel(modelName) {
  return await invoke('deleteModel', 6, { modelName })
}

// 统计操作
export async function getNumCardsReviewedToday() {
  return await invoke('getNumCardsReviewedToday', 6)
}

export async function getNumCardsReviewedByDay() {
  return await invoke('getNumCardsReviewedByDay', 6)
}

export async function getCollectionStatsHTML(wholeCollection = false) {
  return await invoke('getCollectionStatsHTML', 6, { wholeCollection })
}

export async function getCardReviews(deck, startID) {
  return await invoke('cardReviews', 6, { deck, startID })
}

export async function getReviewsOfCards(cards) {
  return await invoke('getReviewsOfCards', 6, { cards })
}

export async function getLatestReviewID(deck) {
  return await invoke('getLatestReviewID', 6, { deck })
}

export async function insertReviews(reviews) {
  return await invoke('insertReviews', 6, { reviews })
}

// 媒体操作
export async function storeMediaFile(filename, data) {
  return await invoke('storeMediaFile', 6, { filename, data })
}

export async function retrieveMediaFile(filename) {
  return await invoke('retrieveMediaFile', 6, { filename })
}

export async function deleteMediaFile(filename) {
  return await invoke('deleteMediaFile', 6, { filename })
}

// 其他操作
export async function getCollectionStats() {
  return await invoke('getCollectionStats', 6)
}

export async function exportPackage(deck, path, includeSched = false) {
  return await invoke('exportPackage', 6, { deck, path, includeSched })
}

export async function importPackage(path) {
  return await invoke('importPackage', 6, { path })
}

export async function reloadCollection() {
  return await invoke('reloadCollection', 6)
}

export default {
  // 基础操作
  checkConnection,
  sync,
  getVersion,
  
  // 牌组操作
  getDeckList,
  getDeckNames,
  getDeckConfig,
  setDeckConfigId,
  cloneDeckConfigId,
  removeDeckConfigId,
  setDeckConfig,
  getDeckConfigById,
  createDeck,
  deleteDecks,
  getDeckStudyInfo,
  
  // 卡片操作
  getCardsInDeck,
  findCards,
  getCardInfo,
  cardsToNotes,
  getCardFields,
  
  // 笔记操作
  addNote,
  canAddNotes,
  updateCardFields,
  updateNoteFields,
  updateNote,
  findNotes,
  getNotesInfo,
  getNotesModTime,
  deleteNotes,
  removeEmptyNotes,
  
  // 标签操作
  addTags,
  removeTags,
  getTags,
  clearUnusedTags,
  replaceTags,
  replaceTagsInAllNotes,
  
  // 模型操作
  getModelNames,
  getModelFieldNames,
  getModelFieldTypes,
  getModelStyling,
  getModelTemplates,
  createModel,
  updateModelTemplates,
  updateModelStyling,
  updateModelFields,
  updateModel,
  deleteModel,
  
  // 统计操作
  getNumCardsReviewedToday,
  getNumCardsReviewedByDay,
  getCollectionStatsHTML,
  getCardReviews,
  getReviewsOfCards,
  getLatestReviewID,
  insertReviews,
  
  // 媒体操作
  storeMediaFile,
  retrieveMediaFile,
  deleteMediaFile,
  
  // 其他操作
  getCollectionStats,
  exportPackage,
  importPackage,
  reloadCollection
} 