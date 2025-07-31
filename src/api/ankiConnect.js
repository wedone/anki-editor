/**
 * AnkiConnect API 服务
 * 基于 AnkiConnect 官方文档实现
 * https://git.sr.ht/~foosoft/anki-connect/tree/master/item/README.md
 */

class AnkiConnectAPI {
  constructor(host = 'localhost', port = 8765, apiKey = null, timeout = 30000) {
    this.baseUrl = `http://${host}:${port}`
    this.apiKey = apiKey
    this.timeout = timeout
    this.version = 6
    
    // 批处理配置
    this.config = {
      cardBatchSize: 5, // 卡片批处理大小
      statsBatchSize: 3, // 统计批处理大小
      batchDelay: 100, // 批次间延迟（毫秒）
      statsDelay: 200 // 统计批次间延迟（毫秒）
    }
  }

  /**
   * 发送请求到 AnkiConnect
   * @param {string} action - API 动作
   * @param {object} params - 请求参数
   * @returns {Promise} 响应结果
   */
  async sendRequest(action, params = {}) {
    const request = {
      action: action,
      version: this.version,
      params: params
    }

    // 如果设置了 API Key，添加到请求中
    if (this.apiKey) {
      request.key = this.apiKey
    }

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
        signal: AbortSignal.timeout(this.timeout)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      // 检查响应格式
      if (Object.getOwnPropertyNames(data).length !== 2) {
        throw new Error('response has an unexpected number of fields')
      }
      
      if (!data.hasOwnProperty('error')) {
        throw new Error('response is missing required error field')
      }
      
      if (!data.hasOwnProperty('result')) {
        throw new Error('response is missing required result field')
      }
      
      if (data.error !== null) {
        throw new Error(data.error)
      }

      return data.result
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error(`请求超时 (${this.timeout}ms)，请检查：
1. Anki 桌面应用是否正在运行
2. AnkiConnect 插件是否已安装并启用
3. 防火墙是否阻止了连接
4. 端口 8765 是否被其他程序占用`)
      } else if (error.message.includes('Failed to fetch')) {
        throw new Error(`无法连接到 Anki (${this.baseUrl})，请确保：
1. Anki 桌面应用正在运行
2. AnkiConnect 插件已安装 (插件代码: 2055492159)
3. 网络连接正常
4. 没有防火墙阻止连接`)
      } else {
        throw new Error(`AnkiConnect 请求失败: ${error.message}`)
      }
    }
  }

  /**
   * 测试连接
   * @returns {Promise<boolean>} 连接状态
   */
  async testConnection() {
    try {
      const response = await this.sendRequest('version')
      return response >= 6
    } catch (error) {
      console.error('连接测试失败:', error.message)
      return false
    }
  }

  /**
   * 获取所有牌组名称
   * @returns {Promise<Array>} 牌组名称列表
   */
  async getDeckNames() {
    return await this.sendRequest('deckNames')
  }

  /**
   * 获取牌组统计信息
   * @param {string} deckName - 牌组名称
   * @returns {Promise<object>} 牌组统计信息
   */
  async getDeckStats(deckName) {
    try {
      const response = await this.sendRequest('getDeckStats', { deck: deckName })
      return response
    } catch (error) {
      console.error(`获取牌组 ${deckName} 统计信息失败:`, error)
      return null
    }
  }

  /**
   * 创建牌组
   * @param {string} deckName - 牌组名称
   * @returns {Promise<number>} 牌组ID
   */
  async createDeck(deckName) {
    return await this.sendRequest('createDeck', { deck: deckName })
  }

  /**
   * 删除牌组
   * @param {string} deckName - 牌组名称
   * @returns {Promise<null>}
   */
  async deleteDeck(deckName) {
    return await this.sendRequest('deleteDecks', { 
      decks: [deckName],
      cardsToo: true 
    })
  }

  /**
   * 获取所有笔记类型
   * @returns {Promise<Array>} 笔记类型列表
   */
  async getModelNames() {
    return await this.sendRequest('modelNames')
  }

  /**
   * 获取笔记类型字段
   * @param {string} modelName - 笔记类型名称
   * @returns {Promise<Array>} 字段列表
   */
  async getModelFieldNames(modelName) {
    return await this.sendRequest('modelFieldNames', { modelName })
  }

  /**
   * 获取笔记类型信息
   * @param {string} modelName - 笔记类型名称
   * @returns {Promise<object>} 笔记类型信息
   */
  async getModelInfo(modelName) {
    return await this.sendRequest('modelInfo', { modelName })
  }

  /**
   * 获取所有笔记类型信息
   * @returns {Promise<object>} 笔记类型信息映射
   */
  async getModelsInfo() {
    return await this.sendRequest('modelNamesAndIds')
  }

  /**
   * 获取所有标签
   * @returns {Promise<Array>} 标签列表
   */
  async getTags() {
    return await this.sendRequest('getTags')
  }

  /**
   * 添加标签
   * @param {Array} notes - 笔记ID列表
   * @param {string} tag - 标签名称
   * @returns {Promise<null>}
   */
  async addTags(notes, tag) {
    return await this.sendRequest('addTags', { notes, tags: tag })
  }

  /**
   * 移除标签
   * @param {Array} notes - 笔记ID列表
   * @param {string} tag - 标签名称
   * @returns {Promise<null>}
   */
  async removeTags(notes, tag) {
    return await this.sendRequest('removeTags', { notes, tags: tag })
  }

  /**
   * 查找笔记
   * @param {string} query - 查询语句
   * @returns {Promise<Array>} 笔记ID列表
   */
  async findNotes(query) {
    return await this.sendRequest('findNotes', { query })
  }

  /**
   * 获取笔记信息
   * @param {Array} notes - 笔记ID列表
   * @returns {Promise<Array>} 笔记信息列表
   */
  async notesInfo(notes) {
    return await this.sendRequest('notesInfo', { notes })
  }

  /**
   * 获取卡片信息
   * @param {Array} cards - 卡片ID列表
   * @returns {Promise<Array>} 卡片信息列表
   */
  async cardsInfo(cards) {
    return await this.sendRequest('cardsInfo', { cards })
  }

  /**
   * 添加笔记
   * @param {object} note - 笔记对象
   * @returns {Promise<number>} 笔记ID
   */
  async addNote(note) {
    return await this.sendRequest('addNote', { note })
  }

  /**
   * 更新笔记字段
   * @param {number} noteId - 笔记ID
   * @param {object} fields - 字段内容
   * @returns {Promise<null>}
   */
  async updateNoteFields(noteId, fields) {
    return await this.sendRequest('updateNoteFields', { 
      note: { id: noteId, fields } 
    })
  }

  /**
   * 删除笔记
   * @param {Array} notes - 笔记ID列表
   * @returns {Promise<null>}
   */
  async deleteNotes(notes) {
    return await this.sendRequest('deleteNotes', { notes })
  }

  /**
   * 获取今日复习的卡片数量
   * @returns {Promise<number>} 卡片数量
   */
  async getNumCardsReviewedToday() {
    return await this.sendRequest('getNumCardsReviewedToday')
  }

  /**
   * 获取集合统计信息
   * @returns {Promise<object>} 集合统计信息
   */
  async getCollectionStats() {
    return await this.sendRequest('getCollectionStats')
  }

  /**
   * 获取所有牌组的统计信息（分批加载）
   * @returns {Promise<object>} 所有牌组统计信息
   */
  async getAllDeckStats() {
    try {
      const deckNames = await this.getDeckNames()
      const stats = {}
      
      // 分批处理牌组统计
      const batchSize = this.config.statsBatchSize
      for (let i = 0; i < deckNames.length; i += batchSize) {
        const batch = deckNames.slice(i, i + batchSize)
        console.log(`正在加载统计信息批次 ${Math.floor(i/batchSize) + 1}/${Math.ceil(deckNames.length/batchSize)}`)
        
        // 并行处理当前批次的牌组统计
        const batchPromises = batch.map(async (deckName) => {
          try {
            const deckStat = await this.getDeckStats(deckName)
            console.log(`牌组 "${deckName}" 统计信息加载完成`)
            return { deckName, stats: deckStat }
          } catch (error) {
            console.error(`获取牌组 ${deckName} 统计信息失败:`, error)
            return { deckName, stats: null }
          }
        })
        
        const batchResults = await Promise.allSettled(batchPromises)
        batchResults.forEach(result => {
          if (result.status === 'fulfilled') {
            stats[result.value.deckName] = result.value.stats
          }
        })
        
        // 添加小延迟
        if (i + batchSize < deckNames.length) {
          await new Promise(resolve => setTimeout(resolve, this.config.statsDelay))
        }
      }
      
      console.log(`总共加载了 ${Object.keys(stats).length} 个牌组的统计信息`)
      return stats
    } catch (error) {
      console.error('获取所有牌组统计信息失败:', error)
      return {}
    }
  }

  /**
   * 获取卡片状态统计
   * @returns {Promise<object>} 卡片状态统计
   */
  async getCardStatusStats() {
    const deckStats = await this.getAllDeckStats()
    const stats = {
      new: 0,
      learning: 0,
      review: 0,
      suspended: 0
    }
    
    Object.values(deckStats).forEach(deckStat => {
      if (deckStat) {
        stats.new += deckStat.new || 0
        stats.learning += deckStat.learning || 0
        stats.review += deckStat.review || 0
        stats.suspended += deckStat.suspended || 0
      }
    })
    
    return stats
  }

  /**
   * 获取牌组卡片列表
   * @param {string} deckName - 牌组名称
   * @returns {Promise<Array>} 卡片列表
   */
  async getDeckCards(deckName) {
    try {
      const query = `deck:"${deckName}"`
      const noteIds = await this.findNotes(query)
      const notes = await this.notesInfo(noteIds)
      
      return notes.map(note => ({
        id: note.noteId,
        cardIds: note.cards,
        deck: deckName,
        model: note.modelName,
        fields: note.fields,
        tags: note.tags,
        created: note.created,
        modified: note.modified
      }))
    } catch (error) {
      console.error(`获取牌组 ${deckName} 卡片失败:`, error)
      return []
    }
  }

  /**
   * 获取所有卡片信息（分批加载）
   * @returns {Promise<Array>} 所有卡片信息
   */
  async getAllCards() {
    try {
      const deckNames = await this.getDeckNames()
      const allCards = []
      
      // 分批处理牌组，避免一次性加载过多数据
      const batchSize = this.config.cardBatchSize
      for (let i = 0; i < deckNames.length; i += batchSize) {
        const batch = deckNames.slice(i, i + batchSize)
        console.log(`正在加载牌组批次 ${Math.floor(i/batchSize) + 1}/${Math.ceil(deckNames.length/batchSize)}`)
        
        // 并行处理当前批次的牌组
        const batchPromises = batch.map(async (deckName) => {
          try {
            const deckCards = await this.getDeckCards(deckName)
            console.log(`牌组 "${deckName}" 加载了 ${deckCards.length} 张卡片`)
            return deckCards
          } catch (error) {
            console.error(`获取牌组 ${deckName} 卡片失败:`, error)
            return [] // 返回空数组，继续处理其他牌组
          }
        })
        
        const batchResults = await Promise.allSettled(batchPromises)
        batchResults.forEach(result => {
          if (result.status === 'fulfilled') {
            allCards.push(...result.value)
          }
        })
        
        // 添加小延迟，避免过于频繁的请求
        if (i + batchSize < deckNames.length) {
          await new Promise(resolve => setTimeout(resolve, this.config.batchDelay))
        }
      }
      
      console.log(`总共加载了 ${allCards.length} 张卡片`)
      return allCards
    } catch (error) {
      console.error('获取所有卡片失败:', error)
      return []
    }
  }

  /**
   * 获取笔记类型字段信息
   * @param {string} modelName - 笔记类型名称
   * @returns {Promise<Array>} 字段信息列表
   */
  async getModelFields(modelName) {
    try {
      const modelInfo = await this.getModelInfo(modelName)
      return modelInfo.flds.map(field => ({
        name: field.name,
        sticky: field.sticky,
        rtl: field.rtl,
        ord: field.ord,
        font: field.font,
        size: field.size,
        media: field.media
      }))
    } catch (error) {
      console.error(`获取笔记类型 ${modelName} 字段信息失败:`, error)
      return []
    }
  }

  /**
   * 获取所有笔记类型字段信息
   * @returns {Promise<object>} 所有笔记类型字段信息
   */
  async getAllModelFields() {
    const modelNames = await this.getModelNames()
    const fields = {}
    
    for (const modelName of modelNames) {
      try {
        fields[modelName] = await this.getModelFields(modelName)
      } catch (error) {
        console.error(`获取笔记类型 ${modelName} 字段信息失败:`, error)
        fields[modelName] = []
      }
    }
    
    return fields
  }

  /**
   * 获取学习记录
   * @param {string} startDate - 开始日期 (YYYY-MM-DD)
   * @param {string} endDate - 结束日期 (YYYY-MM-DD)
   * @returns {Promise<Array>} 学习记录列表
   */
  async getReviewHistory(startDate, endDate) {
    try {
      // 获取所有卡片
      const allCards = await this.getAllCards()
      const cardIds = allCards.flatMap(card => card.cardIds)
      
      // 获取复习记录
      const reviews = await this.sendRequest('getReviewsOfCards', {
        cards: cardIds,
        startDate: startDate,
        endDate: endDate
      })
      
      return reviews
    } catch (error) {
      console.error('获取学习记录失败:', error)
      return []
    }
  }

  /**
   * 获取媒体文件列表
   * @returns {Promise<Array>} 媒体文件列表
   */
  async getMediaFiles() {
    return await this.sendRequest('getMediaFiles')
  }

  /**
   * 添加媒体文件
   * @param {string} filename - 文件名
   * @param {string} data - 文件数据 (base64)
   * @returns {Promise<null>}
   */
  async storeMediaFile(filename, data) {
    return await this.sendRequest('storeMediaFile', {
      filename: filename,
      data: data
    })
  }

  /**
   * 获取媒体文件
   * @param {string} filename - 文件名
   * @returns {Promise<string>} 文件数据 (base64)
   */
  async retrieveMediaFile(filename) {
    return await this.sendRequest('retrieveMediaFile', {
      filename: filename
    })
  }

  /**
   * 删除媒体文件
   * @param {string} filename - 文件名
   * @returns {Promise<null>}
   */
  async deleteMediaFile(filename) {
    return await this.sendRequest('deleteMediaFile', {
      filename: filename
    })
  }

  /**
   * 获取配置信息
   * @returns {Promise<object>} 配置信息
   */
  async getConfig() {
    return await this.sendRequest('getConfig')
  }

  /**
   * 设置配置信息
   * @param {object} config - 配置信息
   * @returns {Promise<null>}
   */
  async setConfig(config) {
    return await this.sendRequest('setConfig', { config: config })
  }

  /**
   * 获取用户信息
   * @returns {Promise<object>} 用户信息
   */
  async getUserInfo() {
    return await this.sendRequest('getUserInfo')
  }

  /**
   * 同步集合
   * @returns {Promise<null>}
   */
  async sync() {
    return await this.sendRequest('sync')
  }

  /**
   * 获取集合路径
   * @returns {Promise<string>} 集合路径
   */
  async getCollectionPath() {
    return await this.sendRequest('getCollectionPath')
  }

  /**
   * 获取数据库路径
   * @returns {Promise<string>} 数据库路径
   */
  async getDatabasePath() {
    return await this.sendRequest('getDatabasePath')
  }

  /**
   * 更新配置
   * @param {object} newConfig - 新配置
   */
  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig }
    console.log('AnkiConnect 配置已更新:', this.config)
  }

  /**
   * 获取当前配置
   * @returns {object} 当前配置
   */
  getConfig() {
    return { ...this.config }
  }
}

// 创建默认实例
const ankiConnect = new AnkiConnectAPI()

export default ankiConnect 