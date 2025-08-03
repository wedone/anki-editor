// AnkiConnect API 服务默认导出
import checkConnection from './connection.js'
import { sync, getVersion } from './basic.js'

// 牌组操作
import {
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
import {
  getCardsInDeck,
  findCards,
  getCardInfo,
  cardsToNotes,
  getCardFields
} from './cards.js'

// 笔记操作
import {
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
import {
  addTags,
  removeTags,
  getTags,
  clearUnusedTags,
  replaceTags,
  replaceTagsInAllNotes
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
  deleteModel
} from './models.js'

// 统计操作
import {
  getNumCardsReviewedToday,
  getNumCardsReviewedByDay,
  getCollectionStatsHTML,
  getCardReviews,
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

// 默认导出所有方法
export default {
  // 连接相关
  checkConnection,
  
  // 基础操作
  sync,
  getVersion,
  
  // 牌组操作
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
  getDeckStudyInfo,
  
  // 卡片操作
  getCardsInDeck,
  findCards,
  getCardInfo,
  cardsToNotes,
  getCardFields,
  
  // 笔记操作
  addNote,
  canAddNotes,
  updateCardFields,
  updateNoteFields,
  updateNote,
  findNotes,
  getNotesInfo,
  getNotesModTime,
  deleteNotes,
  removeEmptyNotes,
  
  // 标签操作
  addTags,
  removeTags,
  getTags,
  clearUnusedTags,
  replaceTags,
  replaceTagsInAllNotes,
  
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
  
  // 统计操作
  getNumCardsReviewedToday,
  getNumCardsReviewedByDay,
  getCollectionStatsHTML,
  getCardReviews,
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