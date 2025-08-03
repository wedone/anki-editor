// AnkiConnect 核心请求方法
const ANKI_CONNECT_URL = 'http://localhost:8765'

// 基础请求方法
export async function invoke(action, version = 6, params = {}) {
  try {
    console.log(`AnkiConnect API 调用: ${action}`, params)
    
    const response = await fetch(ANKI_CONNECT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action,
        version,
        params
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    console.log(`AnkiConnect API 响应: ${action}`, result)
    
    if (result.error) {
      throw new Error(result.error)
    }

    return result.result
  } catch (error) {
    console.error(`AnkiConnect API Error (${action}):`, error)
    throw error
  }
} 