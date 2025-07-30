// AnkiConnect API 服务
export interface AnkiConnectRequest {
  action: string
  version: number
  params?: any
  key?: string
}

export interface AnkiConnectResponse {
  result: any
  error: string | null
}

export interface Deck {
  name: string
  cardCount: number
  lastModified: number
}

export interface Note {
  id: number
  deckName: string
  modelName: string
  fields: Record<string, string>
  tags: string[]
  lastModified: number
}

export interface Model {
  name: string
  fields: string[]
  templates: any[]
  css: string
}

export class AnkiConnectService {
  private baseUrl: string
  private apiKey: string | null
  private timeout: number

  constructor(host: string = 'localhost', port: number = 8765, apiKey?: string, timeout: number = 5000) {
    this.baseUrl = `http://${host}:${port}`
    this.apiKey = apiKey || null
    this.timeout = timeout
  }

  // 发送请求到 AnkiConnect
  private async sendRequest(request: AnkiConnectRequest): Promise<AnkiConnectResponse> {
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
      return data
    } catch (error) {
      console.error('AnkiConnect request failed:', error)
      throw error
    }
  }

  // 测试连接
  async testConnection(): Promise<boolean> {
    try {
      const response = await this.sendRequest({
        action: 'version',
        version: 6
      })
      return response.error === null
    } catch (error) {
      return false
    }
  }

  // 获取牌组列表
  async getDeckNames(): Promise<string[]> {
    const response = await this.sendRequest({
      action: 'deckNames',
      version: 6
    })

    if (response.error) {
      throw new Error(response.error)
    }

    return response.result
  }

  // 获取牌组统计信息
  async getDeckStats(deckName: string): Promise<any> {
    const response = await this.sendRequest({
      action: 'getDeckStats',
      version: 6,
      params: {
        deck: deckName
      }
    })

    if (response.error) {
      throw new Error(response.error)
    }

    return response.result
  }

  // 创建牌组
  async createDeck(deckName: string): Promise<number> {
    const response = await this.sendRequest({
      action: 'createDeck',
      version: 6,
      params: {
        deck: deckName
      }
    })

    if (response.error) {
      throw new Error(response.error)
    }

    return response.result
  }

  // 删除牌组
  async deleteDeck(deckName: string): Promise<void> {
    const response = await this.sendRequest({
      action: 'deleteDecks',
      version: 6,
      params: {
        decks: [deckName],
        cardsToo: true
      }
    })

    if (response.error) {
      throw new Error(response.error)
    }
  }

  // 获取笔记模板列表
  async getModelNames(): Promise<string[]> {
    const response = await this.sendRequest({
      action: 'modelNames',
      version: 6
    })

    if (response.error) {
      throw new Error(response.error)
    }

    return response.result
  }

  // 获取模板详情
  async getModel(modelName: string): Promise<Model> {
    const response = await this.sendRequest({
      action: 'modelFieldNames',
      version: 6,
      params: {
        modelName: modelName
      }
    })

    if (response.error) {
      throw new Error(response.error)
    }

    // 获取模板的完整信息
    const modelInfoResponse = await this.sendRequest({
      action: 'modelTemplates',
      version: 6,
      params: {
        modelName: modelName
      }
    })

    return {
      name: modelName,
      fields: response.result,
      templates: modelInfoResponse.result,
      css: '' // 需要额外的 API 调用获取 CSS
    }
  }

  // 创建笔记模板
  async createModel(modelName: string, fields: string[], templates: any[], css: string): Promise<number> {
    const response = await this.sendRequest({
      action: 'createModel',
      version: 6,
      params: {
        modelName: modelName,
        inOrderFields: fields,
        cardTemplates: templates,
        css: css
      }
    })

    if (response.error) {
      throw new Error(response.error)
    }

    return response.result
  }

  // 添加笔记
  async addNote(deckName: string, modelName: string, fields: Record<string, string>, tags: string[] = []): Promise<number> {
    const response = await this.sendRequest({
      action: 'addNote',
      version: 6,
      params: {
        note: {
          deckName: deckName,
          modelName: modelName,
          fields: fields,
          tags: tags
        }
      }
    })

    if (response.error) {
      throw new Error(response.error)
    }

    return response.result
  }

  // 查找笔记
  async findNotes(query: string): Promise<number[]> {
    const response = await this.sendRequest({
      action: 'findNotes',
      version: 6,
      params: {
        query: query
      }
    })

    if (response.error) {
      throw new Error(response.error)
    }

    return response.result
  }

  // 获取笔记信息
  async getNotesInfo(noteIds: number[]): Promise<Note[]> {
    const response = await this.sendRequest({
      action: 'notesInfo',
      version: 6,
      params: {
        notes: noteIds
      }
    })

    if (response.error) {
      throw new Error(response.error)
    }

    return response.result
  }

  // 更新笔记
  async updateNote(noteId: number, fields: Record<string, string>, tags: string[] = []): Promise<void> {
    const response = await this.sendRequest({
      action: 'updateNoteFields',
      version: 6,
      params: {
        note: {
          id: noteId,
          fields: fields,
          tags: tags
        }
      }
    })

    if (response.error) {
      throw new Error(response.error)
    }
  }

  // 删除笔记
  async deleteNotes(noteIds: number[]): Promise<void> {
    const response = await this.sendRequest({
      action: 'deleteNotes',
      version: 6,
      params: {
        notes: noteIds
      }
    })

    if (response.error) {
      throw new Error(response.error)
    }
  }

  // 获取标签列表
  async getTags(): Promise<string[]> {
    const response = await this.sendRequest({
      action: 'getTags',
      version: 6
    })

    if (response.error) {
      throw new Error(response.error)
    }

    return response.result
  }

  // 获取今日学习统计
  async getNumCardsReviewedToday(): Promise<number> {
    const response = await this.sendRequest({
      action: 'getNumCardsReviewedToday',
      version: 6
    })

    if (response.error) {
      throw new Error(response.error)
    }

    return response.result
  }

  // 获取集合统计信息
  async getCollectionStats(): Promise<any> {
    const response = await this.sendRequest({
      action: 'getCollectionStats',
      version: 6
    })

    if (response.error) {
      throw new Error(response.error)
    }

    return response.result
  }
}

// 创建默认实例
export const ankiConnect = new AnkiConnectService() 