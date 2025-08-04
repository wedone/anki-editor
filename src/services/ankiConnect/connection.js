// AnkiConnect 连接相关方法
import { invoke } from './core.js'

// 检测连接状态
export async function checkConnection() {
  try {
    const version = await invoke('version')
    console.log('AnkiConnect 版本:', version)
    return { connected: true, error: null, version }
  } catch (error) {
    console.error('AnkiConnect 连接失败:', error)
    return { connected: false, error: error.message }
  }
} 