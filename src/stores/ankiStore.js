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
    
    return {
      type: 'danger',
      icon: 'Warning',
      text: connectionError.value || '未连接'
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
        id: name,
        name: name,
        cardCount: 0, // 暂时设为0，后续可以获取实际数量
        lastModified: new Date()
      }))
    } catch (error) {
      console.error('加载牌组失败:', error)
    }
  }

  const loadModels = async () => {
    if (!isConnected.value) return
    
    try {
      const modelNames = await ankiConnect.getModelNames()
      const modelsInfo = await ankiConnect.getModelsInfo()
      
      models.value = modelNames.map(name => ({
        id: name,
        name: name,
        fieldNames: [], // 暂时为空，后续可以获取字段信息
        modelId: modelsInfo[name] || 0
      }))
    } catch (error) {
      console.error('加载笔记类型失败:', error)
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
    }
  }

  const loadCards = async () => {
    if (!isConnected.value) return
    
    try {
      const allCards = await ankiConnect.getAllCards()
      cards.value = allCards
    } catch (error) {
      console.error('加载卡片失败:', error)
    }
  }

  const loadNotes = async () => {
    if (!isConnected.value) return
    
    try {
      // 获取所有笔记信息
      const allCards = await ankiConnect.getAllCards()
      const noteIds = [...new Set(allCards.map(card => card.id))]
      const notesInfo = await ankiConnect.notesInfo(noteIds)
      
      notes.value = notesInfo
    } catch (error) {
      console.error('加载笔记失败:', error)
    }
  }

  const loadDeckStats = async () => {
    if (!isConnected.value) return
    
    try {
      const stats = await ankiConnect.getAllDeckStats()
      deckStats.value = stats
    } catch (error) {
      console.error('加载牌组统计失败:', error)
    }
  }

  const loadCardStatusStats = async () => {
    if (!isConnected.value) return
    
    try {
      const stats = await ankiConnect.getCardStatusStats()
      cardStatusStats.value = stats
    } catch (error) {
      console.error('加载卡片状态统计失败:', error)
    }
  }

  const loadReviewHistory = async (startDate, endDate) => {
    if (!isConnected.value) return
    
    try {
      const history = await ankiConnect.getReviewHistory(startDate, endDate)
      reviewHistory.value = history
    } catch (error) {
      console.error('加载学习记录失败:', error)
    }
  }

  const loadOverallStats = async () => {
    if (!isConnected.value) return
    
    try {
      // 计算总体统计
      const totalCards = cards.value.length
      const totalDecks = decks.value.length
      const reviewedToday = await ankiConnect.getNumCardsReviewedToday()
      
      // 计算平均正确率（这里简化处理）
      const avgAccuracy = 85 // 实际应该从复习记录中计算
      
      overallStats.value = {
        totalCards,
        totalDecks,
        reviewedToday,
        avgAccuracy
      }
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
    if (!isConnected.value) {
      throw new Error('未连接到 Anki')
    }
    
    isLoading.value = true
    
    try {
      // 并行加载所有数据
      await Promise.allSettled([
        loadDecks(),
        loadModels(),
        loadTags(),
        loadCards(),
        loadNotes(),
        loadDeckStats(),
        loadCardStatusStats(),
        loadOverallStats()
      ])
    } catch (error) {
      console.error('刷新数据失败:', error)
      throw error
    } finally {
      isLoading.value = false
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
          loadTags(),
          loadCards(),
          loadNotes(),
          loadDeckStats(),
          loadCardStatusStats(),
          loadOverallStats()
        ])
      }
    } catch (error) {
      console.error('初始化失败:', error)
      // 不抛出错误，保持应用可用性
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
    initialize
  }
}) 