// AnkiConnect API 服务主入口
export { default as checkConnection } from './connection.js'
export { sync, getVersion } from './basic.js'

// 牌组操作
export {
  getDeckList,
  getDeckNames,
  getDeckConfig,
  setDeckConfigId,
  cloneDeckConfigId,
  removeDeckConfigId,
  setDeckConfig,
  getDeckConfigById,
  createDeck,
  deleteDecks,
  getDeckStudyInfo
} from './decks.js'

// 卡片操作
export {
  getCardsInDeck,
  findCards,
  getCardInfo,
  cardsToNotes,
  getCardFields
} from './cards.js'

// 笔记操作
export {
  addNote,
  canAddNotes,
  updateCardFields,
  updateNoteFields,
  updateNote,
  findNotes,
  getNotesInfo,
  getNotesModTime,
  deleteNotes,
  removeEmptyNotes
} from './notes.js'

// 标签操作
export {
  addTags,
  removeTags,
  getTags,
  clearUnusedTags,
  replaceTags,
  replaceTagsInAllNotes
} from './tags.js'

// 模型操作
export {
  getModelNames,
  getModelFieldNames,
  getModelFieldTypes,
  getModelStyling,
  getModelTemplates,
  createModel,
  updateModelTemplates,
  updateModelStyling,
  updateModelFields,
  updateModel,
  deleteModel
} from './models.js'

// 统计操作
export {
  getNumCardsReviewedToday,
  getNumCardsReviewedByDay,
  getCollectionStatsHTML,
  getCardReviews,
  getReviewsOfCards,
  getLatestReviewID,
  insertReviews
} from './statistics.js'

// 媒体操作
export {
  storeMediaFile,
  retrieveMediaFile,
  deleteMediaFile
} from './media.js'

// 其他操作
export {
  getCollectionStats,
  exportPackage,
  importPackage,
  reloadCollection
} from './other.js'

// 默认导出所有方法
export { default } from './all.js' 