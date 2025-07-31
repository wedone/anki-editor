import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import ankiConnect from '../api/ankiConnect.js'

export const useAnkiStore = defineStore('anki', () => {
  // 状态
  const isConnected = ref(false)
  const connectionError = ref('')
  const isLoading = ref(false)
  
  // 数据
  const decks = ref([])
  const models = ref([])
  const tags = ref([])
  
  // 计算属性
  const connectionStatus = computed(() => {
    if (isLoading.value) {
      return {
        type: 'info',
        icon: 'Loading',
        text: '连接中...'
      }
    }
    
    if (isConnected.value) {
      return {
        type: 'success',
        icon: 'Connection',
        text: '已连接'
      }
    }
    
    return {
      type: 'danger',
      icon: 'Warning',
      text: connectionError.value || '未连接'
    }
  })

  const deckCount = computed(() => decks.value.length)
  const modelCount = computed(() => models.value.length)
  const tagCount = computed(() => tags.value.length)

  // 方法
  const testConnection = async () => {
    isLoading.value = true
    connectionError.value = ''
    
    try {
      const connected = await ankiConnect.testConnection()
      isConnected.value = connected
      
      if (!connected) {
        connectionError.value = '连接失败，请检查 Anki 是否正在运行'
      }
      
      return connected
    } catch (error) {
      isConnected.value = false
      connectionError.value = error.message
      return false
    } finally {
      isLoading.value = false
    }
  }

  const loadDecks = async () => {
    if (!isConnected.value) return
    
    try {
      const deckNames = await ankiConnect.getDeckNames()
      decks.value = deckNames.map(name => ({
        id: name, // 使用名称作为ID
        name: name,
        cardCount: 0, // 暂时设为0，后续可以获取实际数量
        lastModified: new Date() // 暂时使用当前时间
      }))
    } catch (error) {
      console.error('加载牌组失败:', error)
      throw error
    }
  }

  const loadModels = async () => {
    if (!isConnected.value) return
    
    try {
      const modelNames = await ankiConnect.getModelNames()
      models.value = modelNames.map(name => ({
        id: name,
        name: name,
        fieldNames: [] // 暂时为空，后续可以获取字段信息
      }))
    } catch (error) {
      console.error('加载笔记类型失败:', error)
      throw error
    }
  }

  const loadTags = async () => {
    if (!isConnected.value) return
    
    try {
      const tagList = await ankiConnect.getTags()
      tags.value = tagList.map(tag => ({
        id: tag,
        name: tag,
        count: 0 // 暂时设为0，后续可以获取实际数量
      }))
    } catch (error) {
      console.error('加载标签失败:', error)
      throw error
    }
  }

  const createDeck = async (deckName) => {
    if (!isConnected.value) {
      throw new Error('未连接到 Anki')
    }
    
    try {
      const deckId = await ankiConnect.createDeck(deckName)
      
      // 添加到本地状态
      const newDeck = {
        id: deckName,
        name: deckName,
        cardCount: 0,
        lastModified: new Date()
      }
      decks.value.push(newDeck)
      
      return deckId
    } catch (error) {
      console.error('创建牌组失败:', error)
      throw error
    }
  }

  const deleteDeck = async (deckName) => {
    if (!isConnected.value) {
      throw new Error('未连接到 Anki')
    }
    
    try {
      await ankiConnect.deleteDeck(deckName)
      
      // 从本地状态移除
      const index = decks.value.findIndex(deck => deck.name === deckName)
      if (index > -1) {
        decks.value.splice(index, 1)
      }
    } catch (error) {
      console.error('删除牌组失败:', error)
      throw error
    }
  }

  const initialize = async () => {
    try {
      const connected = await testConnection()
      if (connected) {
        // 并行加载数据
        await Promise.allSettled([
          loadDecks(),
          loadModels(),
          loadTags()
        ])
      }
    } catch (error) {
      console.error('初始化失败:', error)
      // 不抛出错误，保持应用可用性
    }
  }

  const refreshData = async () => {
    if (!isConnected.value) return
    
    try {
      await Promise.allSettled([
        loadDecks(),
        loadModels(),
        loadTags()
      ])
    } catch (error) {
      console.error('刷新数据失败:', error)
    }
  }

  return {
    // 状态
    isConnected,
    connectionError,
    isLoading,
    decks,
    models,
    tags,
    
    // 计算属性
    connectionStatus,
    deckCount,
    modelCount,
    tagCount,
    
    // 方法
    testConnection,
    loadDecks,
    loadModels,
    loadTags,
    createDeck,
    deleteDeck,
    initialize,
    refreshData
  }
}) 