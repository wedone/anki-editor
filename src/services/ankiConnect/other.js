// AnkiConnect 其他操作方法
import { invoke } from './core.js'

// 获取集合统计
export async function getCollectionStats() {
  return await invoke('getCollectionStats', 6)
}

// 导出包
export async function exportPackage(deck, path, includeSched = false) {
  return await invoke('exportPackage', 6, { deck, path, includeSched })
}

// 导入包
export async function importPackage(path) {
  return await invoke('importPackage', 6, { path })
}

// 重新加载集合
export async function reloadCollection() {
  return await invoke('reloadCollection', 6)
} 