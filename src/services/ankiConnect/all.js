// 导入所有 AnkiConnect 功能
import { checkConnection } from './connection.js'
import { sync, getVersion } from './basic.js'

// 牌组操作
import {
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
import {
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
import {
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
import {
  getTags,
  addTags,
  removeTags,
  replaceTags,
  replaceTagsInAllNotes,
  clearUnusedTags
} from './tags.js'

// 模型操作
import {
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
import {
  getNumCardsReviewedToday,
  getNumCardsReviewedByDay,
  getCollectionStatsHTML,
  cardReviews,
  getReviewsOfCards,
  getLatestReviewID,
  insertReviews
} from './statistics.js'

// 媒体操作
import {
  storeMediaFile,
  retrieveMediaFile,
  deleteMediaFile
} from './media.js'

// 其他操作
import {
  getCollectionStats,
  exportPackage,
  importPackage,
  reloadCollection
} from './other.js'

// 导出所有功能
export default {
  // 连接相关
  checkConnection,
  sync,
  getVersion,
  
  // 牌组操作
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
  removeDeckConfigId,
  
  // 卡片操作
  getCards,
  getCard,
  updateCard,
  updateCards,
  getCardsInDeck,
  getCardFields,
  updateCardFields,
  findCards,
  cardsToNotes,
  
  // 笔记操作
  addNote,
  addNotes,
  canAddNotes,
  updateNoteFields,
  findNotes,
  notesInfo,
  notesModTime,
  deleteNotes,
  removeEmptyNotes,
  
  // 标签操作
  getTags,
  addTags,
  removeTags,
  replaceTags,
  replaceTagsInAllNotes,
  clearUnusedTags,
  
  // 模型操作
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
  deleteModelByID,
  
  // 统计操作
  getNumCardsReviewedToday,
  getNumCardsReviewedByDay,
  getCollectionStatsHTML,
  cardReviews,
  getReviewsOfCards,
  getLatestReviewID,
  insertReviews,
  
  // 媒体操作
  storeMediaFile,
  retrieveMediaFile,
  deleteMediaFile,
  
  // 其他操作
  getCollectionStats,
  exportPackage,
  importPackage,
  reloadCollection
} 