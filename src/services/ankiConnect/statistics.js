// AnkiConnect 统计操作方法
import { invoke } from './core.js'

// 获取今日复习卡片数
export async function getNumCardsReviewedToday() {
  return await invoke('getNumCardsReviewedToday', 6)
}

// 获取每日复习卡片数
export async function getNumCardsReviewedByDay() {
  return await invoke('getNumCardsReviewedByDay', 6)
}

// 获取集合统计HTML
export async function getCollectionStatsHTML(wholeCollection = false) {
  return await invoke('getCollectionStatsHTML', 6, { wholeCollection })
}

// 获取卡片复习记录
export async function getCardReviews(deck, startID) {
  return await invoke('cardReviews', 6, { deck, startID })
}

// 获取卡片复习详情
export async function getReviewsOfCards(cards) {
  return await invoke('getReviewsOfCards', 6, { cards })
}

// 获取最新复习ID
export async function getLatestReviewID(deck) {
  return await invoke('getLatestReviewID', 6, { deck })
}

// 插入复习记录
export async function insertReviews(reviews) {
  return await invoke('insertReviews', 6, { reviews })
} 