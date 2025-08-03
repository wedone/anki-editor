// AnkiConnect API 列表配置
export const apiList = [
  // 基础操作 (Basic Operations)
  {
    action: 'version',
    label: '获取版本',
    description: '获取 AnkiConnect 版本信息',
    category: '基础操作',
    parameters: []
  },
  {
    action: 'sync',
    label: '同步',
    description: '同步 Anki 集合',
    category: '基础操作',
    parameters: []
  },
  
  // 牌组操作 (Deck Operations)
  {
    action: 'deckNames',
    label: '获取牌组列表',
    description: '获取所有牌组名称',
    category: '牌组操作',
    parameters: []
  },
  {
    action: 'getDeckNames',
    label: '获取牌组名称',
    description: '获取牌组名称（包含子牌组）',
    category: '牌组操作',
    parameters: [
      {
        name: 'includeSubdecks',
        type: 'select',
        description: '是否包含子牌组',
        options: [
          { label: '是', value: true },
          { label: '否', value: false }
        ]
      }
    ]
  },
  {
    action: 'getDeckConfig',
    label: '获取牌组配置',
    description: '获取指定牌组的配置信息',
    category: '牌组操作',
    parameters: [
      {
        name: 'deck',
        type: 'string',
        description: '牌组名称'
      }
    ]
  },
  {
    action: 'createDeck',
    label: '创建牌组',
    description: '创建新的牌组',
    category: '牌组操作',
    parameters: [
      {
        name: 'deck',
        type: 'string',
        description: '牌组名称'
      }
    ]
  },
  {
    action: 'deleteDecks',
    label: '删除牌组',
    description: '删除指定的牌组',
    category: '牌组操作',
    parameters: [
      {
        name: 'decks',
        type: 'textarea',
        description: '牌组名称数组，JSON格式'
      },
      {
        name: 'cardsToo',
        type: 'select',
        description: '是否同时删除牌组中的卡片',
        options: [
          { label: '是', value: true },
          { label: '否', value: false }
        ]
      }
    ]
  },
  
  // 卡片操作 (Card Operations)
  {
    action: 'findCards',
    label: '查找卡片',
    description: '根据查询条件查找卡片',
    category: '卡片操作',
    parameters: [
      {
        name: 'query',
        type: 'string',
        description: '查询条件，例如：deck:"英语词汇"'
      }
    ],
    suggestions: [
      'deck:"牌组名称" - 查找指定牌组的卡片',
      'is:due - 查找到期的卡片',
      'is:new - 查找新卡片',
      'is:review - 查找复习卡片',
      'tag:标签名 - 查找指定标签的卡片'
    ]
  },
  {
    action: 'cardsInfo',
    label: '获取卡片信息',
    description: '获取指定卡片的详细信息',
    category: '卡片操作',
    parameters: [
      {
        name: 'cards',
        type: 'textarea',
        description: '卡片ID数组，JSON格式'
      }
    ]
  },
  {
    action: 'cardsToNotes',
    label: '卡片转笔记',
    description: '将卡片ID转换为笔记ID',
    category: '卡片操作',
    parameters: [
      {
        name: 'cards',
        type: 'textarea',
        description: '卡片ID数组，JSON格式'
      }
    ]
  },
  {
    action: 'getCardsInDeck',
    label: '获取牌组中的卡片',
    description: '获取指定牌组中的所有卡片信息',
    category: '卡片操作',
    parameters: [
      {
        name: 'deckName',
        type: 'string',
        description: '牌组名称'
      }
    ]
  },
  {
    action: 'getCardFields',
    label: '获取卡片字段',
    description: '获取指定卡片的字段内容',
    category: '卡片操作',
    parameters: [
      {
        name: 'cardId',
        type: 'number',
        description: '卡片ID'
      }
    ]
  },
  {
    action: 'updateCardFields',
    label: '更新卡片字段',
    description: '更新指定卡片的字段内容',
    category: '卡片操作',
    parameters: [
      {
        name: 'cardId',
        type: 'number',
        description: '卡片ID'
      },
      {
        name: 'fields',
        type: 'textarea',
        description: '字段内容，JSON格式'
      }
    ],
    suggestions: [
      '示例: {"Front": "新正面", "Back": "新背面"}',
      '注意：这会更新笔记的所有字段，请确保包含所有必要字段'
    ]
  },
  
  // 笔记操作 (Note Operations)
  {
    action: 'addNote',
    label: '添加笔记',
    description: '添加新的笔记',
    category: '笔记操作',
    parameters: [
      {
        name: 'note',
        type: 'textarea',
        description: '笔记对象，JSON格式'
      }
    ],
    suggestions: [
      '必须包含 modelName（笔记类型）',
      '必须包含 deckName（牌组名称）',
      '必须包含 fields（字段内容）',
      '可选包含 tags（标签）',
      '示例: {"modelName": "Basic", "deckName": "默认", "fields": {"Front": "正面", "Back": "背面"}}'
    ]
  },
  {
    action: 'canAddNotes',
    label: '检查是否可以添加笔记',
    description: '检查是否可以添加指定的笔记',
    category: '笔记操作',
    parameters: [
      {
        name: 'notes',
        type: 'textarea',
        description: '笔记对象数组，JSON格式'
      }
    ]
  },
  {
    action: 'updateNoteFields',
    label: '更新笔记字段',
    description: '更新指定笔记的字段内容',
    category: '笔记操作',
    parameters: [
      {
        name: 'note',
        type: 'textarea',
        description: '笔记对象，JSON格式'
      }
    ],
    suggestions: [
      '必须包含 id（笔记ID）',
      '必须包含 fields（字段内容）',
      '示例: {"id": 123456, "fields": {"Front": "新正面", "Back": "新背面"}}',
      '注意：这会更新笔记的所有字段，请确保包含所有必要字段'
    ]
  },
  {
    action: 'updateNote',
    label: '更新笔记',
    description: '更新笔记（包括字段和标签）',
    category: '笔记操作',
    parameters: [
      {
        name: 'note',
        type: 'textarea',
        description: '笔记对象，JSON格式'
      }
    ]
  },
  {
    action: 'findNotes',
    label: '查找笔记',
    description: '根据查询条件查找笔记',
    category: '笔记操作',
    parameters: [
      {
        name: 'query',
        type: 'string',
        description: '查询条件'
      }
    ]
  },
  {
    action: 'notesInfo',
    label: '获取笔记信息',
    description: '获取指定笔记的详细信息',
    category: '笔记操作',
    parameters: [
      {
        name: 'notes',
        type: 'textarea',
        description: '笔记ID数组，JSON格式'
      }
    ]
  },
  {
    action: 'notesModTime',
    label: '获取笔记修改时间',
    description: '获取笔记的修改时间',
    category: '笔记操作',
    parameters: [
      {
        name: 'notes',
        type: 'textarea',
        description: '笔记ID数组，JSON格式'
      }
    ]
  },
  {
    action: 'deleteNotes',
    label: '删除笔记',
    description: '删除指定的笔记',
    category: '笔记操作',
    parameters: [
      {
        name: 'notes',
        type: 'textarea',
        description: '笔记ID数组，JSON格式'
      }
    ]
  },
  {
    action: 'removeEmptyNotes',
    label: '移除空笔记',
    description: '移除所有空笔记',
    category: '笔记操作',
    parameters: []
  },
  
  // 标签操作 (Tag Operations)
  {
    action: 'addTags',
    label: '添加标签',
    description: '为笔记添加标签',
    category: '标签操作',
    parameters: [
      {
        name: 'notes',
        type: 'textarea',
        description: '笔记ID数组，JSON格式'
      },
      {
        name: 'tags',
        type: 'string',
        description: '标签名称'
      }
    ]
  },
  {
    action: 'removeTags',
    label: '移除标签',
    description: '从笔记中移除标签',
    category: '标签操作',
    parameters: [
      {
        name: 'notes',
        type: 'textarea',
        description: '笔记ID数组，JSON格式'
      },
      {
        name: 'tags',
        type: 'string',
        description: '标签名称'
      }
    ]
  },
  {
    action: 'getTags',
    label: '获取标签',
    description: '获取所有标签',
    category: '标签操作',
    parameters: []
  },
  {
    action: 'clearUnusedTags',
    label: '清理未使用标签',
    description: '清理未使用的标签',
    category: '标签操作',
    parameters: []
  },
  {
    action: 'replaceTags',
    label: '替换标签',
    description: '替换笔记中的标签',
    category: '标签操作',
    parameters: [
      {
        name: 'notes',
        type: 'textarea',
        description: '笔记ID数组，JSON格式'
      },
      {
        name: 'tag_to_replace',
        type: 'string',
        description: '要替换的标签'
      },
      {
        name: 'replace_with_tag',
        type: 'string',
        description: '替换后的标签'
      }
    ]
  },
  {
    action: 'replaceTagsInAllNotes',
    label: '替换所有笔记中的标签',
    description: '替换所有笔记中的标签',
    category: '标签操作',
    parameters: [
      {
        name: 'tag_to_replace',
        type: 'string',
        description: '要替换的标签'
      },
      {
        name: 'replace_with_tag',
        type: 'string',
        description: '替换后的标签'
      }
    ]
  },
  
  // 模型操作 (Model Operations)
  {
    action: 'getModelNames',
    label: '获取模型名称',
    description: '获取所有笔记类型名称',
    category: '模型操作',
    parameters: []
  },
  {
    action: 'getModelFieldNames',
    label: '获取模型字段',
    description: '获取指定笔记类型的字段名称',
    category: '模型操作',
    parameters: [
      {
        name: 'modelName',
        type: 'string',
        description: '笔记类型名称'
      }
    ]
  },
  {
    action: 'getModelFieldTypes',
    label: '获取模型字段类型',
    description: '获取指定笔记类型的字段类型',
    category: '模型操作',
    parameters: [
      {
        name: 'modelName',
        type: 'string',
        description: '笔记类型名称'
      }
    ]
  },
  {
    action: 'getModelStyling',
    label: '获取模型样式',
    description: '获取指定笔记类型的样式',
    category: '模型操作',
    parameters: [
      {
        name: 'modelName',
        type: 'string',
        description: '笔记类型名称'
      }
    ]
  },
  {
    action: 'getModelTemplates',
    label: '获取模型模板',
    description: '获取指定笔记类型的模板',
    category: '模型操作',
    parameters: [
      {
        name: 'modelName',
        type: 'string',
        description: '笔记类型名称'
      }
    ]
  },
  {
    action: 'createModel',
    label: '创建模型',
    description: '创建新的笔记类型',
    category: '模型操作',
    parameters: [
      {
        name: 'modelName',
        type: 'string',
        description: '模型名称'
      },
      {
        name: 'inOrderFields',
        type: 'textarea',
        description: '字段名称数组，JSON格式'
      },
      {
        name: 'css',
        type: 'string',
        description: 'CSS样式'
      },
      {
        name: 'cardTemplates',
        type: 'textarea',
        description: '卡片模板数组，JSON格式'
      }
    ]
  },
  {
    action: 'updateModelTemplates',
    label: '更新模型模板',
    description: '更新笔记类型的模板',
    category: '模型操作',
    parameters: [
      {
        name: 'model',
        type: 'textarea',
        description: '模型对象，JSON格式'
      }
    ]
  },
  {
    action: 'updateModelStyling',
    label: '更新模型样式',
    description: '更新笔记类型的样式',
    category: '模型操作',
    parameters: [
      {
        name: 'model',
        type: 'textarea',
        description: '模型对象，JSON格式'
      }
    ]
  },
  {
    action: 'updateModelFields',
    label: '更新模型字段',
    description: '更新笔记类型的字段',
    category: '模型操作',
    parameters: [
      {
        name: 'model',
        type: 'textarea',
        description: '模型对象，JSON格式'
      }
    ]
  },
  {
    action: 'updateModel',
    label: '更新模型',
    description: '更新笔记类型',
    category: '模型操作',
    parameters: [
      {
        name: 'model',
        type: 'textarea',
        description: '模型对象，JSON格式'
      }
    ]
  },
  {
    action: 'deleteModel',
    label: '删除模型',
    description: '删除笔记类型',
    category: '模型操作',
    parameters: [
      {
        name: 'modelName',
        type: 'string',
        description: '模型名称'
      }
    ]
  },
  
  // 统计操作 (Statistics Operations)
  {
    action: 'getNumCardsReviewedToday',
    label: '获取今日复习卡片数',
    description: '获取今日复习的卡片数量',
    category: '统计操作',
    parameters: []
  },
  {
    action: 'getNumCardsReviewedByDay',
    label: '获取每日复习卡片数',
    description: '获取每日复习的卡片数量',
    category: '统计操作',
    parameters: []
  },
  {
    action: 'getCollectionStatsHTML',
    label: '获取集合统计HTML',
    description: '获取集合统计的HTML报告',
    category: '统计操作',
    parameters: [
      {
        name: 'wholeCollection',
        type: 'select',
        description: '是否包含整个集合',
        options: [
          { label: '是', value: true },
          { label: '否', value: false }
        ]
      }
    ]
  },
  {
    action: 'cardReviews',
    label: '获取卡片复习记录',
    description: '获取指定牌组的卡片复习记录',
    category: '统计操作',
    parameters: [
      {
        name: 'deck',
        type: 'string',
        description: '牌组名称'
      },
      {
        name: 'startID',
        type: 'number',
        description: '开始时间戳'
      }
    ]
  },
  {
    action: 'getReviewsOfCards',
    label: '获取卡片复习详情',
    description: '获取指定卡片的复习详情',
    category: '统计操作',
    parameters: [
      {
        name: 'cards',
        type: 'textarea',
        description: '卡片ID数组，JSON格式'
      }
    ]
  },
  {
    action: 'getLatestReviewID',
    label: '获取最新复习ID',
    description: '获取指定牌组的最新复习ID',
    category: '统计操作',
    parameters: [
      {
        name: 'deck',
        type: 'string',
        description: '牌组名称'
      }
    ]
  },
  {
    action: 'insertReviews',
    label: '插入复习记录',
    description: '插入复习记录到数据库',
    category: '统计操作',
    parameters: [
      {
        name: 'reviews',
        type: 'textarea',
        description: '复习记录数组，JSON格式'
      }
    ]
  },
  
  // 媒体操作 (Media Operations)
  {
    action: 'storeMediaFile',
    label: '存储媒体文件',
    description: '存储媒体文件',
    category: '媒体操作',
    parameters: [
      {
        name: 'filename',
        type: 'string',
        description: '文件名'
      },
      {
        name: 'data',
        type: 'string',
        description: '文件数据（base64编码）'
      }
    ]
  },
  {
    action: 'retrieveMediaFile',
    label: '获取媒体文件',
    description: '获取媒体文件',
    category: '媒体操作',
    parameters: [
      {
        name: 'filename',
        type: 'string',
        description: '文件名'
      }
    ]
  },
  {
    action: 'deleteMediaFile',
    label: '删除媒体文件',
    description: '删除媒体文件',
    category: '媒体操作',
    parameters: [
      {
        name: 'filename',
        type: 'string',
        description: '文件名'
      }
    ]
  },
  
  // 其他操作 (Other Operations)
  {
    action: 'getCollectionStats',
    label: '获取集合统计',
    description: '获取整个集合的统计信息',
    category: '其他操作',
    parameters: []
  },
  {
    action: 'exportPackage',
    label: '导出包',
    description: '导出指定牌组为 Anki 包文件',
    category: '其他操作',
    parameters: [
      {
        name: 'deck',
        type: 'string',
        description: '牌组名称'
      },
      {
        name: 'path',
        type: 'string',
        description: '导出文件路径'
      },
      {
        name: 'includeSched',
        type: 'select',
        description: '是否包含学习进度',
        options: [
          { label: '是', value: true },
          { label: '否', value: false }
        ]
      }
    ]
  },
  {
    action: 'importPackage',
    label: '导入包',
    description: '导入 Anki 包文件',
    category: '其他操作',
    parameters: [
      {
        name: 'path',
        type: 'string',
        description: '包文件路径'
      }
    ]
  },
  {
    action: 'reloadCollection',
    label: '重新加载集合',
    description: '重新加载 Anki 集合',
    category: '其他操作',
    parameters: []
  }
]

// API 分类
export const apiCategories = [
  { label: '全部 API', value: '' },
  { label: '基础操作', value: '基础操作' },
  { label: '牌组操作', value: '牌组操作' },
  { label: '卡片操作', value: '卡片操作' },
  { label: '笔记操作', value: '笔记操作' },
  { label: '标签操作', value: '标签操作' },
  { label: '模型操作', value: '模型操作' },
  { label: '统计操作', value: '统计操作' },
  { label: '媒体操作', value: '媒体操作' },
  { label: '其他操作', value: '其他操作' }
]

export default apiList 