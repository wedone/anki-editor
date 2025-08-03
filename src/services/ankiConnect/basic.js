// AnkiConnect 基础操作方法
import { invoke } from './core.js'

// 同步集合
export async function sync() {
  return await invoke('sync')
}

// 获取版本
export async function getVersion() {
  return await invoke('version')
} 