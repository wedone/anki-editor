import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { ankiConnect, type Deck, type Note, type Model } from '@/api/ankiConnect'

export const useAnkiStore = defineStore('anki', () => {
  // 连接状态
  const isConnected = ref(false)
  const connectionError = ref<string | null>(null)
  const isLoading = ref(false)

  // 数据状态
  const decks = ref<Deck[]>([])
  const notes = ref<Note[]>([])
  const models = ref<Model[]>([])
  const tags = ref<string[]>([])

  // 连接设置
  const connectionSettings = reactive({
    host: 'localhost',
    port: 8765,
    apiKey: '',
    timeout: 5000
  })

  // 测试连接
  const testConnection = async () => {
    isLoading.value = true
    connectionError.value = null
    
    try {
      const connected = await ankiConnect.testConnection()
      isConnected.value = connected
      
      if (!connected) {
        connectionError.value = '无法连接到 AnkiConnect，请检查 Anki 是否运行并启用了 AnkiConnect 插件'
      }
    } catch (error) {
      isConnected.value = false
      connectionError.value = error instanceof Error ? error.message : '连接失败'
    } finally {
      isLoading.value = false
    }
  }

  // 更新连接设置
  const updateConnectionSettings = (settings: Partial<typeof connectionSettings>) => {
    Object.assign(connectionSettings, settings)
    
    // 重新初始化 AnkiConnect 服务
    Object.assign(ankiConnect, {
      baseUrl: `http://${connectionSettings.host}:${connectionSettings.port}`,
      apiKey: connectionSettings.apiKey || null,
      timeout: connectionSettings.timeout
    })
  }

  // 加载牌组列表
  const loadDecks = async () => {
    if (!isConnected.value) return
    
    try {
      const deckNames = await ankiConnect.getDeckNames()
      decks.value = deckNames.map(name => ({
        name,
        cardCount: 0, // 需要单独获取每个牌组的卡片数量
        lastModified: Date.now()
      }))
    } catch (error) {
      console.error('加载牌组失败:', error)
    }
  }

  // 创建牌组
  const createDeck = async (deckName: string) => {
    if (!isConnected.value) throw new Error('未连接到 Anki')
    
    try {
      await ankiConnect.createDeck(deckName)
      await loadDecks() // 重新加载牌组列表
      return true
    } catch (error) {
      console.error('创建牌组失败:', error)
      throw error
    }
  }

  // 删除牌组
  const deleteDeck = async (deckName: string) => {
    if (!isConnected.value) throw new Error('未连接到 Anki')
    
    try {
      await ankiConnect.deleteDeck(deckName)
      await loadDecks() // 重新加载牌组列表
      return true
    } catch (error) {
      console.error('删除牌组失败:', error)
      throw error
    }
  }

  // 加载模板列表
  const loadModels = async () => {
    if (!isConnected.value) return
    
    try {
      const modelNames = await ankiConnect.getModelNames()
      models.value = await Promise.all(
        modelNames.map(async name => {
          try {
            return await ankiConnect.getModel(name)
          } catch {
            return { name, fields: [], templates: [], css: '' }
          }
        })
      )
    } catch (error) {
      console.error('加载模板失败:', error)
    }
  }

  // 创建模板
  const createModel = async (modelName: string, fields: string[], templates: any[], css: string) => {
    if (!isConnected.value) throw new Error('未连接到 Anki')
    
    try {
      await ankiConnect.createModel(modelName, fields, templates, css)
      await loadModels() // 重新加载模板列表
      return true
    } catch (error) {
      console.error('创建模板失败:', error)
      throw error
    }
  }

  // 加载笔记
  const loadNotes = async (deckName?: string) => {
    if (!isConnected.value) return
    
    try {
      const query = deckName ? `deck:"${deckName}"` : ''
      const noteIds = await ankiConnect.findNotes(query)
      
      if (noteIds.length > 0) {
        notes.value = await ankiConnect.getNotesInfo(noteIds)
      } else {
        notes.value = []
      }
    } catch (error) {
      console.error('加载笔记失败:', error)
    }
  }

  // 添加笔记
  const addNote = async (deckName: string, modelName: string, fields: Record<string, string>, tags: string[] = []) => {
    if (!isConnected.value) throw new Error('未连接到 Anki')
    
    try {
      const noteId = await ankiConnect.addNote(deckName, modelName, fields, tags)
      await loadNotes(deckName) // 重新加载笔记列表
      return noteId
    } catch (error) {
      console.error('添加笔记失败:', error)
      throw error
    }
  }

  // 更新笔记
  const updateNote = async (noteId: number, fields: Record<string, string>, tags: string[] = []) => {
    if (!isConnected.value) throw new Error('未连接到 Anki')
    
    try {
      await ankiConnect.updateNote(noteId, fields, tags)
      await loadNotes() // 重新加载笔记列表
      return true
    } catch (error) {
      console.error('更新笔记失败:', error)
      throw error
    }
  }

  // 删除笔记
  const deleteNotes = async (noteIds: number[]) => {
    if (!isConnected.value) throw new Error('未连接到 Anki')
    
    try {
      await ankiConnect.deleteNotes(noteIds)
      await loadNotes() // 重新加载笔记列表
      return true
    } catch (error) {
      console.error('删除笔记失败:', error)
      throw error
    }
  }

  // 加载标签列表
  const loadTags = async () => {
    if (!isConnected.value) return
    
    try {
      tags.value = await ankiConnect.getTags()
    } catch (error) {
      console.error('加载标签失败:', error)
    }
  }

  // 获取统计信息
  const getStats = async () => {
    if (!isConnected.value) return null
    
    try {
      const [todayReviewed, collectionStats] = await Promise.all([
        ankiConnect.getNumCardsReviewedToday(),
        ankiConnect.getCollectionStats()
      ])
      
      return {
        todayReviewed,
        collectionStats
      }
    } catch (error) {
      console.error('获取统计信息失败:', error)
      return null
    }
  }

  // 初始化数据
  const initialize = async () => {
    await testConnection()
    if (isConnected.value) {
      await Promise.all([
        loadDecks(),
        loadModels(),
        loadTags()
      ])
    }
  }

  return {
    // 状态
    isConnected,
    connectionError,
    isLoading,
    decks,
    notes,
    models,
    tags,
    connectionSettings,
    
    // 方法
    testConnection,
    updateConnectionSettings,
    loadDecks,
    createDeck,
    deleteDeck,
    loadModels,
    createModel,
    loadNotes,
    addNote,
    updateNote,
    deleteNotes,
    loadTags,
    getStats,
    initialize
  }
}) 