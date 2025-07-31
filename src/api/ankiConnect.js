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
}

// 创建单例实例
const ankiConnect = new AnkiConnectAPI()

export default ankiConnect 