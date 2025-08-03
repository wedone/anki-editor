// AnkiConnect 媒体操作方法
import { invoke } from './core.js'

// 存储媒体文件
export async function storeMediaFile(filename, data) {
  return await invoke('storeMediaFile', 6, { filename, data })
}

// 获取媒体文件
export async function retrieveMediaFile(filename) {
  return await invoke('retrieveMediaFile', 6, { filename })
}

// 删除媒体文件
export async function deleteMediaFile(filename) {
  return await invoke('deleteMediaFile', 6, { filename })
} 