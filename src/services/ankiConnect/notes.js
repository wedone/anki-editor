// AnkiConnect 笔记操作方法
import { invoke } from './core.js'

// 添加笔记
export async function addNote(note) {
  return await invoke('addNote', 6, { note })
}

// 检查是否可以添加笔记
export async function canAddNotes(notes) {
  return await invoke('canAddNotes', 6, { notes })
}

// 更新卡片字段
export async function updateCardFields(cardId, fields) {
  try {
    const noteId = await invoke('cardsToNotes', 6, { cards: [cardId] })
    if (noteId.length > 0) {
      await invoke('updateNoteFields', 6, {
        note: {
          id: noteId[0],
          fields: fields
        }
      })
      return true
    }
    return false
  } catch (error) {
    console.error('更新卡片字段失败:', error)
    throw error
  }
}

// 更新笔记字段
export async function updateNoteFields(note) {
  return await invoke('updateNoteFields', 6, { note })
}

// 更新笔记
export async function updateNote(note) {
  return await invoke('updateNote', 6, { note })
}

// 查找笔记
export async function findNotes(query) {
  return await invoke('findNotes', 6, { query })
}

// 获取笔记信息
export async function getNotesInfo(notes) {
  return await invoke('notesInfo', 6, { notes })
}

// 获取笔记修改时间
export async function getNotesModTime(notes) {
  return await invoke('notesModTime', 6, { notes })
}

// 删除笔记
export async function deleteNotes(notes) {
  return await invoke('deleteNotes', 6, { notes })
}

// 移除空笔记
export async function removeEmptyNotes() {
  return await invoke('removeEmptyNotes', 6)
} 