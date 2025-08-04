// AnkiConnect 牌组操作方法
import { invoke } from './core.js'

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

// 获取牌组名称
export async function getDeckNames(includeSubdecks = false) {
  return await invoke('getDeckNames', 6, { includeSubdecks })
}

// 获取牌组名称和ID
export async function getDeckNamesAndIds(includeSubdecks = false) {
  return await invoke('getDeckNamesAndIds', 6, { includeSubdecks })
}

// 获取牌组信息
export async function getDecks(deckNames) {
  return await invoke('getDecks', 6, { decks: deckNames })
}

// 获取牌组配置
export async function getDeckConfig(deckName) {
  try {
    const config = await invoke('getDeckConfig', 6, { deck: deckName })
    return config
  } catch (error) {
    console.error('获取牌组配置失败:', error)
    throw error
  }
}

// 保存牌组配置
export async function saveDeckConfig(config) {
  return await invoke('saveDeckConfig', 6, { config })
}

// 设置牌组配置ID
export async function setDeckConfigId(deck, configId) {
  return await invoke('setDeckConfigId', 6, { deck, configId })
}

// 克隆牌组配置
export async function cloneDeckConfigId(name) {
  return await invoke('cloneDeckConfigId', 6, { name })
}

// 删除牌组配置
export async function removeDeckConfigId(configId) {
  return await invoke('removeDeckConfigId', 6, { configId })
}

// 设置牌组配置
export async function setDeckConfig(config) {
  return await invoke('setDeckConfig', 6, { config })
}

// 根据ID获取牌组配置
export async function getDeckConfigById(configId) {
  return await invoke('getDeckConfig', 6, { configId })
}

// 创建牌组
export async function createDeck(deck) {
  return await invoke('createDeck', 6, { deck })
}

// 删除牌组
export async function deleteDecks(decks, cardsToo = false) {
  return await invoke('deleteDecks', 6, { decks, cardsToo })
}

// 获取牌组学习信息
export async function getDeckStudyInfo(deck) {
  return await invoke('getDeckStudyInfo', 6, { deck })
} 