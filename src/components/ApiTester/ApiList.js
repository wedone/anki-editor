// AnkiConnect API 列表配置
export const apiList = [
  // 基础操作
  {
    action: 'version',
    label: '获取版本',
    description: '获取 AnkiConnect 版本信息',
    category: '基础操作',
    parameters: []
  },
  {
    action: 'sync',
    label: '同步集合',
    description: '同步 Anki 集合到 AnkiWeb',
    category: '基础操作',
    parameters: []
  },
  
  // 牌组操作
  {
    action: 'deckNames',
    label: '获取牌组列表',
    description: '获取所有牌组名称',
    category: '牌组操作',
    parameters: []
  },
  {
    action: 'deckNamesAndIds',
    label: '获取牌组列表（含ID）',
    description: '获取所有牌组名称和ID',
    category: '牌组操作',
    parameters: []
  },
  {
    action: 'getDecks',
    label: '获取牌组信息',
    description: '获取指定牌组的详细信息',
    category: '牌组操作',
    parameters: [
      {
        name: 'decks',
        type: 'array',
        description: '牌组名称数组'
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
        type: 'array',
        description: '要删除的牌组名称数组'
      },
      {
        name: 'cardsToo',
        type: 'boolean',
        description: '是否同时删除牌组中的卡片',
        default: true
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
    action: 'saveDeckConfig',
    label: '保存牌组配置',
    description: '保存牌组配置信息',
    category: '牌组操作',
    parameters: [
      {
        name: 'config',
        type: 'object',
        description: '配置对象'
      }
    ]
  },
  {
    action: 'setDeckConfigId',
    label: '设置牌组配置ID',
    description: '设置牌组的配置ID',
    category: '牌组操作',
    parameters: [
      {
        name: 'deck',
        type: 'string',
        description: '牌组名称'
      },
      {
        name: 'configId',
        type: 'number',
        description: '配置ID'
      }
    ]
  },
  {
    action: 'cloneDeckConfigId',
    label: '克隆牌组配置',
    description: '克隆牌组配置并设置新的配置ID',
    category: '牌组操作',
    parameters: [
      {
        name: 'name',
        type: 'string',
        description: '新配置名称'
      }
    ]
  },
  {
    action: 'removeDeckConfigId',
    label: '移除牌组配置',
    description: '移除牌组的配置ID',
    category: '牌组操作',
    parameters: [
      {
        name: 'configId',
        type: 'number',
        description: '配置ID'
      }
    ]
  },
  
  // 卡片操作
  {
    action: 'findCards',
    label: '查找卡片',
    description: '根据查询条件查找卡片',
    category: '卡片操作',
    parameters: [
      {
        name: 'query',
        type: 'string',
        description: '查询条件，如 deck:Default, is:due 等'
      }
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
        type: 'array',
        description: '卡片ID数组'
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
        type: 'array',
        description: '卡片ID数组'
      }
    ]
  },
  {
    action: 'getEaseFactors',
    label: '获取易度因子',
    description: '获取卡片的易度因子',
    category: '卡片操作',
    parameters: [
      {
        name: 'cards',
        type: 'array',
        description: '卡片ID数组'
      }
    ]
  },
  {
    action: 'setEaseFactors',
    label: '设置易度因子',
    description: '设置卡片的易度因子',
    category: '卡片操作',
    parameters: [
      {
        name: 'cards',
        type: 'array',
        description: '卡片ID数组'
      },
      {
        name: 'easeFactors',
        type: 'array',
        description: '易度因子数组'
      }
    ]
  },
  {
    action: 'setSpecificValueOfCard',
    label: '设置卡片特定值',
    description: '设置卡片的特定值（如标志、到期时间等）',
    category: '卡片操作',
    parameters: [
      {
        name: 'card',
        type: 'number',
        description: '卡片ID'
      },
      {
        name: 'keys',
        type: 'array',
        description: '要设置的键名数组'
      },
      {
        name: 'newValues',
        type: 'array',
        description: '新的值数组'
      },
      {
        name: 'warning_check',
        type: 'boolean',
        description: '是否需要警告检查',
        default: false
      }
    ]
  },
  {
    action: 'suspend',
    label: '暂停卡片',
    description: '暂停指定的卡片',
    category: '卡片操作',
    parameters: [
      {
        name: 'cards',
        type: 'array',
        description: '卡片ID数组'
      }
    ]
  },
  {
    action: 'unsuspend',
    label: '恢复卡片',
    description: '恢复暂停的卡片',
    category: '卡片操作',
    parameters: [
      {
        name: 'cards',
        type: 'array',
        description: '卡片ID数组'
      }
    ]
  },
  {
    action: 'suspended',
    label: '检查卡片暂停状态',
    description: '检查单张卡片是否暂停',
    category: '卡片操作',
    parameters: [
      {
        name: 'card',
        type: 'number',
        description: '卡片ID'
      }
    ]
  },
  {
    action: 'areSuspended',
    label: '批量检查暂停状态',
    description: '检查多张卡片是否暂停',
    category: '卡片操作',
    parameters: [
      {
        name: 'cards',
        type: 'array',
        description: '卡片ID数组'
      }
    ]
  },
  {
    action: 'areDue',
    label: '检查到期状态',
    description: '检查卡片是否到期',
    category: '卡片操作',
    parameters: [
      {
        name: 'cards',
        type: 'array',
        description: '卡片ID数组'
      }
    ]
  },
  {
    action: 'getIntervals',
    label: '获取间隔信息',
    description: '获取卡片的间隔信息',
    category: '卡片操作',
    parameters: [
      {
        name: 'cards',
        type: 'array',
        description: '卡片ID数组'
      },
      {
        name: 'complete',
        type: 'boolean',
        description: '是否获取完整间隔历史',
        default: false
      }
    ]
  },
  {
    action: 'cardsModTime',
    label: '获取修改时间',
    description: '获取卡片的修改时间',
    category: '卡片操作',
    parameters: [
      {
        name: 'cards',
        type: 'array',
        description: '卡片ID数组'
      }
    ]
  },
  {
    action: 'forgetCards',
    label: '忘记卡片',
    description: '忘记卡片（重置为新卡片）',
    category: '卡片操作',
    parameters: [
      {
        name: 'cards',
        type: 'array',
        description: '卡片ID数组'
      }
    ]
  },
  {
    action: 'relearnCards',
    label: '重新学习卡片',
    description: '重新学习卡片',
    category: '卡片操作',
    parameters: [
      {
        name: 'cards',
        type: 'array',
        description: '卡片ID数组'
      }
    ]
  },
  {
    action: 'answerCards',
    label: '回答卡片',
    description: '回答卡片（1=Again, 2=Good, 3=Easy, 4=Hard）',
    category: '卡片操作',
    parameters: [
      {
        name: 'answers',
        type: 'array',
        description: '回答数组，每个元素包含 cardId 和 ease'
      }
    ]
  },
  {
    action: 'setDueDate',
    label: '设置到期日期',
    description: '设置卡片的到期日期',
    category: '卡片操作',
    parameters: [
      {
        name: 'cards',
        type: 'array',
        description: '卡片ID数组'
      },
      {
        name: 'days',
        type: 'string',
        description: '到期天数，如 0（今天）、1（明天）、"3-7"（随机）'
      }
    ]
  },
  
  // 笔记操作
  {
    action: 'addNote',
    label: '添加笔记',
    description: '添加新的笔记',
    category: '笔记操作',
    parameters: [
      {
        name: 'note',
        type: 'object',
        description: '笔记对象，包含 modelName, deckName, fields 等'
      }
    ]
  },
  {
    action: 'addNotes',
    label: '批量添加笔记',
    description: '批量添加多个笔记',
    category: '笔记操作',
    parameters: [
      {
        name: 'notes',
        type: 'array',
        description: '笔记对象数组'
      }
    ]
  },
  {
    action: 'canAddNotes',
    label: '检查可添加笔记',
    description: '检查是否可以添加指定的笔记',
    category: '笔记操作',
    parameters: [
      {
        name: 'notes',
        type: 'array',
        description: '笔记对象数组'
      }
    ]
  },
  {
    action: 'updateNoteFields',
    label: '更新笔记字段',
    description: '更新笔记的字段内容',
    category: '笔记操作',
    parameters: [
      {
        name: 'note',
        type: 'object',
        description: '笔记对象'
      }
    ]
  },
  {
    action: 'updateNote',
    label: '更新笔记',
    description: '更新整个笔记',
    category: '笔记操作',
    parameters: [
      {
        name: 'note',
        type: 'object',
        description: '笔记对象'
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
    description: '获取笔记的详细信息',
    category: '笔记操作',
    parameters: [
      {
        name: 'notes',
        type: 'array',
        description: '笔记ID数组'
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
        type: 'array',
        description: '笔记ID数组'
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
        type: 'array',
        description: '笔记ID数组'
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
  
  // 标签操作
  {
    action: 'getTags',
    label: '获取标签列表',
    description: '获取所有标签',
    category: '标签操作',
    parameters: []
  },
  {
    action: 'addTags',
    label: '添加标签',
    description: '为笔记添加标签',
    category: '标签操作',
    parameters: [
      {
        name: 'notes',
        type: 'array',
        description: '笔记ID数组'
      },
      {
        name: 'tags',
        type: 'array',
        description: '标签数组'
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
        type: 'array',
        description: '笔记ID数组'
      },
      {
        name: 'tags',
        type: 'array',
        description: '标签数组'
      }
    ]
  },
  {
    action: 'replaceTags',
    label: '替换标签',
    description: '替换笔记中的标签',
    category: '标签操作',
    parameters: [
      {
        name: 'notes',
        type: 'array',
        description: '笔记ID数组'
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
    label: '全局替换标签',
    description: '在所有笔记中替换标签',
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
  {
    action: 'clearUnusedTags',
    label: '清理未使用标签',
    description: '清理所有未使用的标签',
    category: '标签操作',
    parameters: []
  },
  
  // 模型操作
  {
    action: 'getModelNames',
    label: '获取模型名称',
    description: '获取所有模型名称',
    category: '模型操作',
    parameters: []
  },
  {
    action: 'getModelFieldNames',
    label: '获取模型字段名称',
    description: '获取指定模型的字段名称',
    category: '模型操作',
    parameters: [
      {
        name: 'modelName',
        type: 'string',
        description: '模型名称'
      }
    ]
  },
  {
    action: 'getModelFieldTypes',
    label: '获取模型字段类型',
    description: '获取指定模型的字段类型',
    category: '模型操作',
    parameters: [
      {
        name: 'modelName',
        type: 'string',
        description: '模型名称'
      }
    ]
  },
  {
    action: 'getModelStyling',
    label: '获取模型样式',
    description: '获取指定模型的样式',
    category: '模型操作',
    parameters: [
      {
        name: 'modelName',
        type: 'string',
        description: '模型名称'
      }
    ]
  },
  {
    action: 'getModelTemplates',
    label: '获取模型模板',
    description: '获取指定模型的模板',
    category: '模型操作',
    parameters: [
      {
        name: 'modelName',
        type: 'string',
        description: '模型名称'
      }
    ]
  },
  {
    action: 'createModel',
    label: '创建模型',
    description: '创建新的模型',
    category: '模型操作',
    parameters: [
      {
        name: 'modelName',
        type: 'string',
        description: '模型名称'
      },
      {
        name: 'inOrderFields',
        type: 'array',
        description: '字段名称数组'
      },
      {
        name: 'css',
        type: 'string',
        description: 'CSS 样式'
      },
      {
        name: 'cardTemplates',
        type: 'array',
        description: '卡片模板数组'
      }
    ]
  },
  {
    action: 'updateModelTemplates',
    label: '更新模型模板',
    description: '更新模型的模板',
    category: '模型操作',
    parameters: [
      {
        name: 'model',
        type: 'object',
        description: '模型对象'
      }
    ]
  },
  {
    action: 'updateModelStyling',
    label: '更新模型样式',
    description: '更新模型的样式',
    category: '模型操作',
    parameters: [
      {
        name: 'model',
        type: 'object',
        description: '模型对象'
      }
    ]
  },
  {
    action: 'updateModelFields',
    label: '更新模型字段',
    description: '更新模型的字段',
    category: '模型操作',
    parameters: [
      {
        name: 'model',
        type: 'object',
        description: '模型对象'
      }
    ]
  },
  {
    action: 'updateModel',
    label: '更新模型',
    description: '更新整个模型',
    category: '模型操作',
    parameters: [
      {
        name: 'model',
        type: 'object',
        description: '模型对象'
      }
    ]
  },
  {
    action: 'deleteModel',
    label: '删除模型',
    description: '删除指定的模型',
    category: '模型操作',
    parameters: [
      {
        name: 'modelName',
        type: 'string',
        description: '模型名称'
      }
    ]
  },
  {
    action: 'getModel',
    label: '获取模型信息',
    description: '获取指定模型的完整信息',
    category: '模型操作',
    parameters: [
      {
        name: 'modelName',
        type: 'string',
        description: '模型名称'
      }
    ]
  },
  {
    action: 'getModelID',
    label: '获取模型ID',
    description: '获取指定模型的ID',
    category: '模型操作',
    parameters: [
      {
        name: 'modelName',
        type: 'string',
        description: '模型名称'
      }
    ]
  },
  {
    action: 'getModelName',
    label: '获取模型名称（通过ID）',
    description: '根据模型ID获取模型名称',
    category: '模型操作',
    parameters: [
      {
        name: 'modelID',
        type: 'number',
        description: '模型ID'
      }
    ]
  },
  {
    action: 'getModelFieldNamesByID',
    label: '获取模型字段名称（通过ID）',
    description: '根据模型ID获取字段名称',
    category: '模型操作',
    parameters: [
      {
        name: 'modelID',
        type: 'number',
        description: '模型ID'
      }
    ]
  },
  {
    action: 'getModelFieldTypesByID',
    label: '获取模型字段类型（通过ID）',
    description: '根据模型ID获取字段类型',
    category: '模型操作',
    parameters: [
      {
        name: 'modelID',
        type: 'number',
        description: '模型ID'
      }
    ]
  },
  {
    action: 'getModelStylingByID',
    label: '获取模型样式（通过ID）',
    description: '根据模型ID获取样式',
    category: '模型操作',
    parameters: [
      {
        name: 'modelID',
        type: 'number',
        description: '模型ID'
      }
    ]
  },
  {
    action: 'getModelTemplatesByID',
    label: '获取模型模板（通过ID）',
    description: '根据模型ID获取模板',
    category: '模型操作',
    parameters: [
      {
        name: 'modelID',
        type: 'number',
        description: '模型ID'
      }
    ]
  },
  {
    action: 'getModelByID',
    label: '获取模型信息（通过ID）',
    description: '根据模型ID获取完整信息',
    category: '模型操作',
    parameters: [
      {
        name: 'modelID',
        type: 'number',
        description: '模型ID'
      }
    ]
  },
  {
    action: 'updateModelByID',
    label: '更新模型（通过ID）',
    description: '根据模型ID更新模型',
    category: '模型操作',
    parameters: [
      {
        name: 'modelID',
        type: 'number',
        description: '模型ID'
      },
      {
        name: 'model',
        type: 'object',
        description: '模型对象'
      }
    ]
  },
  {
    action: 'deleteModelByID',
    label: '删除模型（通过ID）',
    description: '根据模型ID删除模型',
    category: '模型操作',
    parameters: [
      {
        name: 'modelID',
        type: 'number',
        description: '模型ID'
      }
    ]
  },
  
  // 统计操作
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
        type: 'boolean',
        description: '是否包含整个集合',
        default: false
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
        type: 'array',
        description: '卡片ID数组'
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
        type: 'array',
        description: '复习记录数组'
      }
    ]
  },
  
  // 媒体操作
  {
    action: 'storeMediaFile',
    label: '存储媒体文件',
    description: '存储媒体文件到 Anki',
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
    description: '从 Anki 获取媒体文件',
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
    description: '删除 Anki 中的媒体文件',
    category: '媒体操作',
    parameters: [
      {
        name: 'filename',
        type: 'string',
        description: '文件名'
      }
    ]
  },
  
  // 其他操作
  {
    action: 'getCollectionStats',
    label: '获取集合统计',
    description: '获取集合的统计信息',
    category: '其他操作',
    parameters: []
  },
  {
    action: 'exportPackage',
    label: '导出包',
    description: '导出 Anki 包',
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
        description: '导出路径'
      },
      {
        name: 'includeSched',
        type: 'boolean',
        description: '是否包含调度信息',
        default: false
      }
    ]
  },
  {
    action: 'importPackage',
    label: '导入包',
    description: '导入 Anki 包',
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