// AnkiConnect 标签操作方法
import { invoke } from './core.js'

// 添加标签
export async function addTags(notes, tags) {
  return await invoke('addTags', 6, { notes, tags })
}

// 移除标签
export async function removeTags(notes, tags) {
  return await invoke('removeTags', 6, { notes, tags })
}

// 获取所有标签
export async function getTags() {
  return await invoke('getTags', 6)
}

// 清理未使用标签
export async function clearUnusedTags() {
  return await invoke('clearUnusedTags', 6)
}

// 替换标签
export async function replaceTags(notes, tagToReplace, replaceWithTag) {
  return await invoke('replaceTags', 6, { 
    notes, 
    tag_to_replace: tagToReplace, 
    replace_with_tag: replaceWithTag 
  })
}

// 替换所有笔记中的标签
export async function replaceTagsInAllNotes(tagToReplace, replaceWithTag) {
  return await invoke('replaceTagsInAllNotes', 6, { 
    tag_to_replace: tagToReplace, 
    replace_with_tag: replaceWithTag 
  })
} 