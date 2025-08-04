// AnkiConnect 模型操作方法
import { invoke } from './core.js'

// 获取模型名称
export async function getModelNames() {
  return await invoke('getModelNames', 6)
}

// 获取模型字段名称
export async function getModelFieldNames(modelName) {
  return await invoke('getModelFieldNames', 6, { modelName })
}

// 获取模型字段类型
export async function getModelFieldTypes(modelName) {
  return await invoke('getModelFieldTypes', 6, { modelName })
}

// 获取模型样式
export async function getModelStyling(modelName) {
  return await invoke('getModelStyling', 6, { modelName })
}

// 获取模型模板
export async function getModelTemplates(modelName) {
  return await invoke('getModelTemplates', 6, { modelName })
}

// 创建模型
export async function createModel(modelName, inOrderFields, css, cardTemplates) {
  return await invoke('createModel', 6, { 
    modelName, 
    inOrderFields, 
    css, 
    cardTemplates 
  })
}

// 更新模型模板
export async function updateModelTemplates(model) {
  return await invoke('updateModelTemplates', 6, { model })
}

// 更新模型样式
export async function updateModelStyling(model) {
  return await invoke('updateModelStyling', 6, { model })
}

// 更新模型字段
export async function updateModelFields(model) {
  return await invoke('updateModelFields', 6, { model })
}

// 更新模型
export async function updateModel(model) {
  return await invoke('updateModel', 6, { model })
}

// 删除模型
export async function deleteModel(modelName) {
  return await invoke('deleteModel', 6, { modelName })
}

// 获取模型信息
export async function getModel(modelName) {
  return await invoke('getModel', 6, { modelName })
}

// 获取模型 ID
export async function getModelID(modelName) {
  return await invoke('getModelID', 6, { modelName })
}

// 获取模型名称（通过 ID）
export async function getModelName(modelID) {
  return await invoke('getModelName', 6, { modelID })
}

// 获取模型字段名称（通过 ID）
export async function getModelFieldNamesByID(modelID) {
  return await invoke('getModelFieldNamesByID', 6, { modelID })
}

// 获取模型字段类型（通过 ID）
export async function getModelFieldTypesByID(modelID) {
  return await invoke('getModelFieldTypesByID', 6, { modelID })
}

// 获取模型样式（通过 ID）
export async function getModelStylingByID(modelID) {
  return await invoke('getModelStylingByID', 6, { modelID })
}

// 获取模型模板（通过 ID）
export async function getModelTemplatesByID(modelID) {
  return await invoke('getModelTemplatesByID', 6, { modelID })
}

// 获取模型信息（通过 ID）
export async function getModelByID(modelID) {
  return await invoke('getModelByID', 6, { modelID })
}

// 更新模型（通过 ID）
export async function updateModelByID(modelID, model) {
  return await invoke('updateModelByID', 6, { modelID, model })
}

// 删除模型（通过 ID）
export async function deleteModelByID(modelID) {
  return await invoke('deleteModelByID', 6, { modelID })
} 