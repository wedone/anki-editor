import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import ankiConnect from '../api/ankiConnect.js'

export const useAnkiStore = defineStore('anki', () => {
  // 状态
  const isConnected = ref(false)
  const connectionError = ref('')
  const isLoading = ref(false)
  
  // 基础数据
  const decks = ref([])
  const models = ref([])
  const tags = ref([])
  const cards = ref([])
  const notes = ref([])

  // 统计信息
  const deckStats = ref({})
  const cardStatusStats = ref({})
  const reviewHistory = ref([])
  const overallStats = ref({
    totalCards: 0,
    totalDecks: 0,
    reviewedToday: 0,
    avgAccuracy: 0
  })
  
  // 计算属性
  const connectionStatus = computed(() => {
    if (isLoading.value) {
      return {
        type: 'warning',
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
    
    // 根据错误类型显示不同的信息
    let errorText = '未连接'
    if (connectionError.value) {
      if (connectionError.value.includes('超时')) {
        errorText = '连接超时'
      } else if (connectionError.value.includes('Failed to fetch')) {
        errorText = '无法连接'
      } else if (connectionError.value.includes('HTTP error')) {
        errorText = '服务错误'
      } else {
        errorText = '连接失败'
      }
    }
    
    return {
      type: 'danger',
      icon: 'Warning',
      text: errorText
    }
  })

  const deckCount = computed(() => decks.value.length)
  const modelCount = computed(() => models.value.length)
  const tagCount = computed(() => tags.value.length)
  const cardCount = computed(() => cards.value.length)
  const noteCount = computed(() => notes.value.length)

  // 方法
  const testConnection = async () => {
    isLoading.value = true
    connectionError.value = ''
    
    try {
      console.log('正在测试 AnkiConnect 连接...')
      const connected = await ankiConnect.testConnection()
      
      if (connected) {
        console.log('AnkiConnect 连接测试成功')
        isConnected.value = true
        connectionError.value = ''
      } else {
        console.warn('AnkiConnect 连接测试失败')
        isConnected.value = false
        connectionError.value = '连接失败，请检查 Anki 是否正在运行且 AnkiConnect 插件已安装'
      }
      
      return connected
    } catch (error) {
      console.error('AnkiConnect 连接测试出错:', error.message)
      isConnected.value = false
      connectionError.value = error.message
      return false
    } finally {
      isLoading.value = false
    }
  }

  const loadDecks = async () => {
    if (!isConnected.value) {
      console.warn('跳过加载牌组：未连接到 Anki')
      return
    }
    
    try {
      console.log('正在加载牌组...')
      const deckNames = await ankiConnect.getDeckNames()
      decks.value = deckNames.map(name => ({
        id: name,
        name: name,
        cardCount: 0, // 暂时设为0，后续可以获取实际数量
        lastModified: new Date()
      }))
      console.log(`加载了 ${deckNames.length} 个牌组`)
    } catch (error) {
      console.error('加载牌组失败:', error)
    }
  }

  const loadModels = async () => {
    if (!isConnected.value) {
      console.warn('跳过加载笔记类型：未连接到 Anki')
      return
    }
    
    try {
      console.log('正在加载笔记类型...')
      const modelNames = await ankiConnect.getModelNames()
      const modelsInfo = await ankiConnect.getModelsInfo()
      
      models.value = modelNames.map(name => ({
        id: name,
        name: name,
        fieldNames: [], // 暂时为空，后续可以获取字段信息
        modelId: modelsInfo[name] || 0
      }))
      console.log(`加载了 ${modelNames.length} 个笔记类型`)
    } catch (error) {
      console.error('加载笔记类型失败:', error)
    }
  }

  const loadTags = async () => {
    if (!isConnected.value) {
      console.warn('跳过加载标签：未连接到 Anki')
      return
    }
    
    try {
      console.log('正在加载标签...')
      const tagList = await ankiConnect.getTags()
      tags.value = tagList.map(tag => ({
        id: tag,
        name: tag,
        count: 0 // 暂时设为0，后续可以获取实际数量
      }))
      console.log(`加载了 ${tagList.length} 个标签`)
    } catch (error) {
      console.error('加载标签失败:', error)
    }
  }

  const loadCards = async () => {
    if (!isConnected.value) {
      console.warn('跳过加载卡片：未连接到 Anki')
      return
    }
    
    try {
      console.log('正在加载卡片...')
      const allCards = await ankiConnect.getAllCards()
      cards.value = allCards
      console.log(`加载了 ${allCards.length} 张卡片`)
    } catch (error) {
      console.error('加载卡片失败:', error)
    }
  }

  const loadNotes = async () => {
    if (!isConnected.value) {
      console.warn('跳过加载笔记：未连接到 Anki')
      return
    }
    
    try {
      console.log('正在加载笔记...')
      // 获取所有笔记信息
      const allCards = await ankiConnect.getAllCards()
      const noteIds = [...new Set(allCards.map(card => card.id))]
      const notesInfo = await ankiConnect.notesInfo(noteIds)
      
      notes.value = notesInfo
      console.log(`加载了 ${notesInfo.length} 个笔记`)
    } catch (error) {
      console.error('加载笔记失败:', error)
    }
  }

  const loadDeckStats = async () => {
    if (!isConnected.value) {
      console.warn('跳过加载牌组统计：未连接到 Anki')
      return
    }
    
    try {
      console.log('正在加载牌组统计...')
      const stats = await ankiConnect.getAllDeckStats()
      deckStats.value = stats
      console.log(`加载了 ${Object.keys(stats).length} 个牌组的统计信息`)
    } catch (error) {
      console.error('加载牌组统计失败:', error)
    }
  }

  const loadCardStatusStats = async () => {
    if (!isConnected.value) {
      console.warn('跳过加载卡片状态统计：未连接到 Anki')
      return
    }
    
    try {
      console.log('正在加载卡片状态统计...')
      const stats = await ankiConnect.getCardStatusStats()
      cardStatusStats.value = stats
      console.log('卡片状态统计加载完成')
    } catch (error) {
      console.error('加载卡片状态统计失败:', error)
    }
  }

  const loadReviewHistory = async (startDate, endDate) => {
    if (!isConnected.value) {
      console.warn('跳过加载学习记录：未连接到 Anki')
      return
    }
    
    try {
      console.log('正在加载学习记录...')
      const history = await ankiConnect.getReviewHistory(startDate, endDate)
      reviewHistory.value = history
      console.log(`加载了 ${history.length} 条学习记录`)
    } catch (error) {
      console.error('加载学习记录失败:', error)
    }
  }

  const loadOverallStats = async () => {
    if (!isConnected.value) {
      console.warn('跳过加载总体统计：未连接到 Anki')
      return
    }
    
    try {
      console.log('正在加载总体统计...')
      // 计算总体统计
      const totalCards = cards.value.length
      const totalDecks = decks.value.length
      const reviewedToday = await ankiConnect.getNumCardsReviewedToday()
      
      // 尝试获取集合统计信息
      let collectionStats = null
      try {
        collectionStats = await ankiConnect.getCollectionStats()
      } catch (error) {
        console.warn('获取集合统计信息失败，使用默认值:', error)
      }
      
      // 计算平均正确率（这里简化处理）
      const avgAccuracy = 85 // 实际应该从复习记录中计算
      
      overallStats.value = {
        totalCards,
        totalDecks,
        reviewedToday,
        avgAccuracy,
        collectionStats
      }
      console.log('总体统计加载完成')
    } catch (error) {
      console.error('加载总体统计失败:', error)
    }
  }

  const createDeck = async (deckName) => {
    if (!isConnected.value) {
      throw new Error('未连接到 Anki')
    }
    
    try {
      await ankiConnect.createDeck(deckName)
      await loadDecks() // 重新加载牌组列表
      return true
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
      await loadDecks() // 重新加载牌组列表
      return true
    } catch (error) {
      console.error('删除牌组失败:', error)
      throw error
    }
  }

  const addNote = async (note) => {
    if (!isConnected.value) {
      throw new Error('未连接到 Anki')
    }
    
    try {
      const noteId = await ankiConnect.addNote(note)
      await loadCards() // 重新加载卡片列表
      return noteId
    } catch (error) {
      console.error('添加笔记失败:', error)
      throw error
    }
  }

  const updateNoteFields = async (noteId, fields) => {
    if (!isConnected.value) {
      throw new Error('未连接到 Anki')
    }
    
    try {
      await ankiConnect.updateNoteFields(noteId, fields)
      await loadCards() // 重新加载卡片列表
      return true
    } catch (error) {
      console.error('更新笔记字段失败:', error)
      throw error
    }
  }

  const deleteNotes = async (noteIds) => {
    if (!isConnected.value) {
      throw new Error('未连接到 Anki')
    }
    
    try {
      await ankiConnect.deleteNotes(noteIds)
      await loadCards() // 重新加载卡片列表
      return true
    } catch (error) {
      console.error('删除笔记失败:', error)
      throw error
    }
  }

  const addTags = async (noteIds, tag) => {
    if (!isConnected.value) {
      throw new Error('未连接到 Anki')
    }
    
    try {
      await ankiConnect.addTags(noteIds, tag)
      await loadTags() // 重新加载标签列表
      return true
    } catch (error) {
      console.error('添加标签失败:', error)
      throw error
    }
  }

  const removeTags = async (noteIds, tag) => {
    if (!isConnected.value) {
      throw new Error('未连接到 Anki')
    }
    
    try {
      await ankiConnect.removeTags(noteIds, tag)
      await loadTags() // 重新加载标签列表
      return true
    } catch (error) {
      console.error('移除标签失败:', error)
      throw error
    }
  }

  const refreshData = async () => {
    isLoading.value = true
    
    try {
      // 首先测试连接
      const connected = await testConnection()
      
      if (!connected) {
        throw new Error('未连接到 Anki，请先确保 Anki 正在运行且 AnkiConnect 插件已安装')
      }
      
      console.log('开始刷新数据...')
      
      // 分阶段刷新数据
      // 第一阶段：刷新基础数据
      console.log('第一阶段：刷新基础数据...')
      await Promise.allSettled([
        loadDecks(),
        loadModels(),
        loadTags()
      ])
      
      // 第二阶段：刷新详细数据
      console.log('第二阶段：刷新详细数据...')
      await Promise.allSettled([
        loadCards(),
        loadNotes(),
        loadDeckStats(),
        loadCardStatusStats(),
        loadOverallStats()
      ])
      
      console.log('数据刷新完成')
    } catch (error) {
      console.error('刷新数据失败:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const initialize = async () => {
    try {
      // 首先测试连接
      const connected = await testConnection()
      
      if (connected) {
        console.log('AnkiConnect 连接成功，开始加载数据...')
        
        // 分阶段加载数据，避免一次性加载过多数据
        // 第一阶段：加载基础数据（牌组、笔记类型、标签）
        console.log('第一阶段：加载基础数据...')
        await Promise.allSettled([
          loadDecks(),
          loadModels(),
          loadTags()
        ])
        
        // 第二阶段：加载详细数据（卡片、笔记、统计）
        console.log('第二阶段：加载详细数据...')
        await Promise.allSettled([
          loadCards(),
          loadNotes(),
          loadDeckStats(),
          loadCardStatusStats(),
          loadOverallStats()
        ])
        
        console.log('数据加载完成')
      } else {
        // 连接失败时的处理
        console.warn('AnkiConnect 连接失败，应用将以离线模式运行')
        console.warn('连接错误:', connectionError.value)
        // 清空数据，确保显示离线状态
        decks.value = []
        models.value = []
        tags.value = []
        cards.value = []
        notes.value = []
        deckStats.value = {}
        cardStatusStats.value = {}
        reviewHistory.value = []
        overallStats.value = {
          totalCards: 0,
          totalDecks: 0,
          reviewedToday: 0,
          avgAccuracy: 0
        }
      }
    } catch (error) {
      console.error('初始化失败:', error)
      // 不抛出错误，保持应用可用性
      // 设置连接错误信息
      connectionError.value = error.message
      // 确保连接状态为 false
      isConnected.value = false
    }
  }

  const createAnkiConnectInstance = (host = 'localhost', port = 8765, apiKey = null, timeout = 30000) => {
    const AnkiConnectAPI = ankiConnect.constructor
    return new AnkiConnectAPI(host, port, apiKey, timeout)
  }

  const updateAnkiConnectConfig = (newConfig) => {
    ankiConnect.updateConfig(newConfig)
  }

  const getAnkiConnectConfig = () => {
    return ankiConnect.getConfig()
  }

  return {
    // 状态
    isConnected,
    connectionError,
    isLoading,
    decks,
    models,
    tags,
    cards,
    notes,
    deckStats,
    cardStatusStats,
    reviewHistory,
    overallStats,
    
    // 计算属性
    connectionStatus,
    deckCount,
    modelCount,
    tagCount,
    cardCount,
    noteCount,
    
    // 方法
    testConnection,
    loadDecks,
    loadModels,
    loadTags,
    loadCards,
    loadNotes,
    loadDeckStats,
    loadCardStatusStats,
    loadReviewHistory,
    loadOverallStats,
    createDeck,
    deleteDeck,
    addNote,
    updateNoteFields,
    deleteNotes,
    addTags,
    removeTags,
    refreshData,
    initialize,
    createAnkiConnectInstance,
    updateAnkiConnectConfig,
    getAnkiConnectConfig
  }
}) 