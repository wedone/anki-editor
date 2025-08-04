// AnkiConnect 服务入口文件
export { checkConnection } from './connection.js'
export { sync, getVersion } from './basic.js'

// 牌组操作
export {
  getDeckList,
  getDeckNames,
  getDeckNamesAndIds,
  getDecks,
  createDeck,
  deleteDecks,
  getDeckConfig,
  saveDeckConfig,
  setDeckConfigId,
  cloneDeckConfigId,
  removeDeckConfigId
} from './decks.js'

// 卡片操作
export {
  getCards,
  getCard,
  updateCard,
  updateCards,
  getCardsInDeck,
  getCardFields,
  updateCardFields,
  findCards,
  cardsToNotes
} from './cards.js'

// 笔记操作
export {
  addNote,
  addNotes,
  canAddNotes,
  updateNoteFields,
  findNotes,
  notesInfo,
  notesModTime,
  deleteNotes,
  removeEmptyNotes
} from './notes.js'

// 标签操作
export {
  getTags,
  addTags,
  removeTags,
  replaceTags,
  replaceTagsInAllNotes,
  clearUnusedTags
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
  deleteModel,
  getModel,
  getModelID,
  getModelName,
  getModelFieldNamesByID,
  getModelFieldTypesByID,
  getModelStylingByID,
  getModelTemplatesByID,
  getModelByID,
  updateModelByID,
  deleteModelByID
} from './models.js'

// 统计操作
export {
  getNumCardsReviewedToday,
  getNumCardsReviewedByDay,
  getCollectionStatsHTML,
  cardReviews,
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

// 默认导出所有功能
export { default } from './all.js' 