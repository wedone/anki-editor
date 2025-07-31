/**
 * AnkiConnect API 服务
 * 基于 AnkiConnect 官方文档实现
 * https://git.sr.ht/~foosoft/anki-connect/tree/master/item/README.md
 */

class AnkiConnectAPI {
  constructor() {
    this.baseUrl = 'http://127.0.0.1:8765'
    this.version = 6
    this.timeout = 10000 // 10秒超时
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
      
      if (data.error) {
        throw new Error(data.error)
      }

      return data.result
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('请求超时，请检查 Anki 是否正在运行且 AnkiConnect 插件已启用')
      } else if (error.message.includes('Failed to fetch')) {
        throw new Error('无法连接到 Anki，请确保 Anki 正在运行且 AnkiConnect 插件已安装')
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
      const result = await this.sendRequest('version')
      return result >= 6
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
   * 获取牌组配置
   * @param {string} deckName - 牌组名称
   * @returns {Promise<object>} 牌组配置
   */
  async getDeckConfig(deckName) {
    return await this.sendRequest('getDeckConfig', { deck: deckName })
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
   * 获取牌组中的卡片数量
   * @param {string} deckName - 牌组名称
   * @returns {Promise<number>} 卡片数量
   */
  async getCardCount(deckName) {
    return await this.sendRequest('getDeckConfig', { deck: deckName })
      .then(config => config.new?.perDay || 0)
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
   * @param {boolean} wholeCollection - 是否包含整个集合
   * @returns {Promise<string>} HTML格式的统计信息
   */
  async getCollectionStatsHTML(wholeCollection = true) {
    return await this.sendRequest('getCollectionStatsHTML', { wholeCollection })
  }

  /**
   * 获取牌组统计信息
   * @param {string} deckName - 牌组名称
   * @returns {Promise<object>} 牌组统计信息
   */
  async getDeckStats(deckName) {
    try {
      // 获取牌组中的卡片
      const query = `deck:"${deckName}"`
      const noteIds = await this.findNotes(query)
      
      if (noteIds.length === 0) {
        return {
          total: 0,
          new: 0,
          learning: 0,
          review: 0,
          suspended: 0
        }
      }

      // 获取卡片信息
      const notes = await this.notesInfo(noteIds)
      const cardIds = notes.flatMap(note => note.cards)
      const cards = await this.cardsInfo(cardIds)

      // 统计卡片状态
      const stats = {
        total: cards.length,
        new: 0,
        learning: 0,
        review: 0,
        suspended: 0
      }

      cards.forEach(card => {
        if (card.suspended) {
          stats.suspended++
        } else if (card.queue === 0) {
          stats.new++
        } else if (card.queue === 1 || card.queue === 3) {
          stats.learning++
        } else if (card.queue === 2) {
          stats.review++
        }
      })

      return stats
    } catch (error) {
      console.error(`获取牌组 ${deckName} 统计信息失败:`, error)
      return null
    }
  }

  /**
   * 获取所有牌组的统计信息
   * @returns {Promise<object>} 所有牌组统计信息
   */
  async getAllDeckStats() {
    const deckNames = await this.getDeckNames()
    const stats = {}
    
    for (const deckName of deckNames) {
      try {
        stats[deckName] = await this.getDeckStats(deckName)
      } catch (error) {
        console.error(`获取牌组 ${deckName} 统计信息失败:`, error)
        stats[deckName] = null
      }
    }
    
    return stats
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
   * 获取所有卡片信息
   * @returns {Promise<Array>} 所有卡片信息
   */
  async getAllCards() {
    const deckNames = await this.getDeckNames()
    const allCards = []
    
    for (const deckName of deckNames) {
      try {
        const deckCards = await this.getDeckCards(deckName)
        allCards.push(...deckCards)
      } catch (error) {
        console.error(`获取牌组 ${deckName} 卡片失败:`, error)
      }
    }
    
    return allCards
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
}

// 创建单例实例
const ankiConnect = new AnkiConnectAPI()

export default ankiConnect 